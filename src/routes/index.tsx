import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Ear, Eye, Hand, Keyboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InclusivOn — Onboarding acessível para PCDs" },
      {
        name: "description",
        content:
          "Integração corporativa baseada em DUA. Sem barreiras desde o primeiro dia.",
      },
      { property: "og:title", content: "InclusivOn — Onboarding acessível para PCDs" },
      {
        property: "og:description",
        content: "A plataforma adapta interface, conteúdo e ritmo ao Perfil de Acessibilidade de cada pessoa.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="page-aurora min-h-dvh bg-background text-foreground">
      <header className="border-b border-border" data-focus-hide>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles aria-hidden className="h-5 w-5" />
            </span>
            <span>InclusivOn</span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden gap-6 sm:flex">
            <Link to="/gestor" className="text-sm text-muted-foreground hover:text-foreground">
              Para gestores
            </Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Entrar
            </Link>
          </nav>
          <Button asChild>
            <Link to="/login">Começar</Link>
          </Button>
        </div>
      </header>

      <main id="conteudo-principal">
        <section className="relative overflow-hidden py-10 px-4 sm:px-6">
          {/* Fundo gradiente dois tons de azul */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
            }}
          />
          {/* Painel glassmorphism sobre o gradiente */}
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/30 bg-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-3xl sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
              <CheckCircle2 aria-hidden className="h-3.5 w-3.5 text-white" />
              Design Universal para a Aprendizagem
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Onboarding que se adapta a cada pessoa — não o contrário.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              A InclusivOn é a plataforma de integração corporativa que ajusta interface, conteúdo e ritmo
              ao Perfil de Acessibilidade de quem está chegando — e prepara gestor e equipe para receber
              bem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-white/90">
                <Link to="/login">
                  Entrar como funcionário
                  <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 hover:text-white">
                <Link to="/gestor">Visão do gestor</Link>
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="problema" className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 id="problema" className="text-2xl font-bold sm:text-3xl">
              O problema que atacamos
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Processos de integração padronizados excluem PCDs logo no primeiro dia. A mensagem que passa
              é de que aquela pessoa não foi pensada. A InclusivOn troca a trilha rígida por uma
              experiência que se molda a cada perfil.
            </p>
          </div>
        </section>

        <section aria-labelledby="perfis" className="mx-auto max-w-6xl px-6 py-20">
          <h2 id="perfis" className="text-2xl font-bold sm:text-3xl">
            Cinco perfis, infinitas combinações
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A pessoa escolhe seus perfis no primeiro acesso. A plataforma aplica as adaptações em todas
            as telas, em tempo real.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              icon={<Eye aria-hidden className="h-5 w-5" />}
              title="Visual"
              desc="Compatível com leitores de tela, audiodescrição e alt-text detalhado."
            />
            <ProfileCard
              icon={<Eye aria-hidden className="h-5 w-5" />}
              title="Baixa visão"
              desc="Alto contraste, fontes maiores e zoom sem quebrar layout."
            />
            <ProfileCard
              icon={<Ear aria-hidden className="h-5 w-5" />}
              title="Auditiva"
              desc="Legendas, janela de Libras e transcrição completa."
            />
            <ProfileCard
              icon={<Sparkles aria-hidden className="h-5 w-5" />}
              title="Neurodivergência"
              desc="Modo Foco, microlearning e controle de velocidade."
            />
            <ProfileCard
              icon={<Keyboard aria-hidden className="h-5 w-5" />}
              title="Motora"
              desc="Navegação por teclado e tempo estendido em testes."
            />
            <ProfileCard
              icon={<Hand aria-hidden className="h-5 w-5" />}
              title="Via de mão dupla"
              desc="Gestor e equipe recebem mini-treinamento sobre como acolher a pessoa que chega."
            />
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Comece em 2 minutos</h2>
              <p className="mt-1 text-muted-foreground">
                Configure seu Perfil de Acessibilidade e veja a plataforma se adaptar.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/login">
                Acessar plataforma
                <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
          InclusivOn — Protótipo acadêmico sobre Políticas Afirmativas, PCDs e Trabalho.
        </div>
      </footer>
    </div>
  );
}

function ProfileCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/[0.18] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[40px] backdrop-saturate-[2] transition-colors hover:border-white/60 hover:bg-white/[0.26] dark:border-white/20 dark:bg-white/[0.10]">
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/30 blur-2xl transition-opacity group-hover:opacity-70" aria-hidden />
      <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/40 bg-white/[0.30] text-primary shadow-sm backdrop-blur-md dark:bg-white/15">
        {icon}
      </div>
      <h3 className="relative mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="relative mt-1 text-sm text-muted-foreground">{desc}</p>
    </article>
  );
}
