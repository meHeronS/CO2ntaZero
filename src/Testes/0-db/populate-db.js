// populate-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker/locale/pt_BR'; // Importa o faker com a localização para Português do Brasil
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importa os modelos do Backend (Sobe 2 níveis e entra em back/models)

// Carrega as variáveis do arquivo .env do backend
const envPath = path.join(__dirname, '../../back/.env');
dotenv.config({ path: envPath });

const dbURI = process.env.MONGO_URI; 
if (!dbURI) {
    console.error("ERRO: A variavel de ambiente MONGO_URI nao esta definida.");
    process.exit(1);
}

// URL base da sua API. O servidor precisa estar rodando.
const API_URL = `http://localhost:${process.env.PORT || 5000}/api`;

/**
 * Conecta ao banco de dados.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao banco de dados.');
    } catch (err) {
        console.error('Falha ao conectar ao banco de dados:', err.message);
        process.exit(1);
    }
};

/**
 * Simula o registro e login de uma empresa e seu admin, retornando o token de acesso.
 * Se o usuário já existir, apenas faz o login.
 */
const registerAndLogin = async (companyName) => {
    const adminEmail = `admin@${companyName.toLowerCase().replace(/\s/g, '')}.com`;
    const adminPassword = 'senhaforte123';

    console.log(`[API] Validando registro e login da empresa '${companyName}'...`);
    
    let adminToken;
    let companyCnpj = faker.string.numeric(14);
    
    try {
        // Tenta logar primeiro
        const loginRes = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: adminPassword });
        adminToken = loginRes.data.data.token;
        console.log(`[API] Usuário já existia. Login realizado com sucesso.`);
    } catch (err) {
        // Se falhar, registra
        console.log(`[API] Usuário não encontrado. Registrando...`);
        await axios.post(`${API_URL}/auth/register`, {
            name: `Admin ${companyName}`,
            email: adminEmail,
            password: adminPassword,
            cpf: faker.string.numeric(11),
            type: 'BUSINESS',
            companyName: companyName,
            cnpj: companyCnpj,
            companyEmail: adminEmail
        });
        console.log(`[API] Registro concluído. Efetuando login...`);
        const loginRes = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: adminPassword });
        adminToken = loginRes.data.data.token;
    }

    return {
        adminToken,
        companyName,
        companyCnpj,
        adminEmail,
        adminName: `Admin ${companyName}`,
        adminPassword
    };
};



/**
 * Cria metas aleatórias para uma empresa.
 */
const createGoalsForCompany = async (token, count) => {
    console.log(`Criando ${count} novas metas via API...`);
    const goalPromises = [];

    // Metas de Redução de Impacto Ambiental
    const goalTitles = [
        'Reduzir consumo de energia em 10%',
        'Zerar consumo de plásticos descartáveis',
        'Reduzir consumo de água no processo X',
        'Atingir neutralidade de carbono até 2030',
        'Implementar coleta seletiva em 100% da empresa'
    ];

    for (let i = 0; i < count; i++) {
        const payload = {
            title: faker.helpers.arrayElement(goalTitles), 
            resourceType: faker.helpers.arrayElement(['electricity', 'water', 'carbon_footprint', 'waste']),
            targetReductionPercentage: faker.number.int({ min: 5, max: 50 }),
            baselineConsumption: faker.number.int({ min: 1000, max: 50000 }),
            startDate: new Date(),
            deadline: faker.date.future({ years: 1 }),
            status: 'active'
        };
        console.log(`   - [API] Criando meta: "${payload.title}"`);
        const promise = axios.post(`${API_URL}/goals`, payload, { headers: { Authorization: `Bearer ${token}` } });
        goalPromises.push(promise);
    }
    await Promise.all(goalPromises);
    console.log(`${count} metas criadas com sucesso.`);
};

/**
 * Cria alertas aleatórios para uma empresa.
 */
const createAlertsForCompany = async (token, count) => {
    console.log(`Criando ${count} novos alertas via API...`);
    const alertPromises = [];
    for (let i = 0; i < count; i++) {
        const payload = {
            message: faker.lorem.sentence(5),
            type: faker.helpers.arrayElement(['anomaly_detected', 'goal_achieved', 'limit_approaching']),
            read: false
        };
        // Assumindo que existe uma rota POST /api/alerts para criar alertas manualmente (pode não existir)
        // Se não existir, esta parte pode ser comentada ou a rota precisa ser criada.
        console.log(`   - [API] Criando alerta: ${payload.message}`);
        const promise = axios.post(`${API_URL}/alerts`, payload, { headers: { Authorization: `Bearer ${token}` } });
        alertPromises.push(promise);
    }
    await Promise.all(alertPromises);
    console.log(`${count} alertas criados com sucesso.`);
};

/**
 * Cria registros de consumo para uma empresa.
 */
const createConsumptionsForCompany = async (token, count) => {
    console.log(`Criando ${count} novos registros de consumo via API...`);
    const consumptionPromises = [];

    const resourceTypes = ['electricity', 'water', 'gas', 'fuel'];
    const units = { electricity: 'kWh', water: 'm3', gas: 'm3', fuel: 'liters' };

    for (let i = 0; i < count; i++) {
        const resourceType = faker.helpers.arrayElement(resourceTypes);
        
        const payload = {
            resourceType: resourceType,
            quantity: faker.number.float({ min: 50, max: 2000 }),
            unit: units[resourceType],
            date: faker.date.recent({ days: 60 }),
            notes: `Consumo de ${resourceType} - ${faker.date.past().getMonth()}`,
            cost: faker.number.float({ min: 100, max: 5000 })
        };
        console.log(`   - [API] Criando consumo: ${resourceType} (${payload.quantity} ${payload.unit})`);
        const promise = axios.post(`${API_URL}/consumptions`, payload, { headers: { Authorization: `Bearer ${token}` } });
        consumptionPromises.push(promise);
    }

    await Promise.all(consumptionPromises);
    console.log(`${count} consumos criados com sucesso.`);
};

/**
 * Gera e salva o arquivo de documentação com os dados das empresas de teste.
 * @param {Array} summaryData - Um array de objetos com os dados de cada empresa.
 */
const generateDocs = async (summaryData) => {
    const docPath = path.join(__dirname, '../Docs/dados-empresas-teste.md');
    console.log(`\nGerando documentacao em '${docPath}' ---`);

    let markdownContent = `# Credenciais das Empresas de Teste Manuais\n\n`;
    markdownContent += `> **Nota:** Este arquivo é gerado e atualizado automaticamente pelo script \`npm run db:populate\`. Ele contém os dados detalhados das empresas de teste para validação manual e exploração da API.\n\n`;
    markdownContent += `> **Ultima atualizacao:** ${new Date().toLocaleString('pt-BR')}\n\n`;

    for (const data of summaryData) {
        markdownContent += `---\n\n`;
        markdownContent += `## ${data.companyName}\n\n`;
        markdownContent += `| Campo | Valor |\n`;
        markdownContent += `|---|---|\n`;
        markdownContent += `| Nome da Empresa | \`${data.companyName}\` |\n`;
        markdownContent += `| CNPJ | \`${data.companyCnpj}\` |\n`;
        markdownContent += `| E-mail do Admin | \`${data.adminEmail}\` |\n`;
        markdownContent += `| Nome do Admin | \`${data.adminName}\` |\n`;
        markdownContent += `| Senha do Admin | \`${data.adminPassword}\` |\n`;
        markdownContent += `| Access Token | \`\`\`${data.adminToken}\`\`\` |\n\n`;
    }

    try {
        // Garante que o diretório exista
        await fs.mkdir(path.dirname(docPath), { recursive: true });
        await fs.writeFile(docPath, markdownContent, 'utf-8');
        console.log(`Documentacao '${docPath}' atualizada com sucesso!`);
    } catch (error) {
        console.error(`Falha ao escrever o arquivo de documentacao:`, error);
    }
};

const run = async () => {
    await connectDB();
    console.log('\nIniciando populacao do banco de dados ---');

    try {
        const createdDataSummary = [];

        const companiesToProcess = ['Empresa FrontEnd', 'Empresa BackEnd', 'Empresa React'];

        for (const companyName of companiesToProcess) {
            console.log(`\nProcessando a '${companyName}' ---`);
            const companyData = await registerAndLogin(companyName);
            createdDataSummary.push(companyData);
            
            await createConsumptionsForCompany(companyData.adminToken, 5);
            await createGoalsForCompany(companyData.adminToken, 5);
            await createAlertsForCompany(companyData.adminToken, 3); // Cria 3 alertas para cada empresa
        }

        // Ao final, gera a documentação e exibe um resumo no console.
        await generateDocs(createdDataSummary);

    } catch (error) {
        console.error('Erro durante a populacao do banco:', error.stack || error); // Loga o stack trace completo
    } finally {
        console.log('\nProcesso de populacao finalizado com sucesso! ---');
        if (mongoose.connection.readyState === 1) await mongoose.disconnect();
        console.log('Desconectado do banco de dados.');
    }
};

run().catch(error => {
    console.error('Ocorreu um erro inesperado:', error);
    process.exit(1);
});