FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    gdal-bin libgdal-dev gcc python3-dev musl-dev && \
    rm -rf /var/lib/apt/lists/*

RUN pip install poetry

WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && poetry lock && poetry install --no-interaction --no-ansi --no-root

COPY . .

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
