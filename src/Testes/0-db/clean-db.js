import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Configuração para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis do arquivo .env (Sobe dois níveis e entra em back)
const envPath = path.join(__dirname, '../../back/.env');
dotenv.config({ path: envPath });

const uri = process.env.MONGO_URI;

console.log("PREPARANDO PARA LIMPAR O BANCO DE DADOS...");
console.log(`ATENCAO: Isso apagara TODAS as colecoes em: ${uri.split('@')[1]}`);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Solicita confirmação do usuário antes de prosseguir com a exclusão
rl.question('Tem certeza que deseja continuar? Digite "SIM" para confirmar: ', async (answer) => {
    if (answer !== 'SIM' && answer !== 'sim' && answer !== 'Sim') {
        console.log("Operacao cancelada.");
        process.exit(0);
    }

    try {
        // Conecta ao banco de dados
        await mongoose.connect(uri);
        
        // Obtém a lista de todas as coleções
        const collections = await mongoose.connection.db.listCollections().toArray();

        if (collections.length === 0) {
            console.log("O banco ja esta vazio.");
        } else {
            // Itera sobre as coleções e as remove uma por uma
            for (const col of collections) {
                await mongoose.connection.db.dropCollection(col.name);
                console.log(`   Colecao '${col.name}' apagada.`);
            }
            console.log("Banco de dados limpo com sucesso!");
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Erro ao limpar banco:", error.message);
        process.exit(1);
    }
});