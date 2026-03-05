
import Consumption from "../models/Consumption.js";
import Company from "../models/Company.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

/**
 * @desc    Gera relatório de emissões e consumo.
 * @route   GET /api/reports/emissions
 * @access  Private
 */
export const getEmissionsReport = async (req, res) => {
    try {
        const companyId = req.user.companyId;
        const { start, end } = req.query;
        
        const filter = { companyId };
        if (start || end) {
            filter.date = {};
            if (start) filter.date.$gte = new Date(start);
            if (end) filter.date.$lte = new Date(end);
        }

        // Agregação por tipo de recurso
        const report = await Consumption.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$resourceType",
                    totalQuantity: { $sum: "$quantity" },
                    totalCarbonFootprint: { $sum: "$carbonFootprint" },
                    count: { $sum: 1 },
                    unit: { $first: "$unit" } // Assumindo unidade consistente por tipo
                }
            },
            { $sort: { totalCarbonFootprint: -1 } }
        ]);

        const totalCompanyEmissions = report.reduce((acc, curr) => acc + curr.totalCarbonFootprint, 0);

        return successResponse(res, { 
            data: {
                period: { start, end },
                summary: report,
                totalEmissions: totalCompanyEmissions
            }
        });
    } catch (error) {
        return errorResponse(res, { status: 500, message: "Erro ao gerar relatório de emissões", errors: error });
    }
};

