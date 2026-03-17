// =================================================================================
// ARQUIVO: Testes/3-security/multi-tenant.test.js
//
// DESCRIÇÃO:
//            Este é um dos testes mais críticos do sistema. Ele valida a
//            arquitetura de isolamento lógico, garantindo que os dados de uma empresa
//            sejam completamente isolados dos dados de outra.
//
// O QUE ELE VALIDA:
//            1. Criação de Dados Isolados: Confirma que é possível criar registros (Consumos)
//               para múltiplas empresas de forma independente.
//            2. Bloqueio de Acesso Direto: Prova que um usuário não consegue
//               acessar um recurso específico de outra empresa, recebendo um erro 404 (ou 403).
//            3. Filtragem em Listagens: Garante que, ao listar recursos, um usuário
//               veja *apenas* os seus, e não os de outras empresas.
// =================================================================================
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const SETUP_FILE = path.join(__dirname, '..', 'test-setup.json');
// Adjust this number if needed, but 2 is enough to prove isolation
const NUMBER_OF_COMPANIES = 2; 

describe('3. Teste de Isolamento de Dados (Single Owner)', () => {
    let companies = [];
    let API_URL;

    // Etapa 1: Cadastra e loga em múltiplas empresas para simular um ambiente real.
    beforeAll(async () => {
        // Read API URL from setup file or default
        if (fs.existsSync(SETUP_FILE)) {
            const setupData = JSON.parse(fs.readFileSync(SETUP_FILE, 'utf8'));
            API_URL = setupData.apiUrl || 'http://localhost:5000/api';
        } else {
            API_URL = 'http://localhost:5000/api';
        }

        console.log(`\n--- Configurando ${NUMBER_OF_COMPANIES} empresas para o teste de isolamento ---`);

        for (let i = 1; i <= NUMBER_OF_COMPANIES; i++) {
            const timestamp = Date.now();
            // Create unique user/company data
            const companyData = {
                name: `Admin Tenant ${i}`,
                email: `tenant${i}_${timestamp}@test.com`,
                password: 'password123',
                companyName: `Company Tenant ${i} ${timestamp}`,
                // CNPJ fake generator
                cnpj: String(timestamp + i).padEnd(14, '0').slice(0, 14)
            };

            try {
                // Cadastrar (Register)
                // Note: Adjust endpoint if your registration path is different
                await axios.post(`${API_URL}/auth/register`, companyData);

                // Logar (Login) to get token
                const loginResponse = await axios.post(`${API_URL}/auth/login`, {
                    email: companyData.email,
                    password: companyData.password,
                });

                const token = loginResponse.data.token || loginResponse.data.data.token;
                const user = loginResponse.data.user || loginResponse.data.data.user;

                companies.push({
                    token: token,
                    companyName: companyData.companyName, 
                    email: companyData.email,
                    items: [] // Will store created IDs here
                });

                console.log(`✅ Empresa ${i} (${companyData.companyName}) criada e logada.`);
            } catch (error) {
                console.error(`Erro ao criar empresa ${i}:`, error.response?.data || error.message);
                throw error;
            }
        }
    }, 40000); 

    // Etapa 2: Cria um registro de CONSUMO para cada empresa.
    test('deve criar um registro de consumo para cada empresa', async () => {
        console.log('\n--- Criando consumos individuais para cada empresa ---');

        for (let i = 0; i < companies.length; i++) {
            const company = companies[i];
            
            // Consumo logic (Environmental)
            const consumptionData = {
                date: new Date().toISOString(),
                resourceType: 'electricity_grid', // Must match valid types in your model/controller
                amount: 100 * (i + 1),            // Amount of resource
                unit: 'kWh',
                description: `Consumo Teste Isolamento ${company.companyName}`,
                // Location or other required fields? 
                // Based on previous files, maybe source/scope? 
                // Adding generic fields that might be required
            };

            try {
                const response = await axios.post(`${API_URL}/consumptions`, consumptionData, {
                    headers: { Authorization: `Bearer ${company.token}` }
                });

                expect(response.status).toBe(201);
                
                // Save the created item details
                const createdItem = response.data.data || response.data;
                company.items.push(createdItem);
                
                console.log(`   + Consumo criado para ${company.companyName} (ID: ${createdItem._id})`);
            } catch (error) {
                 console.error(`Falha ao criar consumo para ${company.companyName}:`, error.response?.data || error.message);
                 throw error;
            }
        }
    });

    // Etapa 3: O teste principal. Valida que uma empresa não pode acessar dados de outra.
    test('deve impedir que uma empresa acesse ID de consumo de outra (GET /:id)', async () => {
        console.log('\n--- Validando bloqueio de acesso cruzado (ID direto) ---');

        for (let i = 0; i < companies.length; i++) {
            const attacker = companies[i];
            
            // Tenta atacar todas as outras empresas
            for (let j = 0; j < companies.length; j++) {
                if (i === j) continue; // Skip self

                const victim = companies[j];
                if (victim.items.length === 0) continue;

                const targetId = victim.items[0]._id;

                console.log(`   Testing: ${attacker.companyName} tenta acessar consumo ${targetId} de ${victim.companyName}`);
                
                try {
                    await axios.get(`${API_URL}/consumptions/${targetId}`, {
                        headers: { Authorization: `Bearer ${attacker.token}` }
                    });
                    
                    // Should NOT reach here
                    throw new Error(`FAIL: Isolamento falhou! ${attacker.companyName} acessou dados de ${victim.companyName}`);
                } catch (error) {
                    // Esperamos 404 (Not Found for this user) ou 403 (Forbidden)
                    if (error.response) {
                        expect([404, 403]).toContain(error.response.status);
                        console.log(`     -> Bloqueado com sucesso (Status: ${error.response.status})`);
                    } else {
                        // Se não for erro de resposta (ex: erro de rede), falha o teste
                        throw error;
                    }
                }
            }
        }
    });

    // Etapa 4: Valida que a listagem geral só retorna dados da própria empresa
    test('listagem geral (GET /) não deve retornar dados de outras empresas', async () => {
        console.log('\n--- Validando isolamento na listagem (GET /) ---');
        
        for (let i = 0; i < companies.length; i++) {
            const company = companies[i];
            
            const response = await axios.get(`${API_URL}/consumptions`, {
                 headers: { Authorization: `Bearer ${company.token}` }
            });

            const items = response.data.data || response.data;
            
            // Lista de IDs que pertencem a OUTRAS empresas
            const alienIds = [];
            companies.forEach((c, idx) => {
                if (idx !== i) {
                    c.items.forEach(item => alienIds.push(item._id));
                }
            });

            // Verifica se algum ID alienígena aparece na lista retornada
            const leak = items.find(item => alienIds.includes(item._id));
            
            if (leak) {
                throw new Error(`FAIL: Vazamento de dados! Empresa ${company.companyName} viu o registro ${leak._id} que pertence a outra empresa.`);
            }
            
            console.log(`   -> ${company.companyName} viu ${items.length} itens. Nenhum dado vazado.`);
        }
    });
});
