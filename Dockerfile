FROM node:carbon
MAINTAINER joe chimienti <jchimien@gmail.com>
RUN mkdir /pollofeed
RUN chown -R node:node /pollofeed
WORKDIR /pollofeed
#ARG NODE_ENV=production
#ENV NODE_ENV $NODE_ENV
USER node
COPY --chown=node:node package.json yarn.lock  ./
RUN yarn install
COPY --chown=node:node . .
RUN yarn run build
EXPOSE ${PORT:-4321}
CMD node ./src/www.js
