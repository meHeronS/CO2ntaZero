# CO2ntaZero: Calculadora de Emissões e Conscientização Ambiental

`CURSO: Sistemas de Informação`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Sustentabilidade`

`1º Semestre / 2026`

O **CO2ntaZero** é uma ferramenta acadêmica de **Conscientização Ambiental** concebida para monitorar e calcular as emissões de carbono de indivíduos e pequenos negócios. O objetivo central não é a gestão corporativa complexa, mas sim a conversão de métricas de consumo (energia, água, combustíveis) em **Pegada de Carbono (Carbon Footprint)**, permitindo que pessoas comuns entendam seu impacto e adotem hábitos mais sustentáveis.

## Integrantes

* Caio Vieira de Freitas
* Gustavo Costa Pinho Tavares
* Heron Victor Vieira da Silva
* João Vinicius Rodrigues Santos
* Saulo Luiz de Oliveira e Silva

## Professor

* Amália Soares Vieira de Vasconcelos

---

## 1. Contexto e Motivação

O projeto CO2ntaZero nasceu de uma necessidade prática: auxiliar o **Sr. Vander (65 anos)**, pai de um dos fundadores, a monitorar variações nos gastos mensais de sua residência e comércio (**Valtinho's Bar**).

A dificuldade em perceber anomalias nas faturas de papel motivou a criação de um sistema que não apenas alertasse sobre desperdícios financeiros (regra de variação > 15%), mas que evoluísse para uma plataforma de Green Tech, convertendo esses dados em pegada de carbono e promovendo a sustentabilidade.

### Princípio de Design: Usabilidade Simplificada
A principal diretriz para a interface é a facilidade de uso. O sistema deve ser tão intuitivo e autoexplicativo que o Sr. Vander, sem afinidade com tecnologia, consiga utilizá-lo de forma fluida e sem necessidade de treinamento.

### Parceiro de Validação (MVP)
O **Valtinho's Bar** servirá como piloto para validar se a ferramenta ajuda efetivamente a economizar dinheiro e reduzir emissões em um cenário real de pequeno negócio.

---

## 2. Glossário e Conceitos Fundamentais

Para facilitar o entendimento técnico e de negócio deste projeto, definimos os seguintes termos e siglas:

*   **Sustentabilidade Prática**: Foco em ações tangíveis do dia a dia (reduzir luz, economizar água) em vez de políticas corporativas complexas.
*   **GHG Protocol (Greenhouse Gas Protocol)**: Padrão globalmente aceito para quantificação e gestão de emissões de Gases de Efeito Estufa (GEE).
*   **MCTI**: Ministério da Ciência, Tecnologia e Inovação. Referência oficial brasileira para os fatores médios de emissão de CO2 do Sistema Interligado Nacional (SIN).
*   **MERN Stack**: Conjunto de tecnologias JavaScript utilizado para o desenvolvimento full-stack: **M**ongoDB (Banco de dados), **E**xpress (Framework backend), **R**eact (Biblioteca frontend) e **N**ode.js (Ambiente de execução).
*   **MVP (Minimum Viable Product)**: Versão minimalista do produto, contendo apenas as funcionalidades essenciais para validar a proposta de valor (o cálculo de emissões).
*   **Net Zero (Conceito Climático)**: Refere-se à meta global de zerar as emissões líquidas de carbono. *Nota: Este termo é utilizado aqui estritamente como conceito científico/ambiental (Net Zero Emissions), sem vínculo comercial com empresas homônimas do setor de créditos de carbono.*
*   **ODS (Objetivos de Desenvolvimento Sustentável)**: Agenda global da ONU. Este projeto atende diretamente aos:
    *   **ODS 12 (Consumo e Produção Responsáveis)**: Incentivo ao uso eficiente de recursos naturais e gestão adequada de resíduos.
    *   **ODS 13 (Ação Contra a Mudança Global do Clima)**: Medidas urgentes para combater a mudança do clima e seus impactos através do monitoramento de CO2.

---

## 3. Justificativa Acadêmica e Diferencial

Este projeto é um **Modelo Conceitual de Tecnologia Verde (Greentech)** desenvolvido em grupo. Enquanto empresas de mercado (ex: *NetZero.green*) focam em soluções complexas para grandes corporações e indústrias pesadas, o **CO2ntaZero** nasce com a missão de **democratizar a sustentabilidade**.

Nosso foco é dar ferramentas para o **Pequeno Empresário (Dono de Restaurante, Padaria)** e para **Pessoas Físicas**, permitindo que qualquer um possa iniciar sua jornada de sustentabilidade sem burocracia. O sistema torna tangível o impacto invisível das atividades diárias.

---

## 4. Pilares Funcionais de Monitoramento

### 4.1. Definição de Alertas Inteligentes (Regra dos 15%)
O sistema monitora desvios de consumo. Detecta automaticamente variações superiores a **15%** (ou limite configurado) em relação à média histórica, notificando o gestor sobre possíveis vazamentos ou ineficiências operacionais.

### 4.2. Inteligência Net Zero e Gamificação
*   **Rastreamento de Resíduos**: Módulo para gestão de economia circular (óleo, recicláveis).
*   **Cálculo de CO2**: Conversão automática baseada em tabelas oficiais do Governo (MCTI) e FGV.
*   **Gamificação**: Uso de selos e feedbacks visuais quando metas de redução são atingidas.

---

## 5. Documentação Técnica, Instalação e Código-Fonte

Toda a arquitetura de engenharia do sistema (Stack MERN, orquestração via Docker, infraestrutura em nuvem, modelagem de banco de dados NoSQL), bem como as instruções detalhadas de **Instalação e Execução** local ou via containers, encontram-se rigorosamente detalhadas na documentação específica do código-fonte.

**Acessar a Documentação Técnica e Código-Fonte (src/README.md)**

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Plano-testes-usabilidade.md"> Plano de testes de usabilidade</a></li>
<li><a href="docs/11-Registro-testes-usabilidade.md"> Registro de testes de usabilidade</a></li>
<li><a href="docs/12-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/13-Referencias.md"> Referências</a></li>
</ol>

---

# Referencial de Bases de Dados Corroboradas

1. **BRASIL. Ministério da Ciência, Tecnologia e Inovações (MCTI).** SIRENE - Fatores de Emissão de Eletricidade: Sistema Interligado Nacional (SIN). Brasília, 2025. Acessar Fonte
2. **FGVces. Programa Brasileiro GHG Protocol:** Ferramenta de Cálculo v2026.0.1. São Paulo: FGV, 2026. Acessar Fonte
3. **EMPRESA DE PESQUISA ENERGÉTICA (EPE).** Balanço Energético Nacional (BEN): Fatores de Conversão. Rio de Janeiro: EPE, 2024. Acessar Fonte
4. **BRASIL. Ministério das Cidades.** Sistema Nacional de Informações sobre Saneamento (SNIS): Diagnósticos de Água e Resíduos. Brasília: SNS, 2024. Acessar Fonte

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
