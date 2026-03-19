import Joi from 'joi';

// Regras para registrar um novo descarte de resíduo
export const createWasteSchema = Joi.object({
  type: Joi.string().required().messages({ 'any.required': 'O tipo de resíduo é obrigatório.' }),
  quantity: Joi.number().positive().required().messages({ 'any.required': 'A quantidade é obrigatória.' }),
  unit: Joi.string().required().messages({ 'any.required': 'A unidade de medida é obrigatória.' }),
  
  description: Joi.string().allow('', null).optional(),
  destination: Joi.string().allow('', null).optional(),
  disposalMethod: Joi.string().required().messages({ 'any.required': 'O método de descarte é obrigatório.' }),
  
  date: Joi.date().iso().optional()
});

// Regras para atualizar resíduos
export const updateWasteSchema = createWasteSchema
  .fork(Object.keys(createWasteSchema.describe().keys), (schema) => schema.optional())
  .min(1).messages({ 'object.min': 'Envie pelo menos um campo para ser atualizado.' });