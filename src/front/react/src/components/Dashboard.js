
import React from 'react';

function Dashboard({ data }) {
  if (!data) return <p>Carregando dados...</p>;

  // Métricas
  const totalCarbon = data.consumptions?.reduce((acc, curr) => acc + (curr.carbonFootprint || 0), 0) || 0;
  const totalEnergy = data.consumptions?.filter(d => d.resourceType === 'electricity')
                         .reduce((acc, curr) => acc + curr.quantity, 0) || 0;
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Painel de Sustentabilidade</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Pegada de Carbono</h5>
              <p className="card-text display-4">{totalCarbon.toFixed(2)} <small style={{fontSize: '0.5em'}}>kgCO2e</small></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Consumo de Energia</h5>
              <p className="card-text display-4">{totalEnergy.toFixed(2)} <small style={{fontSize: '0.5em'}}>kWh</small></p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Alertas Recentes</h4>
      <ul className="list-group">
        {data.alerts?.length > 0 ? (
          data.alerts.map(alert => (
            <li key={alert._id} className="list-group-item d-flex justify-content-between align-items-center">
              {alert.message}
              <span className="badge bg-danger rounded-pill">!</span>
            </li>
          ))
        ) : (
          <li className="list-group-item">Nenhum alerta.</li>
        )}
      </ul>

      <h4 className="mt-4">Histórico de Consumo</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Recurso</th>
            <th>Qtd</th>
            <th>Pegada</th>
          </tr>
        </thead>
        <tbody>
           {data.consumptions?.slice(0, 5).map(c => (
             <tr key={c._id}>
               <td>{new Date(c.date).toLocaleDateString()}</td>
               <td>{c.resourceType}</td>
               <td>{c.quantity} {c.unit}</td>
               <td>{c.carbonFootprint?.toFixed(2)}</td>
             </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
