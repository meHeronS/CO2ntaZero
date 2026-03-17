import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. REQUISIÇÃO DE LOGIN: Envia o e-mail e senha digitados para o backend validar
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // 2. SALVAR TOKENS JWT: Se as credenciais estiverem corretas, o backend devolve o Token.
        // Precisamos salvar no 'localStorage' para conseguir enviar nos cabeçalhos das próximas requisições.
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // Redireciona em caso de sucesso
      } else {
        alert(data.message || 'Credenciais inválidas!');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor. O backend está rodando?');
    }
  };

  return (
    <div className="login-container">
      <h1>Entrar - CO2ntaZero</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Acessar Sistema</button>
      </form>
    </div>
  );
}