# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

Com o tema do projeto definido, escolham dois processos no contexto de negócios do cliente. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. 

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, o processo de controle de contas e consumo nas empresas alvo (PMEs) é predominantemente manual. As faturas de energia e água chegam fisicamente ou por e-mail e são lançadas em planilhas Excel desconexas. O cálculo de emissões de carbono raramente é feito. Não há um histórico centralizado de geração de resíduos, e a detecção de vazamentos ou desperdícios depende da análise visual humana das contas, muitas vezes ocorrendo com 30 dias de atraso.

**Gargalos identificados:**
*   **Erro humano:** Digitação incorreta de valores nas planilhas.
*   **Delay de informação:** O consumo excessivo só é percebido 30 dias depois, na chegada da próxima fatura.
*   **Perda de dados:** Planilhas salvas localmente sem backup ou versionamento.

![Modelo BPMN do Processo 1 AS IS](images/processo_1_asis.png "Modelo BPMN do Processo 1 AS IS.")
![Modelo BPMN do Processo 2 AS IS](images/processo_2_asis.png "Modelo BPMN do Processo 2 AS IS.")

## Descrição geral da proposta (Modelagem TO BE)

O processo proposto envolve o uso da plataforma CO2ntaZero. O usuário seleciona a Unidade (sua Residência ou seu Comércio), insere os dados de consumo e o sistema valida instantaneamente. O motor de cálculo converte os dados em CO2e automaticamente. Simultaneamente, um motor de anomalias verifica o histórico e, se detectar variação superior a 15%, dispara um alerta proativo para o usuário. Isso elimina o erro humano de cálculo, centraliza a informação e permite ação rápida contra desperdícios.

Além disso, o sistema foi projetado considerando a possibilidade futura de integrar ferramentas de Inteligência Artificial (IA) e conexões diretas com companhias de energia, visando facilitar ainda mais a vida do usuário através da automação de dados.

**Limites e Alinhamento Estratégico:**
A solução atual possui o limite de depender da inserção manual de dados pelo usuário (visto que não possui leitura OCR ou integração bancária no MVP). Ainda assim, alinha-se perfeitamente ao objetivo do negócio de democratizar e simplificar o acesso a dados ambientais para pequenos empreendedores, criando conscientização imediata por meio de uma interface intuitiva.

![Modelo BPMN do Processo 1 TO BE](images/processo_1_tobe.png "Modelo BPMN do Processo 1 TO BE.")
![Modelo BPMN do Processo 2 TO BE](images/processo_2_tobe.png "Modelo BPMN do Processo 2 TO BE.")

## Modelagem dos processos

[PROCESSO 1 AS IS - Cadastro e Acesso Manual](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Cadastro, Login e Gestão Centralizada](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Detecção de Anomalias Manual](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Monitoramento de Metas e Alertas](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Pegada de Carbono Mensal | Monitorar impacto ambiental | Total de emissões de CO2 equivalente por mês | Tabela Consumptions | Σ (Consumo * Fator de Emissão) |
| Taxa de Anomalias | Identificar eficiência operacional | Percentual de registros que geraram alertas de desvio | Tabela Alerts | (Total de Alertas / Total de Registros) * 100 |
| Redução de Consumo | Avaliar eficácia das metas | Comparativo de consumo entre períodos | Tabela Consumptions | ((Consumo Mês Anterior - Consumo Atual) / Consumo Mês Anterior) * 100 |
| Taxa de Sucesso das Metas | Avaliar engajamento e efetividade | Percentual de metas de redução concluídas com sucesso | Tabela Goals | (Metas Atingidas / Total de Metas Criadas) * 100 |
| Frequência de Lançamentos | Medir o uso contínuo do sistema | Média de lançamentos realizados por usuário ao mês | Tabela Consumptions | Total de Lançamentos no Mês / Total de Usuários Ativos |

Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
