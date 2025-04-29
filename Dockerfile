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

# Проверим версию GDAL
RUN gdal-config --version

# Получим путь к libgdal.so
RUN echo $(gdal-config --libs)

# Установка переменных окружения
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
ENV GDAL_VERSION=$(gdal-config --version)
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so.${GDAL_VERSION}

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
