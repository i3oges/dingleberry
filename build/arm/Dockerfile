FROM node:alpine@sha256:83d783aa1cc352a0012240f46d9318141ae0e784bf02f073542a8c1dc17bef14

RUN apk add ffmpeg

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src src

ENTRYPOINT [ "npm", "start" ]