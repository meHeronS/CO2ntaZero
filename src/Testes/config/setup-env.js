import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para ES Modules para obter __dirname de forma segura
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis de ambiente do .env, independente de onde o comando npm test for executado
const envPath = path.join(__dirname, '../../back/.env');
dotenv.config({ path: envPath });