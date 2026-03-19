// =================================================================================
// ARQUIVO: server.js
// DESCRIÇÃO: Ponto de entrada principal (entrypoint) da aplicação backend.
//            Este arquivo é responsável por configurar e inicializar o servidor
//            Express, conectar-se ao banco de dados, registrar os middlewares
//            e as rotas da API.
// =================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS ---

// Framework web principal para criar o servidor e as rotas da API.
import express from "express";

// Middleware que habilita o CORS (Cross-Origin Resource Sharing), permitindo
// que o frontend (rodando em uma origem diferente, ex: localhost:3000)
// possa fazer requisições para este backend (ex: localhost:5000).
import cors from "cors";

// Middleware de segurança que configura diversos cabeçalhos HTTP (HTTP headers)
// para proteger a aplicação contra vulnerabilidades conhecidas na web.
import helmet from "helmet";

// Middleware para limitar o número de requisições de um mesmo IP,
// prevenindo ataques de força bruta e negação de serviço (DDoS).
import rateLimit from "express-rate-limit";

// Middleware para analisar (parsear) os cookies enviados nas requisições HTTP.
// Essencial para a nova lógica de segurança com Cookies HttpOnly.
import cookieParser from "cookie-parser";

// Carrega as variáveis de ambiente definidas no arquivo .env para o objeto
// `process.env`, permitindo o acesso a configurações sensíveis (como senhas e chaves secretas)
// de forma segura, sem expô-las no código-fonte.
import dotenv from "dotenv";

// Middleware de logging de requisições HTTP. É muito útil durante o desenvolvimento
// para visualizar no console cada requisição que chega ao servidor (método, rota, status, etc.).
import morgan from "morgan";

// Importa o Mongoose para ser usado na função de graceful shutdown.
import mongoose from "mongoose";

// --- Módulos Internos da Aplicação ---

// Importa a função responsável por estabelecer a conexão com o banco de dados MongoDB.
import { connectDB } from "../db/db.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

// --- Importação de Todas as Rotas da API ---
// Cada arquivo de rota agrupa os endpoints de um módulo específico da aplicação (ex: autenticação, consumo).
// Isso mantém o código organizado e modular.
import alertRoutes from "./routes/alertRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import consumptionRoutes from "./routes/consumptionRoutes.js";
import emissionFactorRoutes from "./routes/emissionFactorRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wasteRoutes from "./routes/wasteRoutes.js";

// --- 2. CONFIGURAÇÃO INICIAL --- //
// Carrega as variáveis de ambiente do arquivo .env.
// É crucial que isso aconteça antes de qualquer outro módulo que possa precisar delas.
dotenv.config();

// Cria a aplicação Express
const app = express();

// ============================================================
// --- 3. REGISTRO DE MIDDLEWARES GLOBAIS ---
// Middlewares são funções executadas em sequência para cada requisição que chega.
// A ordem de registro é importante.
// ============================================================

// Middleware para habilitar o CORS (Cross-Origin Resource Sharing),
// autorizando origens específicas e o uso de credenciais (Cookies).
const allowedOrigins = [
  "http://localhost:3000", // Frontend Legado Local
  "http://localhost:3001", // Frontend React Local
  "https://co2ntazero.vercel.app" // Frontend Produção (Vercel)
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origin (ex: Postman) ou requisições das origens autorizadas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pela política de CORS do servidor.'));
    }
  },
  credentials: true // OBRIGATÓRIO: Permite o tráfego de Cookies HttpOnly
}));

// Middleware de segurança Helmet. Adiciona proteção contra XSS, Clickjacking, 
// e remove o cabeçalho 'X-Powered-By' que expõe a tecnologia do servidor.
app.use(helmet());

// Middleware nativo do Express que interpreta o corpo (body) das requisições
// que chegam no formato JSON, tornando-o acessível em `req.body`.
app.use(express.json({ limit: "10mb" }));

// Middleware nativo do Express que interpreta dados de formulários tradicionais
// (enviados como `application/x-www-form-urlencoded`).
app.use(express.urlencoded({ extended: true }));

// Configura o logger de requisições HTTP (morgan).
// Em ambiente de teste (`test`), usa um formato 'tiny' (sem cores) para manter os logs limpos.
// Em qualquer outro ambiente, usa o formato 'dev' (colorido) para facilitar a depuração.
app.use(morgan(process.env.NODE_ENV === 'test' ? 'tiny' : 'dev'));

// Middleware nativo para interpretar Cookies de forma segura
app.use(cookieParser());

// ============================================================
// --- 3.1. PREVENÇÃO CONTRA FORÇA BRUTA (Rate Limiting) ---
// ============================================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100, // Limita a 100 requisições por IP dentro dessa janela
  message: { status: 429, message: "Muitas requisições geradas deste IP, tente novamente em 15 minutos." },
  standardHeaders: true, // Retorna os cabeçalhos de rate limit padrão na resposta (`RateLimit-*`)
  legacyHeaders: false, // Desabilita os cabeçalhos antigos (`X-RateLimit-*`)
});

// Aplica o limite de taxa em todas as rotas que começam com "/api"
app.use("/api/", apiLimiter);

// ============================================================
// --- 4. ROTA DE VERIFICAÇÃO DE SAÚDE (Health Check) ---
// Endpoint público usado para verificar se o servidor está online e respondendo.
// ============================================================
app.get("/api/health", (req, res) => {
  return res.json({
    status: "ok",
    message: "Servidor CO2ntaZero ativo!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// - REGISTRO DAS ROTAS PRINCIPAIS
// ============================================================
// Associa cada conjunto de rotas a um prefixo de URL.
app.use("/api/alerts", alertRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/consumptions", consumptionRoutes);
app.use("/api/emission-factors", emissionFactorRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wastes", wasteRoutes);

// Middleware de tratamento de erros global. Deve ser o último middleware a ser registrado.
app.use(errorHandler);

// ============================================================
// --- 6. INICIALIZAÇÃO DO SERVIDOR (funções exportadas para testes) ---
// ============================================================

const PORT = process.env.PORT || 5000;

// Variável para armazenar a instância do servidor para o graceful shutdown.
let server;

/**
 * Seleciona a URI do banco de dados com base no ambiente (NODE_ENV).
 * @returns {string} A URI de conexão do MongoDB.
 */
const getDbUri = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.MONGO_URI_PROD || process.env.MONGO_URI;
  }
  if (process.env.NODE_ENV === 'test') {
    // Alinhado com o globalSetup.cjs, que espera MONGO_URI para os testes.
    return process.env.MONGO_URI; 
  }
  return process.env.MONGO_URI_DEV || process.env.MONGO_URI;
};
/**
 * Inicia o servidor programaticamente (útil para testes in-process).
 * @param {object} options
 * @param {string} options.dbUri - URI do MongoDB a ser usado (opcional).
 * @param {number|string} options.port - Porta para o servidor (opcional).
 * @returns {Promise<import('http').Server>} A instância do servidor HTTP.
 */
export async function startServer({ dbUri = getDbUri(), port = PORT } = {}) {
  try {
    console.log('Iniciando servidor CO2ntaZero (startServer)...');
    
    const dbHost = dbUri?.split('@')[1]?.split('/')[0] || 'Local/Desconhecido';
    await connectDB(dbUri); // Passa a URI de conexão correta para a função connectDB
    console.log(`Conectado ao MongoDB em: ${dbHost}`);
    console.log('[1/1] Conexão com o banco de dados estabelecida!');

    // Lógica aprimorada para tentar portas alternativas se a padrão estiver em uso.
    const startListening = (currentPort) => {
      return new Promise((resolve, reject) => {
        server = app.listen(currentPort, () => {
          console.log(`Servidor rodando na porta ${currentPort}`);
          // Atualiza a variável de ambiente PORT para que o resto da aplicação saiba qual porta está em uso.
          process.env.PORT = currentPort;
          resolve(server);
        }).on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.warn(`Aviso: Porta ${currentPort} está em uso. Tentando porta ${currentPort + 1}...`);
            resolve(startListening(currentPort + 1)); // Tenta a próxima porta recursivamente.
          } else {
            reject(err);
          }
        });
      });
    };
    return startListening(port);
  } catch (err) {
    console.error('Erro ao iniciar o servidor (startServer):', err.message);
    throw err;
  }
}

/**
 * Encerra o servidor iniciado por `startServer` de forma limpa.
 */
export async function stopServer() {
  if (!server) return;
  return new Promise((resolve, reject) => {
    server.close(async (err) => {
      if (err) return reject(err);
      try {
        await mongoose.disconnect();
      } catch (e) {
        // Falha ao desconectar do mongoose não é crítico para os testes
        console.warn('Aviso: falha ao desconectar do mongoose durante stopServer.', e.message);
      }
      server = undefined;
      console.log('Servidor e conexão com MongoDB encerrados (stopServer).');
      resolve();
    });
  });
}

// Auto-start apenas quando não estivermos no ambiente de teste.
if (process.env.NODE_ENV !== 'test') {
  // Inicia automaticamente quando o arquivo é executado diretamente (modo normal).
  (async () => {
    try {
      await startServer();
    } catch (err) {
      console.error('Erro ao iniciar o servidor automaticamente:', err.message);
      process.exit(1);
    }
  })();
}

// ============================================================
// --- 7. GRACEFUL SHUTDOWN ---
// ============================================================
// Ouve por sinais de encerramento do processo (como Ctrl+C) para garantir
// que o servidor e a conexão com o banco de dados sejam finalizados de forma limpa.
async function gracefulShutdown(signal) {
  console.log(`\nRecebido sinal ${signal}. Inciando graceful shutdown...`);
  await stopServer();
  console.log('Processo finalizado com sucesso.');
  process.exit(0);
}
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
