
# Refinar fundos e gradientes (mantendo acessibilidade)

## Diagnóstico

- **Fundo branco já é o padrão** em todas as páginas (`--background: oklch(0.99 0.005 250)`). O que parece "preto/vazio" no mobile da rota `/login` é o painel gradiente que está escondido em telas < 1024px (`hidden lg:flex`) — sobra só o formulário branco.
- **Os gradientes da landing existem mas estão sutis demais** (opacidade 18% em radial). Quase não se veem no fundo claro.
- **Outras telas (dashboard, módulo, barreiras, configurações, gestor) não têm gradiente nenhum** — usam só cards lisos. Visualmente "secas" comparadas às referências (Brix/Create-an-account).
- **Alto contraste continua sobrescrevendo tudo** para fundo preto + texto amarelo (correto e mantido).

## Páginas já implementadas (confirmação)

Todas as 9 rotas existem com conteúdo:

| Rota | Status |
|---|---|
| `/` (landing) | feito |
| `/login` | feito |
| `/onboarding/perfil` (wizard 3 passos) | feito |
| `/gestor` | feito |
| `/app/dashboard` | feito |
| `/app/trilha` (índice de módulos) | feito |
| `/app/trilha/$moduloId` (player) | feito |
| `/app/barreiras` | feito |
| `/app/configuracoes` | feito |

Se você sente que falta alguma seção, me diga qual — me parece que o que estava faltando é só **acabamento visual**.

## Mudanças que vou fazer

### 1. Gradientes claros visíveis em todas as páginas

Criar um wrapper `<PageBackground>` (ou variantes de utilitário no `styles.css`) com gradiente suave azul-lilás:

```
radial-gradient(80% 60% no topo direito, primary 25%)
+ radial-gradient(60% 50% embaixo esquerda, accent 50%)
+ fundo branco base
```

Aplicar em: landing, login (área do formulário), onboarding wizard, gestor.

### 2. Login com painel gradiente também no mobile

No `/login`, em telas < 1024px, mostrar uma faixa gradiente no topo (h-48) com o ícone e o título "Boas-vindas" — em vez de esconder completamente o aside. Em desktop continua split-screen.

### 3. Cards e headers do app com toque de gradiente

- Dashboard: header com gradiente suave em vez de fundo chapado; card "Próximo passo" com leve degradê azul→accent.
- Player de módulo (`/app/trilha/$id`): manter o gradiente forte só dentro do "player" (já tem), mas adicionar um halo sutil ao redor da página.
- Barreiras e configurações: cabeçalho com gradiente sutil decorativo (à direita, `data-focus-hide` para sumir no Modo Foco).

### 4. Garantir acessibilidade

- Todos os gradientes vão em elementos com `data-focus-hide` ou `aria-hidden` — somem no **Modo Foco** e não atrapalham leitores de tela.
- O tema `.high-contrast` continua substituindo o fundo para preto + amarelo (texto sempre tem contraste AAA).
- Nenhum texto sobre gradiente que comprometa contraste — gradientes ficam só em fundos/decorativos.

## O que NÃO muda

- Tema padrão segue **claro** (fundo branco).
- Tokens semânticos permanecem (`bg-background`, `text-foreground`).
- Alto contraste mantém preto/amarelo.
- Conteúdo, rotas e fluxo permanecem iguais.

## Resultado esperado

Visual mais próximo das referências (Brix, painel split-screen), com degradê azul-lilás respirando em todas as páginas, sem perder legibilidade nem quebrar Alto Contraste / Modo Foco.
