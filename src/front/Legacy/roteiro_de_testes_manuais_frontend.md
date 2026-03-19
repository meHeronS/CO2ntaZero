# Roteiro de Testes Manuais - Frontend

Este documento fornece um guia passo a passo para validar manualmente as funcionalidades do frontend, garantindo que a interface do usuário funcione corretamente e se integre bem com o backend.

---

### Empresas de Teste Pré-configuradas

Para garantir um ambiente estável e previsível para os testes manuais, utilize as empresas de teste fixas.

> **Importante:** Os testes automatizados (`npm test`) agora não apagam mais as empresas de teste manuais. No entanto, se você precisar recriar ou garantir que elas existam, certifique-se de que o backend esteja rodando (`npm start`) e, em outro terminal, na pasta `src/back`, execute o comando:
> ```bash
> npm run create-test-users
> ```

A execução deste comando gera/atualiza o arquivo `dados-empresas-teste.md` dentro desta mesma pasta (`Testes/Docs/`). **Consulte este arquivo para obter os dados completos de cada empresa**, incluindo:
- ID da Empresa (`companyId`)
- ID do Usuário (`userId`)
- Access Token
- E outras informações de cadastro.

- **Empresa Frontend:**
  - **E-mail:** `empresa-frontend@test.com`
  - **Senha:** `password123`
- **Empresa Backend:**
  - **E-mail:** `empresa-backend@test.com`
  - **Senha:** `password123`
- **Empresa React:**
  - **E-mail:** `empresa-react@test.com`
  - **Senha:** `password123`

---

## 1. Autenticação e Acesso

O objetivo é garantir que o fluxo de login, logout e proteção de rotas está funcionando.

- [ ] **Execução do Ambiente Completo:**
    - **Ação:** No terminal, a partir da pasta `src/back`, execute `npm start` para iniciar todos os servidores.

- [ ] **Login com Sucesso:**
    - **Ação:** Acesse a página de login, insira as credenciais da **Empresa A** e clique em "Entrar".
    - **Resultado Esperado:** O usuário deve ser redirecionado para a página inicial (`startPage.html`) e seu nome deve aparecer no cabeçalho.

- [ ] **Falha de Login (Senha Incorreta):**
    - **Ação:** Tente fazer login com a **Empresa A**, mas com uma senha errada (ex: `errada`).
    - **Resultado Esperado:** Uma mensagem de erro "Credenciais inválidas" (ou similar) deve ser exibida. O usuário não deve ser redirecionado.

- [ ] **Proteção de Rota (Auth Guard):**
    - **Ação:** Certifique-se de que não está logado (limpe o cache do navegador se necessário). Tente acessar a URL `http://localhost:3000/pages/startPage.html` diretamente.
    - **Resultado Esperado:** O sistema deve redirecionar você imediatamente para a página de login (`login.html`).

- [ ] **Logout:**
    - **Ação:** Faça login com qualquer empresa e, em seguida, clique no botão "Sair".
    - **Resultado Esperado:** A sessão deve ser encerrada e o usuário redirecionado para a página de login.

- [ ] **Login com Sucesso (Prova de Conceito React):**
    - **Ação:** Acesse a URL da aplicação React: `http://localhost:3001`. Insira as credenciais da **Empresa React** e clique em "Entrar".
    - **Resultado Esperado:** O usuário deve ser redirecionado para a página inicial do **sistema legado** (`http://localhost:3000/pages/startPage.html`) e a sessão deve estar ativa (nome do usuário no cabeçalho).

- [ ] **Recuperação de Senha:**
    - **Ação:** Na tela de login, clique em "Esqueci minha senha", insira um e-mail válido e siga o fluxo (em ambiente de teste, pode ser necessário simular o clique no link recebido).
    - **Resultado Esperado:** O usuário deve conseguir definir uma nova senha e, em seguida, fazer login com ela.

---

## 2. Teste de Isolamento de Dados (Single Owner)

Este é o teste mais crítico para o frontend. Valida que a interface de um usuário não exibe dados de outro.

- [ ] **Cenário de Preparação (Empresa A):**
    1.  Faça login com a **Empresa Frontend**.
    2.  Navegue até "Consumos" e crie um registro de consumo único e facilmente identificável, por exemplo: `Consumo Energia Teste Manual`.
    3.  Navegue até "Metas" e crie uma meta ambiental única, por exemplo: `Meta Redução Teste Manual`.
    4.  Faça logout.

- [ ] **Cenário de Validação (Empresa B):**
    1.  Faça login com a **Empresa Backend**.
    2.  Navegue até a página de "Consumos".
    3.  **Resultado Esperado:** A lista de consumos deve estar **vazia** ou conter apenas registros da **Empresa Backend**. O registro `Consumo Energia Teste Manual` **NÃO** deve aparecer.
    4.  Navegue até a página de "Metas".
    5.  **Resultado Esperado:** A lista de metas deve estar **vazia** ou conter apenas metas da **Empresa Backend**. A meta `Meta Redução Teste Manual` **NÃO** deve aparecer.

---

## 3. Módulo de Consumo e Emissões

Valida o ciclo completo de gerenciamento de consumos e cálculo da pegada de carbono.

- [ ] **Criar Registro de Consumo:**
    - **Ação:** Crie um registro de consumo de Energia de `500 kWh` e um de Água de `15 m³`.
    - **Resultado Esperado:** Os cards no dashboard devem ser atualizados mostrando a "Pegada de Carbono (kgCO2e)" calculada e os consumos mensais de "Energia" e "Água". Ambos os registros devem aparecer na lista.

- [ ] **Validação de Formulário (Criar Consumo):**
    - **Ação:** Tente criar um consumo deixando o campo "Quantidade" ou "Recurso" em branco.
    - **Resultado Esperado:** O formulário deve exibir uma mensagem de erro (ex: "Este campo é obrigatório") e não deve permitir o envio do formulário.

- [ ] **Editar Consumo:**
    - **Ação:** Edite o consumo de `500 kWh` para `600 kWh`.
    - **Resultado Esperado:** O valor na lista deve ser atualizado. O card de consumo e a pegada de carbono total no dashboard devem ser recalculados refletindo o aumento.

- [ ] **Excluir Consumo:**
    - **Ação:** Exclua o consumo de água de `15 m³`.
    - **Resultado Esperado:** O registro deve desaparecer da lista. Os cards do dashboard devem ser recalculados subtraindo esse valor.

- [ ] **Filtrar Consumos:**
    - **Ação:** Use os filtros de tipo de recurso ("Energia", "Água") e período.
    - **Resultado Esperado:** A lista de consumos deve ser atualizada dinamicamente para mostrar apenas os resultados que correspondem aos filtros selecionados.

---

## 4. Módulo de Metas (CRUD)

- [ ] **Criar Meta:**
    - **Ação:** Crie uma nova meta com título "Reduzir consumo de energia em 10%".
    - **Resultado Esperado:** A meta deve aparecer na lista de metas.

- [ ] **Editar Meta:**
    - **Ação:** Edite o título da meta para "Reduzir consumo de energia em 15%".
    - **Resultado Esperado:** O título na lista deve ser atualizado.

- [ ] **Excluir Meta:**
    - **Ação:** Exclua a meta criada.
    - **Resultado Esperado:** A meta deve ser removida da lista.

---

## 5. Módulo de Relatórios

- [ ] **Visualizar Relatório de Emissões:**
    - **Ação:** Com alguns consumos cadastrados, vá para a página de relatórios.
    - **Resultado Esperado (Visualização):** Os gráficos e a tabela de resumo devem exibir a conversão em pegada de carbono correspondente aos dados dos consumos cadastrados.