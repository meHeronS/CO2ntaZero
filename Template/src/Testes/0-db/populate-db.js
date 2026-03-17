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
import User from '../../back/models/User.js';
import Company from '../../back/models/Company.js';
import Consumption from '../../back/models/Consumption.js';
import EmissionFactor from '../../back/models/EmissionFactor.js';
import bcrypt from 'bcryptjs';

// Ajuste os caminhos se necessário para importar seus modelos
import Permission from '../../back/models/Permission.js'; 
import { initPermissions } from '../../back/scripts/initPermissions.js';

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

    // --- ETAPA 1: AGIR COMO ROOT (Acesso direto ao DB) ---
    console.log(`[ROOT] Validando estado da empresa '${companyName}' e do admin '${adminEmail}'...`);

    const adminRole = await Permission.findOne({ name: 'ADMIN_COMPANY' });
    if (!adminRole) {
        throw new Error('Permissão "ADMIN_COMPANY" não encontrada. O script initPermissions precisa ser executado.');
    }

    // Garante que a empresa exista
    let company = await Company.findOne({ name: companyName });
    if (!company) {
        console.log(`[ROOT] Empresa '${companyName}' nao encontrada. Criando...`);
        company = await Company.create({
            name: companyName,
            cnpj: faker.string.numeric(14),
            email: adminEmail,
        });
        console.log(`[ROOT] Empresa '${companyName}' criada com ID: ${company._id}`);
    }

    // Garante que o usuário admin exista e tenha a permissão correta
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
        console.log(`[ROOT] Usuario admin '${adminEmail}' nao encontrado. Criando...`);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);
        adminUser = await User.create({
            name: `Admin ${companyName}`,
            email: adminEmail,
            passwordHash,
            companyId: company._id,
            role: adminRole._id,
        });
        console.log(`[ROOT] Usuario admin '${adminEmail}' criado com a permissao correta.`);
    } else if (adminUser.role.toString() !== adminRole._id.toString()) {
        console.log(`[ROOT] Usuario '${adminEmail}' encontrado com a permissao errada. Corrigindo...`);
        adminUser.role = adminRole._id;
        await adminUser.save();
        console.log(`[ROOT] Permissao do usuario '${adminEmail}' corrigida para ADMIN_COMPANY.`);
    } else {
        console.log(`[ROOT] Usuario admin '${adminEmail}' ja existe e tem a permissao correta.`);
    }

    // --- ETAPA 2: AGIR COMO CLIENTE DA API ---
    console.log(`[API] Tentando login como '${adminEmail}' para obter token...`);
    try {
        const loginResponse = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: adminPassword });        
        console.log(`[API] Login realizado com sucesso.`);
        
        // Retorna um objeto completo com todos os dados relevantes
        return {
            adminToken: loginResponse.data.data.token,
            companyName: company.name,
            companyCnpj: company.cnpj,
            adminEmail: adminUser.email,
            adminName: adminUser.name,
            adminPassword: adminPassword,
        };
    } catch (error) {
        console.error(`Erro inesperado durante a tentativa de login via API para '${adminEmail}':`);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Mensagem:', error.message);
        }
        throw error; // Re-lança o erro original para obter o stack trace completo.
    }
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
            type: faker.helpers.arrayElement(['anomaly_detected', 'goal_at_risk', 'limit_exceeded']),
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
            quantity: faker.number.float({ min: 50, max: 2000, multipleOf: 0.01 }),
            unit: units[resourceType],
            date: faker.date.recent({ days: 60 }),
            description: `Consumo de ${resourceType} - ${faker.date.past().getMonth()}`,
            cost: faker.number.float({ min: 100, max: 5000, multipleOf: 0.01 })
        };
        console.log(`   - [API] Criando consumo: ${resourceType} (${payload.quantity} ${payload.unit})`);
        const promise = axios.post(`${API_URL}/consumptions`, payload, { headers: { Authorization: `Bearer ${token}` } });
        consumptionPromises.push(promise);
    }

    await Promise.all(consumptionPromises);
    console.log(`${count} consumos criados com sucesso.`);
};

/**
 * Cria usuários comuns (não-admin) para uma empresa.
 * Requer o token de um admin para autorização.
 */
const createStandardUsersForCompany = async (adminToken, count) => {
    console.log(`Criando ${count} novos usuarios comuns (nao-admin) via API...`);

    // Busca o ID da permissão 'USER_COMPANY' para usar na criação.
    const userRole = await Permission.findOne({ name: 'USER_COMPANY' }).lean();
    if (!userRole) {
        throw new Error('A permissão "USER_COMPANY" não foi encontrada. O script initPermissions precisa ser executado.');
    }

    for (let i = 0; i < count; i++) {
        try {
            const payload = {
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: 'senhafraca123',
                role: userRole._id, // Envia o ObjectId da permissão de usuário comum
            };
            const response = await axios.post(`${API_URL}/users`, payload, { headers: { Authorization: `Bearer ${adminToken}` } });
            const createdId = response.data?.data?._id;
            console.log(`   - [API] Usuario '${payload.email}' criado com ID: ${createdId}`);
        } catch (error) {
            console.error(`   - [API] Falha ao criar usuario: ${error.response?.data?.message || error.message}`);
        }
    }
    console.log(`${count} usuarios comuns criados com sucesso.`);
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
        // Garante que as permissões básicas existam antes de criar usuários.
        await initPermissions();
        // await seedEmissionFactors(); // Comentado pois não temos o import/arquivo no contexto atual
        const createdDataSummary = [];

        const companiesToProcess = ['Empresa FrontEnd', 'Empresa BackEnd', 'Empresa React'];

        for (const companyName of companiesToProcess) {
            console.log(`\nProcessando a '${companyName}' ---`);
            const companyData = await registerAndLogin(companyName);
            createdDataSummary.push(companyData);
            
            // Para cada empresa, cria 5 de cada tipo de processo usando a API
            await createStandardUsersForCompany(companyData.adminToken, 3); // Cria 3 usuários comuns
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