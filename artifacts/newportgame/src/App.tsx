import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import kujakuCover from './assets/kujaku-ou-cover.png';
import spellcasterCover from './assets/spellcaster-cover.png';
import spellcasterScreen1 from './assets/spellcaster-gallery/1_1793466650424.png';
import spellcasterScreen2 from './assets/spellcaster-gallery/2_1793466650425.png';
import spellcasterScreen3 from './assets/spellcaster-gallery/3_1793466650426.png';
import spellcasterScreen4 from './assets/spellcaster-gallery/4_1793466650426.png';
import spellcasterScreen5 from './assets/spellcaster-gallery/5_1793466650427.png';
import spellcasterScreen6 from './assets/spellcaster-gallery/6_1793466650427.png';
import {
  Route,
  Switch,
  Link,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type Project = { slug: string; title: string; platform: string; kind: string; status: string; summary: string; subtitle: string; accent: string; monogram: string; translator: string; };
const projects: Project[] = [
  { slug: 'spellcaster', title: 'SpellCaster', platform: 'Master System', kind: 'Tradução PT-BR', status: 'Completo', summary: 'Uma tradução oficial Newportgame para redescobrir este clássico no seu idioma.', subtitle: 'RPG de ação e aventura do Master System: Kane investiga ataques a templos e enfrenta criaturas usando magia.', accent: 'gold', monogram: 'SC', translator: 'Newportgame' },
  { slug: 'kujaku-ou', title: 'Kujaku Ou', platform: 'Sega Mark III / Master System', kind: 'Tradução + restauração técnica', status: 'Status não informado', summary: 'Tradução oficial e restauração técnica baseadas na versão japonesa.', subtitle: 'Aventura de ação e exploração protagonizada pelo monge exorcista Kujaku, em uma investigação de forças sobrenaturais no Japão.', accent: 'jade', monogram: '孔雀', translator: 'Newportgame' },
];

const spellcasterPatchUrl = 'https://github.com/contatonewportgame-code/spellcaster-sms-ptbr/releases/download/v1.0.0/SpellCaster_PTBR_v1.0_Newportgame.zip';

const spellcasterScreenshots = [
  { src: spellcasterScreen1, alt: 'Tela de abertura de SpellCaster com os créditos da versão brasileira.' },
  { src: spellcasterScreen2, alt: 'Kane conversa com Daikak em uma cena de SpellCaster.' },
  { src: spellcasterScreen3, alt: 'Kane enfrenta um inimigo em uma floresta.' },
  { src: spellcasterScreen4, alt: 'Menu do grupo com atributos e nomes dos personagens.' },
  { src: spellcasterScreen5, alt: 'Kuma conversa sobre yakisoba em SpellCaster.' },
  { src: spellcasterScreen6, alt: 'Menu de itens com uma espada selecionada.' },
];

function SpellcasterGallery() {
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const activeScreenshot = spellcasterScreenshots[activeScreenshotIndex];
  const previousScreenshot = () => {
    setActiveScreenshotIndex((index) =>
      (index - 1 + spellcasterScreenshots.length) % spellcasterScreenshots.length,
    );
  };
  const nextScreenshot = () => {
    setActiveScreenshotIndex((index) => (index + 1) % spellcasterScreenshots.length);
  };

  return (
    <section className="game-gallery" aria-labelledby="spellcaster-gallery-title">
      <div className="game-gallery-heading">
        <span>CAPTURAS DO JOGO</span>
        <h2 id="spellcaster-gallery-title">SpellCaster em português</h2>
      </div>
      <div className="game-gallery-stage">
        <figure className="game-gallery-item">
          <img
            src={activeScreenshot.src}
            alt={activeScreenshot.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <button
          type="button"
          className="game-gallery-control previous"
          onClick={previousScreenshot}
          aria-label="Ver captura anterior"
        >
          <ArrowLeft size={19} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="game-gallery-control next"
          onClick={nextScreenshot}
          aria-label="Ver próxima captura"
        >
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
      <div className="game-gallery-pagination" aria-live="polite" aria-atomic="true">
        {String(activeScreenshotIndex + 1).padStart(2, '0')} /{' '}
        {String(spellcasterScreenshots.length).padStart(2, '0')}
      </div>
    </section>
  );
}

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

function CoverTitle({ project }: { project: Project }) {
  return <h2 className="cover-title">{project.title}</h2>;
}

function CoverCaption({ project }: { project: Project }) {
  return <span className="cover-caption">Traduzido por: {project.translator}</span>;
}

function Home() {
  return <><Header /><main className="shelf-home"><p className="shelf-caption">Traduções e restaurações de jogos clássicos.</p><section className="cover-shelf" aria-label="Jogos do acervo">
    <Link className="cover-link" href="/jogos/spellcaster" aria-label="Abrir detalhes de SpellCaster, traduzido por Newportgame"><CoverTitle project={projects[0]} /><Artwork project={projects[0]} /><CoverCaption project={projects[0]} /></Link>
    <a className="cover-link" href="/jogos/kujaku-ou" target="_blank" rel="noopener noreferrer" aria-label="Abrir detalhes de Kujaku Ou, traduzido por Newportgame, em uma nova aba"><CoverTitle project={projects[1]} /><Artwork project={projects[1]} /><CoverCaption project={projects[1]} /></a>
  </section></main></>;
}

function SpellcasterDetails() {
  return (
    <section className="game-story" aria-labelledby="spellcaster-game-title">
      <div className="game-story-heading">
        <div className="eyebrow"><span className="eyebrow-line" /> SOBRE O JOGO</div>
        <h2 id="spellcaster-game-title">A jornada de Kane</h2>
        <p>
          Kane Tensen é um guerreiro místico do Templo Summit. Quando templos são atacados e os guerreiros enviados
          para protegê-los desaparecem, ele parte para investigar a ameaça.
        </p>
      </div>
      <div className="game-story-grid">
        <article className="game-story-main">
          <h3>Ação, magia e investigação</h3>
          <p>
            SpellCaster alterna combates de ação com cenas de aventura. Nas batalhas, Kane usa ataques de Ki,
            saltos e magia; nas outras cenas, conversa com personagens, procura pistas e escolhe comandos.
          </p>
          <p>
            Cristiano Mariano relata que desenvolveu a tradução em um notebook antigo. O projeto Newportgame
            combina esse trabalho de localização com a restauração técnica do clássico para o público brasileiro.
          </p>
        </article>
        <aside className="game-story-aside">
          <span>MANUAL ORIGINAL</span>
          <p>
            O manual apresenta Kane como um guerreiro místico encarregado de proteger os inocentes e descobrir a
            origem dos ataques aos templos.
          </p>
          <a href="https://www.smspower.org/seganotebook/spelcast/manual/spelcasm.html" target="_blank" rel="noopener noreferrer">
            Ler manual em inglês <ArrowUpRight size={14} />
          </a>
        </aside>
      </div>
      <div className="game-story-cards">
        <article>
          <span>ROM-BASE</span>
          <b>SpellCaster (USA, Europe).sms</b>
          <p>ROM original limpa de 512 KB · CRC32 36729ED7. A ROM comercial não acompanha o patch.</p>
        </article>
        <article>
          <span>PATCH E APLICAÇÃO</span>
          <b>IPS · pacote ZIP v1.0</b>
          <p>Inclui o patch, SpellCaster.tbl e LEIA-ME.txt. Aplique o IPS à ROM compatível e salve o resultado em um novo arquivo.</p>
        </article>
      </div>
    </section>
  );
}

function Detail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const isSpellcaster = project.slug === 'spellcaster';
  const complete = project.status === 'Completo';
  const related = project.slug === 'kujaku-ou' ? 'SpellCaster' : 'Kujaku Ou';
  return <><Header /><main className="detail-page"><div className="detail-crumb"><Link href="/">← Catálogo</Link><span>/</span><span>{project.title}</span></div><div className="detail-layout"><div className="detail-visual"><Artwork project={project} large /><div className="visual-note"><span>REGISTRO NEWPORTGAME</span><span>{project.slug === 'kujaku-ou' ? 'CAPA GOLD CARTRIDGE · MARK III / MASTER SYSTEM' : 'CAPA ORIGINAL · SEGA MASTER SYSTEM'}</span></div>{isSpellcaster && <SpellcasterGallery />}</div><div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> PROJETO OFICIAL NEWPORTGAME</div><div className={`status-pill detail-status ${complete ? 'is-ready' : 'is-prep'}`}><i />{project.status}</div><h1>{project.title}</h1><p className="detail-lead">{project.subtitle}</p><div className="detail-facts"><div><span>PLATAFORMA</span><b>{project.platform}</b></div><div><span>TIPO DE PROJETO</span><b>{project.slug === 'spellcaster' ? 'Tradução PT-BR' : 'Tradução + restauração técnica'}</b></div><div><span>RESPONSÁVEL</span><b>Newportgame · projeto oficial</b></div><div><span>CONTEÚDO</span><b>Patches e documentação</b></div></div>
      <div className={`availability ${complete ? 'available' : 'pending'}`}><div className="availability-icon">{complete ? <Check size={17} /> : <Sparkles size={17} />}</div><div><b>{complete ? 'Materiais do projeto' : 'Materiais ainda indisponíveis'}</b><p>{isSpellcaster ? 'Assista ao vídeo sobre a tradução e baixe o patch abaixo.' : 'Nenhum link de patch ou documentação foi fornecido nesta apresentação.'}</p></div></div>
      {isSpellcaster && <section className="translation-video" aria-labelledby="spellcaster-video-heading">
        <h2 id="spellcaster-video-heading">Vídeo sobre a tradução</h2>
        <div className="translation-video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/Bg4PlKwsWoQ"
            title="Vídeo sobre a tradução de SpellCaster"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>}
      <div className="detail-actions">
        {isSpellcaster ? (
          <a className="download-button" href={spellcasterPatchUrl} target="_blank" rel="noopener noreferrer" aria-label="Baixar patch de tradução de SpellCaster em formato ZIP">
            <span>Baixar patch</span>
            <span>ZIP · v1.0</span>
          </a>
        ) : (
          <button className="unavailable-button" disabled title="Link ainda não disponível">
            <span>Download indisponível</span>
            <span>EM BREVE</span>
          </button>
        )}
        <Link className="text-link" href={`/jogos/${project.slug === 'spellcaster' ? 'kujaku-ou' : 'spellcaster'}`}>Conheça {related} <ArrowRight size={15} /></Link>
      </div>
       {project.slug === 'kujaku-ou' && <div className="related-note"><span>NOTA DE CONTEXTO</span><p>SpellCaster é identificado na proposta como o título ocidental relacionado a Kujaku Ou.</p><Link href="/jogos/spellcaster">Ver projeto SpellCaster <ArrowUpRight size={14} /></Link></div>}</div></div>{isSpellcaster && <SpellcasterDetails />}<div className="detail-bottom"><Link href="/"><ArrowLeft size={15} /> Voltar ao catálogo</Link><span>NEWPORTGAME · ARQUIVO DE PRESERVAÇÃO</span></div></main><Footer /></>;
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
