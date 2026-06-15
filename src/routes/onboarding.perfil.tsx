import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PROFILE_LABELS, useAccessibility, type ProfileKey } from "@/lib/accessibility";

export const Route = createFileRoute("/onboarding/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil de Acessibilidade — InclusivOn" },
      {
        name: "description",
        content: "Configure como você prefere usar a plataforma. Você pode mudar a qualquer momento.",
      },
      { property: "og:title", content: "Perfil de Acessibilidade — InclusivOn" },
      {
        property: "og:description",
        content: "Configure como você prefere usar a plataforma. Você pode mudar a qualquer momento.",
      },
    ],
  }),
  component: OnboardingWizard,
});

const PROFILES = Object.keys(PROFILE_LABELS) as ProfileKey[];

function OnboardingWizard() {
  const { state, update, applyProfilePresets } = useAccessibility();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<ProfileKey[]>(state.profiles);

  function toggle(p: ProfileKey) {
    setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  }

  function finish() {
    applyProfilePresets(selected);
    update({ onboardingDone: true });
    navigate({ to: "/dashboard" });
  }

  const steps = [
    {
      title: "Olá! Vamos personalizar sua experiência.",
      desc: "Em poucos passos, a plataforma vai se adaptar a você. Nenhuma dessas informações é obrigatória — você pode pular ou mudar depois.",
    },
    {
      title: "Quais perfis melhor descrevem você?",
      desc: "Pode escolher mais de um. Combinamos as adaptações automaticamente.",
    },
    {
      title: "Tudo pronto.",
      desc: "Aplicamos as adaptações que fazem sentido para os perfis que você marcou. Você pode ajustar tudo na barra de acessibilidade ou em Configurações.",
    },
  ];

  return (
    <div className="page-aurora min-h-dvh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar ao início
          </Link>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Passo {step + 1} de {steps.length}
          </p>
        </div>
      </header>

      <main id="conteudo-principal" className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight">{steps[step].title}</h1>
          <p className="mt-3 text-muted-foreground">{steps[step].desc}</p>

          {step === 1 && (
            <fieldset className="mt-8 space-y-3">
              <legend className="sr-only">Perfis de acessibilidade</legend>
              {PROFILES.map((key) => {
                const meta = PROFILE_LABELS[key];
                const checked = selected.includes(key);
                return (
                  <label
                    key={key}
                    htmlFor={`profile-${key}`}
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                      checked
                        ? "border-primary bg-accent"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <Checkbox
                      id={`profile-${key}`}
                      checked={checked}
                      onCheckedChange={() => toggle(key)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold"><span aria-hidden>{meta.emoji}</span>{meta.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{meta.desc}</p>
                    </div>
                  </label>
                );
              })}
            </fieldset>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-3">
              {selected.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Você não marcou nenhum perfil. Sem problema — a plataforma funciona normalmente e você
                  pode ajustar depois.
                </p>
              ) : (
                selected.map((k) => (
                  <div
                    key={k}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <CheckCircle2 aria-hidden className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{PROFILE_LABELS[k].title}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)} size="lg">
                Continuar
                <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={finish} size="lg">
                Ir para meu painel
                <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}