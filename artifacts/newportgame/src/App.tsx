import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Search, ShieldCheck, Sparkles } from 'lucide-react';
import kujakuCover from '@assets/CAPA3_1793402525883.png';
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
  return <Link href="/" className="brand" aria-label="NEWPORTGAME, início"><span className="brand-name">NEWPORTGAME</span><small>ARQUIVO DE PRESERVAÇÃO</small></Link>;
}

function Header() {
  return <header className="site-header"><div className="header-wordmark"><Brand /></div><div className="header-inner"><nav className="top-nav" aria-label="Navegação principal"><a href="/#catalogo">Catálogo</a><a href="/#sobre">Sobre o arquivo</a></nav><a className="header-index" href="/#catalogo"><span className="live-dot" /> ACERVO ABERTO <ArrowUpRight size={14} /></a></div></header>;
}

function Artwork({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.slug === 'kujaku-ou') {
    return <div className={`artwork artwork-cover ${large ? 'artwork-large' : ''}`}><img src={kujakuCover} alt="Capa Gold Cartridge de Kujaku Ou para Mark III / Master System" /><span className="art-caption">NEWPORTGAME / KUJAKU OU</span></div>;
  }
  return <div className={`artwork ${project.accent} ${large ? 'artwork-large' : ''}`} aria-label={`Arte abstrata original de ${project.title}`} role="img">
    <div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-symbol">{project.monogram}</div><span className="art-caption">NEWPORTGAME / ARQUIVO 01</span><span className="art-corner">◆</span>
  </div>;
}

function ProjectCard({ project }: { project: Project }) {
  const ready = project.status === 'Completo';
  const cardContents = <><div className="card-art-link"><Artwork project={project} /><span className={`status-pill ${ready ? 'is-ready' : 'is-prep'}`}><i />{project.status}</span></div>
    <div className="card-body"><div className="card-overline"><span>{project.platform}</span><span>01 / 0{project.slug === 'spellcaster' ? '1' : '2'}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="card-bottom"><span className="project-kind">{project.kind}</span><span className="arrow-link" aria-hidden="true"><ArrowUpRight size={17} /></span></div></div></>;
  return <article className="project-card">{project.slug === 'kujaku-ou'
    ? <a className="project-card-link" href="/jogos/kujaku-ou" target="_blank" rel="noopener noreferrer" aria-label="Abrir Kujaku Ou em uma nova aba">{cardContents}</a>
    : <Link className="project-card-link" href={`/jogos/${project.slug}`}>{cardContents}</Link>}</article>;
}

function Home() {
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const filtered = useMemo(() => projects.filter((p) => {
    const term = search.trim().toLocaleLowerCase('pt-BR');
    return (!term || `${p.title} ${p.platform} ${p.kind} ${p.summary}`.toLocaleLowerCase('pt-BR').includes(term))
      && (platform === 'Todos' || p.platform.includes(platform))
      && (status === 'Todos' || p.status === status);
  }), [search, platform, status]);
  return <><Header /><main><section className="hero-shell"><div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> UM ARQUIVO VIVO DE JOGOS</div><h1>O passado<br />continua <em>jogável.</em></h1><p className="hero-intro">Traduções, restaurações e documentação para manter clássicos acessíveis — com cuidado, contexto e respeito à história.</p><a href="#catalogo" className="primary-cta">Explorar o catálogo <ArrowDown size={16} /></a><div className="hero-meta"><span><span className="live-dot" /> CURADORIA INDEPENDENTE</span><span>BRASIL · DESDE SEMPRE</span></div></div><div className="hero-art-wrap"><div className="hero-art-top"><span>REGISTRO Nº 001</span><span>16-BIT MEMORY / 8-BIT ROOTS</span></div><Artwork project={projects[0]} large /><div className="hero-note"><span className="note-stamp">NG</span><span><b>Memória preservada.</b><br />Experiência renovada.</span><ArrowUpRight size={16} /></div><div className="hero-index">01<span>—</span>02</div></div></div><div className="hero-bottom"><span>UMA BIBLIOTECA, NÃO UM FÓRUM.</span><span>FEITO PARA ENCONTRAR E REDESCOBRIR <ArrowRight size={14} /></span></div></section>
  <section className="catalog-section" id="catalogo"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> O ACERVO</div><h2>Encontre seu <em>próximo clássico.</em></h2></div><p>Projetos catalogados com clareza.<br />Cada jogo, uma história que continua.</p></div>
    <div className="catalog-toolbar"><label className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por jogo, console ou projeto..." aria-label="Buscar no catálogo" />{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Limpar busca">×</button>}<kbd>/</kbd></label>
    <div className="filters"><label className="filter-select"><span>PLATAFORMA</span><select value={platform} onChange={(e) => setPlatform(e.target.value)} aria-label="Filtrar por plataforma"><option>Todos</option><option>Master System</option><option>Sega Mark III</option></select><ChevronDown size={13} /></label><label className="filter-select"><span>STATUS</span><select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filtrar por status"><option>Todos</option><option>Completo</option><option>Status não informado</option></select><ChevronDown size={13} /></label></div></div>
    <div className="catalog-count"><span>{String(filtered.length).padStart(2, '0')} PROJETOS ENCONTRADOS</span><span>ORDENADO POR: DESTAQUE</span></div>
    {filtered.length ? <div className="project-grid">{filtered.map((p) => <ProjectCard project={p} key={p.slug} />)}</div> : <div className="empty-state"><Search size={22} /><h3>Nenhum registro encontrado.</h3><p>Tente outra busca ou remova os filtros para explorar o acervo.</p><button onClick={() => { setSearch(''); setPlatform('Todos'); setStatus('Todos'); }}>Limpar filtros</button></div>}
    <div className="catalog-footnote"><span>CATÁLOGO EM CONSTRUÇÃO CONTÍNUA</span><span>REGISTROS ATUAIS <b>02</b></span></div>
  </section>
  <section className="manifesto" id="sobre"><div className="manifesto-mark"><BookOpen size={22} /></div><div className="manifesto-content"><div className="eyebrow"><span className="eyebrow-line" /> SOBRE A NEWPORTGAME</div><h2>Preservar é deixar<br />a próxima geração <em>jogar.</em></h2><p>A Newportgame mantém projetos de localização e restauração de jogos clássicos. Um trabalho feito para que essas experiências possam ser conhecidas, compreendidas e lembradas.</p></div><div className="manifesto-side"><ShieldCheck size={21} /><b>Preservação responsável</b><p>Não distribuímos ROMs comerciais completas. Disponibilizamos apenas patches e documentação.</p></div></section></main><Footer /></>;
}

function Detail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const complete = project.status === 'Completo';
  const related = project.slug === 'kujaku-ou' ? 'SpellCaster' : 'Kujaku Ou';
  return <><Header /><main className="detail-page"><div className="detail-crumb"><Link href="/">← Catálogo</Link><span>/</span><span>{project.title}</span></div><div className="detail-layout"><div className="detail-visual"><Artwork project={project} large /><div className="visual-note"><span>REGISTRO NEWPORTGAME</span><span>{project.slug === 'kujaku-ou' ? 'CAPA GOLD CARTRIDGE · MARK III / MASTER SYSTEM' : 'ARTE ABSTRATA ORIGINAL · SEM CAPTURA DE JOGO'}</span></div></div><div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> PROJETO OFICIAL NEWPORTGAME</div><div className={`status-pill detail-status ${complete ? 'is-ready' : 'is-prep'}`}><i />{project.status}</div><h1>{project.title}</h1><p className="detail-lead">{project.slug === 'spellcaster' ? 'Uma tradução oficial Newportgame para PT-BR, completa e pronta para preservar a experiência em português.' : 'Tradução oficial Newportgame e restauração técnica baseadas na versão japonesa.'}</p><div className="detail-facts"><div><span>PLATAFORMA</span><b>{project.platform}</b></div><div><span>TIPO DE PROJETO</span><b>{project.slug === 'spellcaster' ? 'Tradução PT-BR' : 'Tradução + restauração técnica'}</b></div><div><span>RESPONSÁVEL</span><b>Newportgame · projeto oficial</b></div><div><span>CONTEÚDO</span><b>Patches e documentação</b></div></div>
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
