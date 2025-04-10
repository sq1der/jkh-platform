from django.db import models
import uuid

class Building(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    address = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=9, decimal_places=6)  
    lng = models.DecimalField(max_digits=9, decimal_places=6) 
    total_residents = models.IntegerField() 
    total_debtors = models.IntegerField(default=0)  
    total_debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  
    description = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"Building {self.address}"

    @property
    def location(self):
        return (self.lat, self.lng)
