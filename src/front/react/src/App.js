import React, { useState, useEffect } from "react";
import "./App.css";

// Simulação de Dados para o Dashboard
const mockData = {
  consumptions: [
    { _id: "1", date: new Date().toISOString(), resourceType: "electricity", quantity: 1200, unit: "kWh", carbonFootprint: 34.68 },
    { _id: "2", date: new Date().toISOString(), resourceType: "water", quantity: 15, unit: "m3", carbonFootprint: 0.225 },
    { _id: "3", date: new Date().toISOString(), resourceType: "gas", quantity: 50, unit: "kg", carbonFootprint: 105.0 }
  ],
  alerts: [
    { _id: "a1", message: "Consumo de água 15% acima da média histórica.", createdAt: new Date().toISOString() },
    { _id: "a2", message: "Meta de redução de carbono atingida!", createdAt: new Date().toISOString() }
  ],
  metrics: {
    totalCarbon: 139.90,
    electricityUsage: 1200,
    waterUsage: 15
  }
};

function App() {
  const [data, setData] = useState(null);

  // --- EXEMPLO DE INTEGRAÇÃO COM BACKEND (Para substituir o mockData) ---
  /*
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token'); // Recupera token JWT
        if (!token) {
           // Redirecionar para login
           return;
        }

        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Buscar Consumos
        const consumptionsRes = await fetch('http://localhost:5000/api/consumptions', { headers });
        const consumptionsData = await consumptionsRes.json();
        
        // 2. Buscar Alertas
        const alertsRes = await fetch('http://localhost:5000/api/alerts', { headers });
        const alertsData = await alertsRes.json();

        // 3. Processar Métricas (Exemplo simplificado)
        const metrics = {
            totalCarbon: consumptionsData.data.reduce((acc, c) => acc + (c.carbonFootprint || 0), 0),
            // ... outras métricas
        };

        setData({
            consumptions: consumptionsData.data,
            alerts: alertsData.data,
            metrics
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchData();
  }, []);
  */

  useEffect(() => {
    // Simula chamada de API (Remover quando integrar com backend real)
    setTimeout(() => setData(mockData), 500);
  }, []);

  if (!data) return <div className="loading">Carregando painel de sustentabilidade...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1> CO2ntaZero</h1>
        <p>Monitoramento Inteligente de Recursos ESG</p>
      </header>

      <main className="dashboard-grid">
        {/* Cartões de métricas */}
        <div className="metric-card carbon">
            <h3>Pegada de Carbono</h3>
            <p className="value">{data.metrics.totalCarbon.toFixed(1)} <span className="unit">kgCO2e</span></p>
        </div>
        <div className="metric-card energy">
            <h3>Energia (Mês)</h3>
            <p className="value">{data.metrics.electricityUsage} <span className="unit">kWh</span></p>
        </div>
        <div className="metric-card water">
            <h3>Água (Mês)</h3>
            <p className="value">{data.metrics.waterUsage} <span className="unit">m�</span></p>
        </div>

        {/* Lista de Alertas */}
        <section className="alerts-section">
            <h2> Alertas Recentes</h2>
            <ul>
                {data.alerts.map(alert => (
                    <li key={alert._id} className="alert-item">
                        {alert.message}
                    </li>
                ))}
            </ul>
        </section>

        {/* Tabela de Consumo */}
        <section className="consumption-section">
            <h2> Hist�rico de Consumo</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Recurso</th>
                        <th>Qtd</th>
                        <th>Impacto (CO2)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.consumptions.map(c => (
                        <tr key={c._id}>
                            <td>{new Date(c.date).toLocaleDateString()}</td>
                            <td style={{textTransform: "capitalize"}}>{c.resourceType}</td>
                            <td>{c.quantity} {c.unit}</td>
                            <td>{c.carbonFootprint.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
      </main>
    </div>
  );
}

export default App;

