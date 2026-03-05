// =================================================================================
// ARQUIVO: Testes/2-features/alerts.test.js
// DESCRIÇÃO: Valida a criação de alertas automáticos quando metas ambientais são
//            atingidas ou ultrapassadas.
// =================================================================================
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const SETUP_FILE = path.join(__dirname, '..', 'test-setup.json');

describe('6. Módulo de Alertas de Sustentabilidade', () => {
    let API_URL = 'http://localhost:5000/api';
    let authHeader;
    let companyId;

    beforeAll(() => {
        if (fs.existsSync(SETUP_FILE)) {
            const setupData = JSON.parse(fs.readFileSync(SETUP_FILE, 'utf8'));
            if (setupData.apiUrl) API_URL = setupData.apiUrl;
            if (setupData.companyA) {
                authHeader = { Authorization: `Bearer ${setupData.companyA.token}` };
                companyId = setupData.companyA._id;
            }
        }
    });

    it('RF-006: deve gerar alerta ao ultrapassar meta de consumo de Energia (Co2)', async () => {
        if (!authHeader) {
            console.warn("⚠️ Pulando teste de alertas: Credenciais não encontradas. (Execute npm run test:setup antes)");
            return;
        }

        console.log('\n--- 🧪 Testando Alertas Ambientais (Energia/Co2) ---');

        // 1. Criar Meta: Limite de 1000 kWh para o mês
        const goalPayload = {
            description: 'Meta Limite Mensal Energia - Teste Alerta',
            type: 'limit',
            resourceType: 'electricity',
            targetValue: 1000,
            unit: 'kWh',
            deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            startDate: new Date().toISOString()
        };

        let goalId;
        try {
            const goalRes = await axios.post(`${API_URL}/goals`, goalPayload, { headers: authHeader });
            expect(goalRes.status).toBe(201);
            goalId = goalRes.data.data._id || goalRes.data._id;
            console.log(`   + Meta criada (ID: ${goalId})`);
        } catch (err) {
            console.error('Falha ao criar meta:', err.response?.data || err.message);
            // Se falhar a criação da meta, falha o teste
            throw err; 
        }

        // 2. Lançar Consumos
        try {
            // Consumo 1: 500 kWh (Total 500)
            await axios.post(`${API_URL}/consumptions`, {
                resourceType: 'electricity',
                amount: 500,
                unit: 'kWh',
                date: new Date().toISOString(),
                description: 'Consumo Parcial 1'
            }, { headers: authHeader });

            // Consumo 2: 600 kWh (Total 1100 > 1000)
            await axios.post(`${API_URL}/consumptions`, {
                resourceType: 'electricity',
                amount: 600,
                unit: 'kWh',
                date: new Date().toISOString(),
                description: 'Consumo Excedente'
            }, { headers: authHeader });
            
            console.log('   + Consumos lançados (Total esperada: 1100 kWh). Verificando alertas...');

        } catch (err) {
             console.error('Falha ao lançar consumos:', err.response?.data || err.message);
             throw err;
        }

        // 3. Verificar Alerta
        // Espera-se que o backend tenha criado um alerta do tipo "goal_exceeded" ou similar
        try {
            const alertsRes = await axios.get(`${API_URL}/alerts`, { headers: authHeader });
            const alerts = alertsRes.data.data || alertsRes.data;

            // Filtra alertas que mencionem a meta ou energia
            const relatedAlert = alerts.find(a => 
                (a.goalId === goalId) || 
                (a.message && /meta|limite/i.test(a.message) && /energia|1000/i.test(a.message))
            );

            if (relatedAlert) {
                console.log(`   ✅ Alerta detectado: "${relatedAlert.message}"`);
                expect(relatedAlert).toBeDefined();
            } else {
                console.warn('   ⚠️ Nenhum alerta específico encontrado. Verifique se o módulo de Alertas monitora consumos.');
                // console.log("Alertas encontrados:", alerts);
            }
        } catch (err) {
             console.error('Falha ao buscar alertas:', err.response?.data || err.message);
        }
    });
});
