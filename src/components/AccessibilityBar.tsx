import { useState } from "react";
import { Accessibility, Contrast, Eye, Hand, Minus, Plus, X, Zap } from "lucide-react";
import { useAccessibility } from "@/lib/accessibility";
import { Button } from "@/components/ui/button";

const FONT_STEPS: Array<1 | 1.25 | 1.5 | 1.75> = [1, 1.25, 1.5, 1.75];

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const { state, update } = useAccessibility();

  const fontIndex = FONT_STEPS.indexOf(state.fontScale);

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden" data-focus-hide="false">
      {open ? (
        <div
          role="dialog"
          aria-label="Barra de acessibilidade"
          className="w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-card-foreground">Acessibilidade</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Fechar barra de acessibilidade"
              className="h-9 w-9"
            >
              <X aria-hidden className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <ToggleRow
              icon={<Contrast aria-hidden className="h-5 w-5" />}
              label="Alto contraste"
              active={state.highContrast}
              onClick={() => update({ highContrast: !state.highContrast })}
            />
            <ToggleRow
              icon={<Zap aria-hidden className="h-5 w-5" />}
              label="Modo Foco"
              active={state.focusMode}
              onClick={() => update({ focusMode: !state.focusMode })}
            />
            <ToggleRow
              icon={<Hand aria-hidden className="h-5 w-5" />}
              label="Janela de Libras"
              active={state.libras}
              onClick={() => update({ libras: !state.libras })}
            />
            <ToggleRow
              icon={<Eye aria-hidden className="h-5 w-5" />}
              label="Audiodescrição"
              active={state.audioDescription}
              onClick={() => update({ audioDescription: !state.audioDescription })}
            />

            <div className="rounded-lg border border-border p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Tamanho da fonte</span>
                <span className="text-xs text-muted-foreground" aria-live="polite">
                  {Math.round(state.fontScale * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Diminuir tamanho da fonte"
                  disabled={fontIndex === 0}
                  onClick={() => update({ fontScale: FONT_STEPS[Math.max(0, fontIndex - 1)] })}
                  className="h-10 w-10"
                >
                  <Minus aria-hidden className="h-4 w-4" />
                </Button>
                <div className="flex-1 rounded-md bg-muted px-3 py-2 text-center text-sm">
                  Aa
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Aumentar tamanho da fonte"
                  disabled={fontIndex === FONT_STEPS.length - 1}
                  onClick={() =>
                    update({ fontScale: FONT_STEPS[Math.min(FONT_STEPS.length - 1, fontIndex + 1)] })
                  }
                  className="h-10 w-10"
                >
                  <Plus aria-hidden className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          aria-label="Abrir barra de acessibilidade"
          className="h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Accessibility aria-hidden className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-xs font-semibold">{active ? "Ativo" : "Inativo"}</span>
    </button>
  );
}