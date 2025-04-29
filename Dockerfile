FROM python:3.11-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    python3-dev \
    gcc \
    binutils \
    libproj-dev \
    && rm -rf /var/lib/apt/lists/*

# Проверим, какие версии GDAL установлены
RUN gdal-config --version
RUN find /usr/lib -name "libgdal.so*"

# Установка переменных окружения вручную
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so

# Установка зависимостей проекта
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Копируем остальной код
COPY . .

# Открытие порта и запуск
EXPOSE 8000
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
