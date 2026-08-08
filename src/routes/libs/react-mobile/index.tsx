import { createFileRoute, Link } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { reactMobileDocs } from '@/data/react-mobile-docs'

export const Route = createFileRoute('/libs/react-mobile/')({
	component: ReactMobilePage,
})

function ReactMobilePage() {
	return (
		<div className="space-y-10">
			<header>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-mobile
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					React Native components for Expo applications, with a public API
					aligned with react-web and native implementations for gestures,
					sheets, pickers, safe areas, and navigation.
				</p>
			</header>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-mobile',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-mobile',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-mobile',
							label: 'yarn',
						},
					]}
				/>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">
					Platform contract
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Built with React Native primitives and Expo integrations, not
							WebView components.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">Select</code> keeps its semantic name
							and uses a Sheet internally on mobile.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Platform-specific appearance hooks stay in this package; generic
							utilities stay in react-hooks.
						</span>
					</li>
				</ul>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Setup</h2>
				<CodeBlock
					code={`import { Button, TuryProvider, Typography } from '@turystack/react-mobile'

export default function App() {
  return (
    <TuryProvider defaultColorScheme="system">
      <Typography variant="heading">Ready to go?</Typography>
      <Button onPress={() => console.log('Pressed')}>Continue</Button>
    </TuryProvider>
  )
}`}
					filename="App.tsx"
					language="tsx"
				/>
			</section>

			<section className="border border-border bg-card p-5">
				<h2 className="font-display font-semibold text-xl">Component API</h2>
				<p className="mt-2 text-muted-foreground text-sm">
					The documentation contains {reactMobileDocs.length} component pages
					with props, variants, compound APIs, examples, and native behavior
					notes.
				</p>
				<Link
					className="mt-4 inline-block font-medium text-lib text-sm underline underline-offset-4"
					to="/libs/react-mobile/components"
				>
					Browse all components
				</Link>
			</section>
		</div>
	)
}
