# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

Com o tema do projeto definido, escolham dois processos no contexto de negócios do cliente. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. 

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, o processo de controle de contas e consumo nas empresas alvo (PMEs) é predominantemente manual. As faturas de energia e água chegam fisicamente ou por e-mail e são lançadas em planilhas Excel desconexas ou cadernos. 
O cálculo de emissões de carbono **não é realizado** devido à complexidade técnica (fatores de conversão desconhecidos pelo leigo). Não há um histórico centralizado, e a detecção de vazamentos ou desperdícios depende da análise visual humana das contas, muitas vezes ocorrendo com 30 dias de atraso.

**Gargalos identificados:**
*   **Invisibilidade Ambiental:** O usuário paga a conta mas não sabe seu impacto em carbono.
*   **Delay de informação:** O consumo excessivo só é percebido na chegada da próxima fatura.
*   **Perda de dados:** Anotações em papel sem backup ou histórico para comparação.

## Descrição geral da proposta (Modelagem TO BE)

O processo proposto envolve o uso da plataforma **CO2ntaZero**. O usuário seleciona a Unidade (Filial/Matriz), insere os dados de consumo (kWh, m³) e o sistema valida instantaneamente. 

**Diferenciais da Calculadora:**
1.  **Motor de Cálculo:** Converte os inputs em CO2e automaticamente usando fatores do MCTI/GHG Protocol.
2.  **Motor de Anomalias:** Verifica o histórico e, se detectar variação superior a 15%, dispara um alerta proativo.
3.  **Visualização:** O dado financeiro vira dado ambiental ("Árvores para compensar").

Isso elimina o erro humano de cálculo, centraliza a informação e permite ação rápida contra desperdícios.

## Modelagem dos processos

[PROCESSO 1 AS IS - Gestão Manual de Faturas](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Calculadora de Pegada de Carbono](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Detecção de Vazamentos (Reativo)](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Monitoramento Inteligente de Metas](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Pegada de Carbono Mensal | Monitorar impacto ambiental | Total de emissões de CO2 equivalente por mês | Tabela Consumptions | Σ (Consumo * Fator de Emissão) |
| Taxa de Anomalias | Identificar eficiência operacional | Percentual de registros que geraram alertas de desvio (>15%) | Tabela Alerts | (Total de Alertas / Total de Registros) * 100 |
| Árvores para Compensação | Engajamento (Gamificação) | Quantidade de árvores necessárias para neutralizar o consumo | Motor de Cálculo | Total CO2e / Fator Absorção Árvore |
| Redução de Consumo | Avaliar eficácia das metas | Comparativo de consumo entre períodos | Tabela Consumptions | ((Consumo Mês Anterior - Consumo Atual) / Consumo Mês Anterior) * 100 |
