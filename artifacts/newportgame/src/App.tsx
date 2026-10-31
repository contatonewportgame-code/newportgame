import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles } from 'lucide-react';
import kujakuCover from './assets/kujaku-ou-cover.png';
import spellcasterCover from './assets/spellcaster-cover.png';
import {
  Route,
  Switch,
  Link,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type Project = { slug: string; title: string; platform: string; kind: string; status: string; summary: string; accent: string; monogram: string; };
const projects: Project[] = [
  { slug: 'spellcaster', title: 'SpellCaster', platform: 'Master System', kind: 'Tradução PT-BR', status: 'Completo', summary: 'Uma tradução oficial Newportgame para redescobrir este clássico no seu idioma.', accent: 'gold', monogram: 'SC' },
  { slug: 'kujaku-ou', title: 'Kujaku Ou', platform: 'Sega Mark III / Master System', kind: 'Tradução + restauração técnica', status: 'Status não informado', summary: 'Tradução oficial e restauração técnica baseadas na versão japonesa.', accent: 'jade', monogram: '孔雀' },
];

function Brand() {
  return <Link href="/" className="brand" aria-label="NEWPORTGAME, início"><span className="brand-name">NEWPORTGAME</span></Link>;
}

function Header() {
  return <header className="site-header"><div className="header-inner"><Brand /></div></header>;
}

function Artwork({ project, large = false }: { project: Project; large?: boolean }) {
  const isSpellcaster = project.slug === 'spellcaster';
  return <div className={`artwork artwork-cover ${large ? 'artwork-large' : ''}`}>
    <img src={isSpellcaster ? spellcasterCover : kujakuCover}
      alt={isSpellcaster ? 'Capa original de SpellCaster para Sega Master System' : 'Capa Gold Cartridge de Kujaku Ou para Mark III / Master System'} />
  </div>;
}

function Home() {
  return <><Header /><main className="shelf-home"><p className="shelf-caption">Traduções e restaurações de jogos clássicos.</p><section className="cover-shelf" aria-label="Jogos do acervo">
    <Link className="cover-link" href="/jogos/spellcaster" aria-label="Abrir detalhes de SpellCaster"><Artwork project={projects[0]} /></Link>
    <a className="cover-link" href="/jogos/kujaku-ou" target="_blank" rel="noopener noreferrer" aria-label="Abrir detalhes de Kujaku Ou em uma nova aba"><Artwork project={projects[1]} /></a>
  </section></main></>;
}

function Detail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const complete = project.status === 'Completo';
  const related = project.slug === 'kujaku-ou' ? 'SpellCaster' : 'Kujaku Ou';
  return <><Header /><main className="detail-page"><div className="detail-crumb"><Link href="/">← Catálogo</Link><span>/</span><span>{project.title}</span></div><div className="detail-layout"><div className="detail-visual"><Artwork project={project} large /><div className="visual-note"><span>REGISTRO NEWPORTGAME</span><span>{project.slug === 'kujaku-ou' ? 'CAPA GOLD CARTRIDGE · MARK III / MASTER SYSTEM' : 'CAPA ORIGINAL · SEGA MASTER SYSTEM'}</span></div></div><div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> PROJETO OFICIAL NEWPORTGAME</div><div className={`status-pill detail-status ${complete ? 'is-ready' : 'is-prep'}`}><i />{project.status}</div><h1>{project.title}</h1><p className="detail-lead">{project.slug === 'spellcaster' ? 'Uma tradução oficial Newportgame para PT-BR, completa e pronta para preservar a experiência em português.' : 'Tradução oficial Newportgame e restauração técnica baseadas na versão japonesa.'}</p><div className="detail-facts"><div><span>PLATAFORMA</span><b>{project.platform}</b></div><div><span>TIPO DE PROJETO</span><b>{project.slug === 'spellcaster' ? 'Tradução PT-BR' : 'Tradução + restauração técnica'}</b></div><div><span>RESPONSÁVEL</span><b>Newportgame · projeto oficial</b></div><div><span>CONTEÚDO</span><b>Patches e documentação</b></div></div>
      <div className={`availability ${complete ? 'available' : 'pending'}`}><div className="availability-icon">{complete ? <Check size={17} /> : <Sparkles size={17} />}</div><div><b>{complete ? 'Materiais do projeto' : 'Materiais ainda indisponíveis'}</b><p>{complete ? 'Links para patch e documentação não foram fornecidos nesta apresentação.' : 'Nenhum link de patch ou documentação foi fornecido nesta apresentação.'}</p></div></div>
      <div className="rom-policy"><ShieldCheck size={18} /><p><b>Preservação responsável.</b> ROMs comerciais completas não são distribuídas. O acervo disponibiliza apenas patches e documentação.</p></div>
      <div className="detail-actions"><button className="unavailable-button" disabled title="Link ainda não disponível"><span>Download indisponível</span><span>EM BREVE</span></button><Link className="text-link" href={`/jogos/${project.slug === 'spellcaster' ? 'kujaku-ou' : 'spellcaster'}`}>Conheça {related} <ArrowRight size={15} /></Link></div>
      {project.slug === 'kujaku-ou' && <div className="related-note"><span>NOTA DE CONTEXTO</span><p>SpellCaster é identificado na proposta como o título ocidental relacionado a Kujaku Ou.</p><Link href="/jogos/spellcaster">Ver projeto SpellCaster <ArrowUpRight size={14} /></Link></div>}</div></div><div className="detail-bottom"><Link href="/"><ArrowLeft size={15} /> Voltar ao catálogo</Link><span>NEWPORTGAME · ARQUIVO DE PRESERVAÇÃO</span></div></main><Footer /></>;
}

function Footer() {
  return <footer className="site-footer"><Brand /><p>Clássicos preservados. Histórias em movimento.</p><div><span>© NEWPORTGAME</span><span>PATCHES E DOCUMENTAÇÃO, NUNCA ROMS COMPLETAS.</span></div></footer>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jogos/spellcaster"><Detail slug="spellcaster" /></Route>
        <Route path="/jogos/kujaku-ou"><Detail slug="kujaku-ou" /></Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
