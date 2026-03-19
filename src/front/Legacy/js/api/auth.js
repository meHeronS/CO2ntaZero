/**
 * @file Módulo de autenticação.
 * @description Este arquivo centraliza todas as funções que se comunicam com os endpoints de autenticação (`/api/auth`) do backend.
 */

// Importa o helper de API que gerencia a comunicação e a renovação de tokens.
import { apiRequest } from './apiHelper.js';

/**
 * Realiza a autenticação do usuário na API.
 *
 * @param {string} email O email do usuário.
 * @param {string} password A senha do usuário.
 * @returns {Promise<object>} Uma promessa que resolve com os dados do usuário e os tokens.
 * @throws {Error} Lança um erro se as credenciais forem inválidas ou se houver um problema na rede.
 */
export async function login(email, password) {
  // Usa o apiRequest para fazer a chamada. Note que esta rota não precisa de token.
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Analisa a resposta da API como JSON.
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || 'Falha ao realizar o login.');
  }

  // Isola a "carga útil" (payload) da resposta, suportando o padrão do responseHelper
  const payload = responseJson.data ? responseJson.data : responseJson;

  // Se o login for bem-sucedido, armazena os tokens e os dados do usuário no localStorage.
  // O localStorage é usado para que a sessão do usuário persista mesmo após fechar
  // e reabrir o navegador.
  localStorage.setItem('token', payload.token);
  localStorage.setItem('refreshToken', payload.refreshToken);
  // O objeto do usuário é convertido para uma string JSON antes de ser armazenado,
  // pois o localStorage só armazena strings.
  localStorage.setItem('user', JSON.stringify(payload.user));

  // Retorna os dados para que a página que chamou a função possa usá-los se necessário.
  return payload;
}

/**
 * Registra um novo usuário na API.
 *
 * @param {object} userData - Os dados do novo usuário.
 * @param {string} userData.name - O nome do usuário.
 * @param {string} userData.email - O email do usuário.
 * @param {string} userData.password - A senha do usuário.
 * @param {string} userData.cpf - O CPF do usuário (Obrigatório).
 * @param {string} [userData.type] - Tipo de unidade: 'BUSINESS' ou 'RESIDENTIAL'.
 * @param {string} userData.companyName - O nome da empresa.
 * @param {string} userData.cnpj - O CNPJ da empresa.
 * @param {string} [userData.address] - O endereço (Obrigatório se for RESIDENTIAL).
 * @returns {Promise<object>} Uma promessa que resolve com a mensagem de sucesso.
 * @throws {Error} Lança um erro se o email já estiver em uso ou se houver outro problema.
 */
export async function register(userData) {
  // O payload é montado de acordo com o que o `registerController` espera e o `Joi` valida.
  const payload = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    cpf: userData.cpf,
    type: userData.type || 'BUSINESS',
    companyName: userData.companyName,
    cnpj: userData.cnpj,
    address: userData.address,
  };

  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || 'Falha ao realizar o cadastro.');
  }

  return responseJson.data ? responseJson.data : responseJson;
}

/**
 * Realiza o logout do usuário, invalidando a sessão no backend e limpando os dados locais.
 */
export async function logout() {
  const refreshToken = localStorage.getItem('refreshToken');

  // Tenta invalidar o token no backend, mas prossegue mesmo se falhar
  // para garantir que o usuário seja deslogado do frontend.
  if (refreshToken) {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: refreshToken }),
      });
    } catch (error) {
      console.error('Falha ao invalidar a sessão no backend, mas prosseguindo com o logout local:', error);
    }
  }

  // Limpa todos os dados da sessão do armazenamento local e redireciona.
  ['token', 'refreshToken', 'user'].forEach(item => localStorage.removeItem(item));
  window.location.href = '/pages/login.html'; // Redireciona para a página de login.
}