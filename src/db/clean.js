// clean.js (Antigo clean-db.js)
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';

// Configura o dotenv para ler o arquivo .env que está na pasta back (assumindo execução via npm script do back)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const dbURI = process.env.MONGO_URI_DEV || process.env.MONGO_URI;

if (!dbURI) {
    console.error("🔴 ERRO: Variável MONGO_URI não definida.");
    process.exit(1);
}

const cleanDatabase = async () => {
    try {
        console.log('--- ⏳ Conectando ao banco de dados para limpeza...');
        await mongoose.connect(dbURI);
        console.log('✅ Conectado!');

        console.log('--- 🧹 Limpando coleções ---');
        
        const collectionsToClean = [
            'consumptions',
            'emissionfactors',
            'goals',
            'users',
            'companies',
            'permissions',
            'sessiontokens',
            'alerts',
            'logs',
            'wastes'
        ];
        
        for (const collectionName of collectionsToClean) {
            try {
                await mongoose.connection.collection(collectionName).deleteMany({});
                console.log(`- Coleção '${collectionName}' limpa.`);
            } catch (err) {
                // Ignora erro se a coleção não existir
            }
        }
        console.log('\n✅ Banco de dados limpo com sucesso!');
    } catch (error) {
        console.error('🔴 Erro:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

cleanDatabase();