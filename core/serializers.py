from rest_framework import serializers
from .models import Debtor, Building, Payment, ExcelUpload
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class DebtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debtor
        fields = '__all__'

class BuildingSerializer(serializers.ModelSerializer):
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
    password = serializers.CharField()

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