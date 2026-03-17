
import mongoose from "mongoose";

const WasteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    type: { type: String, enum: ["oleo", "organico", "reciclavel", "eletronico", "outro"], required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: ["kg", "litros", "unidades"], required: true },
    description: { type: String }, // Adicionado para suportar o campo enviado pelo controller
    destination: { type: String }, // Adicionado para suportar o campo enviado pelo controller
    disposalMethod: { type: String, enum: ["coleta_seletiva", "compostagem", "ponto_entrega", "outro"], required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String }
}, {
    timestamps: true
});

export default mongoose.models.Waste || mongoose.model("Waste", WasteSchema);
