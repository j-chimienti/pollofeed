FROM node:carbon
MAINTAINER joe chimienti <jchimien@gmail.com>
WORKDIR /usr/src/app/pollofeed
#ARG NODE_ENV=production
#ENV NODE_ENV $NODE_ENV
USER node
COPY --chown=node:node package*.json  ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE ${APP_PORT}
CMD node ./bin/www.js
