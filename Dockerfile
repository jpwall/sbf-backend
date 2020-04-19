FROM node:10.16.0-alpine
WORKDIR /sbf-backend
COPY package*.json ./
RUN npm i
RUN npm install -g nodemon
COPY . .
EXPOSE 80
CMD ["nodemon", "server.js"]