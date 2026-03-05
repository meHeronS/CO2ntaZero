
import { startServer } from './server.js';
import dotenv from 'dotenv';

dotenv.config();

// Define uma porta específica para os testes para não conflitar com a 5000
const TEST_PORT = 5001;
// Define o ambiente como 'test' para que o server use o MONGO_URI_TEST, se configurado
process.env.NODE_ENV = 'test';

(async () => {
  try {
    const app = await startServer({ port: TEST_PORT });
    console.log(`[TEST SERVER] Servidor rodando em http://localhost:${TEST_PORT}`);
  } catch (err) {
    console.error('[TEST SERVER] Falha ao iniciar:', err);
    process.exit(1);
  }
})();
