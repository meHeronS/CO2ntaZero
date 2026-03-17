# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Esta seção define o escopo inicial do CO2ntaZero, focando nas necessidades essenciais dos stakeholders identificados e nos requisitos fundamentais para o MVP (Produto Mínimo Viável).

## Modelo de negócio (*Business Model Canvas*)

<<<<<<< HEAD
O *Business Model Canvas* (BMC) é uma ferramenta de planejamento estratégico que descreve, de forma visual e integrada, como uma organização cria, entrega e captura valor.  

No contexto deste projeto, o BMC auxilia no alinhamento da equipe em relação aos aspectos essenciais do negócio, servindo como base para decisões técnicas, de design e de priorização de funcionalidades.  

A seguir, apresenta-se um exemplo que deve ser adaptado pelo grupo de acordo com as características do projeto.  

![Quadro de modelo de negócios](images/bmc.png "Exemplo de BMC.")

## Personas

1. **Ana (Pequena Empresária):** 32 anos, dona de uma padaria. Precisa reduzir custos fixos. Quer monitorar o consumo de gás e energia dos fornos e saber se seus funcionários estão desperdiçando recursos.
2. **Carlos (Gerente Operacional):** 45 anos. Precisa organizar as contas da empresa e quer dados para mostrar que a empresa está economizando recursos e sendo mais "verde".
3. **Vander (O Pai e Empreendedor):** 65 anos. Controla as contas de casa e do seu bar (**Valtinho's Bar**). Precisa de facilidade para gerenciar ambos os contextos. O sistema deve permitir que ele cadastre sua residência e o bar (múltiplos CNPJs/CPFs) e alterne entre eles conforme necessário, mantendo a simplicidade e o alerta de variações.
4. **Juliana (Estudante Universitária):** 21 anos. Preocupada com as mudanças climáticas, divide apartamento com amigas. Quer monitorar a pegada de carbono da república para engajar suas colegas em práticas mais sustentáveis.
5. **Roberto (Dono de Frota/Logística):** 50 anos. Possui 3 caminhões de entrega. Quer medir o impacto do diesel consumido e estabelecer metas de redução para atrair clientes corporativos que exigem relatórios ambientais.
6. **Fernanda (Consultora de Sustentabilidade):** 35 anos. Trabalha ajudando pequenos negócios a implementarem ações ESG. Precisa de uma ferramenta simples para recomendar e usar no diagnóstico de seus clientes.

> **Links úteis**:
> - [Rock content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
=======
O planejamento estratégico inicial foi consolidado no *Business Model Canvas* abaixo, destacando a proposta de valor voltada para a simplicidade e a conscientização.

![Quadro de modelo de negócios](images/bmc.png "BMC CO2ntaZero")

## Personas

1. **Ana (Pequena Empresária):** 32 anos. Busca reduzir custos fixos da padaria e engajar clientes com práticas sustentáveis.
2. **Sr. Vander (Proprietário):** 65 anos. Precisa de uma ferramenta extremamente simples para monitorar contas e evitar desperdícios no bar e em casa.
>>>>>>> fe99acbc4d7ae3ca1b3720e77445f8245755086a

> **Nota:** O foco inicial é garantir usabilidade para perfis não-técnicos.

## Histórias de usuários

Priorizamos as histórias que garantem o ciclo básico de valor: **Lançamento -> Monitoramento -> Alerta**.

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
<<<<<<< HEAD
|Ana (Empresária)    | Lançar o consumo de combustível das entregas | Calcular a pegada de carbono da logística da minha padaria. |
|Carlos (Gerente)    | Configurar a sensibilidade do alerta de variação | Ajustar o monitoramento para a realidade sazonal da minha empresa (respeitando o mínimo de 15%). |
|Usuário Geral       | Ver dicas de como reduzir meu consumo | Aprender a ser mais sustentável e economizar dinheiro. |
|Vander (Pai)        | Ser alertado se houver uma variação grande (acima de 15%) no consumo | Verificar se há vazamentos ou problemas na rede elétrica imediatamente. |
|Vander (Pai)        | Ver quantas árvores eu precisaria plantar para compensar meu consumo | Ter uma noção real do meu impacto ambiental e como posso ajudar o planeta. |
|Vander (Pai)        | Alternar entre o perfil de casa e do bar | Gerenciar as contas de ambos os locais em um único lugar. |
|Juliana (Estudante) | Lançar a conta de energia da república mensalmente | Descobrir quanto CO2 estamos emitindo coletivamente na casa. |
|Roberto (Logística) | Cadastrar múltiplos veículos e lançar consumo de diesel | Monitorar a emissão da minha frota para apresentar a clientes empresariais. |
|Fernanda (Consultora)| Visualizar um histórico claro e exportável de emissões | Utilizar os dados para elaborar um relatório ESG de entrada para meus clientes. |
|Carlos (Gerente)    | Visualizar um dashboard com a evolução das emissões em gráficos | Apresentar os resultados de redução de custos nas reuniões de diretoria. |
=======
|Sr. Vander          | Cadastrar minhas contas de luz     | Saber se houve aumento excessivo no mês|
|Ana                 | Receber alertas de variação        | Identificar vazamentos ou desperdício rapidamente |
|Usuário Comum       | Ver meu impacto em carbono         | Entender como meu consumo afeta o ambiente |
>>>>>>> fe99acbc4d7ae3ca1b3720e77445f8245755086a

## Requisitos Iniciais (Sprint 1)

O escopo da primeira sprint foca na estruturação e nas funcionalidades "core".

### Requisitos funcionais
|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
<<<<<<< HEAD
|RF-001| O sistema deve permitir o lançamento de diversos tipos de consumo (Água, Luz, Combustível, Resíduos) baseados em tabelas oficiais. | ALTA | 
|RF-002| O sistema deve calcular a pegada de carbono e exibir a equivalência em árvores necessárias para compensação. | ALTA |
|RF-003| O sistema deve validar variações mensais e emitir alertas se o consumo variar acima de um percentual configurável pelo usuário (respeitando o mínimo de 15%). | ALTA |
|RF-004| O sistema deve apresentar dicas de conscientização e redução de desperdício baseadas no tipo de consumo lançado. | MÉDIA |
|RF-005| O sistema deve permitir o controle de acesso e autenticação de usuários. | ALTA |
|RF-006| O sistema deve garantir o isolamento lógico de dados entre diferentes contas (Single Owner). | ALTA |
|RF-007| O sistema deve permitir que um único usuário (CPF) gerencie múltiplos CNPJs (Matriz/Filiais ou Negócios distintos). | ALTA |
|RF-008| O sistema deve bloquear o cadastro de CNPJ ou E-mail Corporativo já existentes para evitar fraudes e duplicidade. | ALTA |
=======
|RF-001| Cadastro de consumo (Energia, Água) | ALTA | 
|RF-002| Alerta de variação (>15%) | ALTA |
|RF-003| Exibição de impacto em CO2 | ALTA |
>>>>>>> fe99acbc4d7ae3ca1b3720e77445f8245755086a

### Requisitos não funcionais
|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
<<<<<<< HEAD
|RNF-001| O sistema deve ser uma aplicação web responsiva (acessível via navegador), sendo a versão mobile apenas conceitual. | ALTA | 
|RNF-002| O sistema deve garantir a segurança dos dados (LGPD) com criptografia. | ALTA |
|RNF-003| A interface deve ser intuitiva e autoexplicativa, projetada para usuários com pouca afinidade tecnológica (como a persona Vander). | ALTA |
|RNF-004| O sistema deve ser desenvolvido utilizando a stack MERN (MongoDB, Express, React, Node.js). | ALTA |
|RNF-005| A aplicação deve ser conteinerizada utilizando Docker, facilitando a padronização do ambiente e escalabilidade. | MÉDIA |

### Parâmetros de Sustentabilidade (Fatores de Emissão)

O backend utiliza fatores de conversão alinhados com o Inventário Nacional de Emissões (MCTI) e GHG Protocol para atender ao RF-002:

*   **Energia Elétrica (SIN):** Média móvel do grid nacional (~0,042 kgCO2e/kWh).
*   **Água Potável:** Fator de tratamento e distribuição (~0,35 kgCO2e/m³).
*   **Gasolina Comum:** Combustão móvel (~2,27 kgCO2e/Litro).
*   **GLP (Gás de Cozinha):** Combustão estacionária (~2,98 kgCO2e/kg).

Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
=======
|RNF-001| Responsividade (Mobile First) | ALTA | 
|RNF-002| Interface Simplificada (Poucos cliques) | ALTA |
>>>>>>> fe99acbc4d7ae3ca1b3720e77445f8245755086a

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O sistema será desenvolvido exclusivamente como aplicação web. O suporte a dispositivos móveis será via navegador (responsividade), sem desenvolvimento de aplicativo nativo. |
|002| O sistema deve respeitar as diretrizes da LGPD, garantindo a privacidade dos dados dos usuários. |
|003| O backend deve ser desenvolvido em Node.js e o banco de dados deve ser MongoDB (NoSQL). |
|004| O sistema deve permitir o cadastro de um e-mail de contato para a empresa, que pode ser o mesmo do proprietário, para fins de notificação e recuperação. |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
