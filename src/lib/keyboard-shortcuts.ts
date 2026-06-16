import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAccessibility } from "@/lib/accessibility";

const FONT_STEPS = [1, 1.25, 1.5, 1.75] as const;

type Opts = {
  onToggleA11yBar?: () => void;
  onOpenShortcuts?: () => void;
};

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return false;
}

export function useGlobalShortcuts(opts: Opts = {}) {
  const navigate = useNavigate();
  const { state, update } = useAccessibility();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;

      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        opts.onOpenShortcuts?.();
        return;
      }

      if (!e.altKey || e.ctrlKey || e.metaKey) return;

      const key = e.key.toLowerCase();
      switch (key) {
        case "1":
          e.preventDefault();
          navigate({ to: "/dashboard" });
          break;
        case "2":
          e.preventDefault();
          navigate({ to: "/trilha" });
          break;
        case "3":
          e.preventDefault();
          navigate({ to: "/barreiras" });
          break;
        case "4":
          e.preventDefault();
          navigate({ to: "/configuracoes" });
          break;
        case "a":
          e.preventDefault();
          opts.onToggleA11yBar?.();
          break;
        case "c":
          e.preventDefault();
          update({ highContrast: !state.highContrast });
          break;
        case "f":
          e.preventDefault();
          update({ focusMode: !state.focusMode });
          break;
        case "m": {
          e.preventDefault();
          const idx = FONT_STEPS.indexOf(state.fontScale);
          const next = FONT_STEPS[Math.min(FONT_STEPS.length - 1, idx + 1)];
          update({ fontScale: next });
          break;
        }
        case "n": {
          e.preventDefault();
          const idx = FONT_STEPS.indexOf(state.fontScale);
          const next = FONT_STEPS[Math.max(0, idx - 1)];
          update({ fontScale: next });
          break;
        }
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, state, update, opts]);
}

export const SHORTCUTS = {
  navegacao: [
    { keys: ["Alt", "1"], label: "Ir para Painel" },
    { keys: ["Alt", "2"], label: "Ir para Trilha" },
    { keys: ["Alt", "3"], label: "Ir para Barreiras" },
    { keys: ["Alt", "4"], label: "Ir para Configurações" },
  ],
  acessibilidade: [
    { keys: ["Alt", "A"], label: "Abrir/fechar barra de acessibilidade" },
    { keys: ["Alt", "C"], label: "Alternar alto contraste" },
    { keys: ["Alt", "F"], label: "Alternar Modo Foco" },
    { keys: ["Alt", "M"], label: "Aumentar tamanho da fonte" },
    { keys: ["Alt", "N"], label: "Diminuir tamanho da fonte" },
  ],
  geral: [
    { keys: ["?"], label: "Mostrar esta lista de atalhos" },
    { keys: ["Tab"], label: "Avançar para o próximo elemento" },
    { keys: ["Shift", "Tab"], label: "Voltar ao elemento anterior" },
    { keys: ["Esc"], label: "Fechar diálogos e menus abertos" },
  ],
} as const;
