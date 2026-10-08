import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	type ColorScheme,
	ColorSchemeSwitcher,
	useColorScheme,
} from '@turystack/react-web'
import { useEffect, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/color-scheme-provider/color-scheme-provider.types.ts`
 * and the destructuring default in `color-scheme-provider.tsx`
 * (`defaultColorScheme = 'system'`). The storage key, the media query and the
 * transition-suppression trick all come from the same file.
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
		description: 'Starting scheme; a stored preference wins.',
		name: 'defaultColorScheme',
		type: '"system" | "dark" | "light"',
	},
]

const hookProps = [
	{
		description: 'What was chosen, possibly "system" — not the resolved one.',
		name: 'colorScheme',
		type: '"system" | "dark" | "light"',
	},
	{
		description: 'Persists the scheme and re-renders every consumer.',
		name: 'changeColorScheme',
		type: '(colorScheme: ColorScheme) => void',
	},
]

/** Each behaviour is one sentence: the detail is in the source, not here. */
const behaviour = [
	{
		term: 'Persistence',
		what: 'The choice is written to localStorage under turystack-color-scheme, read once in the initial state. A valid stored value beats defaultColorScheme; anything else is discarded.',
	},
	{
		term: 'Resolution',
		what: 'On system the provider follows (prefers-color-scheme: dark) with a live listener. Picking an explicit scheme removes it.',
	},
	{
		term: 'What lands on the document',
		what: 'The root element gets the light or dark class — what the stylesheet keys off — plus a matching data-color-scheme attribute for your own selectors.',
	},
	{
		term: 'No cross-fade',
		what: 'Every CSS transition is suppressed by an injected stylesheet for the two frames the swap takes, so a theme change does not animate hundreds of colours at once.',
	},
	{
		term: 'Other tabs',
		what: 'A storage listener follows the key across tabs of the same origin. If another tab clears the preference, this one falls back to defaultColorScheme — the one moment that prop matters after the first visit.',
	},
	{
		term: 'Browser only',
		what: 'The initial state reads localStorage with no typeof window guard, so the provider cannot be server-rendered as it stands.',
	},
]

const usageCode = `import {
  ColorSchemeProvider,
  useColorScheme,
} from '@turystack/react-web'

// Wrap the app once. TuryProvider already does this for you —
// reach for ColorSchemeProvider directly only when you do not
// want the toaster that TuryProvider also mounts.
<ColorSchemeProvider defaultColorScheme="system">
  <App />
</ColorSchemeProvider>

// Read and write the scheme from anywhere below it
function ThemeMenu() {
  const { colorScheme, changeColorScheme } = useColorScheme()

  return (
    <select
      onChange={(event) =>
        changeColorScheme(event.target.value as ColorScheme)
      }
      value={colorScheme}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  )
}

// Outside a provider the hook throws rather than guessing:
// "useColorScheme must be used within a TuryProvider"`

const SCHEMES: ColorScheme[] = [
	'light',
	'dark',
	'system',
]

/** Mirrors what the provider wrote onto <html>, so "system" is legible. */
function useResolvedScheme() {
	const [resolved, setResolved] = useState(
		() => document.documentElement.dataset.colorScheme ?? 'unset',
	)

	useEffect(() => {
		const root = document.documentElement
		const read = () => setResolved(root.dataset.colorScheme ?? 'unset')
		const observer = new MutationObserver(read)

		observer.observe(root, {
			attributeFilter: [
				'class',
				'data-color-scheme',
			],
		})
		read()

		return () => observer.disconnect()
	}, [])

	return resolved
}

function SchemeConsole() {
	const { changeColorScheme, colorScheme } = useColorScheme()
	const resolved = useResolvedScheme()

	return (
		<div className="flex w-full max-w-sm flex-col items-center gap-4">
			<div className="flex flex-wrap justify-center gap-2">
				{SCHEMES.map((scheme) => (
					<Button
						key={scheme}
						onClick={() => changeColorScheme(scheme)}
						size="sm"
						variant={colorScheme === scheme ? 'default' : 'outline'}
					>
						{scheme}
					</Button>
				))}
			</div>
			<dl className="grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
				<dt className="text-muted-foreground">colorScheme</dt>
				<dd>
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{colorScheme}
					</code>
				</dd>
				<dt className="text-muted-foreground">{'<html data-color-scheme>'}</dt>
				<dd>
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{resolved}
					</code>
				</dd>
			</dl>
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
					ColorSchemeProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Holds the light/dark choice, persists it, and resolves system against
					the operating system.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={providerProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">useColorScheme()</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Outside a provider it throws{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						useColorScheme must be used within a TuryProvider
					</code>
					.
				</p>
				<PropsTable props={hookProps} />
			</section>

			<SlotsSection slug="color-scheme-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Live</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					This site is already inside a provider, so the buttons below drive the
					real thing — the page and the stored preference change with them.
				</p>
				<ComponentPreview title="Choice versus resolution">
					<SchemeConsole />
				</ComponentPreview>
				<ComponentPreview title="The same state, through ColorSchemeSwitcher">
					<ColorSchemeSwitcher />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it does</h2>
				<dl className="max-w-prose space-y-3 text-sm">
					{behaviour.map((entry) => (
						<div key={entry.term}>
							<dt className="font-medium">{entry.term}</dt>
							<dd className="text-muted-foreground">{entry.what}</dd>
						</div>
					))}
				</dl>
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
	'/libs/react-web/components/color-scheme-provider',
)({
	component: Page,
})
