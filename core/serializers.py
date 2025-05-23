from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from .models import Debtor, Building, Payment, ExcelUpload, ReportHistory, House, Street


User = get_user_model()

class DebtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debtor
        fields = '__all__'

class StreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Street
        fields = '__all__'

class HouseSerializer(serializers.ModelSerializer):
    street = StreetSerializer(read_only=True)

    class Meta:
        model = House
        fields = '__all__'


class BuildingSerializer(serializers.ModelSerializer):
    house = HouseSerializer(read_only=True)

    class Meta:
        model = Building
        fields = '__all__' 
        

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ExcelUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelUpload
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'full_name']

class LoginWithEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Неверный email или пароль")
        return {'user': user}

class LoginWithIINSerializer(serializers.Serializer):
    iin = serializers.CharField(max_length=12)

    def validate(self, data):
        try:
            user = User.objects.get(iin=data['iin'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким ИИН не найден")
        return {'user': user}

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(min_length=8, write_only=True)

class ReportHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportHistory
        fields = ['id', 'building', 'file', 'created_at']


