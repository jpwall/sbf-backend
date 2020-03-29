FROM node:10
RUN mkdir /sbf-backend
ADD . /sbf-backend
WORKDIR /sbf-backend
RUN npm i
EXPOSE 80
CMD ["npm", "start"]