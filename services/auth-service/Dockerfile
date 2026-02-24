FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copiamos el resto del código
COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

# Al arrancar el contenedor:
# 1) aplica migraciones (si faltan)
# 2) arranca la app Nest compilada
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]