from django.db import models
import uuid
from django.core.exceptions import ValidationError

class Debtor(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Активен'
        DISCONNECTED = 'disconnected', 'Отключен'
        ARCHIVED = 'archived', 'Архив'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    full_name = models.CharField(max_length=255)  
    iin = models.CharField(max_length=12, unique=True)  
    personal_account = models.CharField(max_length=50)  
    address = models.TextField()  
    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.ACTIVE
    )  
    building = models.ForeignKey('Building', related_name='debtors', on_delete=models.CASCADE)  
    last_payment = models.DateField(null=True, blank=True)  
    current_debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 

    def __str__(self):
        return f"Debtor {self.full_name} - {self.iin}"

    def clean(self):
        if len(self.iin) != 12 or not self.iin.isdigit():
            raise ValidationError("ИИН должен быть 12 цифр.")
