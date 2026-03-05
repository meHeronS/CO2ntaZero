// seed.js (Antigo populate-db.js)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker/locale/pt_BR';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// Ajuste de caminhos: Agora apontam para ../back/models
import User from '../back/models/User.js';
import Company from '../back/models/Company.js';
import Consumption from '../back/models/Consumption.js';
import EmissionFactor from '../back/models/EmissionFactor.js';
import Permission from '../back/models/Permission.js';
import bcrypt from 'bcryptjs';

import { initPermissions } from './initPermissions.js';

// Configura o dotenv para ler o arquivo .env que está na pasta back
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Usa a variável de desenvolvimento por padrão.
const dbURI = process.env.MONGO_URI_DEV || process.env.MONGO_URI; 

if (!dbURI) {
    console.error("🔴 ERRO: A variável de ambiente MONGO_URI_DEV (ou MONGO_URI) não está definida.");
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
        console.log('✅ Conectado ao banco de dados para seed.');
    } catch (err) {
        console.error('🔴 Falha ao conectar ao banco de dados:', err.message);
        process.exit(1);
    }
};

/**
 * Simula o registro e login de uma empresa e seu admin, retornando o token de acesso.
 */
const registerAndLogin = async (companyName) => {
    const adminEmail = `admin@${companyName.toLowerCase().replace(/\s/g, '')}.com`;
    const adminPassword = 'senhaforte123';

    // --- ETAPA 1: AGIR COMO ROOT (Acesso direto ao DB) ---
    console.log(`- [ROOT] Validando estado da empresa '${companyName}'...`);

    const adminRole = await Permission.findOne({ name: 'ADMIN_COMPANY' });
    if (!adminRole) {
        throw new Error('Permissão "ADMIN_COMPANY" não encontrada. Execute initPermissions.');
    }

    let company = await Company.findOne({ name: companyName });
    if (!company) {
        console.log(`- [ROOT] Empresa '${companyName}' não encontrada. Criando...`);
        company = await Company.create({
            name: companyName,
            cnpj: faker.string.numeric(14),
            email: adminEmail,
        });
    }

    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
        console.log(`- [ROOT] Usuário admin '${adminEmail}' não encontrado. Criando...`);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);
        adminUser = await User.create({
            name: `Admin ${companyName}`,
            email: adminEmail,
            passwordHash,
            companyId: company._id,
            role: adminRole._id,
        });
    } else if (adminUser.role.toString() !== adminRole._id.toString()) {
        adminUser.role = adminRole._id;
        await adminUser.save();
    }

    // --- ETAPA 2: AGIR COMO CLIENTE DA API ---
    console.log(`- [API] Tentando login como '${adminEmail}'...`);
    try {
        const loginResponse = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: adminPassword });        
        
        return {
            adminToken: loginResponse.data.data.token,
            companyName: company.name,
            companyCnpj: company.cnpj,
            adminEmail: adminUser.email,
            adminName: adminUser.name,
            adminPassword: adminPassword,
        };
    } catch (error) {
        console.error(`🔴 Erro no login via API para '${adminEmail}': ${error.message}`);
        throw error;
    }
};

const createGoalsForCompany = async (token, count) => {
    const goalTitles = [
        'Reduzir consumo de energia em 10%', 'Zerar consumo de plásticos',
        'Reduzir consumo de água', 'Atingir neutralidade de carbono', 'Coleta seletiva'
    ];
    const promises = [];
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
        promises.push(axios.post(`${API_URL}/goals`, payload, { headers: { Authorization: `Bearer ${token}` } }));
    }
    await Promise.all(promises);
};

const createConsumptionsForCompany = async (token, count) => {
    const resourceTypes = ['electricity', 'water', 'gas', 'fuel'];
    const units = { electricity: 'kWh', water: 'm3', gas: 'm3', fuel: 'liters' };
    const promises = [];

    for (let i = 0; i < count; i++) {
        const resourceType = faker.helpers.arrayElement(resourceTypes);
        const payload = {
            resourceType: resourceType,
            quantity: faker.number.float({ min: 50, max: 2000, multipleOf: 0.01 }),
            unit: units[resourceType],
            date: faker.date.recent({ days: 60 }),
            description: `Consumo de ${resourceType}`,
            cost: faker.number.float({ min: 100, max: 5000, multipleOf: 0.01 })
        };
        promises.push(axios.post(`${API_URL}/consumptions`, payload, { headers: { Authorization: `Bearer ${token}` } }));
    }
    await Promise.all(promises);
};

const generateDocs = async (summaryData) => {
    // Ajuste de caminho para salvar a documentação na pasta correta (relativo à execução)
    const docPath = path.join('Testes', 'Docs', 'dados-empresas-teste.md');
    
    let markdownContent = `# Credenciais das Empresas de Teste\n\n> Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
    for (const data of summaryData) {
        markdownContent += `## ${data.companyName}\n| Campo | Valor |\n|---|---|\n| Email | \`${data.adminEmail}\` |\n| Senha | \`${data.adminPassword}\` |\n\n`;
    }

    try {
        await fs.mkdir(path.dirname(docPath), { recursive: true });
        await fs.writeFile(docPath, markdownContent, 'utf-8');
        console.log(`✅ Documentação atualizada em '${docPath}'`);
    } catch (error) {
        console.error(`🔴 Falha ao escrever documentação:`, error);
    }
};

const run = async () => {
    await connectDB();
    console.log('\n--- 🌱 Iniciando população do banco de dados ---');

    try {
        await initPermissions();
        const createdDataSummary = [];
        const companiesToProcess = ['Empresa FrontEnd', 'Empresa BackEnd', 'Empresa React'];

        for (const companyName of companiesToProcess) {
            console.log(`\n--- Processando '${companyName}' ---`);
            const companyData = await registerAndLogin(companyName);
            createdDataSummary.push(companyData);
            await createConsumptionsForCompany(companyData.adminToken, 5);
            await createGoalsForCompany(companyData.adminToken, 3);
        }
        await generateDocs(createdDataSummary);
    } catch (error) {
        console.error('🔴 Erro:', error.message);
    } finally {
        if (mongoose.connection.readyState === 1) await mongoose.disconnect();
    }
};

run();