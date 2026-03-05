/**
 * =================================================================================
 * ARQUIVO: Testes/config/globalTeardown.cjs
 *
 * DESCRIÇÃO:
 *            Este script é executado uma única vez APÓS todos os testes terem
 *            sido concluídos. Sua responsabilidade é encerrar os recursos
 *            globais que foram iniciados no `globalSetup`, como o servidor da API
 *            e a conexão com o banco de dados.
 * =================================================================================
 */
const Company = require('../../models/Company.js').default;
const User = require('../../models/User.js').default;
const SessionToken = require('../../models/SessionToken.js').default;

module.exports = async () => {
  console.log('\n--- 🧹 [GLOBAL TEARDOWN] Finalizando ambiente de teste ---');

  // Etapa 1: Limpeza Seletiva do Banco de Dados.
  if (global.__TEST_CLEANUP_IDS__ && !process.env.PERSISTENCE_TEST_RUN) {
    const { companies, users } = global.__TEST_CLEANUP_IDS__;

    if ((companies && companies.length > 0) || (users && users.length > 0)) {
      await Promise.all([
        Company.deleteMany({ _id: { $in: companies } }),
        User.deleteMany({ _id: { $in: users } }),
        SessionToken.deleteMany({ userId: { $in: users } })
      ]);
      console.log('   - [OK] Dados de teste temporários foram removidos.');
    }
  }

  // Etapa 2: Encerrar o servidor da API de forma "graciosa".
  if (global.__SERVER_MODULE__ && typeof global.__SERVER_MODULE__.stopServer === 'function') {
    await global.__SERVER_MODULE__.stopServer();
  }

  console.log('--- ✅ [GLOBAL TEARDOWN] Ambiente finalizado com sucesso ---');
};
