import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para ES Modules para obter __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis do arquivo .env (Sobe dois níveis e entra em back)
// src/Testes/0-db/ -> src/Testes/ -> src/ -> src/back/.env
const envPath = path.join(__dirname, '../../back/.env');
dotenv.config({ path: envPath });
console.log(`Lendo configuracao de: ${envPath}`);

console.log("Tentando conectar ao MongoDB Atlas...");

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("ERRO CRITICO: Variavel MONGO_URI nao encontrada.");
    console.error("Verifique se o arquivo .env existe na pasta src/back e se contem a chave MONGO_URI.");
    process.exit(1);
}

// Extrai o host da URI para validação de segurança (evitar conexão em banco errado)
const host = uri.split('@')[1]?.split('/')[0];
console.log(`URI Host: ${host}`);

if (host && !host.includes('studiescluster')) {
  console.warn("AVISO: Voce esta tentando conectar ao cluster ANTIGO ou INCORRETO. Verifique seu arquivo .env!");
}

try {
  // Tenta conectar ao Mongoose
  await mongoose.connect(uri);
  console.log("SUCESSO! Conexao estabelecida com o banco de dados.");
  console.log(`Database: ${mongoose.connection.name}`);

  // Validação extra: Listar coleções para provar que temos acesso de leitura
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("\nTeste de Acesso:");
  if (collections.length > 0) {
      console.log(`   Colecoes encontradas: ${collections.map(c => c.name).join(', ')}`);
  } else {
      console.log("   Conexao OK, mas o banco esta vazio (sem colecoes criadas ainda).");
  }

  if (mongoose.connection.name !== 'co2ntazero') {
      console.warn(`ATENCAO: O banco conectado e '${mongoose.connection.name}', verifique se nao deveria ser 'co2ntazero'.`);
  }
  await mongoose.connection.close();
  process.exit(0);
} catch (error) {
  console.error("ERRO DE CONEXAO:", error.message);

  if (host && !host.includes('studiescluster')) {
    console.error("\nDIAGNOSTICO: O erro ocorreu porque o endereco no .env aponta para um cluster que nao existe ou esta incorreto.");
    console.error("ACAO NECESSARIA: Atualize o arquivo .env com a string de conexao do novo cluster (studiescluster).");
  } else if (error.message.includes("_mongodb._tcp")) {
    console.error("\nDICA: O erro '_mongodb._tcp' indica bloqueio de rede.");
    console.error("Va no MongoDB Atlas > Network Access > Add IP Address > Allow Access from Anywhere (0.0.0.0/0)");
  } else if (error.message.includes("bad auth")) {
    console.error("\nDICA: Erro de autenticacao. Verifique se o usuario e senha no .env estao corretos.");
  }
  process.exit(1);
}
