from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions, filters
from .models import Debtor, Building, Payment, ExcelUpload
from .serializers import DebtorSerializer, BuildingSerializer, PaymentSerializer, ExcelUploadSerializer, LoginWithEmailSerializer, LoginWithIINSerializer
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

User = get_user_model()

class DebtorViewSet(viewsets.ModelViewSet):
    queryset = Debtor.objects.all()
    serializer_class = DebtorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'iin']
    ordering_fields = ['full_name', 'last_payment', 'current_debt']
    ordering = ['full_name']

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')
        if from_date and to_date:
            queryset = queryset.filter(last_payment__range=[from_date, to_date])

        overdue_days = request.query_params.get('overdue_days')
        if overdue_days:
            cutoff_date = timezone.now().date() - timedelta(days=int(overdue_days))
            queryset = queryset.filter(last_payment__lt=cutoff_date)

        status = request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)

        return queryset


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
