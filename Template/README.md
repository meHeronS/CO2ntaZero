# CO2ntaZero: Calculadora de Emissões e Conscientização Ambiental

O **CO2ntaZero** é um projeto acadêmico de aplicação web voltado para o monitoramento de consumo (água e energia) e cálculo de emissões de carbono. O objetivo é criar uma ferramenta simples que ajude pequenos negócios e residências a entenderem seu impacto ambiental a partir de suas contas mensais.

## Integrantes

* Caio Vieira de Freitas
* Gustavo Costa Pinho Tavares
* Heron Victor Vieira da Silva
* João Vinicius Rodrigues Santos
* Saulo Luiz de Oliveira e Silva

## Professor

* Amália Soares Vieira de Vasconcelos

---

## Contexto e Motivação

O projeto CO2ntaZero nasceu de uma necessidade prática: auxiliar o Sr. Vander (65 anos), pai de um dos fundadores, a monitorar variações nos gastos mensais de sua residência e comércio (bar). A dificuldade em perceber anomalias nas faturas de papel motivou a criação de um sistema que não apenas alertasse sobre desperdícios financeiros (regra de variação > 15%), mas que evoluísse para uma plataforma de Green Tech, convertendo esses dados em pegada de carbono e promovendo a sustentabilidade.

* **Parceiro de Validação (MVP):** Valtinho's Bar (Betim/MG).
* **Princípio de Design (Usabilidade Simplificada):** A principal diretriz para a interface é a facilidade de uso. O sistema deve ser tão intuitivo e autoexplicativo que o Sr. Vander, sem afinidade com tecnologia, consiga utilizá-lo de forma fluida e sem necessidade de treinamento.

---

## Arquitetura Técnica

A arquitetura de dados do CO2ntaZero foi projetada para suportar uma plataforma acadêmica de Green Tech orientada a dados. O sistema utiliza a MERN Stack (MongoDB, Express, React, Node.js), com persistência no MongoDB Atlas (NoSQL) e infraestrutura Dockerizada. A modelagem de dados prioriza a rastreabilidade de emissões de carbono, segurança (LGPD) e escalabilidade horizontal.

### Parte 1: Estrutura Base e Single Owner (Isolamento Lógico)
O sistema adota o modelo "Single Owner" (Proprietário Único). Embora suporte múltiplos usuários no banco de dados (Isolamento Lógico), cada conta é isolada. Não há hierarquia complexa de permissões (RBAC) dentro de uma empresa neste MVP.

1. **Companies (Unidades de Gestão):** Centraliza o escopo de atuação. Seja uma residência ou uma empresa, a entidade Company define a 'Unidade Geradora de Emissões'. O campo `companyId` atua como chave de particionamento lógico em todas as coleções de dados, garantindo que os dados de um usuário não vazem para outro. O sistema impede o cadastro duplicado de CPF/CNPJ e emails e envia um e-mail para o proprietário original informando tentativas indevidas.
2. **Users (Usuários e Gestores):** Gerenciamento de identidades e acessos com senhas criptografadas com BCrypt. Um usuário (CPF) gerencia uma ou mais unidades (Companies), permitindo a visão consolidada de múltiplas frentes (ex: 'Minha Casa' e 'Meu Bar').
3. **SessionTokens (Segurança de Sessão):** Controle de autenticação stateless via JWT com Refresh Tokens. Permite invalidar sessões em caso de suspeita de fraude ou logout, evitando acessos simultâneos indevidos.

### Parte 2: O Motor de Sustentabilidade (Core Sustentabilidade)
Estas coleções formam o coração do CO2ntaZero, responsáveis por transformar dados operacionais em métricas ambientais.

4. **Consumptions (Consumo de Recursos):** Foco nas grandezas físicas (kWh, m³, Litros,KGs). Utiliza o padrão GWP-AR5 (Global Warming Potential - IPCC) para unificação das emissões em CO2 equivalente (CO2e).
5. **EmissionFactors (Fatores de Emissão / GHG Protocol & SIRENE):** Dicionário de conversão oficial baseado na metodologia do GHG Protocol Brasil (EPE) e dados do MCTI/SIRENE (Ref. Média 2025: 0,3708 kgCO2/kWh). Coleção gerida via scripts administrativos.
6. **Wastes (Economia Circular):** Rastreamento da gestão de resíduos sólidos e líquidos (Lixo / Óleo de cozinha). Monitora o descarte e calcula o impacto evitado através de fatores de compostagem ou reciclagem (Tabelas FGV).

### Parte 3: Inteligência e Auditoria

7. **Alerts (Monitoramento de Anomalias):** Motor de desvios de consumo (RF-02). Alerta automático para variações > 15% (comparado à média histórica de 3 meses).
8. **Goals (Metas e Gamificação):** Engajamento via compromissos ambientais (Ex: Reduzir 10% de energia). Recompensa visual via selos de progresso sustentável.
9. **Logs (Auditoria e Compliance LGPD):** Registro histórico de "o que foi feito", "quando" e o "de-para" de valores. Essencial para transparência.

---

## Infraestrutura e Deploy

- **Hospedagem API:** Microsoft Azure App Service. [Acessar Documentação](https://learn.microsoft.com/azure/app-service/)
- **Hospedagem Front:** Vercel. [Acessar Documentação](https://vercel.com/docs/frameworks/react)
- **Container:** Docker (Ambientes padronizados). [Acessar Documentação](https://docs.docker.com/get-started/)
- **Banco de Dados:** MongoDB Atlas (NoSQL). [Acessar Documentação](https://www.mongodb.com/docs/atlas/)
- **Backend:** Node.js (Runtime) - [Doc Node](https://nodejs.org/docs/) & Express.js (Framework) - [Doc Express](https://expressjs.com/)
- **Frontend:** React.js (Interface Responsiva). [Acessar Documentação](https://react.dev/learn)
- **Versionamento e Gestão:** GitHub & GitHub Projects. [Acessar Documentação](https://docs.github.com/pt)
- **Segurança:** BCrypt (Hash de senhas) & JWT (Tokens). [Acessar Documentação JWT](https://jwt.io/introduction/)

---

# Documentação do Projeto

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

1. **BRASIL. Ministério da Ciência, Tecnologia e Inovações (MCTI).** SIRENE - Fatores de Emissão de Eletricidade: Sistema Interligado Nacional (SIN). Brasília, 2025. [Acessar Fonte](https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/sirene/emissoes/fatores-de-emissao-de-eletricidade)
2. **FGVces. Programa Brasileiro GHG Protocol:** Ferramenta de Cálculo v2026.0.1. São Paulo: FGV, 2026. [Acessar Fonte](https://eaesp.fgv.br/centros/centro-estudos-sustentabilidade/programas/programa-brasileiro-ghg-protocol)
3. **EMPRESA DE PESQUISA ENERGÉTICA (EPE).** Balanço Energético Nacional (BEN): Fatores de Conversão. Rio de Janeiro: EPE, 2024. [Acessar Fonte](https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-2024)
4. **BRASIL. Ministério das Cidades.** Sistema Nacional de Informações sobre Saneamento (SNIS): Diagnósticos de Água e Resíduos. Brasília: SNS, 2024. [Acessar Fonte](http://www.snis.gov.br/paineis-de-informacoes-sobre-saneamento)

# Repositório e Código Fonte

* <a href="../src/README.md">Código Fonte (Source)</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
