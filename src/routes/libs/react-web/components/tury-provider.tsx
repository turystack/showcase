import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable, SlotsSection } from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/tury-provider/tury-provider.types.ts` —
 * `TuryProviderProps` is `PropsWithChildren<{ defaultColorScheme?: ColorScheme,
 * labels?: PartialTuryLabels, portalContainer?: PortalContainer }>` and nothing
 * more.
 *
 * Every prop is forwarded, unread, to the provider that owns it. This page
 * therefore documents the composition and stops there: what each prop means is
 * on that provider's own page, which is also where the previews live.
 */
const providerProps = [
	{
		description: 'The application the provider wraps.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"system"',
		description: 'ColorSchemeProvider’s first-visit default; storage wins.',
		name: 'defaultColorScheme',
		type: '"system" | "dark" | "light"',
	},
	{
		default: 'undefined',
		description: 'LabelsProvider overrides, merged over English defaults.',
		name: 'labels',
		type: 'PartialTuryLabels',
	},
	{
		default: 'undefined',
		description: 'FormatProvider locale, time zone and currency.',
		name: 'format',
		type: 'FormatDefaults',
	},
	{
		default: 'undefined',
		description: 'PortalProvider container; unset, overlays go to body.',
		name: 'portalContainer',
		type: 'HTMLElement | null | (() => HTMLElement | null)',
	},
]

const compositionCode = `// tury-provider.tsx, in full
export function TuryProvider({
  children,
  defaultColorScheme,
  labels,
  portalContainer,
}: TuryProviderProps) {
  return (
    <PortalProvider container={portalContainer}>
      <LabelsProvider labels={labels}>
        <ColorSchemeProvider defaultColorScheme={defaultColorScheme}>
          {children}
          <Toast />
        </ColorSchemeProvider>
      </LabelsProvider>
    </PortalProvider>
  )
}`

const usageCode = `import { TuryProvider } from '@turystack/react-web'
import '@turystack/react-web/styles.css'

// One provider, at the root, above the router
createRoot(document.getElementById('root')!).render(
  <TuryProvider defaultColorScheme="system">
    <App />
  </TuryProvider>,
)

// All three concerns configured at once
<TuryProvider
  defaultColorScheme="dark"
  labels={{ common: { cancel: 'Cancelar' } }}
  portalContainer={() => document.getElementById('overlays')}
>
  <App />
</TuryProvider>

// Everything below it now works
const { colorScheme, changeColorScheme } = useColorScheme()
const labels = useLabels()
toast.success('Saved')`

/** Slugs are referenced as text: these pages are siblings in the sidebar. */
const parts = [
	{
		provides: 'The DOM node every overlay portals into.',
		reads: 'portalContainer',
		slug: 'portal-provider',
	},
	{
		provides: 'Every string the library renders, merged over the defaults.',
		reads: 'labels',
		slug: 'labels-provider',
	},
	{
		provides: 'The light/dark choice, persisted and painted onto <html>.',
		reads: 'defaultColorScheme',
		slug: 'color-scheme-provider',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					TuryProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The one element an application mounts at its root.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={providerProps} />
			</section>

			<SlotsSection slug="tury-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it composes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Outside in:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						PortalProvider
					</code>{' '}
					→{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						LabelsProvider
					</code>{' '}
					→{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ColorSchemeProvider
					</code>
					, with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'<Toast />'}
					</code>{' '}
					after the children.
				</p>
				<CodeBlock
					code={compositionCode}
					filename="tury-provider.tsx"
					language="tsx"
				/>
				<div className="overflow-hidden rounded-lg border border-border">
					<table className="w-full text-sm">
						<tbody>
							{parts.map((part) => (
								<tr
									className="border-border border-b last:border-b-0"
									key={part.slug}
								>
									<td className="px-4 py-3 align-top">
										<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
											{part.slug}
										</code>
									</td>
									<td className="px-4 py-3 align-top text-muted-foreground">
										reads{' '}
										<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
											{part.reads}
										</code>{' '}
										— {part.provides}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="max-w-prose text-muted-foreground text-sm">
					Use the individual providers for one concern alone, e.g. a subtree in
					a second language.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="main.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/tury-provider',
)({
	component: Page,
})
