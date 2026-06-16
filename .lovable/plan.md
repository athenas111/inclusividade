## Objetivo
Deixar o gradiente do hero section com um azul claro mais forte/ vibrante como o usuário pediu, e publicar o site no domínio customizado.

## O que será feito
1. **src/routes/index.tsx** — Alterar o `background` do `<section>` inicial de `radial-gradient(ellipse at top right, #dbeafe 0%, #ffffff 60%)` para um azul mais intenso, por exemplo: `radial-gradient(ellipse at top right, #60a5fa 0%, #ffffff 70%)` (blue-400 para branco), mantendo o visual claro mas com presença mais marcante do azul.
2. **Publicar** — Executar `preview_ui--publish` para atualizar o domínio https://inclusividadediversidade.live.

## Nota técnica
- Nenhuma outra alteração de layout ou cor será feita.
- Todos os metadados OG/title já estão corretos no `__root.tsx`.