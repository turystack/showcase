import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

const themeProps = [
	{
		description:
			'Preset that defines baseColor, primaryColor, font and radius.',
		name: 'style',
		type: '"vega" | "nova" | "maia" | "lyra" | "mira"',
	},
	{
		description: 'Base color for backgrounds, borders and muted.',
		name: 'baseColor',
		type: '"neutral" | "stone" | "zinc" | "gray"',
	},
	{
		description: 'Primary color.',
		name: 'primaryColor',
		type: '"cyan" | "green" | "orange" | "pink" | "yellow" | "purple" | "red" | "blue" | "indigo" | "violet" | "fuchsia" | "rose"',
	},
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
    <button onClick={() => setTheme({ primaryColor: 'violet' })}>
      Change to violet
    </button>
  )
}`

const themeScriptCode = `import { getThemeScript } from '@turystack/ui'

// In your HTML head (SSR) — prevents flash of unstyled content
const script = getThemeScript({ style: 'vega' })
// Returns a <script> string that applies CSS variables before React hydrates`

const usageCode = `import { Provider } from '@turystack/ui'

function App() {
  return (
    <Provider
      theme={{
        style: 'nova',
        // Or override individual values:
        // primaryColor: 'green',
        // baseColor: 'stone',
        // font: 'serif',
        // radius: 'lg',
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
					A theming system powered by CSS variables with support for presets,
					colors, fonts and radius. Choose a built-in preset or override
					individual values to create your own visual identity.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">ThemeProps</h2>
				<PropsTable props={themeProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Presets</h2>
				<p className="text-muted-foreground text-sm">
					Each preset defines a complete set of theme values. You can use a
					preset as-is or override individual properties.
				</p>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="pr-4 pb-2 font-medium">Preset</th>
								<th className="pr-4 pb-2 font-medium">baseColor</th>
								<th className="pr-4 pb-2 font-medium">primaryColor</th>
								<th className="pr-4 pb-2 font-medium">font</th>
								<th className="pb-2 font-medium">radius</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-foreground">vega</td>
								<td className="py-2 pr-4">neutral</td>
								<td className="py-2 pr-4">blue</td>
								<td className="py-2 pr-4">sans</td>
								<td className="py-2">lg</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-foreground">nova</td>
								<td className="py-2 pr-4">zinc</td>
								<td className="py-2 pr-4">violet</td>
								<td className="py-2 pr-4">sans</td>
								<td className="py-2">md</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-foreground">maia</td>
								<td className="py-2 pr-4">stone</td>
								<td className="py-2 pr-4">green</td>
								<td className="py-2 pr-4">sans</td>
								<td className="py-2">lg</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-foreground">lyra</td>
								<td className="py-2 pr-4">gray</td>
								<td className="py-2 pr-4">orange</td>
								<td className="py-2 pr-4">sans</td>
								<td className="py-2">sm</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-foreground">mira</td>
								<td className="py-2 pr-4">neutral</td>
								<td className="py-2 pr-4">rose</td>
								<td className="py-2 pr-4">serif</td>
								<td className="py-2">md</td>
							</tr>
						</tbody>
					</table>
				</div>
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

export const Route = createFileRoute('/libs/ui/theme')({
	component: Page,
})
