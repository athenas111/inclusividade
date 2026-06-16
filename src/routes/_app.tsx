import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Keyboard, LayoutDashboard, LifeBuoy, Settings, Sparkles } from "lucide-react";
import { useAccessibility } from "@/lib/accessibility";

export const Route = createFileRoute("/_app")({
  head: () => ({
    meta: [
      { title: "Meu painel — InclusivOn" },
      { name: "description", content: "Sua trilha de integração personalizada." },
    ],
  }),
  component: AppLayout,
});

const NAV = [
  { to: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { to: "/trilha", label: "Trilha", icon: BookOpen },
  { to: "/barreiras", label: "Barreiras", icon: LifeBuoy },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

function AppLayout() {
  const { state } = useAccessibility();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!state.onboardingDone && !state.name) {
      navigate({ to: "/login" });
    }
  }, [state.onboardingDone, state.name, navigate]);

  return (
    <div className="page-aurora min-h-dvh bg-background">
      <div className="mx-auto flex max-w-7xl">
        <aside
          aria-label="Navegação lateral"
          data-focus-hide
          className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-card px-4 py-6 lg:flex"
        >
          <Link to="/" className="mb-8 flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles aria-hidden className="h-5 w-5" />
            </span>
            InclusivOn
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.to === "/trilha"
                  ? pathname.startsWith("/trilha")
                  : pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">{state.name || "Funcionário(a)"}</p>
            <p className="mt-0.5">
              {state.profiles.length === 0
                ? "Sem perfis de acessibilidade"
                : `${state.profiles.length} perfil(s) ativo(s)`}
            </p>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("inclusivon:a11y", { detail: { action: "shortcuts" } }),
                )
              }
              className="mt-2 flex w-full items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted"
            >
              <Keyboard aria-hidden className="h-3.5 w-3.5" />
              Atalhos de teclado
              <kbd className="ml-auto rounded border border-border bg-muted px-1.5">?</kbd>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header data-focus-hide className="flex items-center justify-between border-b border-border bg-card px-6 py-3 lg:hidden">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles aria-hidden className="h-4 w-4" />
              </span>
              InclusivOn
            </Link>
            <nav aria-label="Navegação" className="flex gap-3 text-sm">
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main id="conteudo-principal" className="min-w-0 flex-1 px-6 py-8 sm:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}