import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis do arquivo .env (Sobe dois níveis e entra em back)
const envPath = path.join(__dirname, '../../back/.env');
dotenv.config({ path: envPath });

const mainUri = process.env.MONGO_URI;

if (!mainUri) {
    console.error("Erro: MONGO_URI nao encontrado no .env");
    process.exit(1);
}

// Substitui o nome do banco 'co2ntazero' por 'co2ntazero-test' na string de conexão
const testUri = mainUri.replace('/co2ntazero', '/co2ntazero-test');

console.log("Iniciando criacao do banco de dados de TESTE...");
console.log(`Alvo: co2ntazero-test`);

try {
    await mongoose.connect(testUri);
    console.log("Conectado ao cluster.");

    // Cria uma coleção e insere um documento para forçar o MongoDB a criar o banco fisicamente
    const TestModel = mongoose.model('_SetupTestDB', new mongoose.Schema({ created: Date, info: String }));
    
    await TestModel.create({ 
        created: new Date(), 
        info: "Este documento garante que o banco de testes existe." 
    });

    console.log("Banco 'co2ntazero-test' criado com sucesso no MongoDB Atlas!");
    await mongoose.disconnect();
    process.exit(0);
} catch (error) {
    console.error("Erro ao criar banco de teste:", error);
    process.exit(1);
}
