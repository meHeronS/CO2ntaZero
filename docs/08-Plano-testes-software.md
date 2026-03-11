# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-001 – Autenticação (Login)**  |
|:---: |:---: |
| Requisito associado | RF-005 - Controle de Acesso e Autenticação. |
| Objetivo do teste | Verificar se o usuário consegue acessar o sistema com credenciais válidas e é bloqueado com inválidas. |
| Passos | 1. Acessar a página de login. <br> 2. Inserir e-mail e senha de uma empresa de teste. <br> 3. Clicar em "Entrar". |
| Critério de êxito | - Redirecionamento para o Dashboard. <br> - Token JWT armazenado no LocalStorage. |
| Responsável pela elaboração do caso de teste | Heron Victor |

<br>

| **Caso de teste**  | **CT-002 – Cadastro de Consumo (Transação)**  |
|:---: |:---: |
| Requisito associado | RF-001 - Cadastro de faturas de consumo. <br> RF-002 - Cálculo automático de CO2. |
| Objetivo do teste | Validar se o sistema registra o consumo e atualiza os indicadores. |
| Passos | 1. Acessar menu "Transações". <br> 2. Criar nova despesa/consumo. <br> 3. Preencher valor e descrição. <br> 4. Salvar. |
| Critério de êxito | - A transação aparece na lista. <br> - O saldo/consumo total no Dashboard é atualizado. |
| Responsável pela elaboração do caso de teste | Saulo Luiz |

| **Caso de teste**  | **CT-003 – Isolamento de Dados (Single Owner)**  |
|:---: |:---: |
| Requisito associado | RF-006 - Isolamento lógico de dados. |
| Objetivo do teste | Garantir que a Empresa A não veja dados da Empresa B. |
| Passos | 1. Logar como Empresa A e criar um registro único. <br> 2. Deslogar. <br> 3. Logar como Empresa B. <br> 4. Buscar o registro criado no passo 1. |
| Critério de êxito | - O registro da Empresa A NÃO deve aparecer para a Empresa B. |
| Responsável pela elaboração do caso de teste | Joao Vinicius |


## Ferramentas de testes (opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links úteis**:
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e técnicas de testes ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de teste para JavaScript](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
