// =================================================================================
// ARQUIVO: CarbonCalculatorService.js
// DESCRIÇÃO: Serviço responsável pela lógica de cálculo de Pegada de Carbono.
//            Centraliza a conversão de unidades e a busca de Fatores de Emissão (MCTI/GHG).
// =================================================================================

import EmissionFactor from "../models/EmissionFactor.js";

// Mapeamento de recursos do sistema para as chaves de fonte de emissão no banco de dados
const RESOURCE_TO_EMISSION_SOURCE = {
  electricity: "energia_eletrica_SIN",
  water: "agua_tratada",
  gas: "glp",
  fuel_gasoline: "gasolina",
  fuel_diesel: "diesel",
  fuel_ethanol: "etanol_hidratado",
  waste_organic: "residuos_organicos",
  waste_paper: "residuos_papel",
  waste_plastic: "residuos_plastico",
  waste_metal: "residuos_metal",
  waste_glass: "residuos_vidro"
};

/**
 * Calcula a Pegada de Carbono baseada no tipo de recurso e quantidade consumida.
 * @param {string} resourceType - Tipo de recurso (ex: 'electricity', 'water', 'fuel_gasoline')
 * @param {number} quantity - Quantidade consumida
 * @param {string} unit - Unidade de medida (ex: 'kWh', 'm3', 'litros')
 * @returns {Promise<number>} - Valor da emissão em kgCO2e
 */
export const calculateCarbonFootprint = async (resourceType, quantity, unit) => {
  try {
    let source = RESOURCE_TO_EMISSION_SOURCE[resourceType];
    
    // Fallback inteligente: se resourceType for genérico 'fuel', tenta descobrir pelo unit ou default para gasolina
    if (!source && resourceType === 'fuel') {
        source = 'gasolina'; // Default conforme escopo
    }
    
    // Busca o fator de emissão mais recente no banco de dados
    // Ordena por referenceYear decrescente para pegar o mais atual
    const factorDoc = await EmissionFactor.findOne({ source: source || resourceType }).sort({ referenceYear: -1 });
    
    if (!factorDoc) {
        console.warn(`[CarbonCalculator] Fator de emissão não encontrado para: ${source || resourceType}`);
        return 0; // Sem fator, sem pegada calculada (evita quebrar o fluxo)
    }
    
    // Simplificação Acadêmica: Assume que a unidade de entrada bate com a unidade do fator 
    // ou é convertida previamente no frontend.
    // TODO Futuro: Implementar conversão de unidades backend (ex: m3 -> litros) se necessário.
    
    const emission = quantity * factorDoc.factor;
    return emission;

  } catch (err) {
    console.error("[CarbonCalculator] Erro ao calcular pegada de carbono:", err);
    return 0;
  }
};
