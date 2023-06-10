# Usar uma imagem Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código-fonte para o diretório de trabalho
COPY . .

# Compilar os arquivos TypeScript em JavaScript
RUN npm run build

# Expor a porta do servidor Express
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm","start"]

