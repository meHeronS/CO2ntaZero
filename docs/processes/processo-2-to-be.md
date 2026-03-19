### Processo 2 TO BE – Monitoramento de Metas e Alertas

**Descrição:** O sistema monitora continuamente os lançamentos. O "Motor de Anomalias" verifica se o consumo varia mais de 15% da média histórica, gerando alertas imediatos. O Dashboard ESG consolida os dados, exibindo a "Calculadora Florestal" (árvores necessárias para compensação) e o progresso das metas de redução cadastradas.

**Fluxo Proposto:**
1.  **Gatilho:** Novo lançamento de consumo registrado.
2.  **Análise de Anomalia:** Backend compara com média trimestral. Se > 15% -> Alerta Crítico.
3.  **Análise de Metas:** Backend verifica se o consumo ajuda ou atrapalha as metas cadastradas (ex: "Reduzir 10%").
4.  **Dashboard ESG:** Agregação de emissões e cálculo de árvores para compensação.
5.  **Feedback:** Usuário recebe notificação visual e sugestão de ação.

![Modelo BPMN do Processo 2 TO BE](../images/processo_2_tobe.png "Modelo BPMN do Processo 2 TO BE.")

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

**Atividade 1: Visualização de Dashboard e Alertas**

| **Campo**          | **Tipo**         | **Restrições**                     | **Valor padrão**            |
| ---                | ---              | ---                                | ---                         |
| Notificação        | Caixa de texto   | Leitura apenas (Push Notification) | "Alerta: Consumo Anômalo"   |
| Variação Detectada | Número           | Percentual (>15%)                  |                             |
| Ação Sugerida      | Link             | Redireciona para dicas             | "Verificar Vazamentos"      |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Ver Detalhes         | Tela de Transações             | padrão            |
| Criar Nova Meta      | Atividade 2: Formulário de Metas|                   |
| Marcar como Lido     | Arquivo de Alertas             |                   |

**Atividade 2: Formulário de Metas**

| **Campo**          | **Tipo**         | **Restrições**                 | **Valor padrão** |
| ---                | ---              | ---                            | ---              |
| Nome da Meta       | Caixa de texto   | Máximo de 50 caracteres        |                  |
| Tipo de Recurso    | Seleção única    | Água, Energia, Combustível     | Energia          |
| Meta de Redução (%)| Número           | Entre 1 e 100                  | 10               |
| Data Limite        | Data             | Maior que a data atual         |                  |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Salvar Meta          | Dashboard ESG                  | padrão            |
| Cancelar             | Dashboard ESG                  | cancelar          |
