# Create your views here.
from rest_framework import viewsets, permissions, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail
from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from django.conf import settings
from django.http import FileResponse
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .models import PasswordResetToken, ReportHistory
from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer, ReportHistorySerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.utils import timezone
from datetime import timedelta

from django.contrib.auth import get_user_model

from .models import Debtor, Building, Payment, ExcelUpload
from .serializers import (
    DebtorSerializer,
    BuildingSerializer,
    PaymentSerializer,
    ExcelUploadSerializer,
    LoginWithEmailSerializer,
    LoginWithIINSerializer,
    UserSerializer,
)

from .excel_parser import parse_excel_file
from .reports.utils import generate_building_report


User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class DebtorViewSet(viewsets.ModelViewSet):
    queryset = Debtor.objects.all()
    serializer_class = DebtorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['building']
    search_fields = ['full_name', 'iin', 'address']
    ordering_fields = ['full_name', 'last_payment', 'current_debt']
    ordering = ['full_name']

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params

        from_date = params.get('from_date')
        to_date = params.get('to_date')
        if from_date and to_date:
            queryset = queryset.filter(last_payment__range=[from_date, to_date])
        elif from_date:
            queryset = queryset.filter(last_payment__gte=from_date)
        elif to_date:
            queryset = queryset.filter(last_payment__lte=to_date)

        overdue_days = params.get('overdue_days')
        if overdue_days:
            cutoff = timezone.now().date() - timedelta(days=int(overdue_days))
            queryset = queryset.filter(last_payment__lt=cutoff)

        status_param = params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset


class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.select_related('house').all()
    serializer_class = BuildingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
class ExcelUploadViewSet(viewsets.ModelViewSet):
    queryset = ExcelUpload.objects.all()
    serializer_class = ExcelUploadSerializer
    permission_classes = [IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class DebtSearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, iin):
        debtor = Debtor.objects.filter(iin=iin).first()
        if debtor:
            return Response({
                "debt": {
                    "address": debtor.address,
                    "current_debt": debtor.current_debt,
                    "lastPaymentDate": debtor.last_payment
                }
            })
        return Response({"debt": None}, status=status.HTTP_404_NOT_FOUND)


class LoginWithEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginWithEmailSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Успешный вход по email',
                'role': user.role,
                'access': tokens['access'],
                'refresh': tokens['refresh'],
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginWithIINView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginWithIINSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Успешный вход по ИИН',
                'role': user.role,
                'access': tokens['access'],
                'refresh': tokens['refresh'],
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExcelUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({'error': 'Файл не найден'}, status=status.HTTP_400_BAD_REQUEST)

        upload = ExcelUpload.objects.create(
            file=excel_file,
            user=request.user,
            file_name=excel_file.name
        )

        result = parse_excel_file(upload.file.path, upload)

        if result.get('success'):
            return Response({'message': 'Файл успешно обработан'}, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Обработка завершена с ошибками',
                'errors': upload.error_log
            }, status=status.HTTP_400_BAD_REQUEST)
        

class PasswordResetRequestView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Письмо отправлено, если такой email существует."},
                            status=status.HTTP_200_OK)

        reset = PasswordResetToken.objects.create(user=user)

        reset_link = f"{settings.FRONTEND_URL}/reset-password/{reset.token}/"
        html = render_to_string("emails/password_reset.html", {"link": reset_link, "user": user})
        send_mail(
            subject="Сброс пароля ЖКХ‑портал",
            message=f"Перейдите по ссылке для сброса пароля: {reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html
        )
        return Response({"detail": "Письмо отправлено."}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            reset = PasswordResetToken.objects.select_related("user").get(token=serializer.validated_data["token"])
        except PasswordResetToken.DoesNotExist:
            return Response({"detail": "Неверный токен."}, status=status.HTTP_400_BAD_REQUEST)

        if reset.is_expired:
            reset.delete()
            return Response({"detail": "Токен истёк."}, status=status.HTTP_400_BAD_REQUEST)

        user = reset.user
        user.set_password(serializer.validated_data["new_password"])
        user.save()
        reset.delete()

        # по желанию: сразу выдать JWT
        tokens = get_tokens_for_user(user)
        return Response({"detail": "Пароль обновлён.",
                         "access": tokens["access"],
                         "refresh": tokens["refresh"]}, status=status.HTTP_200_OK)
    

def get_debt_info(request):
    iin = request.GET.get('iin')

    if not iin:
        return JsonResponse({'error': 'ИИН обязателен.'}, status=400)

    try:
        debtor = Debtor.objects.get(iin=iin)
    except Debtor.DoesNotExist:
        return JsonResponse({'error': 'Должник не найден.'}, status=404)

    # Если у тебя есть связь Debtor -> Building
    building = debtor.building

    # Расчёт остатка срока
    remaining_term_days = debtor.remaining_term_days
    if remaining_term_days is not None:
        years = remaining_term_days // 365
        months = (remaining_term_days % 365) // 30
        remaining_days = (remaining_term_days % 365) % 30

        parts = []
        if years:
            parts.append(f"{years} год{'а' if 1 < years < 5 else ''}")
        if months:
            parts.append(f"{months} мес")
        if remaining_days:
            parts.append(f"{remaining_days} дн.")

        remaining_term_display = " ".join(parts) or "0 дней"
    else:
        remaining_term_display = "Неизвестно"

    response_data = {
        'address': debtor.address,
        'current_debt': debtor.current_debt,
        'remaining_term': remaining_term_display,
        'object_type': building.object_type,
        'build_year': building.year_built,
        'house_type': building.building_type,
        'total_residents': building.total_residents,
        'apartments_count': building.number_of_apartments,
    }

    return JsonResponse(response_data)


@csrf_exempt
def download_building_report(request, building_id):
    building = Building.objects.prefetch_related('debtors').get(id=building_id)
    wb = generate_building_report(building)

    now = timezone.now().strftime("%Y-%m-%d_%H-%M")
    filename = f"{building.address.replace(' ', '_')}_{now}.xlsx"

    from io import BytesIO
    virtual_file = BytesIO()
    wb.save(virtual_file)
    virtual_file.seek(0)

    report_history = ReportHistory(
        building=building
    )
    report_history.file.save(filename, ContentFile(virtual_file.read()))
    report_history.save()

    virtual_file.seek(0) 
    return FileResponse(virtual_file, as_attachment=True, filename=filename)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_report_history(request, building_id=None):
    if building_id:
        reports = ReportHistory.objects.filter(building_id=building_id).order_by('-created_at')
    else:
        reports = ReportHistory.objects.all().order_by('-created_at')

    serializer = ReportHistorySerializer(reports, many=True, context={'request': request})
    return Response(serializer.data)