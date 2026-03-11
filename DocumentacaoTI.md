# Relatório Técnico - Projeto de Extensão
**Título do Trabalho:** CO2ntaZero - Calculadora de Emissões e Monitoramento de Consumo Sustentável

**Membros do Grupo:**
1. Caio Vieira de Freitas
2. Gustavo Costa Pinho Tavares
3. Heron Victor Vieira da Silva
4. João Vinicius Rodrigues Santos
5. Saulo Luiz de Oliveira e Silva

**Professor(a):** Amália Soares Vieira de Vasconcelos

**Instituição:** Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS)  
**Local:** Belo Horizonte – MG – Brasil  
**E-mails:** [email1], [email2], [email3], [email4], [email5]

---

**Resumo.**  
Este projeto apresenta o CO2ntaZero, uma solução de software projetada como uma calculadora de conscientização ambiental e monitoramento de recursos. Diferente de sistemas complexos de gestão corporativa, o foco aqui é fornecer a pessoas físicas e pequenos empresários uma ferramenta simples para calcular sua pegada de carbono e monitorar variações de consumo (água e luz). O sistema identifica desvios de consumo (anomalias) e sugere formas de compensação, como o plantio de árvores, unindo economia financeira à responsabilidade ambiental.

---

## 1. INTRODUÇÃO

O CO2ntaZero não nasceu em um laboratório corporativo, mas de uma necessidade real do dia a dia. A ideia surgiu quando o Sr. Vander, proprietário de um bar, questionou se existia uma forma simples de monitorar os gastos de água e luz do estabelecimento. Ele percebia variações nos valores das faturas e suspeitava de problemas na rede (vazamentos ou fugas de energia), mas tinha dificuldade de validar isso apenas com os papéis mensais.

A partir dessa demanda, o projeto evoluiu para unir o útil (economia financeira) ao agradável (sustentabilidade). Percebeu-se que monitorar o desperdício de recursos é o primeiro passo para reduzir a pegada de carbono. Assim, o CO2ntaZero foi concebido como uma "Calculadora de Conscientização": uma ferramenta que monitora o consumo, alerta sobre anomalias e traduz esses gastos em impacto ambiental (CO2), sugerindo formas de compensação.

O problema central abordado é a falta de ferramentas acessíveis para que pessoas comuns e pequenos empresários monitorem suas emissões e consumos de forma proativa. A motivação é democratizar a "pegada verde", mostrando que a sustentabilidade pode gerar economia direta.

O parceiro extensionista para validação da usabilidade e das informações do sistema é o **Valtinho's Bar**, que servirá como piloto para provar que a redução de emissões e o controle de gastos podem ser aplicados em estabelecimentos de bairro com a mesma eficácia de grandes empresas.

### 1.1. Objetivos geral e específicos
**Objetivo Geral:** Desenvolver uma aplicação web (Calculadora de Emissões) para monitoramento de consumo e conscientização ambiental, utilizando uma esteira DevOps moderna.

**Objetivos Específicos:**
1.  Automatizar o cálculo de emissões de CO2 com base em fatores de emissão padronizados (MCTI/GHG Protocol).
2.  Implementar um motor de anomalias com **percentual configurável pelo usuário** (padrão de 15%), permitindo que a sensibilidade do alerta seja adaptada conforme a necessidade de cada empresa ou residência cadastrada.
3.  Prover um Dashboard inteligente que exibe consumos, emissões geradas e **sugestões de compensação** (ex: "Plante X árvores") baseadas em dados.
4.  Implementar validações básicas de CPF/CNPJ e vínculo de unidades ao proprietário (Single Owner), respeitando diretrizes da LGPD (Lei Geral de Proteção de Dados).

### 1.2. Justificativa
A "pegada verde" é uma realidade necessária, mas muitas vezes ignorada por PMEs e residências devido ao custo e complexidade de implementação. Segundo o Relatório de Objetivos de Desenvolvimento Sustentável (ODS) da ONU (2023), a eficiência energética e o consumo responsável (ODS 12) são vitais para o combate às mudanças climáticas.

O CO2ntaZero justifica-se como uma solução de entrada. Ao focar na **conscientização** e na **economia financeira** (redução de conta de luz/água), a ferramenta quebra a barreira de entrada da sustentabilidade. A justificativa econômica (alertar sobre um vazamento ou gasto excessivo) serve como alavanca para a conscientização ambiental, tornando o sistema útil tanto para o bolso quanto para o planeta.

### 1.3. Público-alvo
O perfil de usuários da aplicação abrange:
*   **Pessoas Físicas e Pequenos Empreendedores (Como o Sr. Vander):** Chefes de família e donos de pequenos negócios que precisam monitorar contas mensais de múltiplos locais (casa, comércio) para evitar surpresas.
*   **Proprietários de PMEs:** Focados em redução de custos, com pouco tempo disponível e necessidade de visualizações objetivas.
*   **Grandes Empresas (Opcional):** Embora possuam processos complexos e obrigações legais específicas, nada impede que utilizem a ferramenta como uma calculadora rápida de conscientização para filiais menores ou campanhas internas.

### 1.4. Especificação do Projeto
A solução é projetada como um **SaaS (Software as a Service)**, acessível via navegador.
*   **Plataforma:** Aplicação Web Responsiva. Conceitualmente, o projeto adota princípios de **PWA (Progressive Web App)**, garantindo que a interface funcione fluidamente em dispositivos móveis (celulares/tablets) através do navegador, embora o desenvolvimento de um aplicativo nativo não esteja no escopo atual devido ao tempo.
*   **Foco em Usabilidade:** A interface deve ser extremamente intuitiva e autoexplicativa. O design é pensado para usuários com pouca afinidade tecnológica, como a persona do Sr. Vander, garantindo um fluxo de uso fluido e sem atritos para estimular o lançamento recorrente de dados.

### 1.5. Estratégia de Mercado: O Conceito de Oceano Azul
Diferente da abordagem tradicional de competir em mercados saturados ("Oceanos Vermelhos"), onde produtos se tornam commodities e a briga é por preço, o **CO2ntaZero** adota a **Estratégia do Oceano Azul** (Blue Ocean Strategy).

*   **Oceano Vermelho (Concorrência Atual):** Grandes consultorias e softwares complexos (ex: SAP, NetZero.green) focados em grandes corporações com times dedicados de sustentabilidade. Alto custo, alta complexidade.
*   **Oceano Azul (Nosso Posicionamento):** Foco em **Micro e Pequenas Empresas (MPEs)** e profissionais liberais. Este é um mercado vasto e inexplorado que carece de ferramentas simples e acessíveis. Ao simplificar a gestão de carbono para uma padaria ou escritório, tornamos a concorrência irrelevante, pois não há *players* atendendo essa demanda específica com baixo custo e UX amigável.

---

## 2. PARTICIPANTES DO PROCESSO DE NEGÓCIO
No modelo de "Proprietário Único" (Single Owner) do MVP, há apenas um perfil de uso principal:
| PERFIL DE USO | RESPONSABILIDADE PRINCIPAL |
| :--- | :--- |
| **Proprietário / Dono Único** | Responsável por todas as ações no sistema: cadastrar a si mesmo (CPF) e suas unidades (CNPJ/Residência), lançar consumos, monitorar alertas e visualizar relatórios. Ele desempenha conceitualmente os papéis de operador e auditor. |

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
O modelo contempla entidades como `Company`, `User`, `Consumption`, `Waste`, `Alert` e `Goal`. Adota-se a abordagem **Single Owner**, onde a entidade `User` (CPF) centraliza a propriedade e gestão de múltiplas `Companies` (Unidades/CNPJs), eliminando a complexidade de permissões (RBAC) para o MVP. `Consumption` está ligado a fatores de emissão para cálculo automático.

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

1.  **Tela de Login:** Insira suas credenciais de acesso. Caso seja o primeiro acesso, utilize a opção de registro.
2.  **Dashboard:** Ao entrar, você verá o resumo do mês atual. As anomalias aparecerão em vermelho no canto direito.
3.  **Lançar Consumo:** No menu "Consumo", clique em "Novo". Selecione "Energia Elétrica", digite "500" e unidade "kWh". O sistema calculará automaticamente o CO2.
4.  **Gestão de Resíduos:** No menu "Resíduos", registre o descarte informando o tipo (ex: Papel) e o destino (ex: Reciclagem).

---

## 6. CONCLUSÃO

O projeto CO2ntaZero atingiu seus objetivos ao fornecer uma plataforma funcional para o monitoramento de sustentabilidade. A implementação da regra de anomalia de 15% mostrou-se eficaz nos testes para identificar padrões de consumo irregulares. A arquitetura baseada em camadas de serviço (Service Layer) facilitou a manutenção e a escalabilidade.
Como limitação, o sistema atual depende da inserção manual de dados; trabalhos futuros poderiam explorar a leitura automática de faturas via OCR, integrações com companhias de energia e uso de IA para facilitar o uso. O uso desta solução promove a conscientização ambiental e a redução de custos operacionais nas empresas parceiras.

---

## REFERÊNCIAS

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR ISO 14001**: Sistemas de gestão ambiental - Requisitos com orientações para uso. Rio de Janeiro, 2015.

GHG PROTOCOL. **A Corporate Accounting and Reporting Standard**. World Resources Institute, 2004.

MANUAL DE NORMALIZAÇÃO DA PUC MINAS. Disponível em: <https://www.pucminas.br/biblioteca/DocumentoBiblioteca/ABNT-GUIA-COMPLETO-Elaborar-formatar-trabalho-cientifico.pdf>. Acesso em: 01 mar. 2026.
