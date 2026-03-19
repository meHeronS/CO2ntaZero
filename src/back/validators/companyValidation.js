import Joi from 'joi';

// Regras para cadastrar uma nova Empresa/Residência
export const createCompanySchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'O nome da empresa/unidade é obrigatório.' }),
  type: Joi.string().valid('BUSINESS', 'RESIDENTIAL').default('BUSINESS'),
  cnpj: Joi.string().allow('', null).optional(),
  email: Joi.string().email().allow('', null).optional().messages({ 'string.email': 'Formato de e-mail inválido.' }),
  phone: Joi.string().allow('', null).optional(),
  address: Joi.string().allow('', null).optional(),
  plan: Joi.string().valid('BASIC', 'PREMIUM').default('BASIC')
});

// Regras para atualizar dados da empresa
export const updateCompanySchema = createCompanySchema
  .fork(Object.keys(createCompanySchema.describe().keys), (schema) => schema.optional())
  .min(1)
  .messages({ 'object.min': 'Envie pelo menos um campo para ser atualizado.' });