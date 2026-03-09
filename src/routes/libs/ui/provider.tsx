import { createFileRoute } from '@tanstack/react-router'
import { Button, Loader, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const providerProps = [
	{
		description:
			'Per-component configuration. Each key maps to a component and accepts a ComponentConfig object.',
		name: 'components',
		type: '{ button?: ComponentConfig<ButtonProps, ButtonSlots>; loader?: ComponentConfig<LoaderProps, LoaderSlots> }',
	},
	{
		description:
			'Configuration for a specific component. classNames maps slot names to class strings; defaultProps sets prop defaults for every instance.',
		name: 'ComponentConfig<T, S>',
		type: '{ classNames?: Partial<Record<S, string>>; defaultProps?: Partial<T> }',
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
											variant: 'outline',
											size: 'lg',
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
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={providerProps} />
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/provider')({
	component: Page,
})
