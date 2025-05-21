from django.contrib import admin

# Register your models here.

from .models import Building
from .models import Debtor
from .models import House
from .models import Street

admin.site.register(Building)
admin.site.register(Debtor)
admin.site.register(House)
admin.site.register(Street)