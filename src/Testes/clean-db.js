// clean-db.js
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Ajuste os caminhos se necessário para importar seus modelos
import Alert from "../models/Alert.js"; 
import Company from "../models/Company.js"; 
import Goal from "../models/Goal.js"; 
import Log from "../models/Logs.js"; 
import Permission from "../models/Permission.js"; 
import SessionToken from "../models/SessionToken.js"; 
import User from "../models/User.js"; 
import Consumption from "../models/Consumption.js";
import EmissionFactor from "../models/EmissionFactor.js";

dotenv.config();

// Usa a variável de desenvolvimento por padrão, garantindo que este script
// limpe o banco de dados correto para o ambiente de desenvolvimento.
const dbURI = process.env.MONGO_URI_DEV; 

if (!dbURI) {
    console.error("🔴 ERRO: A variável de ambiente MONGO_URI_DEV não está definida.");
    process.exit(1);
}

const cleanDatabase = async () => {
    try {
        console.log('--- ⏳ Conectando ao banco de dados para limpeza...');
        await mongoose.connect(dbURI);
        console.log('✅ Conectado!');

        console.log('--- 🧹 Limpando o banco de dados ---');
        
        // Lista de coleções para limpar, incluindo as que não são mais usadas
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
        ];
        
        for (const collectionName of collectionsToClean) {
            try {
                await mongoose.connection.collection(collectionName).deleteMany({});
                console.log(`- Coleção '${collectionName}' limpa.`);
            } catch (err) {
                if (err.codeName !== 'NamespaceNotFound') {
                    console.warn(`- Aviso ao limpar '${collectionName}': ${err.message}`);
                }
            }
        }
        
        console.log('\n✅ Banco de dados limpo com sucesso!');
    } catch (error) {
        console.error('🔴 Erro durante a limpeza do banco de dados:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado do banco de dados.');
        process.exit();
    }
};

cleanDatabase();