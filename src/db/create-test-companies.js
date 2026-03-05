/**
 * ARQUIVO: src/db/create-test-companies.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Ajuste de imports para a nova estrutura de pastas
import Company from '../back/models/Company.js';
import User from '../back/models/User.js';
import Permission from '../back/models/Permission.js';
import { USER_COMPANY } from '../back/utils/constants.js';

// Garante leitura do .env na raiz do backend ou raiz do projeto
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const companiesToCreate = [
  {
    companyName: 'Empresa Frontend',
    cnpj: '11111111000111',
    userName: 'Usuário Frontend',
    email: 'empresa-frontend@test.com',
    password: 'password123',
  },
  {
    companyName: 'Empresa Backend',
    cnpj: '22222222000122',
    userName: 'Usuário Backend',
    email: 'empresa-backend@test.com',
    password: 'password123',
  },
  {
    companyName: 'Empresa React',
    cnpj: '33333333000133',
    userName: 'Usuário React',
    email: 'empresa-react@test.com',
    password: 'password123',
  },
];

const createTestCompanies = async () => {
  console.log('\n--- 🚀 Iniciando criação de empresas de teste fixas ---');
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI_DEV);

    const userPermission = await Permission.findOne({ name: USER_COMPANY });
    if (!userPermission) {
      throw new Error("Permissão de usuário padrão não encontrada. Execute `initPermissions` primeiro.");
    }

    const passwordHash = await bcrypt.hash('password123', 10);

    for (const companyData of companiesToCreate) {
      const existingCompany = await Company.findOne({ cnpj: companyData.cnpj });

      if (existingCompany) {
        console.log(`⚠️  Empresa "${companyData.companyName}" já existe.`);
        continue;
      }

      const newCompany = await Company.create({
        name: companyData.companyName,
        cnpj: companyData.cnpj,
        email: companyData.email,
      });

      await User.create({
        name: companyData.userName,
        email: companyData.email,
        passwordHash,
        companyId: newCompany._id,
        role: userPermission._id,
      });
      console.log(`✅ Empresa "${companyData.companyName}" criada.`);
    }
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createTestCompanies();