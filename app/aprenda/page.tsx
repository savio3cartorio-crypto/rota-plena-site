import type { Metadata } from "next";
import Link from "next/link";
import { PortalPage } from "../components/PortalChrome";

export const metadata: Metadata = {
  title: "Aprenda",
  description: "Guias práticos de caravanismo, car camping e motorhome, da primeira viagem à vida sobre rodas.",
};

const paths = [
  { number: "01", title: "Comece aqui", text: "Car camping, escolha do veículo, aluguel, primeira viagem e o que realmente precisa estar pronto.", count: "7 guias", href: "/blog/car-camping-liberdade-porta-malas" },
  { number: "02", title: "Planejamento e pernoite", text: "Rota, ritmo, orçamento, paradas e avaliação consciente de locais.", count: "8 guias", href: "/blog/escolher-pernoite-seguro" },
  { number: "03", title: "Autonomia e manutenção", text: "Água, energia, gás, pneus, mecânica e rotina de cuidados.", count: "10 guias", href: "/ferramentas" },
  { number: "04", title: "Família e pets", text: "Saúde, transporte seguro, calor, pausas, hospedagem e convivência para viajar com quem depende de você.", count: "Guia completo", href: "/blog/viajar-com-pets" },
  { number: "05", title: "Segurança e responsabilidade", text: "Decisões, regras, meio ambiente, dados e plano alternativo.", count: "7 guias", href: "/blog/escolher-pernoite-seguro" },
  { number: "06", title: "Preparação e vida sobre rodas", text: "Documentos offline, organização, histórias e reflexões sobre liberdade e presença.", count: "5 conteúdos", href: "/blog/documentos-e-copias-offline" },
];

export default function AprendaPage() {
  return <PortalPage><section className="portal-page-hero learn-portal-hero"><div><p className="eyebrow">BIBLIOTECA ROTA PLENA</p><h1>Aprender é uma forma de viajar melhor.</h1><p>Guias, conteúdos e trilhas para transformar dúvida em autonomia — com português claro, precisão e responsabilidade.</p></div></section><section className="portal-inner"><div className="learn-intro"><div><p className="eyebrow dark">ESCOLHA UMA TRILHA</p><h2>Da primeira dúvida à vida inteira sobre rodas.</h2></div><p>Conteúdo organizado por momento e necessidade. A informação essencial de segurança permanece aberta para todos.</p></div><div className="path-grid">{paths.map((path) => <Link href={path.href} key={path.number}><span>{path.number}</span><small>{path.count}</small><h2>{path.title}</h2><p>{path.text}</p><b>Explorar conteúdo →</b></Link>)}</div></section><section className="learn-featured"><div className="portal-inner"><div><p className="eyebrow">COMECE COM O QUE VOCÊ JÁ TEM</p><h2>Car camping: a liberdade que cabe no porta-malas.</h2><p>Uma porta de entrada simples para a estrada — com inspiração, três níveis de adaptação, pernoite responsável e orientação sobre modificações no veículo.</p><Link className="button button-primary" href="/blog/car-camping-liberdade-porta-malas">Ler artigo completo →</Link></div><aside><b>Do texto para a estrada</b><span>✓ Entenda o car camping</span><span>✓ Escolha seu nível de adaptação</span><span>✓ Organize tudo com segurança</span><span>✓ Encontre locais de pernoite</span><span>✓ Planeje uma primeira rota curta</span></aside></div></section></PortalPage>;
}
