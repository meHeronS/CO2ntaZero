# Frontend Web - Admin Panel

Painel Administrativo Web do CO2ntaZero, focado na usabilidade para gestores que precisam de uma visão ampla da sustentabilidade da empresa.

## Objetivo
Prover uma interface simples e direta para:
1.  **Gestão Centralizada**: Visualizar dados de Matriz e múltiplas Filiais.
2.  **Monitoramento**: Acompanhar Dashboards de consumo e alertas de anomalia (>15%).
3.  **Configuração**: Definir metas e parâmetros de alerta.

## Tecnologias
Optamos por manter o Admin Panel leve e compatível:
*   **HTML5 & CSS3**: Estrutura e Estilo (Bootstrap).
*   **JavaScript (ES6 Modules)**: Lógica modularizada.
*   **Fetch API (apiHelper)**: Comunicação segura com o Backend, trafegando Cookies `HttpOnly`.

## Estrutura
*   `js/api/apiHelper.js`: Centraliza chamadas HTTP, token refresh e tratamento de erros.
*   `pages/dashboard.html`: Visão principal com gráficos e alertas.
*   `pages/login.html`: Porta de entrada segura.

## Como Rodar
O frontend depende do backend rodando.
1.  Inicie o backend.
2.  A partir da pasta raiz do projeto, utilize o comando `npm run start:frontend` (que abrirá um servidor local).
3.  Acesse `http://localhost:3000` (Esta porta é obrigatória para que as políticas de CORS e Cookies do backend funcionem corretamente).

---
