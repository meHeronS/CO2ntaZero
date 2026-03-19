FROM node:18-alpine

WORKDIR /app

# Copia os arquivos do backend
COPY src/back/package*.json ./
RUN npm install

# Copia o restante do código
COPY src/back/ ./

EXPOSE 5000
CMD ["npm", "run", "start:backend"]