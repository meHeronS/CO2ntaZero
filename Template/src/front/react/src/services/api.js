
const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error('Falha no login');
        return response.json();
    },

    getConsumptions: async () => {
        const response = await fetch(`${API_BASE_URL}/consumptions`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Falha ao buscar consumos');
        return response.json();
    },

    getGoals: async () => {
        const response = await fetch(`${API_BASE_URL}/goals`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Falha ao buscar metas');
        return response.json();
    },
    
    getAlerts: async () => {
        const response = await fetch(`${API_BASE_URL}/alerts`, { headers: getHeaders() });
        if (!response.ok) throw new Error('Falha ao buscar alertas');
        return response.json();
    }
};
