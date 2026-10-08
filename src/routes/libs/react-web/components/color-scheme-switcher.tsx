import { createFileRoute, Link } from '@tanstack/react-router'
import type { PartialTuryLabels } from '@turystack/react-web'
import {
	ColorSchemeSwitcher,
	LabelsProvider,
	useColorScheme,
} from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/color-scheme-switcher/color-scheme-switcher.types.ts`.
 * `ColorSchemeSwitcherProps` has exactly one member; the default comes from
 * `defaultVariants: { size: 'md' }` in the component's `tv()` call.
 */
const switcherProps = [
	{
		default: '"md"',
		description: 'Track height and icon size: sm 28px, md 32px, lg 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const usageCode = `import {
  ColorSchemeSwitcher,
  TuryProvider,
  useColorScheme,
} from '@turystack/react-web'

// The switcher reads and writes the provider's state, so it needs
// a TuryProvider (or a bare ColorSchemeProvider) above it.
<TuryProvider defaultColorScheme="system">
  <App />
</TuryProvider>

// Drop it in a header — it is self-contained, no props required
<ColorSchemeSwitcher />
<ColorSchemeSwitcher size="sm" />
<ColorSchemeSwitcher size="lg" />

// Same state, reachable from your own code
function SchemeLabel() {
  const { colorScheme, changeColorScheme } = useColorScheme()

  return (
    <button onClick={() => changeColorScheme('dark')} type="button">
      Currently {colorScheme}
    </button>
  )
}`

/** Module scope: the provider memoises on this reference. */
const ptBRScheme: PartialTuryLabels = {
	colorSchemeSwitcher: {
		dark: 'Escuro',
		label: 'Esquema de cores',
		light: 'Claro',
		system: 'Sistema',
	},
}

function SchemeReadout() {
	const { colorScheme } = useColorScheme()

	return (
		<div className="flex flex-col items-center gap-3">
			<ColorSchemeSwitcher />
			<p className="text-muted-foreground text-sm">
				<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
					colorScheme
				</code>{' '}
				is{' '}
				<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
					{colorScheme}
				</code>
			</p>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					ColorSchemeSwitcher
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A stateless light / dark / system control wired to the colour scheme
					provider.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={switcherProps} />
			</section>

			<SlotsSection slug="color-scheme-switcher" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Live</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Not sandboxed: this site is wrapped in a TuryProvider, so clicking
					really does switch the page.
				</p>
				<ComponentPreview title="The switcher, and what the provider now holds">
					<SchemeReadout />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every switcher on the page shares one piece of state, so all three
					below move together.
				</p>
				<ComponentPreview title="sm, md and lg">
					<div className="flex flex-wrap items-center justify-center gap-6">
						{(
							[
								'sm',
								'md',
								'lg',
							] as const
						).map((size) => (
							<div
								className="flex flex-col items-center gap-2"
								key={size}
							>
								<ColorSchemeSwitcher size={size} />
								<code className="text-muted-foreground text-xs">{size}</code>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The three options
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The options are fixed and in this order: sun for{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						light
					</code>
					, moon for{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dark
					</code>
					, monitor for{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						system
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Accessibility</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The control is a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="radiogroup"
					</code>{' '}
					labelled "Color scheme", holding three{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="radio"
					</code>{' '}
					buttons labelled Light, Dark and System.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Its four names come from the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						colorSchemeSwitcher
					</code>{' '}
					group of{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/labels-provider"
					>
						LabelsProvider
					</Link>
					:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						label
					</code>{' '}
					names the group, and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						light
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dark
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						system
					</code>{' '}
					the options.
				</p>
				<ComponentPreview title="Inside LabelsProvider, in pt-BR">
					<LabelsProvider labels={ptBRScheme}>
						<ColorSchemeSwitcher />
					</LabelsProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/color-scheme-switcher',
)({
	component: Page,
})
