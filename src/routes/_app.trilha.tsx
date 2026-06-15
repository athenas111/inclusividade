import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { MODULES } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/trilha")({
  head: () => ({
    meta: [
      { title: "Trilha de integração — InclusivOn" },
      { name: "description", content: "Todos os módulos da sua trilha de integração." },
    ],
  }),
  component: TrilhaLayout,
});

function TrilhaLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/trilha") return <Outlet />;
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Trilha de integração</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {MODULES.length} módulos curtos. Você pode fazer na ordem que quiser.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {MODULES.map((m, i) => (
          <li key={m.id}>
            <Link
              to="/trilha/$moduloId"
              params={{ moduloId: m.id }}
              className="block h-full rounded-2xl border border-border bg-card p-5 transition hover:bg-muted"
            >
              <p className="text-xs font-medium text-primary">Módulo {i + 1}</p>
              <p className="mt-1 text-lg font-semibold">{m.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>
              <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock aria-hidden className="h-3.5 w-3.5" /> {m.duration}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}