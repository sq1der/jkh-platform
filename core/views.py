from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions, filters
from .models import Debtor, Building, Payment, ExcelUpload
from .serializers import DebtorSerializer, BuildingSerializer, PaymentSerializer, ExcelUploadSerializer, LoginWithEmailSerializer, LoginWithIINSerializer
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from openpyxl import load_workbook

User = get_user_model()

class DebtorViewSet(viewsets.ModelViewSet):
    queryset = Debtor.objects.all()
    serializer_class = DebtorSerializer
    permission_classes = [permissions.IsAuthenticated]

class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
    permission_classes = [permissions.IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ExcelUploadViewSet(viewsets.ModelViewSet):
    queryset = ExcelUpload.objects.all()
    serializer_class = ExcelUploadSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DebtSearchView(APIView):
    def get(self, request, iin):
        try:
            debt = Debtor.objects.get(iin=iin)
            return Response({
                "debt": {
                    "address": debt.address,
                    "current_debt": debt.current_debt,
                    "lastPaymentDate": debt.last_payment
                }
            })
        except Debtor.DoesNotExist:
            return Response({"debt": None}, status=status.HTTP_404_NOT_FOUND)

class LoginWithEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginWithEmailSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({'message': 'Успешный вход по email', 'role': user.role})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginWithIINView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginWithIINSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({'message': 'Успешный вход по ИИН', 'role': user.role})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debtor.objects.all().order_by('-last_payment')
    serializer_class = DebtorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = {
        'last_payment': ['gte', 'lte'],  # фильтрация по периоду
        'debt_amount': ['gte', 'lte'],        # фильтрация по сумме долга
    }
    search_fields = ['full_name', 'iin']      # поиск по имени или ИИН
    ordering_fields = ['last_payment', 'debt_amount']  # сортировка

class ExcelUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        excel_file = request.FILES['file']
        wb = load_workbook(filename=excel_file)
        sheet = wb.active
        
        for row in sheet.iter_rows(min_row=2, values_only=True):
            full_name, address, last_payment, debt_amount, iin = row
            Subscriber.objects.update_or_create(
                iin=iin,
                defaults={
                    'full_name': full_name,
                    'address': address,
                    'last_payment_date': datetime.strptime(str(last_payment), '%d.%m.%Y').date(),
                    'debt_amount': debt_amount
                }
            )
        return Response({'status': 'uploaded'})
