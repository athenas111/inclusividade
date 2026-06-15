import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/lib/accessibility";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — InclusivOn" },
      { name: "description", content: "Acesse a plataforma de onboarding acessível InclusivOn." },
      { property: "og:title", content: "Entrar — InclusivOn" },
      { property: "og:description", content: "Acesse a plataforma de onboarding acessível InclusivOn." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { state, update } = useAccessibility();
  const [email, setEmail] = useState("joao.silva@empresa.com");
  const [name, setName] = useState(state.name || "João Silva");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    update({ name });
    if (state.onboardingDone) navigate({ to: "/app/dashboard" });
    else navigate({ to: "/onboarding/perfil" });
  }

  return (
    <div className="min-h-dvh bg-background p-4">
      <main
        id="conteudo-principal"
        className="mx-auto grid min-h-[calc(100dvh-2rem)] max-w-6xl overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2"
      >
        <aside
          aria-hidden
          data-focus-hide
          className="relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, color-mix(in oklab, var(--color-primary) 60%, var(--color-accent)) 100%)",
          }}
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest opacity-80">Boas-vindas</p>
            <p className="mt-3 text-3xl font-bold leading-tight">
              Sua integração começa do jeito que faz sentido pra você.
            </p>
          </div>
        </aside>

        <section className="flex flex-col justify-center p-8 sm:p-12">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground lg:hidden">
            <Sparkles aria-hidden className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Entrar na InclusivOn</h1>
          <p className="mt-2 text-muted-foreground">
            Protótipo demonstrativo — qualquer e-mail funciona.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              {state.onboardingDone ? "Continuar onboarding" : "Configurar meu perfil"}
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Ao entrar, você concorda em compartilhar suas preferências de acessibilidade com o time de RH
            apenas para fins de adaptação do ambiente.
          </p>
        </section>
      </main>
    </div>
  );
}