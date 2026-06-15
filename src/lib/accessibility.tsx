import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ProfileKey = "visual" | "low-vision" | "hearing" | "neuro" | "motor";

export type AccessibilityState = {
  profiles: ProfileKey[];
  highContrast: boolean;
  fontScale: 1 | 1.25 | 1.5 | 1.75;
  focusMode: boolean;
  libras: boolean;
  captions: boolean;
  audioDescription: boolean;
  playbackRate: 0.75 | 1 | 1.25 | 1.5;
  extendedTime: boolean;
  onboardingDone: boolean;
  name: string;
};

const DEFAULT: AccessibilityState = {
  profiles: [],
  highContrast: false,
  fontScale: 1,
  focusMode: false,
  libras: false,
  captions: true,
  audioDescription: false,
  playbackRate: 1,
  extendedTime: false,
  onboardingDone: false,
  name: "",
};

type Ctx = {
  state: AccessibilityState;
  update: (patch: Partial<AccessibilityState>) => void;
  toggleProfile: (p: ProfileKey) => void;
  applyProfilePresets: (profiles: ProfileKey[]) => void;
  reset: () => void;
};

const AccessibilityContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "inclusivon:accessibility";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
    const root = document.documentElement;
    root.classList.toggle("high-contrast", state.highContrast);
    root.classList.toggle("focus-mode", state.focusMode);
    root.style.setProperty("--font-scale", String(state.fontScale));
  }, [state]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      toggleProfile: (p) =>
        setState((s) => ({
          ...s,
          profiles: s.profiles.includes(p) ? s.profiles.filter((x) => x !== p) : [...s.profiles, p],
        })),
      applyProfilePresets: (profiles) =>
        setState((s) => {
          const next: AccessibilityState = { ...s, profiles };
          if (profiles.includes("low-vision")) {
            next.fontScale = Math.max(s.fontScale, 1.25) as AccessibilityState["fontScale"];
          }
          if (profiles.includes("hearing")) {
            next.captions = true;
            next.libras = true;
          }
          if (profiles.includes("visual")) {
            next.audioDescription = true;
          }
          if (profiles.includes("neuro")) {
            next.focusMode = true;
          }
          if (profiles.includes("motor")) {
            next.extendedTime = true;
          }
          return next;
        }),
      reset: () => setState(DEFAULT),
    }),
    [state],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility deve estar dentro de AccessibilityProvider");
  return ctx;
}

export const PROFILE_LABELS: Record<ProfileKey, { title: string; desc: string; emoji: string }> = {
  visual: {
    title: "Deficiência Visual\u00a0",
    desc: "Compatibilidade com leitores de tela, audiodescrição e textos alternativos detalhados.",
    emoji: "👁️",
  },
  "low-vision": {
    title: "Baixa visão\u00a0",
    desc: "Alto contraste, fontes maiores e zoom sem quebrar o layout.",
    emoji: "🔎",
  },
  hearing: {
    title: "Deficiência Auditiva\u00a0",
    desc: "Legendas, janela de Libras e transcrição de áudios.",
    emoji: "🤟",
  },
  neuro: {
    title: "Neurodivergência\u00a0",
    desc: "Modo Foco sem distrações, microlearning e controle de velocidade.",
    emoji: "🧠",
  },
  motor: {
    title: "Deficiência Motora",
    desc: "Navegação 100% por teclado e tempo estendido em testes.",
    emoji: "⌨️",
  },
};