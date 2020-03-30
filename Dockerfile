FROM node:10.16.0-alpine
WORKDIR /sbf-backend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 80
CMD ["npm", "start"]