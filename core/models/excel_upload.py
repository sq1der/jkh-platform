from django.db import models
import uuid
from django.utils import timezone
from django.conf import settings

class ExcelUpload(models.Model):
    UPLOAD_STATUS_CHOICES = [
        ('in_progress', 'В обработке'),
        ('completed', 'Успешно'),
        ('error', 'С ошибками'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  
    file_name = models.CharField(max_length=255)  
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)  
    uploaded_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=UPLOAD_STATUS_CHOICES, default='in_progress') 
    error_log = models.JSONField(default=dict, blank=True)
    
    def __str__(self):
        return f"Upload {self.file_name} by {self.uploaded_by}"

    class Meta:
        ordering = ['-uploaded_at'] 
