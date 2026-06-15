
# Plataforma InclusivOn — Onboarding Acessível para PCDs

Protótipo (frontend only, mock data) de uma plataforma de integração corporativa baseada em **Design Universal para a Aprendizagem (DUA)**, que adapta interface e conteúdo ao Perfil de Acessibilidade do funcionário, e ainda prepara gestor e equipe para recebê-lo.

## Escopo do protótipo

Sem backend nesta primeira versão (estado mantido em `localStorage`). O foco é demonstrar fluxo, adaptações visuais e a "via de mão dupla" (funcionário ↔ gestor/equipe).

## Direção visual

- Estética **clara, limpa e acessível** — inspirada nas referências enviadas (cards arejados estilo "Nervous System", hero suave estilo "Brix", split-screen do "Create an account").
- Paleta neutra com 1 acento (azul) e tokens semânticos em `src/styles.css` (oklch), respeitando contraste WCAG AA em ambos os temas.
- Tipografia sans-serif legível (Inter / system-ui), espaçamento generoso, foco visível forte, áreas de toque ≥ 44px.
- Componentes shadcn/ui (Radix) — ARIA correto por padrão.

## Estrutura de rotas (TanStack Start)

```
/                         Landing — explica o problema e o conceito DUA
/login                    Split-screen (mock, sem auth real)
/onboarding/perfil        Wizard do Perfil de Acessibilidade (passo 1-4)
/app                      Layout autenticado (sidebar + topbar)
  /app/dashboard          Trilha de integração + progresso + barreiras reportadas
  /app/trilha/$moduloId   Player de módulo (vídeo mock, legendas, Libras, transcrição)
  /app/barreiras          Mapeamento de Barreiras (reportar/listar)
  /app/configuracoes      Editar Perfil de Acessibilidade a qualquer momento
/gestor                   Visão do gestor — mini-treinamento liberado p/ a equipe
```

Cada rota com `head()` próprio (title, description, og) — sem âncoras como navegação principal.

## Perfil de Acessibilidade (núcleo do protótipo)

Wizard inicial pergunta preferências; o resultado vira um objeto persistido e aplicado globalmente via `AccessibilityProvider` (Context + `localStorage`).

Perfis e adaptações aplicadas **de verdade na UI** do protótipo:

| Perfil | O que muda na interface |
|---|---|
| Deficiência Visual (cegueira) | Estrutura semântica reforçada, skip links, `aria-live` para mudanças, foco em landmarks, badge "Audiodescrição ativa" nos vídeos, alt-text expandido |
| Baixa visão / Idosos | Toggle Alto Contraste (tema dedicado preto/amarelo), controle de tamanho de fonte (100/125/150/175%), zoom sem quebrar layout (uso de `rem` + `clamp`) |
| Surdez | Legendas (CC) ativas por padrão no player, janela de Libras (placeholder de vídeo), transcrição textual expansível abaixo do vídeo |
| Neurodivergência (TDAH/Autismo) | Modo Foco (remove animações via `prefers-reduced-motion` forçado, oculta banners/pop-ups, simplifica sidebar), conteúdo em microlearning (3–5 min), controle de velocidade (0.75x/1x/1.25x/1.5x) |
| Deficiência Motora | Atalhos de teclado globais (`?` abre cheatsheet), navegação 100% por teclado já garantida pelos componentes Radix, tempo estendido em quizzes (timer configurável) |

O usuário pode combinar perfis (checkbox múltiplo) — as adaptações se acumulam.

Barra de Acessibilidade fixa (canto da tela), sempre visível, permite ajustar contraste, fonte, modo foco e Libras sem precisar voltar às configurações.

## Trilha de integração (mock)

5–6 módulos: "Boas-vindas", "Cultura da empresa", "Código de conduta", "Segurança da informação", "Benefícios", "Quiz final". Cada módulo tem:

- Player de vídeo (mock com `<video>` + faixa de legendas WebVTT de exemplo)
- Painel lateral: transcrição, Libras, audiodescrição (badges/toggles)
- Controle de velocidade e tamanho de legenda
- Botão "Reportar barreira neste conteúdo" → alimenta `/app/barreiras`

## Diferenciais (via de mão dupla)

1. **Onboarding do Gestor/Equipe** (`/gestor`): card destacando "Novo colega chegando: João — Perfil Auditivo" + mini-curso de 3 pílulas (Libras básico, termos a evitar, boas práticas de reunião). Pré-preenchido com dados mock.
2. **Mapeamento de Barreiras** (`/app/barreiras`): formulário para o funcionário reportar ferramentas internas inacessíveis. Lista com status (Aberto / Em análise / Resolvido) e destinatário (RH / TI). Gera "relatório" exportável (apenas visual no protótipo).

## Detalhes técnicos

- **Stack**: TanStack Start já configurado, Tailwind v4, shadcn/ui, React Context para perfil de acessibilidade.
- **Persistência**: `localStorage` (`inclusivon:profile`, `inclusivon:progress`, `inclusivon:barriers`). Sem Lovable Cloud nesta fase — pode ser adicionado depois para auth/persistência real.
- **Tokens de design** em `src/styles.css`: novos temas `:root`, `.dark`, `.high-contrast`; variáveis para escala tipográfica (`--font-scale`) aplicadas em `html { font-size: calc(16px * var(--font-scale)) }`.
- **Acessibilidade técnica**:
  - Um único `<main>` por rota
  - `lang="pt-BR"` no `<html>`
  - Skip link no `__root.tsx`
  - Ícones-só-de-ícone com `aria-label`
  - `prefers-reduced-motion` respeitado + override manual no Modo Foco
  - Foco visível com `outline` de 3px no token de acento
- **Sem backend protegido** → sem `requireSupabaseAuth`, sem server functions nesta versão.

## O que NÃO entra no protótipo

- Autenticação real, leitor de tela embutido (usamos compatibilidade nativa), tradução automática para Libras (placeholder visual), persistência em banco, multi-tenant. Tudo isso fica como evolução futura.

## Entregáveis ao final

1. Landing explicando o problema e a solução
2. Fluxo completo: Login → Wizard de Perfil → Dashboard → Módulo → Reportar Barreira
3. Visão do Gestor com mini-treinamento
4. Barra de Acessibilidade global funcional (contraste, fonte, foco, Libras)
5. Dados mock realistas em português
