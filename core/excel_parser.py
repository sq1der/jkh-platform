import pandas as pd
from django.db import transaction
from datetime import datetime
from .models import Debtor, Payment, ExcelUpload
from decimal import Decimal


REQUIRED_COLUMNS = ['ACCOUNT', 'SERVICE_ID', 'PAY_SUM', 'PERIOD']

def parse_excel_file(file_path, upload: ExcelUpload):
    error_log = []
    
    try:
        df = pd.read_excel(file_path)

        for col in REQUIRED_COLUMNS:
            if col not in df.columns:
                upload.status = 'error'
                upload.error_log = {'missing_column': col}
                upload.save()
                return {'success': False, 'error': f'Отсутствует колонка: {col}'}

        df = df[df['SERVICE_ID'] == 1061]
        df = df[df['PERIOD'].notnull()]
        if df.empty:
            upload.status = 'error'
            upload.error_log = {'no_valid_rows': 'Нет строк с PERIOD'}
            upload.save()
            return {'success': False, 'error': 'Нет строк с PERIOD'}

        with transaction.atomic():
            for index, row in df.iterrows():
                try:
                    account = str(row['ACCOUNT']).strip()
                    pay_sum = Decimal(str(row['PAY_SUM']))
                    pay_date = pd.to_datetime(row['PERIOD']).date()

                    debtor = Debtor.objects.filter(personal_account=account).first()

                    if not debtor:
                        raise ValueError(f"Должник с аккаунтом {account} не найден")


                    Payment.objects.create(
                        amount=pay_sum,
                        date=pay_date,
                        source='Энерго',
                        debtor=debtor
                    )

                    debtor.current_debt = max(0, debtor.current_debt - pay_sum)
                    debtor.last_payment = pay_date
                    
                    debtor.save()

                except Exception as row_error:
                    error_log.append({
                        'row': int(index) + 2, 
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
