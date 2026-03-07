import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const breadcrumbLinkProps = [
	{
		description: 'The URL the breadcrumb link points to.',
		name: 'href',
		type: 'string',
	},
	{
		default: 'false',
		description:
			'When true, the link renders as its child element using Radix Slot.',
		name: 'asChild',
		type: 'boolean',
	},
]

const usageCode = `import { Breadcrumb } from '@turystack/ui'

// Basic breadcrumb
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Current Page</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// With ellipsis
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Current Page</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Breadcrumb
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Displays the path to the current resource using a hierarchy of
						links.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Link Props
					</h2>
					<PropsTable props={breadcrumbLinkProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Basic breadcrumb">
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Link href="/docs">Documentation</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With ellipsis</h2>
					<ComponentPreview title="Breadcrumb with ellipsis for collapsed items">
						<Breadcrumb>
							<Breadcrumb.List>
								<Breadcrumb.Item>
									<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Ellipsis />
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Link href="/docs">Documentation</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									<Breadcrumb.Page>Current Page</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Composition</h2>
					<p className="text-muted-foreground text-sm">
						The breadcrumb is built from composable sub-components:{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.List
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.Item
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.Link
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.Page
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.Separator
						</code>
						, and{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							Breadcrumb.Ellipsis
						</code>
						.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</TuryStackProvider>
	)
}

export const Route = createFileRoute('/libs/ui/breadcrumb')({
	component: Page,
})
