FROM node:latest

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src src

ENTRYPOINT [ "npm", "start" ]