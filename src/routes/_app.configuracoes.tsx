import { createFileRoute } from "@tanstack/react-router";
import { PROFILE_LABELS, useAccessibility, type ProfileKey } from "@/lib/accessibility";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — InclusivOn" },
      { name: "description", content: "Ajuste seu Perfil de Acessibilidade a qualquer momento." },
    ],
  }),
  component: ConfigPage,
});

const PROFILES = Object.keys(PROFILE_LABELS) as ProfileKey[];

function ConfigPage() {
  const { state, toggleProfile, applyProfilePresets, reset } = useAccessibility();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Configurações de acessibilidade</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Mude seus perfis sempre que precisar. As adaptações se aplicam imediatamente.
      </p>

      <section aria-labelledby="perfis" className="mt-8">
        <h2 id="perfis" className="text-lg font-semibold">
          Perfis ativos
        </h2>
        <div className="mt-4 space-y-3">
          {PROFILES.map((key) => {
            const meta = PROFILE_LABELS[key];
            const checked = state.profiles.includes(key);
            return (
              <label
                key={key}
                htmlFor={`cfg-${key}`}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                  checked ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"
                }`}
              >
                <Checkbox
                  id={`cfg-${key}`}
                  checked={checked}
                  onCheckedChange={() => toggleProfile(key)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold"><span aria-hidden>{meta.emoji}</span>{meta.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{meta.desc}</p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => applyProfilePresets(state.profiles)}>
            Reaplicar adaptações dos perfis
          </Button>
          <Button variant="outline" onClick={reset}>
            Restaurar padrões
          </Button>
        </div>
      </section>
    </div>
  );
}