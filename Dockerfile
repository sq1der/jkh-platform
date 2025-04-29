FROM python:3.11-slim

# Установка зависимостей системы
RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    python3-dev \
    gcc \
    binutils \
    libproj-dev \
    && rm -rf /var/lib/apt/lists/*

# Установим переменную окружения для GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so


# Установка зависимостей проекта
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Копируем код
COPY . .

# Команда запуска
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
