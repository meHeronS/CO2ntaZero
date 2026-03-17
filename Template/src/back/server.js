import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import connectDB from './config/db.js'; // Descomente quando plugar o banco
import connectDB from '../db/database.js';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// ============================================================================
// CONFIGURAÇÕES DE INTEGRAÇÃO (VERCEL, AZURE, DOCKER)
// ============================================================================

// 1. CORS (Cross-Origin Resource Sharing) - Essencial para Vercel <> Azure
// O Frontend em React na Vercel estará em um domínio diferente da API no Azure.
// Sem essa liberação, o navegador do usuário bloqueia as requisições (CORS Error).
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // No deploy final, colocar a URL exata da Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Body Parser
// Permite que o Express entenda o corpo das requisições no formato JSON.
app.use(express.json());

// ============================================================================
// ROTAS BASE
// ============================================================================

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Ok', message: 'API do CO2ntaZero rodando!' });
});

// Inicializa a conexão com o MongoDB Atlas
connectDB();

// ============================================================================
// INICIALIZAÇÃO DO SERVIDOR (AZURE E DOCKER)
// ============================================================================

// 3. Porta Dinâmica (Essencial para Microsoft Azure App Service)
// O Azure injeta dinamicamente a porta através da variável process.env.PORT.
// Se você fixar em 'const PORT = 5000', o deploy no Azure VAI falhar.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`[Backend] Servidor CO2ntaZero rodando na porta ${PORT}`);
});