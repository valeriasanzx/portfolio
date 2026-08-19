import Link from "next/link";
import { projects } from "@/content/projects";
import { profile, experience, skills } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-wash border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {profile.title}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-soft"
            >
              See the work
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Selected work"
          title="Three systems that replaced manual work"
          sub="Each one started as a task someone was doing by hand. Click through for the problem, the build, and what changed."
        />
        <div className="mt-10 grid gap-5">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:border-primary hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">
                    {p.org}
                  </p>
                  <h3 className="mt-1.5 text-xl font-semibold tracking-tight group-hover:text-primary">
                    {p.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground">{p.period}</span>
              </div>

              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {p.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/70 pt-5">
                <div>
                  <p className="text-lg font-semibold text-primary">{p.headline.value}</p>
                  <p className="text-xs text-muted-foreground">{p.headline.label}</p>
                </div>
                <div className="ml-auto flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-y border-border/60 bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
          <div className="mt-10 space-y-10">
            {experience.map((e) => (
              <div key={e.org + e.period} className="grid gap-4 sm:grid-cols-[13rem_1fr]">
                <div>
                  <p className="text-sm font-medium">{e.period}</p>
                  <p className="text-sm text-muted-foreground">{e.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight">
                    {e.role} <span className="text-muted-foreground">· {e.org}</span>
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                    {e.project && (
                      <Link href={`/work/${e.project}`} className="text-xs font-medium text-primary hover:underline">
                        Read the case study →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills + About */}
      <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About" title="How I work" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              {profile.bio.map((p) => <p key={p}>{p}</p>)}
            </div>
            <dl className="mt-8 space-y-4 border-t border-border/70 pt-6 text-sm">
              <div>
                <dt className="font-medium">{profile.education.school}</dt>
                <dd className="text-muted-foreground">{profile.education.degree}</dd>
                <dd className="text-muted-foreground">{profile.education.minor}</dd>
                <dd className="text-muted-foreground">
                  {profile.education.graduation} · GPA {profile.education.gpa}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Certifications</dt>
                {profile.certifications.map((c) => (
                  <dd key={c} className="text-muted-foreground">{c}</dd>
                ))}
              </div>
              <div>
                <dt className="font-medium">Languages</dt>
                <dd className="text-muted-foreground">{profile.languages.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          <div>
            <SectionHeading eyebrow="Skills" title="What I work with" />
            <div className="mt-6 space-y-6">
              {skills.map((s) => (
                <div key={s.group}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{s.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <span key={i} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60 bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <SectionHeading eyebrow="Contact" title="Let's talk" center />
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            I'm looking for roles where I can build GenAI tools that a real team uses every day.
            Based in {profile.location}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-soft"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow, title, sub, center,
}: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : undefined}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}
