import Joi from 'joi';

// Regras para criar um alerta manualmente
export const createAlertSchema = Joi.object({
  message: Joi.string().required().messages({ 'any.required': 'A mensagem do alerta é obrigatória.' }),
  type: Joi.string().required().messages({ 'any.required': 'O tipo de alerta é obrigatório.' }),
  goalId: Joi.string().optional().allow('', null),
  consumptionId: Joi.string().optional().allow('', null)
});