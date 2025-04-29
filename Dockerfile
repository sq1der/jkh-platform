# Используем базовый образ для Python
FROM python:3.11-slim

# Устанавливаем зависимые библиотеки для GDAL
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    libgeos-dev \
    gdal-bin \
    libgdal-dev \
    && apt-get clean

# Устанавливаем переменную окружения для GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV GDAL_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu/libgdal.so
ENV GEOS_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu/libgeos_c.so

# Устанавливаем зависимости Python
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код в контейнер
COPY . .

# Открываем порт
EXPOSE 8000

# Команда для запуска приложения
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
