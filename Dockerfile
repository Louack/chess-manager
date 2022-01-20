FROM nikolaik/python-nodejs:python3.9-nodejs14-alpine

WORKDIR /app/backend

COPY ./backend/requirements.txt /app/backend

RUN  \
    apk update && \
    apk upgrade && \
    apk add --no-cache bash && \
    apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip3 install --upgrade pip -r requirements.txt && \
    apk --purge del .build-deps

COPY ./backend /app/backend

COPY ./backend/scripts/ /app/

WORKDIR /app/frontend

COPY ./frontend/package.json /app/frontend/
RUN npm install

COPY ./frontend /app/frontend

RUN npm run build

RUN cd build && mkdir root && mv img/ *.json root

RUN mkdir /app/staticfiles

WORKDIR /app

ENV PORT 8000
EXPOSE 8000

RUN ["chmod", "+x", "/app/entrypoint-prod.sh"]

ENTRYPOINT [ "/app/entrypoint-prod.sh" ]