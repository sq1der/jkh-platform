from django.db import models
from .street import Street


class House(models.Model):
    id = models.IntegerField(primary_key=True)  
    street = models.ForeignKey(Street, on_delete=models.CASCADE, related_name='houses')
    house_number = models.CharField(max_length=20)  

    def __str__(self):
        return f"{self.street.name} {self.house_number} (ID: {self.id})"
