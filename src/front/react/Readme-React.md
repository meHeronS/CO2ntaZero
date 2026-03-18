# CO2ntaZero - Frontend React (PWA)

Este projeto foi atualizado para focar no monitoramento de **Sustentabilidade e Anomalias de Consumo**, funcionando como um **Progressive Web App (PWA)**.

> **O que é um PWA?**
> É uma aplicação que roda no navegador (Chrome, Safari, etc.) mas se comporta como um app nativo de celular.
> - **Instalável:** Pode ser adicionado à tela inicial do smartphone.
> - **Offline:** Funciona mesmo sem internet (após o primeiro acesso).
> - **Leve:** Não ocupa espaço de armazenamento como os apps de loja.
> - **Notificações:** Capaz de enviar alertas de consumo e anomalias.

## Estrutura Atual
- **App.js**: Dashboard principal exibindo métricas de Pegada de Carbono, Energia e Água.
- **Componentes**: 
  - Cartões de Métricas (Carbono, Energia, Água)
  - Lista de Alertas de Anomalia
  - Histórico de Consumo

## Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

A aplicação rodará em `http://localhost:3000`.

## Integração com Backend
O frontend está configurado para consumir a API em `http://localhost:5000/api`. As rotas principais são:
- `/api/consumptions` -> `src/services/api.js`
- `/api/alerts`
- `/api/goals`

## Docker
Para rodar em container:
```bash
docker build -t co2ntazero-react .
docker run -p 3000:3000 co2ntazero-react
```