
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Descreva aqui a metodologia de trabalho do grupo para abordar o problema. Inclua definições sobre os ambientes de trabalho utilizados pela equipe para desenvolver o projeto. Isso abrange a relação dos ambientes utilizados, a estrutura para a gestão do código-fonte, além da definição do processo e das ferramentas por meio dos quais a equipe se organiza (gestão de equipes).


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

### Roadmap de Fases (Macro)

O desenvolvimento do CO2ntaZero foi dividido em fases estratégicas para garantir entregas tangíveis:
1.  **Sprint 1 (Iniciação / Fundação):** Mapeamento do escopo, estruturação do Backend e containerização da camada de Dados.
2.  **Sprint 2 (Fluxo de Consumos):** Cadastro Central, coleções básicas, input manual de unidades físicas (kWh, m³).
3.  **Sprint 3 (Calculadora de Impacto):** Transformação dos inputs em gráficos de Pegada Ambiental e "árvores para zerar".
4.  **Sprint 4 (Anomalia Proativa):** Serviço de backend para varredura retroativa e alertas de desperdício.
5.  **Sprint 5 (Validação):** Testes finais e ajustes de usabilidade.

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Saulo Luiz de Oliveira e Silva
- Protótipos: Heron Victor Vieira da Silva
- Testes: Joao Vinicius Rodrigues Santos
- Documentação: Gustavo Costa Pinho Tavares

#### Sprint 2
- _Scrum master_: Heron Victor Vieira da Silva
- Desenvolvedor _front-end_: Saulo Luiz de Oliveira e Silva
- Desenvolvedor _back-end_: Joao Vinicius Rodrigues Santos
- Testes: Gustavo Costa Pinho Tavares

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 21/04/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gustavo Costa | Objetivos    | 03/02/2026     | 10/02/2026 | 📝    |                 |
| Heron Victor  | Histórias de usuário  | 01/01/2026     | 07/01/2026 | ⌛     |                 |
| Joao Vinicius | Personas 1  |    01/01/2026        | 12/02/2026 | ❌    |       |
| Saulo Luiz    | Introdução | 01/02/2026     | 07/02/2026 | ✔️    | 05/02/2026      |

#### Sprint 2

Atualizado em: 21/04/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Caio Vieira   | CSS unificado    | 03/02/2026     | 10/03/2026 | 📝    |                 |
| Heron Victor  | Página de login  | 01/02/2026     | 07/03/2026 | ⌛     |                 |
| Joao Vinicius | Script de login  | 01/01/2026     | 12/03/2026 | ❌    |                 |
| Saulo Luiz    | Página inicial   | 01/02/2026     | 07/03/2026 | ✔️    | 05/02/2026      |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
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
| Projeto de interface                | Figma                              | https://www.figma.com/...              |
| Gerenciamento do projeto            | GitHub Projects                    | https://github.com/orgs/ICEI-PUC-Minas-PBE-SI-TI/projects |
| Hospedagem Frontend                 | Vercel                             | https://co2ntazero.vercel.app          |
| Hospedagem Backend                  | Azure App Service                  | https://portal.azure.com/              |
| Banco de Dados                      | MongoDB Atlas                      | https://www.mongodb.com/cloud/atlas    |
| Ambiente de Desenvolvimento         | Docker / VS Code                   | N/A                                    |
 
