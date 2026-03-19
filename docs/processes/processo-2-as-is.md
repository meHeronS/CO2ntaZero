### Processo 2 AS IS – Detecção de Anomalias Manual

**Descrição:** Atualmente, a detecção de anomalias é reativa. O usuário só percebe problemas (vazamentos, desperdícios) quando a fatura chega com valor exorbitante. Além disso, não há visibilidade sobre o impacto ambiental (ESG) ou progresso em metas de sustentabilidade, pois os dados estão dispersos e focados apenas no valor financeiro.

**Fluxo Atual:**
1.  **Recebimento:** Fatura chega (30 dias após consumo).
2.  **Análise Financeira:** Susto com o valor (Ex: "Por que veio R$ 500?").
3.  **Investigação:** Verificação manual tardia de equipamentos.
4.  **Sem Feedback:** Não há conversão para impacto ambiental (árvores/CO2).

![Modelo BPMN do Processo 2 AS IS](../images/processo_2_asis.png "Modelo BPMN do Processo 2 AS IS.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 2. 
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

**Atividade 1: Recebimento da Fatura**

| **Campo**          | **Tipo**         | **Restrições**                 | **Valor padrão** |
| ---                | ---              | ---                            | ---              |
| Valor da Fatura    | Número           | Valor monetário em Reais (R$)  |                  |
| Consumo Mensal     | Número           | Medida física (kWh, m³, etc)   |                  |
| Data de Vencimento | Data             | Formato dd-mm-aaaa             |                  |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Ler Fatura           | Atividade 2: Análise Financeira| padrão            |
| Guardar sem ver      | Fim (Sem análise)              | cancelar          |

**Atividade 2: Análise Financeira (Susto/Reclamação)**

| **Campo**          | **Tipo**         | **Restrições**                     | **Valor padrão** |
| ---                | ---              | ---                                | ---              |
| Comparativo Mental | Caixa de texto   | Subjetivo ("Acho que veio alto")   |                  |
| Ação Desejada      | Seleção única    | Pagar, Reclamar, Procurar vazamento| Pagar            |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Pagar Fatura         | Fim (Processo concluído)       | padrão            |
| Ligar na Ouvidoria   | Concessionária                 |                   |
