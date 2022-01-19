FROM node:14.18

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

ARG PROXY_HOST

ENV REACT_APP_PROXY_HOST=$PROXY_HOST