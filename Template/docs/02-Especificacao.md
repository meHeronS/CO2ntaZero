# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Esta seção define o escopo inicial do CO2ntaZero, focando nas necessidades essenciais dos stakeholders identificados e nos requisitos fundamentais para o MVP (Produto Mínimo Viável).

## Modelo de negócio (*Business Model Canvas*)

O planejamento estratégico inicial foi consolidado no *Business Model Canvas* abaixo, destacando a proposta de valor voltada para a simplicidade e a conscientização.

![Quadro de modelo de negócios](images/bmc.png "BMC CO2ntaZero")

## Personas

1. **Ana (Pequena Empresária):** 32 anos. Busca reduzir custos fixos da padaria e engajar clientes com práticas sustentáveis.
2. **Sr. Vander (Proprietário):** 65 anos. Precisa de uma ferramenta extremamente simples para monitorar contas e evitar desperdícios no bar e em casa.

> **Nota:** O foco inicial é garantir usabilidade para perfis não-técnicos.

## Histórias de usuários

Priorizamos as histórias que garantem o ciclo básico de valor: **Lançamento -> Monitoramento -> Alerta**.

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Sr. Vander          | Cadastrar minhas contas de luz     | Saber se houve aumento excessivo no mês|
|Ana                 | Receber alertas de variação        | Identificar vazamentos ou desperdício rapidamente |
|Usuário Comum       | Ver meu impacto em carbono         | Entender como meu consumo afeta o ambiente |

## Requisitos Iniciais (Sprint 1)

O escopo da primeira sprint foca na estruturação e nas funcionalidades "core".

### Requisitos funcionais
|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastro de consumo (Energia, Água) | ALTA | 
|RF-002| Alerta de variação (>15%) | ALTA |
|RF-003| Exibição de impacto em CO2 | ALTA |

### Requisitos não funcionais
|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Responsividade (Mobile First) | ALTA | 
|RNF-002| Interface Simplificada (Poucos cliques) | ALTA |

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O sistema não fará leitura automática de faturas (OCR) no MVP. |
|002| Requer conexão com a internet para funcionar. |
|003| O desenvolvimento deve utilizar a stack MERN (Mongo, Express, React, Node). |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
