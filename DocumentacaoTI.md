# Relatório Técnico - Projeto de Extensão
**Título do Trabalho:** CO2ntaZero - Sistema Inteligente de Gestão de Pegada de Carbono e Resíduos  

**Membros do Grupo:**
1. Caio Vieira de Freitas
2. Gustavo Costa Pinho Tavares
3. Heron Victor Vieira da Silva
4. Joao Vinicius Rodrigues Santos
5. Saulo Luiz de Oliveira e Silva

**Professor(a):** Amália Soares Vieira de Vasconcelos

**Instituição:** Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS)  
**Local:** Belo Horizonte – MG – Brasil  
**E-mails:** [email1], [email2], [email3], [email4], [email5]

---

**Resumo.**  
Este projeto apresenta o CO2ntaZero, uma solução de software voltada para a gestão de sustentabilidade empresarial (ESG), focada no cálculo automatizado de pegada de carbono, gestão de resíduos e detecção de anomalias de consumo. O objetivo é fornecer a pequenas e médias empresas uma ferramenta acessível para monitorar seu impacto ambiental. Como resultado relevante, o sistema é capaz de identificar desvios de consumo superiores a 15% da média histórica, gerando alertas automáticos que auxiliam na redução de desperdícios e custos operacionais.

---

## 1. INTRODUÇÃO

O CO2ntaZero nasceu de uma necessidade prática e pessoal: a dificuldade de monitorar variações nos gastos mensais de água e luz de uma residência comum. A ideia surgiu da intenção de auxiliar o Sr. Vander (pai de um dos fundadores), de 65 anos, a visualizar se estava ocorrendo uma variação grande nos gastos mensais de sua casa e de seu bar, algo difícil de perceber apenas com as faturas em papel. Dada a simplicidade inicial, o projeto evoluiu para uma abordagem *Green Tech*, percebendo que evitar o desperdício financeiro é também uma forma de promover a sustentabilidade.

A gestão ambiental tornou-se um pilar estratégico para empresas de todos os portes. No entanto, pequenas e médias organizações frequentemente carecem de ferramentas acessíveis para monitorar suas emissões de gases de efeito estufa (GEE) e gerenciar seus resíduos de forma eficiente. O CO2ntaZero insere-se no contexto de *Green Tech* (Tecnologia Verde), propondo a digitalização de processos de sustentabilidade que, muitas vezes, são realizados manualmente ou sequer existem.

O problema central abordado é a dificuldade de mensuração do impacto ambiental e a falta de visibilidade sobre consumos excessivos. A motivação para este trabalho reside na urgência climática global e na necessidade de conformidade com normas ESG. A solução permite o cadastro de **Matrizes e Filiais (Multi-CNPJ)**, centralizando a gestão de múltiplos unidades em um único painel.

O "cliente" (parceiro extensionista) deste projeto são pequenas indústrias e escritórios comerciais que buscam certificações ambientais ou redução de custos, mas não possuem orçamento para softwares complexos.

### 1.1. Objetivos geral e específicos
**Objetivo Geral:** desenvolver uma aplicação web para cálculo, monitoramento e gestão da pegada de carbono e resíduos corporativos, utilizando uma esteira DevOps moderna (Docker, Azure, Vercel).

**Objetivos Específicos:**
1.  Automatizar o cálculo de emissões de CO2 com base em fatores de emissão padronizados (MCTI/GHG Protocol).
2.  Implementar um motor de anomalias com **percentual configurável pelo usuário** (respeitando o mínimo de 15%), permitindo adaptação à realidade de cada filial ou residência.
3.  Prover um Dashboard inteligente que exibe consumos, emissões geradas e **sugestões de compensação** (ex: "Plante X árvores") baseadas em dados.
4.  Implementar validações básicas de CPF/CNPJ e vinculo de usuários, respeitando diretrizes da LGPD (Lei Geral de Proteção de Dados).

### 1.2. Justificativa
A criação do CO2ntaZero justifica-se pela lacuna de mercado para soluções ESG de baixo custo. Dados da ONU indicam que a eficiência no uso de recursos pode reduzir custos operacionais em até 20%. O trabalho contribui fornecendo uma ferramenta que não apenas calcula o impacto, mas age proativamente através de alertas de anomalia, permitindo intervenções rápidas contra desperdícios.

### 1.3. Público-alvo
O perfil de usuários da aplicação abrange:
*   **Pessoas Físicas e Pequenos Empreendedores (Como o Sr. Vander):** Chefes de família e donos de pequenos negócios que precisam monitorar contas mensais de múltiplos locais (casa, comércio) para evitar surpresas.
*   **Gestores de Sustentabilidade/Facilitities:** Profissionais com conhecimento técnico moderado, focados em relatórios e conformidade.
*   **Proprietários de PMEs:** Focados em redução de custos, com pouco tempo disponível e necessidade de visualizações objetivas.
*   **Operadores Administrativos:** Responsáveis pelo lançamento de dados (faturas, pesagem de resíduos), com variados níveis de fluência digital.

### 1.4. Especificação do Projeto
A solução foca na experiência do usuário para simplificar a coleta de dados ambientais.
*   **Modelo de Negócio:** SaaS B2B (Software as a Service Business-to-Business).
*   **Requisitos Funcionais Principais:** Cadastro de faturas (RF-01), Cálculo de emissões (RF-02), Detecção de Anomalias (RF-03), Gestão de Resíduos (RF-04).
*   **Restrições:** O sistema deve rodar em navegadores web padrão. O acesso mobile é conceitual (via navegador), sem aplicativo nativo.

### 1.5. Estratégia de Mercado: O Conceito de Oceano Azul
Diferente da abordagem tradicional de competir em mercados saturados ("Oceanos Vermelhos"), onde produtos se tornam commodities e a briga é por preço, o **CO2ntaZero** adota a **Estratégia do Oceano Azul** (Blue Ocean Strategy).

*   **Oceano Vermelho (Concorrência Atual):** Grandes consultorias e softwares complexos (ex: SAP, NetZero.green) focados em grandes corporações com times dedicados de sustentabilidade. Alto custo, alta complexidade.
*   **Oceano Azul (Nosso Posicionamento):** Foco em **Micro e Pequenas Empresas (MPEs)** e profissionais liberais. Este é um mercado vasto e inexplorado que carece de ferramentas simples e acessíveis. Ao simplificar a gestão de carbono para uma padaria ou escritório, tornamos a concorrência irrelevante, pois não há *players* atendendo essa demanda específica com baixo custo e UX amigável.

---

## 2. PARTICIPANTES DO PROCESSO DE NEGÓCIO

| PERFIL DE USO | RESPONSABILIDADE PRINCIPAL |
| :--- | :--- | :--- |
| **Proprietário / Gestor** | Responsável único pelo cadastro da empresa e gerenciamento de todos os dados (faturas, metas, resíduos). |
| **Operador Administrativo** | (Contexto de uso) Pessoa que realiza os lançamentos diários utilizando a conta do proprietário ou filial. |
| **Auditor** | (Contexto de uso) Pessoa que visualiza os relatórios gerados pelo sistema para validação externa. |

---

## 3. MODELAGEM DO PROCESSO DE NEGÓCIO

### 3.1. Modelagem da situação atual (Modelagem AS IS)
Atualmente, o processo de gestão ambiental nas empresas alvo é manual. Faturas de energia chegam fisicamente ou por e-mail, são lançadas em planilhas Excel desconexas. O cálculo de emissões é feito anualmente (quando feito), impedindo ações corretivas imediatas. Não há histórico centralizado de geração de resíduos.

*(Espaço reservado para colar o diagrama BPMN AS-IS aqui)*

### 3.2. Análise dos processos
Os gargalos identificados incluem:
*   **Erro humano:** Digitação incorreta de valores nas planilhas.
*   **Delay de informação:** O consumo excessivo só é percebido 30 dias depois, na chegada da próxima fatura.
*   **Perda de dados:** Planilhas salvas localmente sem backup ou versionamento.

### 3.3. Desenho dos processos (TO BE)
O processo proposto envolve o lançamento contínuo de dados na plataforma CO2ntaZero. O usuário seleciona a **Unidade (Filial/Matriz)**, insere os dados e o sistema valida instantaneamente. O motor de anomalias verifica o histórico conforme a regra configurada (ex: 15%, 20%) e dispara alertas proativos.

*(Espaço reservado para colar o diagrama BPMN TO-BE aqui)*

**Melhorias:** Automação do cálculo, gestão centralizada de múltiplos CNPJs e inteligência de dados para redução de impacto.

---

## 4. PROJETO DA SOLUÇÃO

### 4.1. Protótipos de telas
O sistema possui interfaces responsivas adaptadas para web e mobile.

#### 4.1.1. Processo: Gestão Multi-Unidade
*   **Atividade:** Seleção de Contexto.
*   **Descrição:** O usuário pode alternar entre visualizar os dados consolidados da Matriz ou filtrar por uma Filial específica via CPF/CNPJ. O sistema valida se o documento é numericamente válido e garante que não haja duplicidade de vínculo.

#### 4.1.2. Processo: Dashboard de Monitoramento
*   **Atividade:** Visualização de indicadores e Insights.
*   **Descrição:** Tela principal exibindo métricas de Carbono, Energia e Água. Inclui uma seção de **"Sugestões de Redução"** (Ex: "Seu consumo de energia subiu 10%. Considere trocar lâmpadas do setor X").
*   *(Espaço reservado para imagem do protótipo da Dashboard)*

#### 4.1.3. Processo: Configuração de Alertas
*   **Atividade:** Parametrização.
*   **Descrição:** Tela onde o gestor define qual a % de variação (threshold) deve disparar um alerta de anomalia. Padrão: 15%.


### 4.2. Projeto do banco de dados

**MODELO CONCEITUAL (DER):**
O modelo contempla entidades como `Company`, `User`, `Consumption`, `Waste`, `Alert` e `Goal`. A entidade `Company` agrupa `Users` e seus respectivos dados. `Consumption` está ligado a fatores de emissão para cálculo automático.

*(Espaço reservado para imagem do DER Conceitual)*

**MODELO RELACIONAL (Lógico) E PILHA DE TECNOLOGIA:**
A arquitetura do sistema adota o padrão **Serverless First**, priorizando plataformas que extraem a complexidade de infraestrutura. Abaixo detalhamos as ferramentas e decisões de engenharia:

1.  **Backend (Lógica de Negócio):**
    *   **Node.js (v18+):** Runtime Javascript escolhido pela vasta comunidade e IO não bloqueante, ideal para operações de muitos requests (High Throughput) como o processamento de lotes de faturas.
    *   **Express.js:** Framework minimalista para criação de rotas RESTful, permitindo uma arquitetura limpa e desacoplada.

2.  **Banco de Dados (Persistência):**
    *   **MongoDB Atlas (Cloud):** Banco de Dados NoSQL em nuvem (DBaaS). Escolhido pela flexibilidade do Schema JSON (BSON), essencial para um sistema que lida com faturas de diferentes formatos e logs de auditoria variados. O Atlas gerencia automaticamente backups e segurança básica.

3.  **Infraestrutura e DevOps (CI/CD):**
    *   **Docker:** Utilizado para containerização da API. O `Dockerfile` garante que o ambiente de desenvolvimento seja idêntico ao de produção, eliminando o problema de "funciona na minha máquina".
    *   **Microsoft Azure (App Service):** Plataforma de nuvem (PaaS) utilizada para hospedar a API Backend. Oferece escalabilidade, segurança corporativa e integração nativa com VS Code e GitHub.
    *   **Vercel (Frontend Hosting):** Plataforma especializada em frameworks frontend modernos. Utilizada para servir os arquivos estáticos (React/HTML), aproveitando sua CDN global (Edge Network) para garantir baixa latência no carregamento da página.

4.  **Frontend (Interface do Usuário):**
    *   **React.js (Library):** Biblioteca para construção de interfaces reativas baseadas em componentes. Permite o desenvolvimento de *Single Page Applications* (SPA) com experiência fluida.
    *   **Web Responsiva:** O frontend é construído para se adaptar a diferentes tamanhos de tela, permitindo acesso via navegadores móveis, embora o foco principal seja a experiência web desktop.

**Visão Estrutural:**
[Cliente Web (Vercel)] --(HTTPS/JSON)--> [API Backend (Azure App Service)] --(Mongoose)--> [MongoDB Atlas Cluster]

*   **Segurança:** Implementação de JWT (JSON Web Tokens) para sessão stateless e Bcrypt para hash unidirecional de senhas.
*   **Versionamento:** GitHub para controle de fonte e gestão de issues.

O sistema opera 100% em nuvem, eliminando a necessidade de servidores físicos locais.

---

## 5. USO SOFTWARE

**Guia Rápido de Uso:**

1.  **Tela de Login:** Insira suas credenciais corporativas. Caso seja o primeiro acesso, utilize a opção "Registrar Empresa".
2.  **Dashboard:** Ao entrar, você verá o resumo do mês atual. As anomalias aparecerão em vermelho no canto direito.
3.  **Lançar Consumo:** No menu "Consumo", clique em "Novo". Selecione "Energia Elétrica", digite "500" e unidade "kWh". O sistema calculará automaticamente o CO2.
4.  **Gestão de Resíduos:** No menu "Resíduos", registre o descarte informando o tipo (ex: Papel) e o destino (ex: Reciclagem).

---

## 6. CONCLUSÃO

O projeto CO2ntaZero atingiu seus objetivos ao fornecer uma plataforma funcional para a gestão ESG. A implementação da regra de anomalia de 15% mostrou-se eficaz nos testes para identificar padrões de consumo irregulares. A arquitetura baseada em microsserviços (Service Layer) facilitou a manutenção e a escalabilidade.
Como limitação, o sistema atual depende da inserção manual de dados; trabalhos futuros poderiam explorar a leitura automática de faturas via OCR, integrações com companhias de energia e uso de IA para facilitar o uso. O uso desta solução promove a conscientização ambiental e a redução de custos operacionais nas empresas parceiras.

---

## REFERÊNCIAS

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR ISO 14001**: Sistemas de gestão ambiental - Requisitos com orientações para uso. Rio de Janeiro, 2015.

GHG PROTOCOL. **A Corporate Accounting and Reporting Standard**. World Resources Institute, 2004.

MANUAL DE NORMALIZAÇÃO DA PUC MINAS. Disponível em: <https://www.pucminas.br/biblioteca/DocumentoBiblioteca/ABNT-GUIA-COMPLETO-Elaborar-formatar-trabalho-cientifico.pdf>. Acesso em: 01 mar. 2026.
