# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura do CO2ntaZero é baseada na stack **MERN** (MongoDB, Express, React, Node.js), utilizando uma abordagem de microsserviços containerizados via Docker. A solução adota o modelo **Single Owner** (Proprietário Único), onde um usuário (CPF) gerencia múltiplas unidades (Companies), garantindo isolamento lógico de dados.

A comunicação entre o Frontend (React Web) e o Backend (Node.js API) ocorre via RESTful API, com autenticação segura via JWT (JSON Web Tokens). A persistência de dados é realizada no MongoDB Atlas (Cloud).

![Arquitetura da Solução](images/arquitetura.png)

## Fluxo de Dados (Motor de Sustentabilidade)

1.  **Entrada:** O usuário lança a fatura (ex: 500 kWh).
2.  **Processamento:** A API invoca o `ConsumptionService`.
3.  **Cálculo:** O sistema busca o fator de emissão (ex: 0.042 kgCO2e/kWh - Fonte MCTI) e calcula a pegada.
4.  **Anomalia:** O sistema compara com a média histórica (Regra de 15%) e gera alerta se necessário.
5.  **Persistência:** Salva no MongoDB o dado original E o dado calculado (CO2e).

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

Elabore o diagrama de classes utilizando uma ferramenta de modelagem apropriada.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

### Modelo conceitual 

O Diagrama Entidade-Relacionamento (DER), em notação Peter Chen, representa de forma conceitual como as entidades (objetos ou conceitos do minimundo) se relacionam entre si. O DER deve incluir entidades, atributos, relacionamentos, cardinalidade, conforme as regras do minimundo. Deve ser elaborado um único DER que suporte todos os processos mapeados, de modo a garantir uma base de dados integrada. O modelo também deve representar, quando aplicável, o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos de processo de negócio.

Elabore o modelo utilizando uma ferramenta de modelagem apropriada.

![Exemplo de um modelo conceitual](images/modelo_conceitual.PNG "Exemplo de modelo conceitual.")
---

> **Links úteis**:
> - [Notação de Peter Chen para modelagem conceitual de banco de dados](https://www.youtube.com/watch?v=_y31cFi_ByY)
> - [Como fazer um diagrama entidade-relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

### Modelo relacional

O modelo relacional corresponde à representação dos dados, organizando as informações em tabelas (relações) compostas por linhas (tuplas) e colunas (atributos), juntamente com as restrições de integridade, chaves primárias e chaves estrangeiras.

Elabore o modelo utilizando uma ferramenta de modelagem apropriada.

![Exemplo de um modelo relacional](images/modelo_relacional.PNG "Exemplo de modelo relacional.")
---

> **Links úteis**:
> - [Criando um modelo relacional - documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/12.0.0?topic=designer-creating-relational-model)
> - [Como fazer um modelo relacional](https://www.youtube.com/watch?v=DWWIREUkxOI)

### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Como o sistema CO2ntaZero utiliza uma abordagem NoSQL com **MongoDB**, o modelo físico não é representado por scripts SQL (DDL), mas sim pelos schemas de validação estruturados via Mongoose no backend.

Exemplo do Schema Principal de Consumos (`Consumptions`):

```javascript
const consumptionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceType: { type: String, enum: ['energy', 'water', 'fuel'], required: true },
  amount: { type: Number, required: true },
  carbonFootprint: { type: Number, required: true }, // Calculado automaticamente
  referenceMonth: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});
```


## Tecnologias

Descreva as tecnologias utilizadas para implementar a solução proposta. Liste todas as tecnologias envolvidas, incluindo linguagens de programação, frameworks, bibliotecas, serviços web, IDEs, ferramentas de apoio e quaisquer outros recursos relevantes para o desenvolvimento.  

Apresente também um diagrama ou figura que ilustre a visão operacional, mostrando como as tecnologias interagem entre si durante o uso do sistema, desde a ação do usuário até a obtenção da resposta.

A arquitetura do sistema adota o padrão **Serverless First**, priorizando plataformas que extraem a complexidade de infraestrutura.

1.  **Backend (Lógica de Negócio):** **Node.js (v18+)** e **Express.js**. Runtime Javascript escolhido pela vasta comunidade e IO não bloqueante, ideal para operações de muitos requests (High Throughput).
2.  **Banco de Dados (Persistência):** **MongoDB Atlas (Cloud)**. Escolhido pela flexibilidade do Schema JSON (BSON), essencial para um sistema que lida com faturas de diferentes formatos.
3.  **Infraestrutura e DevOps (CI/CD):** **Docker** e **Azure App Service (PaaS)**. O `Dockerfile` garante que o ambiente de desenvolvimento seja idêntico ao de produção.
4.  **Frontend (Interface do Usuário):** **React.js** e **Vercel**. Plataforma especializada em frameworks frontend modernos, aproveitando CDN global.

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | **React.js (Web)**: Facilidade em criar Single Page Apps (SPA) e dashboards responsivos. |
| Back-end       | **Node.js + Express**: Abordagem ágil baseada em Javascript, ideal para I/O assíncrono. |
| SGBD           | **MongoDB Atlas (NoSQL)**: Flexibilidade do BSON para absorver novas unidades de rastreamento sem migrações custosas. |
| Infraestrutura | **Docker**: Padronização ambiental obrigatória para garantir paridade entre dev e produção. |
| Deploy         | Vercel (Front) / Azure (Back) |

### Detalhamento dos Componentes

*   **Backend (Motor de Cálculos):** Responsável pelo lançamento flexível de faturas, rastreamento de resíduos, calculadora automática da pegada de carbono, detecção de anomalias e segurança com criptografia.
*   **Frontend (Interface):** Gerencia formulários de lançamento fluidos, Dashboard de Sustentabilidade (com total de árvores para compensação) e sistema de Alertas.
*   **Banco de Dados:** Estruturado com isolamento lógico para separar dados de Empresas (PJ) e Pessoas Físicas (CPF). Inclui verificação de unicidade de CNPJ para evitar duplicidade de cadastro.


## Hospedagem

A hospedagem da plataforma foi realizada de forma distribuída para otimizar a performance e a escalabilidade:

1.  **Frontend (Vercel):** O código React.js é hospedado na Vercel, que oferece uma rede de distribuição de conteúdo (CDN) global, garantindo carregamento rápido da interface para o usuário final.
2.  **Backend (Azure):** A API Node.js é containerizada via Docker e hospedada no Azure App Service. Isso garante que o ambiente de produção seja idêntico ao de desenvolvimento e facilita a escalabilidade horizontal.
3.  **Banco de Dados (MongoDB Atlas):** O banco de dados é gerenciado pelo MongoDB Atlas, um serviço de banco de dados como serviço (DBaaS) que provê segurança, backups automáticos e alta disponibilidade.

Explique como a hospedagem e o lançamento da plataforma foram realizados.

O lançamento da plataforma CO2ntaZero foi orquestrado utilizando uma infraestrutura de nuvem moderna e distribuída, separando as camadas de apresentação e lógica de negócios:

1.  **Frontend (Vercel):** A interface web (React e HTML/JS) foi hospedada na Vercel, aproveitando a rede de entrega de conteúdo (CDN) global e o pipeline de CI/CD nativo integrado ao repositório GitHub para implantações automatizadas e velozes.
2.  **Backend (Microsoft Azure):** A API (Node.js/Express) foi provisionada no **Azure App Service**. Isso proporciona um ambiente seguro, escalável e de nível corporativo para o processamento contínuo das regras de negócios e cálculos de sustentabilidade.
3.  **Banco de Dados (MongoDB Atlas):** A camada de persistência foi alocada no MongoDB Atlas (Cluster na nuvem), garantindo alta disponibilidade, backups automáticos e segurança no armazenamento de credenciais, sem a necessidade de gerenciar servidores de banco físicos.

> **Links úteis**:
> - Website com GitHub Pages
> - Programação colaborativa com Repl.it
> - Getting started with Heroku
> - Publicando seu site no Heroku

## Qualidade de software

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas subcaracterísticas, identifique as subcaracterísticas que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software, considerando alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão à equipe avaliar os objetos de interesse.

A norma internacional ISO/IEC 25010 norteia a qualidade do sistema CO2ntaZero. A equipe selecionou as seguintes subcaracterísticas como pilares do desenvolvimento:

1. **Adequação Funcional (Completude Funcional):**
   - **Justificativa:** É essencial que a calculadora converta corretamente os gastos em CO2 equivalente para que a proposta de valor seja entregue.
   - **Métrica:** Percentual de cálculos de emissão validados contra os fatores oficiais do GHG Protocol/MCTI nos testes automatizados (Alvo: 100%).

2. **Eficiência de Desempenho (Comportamento em Relação ao Tempo):**
   - **Justificativa:** A plataforma será usada por pequenos comerciantes em suas rotinas; demoras carregando gráficos desmotivam o uso.
   - **Métrica:** Tempo médio de resposta da API para carregar o Dashboard de Sustentabilidade (Alvo: < 800ms).

3. **Usabilidade (Apreensibilidade e Estética):**
   - **Justificativa:** O público-alvo possui pouca familiaridade com sistemas complexos. O design deve ser intuitivo.
   - **Métrica:** Taxa de sucesso sem assistência nos cenários de testes de usabilidade com os donos de negócios (Alvo: 100%).

4. **Segurança (Confidencialidade):**
   - **Justificativa:** O sistema lida com dados de CNPJ e histórico financeiro/consumo, o que exige alinhamento rigoroso com a LGPD.
   - **Métrica:** Validação do isolamento de dados no ambiente de teste - *Single Owner* (Alvo: 0 vazamentos lógicos entre contas).

> **Links úteis**:
> - ISO/IEC 25010:2011 - Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — System and Software Quality Models
> - Análise sobre a ISO 9126 – NBR 13596
> - Qualidade de software - Engenharia de Software
