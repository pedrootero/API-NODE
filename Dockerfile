FROM node:18.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/ --global

RUN npm cache clear --force

RUN npm install --force --verbose

COPY ./dist .

EXPOSE 3050

CMD ["npm", "start"]


