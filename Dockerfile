FROM node:carbon
MAINTAINER joe chimienti <jchimien@gmail.com>
WORKDIR /usr/src/app/pollofeed
#ARG NODE_ENV=production
#ENV NODE_ENV $NODE_ENV
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build
EXPOSE ${APP_PORT}
USER node
CMD node ./bin/www.js
