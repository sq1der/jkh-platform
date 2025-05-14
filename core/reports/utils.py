from openpyxl import Workbook
from openpyxl.styles import Font
from django.utils.timezone import now

def generate_building_report(building):
    wb = Workbook()
    ws = wb.active
    ws.title = f"Отчёт {building.name}"

    # Заголовки
    headers = [
        "№кв",
        "ФИО",
        "Площадь (кв.м)",
        "Сумма кредита (тенге)",
        "Ежемесячный платёж (тенге)",
        "Цена за 1 м²",
    ]
    ws.append(headers)

    for cell in ws[1]:
        cell.font = Font(bold=True)

    # Данные по жильцам
    for debtor in building.debtors.all():
        ws.append([
            debtor.apart_num,
            debtor.full_name,
            debtor.apartment_area,
            debtor.credit_amount,
            debtor.monthly_payment,
            round(building.total_debt / building.total_square, 2),
        ])

    # Итоги
    ws.append([])
    ws.append(["Итог по дому:"])
    ws.append(["Общая сумма кредита", building.total_debt])
    ws.append(["Общая площадь (м²)", building.total_square])
    ws.append(["Цена за 1 м²", round(building.total_debt / building.total_square, 2)])
    ws.append(["Дата формирования", now().strftime("%d.%m.%Y")])

    return wb