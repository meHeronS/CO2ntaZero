/**
 * =================================================================================
 * ARQUIVO: Testes/config/globalSetup.cjs
 * DESCRIÇÃO: Script executado uma única vez ANTES de toda a suíte de testes.
 *            Prepara o ambiente global: conecta ao banco, cria dados de teste (seeding)
 *            e inicializa o servidor da API.
 * =================================================================================
 */
// CORREÇÃO DEFINITIVA: Carrega as variáveis de ambiente no início do script.
// Isso garante que `process.env.MONGO_URI` esteja disponível antes de qualquer outra operação.
// Esta é a abordagem mais robusta, pois torna o script autossuficiente.
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../back/.env') });

const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// CORREÇÃO: Usa .default para importar ES Modules em um arquivo CommonJS.
const Company = require('../../back/models/Company.js').default;
const User = require('../../back/models/User.js').default;
const SessionToken = require('../../back/models/SessionToken.js').default;
const { faker } = require('@faker-js/faker');
module.exports = async () => {
  console.log('\n--- [GLOBAL SETUP] Iniciando ambiente de teste ---');

  // Valida a existência da string de conexão do MongoDB
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('ERRO FATAL: A variável MONGO_URI não está definida no seu arquivo .env.');
  }

  // Conecta ao banco de dados e armazena a conexão em uma variável global
  const conn = await mongoose.connect(mongoUri);
  global.__MONGO_CONNECTION__ = conn;

  // Inicia o servidor da API PRIMEIRO para descobrir a porta correta.
  const serverModule = await import('../../back/server.js');
  const server = await serverModule.startServer({ dbUri: mongoUri, port: process.env.PORT || 5000 });

  const cleanupIds = { companies: [], users: [] };
  const passwordHash = await bcrypt.hash('password123', 10);

  // Cria a Empresa A e o Usuário A para os testes
  const userACpf = `${Date.now()}`.slice(-11);
  const companyA = await Company.create({ 
    name: 'Empresa A de Teste', 
    type: 'BUSINESS',
    ownerId: new mongoose.Types.ObjectId(), // Fake until user is created
    cnpj: `00000000${Date.now()}`.slice(-14) 
  });
  const userA = await User.create({
    name: 'Usuário A',
    email: `usera_${Date.now()}@test.com`,
    cpf: userACpf,
    passwordHash: passwordHash,
    companyId: companyA._id,
    companies: [companyA._id]
  });
  companyA.ownerId = userA._id;
  await companyA.save();
  cleanupIds.companies.push(companyA._id);
  cleanupIds.users.push(userA._id);

  // Cria a Empresa B e o Usuário B para os testes de multi-tenancy
  const userBCpf = `${Date.now() + 1}`.slice(-11);
  const companyB = await Company.create({ 
    name: 'Empresa B de Teste', 
    type: 'BUSINESS',
    ownerId: new mongoose.Types.ObjectId(),
    cnpj: `00000001${Date.now()}`.slice(-14) 
  });
  const userB = await User.create({
    name: 'Usuário B',
    email: `userb_${Date.now()}@test.com`,
    cpf: userBCpf,
    passwordHash: passwordHash,
    companyId: companyB._id,
    companies: [companyB._id]
  });
  companyB.ownerId = userB._id;
  await companyB.save();
  cleanupIds.companies.push(companyB._id);
  cleanupIds.users.push(userB._id);

  // Função auxiliar para gerar tokens JWT
  const generateToken = (userId, companyId) => {
    return jwt.sign({ userId, companyId }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
  };

  // Monta um objeto com todos os dados de setup, que será salvo em um arquivo JSON
  // para ser lido pelos arquivos de teste individuais.
  const setupData = {
    // Garante que a URL da API use a porta que foi efetivamente alocada pelo startServer,
    // que pode ser 5000, 5001, etc.
    apiUrl: `http://localhost:${process.env.PORT}/api`,
    companyA: {
      _id: companyA._id.toString(),
      name: companyA.name,
      userId: userA._id.toString(),
      email: userA.email,
      password: 'password123',
      token: generateToken(userA._id, companyA._id),
    },
    companyB: {
      _id: companyB._id.toString(),
      name: companyB.name,
      userId: userB._id.toString(),
      email: userB.email,
      password: 'password123',
      token: generateToken(userB._id, companyB._id),
    },
  };

  // Salva os dados de setup em um arquivo para que os testes possam acessá-los.
  const setupFilePath = path.join(__dirname, '..', 'test-setup.json');
  fs.writeFileSync(setupFilePath, JSON.stringify(setupData, null, 2));

  global.__TEST_CLEANUP_IDS__ = cleanupIds;
  global.__SERVER__ = server;
  global.__SERVER_MODULE__ = serverModule;

  console.log('--- [GLOBAL SETUP] Ambiente pronto e servidor iniciado ---');
};