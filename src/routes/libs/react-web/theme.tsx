import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

const themeProps = [
	{
		description: 'Global font family.',
		name: 'font',
		type: '"sans" | "serif" | "mono"',
	},
	{
		description: 'Global border radius.',
		name: 'radius',
		type: '"none" | "lg" | "md" | "sm"',
	},
]

const useThemeCode = `import { useTheme } from '@turystack/ui'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme({ radius: 'lg' })}>
      Change radius
    </button>
  )
}`

const themeScriptCode = `import { getThemeScript } from '@turystack/ui'

// In your HTML head (SSR) — prevents flash of unstyled content
const script = getThemeScript({ font: 'sans' })
// Returns a <script> string that applies CSS variables before React hydrates`

const usageCode = `import { Provider } from '@turystack/ui'

function App() {
  return (
    <Provider
      theme={{
        font: 'serif',
        radius: 'lg',
      }}
    >
      {children}
    </Provider>
  )
}`

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Theme
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A theming system powered by CSS variables; override individual values
					like font and radius.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">ThemeProps</h2>
				<PropsTable props={themeProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">useTheme hook</h2>
				<p className="text-muted-foreground text-sm">
					Access and update the current theme at runtime from any component
					inside the Provider.
				</p>
				<CodeBlock
					code={useThemeCode}
					filename="example.tsx"
					language="tsx"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">getThemeScript</h2>
				<p className="text-muted-foreground text-sm">
					Inject a blocking script in your HTML head to apply CSS variables
					before React hydrates, preventing a flash of unstyled content.
				</p>
				<CodeBlock
					code={themeScriptCode}
					filename="example.tsx"
					language="tsx"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Usage via Provider
				</h2>
				<p className="text-muted-foreground text-sm">
					Pass the{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">theme</code>{' '}
					prop to the Provider to configure the global visual identity.
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

export const Route = createFileRoute('/libs/react-web/theme')({
	component: Page,
})
