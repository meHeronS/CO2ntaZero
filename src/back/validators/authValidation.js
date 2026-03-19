import Joi from 'joi';

// Regras para o Cadastro de Usuário/Empresa
export const registerSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'O nome é obrigatório.' }),
  email: Joi.string().email().required().messages({ 'string.email': 'Formato de e-mail inválido.', 'any.required': 'O e-mail é obrigatório.' }),
  password: Joi.string().min(6).required().messages({ 'string.min': 'A senha deve ter pelo menos 6 caracteres.', 'any.required': 'A senha é obrigatória.' }),
  cpf: Joi.string().required().messages({ 'any.required': 'O CPF é obrigatório.' }),
  type: Joi.string().valid('BUSINESS', 'RESIDENTIAL').default('BUSINESS'),
  companyName: Joi.string().required().messages({ 'any.required': 'O nome da unidade/empresa é obrigatório.' }),
  
  // Campos opcionais dependendo do tipo da unidade
  cnpj: Joi.string().allow('', null),
  companyEmail: Joi.string().email().allow('', null).messages({ 'string.email': 'E-mail corporativo com formato inválido.' }),
  address: Joi.string().allow('', null)
});

// Regras para o Login
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({ 'string.email': 'Formato de e-mail inválido.', 'any.required': 'O e-mail é obrigatório.' }),
  password: Joi.string().required().messages({ 'any.required': 'A senha é obrigatória.' }),
  // O front manda o refreshToken em formato de fallback (caso o cookie falhe)
  refreshToken: Joi.string().allow('', null)
});

// Regras para Solicitar Recuperação de Senha
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({ 'string.email': 'Formato de e-mail inválido.', 'any.required': 'O e-mail é obrigatório.' })
});

// Regras para Redefinir a Senha
export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({ 'string.min': 'A senha deve ter pelo menos 6 caracteres.', 'any.required': 'A nova senha é obrigatória.' }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'As senhas não coincidem.', 'any.required': 'A confirmação de senha é obrigatória.' })
});