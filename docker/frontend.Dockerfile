FROM node:18-alpine

WORKDIR /app

# Copia os arquivos para iniciar o frontend estático legado via root/back
COPY src/back/package*.json ./
RUN npm install

# Copia o restante do código
COPY src/back/ ./

EXPOSE 3000
CMD ["npm", "run", "start:frontend"]