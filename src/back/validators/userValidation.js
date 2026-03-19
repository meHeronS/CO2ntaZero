import Joi from 'joi';

// Regras para atualizar os dados do próprio perfil
export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({ 'string.email': 'Formato de e-mail inválido.' }),
  cpf: Joi.string().optional()
}).min(1).messages({ 'object.min': 'Envie pelo menos um campo para ser atualizado.' });

// Regras para alteração de senha
export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({ 'any.required': 'A senha antiga é obrigatória.' }),
  newPassword: Joi.string().min(6).required().messages({ 'string.min': 'A nova senha deve ter pelo menos 6 caracteres.', 'any.required': 'A nova senha é obrigatória.' }),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).optional().messages({ 'any.only': 'As senhas não coincidem.' })
});

// Regra para trocar o contexto (Empresa Ativa)
export const switchCompanySchema = Joi.object({
  companyId: Joi.string().required().messages({ 'any.required': 'O ID da unidade é obrigatório.' })
});