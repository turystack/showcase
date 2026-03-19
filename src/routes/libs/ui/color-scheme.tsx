import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

const colorSchemeProps = [
	{
		default: '"light"',
		description: 'The initial color scheme, passed via Provider.',
		name: 'defaultColorScheme',
		type: '"light" | "dark" | "system"',
	},
]

const hookCode = `import { useColorScheme } from '@turystack/ui'

function ThemeToggle() {
  const { colorScheme, changeColorScheme } = useColorScheme()

  return (
    <button onClick={() => changeColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
      Current: {colorScheme}
    </button>
  )
}`

const usageCode = `import { Provider } from '@turystack/ui'

function App() {
  return (
    <Provider defaultColorScheme="system">
      {children}
    </Provider>
  )
}`

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ColorScheme
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Manages light, dark and system color schemes with automatic
					localStorage persistence. The resolved scheme is applied as a class on
					the document root so CSS variables adapt instantly.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={colorSchemeProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground text-sm">
					The color scheme is persisted in localStorage under the key{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						colorScheme
					</code>
					. When the scheme changes, the class{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">light</code>{' '}
					or{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">dark</code>{' '}
					is added to{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						document.documentElement
					</code>
					. When set to{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">system</code>
					, the resolved value is determined by{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						matchMedia('(prefers-color-scheme: dark)')
					</code>
					.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					useColorScheme hook
				</h2>
				<p className="text-muted-foreground text-sm">
					Read the current color scheme and change it programmatically from any
					component inside the Provider.
				</p>
				<CodeBlock
					code={hookCode}
					filename="example.tsx"
					language="tsx"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Usage via Provider
				</h2>
				<p className="text-muted-foreground text-sm">
					Pass{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						defaultColorScheme
					</code>{' '}
					to the Provider to set the initial color scheme for your application.
				</p>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/ui/color-scheme')({
	component: Page,
})
