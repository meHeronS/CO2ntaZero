import { apiRequest } from './api/apiHelper.js';
import { logout } from './api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticação (já coberto pelo apiHelper se apiRequest for usado, mas útil aqui para UX imediata)
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // --- Elementos DOM ---
    const totalCarbonEl = document.getElementById('totalCarbon');
    const totalEnergyEl = document.getElementById('totalEnergy');
    const totalWaterEl = document.getElementById('totalWater');
    const alertsListEl = document.getElementById('alertsList');
    const goalsListEl = document.getElementById('goalsList');
    const consumptionTableBody = document.getElementById('consumptionTableBody');
    const logoutBtn = document.getElementById('logoutBtn');

    // --- Logout ---
    if(logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // --- Consumo (Consumptions) ---
    apiRequest('/consumptions')
        .then(response => response.json())
        .then(res => {
            if (res.data) {
                renderConsumption(res.data);
                if (typeof renderSummary === 'function') {
                    renderSummary(res.data);
                } else {
                    console.warn('Função renderSummary não definida globalmente.');
                }
            }
        })
        .catch(err => {
            console.error('Erro ao buscar consumos:', err);
            if (consumptionTableBody) {
                consumptionTableBody.innerHTML = `<tr><td colspan="5" class="text-danger text-center">Erro ao carregar dados. Tente novamente mais tarde.</td></tr>`;
            }
        });

    // --- Alertas (Alerts) ---
    apiRequest('/alerts?limit=5')
        .then(response => response.json())
        .then(res => {
            if (alertsListEl) {
                renderAlerts(res.data || []);
            }
        })
        .catch(err => console.error('Erro ao buscar alertas:', err));

    // --- Metas (Goals) ---
    apiRequest('/goals')
        .then(response => response.json())
        .then(res => {
             if (goalsListEl) {
                 renderGoals(res.data || []);
             }
        })
        .catch(err => console.error('Erro ao buscar metas:', err));
    
    // --- Funções de Renderização ---

    function renderSummary(data) {
        // Filtrar por mês atual (simplificado)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const currentData = data.filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        // Totais
        const totalCarbon = currentData.reduce((acc, curr) => acc + (curr.carbonFootprint || 0), 0);
        const totalEnergy = currentData.filter(d => d.resourceType === 'electricity').reduce((acc, curr) => acc + curr.quantity, 0);
        const totalWater = currentData.filter(d => d.resourceType === 'water').reduce((acc, curr) => acc + curr.quantity, 0);

        totalCarbonEl.textContent = totalCarbon.toFixed(2);
        totalEnergyEl.textContent = totalEnergy.toFixed(2);
        totalWaterEl.textContent = totalWater.toFixed(2);
    }

    function renderConsumption(data) {
        consumptionTableBody.innerHTML = '';
        if (data.length === 0) {
            consumptionTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum registro encontrado.</td></tr>';
            return;
        }

        // Mostrar os 5 mais recentes
        const recentData = data.slice(0, 5);

        recentData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td class="text-capitalize">${item.resourceType}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${(item.carbonFootprint || 0).toFixed(2)}</td>
            `;
            consumptionTableBody.appendChild(row);
        });
    }

    function renderAlerts(alerts) {
        alertsListEl.innerHTML = '';
        if (alerts.length === 0) {
            alertsListEl.innerHTML = '<li class="list-group-item text-center">Nenhum alerta recente.</li>';
            return;
        }
        alerts.forEach(alert => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${alert.message}</span>
                <span class="badge bg-danger rounded-pill">${new Date(alert.createdAt).toLocaleDateString()}</span>
            `;
            alertsListEl.appendChild(li);
        });
    }
    
    function renderGoals(goals) {
        goalsListEl.innerHTML = '';
        // Filtrar metas ativas
        const activeGoals = goals.filter(g => g.status === 'active');
        
        if (activeGoals.length === 0) {
            goalsListEl.innerHTML = '<li class="list-group-item text-center">Nenhuma meta ativa cadastrada.</li>';
            return;
        }

        activeGoals.forEach(goal => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${goal.title}</h6>
                    <small>${goal.resourceType}</small>
                </div>
                <p class="mb-1 small">Reduzir ${goal.targetReductionPercentage}% do consumo base (${goal.baselineConsumption})</p>
                <small class="text-muted">Prazo: ${new Date(goal.deadline).toLocaleDateString()}</small>
            `;
            goalsListEl.appendChild(li);
        });
    }
});
