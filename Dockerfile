# Используем официальный Python-образ с архитектурой ARM64 (если нужно)
FROM python:3.11-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    libpq-dev \
    gcc \
    python3-dev \
    musl-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 🛠️ Указание пути к GDAL (важно для Django)
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# 🛠️ Django ожидает libgdal.so по определенному пути — создаем симлинк
RUN ln -s /usr/lib/aarch64-linux-gnu/libgdal.so /usr/lib/libgdal.so

# 🛠️ Для Django GIS
ENV GDAL_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu/libgdal.so

# Установка зависимостей
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем проект
COPY . .

# Открываем порт (если нужен)
EXPOSE 8000

# Команда запуска
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
