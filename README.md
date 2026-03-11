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

## 4. Arquitetura e Engenharia de Software

O sistema adota uma arquitetura **MVC Desacoplada** robusta, visando escalabilidade e manutenção. Embora funcional, reconhecemos academicamente que a arquitetura possui pontos de melhoria que poderiam ser refatorados em iterações futuras para maior desacoplamento e performance.

### 3.1. Estrutura do Frontend (Interoperabilidade)
A camada de apresentação (Frontend) foi desenhada para suportar uma transição tecnológica:
*   **Versão Legado**: Interface base (HTML/JS) que serviu para prototipação rápida.
*   **Versão React JS**: Implementação moderna, iniciando pela tela de login e dashboard, demonstrando a capacidade da API de servir diferentes clientes.
*   *Nota: A responsabilidade pela migração completa e manutenção do frontend será revista e decidida em conjunto pelo grupo.*

### 4.2. Visão de Escalabilidade e PWA
A escalabilidade do projeto é pautada nas **Boas Práticas de Desenvolvimento** (Clean Code, SOLID no backend). O conceito de **Progressive Web App (PWA)** é apresentado como o "estado da arte" desejado para o projeto: uma aplicação web que se comporta como nativa (mobile), permitindo acesso offline, notificações de metas de emissão e instalação no dispositivo, ampliando o alcance para uso em campo.

### 4.3. Modelo Single Owner e Segurança
O sistema adota o modelo **Single Owner** (Proprietário Único), onde um CPF gerencia múltiplas unidades (CNPJs ou Residências).
*   **Isolamento Lógico:** O campo `companyId` atua como chave de particionamento.
*   **Proteção de Identidade:** O sistema impede o cadastro duplicado de CNPJ. Se um usuário tentar cadastrar um CNPJ já existente, o sistema bloqueia a ação e notifica o proprietário original via e-mail.

---

## 5. Pilares Funcionais de Monitoramento

### 5.1. Definição de Alertas Inteligentes (Regra dos 15%)
O sistema monitora desvios de consumo. Detecta automaticamente variações superiores a **15%** (padrão configurável pelo usuário) em relação à média histórica, notificando o gestor sobre possíveis vazamentos ou ineficiências operacionais.
Mesmo sem alertas críticos, o sistema gera **sugestões de economia** para incentivar a redução contínua.

### 5.2. Inteligência Net Zero e Gamificação
*   **Rastreamento de Resíduos**: Módulo para gestão de economia circular (óleo, recicláveis).
*   **Cálculo de CO2**: Conversão automática baseada em tabelas oficiais (sem referências bibliográficas externas neste momento, utilizando dados padronizados de mercado/MCTI).
*   **Gamificação**: Uso de selos e feedbacks visuais quando metas de redução são atingidas.

---

## 6. Histórico de Versões e Contextualização Acadêmica

Este projeto adota um versionamento semântico adaptado para o contexto acadêmico, onde cada "Major Release" ou "Minor Change" reflete um marco ou uma nova tecnologia integrada pelos alunos.

> **Nota Importante:** Como projeto acadêmico em desenvolvimento contínuo, nenhuma funcionalidade deve ser considerada "final" ou "em produção". O código está em constante refatoração para aplicar os conceitos aprendidos em sala de aula (DevOps, Arquitetura de Software).

### 🔍 Detalhamento Exaustivo do Ciclo de Vida do Projeto (Changelog)

Abaixo, o histórico granular de cada etapa do desenvolvimento, desde a concepção teórica até a implementação técnica atual.

#### **v0.5.x - Planejamento de Infraestrutura (Futuro/Roadmap)**
*Etapa de preparação para o deploy em produção. Atualmente em fase de estudo.*
*   **0.5.2 - Containerização (Docker):**
    *   Definição teórica do `Dockerfile` para Node.js (Alpine Linux).
    *   Planejamento do `docker-compose.yml` para orquestração local (API + MongoDB).
*   **0.5.1 - Pipeline de CI/CD (Azure):**
    *   Estudo da plataforma Microsoft Azure para hospedagem do backend.
    *   Planejamento das variáveis de ambiente (`OPENAI_API_KEY`, `MONGO_URI`).

#### **v0.4.x - Refinamento e Documentação Técnica (Sprint Atual)**
*Fase de profissionalização dos artefatos do projeto.*
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
*Fase de codificação das regras de negócio e APIs.*
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

## 7. Instalação e Execução

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
<li><a href="docs/api/README.md"> Documentação da API (Endpoints)</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
