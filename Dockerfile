FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    binutils \
    && apt-get clean

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV DATABASE_URL=postgresql://jkh_db_user:kHVhSWBlEdasUyOlv1rXaodakuM8CbVT@dpg-d07t8pur433s73bk9mq0-a/jkh_db
ENV SECRET_KEY=django-insecure-1)z^q&wo@fd4yffb#o(!qi&31u6ahcqbv_3stl(+2_a%x&bxg&

RUN python manage.py collectstatic --noinput


EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
