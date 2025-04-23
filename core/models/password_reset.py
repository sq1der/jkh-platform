import uuid, datetime
from django.conf import settings
from django.db import models
from django.utils import timezone
from datetime import timedelta

class PasswordResetToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_expired(self):
        return self.created_at < timezone.now() - timedelta(hours=1)
        
    def __str__(self):
        return f"{self.user.email} – {self.token}"
