# RepoGuard — Marketing Site

The official marketing website for [RepoGuard](https://github.com/marketplace/repoguard-ifecodes), a GitHub App that detects and blocks malicious commits, unauthorized pushes, and supply chain attacks.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Language:** TypeScript

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── Nav.tsx           # Navigation
│   └── Footer.tsx        # Footer
│   └── NavLinks.tsx        # Navlink configuration
└── utils/
    └── index.ts          # ALL_RULES, CHANGELOGS, FAQS data
```

## Sections

- **Hero** — Animated terminal mockup showing RepoGuard in action
- **Stats** — Animated counters (detection rules, typosquat signatures, scan time)
- **How It Works** — 3-step install → scan → fix flow
- **Comparison** — Feature table vs Dependabot and GitHub CodeQL
- **Detection Coverage** — All 22+ detection rules with expandable grid
- **FAQ** — Accordion with common questions
- **Changelog** — Timeline of rule updates and releases
- **CTA** — Install call to action

## Customization

All page content (rules, FAQs, changelog entries) lives in `src/utils/index.ts` — update those arrays to change what's displayed without touching the components.

## Related

- [RepoGuard GitHub App Codebase](https://github.com/ALADETAN-IFE/repoguard)
- [GitHub Marketplace Listing](https://github.com/marketplace/repoguard-ifecodes)