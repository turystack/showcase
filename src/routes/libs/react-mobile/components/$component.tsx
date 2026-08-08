import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react'

import { CodeBlock, PropsTable } from '@/components'

import { getReactMobileCompoundDocs } from '@/data/react-mobile-compounds'
import { getReactMobileDoc, reactMobileDocs } from '@/data/react-mobile-docs'
import { getReactMobileUsageExamples } from '@/data/react-mobile-usage'

export const Route = createFileRoute(
	'/libs/react-mobile/components/$component',
)({
	component: MobileComponentPage,
})

function quoteOption(value: string) {
	return /^\d+$/.test(value) ? value : `"${value}"`
}

function exampleFilename(title: string) {
	return `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}.tsx`
}

function MobileComponentPage() {
	const { component: slug } = Route.useParams()
	const component = getReactMobileDoc(slug)

	if (!component) {
		return (
			<div className="space-y-4">
				<h1 className="font-bold font-display text-3xl">Component not found</h1>
				<Link
					className="text-lib underline underline-offset-4"
					to="/libs/react-mobile/components"
				>
					Return to components
				</Link>
			</div>
		)
	}

	const currentIndex = reactMobileDocs.findIndex((item) => item.slug === slug)
	const previous = reactMobileDocs[currentIndex - 1]
	const next = reactMobileDocs[currentIndex + 1]
	const compoundDocs = getReactMobileCompoundDocs(slug)
	const usageExamples = getReactMobileUsageExamples(slug)

	return (
		<div className="space-y-10">
			<header className="border-border border-b pb-8">
				<div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
					<span className="text-lib">{component.category}</span>
					<span className="text-muted-foreground">/ React Native</span>
				</div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					{component.name}
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					{component.description}
				</p>
			</header>

			{component.nativeNote && (
				<section className="flex gap-3 border border-lib/30 bg-lib/5 p-4">
					<Smartphone
						className="mt-0.5 shrink-0 text-lib"
						size={18}
					/>
					<div>
						<h2 className="font-semibold text-sm">Native behavior</h2>
						<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
							{component.nativeNote}
						</p>
					</div>
				</section>
			)}

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				{component.props.length > 0 ? (
					<PropsTable props={component.props} />
				) : (
					<p className="border border-border bg-muted/30 p-4 text-muted-foreground text-sm">
						This component does not expose additional semantic props.
					</p>
				)}

				{component.contracts?.map((contract) => (
					<div
						className="space-y-3 pt-3"
						key={contract.name}
					>
						<h3 className="font-display font-semibold text-base">
							<code className="text-lib">{contract.name}</code>
						</h3>
						{contract.description && (
							<p className="text-muted-foreground text-sm">
								{contract.description}
							</p>
						)}
						<PropsTable props={contract.props} />
					</div>
				))}
			</section>

			{component.options && component.options.length > 0 && (
				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Variants and options
					</h2>
					<PropsTable
						props={component.options.map((item) => ({
							default: item.default ? quoteOption(item.default) : undefined,
							description: `Accepted values for ${item.name}.`,
							name: item.name,
							type: item.values.map(quoteOption).join(' | '),
						}))}
					/>
				</section>
			)}

			{compoundDocs.length > 0 && (
				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Compound API</h2>
					<p className="text-muted-foreground text-sm">
						Each composable part has its own public contract.
					</p>
					<div className="space-y-7">
						{compoundDocs.map((part) => (
							<div
								className="space-y-3"
								key={part.name}
							>
								<div>
									<h3 className="font-display font-semibold text-base">
										<code className="text-lib">{part.name}</code>
									</h3>
									<p className="mt-1 text-muted-foreground text-sm">
										{part.description}
									</p>
								</div>
								<PropsTable props={part.props} />
							</div>
						))}
					</div>
				</section>
			)}

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<div className="space-y-6">
					{usageExamples.map((example) => (
						<div
							className="space-y-3"
							key={example.title}
						>
							<div>
								<h3 className="font-semibold text-base">{example.title}</h3>
								{example.description && (
									<p className="mt-1 text-muted-foreground text-sm">
										{example.description}
									</p>
								)}
							</div>
							<CodeBlock
								code={example.code}
								filename={exampleFilename(example.title)}
								language="tsx"
							/>
						</div>
					))}
				</div>
			</section>

			<nav className="grid gap-3 border-border border-t pt-6 sm:grid-cols-2">
				{previous ? (
					<Link
						className="flex items-center gap-3 border border-border p-4 transition-colors hover:border-lib"
						params={{
							component: previous.slug,
						}}
						to="/libs/react-mobile/components/$component"
					>
						<ArrowLeft
							className="text-lib"
							size={16}
						/>
						<div>
							<p className="text-muted-foreground text-xs">Previous</p>
							<p className="mt-0.5 font-medium text-sm">{previous.name}</p>
						</div>
					</Link>
				) : (
					<div />
				)}
				{next && (
					<Link
						className="flex items-center justify-end gap-3 border border-border p-4 text-right transition-colors hover:border-lib"
						params={{
							component: next.slug,
						}}
						to="/libs/react-mobile/components/$component"
					>
						<div>
							<p className="text-muted-foreground text-xs">Next</p>
							<p className="mt-0.5 font-medium text-sm">{next.name}</p>
						</div>
						<ArrowRight
							className="text-lib"
							size={16}
						/>
					</Link>
				)}
			</nav>
		</div>
	)
}
