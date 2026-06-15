import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { MODULES } from "@/lib/mock-data";
import { useAccessibility } from "@/lib/accessibility";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — InclusivOn" },
      { name: "description", content: "Sua trilha de integração e progresso." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state } = useAccessibility();
  const completed = 1;
  const total = MODULES.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Olá,</p>
          <h1 className="truncate text-3xl font-bold tracking-tight sm:text-4xl">
            {state.name || "seja bem-vindo(a)"} 👋
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Sua integração está adaptada ao seu perfil. Você pode pausar e voltar quando quiser.
          </p>
        </div>
        <div className="hidden shrink-0 rounded-2xl border border-border bg-card p-4 text-sm sm:block">
          <p className="text-muted-foreground">Progresso</p>
          <p className="text-2xl font-bold">{pct}%</p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles aria-hidden className="h-4 w-4 text-primary" />
            Perfil de Acessibilidade aplicado
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {state.profiles.length === 0
              ? "Você ainda não definiu perfis. Use a barra de acessibilidade ou as configurações."
              : "Estas adaptações estão ativas em toda a plataforma:"}
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {state.captions && <Badge>Legendas ativas</Badge>}
            {state.libras && <Badge>Janela de Libras</Badge>}
            {state.audioDescription && <Badge>Audiodescrição</Badge>}
            {state.highContrast && <Badge>Alto contraste</Badge>}
            {state.focusMode && <Badge>Modo Foco</Badge>}
            {state.fontScale > 1 && <Badge>Fonte {Math.round(state.fontScale * 100)}%</Badge>}
            {state.extendedTime && <Badge>Tempo estendido em testes</Badge>}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm font-semibold">Próximo passo</p>
          <p className="mt-1 text-sm text-muted-foreground">{MODULES[completed].title}</p>
          <Button asChild className="mt-4 w-full">
            <Link to="/trilha/$moduloId" params={{ moduloId: MODULES[completed].id }}>
              Continuar <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <section aria-labelledby="trilha" className="mt-10">
        <h2 id="trilha" className="text-xl font-semibold">
          Sua trilha
        </h2>
        <ol className="mt-4 space-y-3">
          {MODULES.map((m, i) => {
            const done = i < completed;
            const current = i === completed;
            return (
              <li key={m.id}>
                <Link
                  to="/trilha/$moduloId"
                  params={{ moduloId: m.id }}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                    current
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 aria-hidden className="h-6 w-6 shrink-0 text-success" />
                  ) : (
                    <Circle
                      aria-hidden
                      className={`h-6 w-6 shrink-0 ${current ? "text-primary" : "text-muted-foreground"}`}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {i + 1}. {m.title}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">{m.summary}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Clock aria-hidden className="h-3.5 w-3.5" /> {m.duration}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 text-sm">
      <CheckCircle2 aria-hidden className="h-4 w-4 text-primary" />
      {children}
    </li>
  );
}