### Processo 1 TO BE – Cadastro, Login e Gestão Centralizada

**Descrição:** O novo processo introduz a digitalização e segurança. O usuário realiza um cadastro único na plataforma CO2ntaZero. Após o login seguro, ele tem acesso a um painel onde pode cadastrar múltiplas unidades (Casa, Bar) e alternar entre elas com um clique. O lançamento de consumo é feito neste ambiente digital.

**Fluxo Proposto:**
1.  **Cadastro/Login:** Usuário cria conta ou entra com credenciais seguras.
2.  **Gestão de Unidades:** Usuário cadastra "Minha Casa" e "Bar do Vander".
3.  **Seleção de Contexto:** Escolhe qual unidade quer gerenciar no momento.
4.  **Lançamento:** Insere os dados da fatura.
5.  **Processamento:** Sistema calcula CO2 e valida anomalias.

![Modelo BPMN do Processo 1 TO BE](../images/processo_1_tobe.png "Modelo BPMN do Processo 1 TO BE.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

* **Área de texto** - campo texto de múltiplas linhas
* **Caixa de texto** - campo texto de uma linha
* **Número** - campo numérico
* **Data** - campo do tipo data (dd-mm-aaaa)
* **Hora** - campo do tipo hora (hh:mm:ss)
* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* **Imagem** - campo contendo uma imagem
* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)
* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)
* **Arquivo** - campo de upload de documento
* **Link** - campo que armazena uma URL
* **Tabela** - campo formado por uma matriz de valores

**Atividade 1: Login e Seleção de Unidade**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| E-mail          | Caixa de Texto   | Formato de e-mail válido | |
| Senha           | Caixa de Texto   | Mínimo 8 caracteres, criptografada | |
| Perfil de Acesso| Seleção Única    | Casa (PF), Bar (PJ) | Última acessada |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Entrar               | Dashboard                      | default           |
| Cadastrar-se         | Tela de Registro               |                   |
| Trocar Unidade       | Recarrega Dashboard            |                   |

**Atividade 2: Lançamento de Consumo**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Tipo de Recurso | Seleção Única    | Energia, Água, Combustível | Energia |
| Valor Consumido | Número           | > 0 | |
| Data da Leitura | Data             | <= Data Atual | Data Atual |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar               | Processamento e Feedback       | default           |