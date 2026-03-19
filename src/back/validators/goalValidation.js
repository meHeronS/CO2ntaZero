import Joi from 'joi';

// Regras para criar uma nova meta
export const createGoalSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'O título da meta é obrigatório.' }),
  resourceType: Joi.string().required().messages({ 'any.required': 'O tipo de recurso é obrigatório.' }),
  targetReductionPercentage: Joi.number().positive().required().messages({ 'any.required': 'O percentual de redução é obrigatório.' }),
  baselineConsumption: Joi.number().positive().required().messages({ 'any.required': 'O consumo base é obrigatório.' }),
  startDate: Joi.date().iso().required().messages({ 'any.required': 'A data de início é obrigatória.' }),
  
  // Garante que o prazo final seja obrigatoriamente posterior à data de início
  deadline: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
    'date.greater': 'O prazo final (deadline) deve ser posterior à data de início.',
    'any.required': 'O prazo final é obrigatório.'
  }),
  status: Joi.string().valid('active', 'achieved', 'failed').optional()
});

// Regras para atualizar (todos opcionais, no mínimo 1 campo)
export const updateGoalSchema = createGoalSchema
  .fork(Object.keys(createGoalSchema.describe().keys), (schema) => schema.optional())
  .min(1).messages({ 'object.min': 'Envie pelo menos um campo para ser atualizado.' });