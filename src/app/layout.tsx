import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepoGuard — Malware Detection for GitHub",
  description:
    "RepoGuard scans your GitHub repositories for malicious code, unauthorized pushes, and workflow-based re-infection. Install free on GitHub Marketplace.",
  icons: {
    icon: "/RepoGuard_logo.png",
  },
  openGraph: {
    title: "RepoGuard — Malware Detection for GitHub",
    description:
      "Automated security scanning for GitHub repos. Detects malware, blocks bad commits, opens fix PRs automatically.",
    url: "https://repoguard.ifecodes.xyz",
    siteName: "RepoGuard",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RepoGuard social card",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
