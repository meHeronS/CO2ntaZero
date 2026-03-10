# Código do projeto

Este diretório contém todos os arquivos-fonte necessários para o funcionamento do sistema **CO2ntaZero**, uma Plataforma Full Stack (Web/PWA) focada em transformar a gestão de recursos básicos em uma estratégia de sustentabilidade ativa.

> Aqui devem ficar os arquivos-fonte do projeto: HTML, CSS, JavaScript, imagens e outros necessários para o funcionamento do sistema.

## Estrutura de Código

O projeto utiliza uma arquitetura **MVC Desacoplada** com a seguinte organização:

```bash
src/
├── back/               # API RESTful (Node.js/Express)
│   ├── models/         # Schemas do MongoDB (Mongoose)
│   ├── services/       # Regras de Negócio (Cálculo CO2, Alertas)
│   └── ...
│
├── front/              # Camada de Apresentação
│   ├── legacy/         # Versão Legado (HTML/JS/CSS)
│   └── react/          # Versão Moderna (React.js)
│       └── src/        # Componentes e Páginas
│
└── db/                 # Scripts de Banco de Dados
    ├── seed.js         # População inicial (Dados base)
    ├── clean.js        # Limpeza do banco (Reset)
    └── create-test...  # Massa de dados para testes
```

*   [Código do front-end](./front) -- **Aplicação Web (React.js)**
    *   Focado em experiência Desktop, mas responsivo para acesso via navegador móvel.
    *   Gerencia o estado da UI para dashboards e calculadoras de carbono.
    *   Comunica-se com a API via Axios.

*   [Código do back-end](./back)  -- **API e Regras de Negócio (Node.js)**
    *   API REST estruturada com Express.
    *   Executa a inteligência de negócios (ex: Motor de Anomalias para alertas >15%).
    *   Processa fatores de emissão e interage com o MongoDB via Mongoose.

*   [Scripts de Banco de Dados](./db) -- **Scripts de inicialização do MongoDB**
    *   Scripts para popular o banco (seed) e configurações iniciais.

## Visão Geral do Sistema

O CO2ntaZero utiliza uma arquitetura MVC Desacoplada, garantindo que o motor de cálculos (Backend) seja independente da interface (Frontend).

### Stack Tecnológica
-   **Frontend:** Concebido com tecnologias Web (React.js) focando em experiência Desktop, mas com estrutura responsiva para acesso via navegador em dispositivos móveis.
-   **Backend:** Node.js com Express estruturando nossa API REST, onde reside o core de processamento.
-   **Banco de Dados:** MongoDB (via Atlas) como banco NoSQL.
-   **Containerização:** Docker (docker-compose) para padronizar o ambiente entre desenvolvimento e produção.

### Fluxo de Dados
1. **Cliente (Navegador Web)**
    - Captura inputs de dados (lançamento de faturas em kWh, m³).
    - Gerencia estado na UI para montagem de gráficos de sustentabilidade e Calculadora de Carbono.
    - Realiza requisições HTTPS protegidas para a API.

2. **Servidor (Node.js/Express Dockerizado)**
    - Recebe requisições via JWT (JSON Web Tokens).
    - Executa a inteligência de negócios (ex: *Motor de Anomalias* para alertar consumos 15% acima da média).
    - Processa fatores de emissão em massa com os `services`.
    - Interage com o MongoDB através dos `models` (Mongoose).

3. **Banco de Dados (MongoDB)**
    - Estruturado para isolar os dados por **Unidade (Company)**, garantindo que cada Proprietário (User) acesse apenas os dados das unidades que gerencia.

## Componentes Principais

### Backend (Motor de Cálculos Sustentáveis)
-   **Funcionalidades:** Lançamento flexível de faturas, rastreamento de resíduos (economia circular), calculadora automática da pegada de carbono, detecção de anomalias (alerta >15%) e segurança com criptografia (Bcrypt/JWT).

### Frontend (React PWA)
-   **Funcionalidades:** Formulários de lançamento fluidos, Dashboard de Sustentabilidade (Calculadora de Carbono com total de árvores para compensação), sistema de Alertas responsivo.

## Como Iniciar o Projeto (Via Docker)

Recomendamos o uso de containers para garantir paridade do ambiente.

1. Tendo o Docker e Docker Compose instalados, rode na pasta raiz do código:
   ```bash
   docker-compose up --build
   ```
   * O **backend** de serviços rodará internamente na porta `:5000`
   * O **frontend React** ficará disponível em `http://localhost:3000`
   * Uma instância isolada do **Mongo** será acoplada ao ambiente.

> **Links úteis**:
> - Instruções sobre acesso a APIs externas

## Instalação do Site

É necessário implantá-lo em um servidor web de sua preferência. Existem diversos servidores web gratuitos que podem ser utilizados, tal como GitHub Pages (GitHub.IO), Vercel, Render, Netlify, Surge.sh, entre outros. Acesso: https://co2ntazero.vercel.app

## Histórico de versões

### [0.1.0] - 05/03/2026
#### Adicionado
- Estrutura inicial do projeto (Backend, Frontend, DB).
- Documentação técnica e roteiros de teste.