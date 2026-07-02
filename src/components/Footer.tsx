"use client";

import { NavLinks } from "./NavLinks";

export default function Footer() {
  return (
    <footer className="border-t border-navy-border bg-navy py-12">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">
          <div className="font-mono font-bold text-base text-brand-white">
            <span>Repo<span className="text-blue-accent">Guard</span></span>
          </div>
          
          <div className="flex gap-6 text-sm flex-wrap justify-center items-center">
            <NavLinks
              type="footer"
              className="text-brand-muted hover:text-brand-white transition-colors"
            />
            <a
              href="https://github.com/ALADETAN-IFE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-muted hover:text-brand-white transition-colors"
            >
              GitHub
            </a>
          </div>
          
          <p className="text-xs text-[#3a5878]">
            © 2026 IfeCodes. Built by{" "}
            <a 
              href="https://ifecodes.xyz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-accent transition-colors"
            >
              IfeCodes
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
