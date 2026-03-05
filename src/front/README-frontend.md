# 🌐 Frontend Web - Admin Panel

Painel Administrativo Web do CO2ntaZero, focado na usabilidade para gestores que precisam de uma visão ampla da sustentabilidade da empresa.

## 🎯 Objetivo
Prover uma interface simples e direta para:
1.  **Gestão Centralizada**: Visualizar dados de Matriz e múltiplas Filiais.
2.  **Monitoramento**: Acompanhar Dashboards de consumo e alertas de anomalia (>15%).
3.  **Configuração**: Definir metas e parâmetros de alerta.

## 🛠️ Tecnologias
Opitamos por manter o Admin Panel leve e compatível:
*   **HTML5 & CSS3**: Estrutura e Estilo (Bootstrap).
*   **JavaScript (ES6 Modules)**: Lógica modularizada.
*   **Fetch API (apiHelper)**: Comunicação segura com o Backend.

## 📦 Estrutura
*   `js/api/apiHelper.js`: Centraliza chamadas HTTP, token refresh e tratamento de erros.
*   `pages/dashboard.html`: Visão principal com gráficos e alertas.
*   `pages/login.html`: Porta de entrada segura.

## 🚀 Como Rodar
O frontend depende do backend rodando.
1.  Inicie o backend.
2.  Use um servidor HTTP simples na pasta `frontend` (ou use o comando `npm start:frontend` na raiz do backend se configurado).
3.  Acesse `http://localhost:8080` (ou a porta de seu servidor).

---
