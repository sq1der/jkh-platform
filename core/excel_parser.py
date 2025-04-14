import pandas as pd
from django.db import transaction
from datetime import datetime
from .models import Debtor, Payment, Building, ExcelUpload
from decimal import Decimal

REQUIRED_COLUMNS = ['ACCOUNT', 'SERVICE_ID', 'PAY_SUM', 'ADDRESS', 'PAY_DATE']

def normalize_address(address):
    return (
        address.strip()
        .lower()
        .replace('г.', '')
        .replace('ул.', '')
        .replace('д.', '')
        .replace('.', '')
        .replace(',', '')
        .replace(' ', '')
    )

def parse_excel_file(file_path, upload: ExcelUpload):
    error_log = []
    
    try:
        df = pd.read_excel(file_path)

        # Проверка обязательных колонок
        for col in REQUIRED_COLUMNS:
            if col not in df.columns:
                upload.status = 'error'
                upload.error_log = {'missing_column': col}
                upload.save()
                return {'success': False, 'error': f'Отсутствует колонка: {col}'}

        # Отфильтровать по SERVICE_ID == 1061 (электроэнергия)
        df = df[df['SERVICE_ID'] == 1061]

        # Пропускаем все строки до первой с PAY_DATE
        df = df[df['PAY_DATE'].notnull()]
        if df.empty:
            upload.status = 'error'
            upload.error_log = {'no_valid_rows': 'Нет строк с PAY_DATE'}
            upload.save()
            return {'success': False, 'error': 'Нет строк с PAY_DATE'}

        with transaction.atomic():
            for index, row in df.iterrows():
                try:
                    account = str(row['ACCOUNT']).strip()
                    pay_sum = Decimal(str(row['PAY_SUM']))
                    address = str(row['ADDRESS']).strip()
                    pay_date = pd.to_datetime(row['PAY_DATE']).date()

                    # Нормализуем адрес для поиска
                    normalized_address = normalize_address(address)

                    # Поиск Building по адресу
                    all_buildings = list(Building.objects.all())
                    building = next(
                        (b for b in all_buildings if normalize_address(b.address) == normalized_address),
                        None
                    )

                    if not building:
                        raise ValueError(f"Здание не найдено по адресу: {address}")

                    # Определение ИИН по первым 12 цифрам аккаунта (если применимо)
                    iin = account[:12] if len(account) >= 12 else None

                    debtor, created = Debtor.objects.get_or_create(
                        personal_account=account,
                        defaults={
                            'iin': iin,
                            'address': address,
                            'full_name': '',
                            'status': 'active',
                            'current_debt': 0,
                            'building': building
                        }
                    )

                    # Обновление связи с building, если её не было
                    if not debtor.building:
                        debtor.building = building

                    # Создание платежа
                    Payment.objects.create(
                        amount=pay_sum,
                        date=pay_date,
                        source='Энерго',
                        debtor=debtor
                    )

                    # Обновление текущего долга (уменьшаем на сумму платежа)
                    debtor.current_debt = max(0, debtor.current_debt - pay_sum)
                    debtor.save()

                except Exception as row_error:
                    error_log.append({
                        'row': int(index) + 2,  # Excel обычно начинается с 1, +1 за заголовок
                        'error': str(row_error)
                    })

        if error_log:
            upload.status = 'error'
            upload.error_log = {'rows': error_log}
        else:
            upload.status = 'completed'
            upload.error_log = {}

        upload.save()
        return {'success': not bool(error_log)}

    except Exception as e:
        upload.status = 'error'
        upload.error_log = {'fatal': str(e)}
        upload.save()
        return {'success': False, 'error': str(e)}
