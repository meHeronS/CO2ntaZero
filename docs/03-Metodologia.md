
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia do projeto CO2ntaZero baseia-se em práticas ágeis adaptadas, focando em entregas incrementais. Os ambientes de trabalho e ferramentas foram selecionados para otimizar o fluxo de ponta a ponta (desenvolvimento, hospedagem e versionamento).

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

## Planejamento do projeto

### Roadmap de Fases (Macro)

O projeto segue a metodologia ágil, dividido em 5 Sprints, cobrindo desde a concepção até a validação com o parceiro extensionista.

1.  **Sprint 1 (Concepção e Arquitetura):** Definição do problema, documentação de contexto, arquitetura de dados e configuração inicial do ambiente (Docker/Banco de Dados).
2.  **Sprint 2 (MVP Backend e Processos):** Desenvolvimento da API (Autenticação e Motor de Cálculo), Modelagem de Processos (BPMN) e início da interface (Login).
3.  **Sprint 3 (Frontend e Integração):** Desenvolvimento das telas principais (Dashboard, Lançamentos), integração com API e gamificação (Árvores).
4.  **Sprint 4 (Inteligência e Testes):** Implementação da regra de alertas (15%), relatórios de resíduos e execução do Plano de Testes de Software.
5.  **Sprint 5 (Validação e Entrega):** Testes de Usabilidade com o parceiro (Valtinho's Bar), correção de bugs finais e preparação da apresentação final.

###  Divisão de papéis

Abaixo está a divisão de papéis assumidos pela equipe em cada sprint. Conforme alinhado, Heron Victor Vieira da Silva assumirá o papel fixo de Scrum Master ao longo do projeto, acumulando também atuações técnicas principais no início. Os demais papéis rotacionam entre os membros:

#### Sprint 1
- _Scrum master_: Heron Victor Vieira da Silva
- Arquitetura e Estruturação BD Inicial: Grupo (Todos)
- Documentação de Contexto: Grupo (Todos)
- Protótipos e Personas: Grupo (Todos)
- Requisitos e BPMN Iniciais: Grupo (Todos)

#### Sprint 2
- _Scrum master_: Heron Victor Vieira da Silva
- Desenvolvedor _back-end_ (Base Completa): Heron Victor Vieira da Silva
- Desenvolvedor _front-end_ (Prova de Conceito Inicial): Heron Victor Vieira da Silva
- Analista de Processos (BPMN) e Modelagem: A definir
- Validação de Processos e Testes Iniciais: A definir

#### Sprint 3
- _Scrum master_: Heron Victor Vieira da Silva
- Desenvolvedor _front-end_ (Integração Oficial): A definir
- Desenvolvedor _back-end_ (Apoio): A definir
- Gamificação e Validação: A definir
- Engenharia de Testes (Revisão): A definir

#### Sprint 4
- _Scrum master_: Heron Victor Vieira da Silva
- Refinamento de Inteligência (Alertas): Heron Victor Vieira da Silva
- Relatórios e Dashboard: A definir
- Testes de Software: A definir
- Documentação e Validação: A definir

#### Sprint 5
- _Scrum master_: Heron Victor Vieira da Silva
- Correções Finais Front e Back: A definir
- Testes de Usabilidade e Apresentação: A definir

###  Quadro de tarefas

Abaixo, o acompanhamento das tarefas e delegamentos exigidos no escopo de cada sprint:

#### Sprint 1

Atualizado em: 17/03/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Grupo (Todos) | Objetivos e Contexto      | 03/02/2026 | 10/02/2026 | ✔️ | 10/02/2026 |
| Grupo (Todos) | Histórias de Usuário (10+)| 01/01/2026 | 07/01/2026 | ✔️ | 07/01/2026 |
| Grupo (Todos) | Personas (6)              | 01/01/2026 | 12/02/2026 | ✔️ | 12/02/2026 |
| Grupo (Todos) | Configuração Repositório  | 01/02/2026 | 07/02/2026 | ✔️ | 05/02/2026 |
| Grupo (Todos) | Arquitetura de Dados      | 05/02/2026 | 15/02/2026 | ✔️ | 15/02/2026 |
| Grupo (Todos) | Slides Apresentação       | 10/03/2026 | 17/03/2026 | ✔️ | 17/03/2026 |

#### Sprint 2

Atualizado em: 17/03/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Heron Victor  | Backend: Autenticação, Cálculos e Regras| 20/03/2026 | 30/03/2026 | ✔️ | 30/03/2026 |
| Heron Victor  | BD e Estrutura Frontend Inicial         | 20/03/2026 | 30/03/2026 | ✔️ | 30/03/2026 |
| A definir     | Validação de Processos e Lógica         | 31/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Frontend Oficial: Tela de Login/Dashboard| 25/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Modelagem Processos de Negócio (BPMN)   | 25/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Extensão: Comprovação Visita (Fotos)    | 25/03/2026 | 10/04/2026 | ❌ |            |

#### Sprint 3

| Responsável   | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :----         | :----            | :----:      | :----:| :----: | :----:       |
| A definir     | Frontend: Telas Lançamento e API    | - | - | ❌ | |
| A definir     | Gamificação e Validação de Fluxos   | - | - | ❌ | |
| A definir     | Suporte Back-end / Banco de Dados   | - | - | ❌ | |

#### Sprint 4

| Responsável   | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :----         | :----            | :----:      | :----:| :----: | :----:       |
| Heron         | Backend: Regra de Alertas (15%) | - | - | ✔️ | 17/03/2026 |
| A definir     | Resíduos, Relatórios e Dashboard| - | - | ❌ | |
| A definir     | Execução Testes de Software     | - | - | ❌ | |

#### Sprint 5

| Responsável   | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :----         | :----            | :----:      | :----:| :----: | :----:       |
| A definir     | Testes de Usabilidade       | - | - | ❌ | |
| A definir     | Correção de Bugs Finais     | - | - | ❌ | |
| A definir     | Preparação Apresentação     | - | - | ❌ | |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

## Ferramentas

Os artefatos do projeto são desenvolvidos a partir das seguintes plataformas:

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-SI-TI/2026-1-p5-tias-co2ntazero |
| Documentos do projeto               | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-SI-TI/2026-1-p5-tias-co2ntazero |
| Projeto de interface                | Figma                              | https://www.figma.com/...              |
| Gerenciamento do projeto            | GitHub Projects                    | https://github.com/orgs/ICEI-PUC-Minas-PBE-SI-TI/projects |
| Hospedagem Frontend                 | Vercel                             | https://co2ntazero.vercel.app          |
| Hospedagem Backend                  | Azure App Service                  | https://portal.azure.com/              |
| Banco de Dados                      | MongoDB Atlas                      | https://www.mongodb.com/cloud/atlas    |
| Ambiente de Desenvolvimento         | Docker / VS Code                   | N/A                                    |
 
