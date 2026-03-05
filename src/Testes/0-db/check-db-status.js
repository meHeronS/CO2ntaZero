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

const uri = process.env.MONGO_URI;

console.log("Verificando status do banco de dados...");

try {
    // Tenta estabelecer conexão com o banco de dados usando a URI configurada
    await mongoose.connect(uri);
    const dbName = mongoose.connection.name;
    console.log(`Banco conectado: ${dbName}`);

    // Lista todas as coleções existentes no banco de dados
    const collections = await mongoose.connection.db.listCollections().toArray();

    if (collections.length === 0) {
        console.log("O banco esta VAZIO (nenhuma colecao encontrada).");
    } else {
        console.log(`Encontradas ${collections.length} colecoes:`);
        
        // Itera sobre cada coleção para contar quantos documentos existem nela
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`   - ${col.name}: ${count} documentos`);
        }
    }

    // Fecha a conexão com o banco de dados
    await mongoose.disconnect();
    console.log("\nVerificacao concluida.");
    process.exit(0);

} catch (error) {
    console.error("Erro ao verificar banco:", error.message);
    process.exit(1);
}