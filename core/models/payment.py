from django.db import models
import uuid
from django.utils import timezone

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    debtor = models.ForeignKey('Debtor', related_name='payments', on_delete=models.CASCADE)  
    amount = models.DecimalField(max_digits=10, decimal_places=2) 
    date = models.DateField(default=timezone.now)  
    source = models.CharField(max_length=50) 

    def __str__(self):
        return f"Payment {self.amount} for {self.debtor.full_name} on {self.date}"

    class Meta:
        ordering = ['-date'] 
