# ============================================================
# REPOGUARD — MANUAL REVIEW REQUIRED: src/utils/data.ts
# Scanned: 2026-07-02T22:01:41.910Z
# The following findings could NOT be automatically patched:
#   [CRITICAL] python-exec-compile: Python exec(compile()) obfuscation — common in PyPI malware
# ============================================================

// ─── Home Routes Data ───────────────────────────────────
export const HOME_ROUTES = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Compare", href: "#comparison" },
    { label: "What we detect", href: "#what-we-detect" },
    { label: "FAQ", href: "#faq" },
    // { label: "Changelog", href: "#changelog" },
    { label: "Home", href: "/" },
];

// ─── FAQ Data ───────────────────────────────────────────
export const FAQS = [
    {
        q: "Does RepoGuard support scanning private repositories?",
        a: "Yes. RepoGuard works seamlessly on both public and private repositories. During installation, you can choose to grant access to all repositories or select specific ones.",
    },
    {
        q: "What programming languages does it support?",
        a: "RepoGuard is language-agnostic. It scans source code (JavaScript, Python, Go, Shell script, etc.), CI/CD workflow configuration files (YAML), package configuration files (JSON, TXT), and environment files (.env).",
    },
    {
        q: "Does RepoGuard require write access to my repository?",
        a: "RepoGuard requests standard read/write access to check runs, pull requests, issues, and content. This is required so it can block malicious merges using check runs, open fix pull requests with automated patches, and open fallback security issues when direct branch creation is restricted.",
    },
    {
        q: "How does it handle false positives?",
        a: "While our 22+ detection rules are heavily optimized to prevent noise, you can configure exceptions by committing a `.repoguardignore` file to the root of your repository to ignore specific files or rules.",
    },
    {
        q: "Is my repository data stored or sent anywhere?",
        a: "No. RepoGuard reads files in memory to scan them and immediately discards the content. Findings (rule names and line locations) are saved in the database for tracking, but your actual codebase remains private.",
    },
];

// ─── 22 Rules Data ───────────────────────────────────────
export const ALL_RULES = [
    {
        tag: "CRITICAL",
        tagClass: "bg-brand-red/10 text-brand-red border border-brand-red/20",
        title: "Remote Code Execution",
        desc: "Detects curl|bash and wget|sh patterns — the most common malware delivery mechanism in compromised repos.",
    },
    {
        tag: "CRITICAL",
        tagClass: "bg-brand-red/10 text-brand-red border border-brand-red/20",
        title: "Reverse Shells",
        desc: "Catches # REMOVED BY REPOGUARD: reverse shell
    },
    {
        tag: "CRITICAL",
        tagClass: "bg-brand-red/10 text-brand-red border border-brand-red/20",
        title: "Obfuscated Payloads",
        desc: "Identifies base64-encoded eval() chains and obfuscated string array patterns used to hide malicious intent.",
    },
    {
        tag: "CRITICAL",
        tagClass: "bg-brand-red/10 text-brand-red border border-brand-red/20",
        title: "Python Obfuscation",
        desc: "exec(compile()) and dynamic __import__() calls — the standard toolkit for PyPI malware campaigns.",
    },
    {
        tag: "CRITICAL",
        tagClass: "bg-brand-red/10 text-brand-red border border-brand-red/20",
        title: "Workflow Misconfiguration",
        desc: "Flags pull_request_target with PR head checkout — a well-known GitHub Actions vector for fork-based RCE.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Crypto Miners",
        desc: "Detects # REMOVED BY REPOGUARD: crypto miner
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Secret Exfiltration",
        desc: "Catches environment variable reads combined with outbound HTTP calls — the pattern behind most token theft.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Typosquatted Packages",
        desc: "Scans package.json and requirements.txt against 100+ known typosquatted npm and PyPI package names.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Committed .env Files",
        desc: "Immediately flags .env, .env.production, and .env.local being pushed to any branch.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Malicious postinstall",
        desc: "Detects package.json postinstall scripts that make network calls — a supply chain attack staging ground.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Dependency Confusion",
        desc: "Detects attempts to hijack internal package scopes with public npm registry uploads.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Shell Injections in Actions",
        desc: "Flags dynamic inputs (like github.event.issue.title) directly interpolated in run: steps.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Dangerous docker run",
        desc: "Detects privileged containers, volume-mounted host sockets (like /var/run/docker.sock), and disabled security profiles in CI configs.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Suspicious curl parameters",
        desc: "Catches curl parameters like -k / --insecure combined with piping or downloading from non-whitelisted domains.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "SSH Key Exfiltration",
        desc: "Detects scans or push requests trying to read or copy files in ~/.ssh/ or private keys in the repository.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "CI Script Tampering",
        desc: "Detects direct modifications to CI configuration files during runtime execution of workflow files.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "Base64 Web Requests",
        desc: "Detects base64-encoded domains used within request libraries (axios, fetch, urllib) to bypass domain blacklists.",
    },
    {
        tag: "HIGH",
        tagClass: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
        title: "NPM publish overrides",
        desc: "Flags scripts that dynamically publish or modify package versions or registries during CI/CD.",
    },
    {
        tag: "MEDIUM",
        tagClass: "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20",
        title: "Hardcoded Secrets",
        desc: "Pattern-matches API keys, tokens, and passwords hardcoded in source files across any language.",
    },
    {
        tag: "MEDIUM",
        tagClass: "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20",
        title: "Unpinned Actions",
        desc: "Third-party GitHub Actions not pinned to a full commit SHA — a supply chain risk GitHub itself recommends fixing.",
    },
    {
        tag: "MEDIUM",
        tagClass: "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20",
        title: "Dynamic Script Execution",
        desc: "Flags suspicious use of eval(), Function(), or new Function() in Javascript/Typescript files.",
    },
    {
        tag: "MEDIUM",
        tagClass: "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20",
        title: "DNS Exfiltration",
        desc: "Catches dns lookup commands or nslookup/dig patterns executed inside install hooks to leak tokens.",
    },
];


// ─── Timeline / Changelog Data ───────────────────────────
export const CHANGELOGS = [
    {
        date: "June 28, 2026",
        title: "v1.2.0 - Typosquat & Actions Protection Upgrade",
        desc: "Added 100+ package typosquat signatures. Introduced checks for dynamic shell injections in GitHub Actions workflows.",
    },
    {
        date: "May 15, 2026",
        title: "v1.1.0 - Resilient Write Queue Implementation",
        desc: "Built a persistent Redis-backed queue with automatic local in-memory fallback. Safe writes are now fully guaranteed even during database outages.",
    },
    {
        date: "April 02, 2026",
        title: "v1.0.0 - Production Launch",
        desc: "Initial release of RepoGuard on the GitHub App marketplace. Added core 12 detection rules spanning reverse shells, obfuscated payloads, and remote code executions.",
    },
];
