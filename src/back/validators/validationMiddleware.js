// =================================================================================
// ARQUIVO: middlewares/validationMiddleware.js
// DESCRIÇÃO: Middleware genérico para validação de dados de entrada usando o Joi.
//            Intercepta a requisição, valida o req.body contra um Schema predefinido
//            e, se houver erro, retorna 400 (Bad Request) imediatamente (Fail Fast).
// =================================================================================

import { errorResponse } from "../utils/responseHelper.js";

export const validate = (schema) => {
  return (req, res, next) => {
    // abortEarly: false faz o Joi retornar TODOS os erros de uma vez (ex: email e senha errados)
    // stripUnknown: true remove do req.body campos que não foram definidos no schema (Sanitização)
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(' | ');
      return errorResponse(res, { status: 400, message: "Erro de validação nos dados enviados.", errors: errorMessages });
    }
    
    req.body = value; // Substitui o corpo original pelos dados validados e sanitizados
    next();
  };
};