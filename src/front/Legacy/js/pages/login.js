document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // 1. REQUISIÇÃO PARA O BACKEND: Conecta na API para conferir se o usuário existe.
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // 2. SALVANDO O PASSAPORTE (TOKEN): O backend gera um token JWT de autorização.
                    // Guardamos no localStorage para usar na apiHelper.js depois, e puxar o Dashboard.
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = '/pages/startPage.html'; // Redireciona para o Dashboard
                } else {
                    alert(data.message || 'Credenciais inválidas. Tente novamente.');
                }
            } catch (error) {
                alert('Erro ao conectar ao servidor. Verifique se o backend está rodando.');
            }
        });
    }
});