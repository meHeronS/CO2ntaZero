/**
 * =================================================================================
 * ARQUIVO: Scripts/create-test-companies.js
 *
 * DESCRIÇÃO:
 *            Este script é uma ferramenta de desenvolvimento para criar um conjunto
 *            de empresas e usuários de teste fixos e persistentes.
 *            É ideal para ser usado em demonstrações e para o desenvolvimento do frontend,
 *            pois garante que sempre haverá dados consistentes para login.
 *
 * COMO USAR:
 *            Execute `npm run db:populate` na pasta `src/back`.
 * =================================================================================
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import Company from '../back/models/Company.js';
import User from '../back/models/User.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const companiesToCreate = [
  {
    companyName: 'Empresa Frontend',
    cnpj: '11111111000111',
    userName: 'Usuário Frontend',
    email: 'empresa-frontend@test.com',
    cpf: '111.111.111-11',
    password: 'password123',
  },
  {
    companyName: 'Empresa Backend',
    cnpj: '22222222000122',
    userName: 'Usuário Backend',
    email: 'empresa-backend@test.com',
    cpf: '222.222.222-22',
    password: 'password123',
  },
  {
    companyName: 'Empresa React',
    cnpj: '33333333000133',
    userName: 'Usuário React',
    email: 'empresa-react@test.com',
    cpf: '333.333.333-33',
    password: 'password123',
  },
];

const createTestCompanies = async () => {
  console.log('\n--- Iniciando criacao de empresas de teste fixas ---');
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const passwordHash = await bcrypt.hash('password123', 10);
    const createdData = [];

    for (const companyData of companiesToCreate) {
      const existingCompany = await Company.findOne({ cnpj: companyData.cnpj });

      if (existingCompany) {
        console.log(`[AVISO] Empresa com CNPJ "${companyData.cnpj}" ja existe. Pulando criacao.`);
        const user = await User.findOne({ email: companyData.email });
        createdData.push({ ...companyData, userId: user?._id });
        continue;
      }

      // Cria o objeto do usuário primeiro para ter o ID (necessário para o ownerId da empresa)
      const newUser = new User({
        name: companyData.userName,
        email: companyData.email,
        cpf: companyData.cpf,
        passwordHash,
      });

      const newCompany = new Company({
        name: companyData.companyName,
        cnpj: companyData.cnpj,
        type: 'BUSINESS', // Explicitamente define o tipo como empresa
        email: companyData.email,
        ownerId: newUser._id
      });
      await newCompany.save();

      // Atualiza o usuário com a empresa criada
      newUser.companyId = newCompany._id;
      newUser.companies = [newCompany._id];
      await newUser.save();

      createdData.push({ ...companyData, userId: newUser._id });
      console.log(`[OK] Empresa "${companyData.companyName}" e usuario associado criados com sucesso.`);
    }

  } catch (error) {
    console.error('\n[ERRO] Erro ao criar empresas de teste:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createTestCompanies();