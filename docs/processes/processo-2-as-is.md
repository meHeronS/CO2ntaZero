### Processo 2 AS IS – Detecção de Anomalias Manual

**Descrição:** Atualmente, a detecção de anomalias é reativa. O usuário só percebe problemas (vazamentos, desperdícios) quando a fatura chega com valor exorbitante. Além disso, não há visibilidade sobre o impacto ambiental (ESG) ou progresso em metas de sustentabilidade, pois os dados estão dispersos e focados apenas no valor financeiro.

**Fluxo Atual:**
1.  **Recebimento:** Fatura chega (30 dias após consumo).
2.  **Análise Financeira:** Susto com o valor (Ex: "Por que veio R$ 500?").
3.  **Investigação:** Verificação manual tardia de equipamentos.
4.  **Sem Feedback:** Não há conversão para impacto ambiental (árvores/CO2).

![Modelo BPMN do Processo 2 AS IS](../images/processo_2_asis.png "Modelo BPMN do Processo 2 AS IS.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 2. Devem estar relacionadas com o modelo de processo apresentado anteriormente._

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

**Atividade 1: Análise de Fatura Alta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Valor da Fatura | Número           | Valor monetário (R$) | |
| Comparativo Mental| Caixa de Texto | Subjetivo ("Acho que veio alto") | |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Reclamar            | Concessionária                 |                   |
| Pagar               | Fim                            | default           |
