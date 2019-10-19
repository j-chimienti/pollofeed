FROM node:carbon
MAINTAINER joe chimienti <jchimien@gmail.com>
RUN mkdir /pollofeed
RUN chown -R node:node /pollofeed
WORKDIR /pollofeed
USER node
COPY --chown=node:node package.json package-lock.json  ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE ${PORT:-4321}
CMD node ./src/www.js
