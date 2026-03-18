
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A equipe adotará metodologias ágeis (Scrum) para o gerenciamento do projeto, com sprints periódicas. O versionamento de código será centralizado no GitHub.

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

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Planejamento do projeto

### Roadmap de Sprints

O projeto segue a metodologia ágil, dividido em 5 Sprints, cobrindo desde a concepção até a validação com o parceiro extensionista.

1.  **Sprint 1 (Concepção e Arquitetura):** Definição do problema, documentação de contexto, arquitetura de dados e configuração inicial do ambiente (Docker/Banco de Dados).
2.  **Sprint 2 (MVP Backend e Processos):** Desenvolvimento da API (Autenticação e Motor de Cálculo), Modelagem de Processos (BPMN) e início da interface (Login).
3.  **Sprint 3 (Frontend e Integração):** Desenvolvimento das telas principais (Dashboard, Lançamentos), integração com API e gamificação (Árvores).
4.  **Sprint 4 (Inteligência e Testes):** Implementação da regra de alertas (15%), relatórios de resíduos e execução do Plano de Testes de Software.
5.  **Sprint 5 (Validação e Entrega):** Testes de Usabilidade com o parceiro (Valtinho's Bar), correção de bugs finais e preparação da apresentação final.

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Grupo (Todos)
- Protótipos: Grupo (Todos)
- Testes: Grupo (Todos)
- Documentação: Grupo (Todos)
- Arquitetura: Grupo (Todos)

#### Sprint 2
- _Scrum master_: A definir
- Desenvolvedor _back-end_: A definir
- Desenvolvedor _front-end_: A definir
- Analista de Processos (BPMN): A definir
- Testes: A definir

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

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
| A definir     | Backend: Autenticação (JWT)     | 20/03/2026 | 25/03/2026 | ❌ |            |
| A definir     | Backend: Motor de Cálculo (GHG) | 20/03/2026 | 30/03/2026 | ❌ |            |
| A definir     | Backend: Validação Duplicidade  | 20/03/2026 | 30/03/2026 | ❌ |            |
| A definir     | Frontend: Tela de Login         | 25/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Frontend: Dashboard Principal   | 25/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Modelagem Processos (BPMN)      | 25/03/2026 | 10/04/2026 | ❌ |            |
| A definir     | Extensão: Comprovação Visita (Fotos) | 25/03/2026 | 10/04/2026 | ❌ |            |

#### Sprint 3

| Responsável   | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :----         | :----            | :----:      | :----:| :----: | :----:       |
| A definir     | Frontend: Telas Lançamento  | - | - | ❌ | |
| A definir     | Frontend: Integração API    | - | - | ❌ | |
| A definir     | Gamificação e Impacto       | - | - | ❌ | |

#### Sprint 4

| Responsável   | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :----         | :----            | :----:      | :----:| :----: | :----:       |
| A definir     | Backend: Regra de Alertas (15%) | - | - | ❌ | |
| A definir     | Backend: Resíduos/Relatórios | - | - | ❌ | |
| A definir     | Execução Testes de Software | - | - | ❌ | |

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

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. A relação dos ambientes com seus respectivos propósitos deverá ser apresentada em uma tabela que especifique e detalhe Ambiente, Plataforma e Link de Acesso. Sempre que possível, inclua também frameworks, bibliotecas e demais tecnologias utilizadas, indicando seu uso em contextos específicos, como aplicações móveis, web ou outros.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-SI-TI/2026-1-p5-tias-co2ntazero |
| Documentos do projeto               | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-SI-TI/2026-1-p5-tias-co2ntazero |
| Projeto de interface                | Figma                              | https://www.figma.com/                 |
| Gerenciamento do projeto            | GitHub Projects                    | https://github.com/orgs/ICEI-PUC-Minas-PBE-SI-TI/projects |
| Hospedagem Frontend                 | Vercel                             | https://co2ntazero.vercel.app          |
| Hospedagem Backend                  | Azure App Service                  | https://portal.azure.com/              |
| Banco de Dados                      | MongoDB Atlas                      | https://www.mongodb.com/cloud/atlas    |
| Ambiente de Desenvolvimento         | Docker / VS Code                   | N/A                                    |
 
