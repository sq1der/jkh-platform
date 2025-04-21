# Create your views here.
from rest_framework import viewsets, permissions, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken

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
    UserSerializer
)

from .excel_parser import parse_excel_file


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
    queryset = Building.objects.all()
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