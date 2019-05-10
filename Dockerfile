FROM node:10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN touch .env

RUN apk add --no-cache tzdata

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
