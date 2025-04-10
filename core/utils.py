import pandas as pd
from django.core.exceptions import ValidationError
from .models import ExcelUpload, Debtor
from django.db import transaction

def process_excel_upload(excel_upload_id):
    upload = ExcelUpload.objects.get(id=excel_upload_id)

    if upload.upload_status == 'Completed':
        return "File already processed."

    upload.upload_status = 'Pending'
    upload.save()

    try:
        file_path = upload.file.path
        df = pd.read_excel(file_path)
        error_log = []
        
        with transaction.atomic():
            for index, row in df.iterrows():
                try:
                    if pd.isna(row['ACCOUNT']) or pd.isna(row['PAY_SUM']) or pd.isna(row['Долг']):
                        raise ValidationError(f"Missing required fields in row {index + 1}")

                    debtor = Debtor.objects.create(
                        id=row['ACCOUNT'],
                        current_debt=row['PAY_SUM'],
                        address=row['ADDRESS'],
                        last_payment=row['PAY_DATE'],
                        status=row.get('Статус', 'Активный'),
                    )
                except ValidationError as e:
                    error_log.append(f"Row {index + 1}: {e.message}")
                except Exception as e:
                    error_log.append(f"Row {index + 1}: Unexpected error: {str(e)}")
            
        if error_log:
            upload.upload_status = 'Failed'
            upload.error_log = "\n".join(error_log)
        else:
            upload.upload_status = 'Completed'
            upload.error_log = ''
        
        upload.save()

        return f"File processing completed. Errors: {len(error_log)}"
    
    except Exception as e:
        upload.upload_status = 'Failed'
        upload.error_log = f"Error processing file: {str(e)}"
        upload.save()
        return f"Error: {str(e)}"
