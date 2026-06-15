import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Flag, Hand } from "lucide-react";
import { MODULES, type Module } from "@/lib/mock-data";
import { useAccessibility } from "@/lib/accessibility";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/trilha/$moduloId")({
  head: ({ params }) => {
    const m = MODULES.find((x) => x.id === params.moduloId);
    return {
      meta: [
        { title: `${m?.title ?? "Módulo"} — InclusivOn` },
        { name: "description", content: m?.summary ?? "Módulo de onboarding." },
      ],
    };
  },
  loader: ({ params }): Module => {
    const mod = MODULES.find((m) => m.id === params.moduloId);
    if (!mod) throw notFound();
    return mod;
  },
  component: ModulePage,
  notFoundComponent: () => (
    <div className="p-8">
      <p>Módulo não encontrado.</p>
      <Link to="/app/dashboard" className="text-primary underline">
        Voltar ao painel
      </Link>
    </div>
  ),
});

function ModulePage() {
  const mod = Route.useLoaderData();
  const { state } = useAccessibility();
  const idx = MODULES.findIndex((m) => m.id === mod.id);
  const next = MODULES[idx + 1];

  return (
    <div>
      <Link
        to="/app/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" /> Voltar ao painel
      </Link>

      <header className="mt-4">
        <p className="text-sm font-medium text-primary">
          Módulo {idx + 1} de {MODULES.length}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{mod.title}</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock aria-hidden className="h-4 w-4" />
          {mod.duration} • microlearning
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <figure
            aria-label={`Vídeo do módulo ${mod.title}. Audiodescrição ${
              state.audioDescription ? "ativada" : "desativada"
            }, legendas ${state.captions ? "ativadas" : "desativadas"}.`}
            className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <div
              className="grid h-full w-full place-items-center text-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), color-mix(in oklab, var(--color-primary) 50%, var(--color-accent)))",
              }}
            >
              <div className="p-8 text-primary-foreground">
                <p className="text-sm uppercase tracking-widest opacity-80">Player de vídeo</p>
                <p className="mt-2 text-2xl font-bold">{mod.title}</p>
                {state.captions && (
                  <p className="mt-6 inline-block rounded-md bg-black/70 px-3 py-1 text-sm text-white">
                    [Legenda] Esta é uma legenda de exemplo do módulo.
                  </p>
                )}
              </div>
            </div>
          </figure>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {state.captions && <Tag>Legendas (CC)</Tag>}
            {state.audioDescription && <Tag>Audiodescrição</Tag>}
            {state.libras && <Tag>Janela de Libras</Tag>}
            <Tag>Velocidade {state.playbackRate}x</Tag>
          </div>

          <section aria-labelledby="transcricao" className="mt-8 rounded-2xl border border-border bg-card p-5">
            <h2 id="transcricao" className="text-lg font-semibold">
              Transcrição completa
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mod.transcript}</p>
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button asChild variant="outline">
              <Link to="/app/barreiras">
                <Flag aria-hidden className="mr-2 h-4 w-4" />
                Reportar barreira neste conteúdo
              </Link>
            </Button>
            {next ? (
              <Button asChild size="lg">
                <Link to="/app/trilha/$moduloId" params={{ moduloId: next.id }}>
                  Próximo módulo
                  <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/app/dashboard">Concluir trilha</Link>
              </Button>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          {state.libras && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Hand aria-hidden className="h-4 w-4 text-primary" /> Intérprete de Libras
              </div>
              <div
                aria-label="Janela do intérprete de Libras"
                className="aspect-square w-full rounded-lg"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-foreground) 80%, transparent), color-mix(in oklab, var(--color-foreground) 80%, transparent) 10px, color-mix(in oklab, var(--color-foreground) 60%, transparent) 10px, color-mix(in oklab, var(--color-foreground) 60%, transparent) 20px)",
                }}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Intérprete sincronizado com o áudio.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-semibold">O que você vai aprender</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {mod.topics.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card px-3 py-1 font-medium">{children}</span>
  );
}