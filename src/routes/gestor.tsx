import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gestor")({
  head: () => ({
    meta: [
      { title: "Visão do gestor — InclusivOn" },
      {
        name: "description",
        content:
          "Quando uma pessoa com deficiência entra na equipe, gestor e time recebem um mini-treinamento personalizado.",
      },
      { property: "og:title", content: "Visão do gestor — InclusivOn" },
      {
        property: "og:description",
        content: "Receba bem cada novo colega com orientações práticas e específicas.",
      },
    ],
  }),
  component: GestorPage,
});

function GestorPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Início
          </Link>
          <Button asChild variant="outline">
            <Link to="/login">Entrar como funcionário</Link>
          </Button>
        </div>
      </header>

      <main id="conteudo-principal" className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Para gestores</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Você tem uma nova colega chegando na quarta-feira.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Mariana é desenvolvedora, surda sinalizante e usa Libras como primeira língua. Preparamos
          orientações curtas para você e o time receberem ela bem.
        </p>

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Mini-treinamento liberado</h2>
            <PillCard
              n={1}
              minutes={4}
              title="Comunicação com pessoas surdas"
              desc="Mantenha contato visual, fale com clareza e use a câmera ligada em reuniões para facilitar a leitura labial."
            />
            <PillCard
              n={2}
              minutes={3}
              title="Termos a evitar"
              desc="Diga 'pessoa surda', não 'surdo-mudo'. Pessoas surdas não são mudas — usam Libras."
            />
            <PillCard
              n={3}
              minutes={5}
              title="Boas práticas em reuniões"
              desc="Garanta intérprete de Libras para reuniões importantes e ative legendas automáticas nas demais."
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users aria-hidden className="h-4 w-4 text-primary" />
                Equipe Backend
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                7 pessoas concluíram • 2 pendentes
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
                <div className="h-full rounded-full bg-primary" style={{ width: "78%" }} />
              </div>
              <p className="sr-only">Progresso da equipe: 78%</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar aria-hidden className="h-4 w-4 text-primary" />
                Primeiros 30 dias
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 text-success" />
                  Reunião 1:1 com intérprete agendada
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 text-success" />
                  Legendas ativadas no Zoom da equipe
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare aria-hidden className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  Documentos do projeto revisados para texto alternativo
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function PillCard({
  n,
  minutes,
  title,
  desc,
}: {
  n: number;
  minutes: number;
  title: string;
  desc: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
        >
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{minutes} min de leitura</p>
        </div>
        <Button size="sm" variant="outline">
          Abrir
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
    </article>
  );
}