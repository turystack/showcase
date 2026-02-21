import { ArrowRight, Boxes } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-glow-pulse rounded-full bg-tury-cyan/10 blur-[120px]" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-glow-pulse rounded-full bg-tury-purple/10 blur-[120px]"
          style={{
            animationDelay: '1.5s',
          }}
        />
      </div>

      <div className="container relative text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Boxes
            className="text-tury-cyan"
            size={14}
          />
          Open Source Libraries for Modern Development
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
          High-quality tools for{' '}
          <span className="bg-gradient-to-r from-tury-cyan via-tury-purple to-tury-pink bg-clip-text text-transparent">
            the JS ecosystem
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Type-safe, performant, and beautifully designed libraries for React,
          NestJS, and Node.js. From UI components to backend tooling — built by
          developers, for developers.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            className="inline-flex items-center gap-2 rounded-lg bg-tury-cyan px-6 py-3 text-sm font-semibold text-background transition-all hover:brightness-110 hover:shadow-lg hover:shadow-tury-cyan/25"
            href="#libraries"
          >
            Explore Libraries
            <ArrowRight size={16} />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
          {[
            {
              label: 'GitHub Stars',
              value: '12k+',
            },
            {
              label: 'Weekly Downloads',
              value: '500k+',
            },
            {
              label: 'Packages',
              value: '6',
            },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl font-bold md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
