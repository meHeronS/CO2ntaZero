# Exemplos de Dados (JSON)

Esta pasta contém arquivos JSON que servem como exemplos da estrutura de dados utilizada pela API do CO2ntaZero. Como o formato JSON não suporta comentários, este documento explica a finalidade de cada arquivo.

Estes exemplos são úteis para:
-   Entender o formato esperado nos corpos (body) das requisições `POST` e `PUT`.
-   Servir como base para a criação de testes automatizados.
-   Auxiliar desenvolvedores do frontend a mockar dados durante o desenvolvimento.

---

### `users.json` (Dados de Usuários)

**Função:** Representa os dados de um **usuário** do sistema.
-   Contém informações de login (email, senha), o nome do usuário e a qual empresa (`companyId`) e permissão (`role`) ele está associado.
-   **Observação:** O campo `password` é enviado apenas no momento do cadastro. O sistema o converte para um `passwordHash` e nunca o armazena em texto plano.

### `companies.json` (Empresas)

**Função:** Representa os dados de uma **empresa** cliente do sistema.
-   Cada empresa funciona como um "inquilino" (tenant) isolado, com seus próprios usuários, transações, etc.
-   Contém informações cadastrais como nome, CNPJ, e o plano contratado (`plan`).

### `goals.json` (Metas ESG)

**Função:** Representa os objetivos de redução de impacto ambiental definidos pela empresa.
-   Pode ser uma meta de redução de emissão (`carbon_footprint`), consumo de energia (`electricity`), água (`water`), etc.
-   Inclui a porcentagem de redução alvo (`targetReductionPercentage`) e o consumo base (`baselineConsumption`).

**Endpoints Relacionados:**
-   `POST /api/goals`: Criação de uma nova meta.
-   `GET /api/goals`: Listagem das metas da empresa.

### `alerts.json` (Alertas)

**Função:** Representa um **alerta** gerado pelo sistema.
-   Alertas são criados automaticamente quando um limite de emissão está próximo de ser atingido ou quando uma anomalia de consumo é detectada.

### `logs.json` (Logs de Auditoria)

**Função:** Representa um registro de **auditoria**.
-   O sistema cria um log para cada ação importante (criação, atualização, exclusão) realizada por um usuário, registrando quem fez, o que fez e quando.