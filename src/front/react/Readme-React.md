
# CO2ntaZero - Frontend React (PWA)

Este projeto foi atualizado para focar no monitoramento de **Sustentabilidade e Anomalias de Consumo**, funcionando como um **Progressive Web App (PWA)**.

> **O que é um PWA?**
> É uma aplicação que roda no navegador (Chrome, Safari, etc.) mas se comporta como um app nativo de celular.
> - **Instalável:** Pode ser adicionado à tela inicial do smartphone.
> - **Offline:** Funciona mesmo sem internet (após o primeiro acesso).
> - **Leve:** Não ocupa espaço de armazenamento como os apps de loja.
> - **Notificações:** Capaz de enviar alertas de consumo e anomalias.

## Estrutura Atual
- **App.js**: Dashboard principal exibindo m�tricas de Pegada de Carbono, Energia e �gua.
- **Componentes**: 
  - Cart�es de M�tricas (Carbono, Energia, �gua)
  - Lista de Alertas de Anomalia
  - Hist�rico de Consumo

## Instala��o e Execu��o

1. Instale as depend�ncias:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

A aplica��o rodar� em `http://localhost:3000`.

## Integra��o com Backend
O frontend est� configurado para consumir a API em `http://localhost:5000/api`. As rotas principais s�o:
- `/api/consumptions` -> `src/services/api.js`
- `/api/alerts`
- `/api/goals`

## Docker
Para rodar em container:
```bash
docker build -t co2ntazero-react .
docker run -p 3000:3000 co2ntazero-react
```

