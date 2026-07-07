"use client";

import { HOME_ROUTES } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLinksProps {
  type: "header" | "footer";
  className?: string;
  onClick?: () => void;
}

export function NavLinks({ type, className = "text-sm text-brand-muted hover:text-brand-white transition-colors", onClick }: NavLinksProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !hash;
    }

    if (href.startsWith("#")) {
      return isHome && hash === href;
    }

    return pathname === href;
  };

  const getLinkClassName = (href: string) =>
    isActiveRoute(href) ? `text-blue-accent font-semibold ${className}` : className;

  // Build the route list based on context
  const sectionRoutes = HOME_ROUTES.filter((r) => r.label !== "Home");

  const routes: { label: string; href: string }[] = [];

  if (isHome) {
    // On homepage: no "Home" link, section anchors stay as #hash
    if (type === "header") {
      routes.push(...sectionRoutes);
    } else {
      // Footer on homepage: show section links
      routes.push(...sectionRoutes);
    }
  } else {
    // Off homepage: show "Home" link
    routes.push({ label: "Home", href: "/" });

    if (type === "header") {
      // Header off-homepage: just Home + Privacy + Terms (no section links)
    } else {
      // Footer off-homepage: Home + section links with /#prefix + Privacy + Terms
      routes.push(
        ...sectionRoutes.map((r) => ({
          label: r.label,
          href: r.href.startsWith("#") ? `/${r.href}` : r.href,
        }))
      );
    }
  }

  return (
    <>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          onClick={onClick}
          className={getLinkClassName(route.href)}
        >
          {route.label}
        </Link>
      ))}
      <Link href="/privacy" onClick={onClick} className={getLinkClassName("/privacy")}>
        Privacy
      </Link>
      <Link href="/terms" onClick={onClick} className={getLinkClassName("/terms")}>
        Terms
      </Link>
    </>
  );
}