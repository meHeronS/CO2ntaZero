# Template padrão da aplicação

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="03-Metodologia.md"> Metodologia</a>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

A identidade visual do CO2ntaZero foi desenvolvida baseando-se nos princípios do Material Design, priorizando a clareza na visualização de dados financeiros e ambientais para usuários com pouca afinidade tecnológica.

### 1. Paleta de Cores e Semântica

**Paleta de Cores:**
- **Verde Principal (#2ECC71):** Utilizado em botões de ação (CTA) e indicadores positivos.
- **Cinza Escuro (#2C3E50):** Utilizado em textos e menus laterais.
- **Vermelho Alerta (#E74C3C):** Exclusivo para notificações de anomalias.

### 2. Tipografia
- Fonte primária: *Inter* ou *Roboto*, garantindo leitura agradável em interfaces ricas em dados numéricos.
- Títulos (H1, H2): Fontes em peso *Bold* (700).
- Corpo de Texto: Fontes em peso *Regular* (400) com tamanho mínimo de 16px para garantir acessibilidade.

### 3. Estrutura de Layout (Grid)
- **Navegação (Sidebar/Header):** Menu lateral colapsável em desktop e um "Hamburger Menu" na versão mobile.
- **Área de Conteúdo (Main):** Container centralizado responsivo, adotando um sistema de grid de 12 colunas para exibição dos *Cards* de indicadores e gráficos.

### 4. Componentes UI Base
- **Botões (Call to Action):** Cantos levemente arredondados (`border-radius: 8px`), com feedback visual (hover/active) escurecendo a cor principal em 10%.
- **Cards de Dados:** Fundo branco (`#FFFFFF`) com sombra leve (`box-shadow`), destacando as métricas do fundo cinza claro (`#F8F9FA`) da aplicação.

> **Links úteis**:
> - CSS website layout (W3Schools)
> - Website page layouts
> - Perfect liquid layout
> - How and why icons improve your web design
