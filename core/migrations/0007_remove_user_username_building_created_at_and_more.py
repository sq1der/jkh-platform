# Generated by Django 5.2 on 2025-04-22 18:34

import django.utils.timezone
from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_remove_building_description_remove_building_lat_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.AddField(
            model_name='building',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='description',
            field=models.TextField(default='Полная замена устаревших трубопроводов протяжённостью более 5 км, установка автоматизированных теплопунктов и внедрение системы удалённого мониторинга. Благодаря проекту улучшено теплоснабжение для 15 многоквартирных домов.'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='district',
            field=models.CharField(default='Иртышский Район', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='end_date',
            field=models.DateField(default=datetime.date(2017, 5, 2)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='building',
            name='start_date',
            field=models.DateField(default=datetime.date(2017, 9, 2)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='street',
            field=models.CharField(default='Ул. Зеленая', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='building',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
