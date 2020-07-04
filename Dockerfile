FROM node:alpine

RUN apk add ffmpeg

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src src

ENTRYPOINT [ "npm", "start" ]