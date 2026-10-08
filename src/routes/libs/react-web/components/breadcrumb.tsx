import { createFileRoute, Link } from '@tanstack/react-router'
import type { PartialTuryLabels } from '@turystack/react-web'
import { Breadcrumb, LabelsProvider } from '@turystack/react-web'
import { Slash } from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/breadcrumb/breadcrumb.types.ts`.
 * Every part but `Link` is typed as an empty object — they take children and
 * nothing else, which is what the empty tables below say.
 */
const breadcrumbProps: never[] = []

const breadcrumbLinkProps = [
	{
		description: 'Renders the child (e.g. a router Link) instead of an anchor.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Navigation target; omitted, the anchor has no href.',
		name: 'href',
		type: 'string',
	},
]

const usageCode = `import { Breadcrumb } from '@turystack/react-web'

<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/settings">Settings</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Billing</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// A collapsed middle, and a separator glyph of your own
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator><Slash /></Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator><Slash /></Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Invoice 1042</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// asChild hands the styling to a router link
<Breadcrumb.Item>
  <Breadcrumb.Link asChild>
    <Link to="/libs/react-web">react-web</Link>
  </Breadcrumb.Link>
</Breadcrumb.Item>`

/** Module scope: the provider memoises on this reference. */
const ptBRBreadcrumb: PartialTuryLabels = {
	breadcrumb: {
		label: 'Trilha de navegação',
		more: 'Mais',
	},
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Breadcrumb
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The trail back up the hierarchy, assembled from six parts with no
					items array.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Breadcrumb.Link
					</code>{' '}
					takes props; landmark, list and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-current="page"
					</code>{' '}
					are built in.
				</p>
				<h3 className="font-medium text-sm">
					Breadcrumb · List · Item · Page · Separator · Ellipsis
				</h3>
				<PropsTable props={breadcrumbProps} />
				<h3 className="font-medium text-sm">Breadcrumb.Link</h3>
				<PropsTable props={breadcrumbLinkProps} />
			</section>

			<SlotsSection slug="breadcrumb" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Structure</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Breadcrumb.Separator
					</code>{' '}
					is its own list item; write one between each pair.
				</p>
				<ComponentPreview title="A full trail">
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Page>Billing</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
				</ComponentPreview>
				<ComponentPreview title="One level — a Page on its own">
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Page>Dashboard</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Separator</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Children replace the default chevron entirely.
				</p>
				<ComponentPreview title="Default chevron and a custom glyph">
					<div className="flex flex-col items-center gap-4">
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Page>Reports</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator>
									<Slash />
								</Breadcrumb.Separator>
								<Breadcrumb.Item>
									<Breadcrumb.Page>Reports</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator>·</Breadcrumb.Separator>
								<Breadcrumb.Item>
									<Breadcrumb.Page>Reports</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Ellipsis</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Breadcrumb.Ellipsis
					</code>{' '}
					is a static glyph standing in for the levels you left out.
				</p>
				<ComponentPreview title="A collapsed middle">
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Ellipsis />
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Link href="#">Invoices</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Page>Invoice 1042</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Names come from the labels
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						breadcrumb.label
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						breadcrumb.more
					</code>{' '}
					labels come from{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/labels-provider"
					>
						LabelsProvider
					</Link>
					.
				</p>
				<ComponentPreview title="Inside LabelsProvider: labels in Portuguese">
					<LabelsProvider labels={ptBRBreadcrumb}>
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="#">Início</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Ellipsis />
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Page>Fatura 1042</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
					</LabelsProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Link</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>{' '}
					passes the breadcrumb class to the child, so a router link fits the
					trail.
				</p>
				<ComponentPreview title="A router link through asChild">
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link asChild>
									<Link to="/libs/react-web">react-web</Link>
								</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Link asChild>
									<Link to="/libs/react-web/components">Components</Link>
								</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
				</ComponentPreview>
				<ComponentPreview title="Without an href — a plain, unnavigable anchor">
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link>Archived</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Page>2019</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
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

export const Route = createFileRoute('/libs/react-web/components/breadcrumb')({
	component: Page,
})
