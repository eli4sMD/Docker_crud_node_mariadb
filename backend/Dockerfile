# Imagen de node a la ultima version
FROM node:18-alpine

# directorio de trabajo
WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# cuando inicie el contenedor se va ejecutar el comando npm start
CMD ["npm", "start"]


