from django.db import models


class Street(models.Model):
    id = models.IntegerField(primary_key=True)  
    name = models.CharField(max_length=255)     

    def __str__(self):
        return f"{self.name} (ID: {self.id})"
