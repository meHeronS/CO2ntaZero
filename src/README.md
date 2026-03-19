# Código do projeto

> Aqui devem ficar os arquivos-fonte do projeto: HTML, CSS, JavaScript, imagens e outros necessários para o funcionamento do sistema.

Este diretório contém todos os arquivos-fonte necessários para o funcionamento do sistema **CO2ntaZero**, uma Plataforma Full Stack (Web/PWA) focada em transformar a gestão de recursos básicos em uma estratégia de sustentabilidade ativa.

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
    ├── init.js          # Script de inicialização do MongoDB
    └── seed.js          # Script para popular o banco com dados iniciais
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

## Componentes Principais e Arquitetura de Dados

A modelagem de dados da plataforma prioriza a rastreabilidade de emissões, segurança (LGPD) e escalabilidade, dividida em três frentes principais:

### 1. Estrutura Base e Single Owner (Isolamento Lógico)
O sistema adota o modelo "Single Owner" (Proprietário Único). Embora suporte múltiplos usuários no banco de dados, cada conta é estritamente isolada.
- **Companies (Unidades de Gestão):** Centraliza o escopo de atuação (`companyId` como chave de particionamento).
- **Users (Usuários e Gestores):** Gerenciamento de identidades e acessos com senhas Bcrypt.
- **SessionTokens:** Controle stateless de autenticação via JWT com Refresh Tokens.

### 2. Motor de Sustentabilidade (Core Net Zero)
- **Consumptions:** Foco no monitoramento de grandezas físicas (kWh, m³, Litros).
- **EmissionFactors:** Fatores de emissão alimentados por tabelas oficiais (GHG Protocol e SIRENE/MCTI).
- **Wastes (Resíduos):** Módulo de Economia Circular, rastreando descarte de sólidos e líquidos.

### 3. Inteligência e Auditoria
- **Alerts (Regra dos 15%):** Inteligência que detecta desvios de consumo superiores a 15% em relação à média histórica, notificando preventivamente sobre ineficiências.
- **Goals:** Gamificação via compromissos ambientais (metas de redução, selos e "árvores plantadas").
- **Logs:** Sistema de auditoria e Compliance voltado para a LGPD.

## Instalação e Execução

### Pré-requisitos
*   Node.js (v18+)
*   Docker & Docker Compose
*   MongoDB (Atlas ou Local)

### Opção 1: Via Docker (Recomendado)
Garante a paridade de ambiente entre desenvolvimento e produção:
```bash
docker-compose up --build
```
* O **backend** da API rodará internamente na porta `:5000`
* O **frontend React** ficará disponível em `http://localhost:3000`

### Opção 2: Configuração Local (Backend)
Para desenvolvimento focado na API e execução das suítes de testes:
```bash
cd src/back
# Crie o arquivo .env baseado no .env.example
npm install
npm run dev
```
Para executar a suíte de testes automatizados (Jest/Supertest):
```bash
npm test
```

> **Links úteis**:
> - [Instruções sobre acesso a APIs externas](https://github.com/ICEI-PUC-Minas-PMV-SI/WebApplicationProject-Template/blob/main/help/apis.md)

## Instalação do Site

É necessário implantá-lo em um servidor web de sua preferência. Existem diversos servidores web gratuitos que podem ser utilizados, tal como GitHub Pages (GitHub.IO), Vercel, Render, Netlify, Surge.sh, entre outros. 

A implantação do sistema em produção do CO2ntaZero utiliza arquitetura Serverless/PaaS. O **Frontend** foi dimensionado para hospedagem na **Vercel** (para entrega veloz da interface), enquanto a **API do Backend** roda no **Microsoft Azure App Service**. Os dados trafegam e são persistidos globalmente no **MongoDB Atlas**.

**Endereço eletrônico público para acessá-lo:** [https://co2ntazero.vercel.app](https://co2ntazero.vercel.app)

## Roadmap e Status de Desenvolvimento por Processos

*Nota: O projeto encontra-se no início de seu ciclo de vida prático (Sprint 1 concluída). O mapeamento abaixo detalha as fundações reais garantidas (Realizado), o escopo que está no radar e com a arquitetura teórica bem alinhada (Já definido a ser feito), e tudo o que ainda exigirá construção técnica, revisão e validação do zero (A ser feito).*

### 1. Concepção e Especificação do Projeto
*   **Status Atual:** Em Andamento.
*   **Realizado:**
    *   **Escopo e Visão:** Projeto alinhado estrategicamente com os Objetivos de Desenvolvimento Sustentável (**ODS 12 e 13 da ONU**).
    *   **Validação Piloto:** Definição do parceiro extensionista (Valtinho's Bar / Sr. Vander) para garantir usabilidade com pessoas de baixa afinidade tecnológica.
    *   **Especificação Básica:** Criação de 6 Personas e mapeamento de 10 Histórias de Usuário focadas no ciclo: Lançamento -> Monitoramento -> Alerta.
*   **Já definido a ser feito:**
    *   **Requisitos Base:** 8 Requisitos Funcionais (ex: Cálculo automático de CO2) e 5 Não Funcionais (Stack MERN, LGPD).
    *   **Termos LGPD:** Estratégia de Termos de Uso e Consentimento Livre para o cadastro.
    *   **Limites do MVP:** Exclusão de OCR (leitura automática de faturas) ou integração bancária nesta fase.
*   **A ser feito:**
    *   Refinamento e pivotamento contínuo das especificações baseando-se nas validações práticas das próximas etapas.

### 2. Documentação e Modelagem
*   **Status Atual:** Fase Documental Inicial.
*   **Realizado:**
    *   **Metodologia:** Adoção de framework ágil (Scrum) com papéis definidos, versionamento no GitHub e rastreamento de tarefas.
    *   **Casos de Uso:** Diagrama mapeando as interações entre o Usuário Proprietário e o Sistema Net Zero.
*   **Já definido a ser feito:**
    *   **Modelagem de Processos:** Mapeamento macro (AS IS reativo vs TO BE proativo) através de BPMN para "Gestão Multi-Unidade" e "Metas e Alertas".
    *   Padrões rigorosos de formatação acadêmica (ABNT/SBC) aplicados à documentação.
*   **A ser feito:**
    *   **Consolidação dos BPMNs:** Desenho efetivo dos diagramas e preenchimento validado das tabelas de atividades/restrições (atualmente pendentes/esboçadas).
    *   Documentação detalhada das rotas da API REST.
    *   Medição dos Indicadores de Desempenho (KPIs: Taxa de Anomalias, Sucesso de Metas).
    *   Elaboração do Relatório Técnico e Pitch Final.

### 3. Design e Interface (UI/UX)
*   **Status Atual:** Pendente (No Radar).
*   **Realizado:**
    *   Criação de um frontend legado HTML/JS puramente estrutural ("scaffold"), servindo **apenas** como referência de requisições para homologar o Backend. Sem qualquer validação de design ou responsividade real.
*   **Já definido a ser feito:**
    *   No radar: Definição de uma Paleta de Cores oficial (semântica de alertas com verde #2ECC71), Tipografia para dados numéricos e grid Material Design visando acessibilidade.
    *   Mapeamento do User Flow e da Jornada do Usuário cobrindo a alternância de contexto (Multi-empresa).
*   **A ser feito:**
    *   **Construir o Protótipo de Alta Fidelidade no Figma** a partir do zero.
    *   Criar Wireframes reais das telas principais (Login, Dashboard de Sustentabilidade, Alertas).

### 4. Banco de Dados e Isolamento Lógico
*   **Status Atual:** Conexão Estabelecida.
*   **Realizado:**
    *   **Garantia Técnica:** Cluster remoto MongoDB Atlas provisionado e string de conexão inicial (via Mongoose) testada com sucesso.
*   **Já definido a ser feito:**
    *   **Arquitetura Single Owner:** Isolamento lógico multilocatário, onde 1 CPF (`Users`) gerencia N Unidades (`Companies`) pela chave de particionamento `companyId`.
    *   **Auditoria LGPD:** Adoção de exclusão física (*Hard Delete*) combinada com uma coleção separada de `Logs` persistentes para rastreabilidade de dados.
    *   **Coleções Planejadas:** `SessionTokens`, `Consumptions`, `EmissionFactors`, `Wastes`, `Alerts` e `Goals`.
*   **A ser feito:**
    *   **Modelagem Efetiva:** Criação dos diagramas reais (DER e Modelo Relacional) refletindo as coleções NoSQL (ainda não documentados).
    *   Codificação dos Schemas definitivos via Mongoose no código-fonte.
    *   Criação de scripts de sementes (Seeders) com os Fatores de Emissão reais do MCTI.

### 5. Backend (API, Segurança e Regras de Negócio)
*   **Status Atual:** Arquitetura Alinhada (Pendente Validação).
*   **Realizado:**
    *   **Setup:** Inicialização da estrutura de pastas Node.js (v18+) utilizando sintaxe moderna ES Modules (`type: module`).
*   **Já definido a ser feito:**
    *   **Decoupled MVC e Service Layer:** Isolamento da lógica matemática de conversão das rotas e controllers.
    *   **Autenticação e Sessão:** Login stateless com **Access Tokens (JWT)** e **Refresh Tokens**. Hash seguro via **Bcrypt**.
    *   **Motor Net Zero:** Algoritmo de Anomalias teoricamente definido (`Consumo > 15% da média histórica -> Alerta`) e módulo de resíduos (Wastes).
    *   **Segurança Anti-Fraude:** Bloqueio de sequestro de CNPJ e proteção de rotas com middleware `authGuard`.
*   **A ser feito:**
    *   **Revisar e Refinar** minuciosamente a arquitetura proposta antes da codificação.
*   Codificar os Middlewares de segurança (`helmet`, `express-rate-limit`, `cors`), validadores nas rotas com **Joi**, o `authGuard` e o Error Handling global.
    *   Implementar e testar as conversões matemáticas complexas do Motor de Anomalias na prática.

### 6. Frontend (Camada de Apresentação)
*   **Status Atual:** Planejado.
*   **Realizado:**
    *   Decisão estratégica de não aproveitar a interface do mock (HTML bruto) para a versão de produção final.
    *   Definição da tecnologia primária (React.js / Web SPA).
*   **Já definido a ser feito:**
    *   Estruturação do controle de rotas (client-side) para redirecionamento e proteção visual.
    *   Padrão desenhado para o **Axios**: interceptadores de requests para injeção automática de `Bearer Tokens` e gestão de sessão expirada.
*   **A ser feito:**
    *   Construção de toda a biblioteca de componentes visuais do zero (React).
    *   Criação de formulários dinâmicos.
    *   Integração efetiva com os endpoints do Backend para renderização dos Gráficos de Carbono.

### 7. Infraestrutura e Deploy (DevOps)
*   **Status Atual:** Planejado.
*   **Realizado:**
    *   Esboços conceituais de conteinerização (definição de uso do Docker).
*   **Já definido a ser feito:**
    *   Plano de hospedagem distribuído: Frontend CDN na **Vercel** e API Node.js no **Microsoft Azure App Service**.
*   **A ser feito:**
    *   Escrita dos arquivos `Dockerfile` e `docker-compose.yml` reais.
    *   Criação dos recursos em nuvem, injeção de Variáveis de Ambiente e configuração de pipeline CI/CD (GitHub Actions).

### 8. Qualidade e Testes de Software
*   **Status Atual:** Planejado (Documentação Elaborada).
*   **Realizado:**
    *   Esqueleto da pasta de testes estruturada.
    *   Planos teóricos de Testes de Software e Usabilidade elaborados, pautados pela norma **ISO/IEC 25010**.
*   **Já definido a ser feito:**
    *   Diretrizes e 5 Casos de Teste (CT-001 a CT-005) documentados para cobrir os fluxos críticos de Autenticação, Isolamento e Anomalias.
*   **A ser feito:**
    *   **Atenção:** Nenhum teste de código real foi efetuado. Resta escrever os scripts de integração em Jest/Supertest.
    *   Executar as baterias de teste de campo e gravar os registros de evidência (Screencasts).

### 9. Apresentações e Entregas (Ciclo de Sprints)
*   **Status Atual:** Em Andamento.
*   **Realizado:**
    *   **Apresentação 1:** Entrega concluída referente à **Sprint 1** (Definição do Projeto, Objetivos e Fundações de Contexto).
*   **Já definido a ser feito:**
    *   Cronograma de avaliações acadêmicas subsequentes alinhado com a disciplina e professor(a).
*   **A ser feito:**
    *   **Apresentação 2:** Sprint 2 (Fundações Backend, Banco de Dados e Modelagem de Processos).
    *   **Apresentação 3:** Sprint 3 (Design UI/UX, Figma e Integração Inicial).
    *   **Apresentação 4:** Sprint 4 (Testes de Software e Motor de Cálculos).
    *   **Apresentação 5:** Sprint 5 (Deploy Final, Testes de Usabilidade e Fechamento do Projeto).