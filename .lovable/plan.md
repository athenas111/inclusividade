## O que aconteceu

Na rodada anterior você pediu explicitamente "no local do gradiente, ele deve ser de dois tons de azul, também com glassmorphism" — então troquei o fundo claro do hero por um gradiente azul escuro (#2563eb → #1e40af) com painel glass branco translúcido por cima. Como o painel ficou escuro, o botão "Visão do gestor" (outline com texto branco) virou um retângulo praticamente invisível sobre o azul — não está "totalmente branco", está branco com texto branco.

A imagem que você anexou mostra o estado **anterior** a essa mudança: fundo claro com sutil degradê azul-clarinho → branco, título preto, e "Visão do gestor" como botão outline branco com texto escuro.

## Plano: voltar para o visual da foto

**Arquivo:** `src/routes/index.tsx` — seção do hero (linhas ~50–86)

1. **Remover** a `<div>` de fundo com `linear-gradient(135deg, #2563eb, #1e40af)`.
2. **Remover** o painel glassmorphism escuro (`bg-white/[0.08]`, `border-white/30`, `backdrop-blur-3xl`, `shadow-...`) que envolve o conteúdo do hero — voltar a renderizar o conteúdo direto na seção, sem card.
3. **Aplicar** na própria `<section>` um fundo claro com degradê sutil azul → branco, como na foto:
   - `background: radial-gradient(ellipse at top right, #dbeafe 0%, #ffffff 60%)` (ou linear suave equivalente), mantido via `style` para reproduzir fielmente o tom da referência.
4. **Restaurar as cores de texto claras → escuras:**
   - Badge "Design Universal…": borda `border-border`, fundo `bg-background`, texto `text-foreground`, ícone `text-primary`.
   - `<h1>`: `text-foreground` (preto/quase-preto), sem `text-white`.
   - `<p>` descrição: `text-muted-foreground`.
5. **Restaurar os botões para o estilo da foto:**
   - "Entrar como funcionário": botão primário padrão (`<Button>` sem override de cor) — fica azul com texto branco automaticamente pelo design system.
   - "Visão do gestor": `variant="outline"` padrão, **sem** classes `border-white/40 text-white hover:bg-white/15` — assim fica branco com borda cinza e texto escuro, como na imagem.
6. Manter o restante da página (seções "O problema", "Cinco perfis", cards etc.) como está — a mudança é só no hero.

## Observação

Os cards mais abaixo na página continuam com o glassmorphism aprimorado da rodada anterior — só estou desfazendo o gradiente azul do hero porque ele quebrou o contraste do botão secundário e não corresponde ao visual que você quer.