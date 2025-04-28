from django.db import models
import uuid
from django.core.exceptions import ValidationError
from datetime import date


class Debtor(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Активен'
        DISCONNECTED = 'disconnected', 'Отключен'
        ARCHIVED = 'archived', 'Архив'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    full_name = models.CharField(max_length=255)  
    iin = models.CharField(max_length=12, unique=True)  
    personal_account = models.CharField(max_length=50, unique=True)  
    address = models.TextField()  
    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.ACTIVE
    )  
    building = models.ForeignKey('Building', related_name='debtors', on_delete=models.CASCADE)  
    last_payment = models.DateField(null=True, blank=True)  
    current_debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 

    debt_start_date = models.DateField(null=True, blank=True)  
    initial_term_days = models.IntegerField(null=True, blank=True) 

    @property
    def remaining_term_days(self):
        if self.debt_start_date and self.initial_term_days is not None:
            days_passed = (date.today() - self.debt_start_date).days
            remaining = self.initial_term_days - days_passed
            return max(remaining, 0)
        return None

    @property
    def remaining_term_display(self):
        days = self.remaining_term_days
        if days is None:
            return "Неизвестно"

        years = days // 365
        months = (days % 365) // 30
        remaining_days = (days % 365) % 30

        parts = []
        if years:
            parts.append(f"{years} год{'а' if 1 < years < 5 else ''}")
        if months:
            parts.append(f"{months} мес")
        if remaining_days:
            parts.append(f"{remaining_days} дн.")

        return " ".join(parts) or "0 дней"


    def __str__(self):
        return f"Debtor {self.full_name} - {self.iin}"

    def clean(self):
        if len(self.iin) != 12 or not self.iin.isdigit():
            raise ValidationError("ИИН должен быть 12 цифр.")
