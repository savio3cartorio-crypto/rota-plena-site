import type { Metadata } from "next";
import CookieNotice from "./components/CookieNotice";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "./site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rota Plena — Portal do Caravanismo Brasileiro", template: "%s | Rota Plena" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Sávio Antonio Americano", url: absoluteUrl("/sobre") }],
  creator: "Sávio Antonio Americano",
  publisher: SITE_NAME,
  category: "Viagens e caravanismo",
  keywords: ["caravanismo", "car camping", "motorhome", "camping", "rotas", "pontos de apoio", "viagem sobre rodas"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: "Rota Plena — Portal do Caravanismo Brasileiro",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/rota-plena-hero.jpg", width: 1536, height: 1024, alt: "Rota Plena — caravanismo, rotas e comunidade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rota Plena — Portal do Caravanismo Brasileiro",
    description: SITE_DESCRIPTION,
    images: ["/rota-plena-hero.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: { "@type": "ImageObject", url: absoluteUrl("/rota-plena-logo.png") },
                  founder: { "@type": "Person", name: "Sávio Antonio Americano" },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  inLanguage: "pt-BR",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/mapa?busca={search_term_string}` },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
      >
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
