# CO2ntaZero: Calculadora de Emissões e Conscientização Ambiental

`CURSO: Sistemas de Informação`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Sustentabilidade`

`1º Semestre / 2026`

O **CO2ntaZero** é uma ferramenta acadêmica de **Conscientização Ambiental** concebida para monitorar e calcular as emissões de carbono de indivíduos e pequenos negócios. O objetivo central não é a gestão corporativa complexa, mas sim a conversão de métricas de consumo (energia, água, combustíveis) em **Pegada de Carbono (Carbon Footprint)**, permitindo que pessoas comuns entendam seu impacto e adotem hábitos mais sustentáveis.

## Integrantes

* Caio Vieira de Freitas
* Gustavo Costa Pinho Tavares
* Heron Victor Vieira da Silva
* João Vinicius Rodrigues Santos
* Saulo Luiz de Oliveira e Silva

## Professor

* Amália Soares Vieira de Vasconcelos

---

## 1. Contexto e Motivação

O projeto CO2ntaZero nasceu de uma necessidade prática: auxiliar o **Sr. Vander (65 anos)**, pai de um dos fundadores, a monitorar variações nos gastos mensais de sua residência e comércio (**Valtinho's Bar**).

A dificuldade em perceber anomalias nas faturas de papel motivou a criação de um sistema que não apenas alertasse sobre desperdícios financeiros (regra de variação > 15%), mas que evoluísse para uma plataforma de Green Tech, convertendo esses dados em pegada de carbono e promovendo a sustentabilidade.

### Princípio de Design: Usabilidade Simplificada
A principal diretriz para a interface é a facilidade de uso. O sistema deve ser tão intuitivo e autoexplicativo que o Sr. Vander, sem afinidade com tecnologia, consiga utilizá-lo de forma fluida e sem necessidade de treinamento.

### Parceiro de Validação (MVP)
O **Valtinho's Bar** servirá como piloto para validar se a ferramenta ajuda efetivamente a economizar dinheiro e reduzir emissões em um cenário real de pequeno negócio.

---

## 2. Glossário e Conceitos Fundamentais

Para facilitar o entendimento técnico e de negócio deste projeto, definimos os seguintes termos e siglas:

*   **Sustentabilidade Prática**: Foco em ações tangíveis do dia a dia (reduzir luz, economizar água) em vez de políticas corporativas complexas.
*   **GHG Protocol (Greenhouse Gas Protocol)**: Padrão globalmente aceito para quantificação e gestão de emissões de Gases de Efeito Estufa (GEE).
*   **MCTI**: Ministério da Ciência, Tecnologia e Inovação. Referência oficial brasileira para os fatores médios de emissão de CO2 do Sistema Interligado Nacional (SIN).
*   **MERN Stack**: Conjunto de tecnologias JavaScript utilizado para o desenvolvimento full-stack: **M**ongoDB (Banco de dados), **E**xpress (Framework backend), **R**eact (Biblioteca frontend) e **N**ode.js (Ambiente de execução).
*   **MVP (Minimum Viable Product)**: Versão minimalista do produto, contendo apenas as funcionalidades essenciais para validar a proposta de valor (o cálculo de emissões).
*   **Net Zero (Conceito Climático)**: Refere-se à meta global de zerar as emissões líquidas de carbono. *Nota: Este termo é utilizado aqui estritamente como conceito científico/ambiental (Net Zero Emissions), sem vínculo comercial com empresas homônimas do setor de créditos de carbono.*
*   **ODS (Objetivos de Desenvolvimento Sustentável)**: Agenda global da ONU. Este projeto atende diretamente aos:
    *   **ODS 12 (Consumo e Produção Responsáveis)**: Incentivo ao uso eficiente de recursos naturais e gestão adequada de resíduos.
    *   **ODS 13 (Ação Contra a Mudança Global do Clima)**: Medidas urgentes para combater a mudança do clima e seus impactos através do monitoramento de CO2.

---

## 3. Justificativa Acadêmica e Diferencial

Este projeto é um **Modelo Conceitual de Tecnologia Verde (Greentech)** desenvolvido em grupo. Enquanto empresas de mercado (ex: *NetZero.green*) focam em soluções complexas para grandes corporações e indústrias pesadas, o **CO2ntaZero** nasce com a missão de **democratizar a sustentabilidade**.

Nosso foco é dar ferramentas para o **Pequeno Empresário (Dono de Restaurante, Padaria)** e para **Pessoas Físicas**, permitindo que qualquer um possa iniciar sua jornada de sustentabilidade sem burocracia. O sistema torna tangível o impacto invisível das atividades diárias.

---

## 4. Arquitetura Técnica

A arquitetura de dados do CO2ntaZero foi projetada para suportar uma plataforma acadêmica de Green Tech orientada a dados. O sistema utiliza a MERN Stack (MongoDB, Express, React, Node.js), com persistência no MongoDB Atlas (NoSQL) e infraestrutura Dockerizada e hospedada na nuvem. A modelagem de dados prioriza a rastreabilidade de emissões de carbono, segurança (LGPD) e escalabilidade horizontal.

### Parte 1: Estrutura Base e Single Owner (Isolamento Lógico)
O sistema adota o modelo "Single Owner" (Proprietário Único). Embora suporte múltiplos usuários no banco de dados, cada conta é isolada.
1. **Companies (Unidades de Gestão):** Centraliza o escopo de atuação (`companyId` como chave de particionamento).
2. **Users (Usuários e Gestores):** Gerenciamento de identidades e acessos (senhas Bcrypt). Um CPF gerencia múltiplas unidades.
3. **SessionTokens:** Controle stateless via JWT com Refresh Tokens.

### Parte 2: O Motor de Sustentabilidade (Core Sustentabilidade)
4. **Consumptions:** Foco em grandezas físicas (kWh, m³, Litros).
5. **EmissionFactors:** Fatores de emissão oficiais (GHG Protocol & SIRENE - ~0,3708 kgCO2/kWh).
6. **Wastes:** Economia Circular. Rastreia resíduos sólidos e líquidos (Tabelas FGV).

### Parte 3: Inteligência e Auditoria
7. **Alerts:** Motor de desvios de consumo (variação > 15%).
8. **Goals:** Gamificação via compromissos ambientais.
9. **Logs:** Auditoria e Compliance LGPD.

---

## 5. Pilares Funcionais de Monitoramento

### 5.1. Definição de Alertas Inteligentes (Regra dos 15%)
O sistema monitora desvios de consumo. Detecta automaticamente variações superiores a **15%** (ou limite configurado) em relação à média histórica, notificando o gestor sobre possíveis vazamentos ou ineficiências operacionais.

### 5.2. Inteligência Net Zero e Gamificação
*   **Rastreamento de Resíduos**: Módulo para gestão de economia circular (óleo, recicláveis).
*   **Cálculo de CO2**: Conversão automática baseada em tabelas oficiais do Governo (MCTI) e FGV.
*   **Gamificação**: Uso de selos e feedbacks visuais quando metas de redução são atingidas.

---

## 6. Infraestrutura e Deploy

- **Hospedagem API:** Microsoft Azure App Service. [Acessar Documentação](https://learn.microsoft.com/azure/app-service/)
- **Hospedagem Front:** Vercel. [Acessar Documentação](https://vercel.com/docs/frameworks/react)
- **Container:** Docker (Ambientes padronizados). [Acessar Documentação](https://docs.docker.com/get-started/)
- **Banco de Dados:** MongoDB Atlas (NoSQL). [Acessar Documentação](https://www.mongodb.com/docs/atlas/)
- **Backend:** Node.js (Runtime) - [Doc Node](https://nodejs.org/docs/) & Express.js (Framework) - [Doc Express](https://expressjs.com/)
- **Frontend:** React.js (Interface Responsiva). [Acessar Documentação](https://react.dev/learn)
- **Versionamento e Gestão:** GitHub & GitHub Projects. [Acessar Documentação](https://docs.github.com/pt)
- **Segurança:** BCrypt (Hash de senhas) & JWT (Tokens). [Acessar Documentação JWT](https://jwt.io/introduction/)

---

## 7. Histórico de Versões e Contextualização Acadêmica

Este projeto atingiu sua versão de **Entrega Final (Sprint 5)**. Todas as rotas base, regras de negócios e integrações com o Frontend e Nuvem foram consolidadas.

### 🔍 Detalhamento Exaustivo do Ciclo de Vida do Projeto (Changelog)

#### **v1.0.0 - Entrega Final (Sprint 5) - Nuvem e Segurança**
*Integração total do sistema (Front-Back-DB) funcionando sem erros e hospedado na nuvem.*
*   **0.5.2 - Containerização (Docker):**
    *   Configuração do `Dockerfile` para orquestração local (API + MongoDB).
*   **0.5.1 - Pipeline de CI/CD (Azure):**
    *   Hospedagem API configurada na nuvem (Azure/Vercel).
    *   Segurança avançada consolidada (Bcrypt, validações).

#### **v0.4.x - Refinamento e Documentação Técnica (Sprint Atual)**
*Fase de profissionalização dos artefatos (Sprints 3 e 4).*
*   **0.4.6 - Simplificação de Arquitetura (Single Owner):**
    *   Remoção do sistema complexo de RBAC (Roles/Permissions).
    *   Adoção do modelo de **Proprietário Único**, onde 1 CPF gerencia N Empresas/Residências.
    *   Implementação de validação estrita de CPF para usuários e CNPJ/Endereço para unidades.
*   **0.4.5 - Documentação Acadêmica (Relatórios):**
    *   Elaboração do `RELATORIO_TECNICO_PUC.md` seguindo normas ABNT/SBC.
    *   Detalhamento da arquitetura técnica no `DocumentacaoTI.md`.
*   **0.4.4 - Padronização de READMEs:**
    *   Revisão de todos os `README.md` (Raiz, Backend, Frontend) para linguagem técnica unificada.
    *   Definição explícita do conceito "Web Desktop" vs "Mobile Conceitual".
*   **0.4.3 - Refatoração do Motor de Consumo (Controller):**
    *   Aplicação do padrão *Service Layer* no `consumptionController`.
    *   Isolamento das regras de validação e persistência.
*   **0.4.2 - Correção de Módulos (ESM Fixes):**
    *   Ajuste de importações/exportações para compatibilidade total com `type: module` no Node.js.
    *   Resolução de dependências circulares em `apiHelper.js`.
*   **0.4.1 - Ajuste de Escopo (Pivot):**
    *   Redefinição do foco de "App Nativo" para "Web Responsiva" (MVP Acadêmico).

#### **v0.3.x - Desenvolvimento Core Backend (Implementation)**
*Fase de codificação das regras de negócio e APIs (Sprints 1 e 2).*
*   **0.3.6 - Módulo de Resíduos (Waste Management):**
    *   Criação da rota `/api/active/waste` para registro de descarte (Óleo, Recicláveis).
    *   Implementação de lógica de conversão: 1 Litro de Óleo = X kgCO2e evitados.
    *   Modelagem da coleção `Waste` no MongoDB.
*   **0.3.5 - Motor de Anomalias (Alert System):**
    *   Desenvolvimento do algoritmo de heurística: `Se (ConsumoAtual > MédiaTrimestral * 1.15) -> Disparar Alerta`.
    *   Integração com tabela de `Alerts` para histórico de incidentes.
*   **0.3.4 - Serviço de Autenticação (Auth):**
    *   Implementação de Login (`/auth/login`) com emissão de JWT (Access Token).
    *   Implementação de Registro (`/auth/register`) com criptografia de senha (Bcrypt).
    *   Desenvolvimento do Middleware `authGuard` para proteção de rotas privadas.
*   **0.3.3 - CRUD de Entidades Core:**
    *   Rotas de `Profile` para gestão de dados do usuário.
    *   Lógica de vínculo 1:N entre Usuário (CPF) e Múltiplas Unidades (CNPJ/Residência).
*   **0.3.2 - Configuração do Servidor Express:**
    *   Setup inicial de `server.js` com middlewares essenciais: CORS, Body Parser e Helmet.
    *   Configuração de tratamento de erros global (Error Handling).
*   **0.3.1 - Conexão com Banco de Dados:**
    *   Configuração do Mongoose e string de conexão com MongoDB Atlas.
    *   Testes de conectividade e tratamento de falhas de rede.

---

## 8. Instalação e Execução

### Pré-requisitos
*   Node.js (v18+)
*   Docker & Docker Compose
*   MongoDB

### Inicialização
<!-- O clone do repositório dependerá da liberação do link final do GitHub Classroom pela professora. -->
<!-- 
1.  **Clonar o repositório:**
    git clone https://github.com/classroom-link/CO2ntaZero.git
2.  **Executar via Docker:**
    docker-compose up --build
-->

1.  **Configuração do Backend:**
    ```bash
    cd src/back
    # Crie o arquivo .env baseado no .env.example
    npm install
    npm run dev
    ```

2.  **Testes Automatizados:**
    ```bash
    npm test
    ```

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Plano-testes-usabilidade.md"> Plano de testes de usabilidade</a></li>
<li><a href="docs/11-Registro-testes-usabilidade.md"> Registro de testes de usabilidade</a></li>
<li><a href="docs/12-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/13-Referencias.md"> Referências</a></li>
</ol>

---

# Referencial de Bases de Dados Corroboradas

1. **BRASIL. Ministério da Ciência, Tecnologia e Inovações (MCTI).** SIRENE - Fatores de Emissão de Eletricidade: Sistema Interligado Nacional (SIN). Brasília, 2025. [Acessar Fonte](https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/sirene/emissoes/fatores-de-emissao-de-eletricidade)
2. **FGVces. Programa Brasileiro GHG Protocol:** Ferramenta de Cálculo v2026.0.1. São Paulo: FGV, 2026. [Acessar Fonte](https://eaesp.fgv.br/centros/centro-estudos-sustentabilidade/programas/programa-brasileiro-ghg-protocol)
3. **EMPRESA DE PESQUISA ENERGÉTICA (EPE).** Balanço Energético Nacional (BEN): Fatores de Conversão. Rio de Janeiro: EPE, 2024. [Acessar Fonte](https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-2024)
4. **BRASIL. Ministério das Cidades.** Sistema Nacional de Informações sobre Saneamento (SNIS): Diagnósticos de Água e Resíduos. Brasília: SNS, 2024. [Acessar Fonte](http://www.snis.gov.br/paineis-de-informacoes-sobre-saneamento)

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
