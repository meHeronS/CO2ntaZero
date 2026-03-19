/**
 * =================================================================================
 * ARQUIVO: controllers/authController.js
 * DESCRIÇÃO: Controladores para as funcionalidades de autenticação, como registro,
 *            login, logout e recuperação de senha.
 * =================================================================================
 */
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Alert from '../models/Alert.js';
import Company from '../models/Company.js';
import Consumption from "../models/Consumption.js"; 
import Goal from '../models/Goal.js';
import SessionToken from '../models/SessionToken.js';
import Waste from '../models/Waste.js';
import User from '../models/User.js';
import { createLog } from '../utils/logger.js';

import { errorResponse, successResponse } from '../utils/responseHelper.js';

/**
 * @desc    Registra uma nova empresa e seu primeiro usuário (proprietário).
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password, cpf, type, companyName, cnpj, companyEmail, address } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Validações
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("E-mail já cadastrado.");
    }

    const existingCpf = await User.findOne({ cpf }).session(session);
    if (existingCpf) {
      throw new Error("CPF já cadastrado.");
    }
    
    // Validação Específica por Tipo de Unidade
    if (type === 'BUSINESS') {
      if (!cnpj || !companyEmail) throw new Error("Para empresas, CNPJ e E-mail corporativo são obrigatórios.");

      // LÓGICA DE SEGURANÇA: Verificação de CNPJ existente
      const existingCompanyCnpj = await Company.findOne({ cnpj }).session(session);
      if (existingCompanyCnpj) {
        // Simulação do envio de e-mail de segurança
        console.log(`\n[SECURITY ALERT EMAIL]`);
        console.log(`Para: ${existingCompanyCnpj.email}`);
        console.log(`Assunto: Tentativa de cadastro do seu CNPJ`);
        console.log(`Mensagem: Olá. O usuário '${name}' (Email: ${email}) tentou cadastrar sua empresa (CNPJ: ${cnpj}) no CO2ntaZero.`);
        console.log(`Como este CNPJ já está vinculado a outro responsável, a operação foi bloqueada.\n`);
        throw new Error("CNPJ já cadastrado.");
      }
      
      // Validação de Fraude: E-mail da empresa duplicado
      const existingCompanyEmail = await Company.findOne({ email: companyEmail }).session(session);
      if (existingCompanyEmail) throw new Error("Este e-mail corporativo já está em uso por outra empresa.");
    } else {
      // RESIDENTIAL
      if (!address) throw new Error("Para residências, o endereço é obrigatório.");
    }

    const existingCompanyName = await Company.findOne({ name: companyName }).session(session);
    if (existingCompanyName) {
      throw new Error("Uma empresa com este nome já está cadastrada.");
    }

    // 2. Criptografia da Senha - Gera um "sal" e cria um hash seguro da senha.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Instância do Usuário: Cria o objeto na memória para obter o ID (necessário para o ownerId).
    const newUser = new User({
      name: name,
      email,
      cpf,
      passwordHash,
      // companyId será definido após a criação da empresa
    });

    // 4. Criação da Empresa: Vincula o ownerId ao usuário recém-criado e salva no banco.
    const newCompany = new Company({ 
      name: companyName, 
      type: type || 'BUSINESS',
      ownerId: newUser._id 
    });

    if (type === 'BUSINESS') {
      newCompany.cnpj = cnpj;
      newCompany.email = companyEmail;
    } else {
      newCompany.address = address;
    }

    await newCompany.save({ session });

    // 5. Finalização do Usuário: Atualiza com a empresa criada e salva no banco.
    newUser.companyId = newCompany._id; // Define como empresa ativa
    newUser.companies = [newCompany._id]; // Adiciona à lista de empresas
    await newUser.save({ session });

    // 6. Confirmação: Efetiva a transação no banco de dados.
    await session.commitTransaction();

    // 7. Auditoria: Cria o log após o sucesso da operação.
    await createLog({
      userId: newUser._id,
      companyId: newCompany._id,
      action: "REGISTER_COMPANY_USER",
      description: `Novo usuário/empresa registrado: ${newUser.email} / ${newCompany.name}`,
      route: req.originalUrl,
    });

    // Adicionado para retornar o ID do usuário, necessário para os testes
    const userResponse = newUser.toObject();
    delete userResponse.passwordHash;
    // Retorna uma resposta padronizada com o `responseHelper`.
    return successResponse(res, { status: 201, data: { user: userResponse } });

  } catch (error) {
    await session.abortTransaction();
    // Melhora o feedback de erro para o cliente
    if (error.message.includes("cadastrado") || error.message.includes("cadastrada")) {
      return errorResponse(res, { status: 409, message: error.message });
    }
    return errorResponse(res, { status: 500, message: error.message || "Erro interno ao cadastrar usuário.", errors: error });
  } finally {
    session.endSession();
  }
};

/**
 * @desc    Autentica um usuário e retorna tokens de acesso e de atualização.
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Busca do Usuário - Procura o usuário pelo e-mail. O método .select('+passwordHash')
    // é CRUCIAL para forçar a inclusão do campo de senha, que por padrão é oculto no Schema.
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) { // Se o usuário não for encontrado, retorna erro 401.
      return errorResponse(res, { status: 401, message: "Credenciais inválidas." });
    }

    // 2. Verificação da Senha - Compara a senha enviada com o hash armazenado no banco.
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return errorResponse(res, { status: 401, message: "Credenciais inválidas." });
    }

    // --- Geração dos Tokens ---
    // 3. Geração do Access Token: um token de curta duração para autenticar as próximas requisições.
    const accessToken = jwt.sign(
      { userId: user._id, companyId: user.companyId }, // Removido role do token
      process.env.JWT_SECRET, // Chave secreta do .env
      { expiresIn: '15m' } // Expira em 15 minutos
    );

    // 4. Geração do Refresh Token: um token de longa duração usado para obter um novo Access Token sem precisar de um novo login.
    const refreshTokenValue = jwt.sign(
     { userId: user._id, companyId: user.companyId },
      process.env.REFRESH_TOKEN_SECRET, // Chave secreta diferente do .env
      { expiresIn: '7d' } // Expira em 7 dias
    );

    // Etapa 5: Armazenamento do Refresh Token (Uso básico do SessionToken)
    // Para dar uma utilidade ao modelo SessionToken, vamos salvar o hash do refresh token.
    // Isso transforma o logout em uma operação stateful, aumentando a segurança.
    const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenValue).digest('hex');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adiciona 7 dias à data atual.

    // CORREÇÃO: Usa findOneAndUpdate com upsert para evitar erro de chave duplicada
    // em logins rápidos e sucessivos, como ocorre nos testes.
    // Se um token para este usuário já existe, ele é atualizado; senão, é criado.
    await SessionToken.findOneAndUpdate(
      { userId: user._id }, // Critério de busca
      { // Dados para inserir ou atualizar
        tokenHash: refreshTokenHash,
        expiration: expirationDate,
        originIp: req.ip,
        device: req.headers['user-agent'],
        active: true, // Garante que a sessão seja reativada no login
      },
      { upsert: true, new: true } // Opções: upsert cria se não existir, new retorna o doc atualizado
    );

    // Auditoria de Login
    await createLog({
      userId: user._id,
      companyId: user.companyId,
      action: "LOGIN_USER",
      description: `Usuário ${user.email} logado com sucesso.`,
      route: req.originalUrl,
    });

    // --- SEGURANÇA: Configuração dos Cookies HttpOnly ---
    // O token de acesso tem vida curta e é usado nas requisições normais.
    res.cookie('token', accessToken, {
      httpOnly: true, // Impede acesso via JavaScript (Mitiga XSS)
      secure: process.env.NODE_ENV === 'production', // Em prod, exige HTTPS
      sameSite: 'strict', // Protege contra CSRF (Cross-Site Request Forgery)
      maxAge: 15 * 60 * 1000 // Expira em 15 minutos
    });

    // O refresh token tem vida longa e é usado na renovação.
    res.cookie('refreshToken', refreshTokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // Expira em 7 dias
    });

    // Padroniza a resposta usando o `responseHelper` para consistência em toda a API.
    return successResponse(res, { data: {
        token: accessToken,
        refreshToken: refreshTokenValue,
        user: { id: user._id, name: user.name, email: user.email, companyId: user.companyId } 
      }
    });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro interno ao fazer login.", errors: error });
  }
};

/**
 * @desc    Realizar o logout do usuário, invalidando o refresh token.
 * @route   POST /api/auth/logout
 * @access  Private
 * @note    Esta função implementa um logout *stateful*. O cliente envia o `refreshToken`
 *          que possui, e o servidor o localiza no banco de dados e o marca como inativo,
 *          impedindo que ele seja usado para gerar novos tokens de acesso.
 */
export const logoutUser = async (req, res) => {
  // O refresh token agora deve vir primariamente do Cookie seguro.
  // O `req.body` fica como fallback temporário para o front legado.
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  // MOTIVO DA MUDANÇA: Garante que o token foi fornecido. Se a rota for pública,
  // esta validação é necessária para evitar processamento desnecessário.
  if (!refreshToken) {
    return errorResponse(res, { status: 400, message: "Refresh token não fornecido." });
  }
 
  try {
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    // Encontra o token, o marca como inativo e retorna o documento para auditoria.
    const sessionDoc = await SessionToken.findOneAndUpdate({ tokenHash: refreshTokenHash }, { active: false });

    // Auditoria de Logout (se a sessão foi encontrada)
    if (sessionDoc) {
      const user = await User.findById(sessionDoc.userId);
      if (user) {
        await createLog({
          userId: user._id,
          companyId: user.companyId,
          action: "LOGOUT_USER",
          description: `Usuário ${user.email} deslogado.`,
          route: req.originalUrl,
        });
      }
    }
  } catch (error) {
    // A falha em invalidar o token não deve impedir o logout do lado do cliente.
    console.error("Erro ao invalidar refresh token durante o logout:", error);
  }

  // Limpa os cookies do navegador garantindo que o cliente "esqueça" as credenciais
  res.clearCookie('token');
  res.clearCookie('refreshToken');

  return successResponse(res, { message: "Logout realizado com sucesso. A sessão foi invalidada no servidor." });
};

/**
 * @desc    Inicia o processo de recuperação de senha, gerando um token de reset.
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, { status: 404, message: "Usuário não encontrado." });
    }

    // Gera um token seguro
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expira em 10 minutos

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    // Em um app real, aqui você enviaria um e-mail para o usuário com um link contendo `resetToken`.
    // Para este projeto, retornamos o token para facilitar os testes.
    // A resposta é padronizada com o `responseHelper`.

    await createLog({
      userId: user._id,
      companyId: user.companyId,
      action: "FORGOT_PASSWORD",
      description: "Solicitação de recuperação de senha gerada.",
      route: req.originalUrl,
    });

    return successResponse(res, { message: 'Token de reset enviado com sucesso (simulado).', data: { resetToken } });

  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro interno no servidor.", errors: error });
  }
};

/**
 * @desc    Redefine a senha do usuário utilizando um token de reset válido.
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return errorResponse(res, { status: 400, message: "As senhas não coincidem." });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
      return errorResponse(res, { status: 400, message: "Token inválido ou expirado." });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await createLog({
      userId: user._id,
      companyId: user.companyId,
      action: "RESET_PASSWORD",
      description: "Senha redefinida com sucesso via token.",
      route: req.originalUrl,
    });

    return successResponse(res, { message: "Senha alterada com sucesso." });
  } catch (error) {
    return errorResponse(res, { status: 500, message: "Erro interno no servidor.", errors: error });
  }
};

/**
 * @desc    (Placeholder) Renova um token de acesso expirado usando um refresh token.
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshToken = async (req, res) => {
  try {
    // Pega o token primariamente do cookie, com fallback pro body (usado no front React/legado)
    const rToken = req.cookies?.refreshToken || req.body.token;

    if (!rToken) {
      return errorResponse(res, { status: 400, message: "Refresh token não fornecido." });
    }

    // Verifica se a assinatura do token é válida
    const payload = jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET);

    // Valida no banco de dados se a sessão não foi revogada (Logout stateful)
    const refreshTokenHash = crypto.createHash('sha256').update(rToken).digest('hex');
    const session = await SessionToken.findOne({ tokenHash: refreshTokenHash, active: true });

    if (!session) {
      return errorResponse(res, { status: 401, message: "Sessão inválida ou revogada. Faça login novamente." });
    }

    // Gera um novo Access Token
    const accessToken = jwt.sign(
      { userId: payload.userId, companyId: payload.companyId },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Renovação do Cookie de Acesso
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutos
    });

    return successResponse(res, { data: { token: accessToken } });
  } catch (error) {
    return errorResponse(res, { status: 401, message: "Refresh token expirado ou inválido.", errors: error.message });
  }
};

/**
 * @desc    Exclui a própria conta do usuário e todos os dados associados.
 * @route   DELETE /api/auth/me
 * @access  Private
 */
export const deleteAccount = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userId = req.user.userId; // Deleta o usuário autenticado
    const userToDelete = await User.findById(userId).session(session); // Busca o usuário para obter o companyId

    // Valida se o usuário a ser deletado realmente existe.
    if (!userToDelete) {
      return errorResponse(res, { status: 404, message: "Usuário a ser deletado não encontrado." });
    }

    // Pega TODAS as empresas vinculadas a este CPF/Usuário
    const companyIds = userToDelete.companies;

    // CORREÇÃO: Executa a exclusão em cascata dentro de uma transação para garantir atomicidade.
    // Etapa 1: Exclui todas as sessões do usuário.
    await SessionToken.deleteMany({ userId }, { session });
    
    // Etapas 2 a 5: Cascade Delete PLENO - Exclui tudo de TODAS as unidades daquele usuário
    await Alert.deleteMany({ companyId: { $in: companyIds } }, { session });
    await Goal.deleteMany({ companyId: { $in: companyIds } }, { session });
    await Consumption.deleteMany({ companyId: { $in: companyIds } }, { session });
    await Waste.deleteMany({ companyId: { $in: companyIds } }, { session });
    
    // Etapa 6: Exclui o próprio usuário.
    await User.findByIdAndDelete(userId, { session });
    // Etapa 7: Exclui as empresas associadas.
    await Company.deleteMany({ _id: { $in: companyIds } }, { session });

    await session.commitTransaction();

    return successResponse(res, { message: "Usuário e todos os dados associados foram excluídos com sucesso." });
  } catch (error) {
    await session.abortTransaction();
    console.error("Detailed error in deleteCurrentUser:", error.message, error.stack); // Log detalhado do erro
    return errorResponse(res, { status: 500, message: "Erro no servidor ao tentar excluir o usuário.", errors: error });
  } finally {
    session.endSession();
  }
};