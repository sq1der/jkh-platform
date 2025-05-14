from django.db import models
import uuid

class Building(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    
    total_residents = models.IntegerField()
    total_debtors = models.IntegerField(default=0)
    total_debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_square = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    object_type = models.CharField(max_length=255)
    year_built = models.IntegerField()
    building_type = models.CharField(max_length=255)
    number_of_apartments = models.IntegerField()

    def __str__(self):
        return f"Building {self.address}"
