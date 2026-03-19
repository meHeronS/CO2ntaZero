### Processo 1 AS IS – Cadastro e Acesso Manual

**Descrição:** Atualmente, não existe um processo formal de "cadastro" ou "login" para a gestão de consumo. O Sr. Vander mantém seus registros em cadernos ou planilhas locais. A separação entre as contas da casa (PF) e do bar (PJ) é feita mentalmente ou em cadernos distintos, sem segurança ou backup. Não há cálculo de emissões de carbono associado, apenas o controle monetário, o que impede a percepção do impacto ambiental.

**Fluxo Atual:**
1.  **Identificação:** O usuário confia na própria memória para saber onde estão os dados.
2.  **Acesso:** Busca física por pastas ou arquivos no computador.
3.  **Alternância de Contexto:** Para ver as contas do bar, fecha o caderno da casa e abre o do bar.
4.  **Segurança:** Inexistente. Qualquer pessoa com acesso ao caderno/computador vê os dados.

![Modelo BPMN do Processo 1 AS IS](../images/processo_1_asis.png "Modelo BPMN do Processo 1 AS IS.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_

**Atividade 1: Busca de Registros**

| **Campo**          | **Tipo**         | **Restrições**                 | **Valor padrão**    |
| ---                | ---              | ---                            | ---                 |
| Localização Física | Seleção única    | Armário, Gaveta, Pasta         | Gaveta              |
| Tipo de Registro   | Seleção única    | Caderno, Planilha, Papel Solto | Papel Solto         |
| Mês de Referência  | Data             | Anterior à data atual          | Mês atual           |
| Contexto (Unidade) | Seleção única    | Casa (PF), Bar (PJ)            | Casa                |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Abrir Caderno        | Atividade 2: Anotação do Consumo | padrão          |
| Trocar de Pasta      | Início (Busca de novo contexto)|                   |


**Atividade 2: Anotação do Consumo**

| **Campo**          | **Tipo**         | **Restrições**                 | **Valor padrão**  |
| ---                | ---              | ---                            | ---               |
| Valor da Conta     | Número           | Valor financeiro em Reais (R$) |                   |
| Consumo Medido     | Número           | Medida em kWh, m³ ou litros    |                   |
| Data de Vencimento | Data             | Formato dd-mm-aaaa             |                   |
| Tipo de Recurso    | Seleção única    | Água, Energia, Combustível     | Energia           |
| Observações        | Área de texto    | Subjetivo ("Acho que veio alto")|                  |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Escrever no Caderno  | Fim (Arquivamento Físico)      | padrão            |
| Ignorar/Esquecer     | Fim (Sem registro)             | cancelar          |
| Reclamar do Valor    | Concessionária                 |                   |
