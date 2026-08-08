import { createFileRoute } from '@tanstack/react-router'
import { Button, Loader, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const providerProps = [
	{
		default: '"light"',
		description:
			'The initial color scheme applied when no value is stored in localStorage.',
		name: 'defaultColorScheme',
		type: '"light" | "dark" | "system"',
	},
	{
		description:
			'Global theme configuration. Controls the primary color, font, and border radius for all components.',
		name: 'theme',
		type: '{ font?: "sans" | "serif" | "mono"; radius?: "none" | "lg" | "md" | "sm" }',
	},
	{
		description:
			'Internationalization overrides. Provide translation strings used by components internally.',
		name: 'translations',
		type: 'I18nTranslations',
	},
	{
		description:
			'Per-component configuration. Each key maps to a component name (e.g. button, loader, tooltip) and accepts a ComponentConfig object with classNames and defaultProps.',
		name: 'components',
		type: 'Record<ComponentName, ComponentConfig>',
	},
]

const componentConfigProps = [
	{
		description:
			'Maps slot names to CSS class strings. Classes are merged on top of the default styles for each internal slot of the component.',
		name: 'classNames',
		type: 'Partial<Record<SlotName, string>>',
	},
	{
		description:
			'Default prop values applied to every instance of the component. Instance-level props always take precedence over these defaults.',
		name: 'defaultProps',
		type: 'Partial<ComponentProps>',
	},
]

const setupCode = `import { Provider } from '@turystack/ui'
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
)`

const defaultPropsCode = `import { Button, Loader, Provider } from '@turystack/ui'

export function App() {
  return (
    <Provider
      components={{
        button: {
          defaultProps: { variant: 'outline', size: 'lg' },
        },
        loader: {
          defaultProps: { size: 'sm' },
        },
      }}
    >
      <Button>Uses outline + lg by default</Button>
      <Loader />
    </Provider>
  )
}`

const classNamesCode = `import { Button, Provider } from '@turystack/ui'

export function App() {
  return (
    <Provider
      components={{
        button: {
          classNames: {
            root: 'rounded-full',
            leftSection: 'opacity-70',
          },
        },
      }}
    >
      <Button>Pill button</Button>
    </Provider>
  )
}`

const themeCode = `import { Provider } from '@turystack/ui'

<Provider
  theme={{
    font: 'sans',
    radius: 'md',
  }}
>
  <App />
</Provider>`

const colorSchemeCode = `import { Provider } from '@turystack/ui'

// Start in dark mode
<Provider defaultColorScheme="dark">
  <App />
</Provider>

// Follow system preference
<Provider defaultColorScheme="system">
  <App />
</Provider>`

const fullConfigCode = `import { Provider } from '@turystack/ui'

<Provider
  defaultColorScheme="system"
  theme={{
    radius: 'lg',
  }}
  components={{
    button: {
      defaultProps: { variant: 'outline', size: 'md' },
      classNames: { root: 'rounded-full' },
    },
    tooltip: {
      defaultProps: { side: 'bottom' },
    },
    loader: {
      defaultProps: { size: 'sm' },
    },
  }}
>
  <App />
</Provider>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Provider
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A React context provider that configures global defaults and class
						names for all TuryStack components in its subtree.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={providerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						ComponentConfig shape
					</h2>
					<p className="text-muted-foreground text-sm">
						Every entry in the{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							components
						</code>{' '}
						object follows the{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							ComponentConfig
						</code>{' '}
						shape. It has two optional keys:{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							classNames
						</code>{' '}
						for injecting CSS classes into internal slots, and{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							defaultProps
						</code>{' '}
						for setting default prop values.
					</p>
					<PropsTable props={componentConfigProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Setup</h2>
					<p className="text-muted-foreground text-sm">
						Wrap your application root (or any subtree) with{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Provider
						</code>
						. Components outside the provider will still render, but they won't
						receive any global defaults or class name overrides.
					</p>
					<CodeBlock
						code={setupCode}
						filename="main.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Color scheme</h2>
					<p className="text-muted-foreground text-sm">
						Use{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							defaultColorScheme
						</code>{' '}
						to set the initial color scheme. The value is persisted in
						localStorage once the user changes it.
					</p>
					<CodeBlock
						code={colorSchemeCode}
						filename="App.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Theme</h2>
					<p className="text-muted-foreground text-sm">
						Use{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							theme
						</code>{' '}
						to configure the global visual identity. You can control the font
						family and border radius.
					</p>
					<CodeBlock
						code={themeCode}
						filename="App.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Default props</h2>
					<p className="text-muted-foreground text-sm">
						Use{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							defaultProps
						</code>{' '}
						to set prop values that apply to every instance of a component, so
						you don't have to repeat them at every call site. Instance-level
						props always take precedence.
					</p>
					<ComponentPreview title="Global size and variant defaults">
						<div className="flex flex-wrap items-center gap-4">
							<Provider
								components={{
									button: {
										defaultProps: {
											size: 'lg',
											variant: 'outline',
										},
									},
									loader: {
										defaultProps: {
											size: 'sm',
										},
									},
								}}
							>
								<Button>Button Configured</Button>
								<Loader />
							</Provider>
						</div>
					</ComponentPreview>
					<CodeBlock
						code={defaultPropsCode}
						filename="App.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Class name slots
					</h2>
					<p className="text-muted-foreground text-sm">
						Use{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							classNames
						</code>{' '}
						to inject Tailwind classes (or any CSS class) into specific internal
						slots of a component. Classes are merged on top of the default
						styles.
					</p>
					<ComponentPreview title="Pill-shaped buttons via classNames">
						<Provider
							components={{
								button: {
									classNames: {
										root: 'rounded-full',
									},
								},
							}}
						>
							<div className="flex flex-wrap gap-3">
								<Button>Default</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="secondary">Secondary</Button>
							</div>
						</Provider>
					</ComponentPreview>
					<CodeBlock
						code={classNamesCode}
						filename="App.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Full configuration
					</h2>
					<p className="text-muted-foreground text-sm">
						Combine color scheme, theme, and component config in a single
						provider for a complete setup.
					</p>
					<CodeBlock
						code={fullConfigCode}
						filename="App.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/provider')({
	component: Page,
})
