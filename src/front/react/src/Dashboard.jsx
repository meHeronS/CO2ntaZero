import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [consumptions, setConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumptions = async () => {
      // 1. RECUPERAR O TOKEN: Para puxar dados protegidos do backend, precisamos do "crachá" do usuário.
      const token = localStorage.getItem('token');
      try {
        // 2. CHAMADA À API (FETCH): Faz o GET na rota do backend (que deve estar rodando localmente na porta 5000)
        const response = await fetch('http://localhost:5000/api/consumptions', {
          method: 'GET',
          headers: {
            // 3. AUTENTICAÇÃO: O token é enviado no cabeçalho 'Authorization' com o prefixo 'Bearer '.
            // Sem isso, o backend bloqueia a requisição e retorna Erro 401 (Não Autorizado).
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // 4. LER OS DADOS: O backend devolve uma string, o .json() converte isso para um objeto/array utilizável no React
          const data = await response.json();
          setConsumptions(data); // Supondo que a API retorna um array direto ou data.data
        }
      } catch (error) {
        console.error("Erro ao buscar consumos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumptions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f0fdf4' }}>
        <span>Olá, <strong>{user.name || 'Usuário'}</strong></span>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <main style={{ padding: '2rem' }}>
        <h1>Seu Resumo Ambiental</h1>
        <p>Acompanhe seu consumo de água, luz e as emissões de Carbono.</p>
        
        <section style={{ marginTop: '2rem' }}>
          <h2>Histórico de Lançamentos</h2>
          {loading ? (
            <p>Carregando seus dados...</p>
          ) : consumptions.length > 0 ? (
            <ul>
              {consumptions.map((item) => (
                <li key={item._id || item.id}>
                  {item.description || item.resourceType} - {item.amount || item.quantity} {item.unit}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum consumo registrado ainda. Que tal lançar a primeira fatura?</p>
          )}
        </section>
      </main>
    </div>
  );
}