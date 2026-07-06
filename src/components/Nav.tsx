"use client";

import { useState } from "react";
import { Menu, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { NavLinks } from "./NavLinks";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-navy-border bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-275 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-brand-white"
        >
          <ShieldAlert className="text-blue-accent" size={22} />
          <span>
            Repo<span className="text-blue-accent">Guard</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLinks
            type="header"
            className="text-sm text-brand-muted hover:text-brand-white transition-colors"
          />
          <a
            href="https://github.com/marketplace/repoguard-ifecodes"
            className="rounded-lg bg-blue-accent px-4 py-2 text-sm font-semibold text-brand-white hover:bg-blue-dim transition-all hover:scale-[1.02] duration-150"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Free →
          </a>
        </div>

        {/* Hamburger button */}
        <button
          className="block lg:hidden text-brand-white hover:text-blue-accent p-1 cursor-pointer transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden overflow-hidden bg-[#081222] border-b border-navy-border"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              <NavLinks
                type="header"
                className="text-base text-brand-muted hover:text-brand-white transition-colors"
                onClick={toggleMenu}
              />
              <a
                href="https://github.com/marketplace/repoguard-ifecodes"
                className="rounded-lg bg-blue-accent py-3 text-center text-sm font-semibold text-brand-white hover:bg-blue-dim transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Free →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
