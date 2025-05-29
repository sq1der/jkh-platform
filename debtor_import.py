import openpyxl
from datetime import datetime
import os
import django
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import Street, House, Building, Debtor

workbook = openpyxl.load_workbook("srv1061_to_pes_2024 апрель.xlsx")
sheet = workbook.active

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

for row in sheet.iter_rows(min_row=2, values_only=True):
    # Предположим, порядок колонок:
    # street_id, street_name, house_id, house_number, building_name,
    # ACCOUNT, PERIOD, COST_SUM, SALDO_IN, PAY_SUM, CHARGE_SUM, SALDO_OUT, FLAT_NO

    account_number = clean_int(row[0])
    period = row[1]
    cost_sum = row[3]
    saldo_in = row[4]
    pay_sum = row[5]
    charge_sum = row[6]
    saldo_out = row[7]
    street_id = clean_int(row[9])
    street_name = clean_str(row[10])
    house_id = clean_int(row[11])
    house_number = clean_str(row[12])
    flat_no = clean_int(row[14])

    # Проверка на пустые значения
    if not all([street_id, street_name, house_id, house_number, account_number, flat_no]):
        print(f"Пропущена строка: {row}")
        continue

    # Строковая очистка
    street_name = str(street_name).strip()
    house_number = str(house_number).strip()
    flat_no = str(flat_no).strip()
    account_number = str(account_number).strip()

    # Улица
    street, _ = Street.objects.get_or_create(
        id=street_id,
        defaults={"name": street_name}
    )

    # Дом
    house, _ = House.objects.get_or_create(
        id=house_id,
        defaults={"street": street, "number": house_number}
    )

    # Здание
    try:
        building = Building.objects.get(house=house)
    except Building.DoesNotExist:
        print(f"❌ Здание '{house}' не найдено для дома {house.number}")

    # Формируем адрес
    full_address = f"ул. {street.name}, дом {house.house_number}, кв. {flat_no}"

    # Период как дата — преобразуем при необходимости
    try:
        last_payment = datetime.strptime(str(period), "%d.%m.%Y").date()
    except Exception:
        last_payment = None

    # Создание Debtor
    debtor, created = Debtor.objects.get_or_create(
        personal_account=account_number,
        defaults={
            "building": building,
            "address": full_address,
            "status": Debtor.Status.ACTIVE,
            "last_payment": last_payment,
            "current_debt": Decimal(cost_sum) if cost_sum else 0,
            "saldo_in": Decimal(saldo_in) if saldo_in else 0,
            "charge_sum": Decimal(charge_sum) if charge_sum else 0,
            "saldo_out": Decimal(saldo_out) if saldo_out else 0,
            "debt_start_date": datetime.today,
            "initial_term_days": 365 * 8,  # 8 лет (пример)
            "apartment_area": Decimal("60.0"),  # Пока по умолчанию, если есть колонка — добавим
            "apart_num": flat_no,
        }
    )

    if created:
        print(f"✅ Абонент {account_number} добавлен: {full_address}")
    else:
        print(f"⚠️ Абонент {account_number} уже существует")
