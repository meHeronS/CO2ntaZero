
import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true, 
        unique: true
    },
    factor: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
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
