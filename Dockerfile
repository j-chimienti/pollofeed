FROM node:carbon
MAINTAINER joe chimienti <jchimien@gmail.com>
RUN mkdir /pollofeed
RUN chown -R node:node /pollofeed
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=4321
ENV PORT $PORT
WORKDIR /pollofeed
USER node
COPY --chown=node:node package.json package-lock.json  ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE $PORT
HEALTHCHECK --interval=30s CMD node healthcheck.js
CMD node ./src/www.js
