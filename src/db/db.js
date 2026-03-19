// =================================================================================
// ARQUIVO: db/db.js
// DESCRIÇÃO: Responsável pela conexão com o MongoDB e validação estrutural do sistema.
//            Garante a integridade do banco de dados (Collections) e valida se o
//            ambiente (servidor, variáveis de ambiente e conexões) 
//            está operacional na inicialização.
// =================================================================================

import mongoose from "mongoose";

/**
 * Função interna para validar e criar Collections que possam estar faltando.
 */
const initializeCollections = async (db) => {
  const expectedCollections = [
    'users',
    'companies',
    'consumptions',
    'wastes',
    'alerts',
    'goals',
    'emissionfactors',
    'sessiontokens',
    'logs'
  ];

  try {
    const existingCollectionsCursor = await db.db.listCollections().toArray();
    const existingCollections = existingCollectionsCursor.map(c => c.name);

    for (const collectionName of expectedCollections) {
      if (!existingCollections.includes(collectionName)) {
        console.log(`[DB Setup] Criando collection ausente: '${collectionName}'...`);
        await db.db.createCollection(collectionName);
      }
    }
    console.log('[2/3] Validação de Collections concluída! Estrutura do banco garantida.');
  } catch (error) {
    console.error('Aviso durante a validação de collections:', error.message);
  }
};

/**
 * Função de validação de ambiente e status da infraestrutura.
 */
const checkSystemHealth = () => {
  console.log('\nIniciando validação do ambiente do sistema...');
  
  if (!process.env.MONGO_URI) {
    console.error('ERRO CRÍTICO: Variável MONGO_URI não encontrada.');
    console.error('O sistema não conseguirá conectar ao banco. Verifique seu arquivo .env ou o Docker Compose.');
    process.exit(1);
  }

  console.log('[1/3] Backend operacional e Variáveis de Ambiente validadas.');
};

/**
 * Estabelece a conexão principal com o MongoDB e engatilha validações.
 */
export const connectDB = async (dbUri) => {
  checkSystemHealth();

  try {
    console.log('Tentando conectar ao banco de dados (MongoDB)...');
    const conn = await mongoose.connect(dbUri);
    await initializeCollections(conn.connection);
    console.log('[3/3] Conexão com o banco estabelecida com sucesso!');
    console.log('Integração Backend ↔ Banco de Dados ↔ Infraestrutura 100% pronta.');
  } catch (error) {
    console.error(`Erro crítico ao conectar no MongoDB: ${error.message}`);
    console.error(`Dica: Se estiver usando Docker, valide se o container do banco subiu corretamente ou se o IP está liberado na nuvem.`);
    process.exit(1);
  }
};