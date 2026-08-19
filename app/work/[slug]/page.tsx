import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — ${project.org}`, description: project.summary };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* Header */}
      <header className="hero-wash border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Link href="/#work" className="text-sm text-muted-foreground hover:text-primary">
            ← All work
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {p.org} · {p.period}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">My role:</span> {p.role}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Section title="The problem">
          {p.problem.map((t) => (
            <p key={t} className="leading-relaxed text-muted-foreground">{t}</p>
          ))}
        </Section>

        <Section title="What I built">
          {p.approach.map((t) => (
            <p key={t} className="leading-relaxed text-muted-foreground">{t}</p>
          ))}
        </Section>

        {/* Demo */}
        {p.demo && (
          <Section title="See it running">
            <figure>
              <video
                controls
                playsInline
                preload="metadata"
                poster={p.demo.poster}
                className="w-full rounded-xl border border-border bg-black shadow-sm"
              >
                <source src={p.demo.src} type="video/mp4" />
                Your browser can&apos;t play this video.{" "}
                <a href={p.demo.src} className="text-primary underline">Download it instead.</a>
              </video>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                {p.demo.caption}
              </figcaption>
            </figure>
          </Section>
        )}

        {/* Pipeline */}
        <Section title="How it works">
          <ol className="relative space-y-0 border-l border-border pl-8">
            {p.pipeline.map((s, i) => (
              <li key={s.step} className="relative pb-7 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[2.3rem] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card font-mono text-[0.65rem] text-primary"
                >
                  {i + 1}
                </span>
                <h3 className="font-medium">{s.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Outcome */}
        <Section title="Outcome">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.outcome.filter((m) => m.value !== "—").map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-5">
                <p className="text-2xl font-semibold tracking-tight text-primary">{m.value}</p>
                <p className="mt-1 text-sm font-medium">{m.label}</p>
                {m.note && <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.note}</p>}
              </div>
            ))}
          </div>
        </Section>

        {/* Decisions */}
        <Section title="Decisions worth explaining">
          <div className="space-y-6">
            {p.decisions.map((d) => (
              <div key={d.title} className="border-l-2 border-accent pl-5">
                <h3 className="font-medium">{d.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Stack + code */}
        <Section title="Stack">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                {s}
              </span>
            ))}
          </div>
          {p.codeNote && (
            <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{p.codeNote}</p>
              {p.repo && (
                <a href={p.repo} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                  View the repository →
                </a>
              )}
            </div>
          )}
        </Section>

        {/* Next */}
        <div className="mt-16 border-t border-border/70 pt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Next case study</p>
          <Link href={`/work/${next.slug}`} className="group mt-2 block">
            <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary">
              {next.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{next.org}</p>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
