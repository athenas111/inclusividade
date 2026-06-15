import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_BARRIERS, type Barrier } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/barreiras")({
  head: () => ({
    meta: [
      { title: "Mapeamento de barreiras — InclusivOn" },
      {
        name: "description",
        content: "Reporte ferramentas internas inacessíveis para o RH e a TI resolverem.",
      },
    ],
  }),
  component: BarreirasPage,
});

const KEY = "inclusivon:barriers";

function BarreirasPage() {
  const [items, setItems] = useState<Barrier[]>(INITIAL_BARRIERS);
  const [tool, setTool] = useState("");
  const [desc, setDesc] = useState("");
  const [responsible, setResponsible] = useState<"RH" | "TI">("TI");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  function persist(next: Barrier[]) {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newItem: Barrier = {
      id: `b${Date.now()}`,
      tool,
      description: desc,
      responsible,
      status: "Aberto",
      reportedAt: new Date().toISOString().slice(0, 10),
    };
    persist([newItem, ...items]);
    setTool("");
    setDesc("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">Mapeamento de barreiras</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Encontrou uma ferramenta interna inacessível? Reporte aqui e a equipe responsável resolve
            antes do fim da sua integração.
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          <Download aria-hidden className="mr-2 h-4 w-4" />
          Exportar relatório
        </Button>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6"
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="text-lg font-semibold">
            Reportar nova barreira
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="tool">Ferramenta ou sistema</Label>
              <Input
                id="tool"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                placeholder="Ex.: Wiki interna, Sistema de ponto"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="desc">O que aconteceu?</Label>
              <Textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descreva a barreira encontrada."
                required
                rows={4}
                className="mt-1.5"
              />
            </div>
            <fieldset>
              <legend className="text-sm font-medium">Quem deve resolver?</legend>
              <div className="mt-2 flex gap-3">
                {(["TI", "RH"] as const).map((r) => (
                  <label
                    key={r}
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium ${
                      responsible === r
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="responsible"
                      value={r}
                      checked={responsible === r}
                      onChange={() => setResponsible(r)}
                      className="sr-only"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </fieldset>

            <Button type="submit" size="lg" className="w-full">
              <Plus aria-hidden className="mr-2 h-4 w-4" />
              Enviar relato
            </Button>

            <p aria-live="polite" className="min-h-[1.25rem] text-sm text-success">
              {submitted ? "Relato enviado. Você acompanha o status ao lado." : ""}
            </p>
          </div>
        </form>

        <section aria-labelledby="lista">
          <h2 id="lista" className="text-lg font-semibold">
            Relatos abertos ({items.length})
          </h2>
          <ul className="mt-4 space-y-3">
            {items.map((b) => (
              <li
                key={b.id}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{b.tool}</p>
                    <p className="text-xs text-muted-foreground">
                      Reportado em {b.reportedAt} • {b.responsible}
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Barrier["status"] }) {
  const styles: Record<Barrier["status"], string> = {
    Aberto: "border-warning text-foreground",
    "Em análise": "border-primary bg-accent text-accent-foreground",
    Resolvido: "border-success text-foreground",
  };
  return (
    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}