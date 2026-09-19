import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  MoveRight,
  Sparkles,
  X,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const assetUrl = (asset: string) => `${import.meta.env.BASE_URL}${asset}`;

const chapters = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'highlights', label: 'Highlights', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
] as const;

type ChapterId = (typeof chapters)[number]['id'];

const themeOptions = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'sunset', label: 'Sunset' },
] as const;

type ThemeId = (typeof themeOptions)[number]['id'];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'dark';
    const savedTheme = window.localStorage.getItem('srushti-theme');
    return savedTheme === 'light' || savedTheme === 'sunset' ? savedTheme : 'dark';
  });
  const [themeTransition, setThemeTransition] = useState<ThemeId | null>(null);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const resumeMenuRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterId>('about');
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const closeMenu = () => setMenuOpen(false);
  const themeIndex = themeOptions.findIndex((option) => option.id === theme);
  const nextTheme = themeOptions[(themeIndex + 1) % themeOptions.length];
  const cycleTheme = () => {
    setTheme(nextTheme.id);
    setThemeTransition(nextTheme.id);
  };
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter));
  const activeChapterData = chapters[activeIndex] ?? chapters[0];

  const highlights = useMemo(() => [
    { text: 'Invited as speaker at TEDx MITAOE', url: 'https://www.youtube.com/watch?v=Mv2EraAPgdc' },
    { text: 'Top 3.89% on LeetCode with a max rating of 1977 (Global Rank 256 in Biweekly Contest 190)', url: 'https://leetcode.com/u/Srushti_1004/' },
    { text: 'Research Paper Submission at ICMLDE 2026' },
    { text: 'Codeforces Pupil (Max Rating 1399) (Global Rank 304 in Contest 1119 / Round highlights)', url: 'https://codeforces.com/profile/srushti_2910' },
    { text: 'Finalist at Baker Hughes Hackathon 2025', url: 'https://github.com/srushtiinvent/Smart-Sentry' },
    { text: "International Women's Day speaker with WTM and GDG Pune", url: 'https://drive.google.com/file/d/1oJb2xyFkgrPzHtE-w8_ulxUZeCF_IDA6/view?usp=sharing' },
    { text: 'Core Team Member & Executive at GDSC MNIT' },
    { text: '4 Granted Indian Patents' },
  ], []);
  const skillGroups = useMemo(() => [
    { label: 'Intelligence', items: ['Machine Learning', 'Natural Language Processing', 'LLM Integration', 'RAG', 'Deep Learning'] },
    { label: 'Architecture', items: ['HLD · Microservices', 'Scalability', 'LLD · Design Patterns', 'SOLID Principles'] },
    { label: 'Build & ship', items: ['React.js', 'Node.js', 'Express.js', 'TailwindCSS', 'HTML5 / CSS3', 'Linux / Unix'] },
    { label: 'Data systems', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker'] },
  ], []);
  const projects = useMemo(() => [
    { number: '01', name: 'PRISM', kicker: 'Network intrusion detection', description: 'A hierarchical detection system that brings together an Isolation Forest pre-filter, a 3-layer Parametric LIF Spiking Neural Network, and a stacked ensemble.', stack: 'Python · PyTorch · Scikit-learn · SNN', stat: '95.59%', statLabel: 'accuracy', accent: 'cyan' },
    { number: '02', name: 'Smart Sentry', kicker: 'Streaming anomaly intelligence', description: 'Phase-aware anomaly detection built for live streams, with Kafka ingestion and Redis real-time state management at its core.', stack: 'Python · Kafka · Redis · PostgreSQL · Docker', stat: '0.71', statLabel: 'anomaly F1', accent: 'warm', url: 'https://github.com/srushtiinvent/Smart-Sentry' },
    { number: '03', name: 'ThumbCraft AI', kicker: 'Creative tooling for YouTube', description: 'A full-stack thumbnail studio with prompt optimization, image synthesis, MongoDB history, and a Cloudinary CDN pipeline.', stack: 'React · Node.js · MongoDB · Gemini · OpenAI', stat: 'FULL', statLabel: 'stack product', accent: 'cyan', url: 'https://github.com/srushtiinvent/ai-thumbnail' },
    { number: '04', name: 'Aspect-Based Sentiment Analysis', kicker: 'Language, with context', description: 'A hybrid ABSA approach combining BERT, rule-based heuristics, Contrastive Clause Resolution, and context windows.', stack: 'Python · BERT · PyTorch · NLP · spaCy', stat: '92.1%', statLabel: 'accuracy', accent: 'warm', url: 'https://github.com/srushtiinvent/Aspect-based-sentiment-analysis' },
  ], []);
  const resumeVariants = useMemo(() => {
    const base = assetUrl('Srushti_Nerkar_Resume.pdf');
    return [
      { id: 'Software Engineer', label: 'Software Engineer', url: base },
      { id: 'Full-Stack Engineer', label: 'Full-Stack Engineer', url: base },
      { id: 'Backend & Systems', label: 'Backend & Systems', url: base },
      { id: 'AI & ML Engineer', label: 'AI & ML Engineer', url: base },
    ];
  }, []);

  const jumpTo = (id: ChapterId | 'top') => {
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      window.history.replaceState(null, '', id === 'top' ? `${window.location.pathname}` : `#${id}`);
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }
    const timer = window.setTimeout(() => setShowIntro(false), 2400);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    if (!resumeMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
        setResumeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [resumeMenuOpen]);

  useEffect(() => {
    window.localStorage.setItem('srushti-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveChapter(visible.target.id as ChapterId);
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0.1, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));

    const handleHash = () => {
      const id = window.location.hash.replace('#', '') as ChapterId;
      if (chapters.some((chapter) => chapter.id === id)) {
        setActiveChapter(id);
        window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' }));
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'PageDown' && event.key !== 'PageUp') return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1;
      const nextIndex = Math.min(chapters.length - 1, Math.max(0, activeIndex + direction));
      jumpTo(chapters[nextIndex].id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, prefersReducedMotion]);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className={`theme-${theme} fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6`}
            style={{ background: 'var(--page-bg)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          >
            <motion.span
              className="mono text-[10px] uppercase tracking-[.4em] text-cyan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Portfolio
            </motion.span>
            <div className="display flex items-center gap-3 text-4xl font-semibold tracking-tight lg:text-5xl" style={{ color: 'var(--ink)' }}>
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                Srushti
              </motion.span>
              <motion.span
                className="text-cyan"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                Nerkar
              </motion.span>
            </div>
            <motion.div
              className="cyan-line h-[2px]"
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`site-shell theme-${theme} min-h-[100dvh]`}>
      <AnimatePresence initial={false}>
        {themeTransition && <motion.div
          key={themeTransition}
          className="theme-transition pointer-events-none fixed right-8 top-8 z-[60] h-10 w-10 rounded-full"
          initial={{ opacity: .5, scale: 0 }}
          animate={{ opacity: 0, scale: prefersReducedMotion ? 1 : 18 }}
          transition={{ duration: prefersReducedMotion ? 0 : .42, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'var(--accent)' }}
          onAnimationComplete={() => setThemeTransition(null)}
          aria-hidden="true"
        />}
      </AnimatePresence>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="nav-glass fixed inset-x-0 top-0 z-30 border-b border-white/[.08]">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
          <button onClick={() => jumpTo('top')} className="group flex items-center gap-3 text-left focus-ring" data-testid="button-logo">
            <span className="flex h-9 w-9 items-center justify-center border border-[#11dce0]/60 text-sm font-bold text-cyan">SN</span>
            <span className="display text-[15px] font-semibold tracking-tight text-[#ecf4f4]">Srushti <span className="text-cyan">Nerkar</span></span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {chapters.map((chapter) => (
              <button key={chapter.id} onClick={() => jumpTo(chapter.id)} className={`nav-chapter mono text-[10px] uppercase tracking-[.14em] transition-colors ${activeChapter === chapter.id ? 'is-active text-cyan' : 'text-[#9baeb1]'}`} aria-current={activeChapter === chapter.id ? 'page' : undefined} data-testid={`button-nav-${chapter.id}`}>
                {chapter.label}
              </button>
            ))}
            <span className="h-4 w-px bg-white/15" />
            <div className="relative" ref={resumeMenuRef}>
              <button onClick={() => setResumeMenuOpen((v) => !v)} className="mono flex items-center gap-1.5 text-[10px] uppercase tracking-[.14em] text-[#9baeb1] transition-colors hover:text-cyan focus-ring" aria-expanded={resumeMenuOpen} aria-haspopup="true" type="button" data-testid="button-resume">
                Resume
                <ChevronDown size={11} className={`transition-transform ${resumeMenuOpen ? 'rotate-180 text-cyan' : ''}`} />
              </button>
              <AnimatePresence>
                {resumeMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }} className="absolute right-0 top-[calc(100%+14px)] w-56 border border-[#1b343a] bg-[#0b1c22] py-2 shadow-xl">
                    {resumeVariants.map((variant) => (
                      <a key={variant.id} href={variant.url} target="_blank" rel="noreferrer" onClick={() => setResumeMenuOpen(false)} className="mono block px-4 py-2.5 text-[10px] uppercase tracking-[.12em] text-[#9baeb1] transition-colors hover:bg-white/5 hover:text-cyan" data-testid={`link-resume-${variant.id}`}>{variant.label}</a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={cycleTheme} className="theme-toggle focus-ring" type="button" aria-label={`Switch to ${nextTheme.label} theme`} data-testid="button-theme-toggle">
              <motion.span key={theme} initial={{ scale: .35, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 420, damping: 20 }} className={`theme-swatch theme-swatch-${theme}`} aria-hidden="true" />
              <motion.span key={`label-${theme}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>{themeOptions[themeIndex]?.label ?? 'Dark'}</motion.span>
            </button>
          </nav>
          <button className="focus-ring text-[#cce0e2] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: prefersReducedMotion ? 0 : .28 }} className="overflow-hidden border-t border-white/[.08] bg-[#071015] px-6 py-5 md:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col gap-5">
                {chapters.map((chapter) => <button key={chapter.id} onClick={() => jumpTo(chapter.id)} className={`mono text-left text-xs uppercase tracking-[.16em] ${activeChapter === chapter.id ? 'text-cyan' : 'text-[#a8bec0]'}`} aria-current={activeChapter === chapter.id ? 'page' : undefined} data-testid={`button-mobile-${chapter.id}`}>{chapter.index} / {chapter.label}</button>)}
                <div className="flex flex-col gap-3"><span className="mono text-xs uppercase tracking-[.16em] text-[#a8bec0]">Resume</span><div className="ml-3 flex flex-col gap-3 border-l border-white/10 pl-4">{resumeVariants.map((variant) => <a key={variant.id} href={variant.url} target="_blank" rel="noreferrer" onClick={closeMenu} className="mono text-[11px] uppercase tracking-[.14em] text-[#789094] hover:text-cyan focus-ring" data-testid={`link-mobile-resume-${variant.id}`}>{variant.label}</a>)}</div></div>
                <button onClick={cycleTheme} className="theme-toggle w-fit focus-ring" type="button" aria-label={`Switch to ${nextTheme.label} theme`} data-testid="button-mobile-theme-toggle">
                  <motion.span key={`mobile-swatch-${theme}`} initial={{ scale: .35, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 420, damping: 20 }} className={`theme-swatch theme-swatch-${theme}`} aria-hidden="true" />
                  <motion.span key={`mobile-label-${theme}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>{themeOptions[themeIndex]?.label ?? 'Dark'} theme</motion.span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <aside className="chapter-rail fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block" aria-label="Chapter navigation">
        <div className="mb-5 text-right"><span className="mono text-[9px] uppercase tracking-[.18em] text-[#638084]">Chapter</span><strong className="mono ml-2 text-[10px] text-cyan">{activeChapterData.index} / 05</strong></div>
        <div className="flex flex-col items-end gap-3">
          {chapters.map((chapter) => <button key={chapter.id} onClick={() => jumpTo(chapter.id)} className={`group flex items-center gap-2 focus-ring ${activeChapter === chapter.id ? 'text-cyan' : 'text-[#507075]'}`} aria-label={`Go to ${chapter.label} chapter`} aria-current={activeChapter === chapter.id ? 'step' : undefined} data-testid={`button-rail-${chapter.id}`}><span className="mono text-[9px] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{chapter.label}</span><span className={`chapter-dot ${activeChapter === chapter.id ? 'is-active' : ''}`} /></button>)}
        </div>
      </aside>

      <main id="top">
        <section className="hero-chapter relative mx-auto flex min-h-[760px] max-w-[1240px] items-center px-6 pb-20 pt-36 lg:min-h-[820px] lg:px-10" aria-labelledby="hero-title">
          <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-85" />
          <motion.div className="hero-orbit pointer-events-none absolute right-[8%] top-[18%] hidden h-72 w-72 rounded-full border border-[#11dce0]/10 lg:block" animate={{ rotate: prefersReducedMotion ? 0 : 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
          <div className="relative z-10 grid w-full items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-[650px]">
              <motion.div className="mb-8 flex items-center gap-3" initial={reveal.hidden} animate={reveal.visible} transition={{ duration: .7, delay: .1 }}>
                <span className="h-px w-10 bg-[#11dce0]" /><span className="mono text-[10px] uppercase tracking-[.24em] text-cyan">SOFTWARE ENGINEER · 3X PATENT HOLDER</span>
              </motion.div>
              <motion.h1 id="hero-title" className="display text-[clamp(4.2rem,10vw,8.8rem)] font-semibold leading-[.87] tracking-[-.075em] text-[#e8f2f2]" initial={reveal.hidden} animate={reveal.visible} transition={{ duration: .85, delay: .18 }}>Engineered<br /><span className="text-cyan">for</span><br /><em className="font-normal text-[#9db4b6]">impact.</em></motion.h1>
              <motion.p className="mt-9 max-w-[570px] text-[16px] leading-8 text-[#a8babc]" initial={reveal.hidden} animate={reveal.visible} transition={{ duration: .75, delay: .3 }}>Scaling ideas into production-grade software. Crafting resilient distributed systems, data pipelines, and clean code designed to perform under pressure and backed by a relentless problem-solving edge.</motion.p>
              <motion.div className="mt-9 flex flex-wrap items-center gap-4" initial={reveal.hidden} animate={reveal.visible} transition={{ duration: .7, delay: .4 }}>
                <button onClick={() => jumpTo('projects')} className="group flex items-center gap-3 bg-[#11dce0] px-5 py-3 text-xs font-bold uppercase tracking-[.13em] text-[#071015] transition-transform hover:-translate-y-1 focus-ring" data-testid="button-hero-projects">Explore my work <ArrowDownRight size={16} /></button>
                <button onClick={() => jumpTo('contact')} className="group flex items-center gap-2 px-2 py-3 text-xs font-semibold uppercase tracking-[.13em] text-[#b8ccce] hover:text-cyan focus-ring" data-testid="button-hero-contact">Let's talk <MoveRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
              </motion.div>
              <motion.div className="mt-14 flex items-center gap-5 text-[#789093]" initial={reveal.hidden} animate={reveal.visible} transition={{ duration: .7, delay: .5 }}>
                <span className="mono text-[10px] uppercase tracking-[.14em]">Find me</span>
                <a aria-label="LinkedIn" href="https://www.linkedin.com/in/srushti-nerkar-58034827b/" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan focus-ring" data-testid="link-linkedin"><FaLinkedinIn size={17} /></a>
                <a aria-label="GitHub" href="https://github.com/srushtiinvent" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan focus-ring" data-testid="link-github"><FaGithub size={17} /></a>
                <a aria-label="Email Srushti" href="mailto:srushti.inventl@gmail.com" className="transition-colors hover:text-cyan focus-ring" data-testid="link-email-social"><Mail size={17} /></a>
              </motion.div>
            </div>
            <div className="relative mx-auto mt-5 w-full max-w-[410px] lg:mt-0 lg:justify-self-end">
              <div className="relative mx-auto aspect-[.82] w-[78%] overflow-visible rounded-[48%] portrait-frame">
                <img src={assetUrl('images/srushti-profile.jpg')} alt="Srushti Nerkar" className="h-full w-full rounded-[48%] object-cover object-[center_28%] grayscale-[.12]" data-testid="img-profile" />
                <div className="absolute -right-16 top-[19%] hidden w-32 rotate-90 items-center gap-3 lg:flex"><span className="h-px w-10 bg-[#11dce0]" /><span className="mono whitespace-nowrap text-[9px] uppercase tracking-[.18em] text-[#739497]">01 / 04 — profile</span></div>
              </div>
              <motion.span className="hero-signal pointer-events-none absolute -right-2 top-[28%] hidden h-2 w-2 rounded-full bg-[#11dce0] lg:block" animate={prefersReducedMotion ? { opacity: .45 } : { opacity: [.25, 1, .25], scale: [1, 1.8, 1] }} transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
              <div className="thinking-card absolute -bottom-5 -left-2 px-4 py-3 backdrop-blur-md"><span className="mono block text-[9px] uppercase tracking-[.16em] text-[#739497]">Crafting software that</span><span className="mt-1 block text-[12px] text-[#d4e4e5]">performs under pressure.</span></div>
            </div>
          </div>
          <button onClick={() => jumpTo('about')} className="absolute bottom-8 left-6 hidden items-center gap-3 focus-ring lg:flex" data-testid="button-scroll-about"><span className="mono text-[9px] uppercase tracking-[.18em] text-[#668084]">Scroll to explore</span><ChevronDown size={15} className="text-cyan" /></button>
        </section>

        <motion.section id="about" className="chapter-section mx-auto max-w-[1240px] scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .18 }} transition={{ staggerChildren: .09 }} aria-labelledby="about-title">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1fr]">
            <motion.div variants={reveal}><p className="chapter-label mono mb-5 text-[10px] uppercase tracking-[.2em] text-cyan">01 — About</p><h2 id="about-title" className="display max-w-[370px] text-4xl font-medium leading-[1.05] tracking-[-.04em] text-[#e7f2f2] lg:text-5xl">Complex problems.<br /><span className="text-[#7d999d]">Clean execution.</span></h2></motion.div>
            <motion.div variants={reveal} className="max-w-[650px]"><p className="text-xl leading-9 text-[#c0d1d2]">I build software at the intersection of deep technical logic and robust architecture. Whether scaling data pipelines or crafting resilient backend services, I turn hard problems into seamless code.</p><p className="mt-7 text-[15px] leading-8 text-[#82999c]">As a 3x patent holder and builder, my approach is simple: understand the core system, optimize every layer, and ship software that performs in the real world.</p><div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-7 sm:grid-cols-3"><div><p className="display text-3xl text-cyan">04</p><p className="mono mt-2 text-[9px] uppercase tracking-[.13em] text-[#789195]">Indian patents granted</p></div><div><p className="display text-3xl text-cyan">01</p><p className="mono mt-2 text-[9px] uppercase tracking-[.13em] text-[#789195]">RESEARCH PAPER</p></div><div><p className="display text-3xl text-cyan">01</p><p className="mono mt-2 text-[9px] uppercase tracking-[.13em] text-[#789195]">hackathon finalist</p></div></div></motion.div>
          </div>
        </motion.section>

        <motion.section id="highlights" className="chapter-section relative border-y border-white/[.08] bg-[#09171c] scroll-mt-24" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .12 }} transition={{ staggerChildren: .06 }} aria-labelledby="highlights-title">
          <div className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36"><div className="mb-14 flex flex-wrap items-end justify-between gap-6"><motion.div variants={reveal}><p className="chapter-label mono mb-5 text-[10px] uppercase tracking-[.2em] text-cyan">02 — Highlights</p><h2 id="highlights-title" className="display text-4xl font-medium tracking-[-.04em] text-[#e7f2f2] lg:text-6xl">A record of showing up.</h2></motion.div><motion.p variants={reveal} className="max-w-[260px] text-sm leading-6 text-[#789094]">The rooms, communities, and causes that have shaped my point of view.</motion.p></div><div className="grid border-t border-white/10 md:grid-cols-2">{highlights.map((item, i) => { const inner = (<><span className="mono pt-1 text-[10px] text-cyan/70">0{i + 1}</span><p className="max-w-[400px] text-[15px] leading-6 text-[#b9cacc] transition-colors group-hover:text-[#eff8f8]">{item.text}</p>{item.url ? (<ArrowUpRight size={15} className="ml-auto shrink-0 text-[#557174] transition-colors group-hover:text-cyan" />) : (<span className="relative ml-auto flex shrink-0 items-center"><span className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap border border-white/10 bg-[#0b1c22] px-2 py-1 mono text-[9px] uppercase tracking-[.1em] text-[#789094] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">No link available</span><span className="block h-px w-5 bg-[#3a4c4f] transition-colors duration-200 group-hover:bg-[#557174]" /></span>)}</>); return item.url ? (<motion.a variants={reveal} key={item.text} href={item.url} target="_blank" rel="noreferrer" className="group flex min-h-[92px] items-start gap-5 border-b border-white/10 py-6 md:odd:border-r md:odd:pr-10 md:even:pl-10" data-testid={`highlight-${i + 1}`}>{inner}</motion.a>) : (<motion.div variants={reveal} key={item.text} className="group flex min-h-[92px] items-start gap-5 border-b border-white/10 py-6 md:odd:border-r md:odd:pr-10 md:even:pl-10" data-testid={`highlight-${i + 1}`}>{inner}</motion.div>); })}</div></div>
        </motion.section>

        <motion.section id="skills" className="chapter-section mx-auto max-w-[1240px] scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .15 }} transition={{ staggerChildren: .08 }} aria-labelledby="skills-title">
          <div className="grid gap-14 lg:grid-cols-[.55fr_1fr]"><motion.div variants={reveal}><p className="chapter-label mono mb-5 text-[10px] uppercase tracking-[.2em] text-cyan">03 — Skills</p><h2 id="skills-title" className="display max-w-[350px] text-4xl font-medium leading-[1.05] tracking-[-.04em] text-[#e7f2f2]">A toolkit for <span className="text-[#7d999d]">hard problems.</span></h2><p className="mt-7 max-w-[320px] text-sm leading-7 text-[#789094]">From model behavior to production architecture, I like knowing how the pieces meet.</p></motion.div><div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">{skillGroups.map((group) => <motion.div variants={reveal} key={group.label}><h3 className="mono mb-4 border-b border-white/10 pb-3 text-[10px] uppercase tracking-[.2em] text-[#f8bd76]">{group.label}</h3><div className="flex flex-wrap gap-2">{group.items.map(skill => <span key={skill} className="skill-pill border border-[#284248] px-3 py-2 text-[12px] text-[#aec4c5]">{skill}</span>)}</div></motion.div>)}</div></div>
        </motion.section>

        <motion.section id="projects" className="chapter-section border-y border-white/[.08] bg-[#09171c] scroll-mt-24" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .1 }} transition={{ staggerChildren: .08 }} aria-labelledby="projects-title">
          <div className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36"><div className="mb-14 flex flex-wrap items-end justify-between gap-6"><motion.div variants={reveal}><p className="chapter-label mono mb-5 text-[10px] uppercase tracking-[.2em] text-cyan">04 — Selected work</p><h2 id="projects-title" className="display text-4xl font-medium tracking-[-.04em] text-[#e7f2f2] lg:text-6xl">Systems with a pulse.</h2></motion.div><motion.p variants={reveal} className="max-w-[285px] text-sm leading-6 text-[#789094]">Research, product, and the satisfying space where they overlap.</motion.p></div><div className="grid gap-4 md:grid-cols-2">{projects.map(project => { const cardInner = (<><div><div className="flex items-center justify-between"><span className="mono text-[10px] tracking-[.16em] text-cyan">{project.number}</span><span className={`mono text-[10px] uppercase tracking-[.14em] ${project.accent === 'warm' ? 'text-[#f8bd76]' : 'text-[#6d898d]'}`}>{project.kicker}</span></div><h3 className="display mt-12 max-w-[400px] text-3xl font-semibold tracking-[-.05em] text-[#e4f0f0] lg:text-4xl">{project.name}</h3><p className="mt-5 max-w-[470px] text-sm leading-7 text-[#91aaad]">{project.description}</p></div><div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-5"><div><p className="mono max-w-[280px] text-[10px] leading-5 text-[#628084]">{project.stack}</p></div><div className="text-right"><p className={`display text-2xl font-semibold ${project.accent === 'warm' ? 'text-[#f8bd76]' : 'text-cyan'}`}>{project.stat}</p><p className="mono mt-1 text-[9px] uppercase tracking-[.12em] text-[#628084]">{project.statLabel}</p></div></div>{project.url ? (<Sparkles size={17} className="absolute -right-2 -top-2 lg:-right-3 lg:-top-3 text-[#28464a] transition-colors group-hover:text-cyan" />) : (<span className="absolute -right-2 -top-2 lg:-right-3 lg:-top-3"><span className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap border border-white/10 bg-[#0b1c22] px-2 py-1 mono text-[9px] uppercase tracking-[.1em] text-[#789094] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">No link available</span><Sparkles size={17} className="text-[#28464a]" /></span>)}</>); return project.url ? (<motion.a variants={reveal} key={project.name} href={project.url} target="_blank" rel="noreferrer" className="project-card group relative flex min-h-[390px] flex-col justify-between border border-[#1b343a] bg-[#0b1c22] p-7 lg:p-9" data-testid={`card-project-${project.number}`}>{cardInner}</motion.a>) : (<motion.article variants={reveal} key={project.name} className="project-card group relative flex min-h-[390px] flex-col justify-between border border-[#1b343a] bg-[#0b1c22] p-7 lg:p-9" data-testid={`card-project-${project.number}`}>{cardInner}</motion.article>); })}</div></div>
        </motion.section>

        <motion.section id="contact" className="chapter-section relative mx-auto max-w-[1240px] scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .18 }} aria-labelledby="contact-title"><div className="absolute right-[12%] top-24 h-32 w-32 rounded-full border border-[#11dce0]/15" /><motion.div variants={reveal} className="relative max-w-[780px]"><p className="chapter-label mono mb-6 text-[10px] uppercase tracking-[.2em] text-cyan">05 — Contact</p><h2 id="contact-title" className="display text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[.88] tracking-[-.07em] text-[#e7f2f2]">Have a hard<br /><span className="text-cyan">problem?</span></h2><p className="mt-9 max-w-[490px] text-lg leading-8 text-[#94abad]">I’m always curious about ambitious ideas, useful technology, and the people brave enough to begin.</p><a href="mailto:srushti.inventl@gmail.com" className="group mt-10 inline-flex items-center gap-4 border-b border-[#11dce0] pb-3 text-sm font-semibold text-[#e7f2f2] transition-colors hover:text-cyan focus-ring" data-testid="link-contact-email">srushti.inventl@gmail.com <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></motion.div></motion.section>
      </main>
      <footer className="border-t border-white/[.08]"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10"><p className="display text-sm text-[#d5e4e4]">Srushti <span className="text-cyan">Nerkar</span></p><p className="mono text-[9px] uppercase tracking-[.16em] text-[#61797d]">Built with curiosity</p><button onClick={() => jumpTo('top')} className="flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-[#8da5a7] hover:text-cyan focus-ring" data-testid="button-back-top">Back to top <ArrowUpRight size={14} /></button></div></footer>
      </div>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
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