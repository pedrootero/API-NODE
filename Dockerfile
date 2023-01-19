FROM node:18.13.0-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clear --force

RUN echo 104.16.20.35 registry.npmjs.org > /etc/resolv.conf
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install --verbose

COPY ./dist .

EXPOSE 3050

CMD ["npm", "start"]


