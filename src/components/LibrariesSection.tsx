import { Link } from '@tanstack/react-router'
import { Anchor, FileText, Palette, Plug, Shield, Wrench } from 'lucide-react'
import { useId } from 'react'

import { LibraryCard } from './docs/LibraryCard'

const libraries = [
  {
    color: 'cyan' as const,
    description:
      'A headless, accessible component library for React with built-in theming, animations, and dark mode support. Inspired by Radix and shadcn.',
    downloads: '120k',
    href: '/libs/ui' as const,
    icon: <Palette size={20} />,
    name: '@tury/ui',
    tagline: 'React UI Components',
    version: 'v2.4.0',
  },
  {
    color: 'orange' as const,
    description:
      '30+ battle-tested hooks for state, effects, DOM, and async operations. Fully typed, tree-shakeable, and SSR-compatible.',
    downloads: '95k',
    icon: <Anchor size={20} />,
    name: '@tury/hooks',
    tagline: 'React Hooks Collection',
    version: 'v1.8.2',
  },
  {
    color: 'green' as const,
    description:
      'Automatic OpenAPI/Swagger generation for NestJS with live playground, schema validation, and beautiful documentation UI out of the box.',
    downloads: '68k',
    icon: <FileText size={20} />,
    name: '@tury/nest-docs',
    tagline: 'NestJS Auto Documentation',
    version: 'v3.1.0',
  },
  {
    color: 'pink' as const,
    description:
      'End-to-end type safety from your backend to frontend. Auto-generates typed clients from OpenAPI specs with built-in caching and retry logic.',
    downloads: '82k',
    icon: <Plug size={20} />,
    name: '@tury/api-client',
    tagline: 'Type-Safe API Client',
    version: 'v1.5.1',
  },
  {
    color: 'yellow' as const,
    description:
      'Runtime validation for TypeScript with NestJS guards, pipe transforms, and Zod-compatible schemas. Zero dependencies, tiny bundle.',
    downloads: '54k',
    icon: <Shield size={20} />,
    name: '@tury/guard',
    tagline: 'Schema Validation & Guards',
    version: 'v2.0.3',
  },
  {
    color: 'purple' as const,
    description:
      'Interactive CLI to scaffold full-stack projects with React + NestJS. Templates for monorepos, microservices, and serverless setups.',
    downloads: '41k',
    icon: <Wrench size={20} />,
    name: '@tury/cli',
    tagline: 'Project Scaffolding CLI',
    version: 'v1.2.0',
  },
]

export function LibrariesSection() {
  const id = useId()

  return (
    <section
      className="py-24"
      id={id}
    >
      <div className="container">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            The <span className="text-tury-cyan">tury</span> ecosystem
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Modular, composable packages that work together seamlessly — or
            standalone.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {libraries.map((lib, i) => (
            <div
              className="animate-fade-in-up"
              key={lib.name}
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              {lib.href ? (
                <Link to={lib.href}>
                  <LibraryCard {...lib} />
                </Link>
              ) : (
                <LibraryCard {...lib} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
