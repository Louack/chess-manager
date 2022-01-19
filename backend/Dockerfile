FROM python:3.9.6-alpine

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN  \
    apk update && \
    apk upgrade && \
    apk add --no-cache bash && \
    apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip3 install --upgrade pip -r requirements.txt && \
    apk --purge del .build-deps

COPY . .

RUN ["chmod", "+x", "/backend/scripts/entrypoint-dev.sh"]
ENTRYPOINT [ "/backend/scripts/entrypoint-dev.sh" ]