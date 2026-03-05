# Banco de Dados - CO2ntaZero

Este diretório contém informações sobre a modelagem e scripts do banco de dados do projeto.

## 1. Visão Geral

O banco de dados do sistema CO2ntaZero tem como objetivo centralizar informações de registro e monitoramento de consumo de recursos básicos (água, energia, combustíveis, etc) e descarte de resíduos de usuários residenciais (Pessoas Físicas) e empresariais (Pessoas Jurídicas).

O projeto é construído exclusivamente em arquitetura NoSQL, utilizando **MongoDB** (via Atlas). A escolha do MongoDB baseia-se na flexibilidade oferecida pelos documentos BSON, ideais para lidar com diferentes métricas físicas (kWh, m³, litros) relativas ao acompanhamento de sustentabilidade, sem a necessidade das amarras de bancos relacionais.

O banco implementa isolamento multi-tenant (várias unidades de gestão partilhando a mesma infraestrutura de forma segura e separada).

## 2. Estrutura de Coleções (Collections)

Abaixo descrevemos os Modelos (Schemas) da aplicação e seus objetivos, que representam as collections dentro do banco MongoDB. A implementação física destes modelos encontra-se em `../back/models`.

### Principais Modelos

- **Company / Unidade Gestora**: Estabelecimento comercial (CNPJ) ou residência (CPF) a que os consumos pertencem. É a raiz da hierarquia.
- **User / Usuário**: Gestor ou colaborador que opera uma ou mais Companies. Guarda credenciais em hash.
- **Consumption / Consumo**: Lançamentos de faturas ou medidores físicos, guardando o tipo (energia, água), a unidade métrica (kWh, m³), o volume e a emissão de CO2 calculada.
- **Waste / Resíduos**: Registros de economia circular (descarte de óleo, orgânicos) para abater pegada de carbono.
- **EmissionFactor / Fatores de Emissão**: Tabela de dicionários fixos. Ex: Quanto de CO2 é gerado por 1kWh (base MCTI).
- **Goal / Metas ESG**: Objetivos estruturados (ex: reduzir em 15% o uso de água).
- **Alert / Alerta de Anomalia**: Registros do nosso Motor de Anomalias, gerados sempre que um Consumption supera em 15% a média móvel histórica.

## 3. Relacionamentos no NoSQL (Referências)

Embora o MongoDB seja NoSQL, nós utilizamos a abordagem de Referência (Normalization) via ObjectId para construir o isolamento das informações do sistema:

- Um **User** está sempre ancorado a uma **Company**.
- Toda **Consumption** carrega consigo a `companyId` (onde ocorreu o gasto) e a `userId` (quem registrou).
- Todo **Waste** carrega `companyId` e `userId`.
- Um **Alert** pertence unicamente a uma **Company**.
- **EmissionFactor** é uma collection global, sem donos, servindo de base de cálculo universal para a aplicação.

> **Regra de Ouro (Multitenancy):** Cada documento gerado nas coleções de operação carrega nativamente o campo `companyId`. Esta é a chave mandatória para as requisições API filtrarem os escopos e isolarem os dados. A Empresa A jamais verá os consumos da Empresa B.

## 4. Representação Visual das Coleções (Schemas)

```json
/*
  ESTRUTURA DE DADOS NO MONGODB
*/

Collection: COMPANIES
{
  "_id": ObjectId("..."),
  "name": "Bar do Parceiro",
  "documentType": "CNPJ", // ou CPF
  "document": "00.000.000/0001-00",
  "active": true,
  "createdAt": ISODate("...")
}

Collection: USERS
{
  "_id": ObjectId("..."),
  "companyId": ObjectId("..."),  // Ref -> Companies
  "name": "Gestor Joao",
  "email": "gestor@bar.com",
  "passwordHash": "[BCRYPT_HASH]",
  "role": "ADMIN",
  "active": true
}

Collection: CONSUMPTIONS (A Estrutura Core)
{
  "_id": ObjectId("..."),
  "companyId": ObjectId("..."),  // Ref -> Companies
  "userId": ObjectId("..."),     // Ref -> Users
  "resourceType": "electricity", // water, gas, fuel
  "quantity": 350.5,             // Consumo fisico
  "unit": "kWh",                 // m3, litros
  "cost": 412.00,                // Gasto Financeiro R$
  "date": ISODate("..."),
  "carbonFootprint": 10.12,      // (quantity * emissionFactorUsed)
  "emissionFactorUsed": 0.0289,  // Fator usado na epoca
  "status": "verified"
}

Collection: WASTES
{
  "_id": ObjectId("..."),
  "companyId": ObjectId("..."),
  "userId": ObjectId("..."),
  "type": "oleo",               // organico, reciclavel
  "quantity": 5,
  "unit": "litros",
  "disposalMethod": "ponto_entrega"
}

Collection: EMISSION_FACTORS (Dicionario do Sistema)
{
  "_id": ObjectId("..."),
  "source": "energia_eletrica_SIN",
  "factor": 0.0289,
  "unit": "kWh",
  "referenceYear": 2026,
  "sourceReference": "MCTI"
}

Collection: ALERTS (Motor de Anomalias)
{
  "_id": ObjectId("..."),
  "companyId": ObjectId("..."),
  "type": "anomaly_detected",
  "message": "Atencao: Consumo de agua 45% acima da media dos ultimos 3 meses. Possivel vazamento.",
  "isRead": false,
  "createdAt": ISODate("...")
}
```

## 5. Requisitos de Segurança e LGPD

1.  **Campos Sensíveis:** O campo `passwordHash` na coleção de usuário jamais é retornado para o Frontend. A validação ocorre a nível de fluxo do Mongoose.
2.  **Soft Delete:** A deleção física de registros (DROP/DELETE) nas collections não costuma ocorrer. Aplicamos um marcador lógico (`deleted: true` e `deletedAt: ISODate`), mascarado pelas requisições para a aderência da LGPD.

## Scripts

Scripts para popular o banco com dados iniciais (seed) ou configurar permissões devem ser armazenados aqui.

*   Exemplo: `seed.js`, `init_db.js`.