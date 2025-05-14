

import uuid
from django.db import models

class ReportHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    building = models.ForeignKey("core.Building", on_delete=models.CASCADE, related_name='reports')
    file = models.FileField(upload_to='reports/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Отчет для {self.building.address} от {self.created_at.strftime('%Y-%m-%d %H:%M')}"
