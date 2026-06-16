import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AccessibilityProvider } from "../lib/accessibility";
import { AccessibilityBar } from "../components/AccessibilityBar";
import { KeyboardShortcutsDialog } from "../components/KeyboardShortcutsDialog";
import { useGlobalShortcuts } from "../lib/keyboard-shortcuts";
import { useState } from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "InclusivOn" },
      {
        name: "description",
        content:
          "Plataforma de integração corporativa baseada em Design Universal para a Aprendizagem (DUA). Adapta interface e conteúdo ao Perfil de Acessibilidade de cada pessoa.",
      },
      { property: "og:title", content: "InclusivOn" },
      {
        property: "og:description",
        content: "Integração corporativa que se adapta a cada pessoa — sem barreiras desde o primeiro dia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "InclusivOn" },
      { name: "description", content: "Inclusive Start is an accessible onboarding platform for diverse workforces." },
      { property: "og:description", content: "Inclusive Start is an accessible onboarding platform for diverse workforces." },
      { name: "twitter:description", content: "Inclusive Start is an accessible onboarding platform for diverse workforces." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b771c7cc-c69e-4431-8c7e-34dd7ab084ae/id-preview-da1f2cc6--98d75164-888f-497c-b881-4ca50982f0aa.lovable.app-1781546431604.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b771c7cc-c69e-4431-8c7e-34dd7ab084ae/id-preview-da1f2cc6--98d75164-888f-497c-b881-4ca50982f0aa.lovable.app-1781546431604.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <RootContent />
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

function RootContent() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  useGlobalShortcuts({
    onToggleA11yBar: () =>
      window.dispatchEvent(new CustomEvent("inclusivon:a11y", { detail: { action: "toggle" } })),
    onOpenShortcuts: () => setShortcutsOpen(true),
  });
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <AccessibilityBar />
      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}
