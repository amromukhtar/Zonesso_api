FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

CMD ["yarn", "start:dev"]




