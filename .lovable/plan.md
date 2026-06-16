## Objetivo
1. Garantir que o botão de acessibilidade (canto inferior direito) **nunca desapareça** durante a navegação.
2. Adicionar uma camada concreta de **navegação por teclado** para deficientes motores, hoje só prometida no perfil "motor".

---

## 1. Botão de acessibilidade sempre visível

O `AccessibilityBar` já é renderizado no `__root.tsx`, então persiste entre rotas. O sumiço acontece porque:

- No **Modo Foco** o CSS `.focus-mode [data-focus-hide="true"] { display:none }` é global, e qualquer wrapper futuro com esse atributo esconde o botão.
- Em páginas com `aurora-panel` / cards com `backdrop-blur` ou `z-index` altos (ex.: hero da landing, sidebar do `_app`), o botão fica atrás visualmente.
- Em viewport mobile, o painel aberto (w-80) pode sair da tela e parecer "sumir" ao rolar.

**Mudanças (`src/components/AccessibilityBar.tsx` + `src/styles.css`):**

- Subir o container para `z-[100]` e adicionar `pointer-events-auto`.
- Trocar `data-focus-hide="false"` por uma regra CSS dedicada `.a11y-bar { display: block !important }` que sobrescreve `.focus-mode` e qualquer `hidden` herdado.
- Garantir `position: fixed` mesmo em containers com `transform`/`filter` movendo o botão para fora do `<RootComponent>` direto no `<body>` via `createPortal`, evitando que `aurora-panel` (que usa `isolation`) crie um novo stacking context que oculte o botão.
- Em telas estreitas, painel aberto usa `max-w-[calc(100vw-2rem)]` e `max-h-[calc(100dvh-6rem)] overflow-auto`.

---

## 2. Recursos reais de navegação por teclado

Adicionar três coisas integradas:

### a) Atalhos globais (`src/lib/keyboard-shortcuts.ts` + hook em `__root.tsx`)
- `Alt+1` Painel · `Alt+2` Trilha · `Alt+3` Barreiras · `Alt+4` Configurações
- `Alt+A` abrir/fechar barra de acessibilidade
- `Alt+C` alternar alto contraste · `Alt+F` Modo Foco · `Alt+M` aumentar fonte / `Alt+N` diminuir
- `?` abrir modal "Atalhos de teclado"
- `Esc` fecha modais/painéis abertos
- Respeita `prefers-reduced-motion` e ignora atalhos quando o foco está em input/textarea/contenteditable.

### b) Modal "Atalhos de teclado" (`src/components/KeyboardShortcutsDialog.tsx`)
- Lista completa dos atalhos, agrupados (Navegação · Acessibilidade · Geral).
- Aberto via `?`, via novo botão dentro da barra de acessibilidade ("⌨️ Atalhos de teclado") e via link no rodapé do `_app` sidebar.
- Usa `Dialog` do shadcn (foco trapado, ESC fecha, ARIA correto).

### c) Indicador de foco reforçado quando o perfil "motor" está ativo
- Em `src/styles.css`, quando `html.profile-motor` existe, aumentar `outline: 4px solid var(--ring); outline-offset: 4px` e adicionar uma "ring zone" `:focus-visible { box-shadow: 0 0 0 6px color-mix(in oklab, var(--ring) 40%, transparent) }`.
- Em `accessibility.tsx`, refletir o perfil ativo em classes no `<html>` (`profile-motor`, `profile-visual`, etc.) dentro do `useEffect` existente, sem mudar a API.
- Skip-links extras no `_app.tsx`: "Pular para navegação", "Pular para conteúdo" (o segundo já existe).

---

## Detalhes técnicos

Arquivos a criar:
- `src/components/KeyboardShortcutsDialog.tsx`
- `src/lib/keyboard-shortcuts.ts` (hook `useGlobalShortcuts`)

Arquivos a editar:
- `src/components/AccessibilityBar.tsx` — portal, z-index, item "Atalhos de teclado", botão "Mostrar atalhos".
- `src/routes/__root.tsx` — montar `useGlobalShortcuts()` e `<KeyboardShortcutsDialog/>`.
- `src/lib/accessibility.tsx` — toggles via classes `profile-*`.
- `src/styles.css` — regra `.a11y-bar` indestrutível, foco reforçado para `profile-motor`.
- `src/routes/_app.tsx` — link "⌨️ Atalhos (?)" no rodapé do sidebar.

Sem mudanças no backend, sem novas dependências (usa `Dialog` shadcn já instalado).

---

## Fora do escopo
- Não mexer no gradiente da landing nem no glassmorphism.
- Não alterar rotas, autenticação ou exportação para GitHub.
