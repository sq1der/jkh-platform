from django.contrib import admin

# Register your models here.

from .models import Building
from .models import Debtor


admin.site.register(Building)
admin.site.register(Debtor)