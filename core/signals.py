from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from core.models.debtor import Debtor
from django.db.models import Sum
from core.models.building import Building

@receiver([post_save, post_delete], sender=Debtor)
def update_building_stats(sender, instance, **kwargs):
    building = instance.building
    if building:
        debtors = building.debtors.all()

        building.total_debt = debtors.aggregate(total=Sum('current_debt'))['total'] or 0

        building.total_debtors = debtors.filter(current_debt__gt=0).count()

        building.total_residents = debtors.count()

        building.save()

