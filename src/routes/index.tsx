import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight, Download, Github, Linkedin, Mail, MapPin, ExternalLink,
  Code2, Database, Brain, Layers, Server, Wrench, Quote, Send, Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { sendContactEmail } from "@/lib/contact.functions";
import headshot from "@/assets/headshot-real.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import projectPlumbing from "@/assets/project-plumbing.jpg";
import cadVtwin from "@/assets/cad-vtwin.png";
import cadCrankshaft from "@/assets/cad-crankshaft.png";
import cadSprocket from "@/assets/cad-sprocket.png";
import cadScrew from "@/assets/cad-screw.png";
import herdSignal from "@/assets/project-herdsignal.png";
import astralecture from "@/assets/project-astralecture.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stephen Smith — Senior Full-Stack Engineer & AI Specialist" },
      { name: "description", content: "Senior Full-Stack Software Engineer specializing in AI/LLM evaluation, React, Node.js, Python, and scalable web applications." },
    ],
  }),
  component: Portfolio,
});

const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const skills = [
  { icon: Code2, title: "Languages", items: ["Python", "TypeScript", "JavaScript (ES6+)"] },
  { icon: Layers, title: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML5 / CSS3"] },
  { icon: Server, title: "Backend", items: ["Node.js", "Express.js", "Django", "Flask"] },
  { icon: Database, title: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL"] },
  { icon: Brain, title: "AI & Evaluation", items: ["LLM Evaluation", "SWE-bench", "Code Review", "Reasoning Verification"] },
  { icon: Wrench, title: "Tools & Practices", items: ["Git", "AWS", "Docker", "RESTful APIs", "Agile / Scrum"] },
];

const experience = [
  {
    role: "Full-Stack Developer",
    company: "Nexlify Solutions",
    period: "Jun 2024 – Nov 2025",
    points: [
      "Architected and shipped 5+ production React/Node.js applications serving 50k+ MAU.",
      "Led code review process and introduced LLM-assisted review workflows that reduced defect rate by 38%.",
      "Designed PostgreSQL schemas and REST APIs powering AI-driven analytics dashboards.",
      "Mentored 4 junior engineers on TypeScript, system design, and clean architecture.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Arc.Dev",
    period: "Jun 2023 – Mar 2024",
    points: [
      "Built scalable SaaS platforms with Next.js, Tailwind, and Node.js for US-based startups.",
      "Integrated Stripe, OAuth, and third-party APIs end-to-end.",
      "Optimized Lighthouse scores from 60s to 95+ through aggressive performance tuning.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Toptal",
    period: "Apr 2022 – Mar 2023",
    points: [
      "Delivered enterprise React and Python applications for vetted clients.",
      "Implemented robust authentication, RBAC, and audit-logging systems.",
      "Refactored legacy monoliths into modular service-oriented architectures.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Upwork",
    period: "Feb 2021 – Feb 2022",
    points: [
      "Maintained a 5-star rating across 30+ web development projects.",
      "Built MVPs for early-stage founders with React, Express, and MongoDB.",
      "Authored technical documentation and CI/CD pipelines using GitHub Actions.",
    ],
  },
];

type Project = {
  title: string;
  desc: string;
  longDesc: string;
  stack: string[];
  image: string;
  highlights: string[];
  demo?: string;
  source?: string;
  client?: string;
  year?: string;
};

const projects: Project[] = [
  {
    title: "Blue Diamond Plumbing of Texas",
    desc: "Production marketing site for a Fort Worth plumbing company — fast, SEO-optimized, and conversion-focused.",
    longDesc:
      "Designed and shipped a full marketing website for a local Texas plumbing business. The site is built for lead generation: prominent click-to-call CTAs, a free-estimate request flow, and crystal-clear service breakdowns. Deployed on Vercel with edge caching, perfect Lighthouse scores, and structured data for local SEO.",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Local SEO"],
    image: projectPlumbing,
    highlights: [
      "Click-to-call and free-estimate flows drove a 3x increase in qualified leads.",
      "Lighthouse Performance / SEO / Accessibility 95+ across the board.",
      "Local-business JSON-LD + on-page SEO for Fort Worth service keywords.",
      "Fully responsive, sub-second TTFB on Vercel edge.",
    ],
    demo: "https://blue-diamond-plumbing-texas.vercel.app/",
    client: "Blue Diamond Plumbing of Texas",
    year: "2025",
  },
  {
    title: "Herd Signal — Acoustic Elephant Conservation",
    desc: "Voice-first conservation platform that maps elephant herds, separates acoustic noise, and surfaces real-time field intelligence.",
    longDesc:
      "Herd Signal is a conservation-tech web app that fuses geospatial mapping, AI-powered acoustic source separation, and a voice-first exploration mode to help rangers and researchers monitor elephant herds. Built with a cinematic dark-forest aesthetic, interactive map intelligence, and an accessible voice interface so field teams can operate hands-free.",
    stack: ["React", "TypeScript", "Web Audio API", "MapLibre", "Tailwind CSS", "Voice UI"],
    image: herdSignal,
    highlights: [
      "Real-time acoustic noise separation isolates elephant vocalizations from ambient jungle audio.",
      "Voice-first navigation mode for hands-free field operation by rangers.",
      "Interactive herd map with live signal overlays and movement intelligence.",
      "Fully responsive cinematic UI deployed on Cloudflare Pages edge.",
    ],
    demo: "https://herdsignal.pages.dev/",
    client: "Conservation Tech",
    year: "2025",
  },
  {
    title: "AstraLecture — Cinematic Solar System Explorer",
    desc: "Interactive 3D solar system lesson with guided narration, planet tours, and live cosmic-time scaling.",
    longDesc:
      "AstraLecture is an educational web experience that lets learners fly through a real-time 3D solar system. Toggle between free exploration and a narrated guided tour that moves from the Milky Way outward through all eight planets, with rich per-body data panels (mass, gravity, atmosphere, distance from Sun), scale and cosmic-time sliders, and optional ambient soundtrack + voice narration.",
    stack: ["React", "Three.js", "React Three Fiber", "TypeScript", "Web Speech API", "Vercel"],
    image: astralecture,
    highlights: [
      "Real-time WebGL solar system rendered with React Three Fiber.",
      "Guided narrated tour using the Web Speech API with optional ambient audio.",
      "Live scale and cosmic-time controls for intuitive astronomical scale comparisons.",
      "Detailed data panels for the Sun and all 8 planets with Earth comparisons.",
    ],
    demo: "https://astralecture-2q5c.vercel.app/",
    client: "EdTech Project",
    year: "2025",
  },
  {
    title: "V-Twin Engine Assembly",
    desc: "Fully constrained V-twin engine assembly with motion study — pistons, connecting rods, and crankshaft modeled in SolidWorks.",
    longDesc:
      "A complete V-twin internal combustion engine assembly built in SolidWorks 2023. Designed transparent cylinder walls to expose piston travel, modeled the connecting rods and crankshaft as separate parts, and ran a Motion Study to validate the firing order and timing. Every mate was tested for full degree-of-freedom resolution.",
    stack: ["SolidWorks 2023", "Assembly Design", "Motion Study", "GD&T", "Mechanical Engineering"],
    image: cadVtwin,
    highlights: [
      "Fully constrained assembly with zero floating components.",
      "Animated piston / crankshaft motion study for firing-order validation.",
      "Transparent cylinder render for educational visualization.",
      "Mass properties calculated for balance analysis.",
    ],
    client: "Personal Engineering Project",
    year: "2024",
  },
  {
    title: "Inline-4 Crankshaft — Precision Part",
    desc: "Production-grade inline-4 crankshaft with hole specification, thread callouts, and tap-drill tolerancing in SolidWorks.",
    longDesc:
      "A manufacturable inline-4 crankshaft modeled to OEM tolerances. Used the Hole Wizard to spec blind threaded holes (M6.8 x 20mm) with proper tap-drill diameters per ISO standards. Counterweights were balanced through mass-properties iteration and the part is ready for CNC toolpath generation.",
    stack: ["SolidWorks", "Hole Wizard", "ISO Tolerancing", "CNC-Ready", "Surface Finish"],
    image: cadCrankshaft,
    highlights: [
      "Hole Wizard with proper tap-drill diameters and thread callouts.",
      "Counterweights mass-balanced via iterative analysis.",
      "Production-ready geometry — exports clean to STEP / IGES.",
      "Drawing package with GD&T per ASME Y14.5.",
    ],
    client: "Personal Engineering Project",
    year: "2024",
  },
  {
    title: "Industrial Sprocket Drive Sub-Assembly",
    desc: "Multi-part PDM-managed sub-assembly with sprocket, swing arm, tensioners, and over 20 fasteners — integrated with EnterpriseIQ.",
    longDesc:
      "A complex industrial drive sub-assembly (P/N 10000227) built inside an EnterpriseIQ PDM-controlled environment. Includes the drive sprocket, swing arm, dual tensioners, guide, spacer hub, and a full BOM of fasteners. Document Control linked every component back to the EnterpriseIQ MRP system so revisions stay in sync with the shop floor.",
    stack: ["SolidWorks 2020", "EnterpriseIQ PDM", "Sub-Assembly", "BOM Management", "Document Control"],
    image: cadSprocket,
    highlights: [
      "20+ unique parts managed under PDM revision control.",
      "Linked to EnterpriseIQ MRP for live BOM sync.",
      "Configurations support multiple drive ratios from one assembly.",
      "Exploded-view drawing for assembly-line work instructions.",
    ],
    client: "Manufacturing Client",
    year: "2023",
  },
  {
    title: "Helical Wood Screw — Swept Threads",
    desc: "Parametric self-tapping wood screw using Helix/Spiral, Swept Cut, and Phillips drive — fully reconfigurable fastener.",
    longDesc:
      "A self-tapping countersunk wood screw modeled parametrically. The thread is generated by a swept cut along a helical path so length, pitch, and major diameter all drive from a single design table. The Phillips drive recess is a true cross-extrude (not a decal) and the gimlet point is a lofted boss for accurate pilot behavior.",
    stack: ["SolidWorks 2022", "Helix / Spiral", "Swept Cut", "Design Tables", "Parametric Modeling"],
    image: cadScrew,
    highlights: [
      "Single design table drives 12 standard screw sizes.",
      "True swept-cut threads (not cosmetic) — prints accurately on resin printers.",
      "Phillips drive recess modeled to ANSI/ASME B18.6.3.",
      "Gimlet point built from a lofted boss for realistic pilot action.",
    ],
    client: "Personal Engineering Project",
    year: "2023",
  },
];

const testimonials = [
  {
    quote: "Stephen delivered our analytics platform ahead of schedule and the code quality was exceptional. He thinks like an architect, not just an implementer.",
    name: "Marcus Reid",
    role: "CTO, Fintech Startup",
  },
  {
    quote: "One of the best engineers we've worked with on Toptal. His LLM evaluation work uncovered issues our team had missed for months.",
    name: "Priya Shankar",
    role: "Engineering Manager",
  },
  {
    quote: "Stephen rebuilt our entire backend with zero downtime. Calm, methodical, and an excellent communicator throughout.",
    name: "Daniel Hwang",
    role: "Founder, B2B SaaS",
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-border/60 bg-background/80 backdrop-blur-lg" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">Stephen</span>
          <span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n, i) => (
            <li key={n.href}>
              <a href={n.href} className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <span className="font-mono text-xs text-primary">0{i + 1}.</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact">
          <Button size="sm" className="hidden sm:inline-flex">Hire me</Button>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <img src={heroBg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-float-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
            <Sparkles className="size-3" /> Available for Senior / LLM Eval roles
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
            Stephen
            <br />
            <span className="text-gradient">Smith.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Senior Full-Stack Software Engineer & AI Technical Specialist.
          </p>
          <p className="mt-2 max-w-xl font-mono text-sm text-primary/90">
            Building scalable applications<span className="mx-2 text-muted-foreground">|</span>
            Evaluating LLMs<span className="mx-2 text-muted-foreground">|</span>
            Crafting high-quality code
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-primary animate-blink" />
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects">
              <Button size="lg" className="animate-pulse-glow">
                View Projects <ArrowRight className="ml-1" />
              </Button>
            </a>
            <a
              href="/resume.pdf"
              download="Stephen-Smith-Resume.pdf"
              onClick={async (e) => {
                try {
                  const res = await fetch("/resume.pdf", { method: "HEAD" });
                  if (!res.ok) {
                    e.preventDefault();
                    alert("Resume is temporarily unavailable. Please contact me directly.");
                  }
                } catch {
                  // Allow default behavior if fetch fails (e.g. offline)
                }
              }}
            >
              <Button size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10 hover:text-primary">
                <Download /> Download Resume
              </Button>
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-fit">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/40 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-full border-2 border-primary/40 shadow-card">
            <img src={headshot} alt="Stephen Smith" width={400} height={400} className="size-72 object-cover sm:size-80 lg:size-96" />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full border border-primary/40 bg-card/90 px-4 py-2 font-mono text-xs backdrop-blur">
            <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-primary" />
            Open to work
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <h2 className="font-display text-3xl font-bold sm:text-4xl">
        <span className="mr-3 font-mono text-xl text-primary">{num}.</span>
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading num="01" title="About Me" />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-5 text-muted-foreground lg:col-span-2">
          <p>
            I'm a results-driven <span className="text-foreground">Full-Stack Software Engineer</span> with over 3 years of experience building production-grade web applications for U.S. clients and venture-backed startups.
          </p>
          <p>
            My core stack spans <span className="text-primary">Python, TypeScript, React.js, Node.js</span>, and modern relational and document databases. I care deeply about code quality, thoughtful system design, and the emerging discipline of <span className="text-primary">AI / LLM evaluation</span>.
          </p>
          <p>
            Over the last year I've focused on code review at scale, reasoning verification for large language models, performance optimization, and building reliable technical solutions that ship and stay shipped.
          </p>
          <p>
            Currently open to <span className="text-foreground">Senior Software Engineer</span>, <span className="text-foreground">LLM Evaluation</span>, and <span className="text-foreground">Full-Stack</span> opportunities — remote-first.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
          <h3 className="font-mono text-xs uppercase tracking-widest text-primary">At a glance</h3>
          {[
            ["3+", "Years building production apps"],
            ["50+", "Projects shipped"],
            ["30+", "Happy freelance clients"],
            ["100%", "Job success on Upwork"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-border/60 pb-3 last:border-0">
              <span className="font-display text-3xl font-bold text-gradient">{k}</span>
              <span className="text-right text-sm text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading num="02" title="Skills & Technologies" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ icon: Icon, title, items }) => (
          <div key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-card">
            <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <Icon className="mb-4 size-7 text-primary" />
            <h3 className="mb-3 font-display text-lg font-semibold">{title}</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" /> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading num="03" title="Experience" />
      <div className="relative space-y-10">
        <div className="absolute bottom-0 left-2 top-2 hidden w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:block" />
        {experience.map((e, i) => (
          <div key={i} className="relative md:pl-12">
            <div className="absolute left-0 top-2 hidden size-5 rounded-full border-2 border-primary bg-background md:block">
              <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-colors hover:border-primary/40 md:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">
                    {e.role} <span className="text-primary">@ {e.company}</span>
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">{e.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading num="04" title="Featured Projects" />
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.title}
            onClick={() => setActive(p)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" width={1280} height={800} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
              <span className="absolute left-4 top-4 rounded-md border border-primary/40 bg-background/70 px-2 py-1 font-mono text-xs text-primary backdrop-blur">
                0{i + 1} / Featured
              </span>
              <span className="absolute right-4 top-4 rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                View case study →
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-xs text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-primary/30 bg-card p-0">
        {project && (
          <>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
              <img src={project.image} alt={project.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl sm:text-3xl">
                  {project.title}
                </DialogTitle>
                {(project.client || project.year) && (
                  <DialogDescription className="font-mono text-xs text-primary">
                    {[project.client, project.year].filter(Boolean).join(" • ")}
                  </DialogDescription>
                )}
              </DialogHeader>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.longDesc}
              </p>

              <div className="mt-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.demo && project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <ExternalLink /> View Live Demo
                    </Button>
                  </a>
                )}
                {project.source && project.source !== "#" && (
                  <a href={project.source} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-primary/40">
                      <Github /> View Source
                    </Button>
                  </a>
                )}
                {(!project.demo || project.demo === "#") && (!project.source || project.source === "#") && (
                  <p className="text-xs text-muted-foreground">Private client project — links available on request.</p>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading num="05" title="Testimonials" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="relative rounded-2xl border border-border bg-card/40 p-7 backdrop-blur">
            <Quote className="absolute right-5 top-5 size-8 text-primary/30" />
            <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <div className="font-display font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const send = useServerFn(sendContactEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await send({ data: form });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send. Please email me directly.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading num="06" title="Let's Connect" />
      <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-card/40 p-8 shadow-card md:p-12">
        <div className="mb-10 text-center">
          <h3 className="font-display text-3xl font-bold sm:text-4xl">Have a project in mind?</h3>
          <p className="mt-3 text-muted-foreground">
            I'm currently available for Senior Software Engineer, LLM Evaluation, and Full-Stack roles — remote.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <a href="mailto:Smithstehen07@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <Mail className="size-4 text-primary" /> Smithstehen07@gmail.com
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Remote — Worldwide
            </span>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            maxLength={100}
            className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
            maxLength={255}
            className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your project…"
            maxLength={2000}
            className="sm:col-span-2 rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary resize-none"
          />
          <div className="sm:col-span-2 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {status === "sent" && "Thanks! I'll reply within 24 hours."}
              {status === "error" && <span className="text-destructive">{error}</span>}
              {status === "idle" && "I read every message personally."}
              {status === "sending" && "Sending…"}
            </p>
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sent" ? "Sent ✓" : status === "sending" ? "Sending…" : <>Send message <Send /></>}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stephen Smith. Built with care.
        </p>
        <div className="flex gap-5 text-muted-foreground">
          <a href="https://github.com/smithstehen07-maker" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary"><Github className="size-5" /></a>
          <a href="mailto:smithstehen07@gmail.com" aria-label="Email" className="transition-colors hover:text-primary"><Mail className="size-5" /></a>
        </div>
      </div>
    </footer>
  );
}
