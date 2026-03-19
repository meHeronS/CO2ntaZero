import Joi from 'joi';

// Regras para criar um novo registro de consumo
export const createConsumptionSchema = Joi.object({
  resourceType: Joi.string().required().messages({ 'any.required': 'O tipo de recurso é obrigatório.' }),
  quantity: Joi.number().positive().required().messages({
    'number.base': 'A quantidade deve ser um número válido.',
    'number.positive': 'A quantidade deve ser maior que zero.',
    'any.required': 'A quantidade é obrigatória.'
  }),
  unit: Joi.string().required().messages({ 'any.required': 'A unidade de medida é obrigatória.' }),
  date: Joi.date().iso().optional().messages({ 'date.format': 'A data deve estar no formato ISO.' }),
  notes: Joi.string().allow('', null).optional(),
  cost: Joi.number().min(0).optional().messages({ 'number.min': 'O custo financeiro não pode ser negativo.' })
});

// Regras para atualizar um consumo (todos os campos são opcionais, mas pelo menos um deve ser enviado)
export const updateConsumptionSchema = createConsumptionSchema
  .fork(Object.keys(createConsumptionSchema.describe().keys), (schema) => schema.optional())
  .min(1).messages({ 'object.min': 'Envie pelo menos um campo para ser atualizado.' });