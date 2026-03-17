# Roteiro de Testes e Validação do Frontend

Este documento serve como um guia completo para a validação manual de todas as funcionalidades da interface do usuário (frontend). O objetivo é garantir que cada componente visual e cada interação do usuário funcionem conforme o esperado e se integrem corretamente com a API do backend.

---

## Preparação do Ambiente

Antes de iniciar, certifique-se de que:

1.  **O ambiente completo está rodando:** Na pasta `src/codes/backend`, execute `npm start` para iniciar todos os servidores.
2.  **Os usuários de teste existem:** Caso necessário, recrie os usuários de teste manuais executando `npm run create-test-users` em um novo terminal (na pasta do backend). Consulte o arquivo `dados-empresas-teste.md` para as credenciais.

---

## 1. Módulo de Autenticação e Acesso

- [ ] **Login com Sucesso:**
    - **Ação:** Acesse `http://localhost:3000`. Use as credenciais da "Empresa Frontend".
    - **Resultado Esperado:** Redirecionamento para a página inicial (`startPage.html`) com o nome do usuário visível no cabeçalho.

- [ ] **Login com Falha (Credenciais Inválidas):**
    - **Ação:** Tente fazer login com uma senha incorreta.
    - **Resultado Esperado:** Uma mensagem de erro "Credenciais inválidas" deve ser exibida na tela, sem redirecionamento.

- [ ] **Proteção de Rota (Acesso Direto):**
    - **Ação:** Faça logout. Tente acessar a URL `http://localhost:3000/pages/ap

- [ ] **Logout:**
    - **Ação:** Após o login, clique no botão "Sair".
    - **Resultado Esperado:** Redirecionamento para a página de login. O acesso a páginas internas deve ser bloqueado.

- [ ] **Recuperação de Senha:**
    - **Ação:** Na tela de login, clique em "Esqueci minha senha", insira um e-mail válido e siga o fluxo.
    - **Resultado Esperado:** O usuário deve conseguir definir uma nova senha e fazer login com ela.

- [ ] **Interoperabilidade com React:**
    - **Ação:** Acesse `http://localhost:3001`. Faça login com as credenciais da "Empresa React".
    - **Resultado Esperado:** Redirecionamento para a página inicial do sistema legado (`startPage.html`) com a sessão já ativa.

---

## 2. Teste Crítico: Isolamento de Dados (Single Owner)

- [ ] **Cenário de Preparação (Empresa A):**
    1.  Faça login com a **Empresa Frontend**.
    2.  Crie um registro único, como `Emissão Teste Isolamento`.
    3.  Faça logout.

- [ ] **Cenário de Validação (Empresa B):**
    1.  Faça login com a **Empresa Backend**.
    2.  Navegue até a lista de consumos.o `Emissão Teste Isolamento` **NÃO** deve estar visível.

---

## 3. Módulo de Consumo e Emissões (CRUD)

- [ ] **Registrar Consumo:**
    - **Ação:** Crie um registro de consumo de `500 kWh` (Energia) e outro de `100 Litros` (Combustível).
    - **Resultado Esperado:** Os registros devem aparecer na lista. O dashboard deve atualizar a pegada de carbono total (kgCO2e) corretamente.

- [ ] **Validação de Formulário:**
    - **Ação:** Tente criar um registro sem preencher a quantidade ou a fonte de emissão.
    - **Resultado Esperado:** Mensagens de erro devem aparecer nos campos obrigatórios, e o registro não deve ser criado.

- [ ] **Editar Consumo:**
    - **Ação:** Edite o consumo de `500 kWh` para `600 kWh`.
    - **Resultado Esperado:** O valor deve ser atualizado na lista e o total de carbono no dashboard deve ser recalculado.

- [ ] **Excluir Consumo:**
    - **Ação:** Exclua o registro de `100 Litros`.
    - **Resultado Esperado:** O registro deve sumir da lista e o cálculo total deve ser atualizado.

---

## 4. Módulo de Anexos (Upload)

- [ ] **Fazer Upload de Anexo:**
    - **Ação:** Em um registro de consumo existente, use a função de upload para anexar um arquivo PDF (ex: fatura de luz) e, em outra, um arquivo de imagem.
    - **Resultado Esperado:** A interface deve indicar que o anexo foi enviado com sucesso (ex: exibindo um ícone de clipe ou o nome do arquivo).

- [ ] **Validação de Tipo de Arquivo (Opcional/Avançado):**
    - **Ação:** Tente fazer o upload de um arquivo não permitido (ex: `.txt` ou `.zip`).
    - **Resultado Esperado:** O sistema deve exibir uma mensagem de erro "Tipo de arquivo inválido" e rejeitar o upload.

- [ ] **Excluir Anexo:**
    - **Ação:** Em uma transação que possui um anexo, use a função para removê-lo.
    - **Resultado Esperado:** A indicação do anexo na interface deve desaparecer.

---

## 5. Módulo de Metas (CRUD)

- [ ] **Criar Meta:**
    - **Ação:** Crie uma nova meta de redução (ex: "Reduzir consumo de energia em 10%").
    - **Resultado Esperado:** A meta deve aparecer na lista.

- [ ] **Editar Meta:**
    - **Ação:** Edite o título ou o valor alvo da meta criada.
    - **Resultado Esperado:** As informações devem ser atualizadas na lista.

- [ ] **Excluir Meta:**
    - **Ação:** Exclua a meta.
    - **Resultado Esperado:** A meta deve ser removida da lista.

---

## 7. Módulo de Alertas (Validação da Nova Funcionalidade)

- [ ] **Cenário de Preparação:**
    1. Faça login.
    2. Navegue até "Metas" e crie uma meta de **limite de emissão** para a categoria "Energia Elétrica" com valor de `1000 kgCO2e`.
    3. Verifique se não há nenhum alerta visível (o ícone de sino não deve ter um número).

- [ ] **Disparar o Alerta:**
    1. Navegue até "Consumo" e crie um registro na categoria "Energia Elétrica" que gere `800 kgCO2e`.
    2. Volte para a página inicial ou atualize a página. O ícone de sino ainda não deve ter alertas.
    3. Crie um segundo registro na mesma categoria que gere `300 kgCO2e` (totalizando 1100 kgCO2e).

- [ ] **Validação do Alerta:**
    - **Ação:** Atualize a página.
    - **Resultado Esperado:** O ícone de sino no cabeçalho agora deve exibir um badge com o número "1". Ao clicar no sino, um dropdown deve aparecer com a mensagem "Sua meta de emissões para a categoria 'Energia Elétrica' foi atingida!".

---

## 6. Módulo de Relatórios

- [ ] **Exportar Relatório de Emissões:**
    - **Ação:** Com alguns consumos cadastrados, vá para a página de relatórios e clique em "Exportar Relatório de Emissões".
    - **Resultado Esperado:** Um arquivo PDF chamado `relatorio-emissoes.pdf` (ou similar) deve ser baixado pelo navegador.

- [ ] **Exportar Comprovante de Registro:**