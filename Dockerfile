FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    gdal-bin libgdal-dev gcc python3-dev musl-dev && \
    rm -rf /var/lib/apt/lists/*

RUN pip install poetry

ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
