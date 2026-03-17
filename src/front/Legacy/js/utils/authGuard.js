const token = localStorage.getItem('token');
if (!token && !window.location.pathname.includes('login.html')) {
    window.location.href = '/pages/login.html';
}