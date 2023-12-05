FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

#? el primer . es el directorio actual y el segundo . es el directorio de donde se copiara
COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]