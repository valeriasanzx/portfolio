import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { profile } from "@/content/site";
import "./globals.css";

const sans = Inter({ variable: "--font-sans-var", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-var", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="font-semibold tracking-tight hover:text-primary">
              Valeria Sanz Jones
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hidden hover:text-primary sm:block">
                  {n.label}
                </Link>
              ))}
              <a
                href={profile.github}
                className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-foreground hover:border-primary hover:text-primary"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border/70 py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {profile.name}</p>
            <div className="flex gap-5">
              <a className="hover:text-primary" href={`mailto:${profile.email}`}>Email</a>
              <a className="hover:text-primary" href={profile.github}>GitHub</a>
              {profile.linkedin && <a className="hover:text-primary" href={profile.linkedin}>LinkedIn</a>}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
