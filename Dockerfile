FROM node:latest

COPY package*.json tsconfig.json ./

RUN npm ci

COPY app.ts auth.ts ./
COPY src src

ENTRYPOINT [ "npm", "start" ]