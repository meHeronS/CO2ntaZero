# Usa uma imagem oficial do Node.js leve (Alpine)
FROM node:18-alpine

# Define a pasta de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia primeiro os arquivos de dependência (aproveita cache do Docker)
COPY package*.json ./

# Instala apenas as dependências de produção para deixar a imagem mais leve
RUN npm install --production

# Copia o restante do código da API
COPY . .

# Expõe a porta 5000 (ou a que for definida no Azure)
EXPOSE 5000

# Comando para rodar a aplicação no Azure / Docker
CMD ["npm", "start"]