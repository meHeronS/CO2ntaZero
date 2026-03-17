# Roteiro de Testes Manuais - Frontend

Este documento fornece um guia passo a passo para validar manualmente as funcionalidades do frontend, garantindo que a interface do usuário funcione corretamente e se integre bem com o backend.

---

### Empresas de Teste Pré-configuradas

Para garantir um ambiente estável e previsível para os testes manuais, utilize as empresas de teste fixas.

> **Importante:** Como os scripts de população automática foram removidos, certifique-se de registrar manualmente essas empresas na tela de cadastro caso o banco de dados seja limpo.

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
    - **Ação:** Certifique-se de que não está logado (limpe o cache do navegador se necessário). Tente acessar a URL `http://localhost:3000/startPage.html` diretamente.
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
    3.  Navegue até "Metas" e crie uma meta única, por exemplo: `Meta Teste Manual`.
    4.  Faça logout.

- [ ] **Cenário de Validação (Empresa B):**
    1.  Faça login com a **Empresa Backend**.
    2.  Navegue até a página de "Consumos".
    3.  **Resultado Esperado:** A lista de consumos deve estar **vazia** ou conter apenas consumos da **Empresa Backend**. O registro `Consumo Energia Teste Manual` **NÃO** deve aparecer.
    4.  Navegue até a página de "Metas".
    5.  **Resultado Esperado:** A lista de metas deve estar **vazia** ou conter apenas metas da **Empresa Backend**. A meta `Meta Teste Manual` **NÃO** deve aparecer.

---

## 3. Módulo de Consumos e Emissões

Valida o ciclo completo de gerenciamento de consumos e conversão em pegada de carbono.

- [ ] **Registrar Consumo:**
    - **Ação:** Crie um registro de consumo de energia de `500 kWh` e um de combustível de `100 Litros`.
    - **Resultado Esperado:** Os cards no dashboard devem ser atualizados para mostrar o aumento da "Pegada de Carbono". Ambos os registros devem aparecer na lista.

- [ ] **Validação de Formulário (Registrar Consumo):**
    - **Ação:** Tente criar um registro deixando o campo "Quantidade" ou "Tipo" em branco.
    - **Resultado Esperado:** O formulário deve exibir uma mensagem de erro (ex: "Este campo é obrigatório") e não deve permitir o envio da transação.

- [ ] **Editar Consumo:**
    - **Ação:** Edite o registro de `500 kWh` para `600 kWh`.
    - **Resultado Esperado:** O valor na lista deve ser atualizado. O card de Emissões no dashboard deve refletir o novo cálculo de CO2e.

- [ ] **Excluir Consumo:**
    - **Ação:** Exclua o registro de `100 Litros`.
    - **Resultado Esperado:** O consumo deve desaparecer da lista. Os cards do dashboard devem ser recalculados refletindo a exclusão.

- [ ] **Filtrar Consumos:**
    - **Ação:** Use os filtros de tipo de recurso ("Energia", "Água", "Combustível") e período.
    - **Resultado Esperado:** A lista de consumos deve ser atualizada dinamicamente para mostrar apenas os resultados que correspondem aos filtros selecionados.

---

## 4. Módulo de Metas (CRUD)

- [ ] **Criar Meta:**
    - **Ação:** Crie uma nova meta com título "Reduzir consumo de energia".
    - **Resultado Esperado:** A meta deve aparecer na lista de metas.

- [ ] **Editar Meta:**
    - **Ação:** Edite o título da meta para "Reduzir consumo de energia no verão".
    - **Resultado Esperado:** O título na lista deve ser atualizado.

- [ ] **Excluir Meta:**
    - **Ação:** Exclua a meta criada.
    - **Resultado Esperado:** A meta deve ser removida da lista.

---

## 5. Módulo de Uploads

- [ ] **Anexar Arquivo a um Consumo:**
    - **Ação:** Em um registro de consumo existente, clique no ícone de anexo, selecione um arquivo (PDF da fatura ou imagem) e confirme.
    - **Resultado Esperado:** A interface deve indicar que o anexo foi enviado com sucesso. Um ícone ou link para visualizar o anexo deve aparecer ao lado da transação.

- [ ] **Remover Anexo:**
    - **Ação:** Em um registro que já possui um anexo, clique na opção para remover o anexo.
    - **Resultado Esperado:** O anexo deve ser removido e a interface atualizada para refletir que não há mais um anexo associado.

---

## 6. Módulo de Relatórios

- [ ] **Gerar e Exportar Relatórios via Menu:**
    - **Ação:** Com alguns consumos cadastrados, vá para a página de relatórios.
    - **Resultado Esperado (Visualização):** Os gráficos e a tabela de resumo devem exibir as emissões totais que correspondam aos dados cadastrados.
    - **Ação:** Clique no menu "Exportar Relatório" e selecione a opção "Relatório de Emissões".
    - **Resultado Esperado (Exportação de Emissões):** Um arquivo PDF (`relatorio-emissoes.pdf`) deve ser baixado, contendo a lista consolidada.