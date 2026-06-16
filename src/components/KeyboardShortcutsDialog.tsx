import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GROUPS: Array<{ title: string; items: readonly { keys: readonly string[]; label: string }[] }> = [
  { title: "Navegação", items: SHORTCUTS.navegacao },
  { title: "Acessibilidade", items: SHORTCUTS.acessibilidade },
  { title: "Geral", items: SHORTCUTS.geral },
];

export function KeyboardShortcutsDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Atalhos de teclado</DialogTitle>
          <DialogDescription>
            Use estes atalhos para navegar e configurar a acessibilidade sem usar o mouse.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {GROUPS.map((g) => (
            <section key={g.title}>
              <h3 className="mb-2 text-sm font-semibold text-foreground">{g.title}</h3>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="flex gap-1">
                      {item.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="inline-flex min-w-7 items-center justify-center rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Pressione <kbd className="rounded border border-border bg-muted px-1.5">?</kbd> a qualquer momento para reabrir esta janela.
        </p>
      </DialogContent>
    </Dialog>
  );
}
