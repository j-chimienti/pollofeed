FROM node:carbon
WORKDIR /usr/src/app/pollofeed
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${APP_PORT}
CMD node bin/www.js
