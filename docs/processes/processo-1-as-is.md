### Processo 1 AS IS – Cadastro e Acesso Manual

**Descrição:** Atualmente, não existe um processo formal de "cadastro" ou "login" para a gestão de consumo. O Sr. Vander mantém seus registros em cadernos ou planilhas locais. A separação entre as contas da casa (PF) e do bar (PJ) é feita mentalmente ou em cadernos distintos, sem segurança ou backup. Não há cálculo de emissões de carbono associado, apenas o controle monetário, o que impede a percepção do impacto ambiental.

**Fluxo Atual:**
1.  **Identificação:** O usuário confia na própria memória para saber onde estão os dados.
2.  **Acesso:** Busca física por pastas ou arquivos no computador.
3.  **Alternância de Contexto:** Para ver as contas do bar, fecha o caderno da casa e abre o do bar.
4.  **Segurança:** Inexistente. Qualquer pessoa com acesso ao caderno/computador vê os dados.

![Modelo BPMN do Processo 1 AS IS](../images/processo_1_asis.png "Modelo BPMN do Processo 1 AS IS.")

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

**Atividade 1: Busca de Registros**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Localização Física | Caixa de Texto | Armário/Gaveta | "Gaveta da Cozinha" |
| Tipo de Registro | Seleção única  | Caderno, Planilha, Papel Solto | Papel Solto |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Abrir Caderno        | Visualização de Dados          | default           |
| Trocar de Pasta      | Contexto do Bar                |                   |
