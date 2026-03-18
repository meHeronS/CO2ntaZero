// =================================================================================
// ARQUIVO: db/seed.js
// DESCRIÇÃO: Script de população (Seed) do banco de dados.
//            Este script limpa e insere os "Fatores de Emissão" baseados em 
//            fontes oficiais (MCTI, FGV, EPE) necessários para o Motor de Cálculo.
// EXECUÇÃO:  node src/db/seed.js
// =================================================================================

import mongoose from 'mongoose';

// Definição local do Schema para garantir que o Seed rode independente do Backend estar ligado
const emissionFactorSchema = new mongoose.Schema({
  source: { type: String, required: true },
  factor: { type: Number, required: true },
  unit: { type: String, required: true },
  referenceYear: { type: Number, required: true },
  sourceReference: { type: String, required: true }
});

const EmissionFactor = mongoose.models.EmissionFactor || mongoose.model('EmissionFactor', emissionFactorSchema);

const seedData = [
  {
    source: 'energia_eletrica_SIN',
    factor: 0.042,         // ~0,042 kgCO2e por kWh
    unit: 'kWh',
    referenceYear: 2026,
    sourceReference: 'MCTI/SIRENE'
  },
  {
    source: 'agua_potavel',
    factor: 0.35,          // ~0,35 kgCO2e por m³ (tratamento/distribuição)
    unit: 'm3',
    referenceYear: 2026,
    sourceReference: 'SNIS'
  },
  {
    source: 'gasolina_comum',
    factor: 2.27,          // ~2,27 kgCO2e por Litro
    unit: 'litros',
    referenceYear: 2026,
    sourceReference: 'GHG Protocol/FGV'
  },
  {
    source: 'glp',
    factor: 2.98,          // ~2,98 kgCO2e por Kg de Gás de Cozinha
    unit: 'kg',
    referenceYear: 2026,
    sourceReference: 'GHG Protocol/FGV'
  }
];

const runSeed = async () => {
  try {
    // Usa a URI do ambiente ou a URI oficial de desenvolvimento do projeto
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://AdminDB:AdminDB@studiescluster.hcpbk9e.mongodb.net/co2ntazero?retryWrites=true&w=majority';
    
    console.log('⏳ Conectando ao MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado com sucesso!');

    console.log('⏳ Atualizando Dicionário de Fatores de Emissão...');
    await EmissionFactor.deleteMany({}); // Limpa os antigos para evitar duplicação
    await EmissionFactor.insertMany(seedData); // Insere os novos dados oficiais

    console.log('✅ Fatores de Emissão (Seed) inseridos com sucesso! Motor de cálculo pronto.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro crítico ao rodar o seed:', error.message);
    process.exit(1);
  }
};

runSeed();