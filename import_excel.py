# замените your_app на имя вашего приложения
import openpyxl
from django.db import IntegrityError
import os
import django
from datetime import date

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import Street, House, Building
# 🧹 Функция очистки ячеек

def clean_int(cell):
    try:
        return int(str(cell).replace('\xa0', '').strip())
    except (ValueError, TypeError):
        return None


def clean_str(cell):
    try:
        return str(cell).replace('\xa0', ' ').strip()
    except:
        return ""


# 📄 Загружаем Excel
wb = openpyxl.load_workbook("srv1061_to_pes_2024 апрель.xlsx")
sheet = wb.active

# 📊 Счетчики
added_streets = 0
added_houses = 0
skipped_houses = 0
added_buildings = 0
skipped_buildings = 0

for row in sheet.iter_rows(min_row=2, values_only=True):
    # 🎯 Получаем значения из строки
    street_id = clean_int(row[9])
    street_name = clean_str(row[10])
    house_id = clean_int(row[11])
    house_number = clean_str(row[12])

    if not street_id or not house_id:
        continue  # пропускаем строки с ошибками

    # 🏙️ Добавляем улицу
    try:
        street, created_street = Street.objects.get_or_create(
            id=street_id,
            defaults={"name": street_name}
        )
        if created_street:
            added_streets += 1
    except IntegrityError:
        continue  # если ошибка — пропускаем строку

    # 🏠 Добавляем дом
    try:
        house, created_house = House.objects.get_or_create(
            id=house_id,
            defaults={"street": street, "house_number": house_number}
        )
        if created_house:
            added_houses += 1
        else:
            skipped_houses += 1
    except IntegrityError:
        skipped_houses += 1

    try:
        building, created_building = Building.objects.get_or_create(
            house=house,
            name="ЖК Астана",
            district="Неизвестно",
            latitude=0.0,
            longitude=0.0,
            total_residents=2000,
            total_debtors=897,
            total_debt=15367283.00,
            total_square=2899.40,
            description="Полная замена устаревших трубопроводов протяжённостью более 5 км, установка автоматизированных теплопунктов и внедрение системы удалённого мониторинга. Благодаря проекту улучшено теплоснабжение для 15 многоквартирных домов.",
            image_url=None,
            start_date=date(2023, 6, 1),
            end_date=date(2024, 3, 1),
            object_type="Жилой многоквартирный дом",
            year_built=2000,
            building_type="Монолитный",
            number_of_apartments=1000,
            is_visible=False
        )
        print(f"Добавлено здание: {building.name} (дом {house.house_number})")
    except Exception as e:
        print(f"❌ Ошибка при добавлении здания для дома {house.id}: {e}")
    if created_building:
        added_buildings += 1
    else:
        skipped_buildings += 1

# ✅ Вывод результата
print("\n✅ Импорт завершен!")
print(f"➕ Улиц добавлено: {added_streets}")
print(f"➕ Домов добавлено: {added_houses}")
print(f"⏭️ Домов пропущено (уже есть): {skipped_houses}")
print(f"🏢 Зданий добавлено: {added_buildings}")
print(f"⏭️ Зданий пропущено (уже есть): {skipped_buildings}")
