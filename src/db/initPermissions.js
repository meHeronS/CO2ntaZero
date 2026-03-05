// =================================================================================
// ARQUIVO: src/db/initPermissions.js
// DESCRIÇÃO: Script de inicialização que garante que as permissões (roles)
//            essenciais do sistema existam no banco de dados.
// =================================================================================

import Permission from "../back/models/Permission.js";

/**
 * Garante que as permissões de acesso padrão existam no banco de dados.
 * Esta função é idempotente.
 */
export const initPermissions = async () => {
  try {
    console.log("Verificando permissões de sistema...");

    const ROOT = 'ROOT';
    const ADMIN_COMPANY = 'ADMIN_COMPANY';
    const USER_COMPANY = 'USER_COMPANY';
    const rootPermissionExists = await Permission.findOne({ name: ROOT });

    if (rootPermissionExists) {
      console.log("Permissões de sistema já existem. Nenhuma ação necessária.");
      return;
    }

    console.log("Permissões não encontradas. Criando permissões padrão...");

    const permissions = [
      {
        name: ROOT,
        description: "Superusuário. Acesso irrestrito a todos os dados e configurações do sistema.",
      },
      {
        name: ADMIN_COMPANY,
        nome: ADMIN_COMPANY,
        description: "Administrador de uma empresa. Pode gerenciar usuários e todos os dados da sua própria empresa.",
      },
      {
        name: USER_COMPANY,
        nome: USER_COMPANY,
        description: "Usuário padrão. Pode criar e gerenciar seus próprios dados dentro da empresa.",
      },
    ];

    await Permission.insertMany(permissions, { ordered: false });

    console.log("Permissões padrão criadas com sucesso!");
    console.table(permissions.map((p) => ({ Nome: p.name, Descrição: p.description })));

  } catch (error) {
    console.error("Erro crítico ao inicializar permissões padrão:");
    console.error(error.message);
  }
};