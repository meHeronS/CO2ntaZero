
import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true, 
        unique: true,
        enum: ["energia_eletrica_SIN", "agua_tratada", "gasolina", "diesel", "glp", "residuos_organicos"]
    },
    factor: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ["kWh", "m3", "litro", "kg"]
    },
    referenceYear: {
        type: Number,
        required: true
    },
    sourceReference: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.EmissionFactor || mongoose.model("EmissionFactor", EmissionFactorSchema);

