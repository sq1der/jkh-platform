from django.db import models
import uuid
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

def default_location():
    return Point(0.0, 0.0)


class Building(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    location = gis_models.PointField(geography=True, default=default_location)
    total_residents = models.IntegerField() 
    total_debtors = models.IntegerField(default=0)  
    total_debt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  

    def __str__(self):
        return f"Building {self.address}"
