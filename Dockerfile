FROM node:carbon-jessie
MAINTAINER joe chimienti <jchimien@gmail.com>
WORKDIR /usr/src/app/pollofeed
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build
EXPOSE ${APP_PORT}
CMD node bin/www.js
