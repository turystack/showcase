import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const breadcrumbProps = [
	{
		description:
			'Standard HTML attributes for the nav element. The root breadcrumb renders as a <nav> with aria-label="breadcrumb".',
		name: '...props',
		type: 'React.ComponentPropsWithoutRef<"nav">',
	},
]

const breadcrumbListProps = [
	{
		description:
			'Standard HTML attributes for the ordered list element. Renders as an <ol>.',
		name: '...props',
		type: 'React.ComponentPropsWithoutRef<"ol">',
	},
]

const breadcrumbItemProps = [
	{
		description:
			'Standard HTML attributes for the list item element. Renders as an <li>.',
		name: '...props',
		type: 'React.ComponentPropsWithoutRef<"li">',
	},
]

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

const breadcrumbPageProps = [
	{
		description:
			'Standard HTML attributes for the current page span. Renders as a <span> with role="link" and aria-current="page".',
		name: '...props',
		type: 'React.ComponentPropsWithoutRef<"span">',
	},
]

const breadcrumbSeparatorProps = [
	{
		description:
			'Custom separator content. Defaults to a chevron icon. Renders as an <li> with role="presentation".',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const breadcrumbEllipsisProps = [
	{
		description:
			'Standard HTML attributes for the ellipsis span. Renders a "More" icon with sr-only label.',
		name: '...props',
		type: 'React.ComponentPropsWithoutRef<"span">',
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
		<Provider>
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
						Breadcrumb Props
					</h2>
					<PropsTable props={breadcrumbProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.List Props
					</h2>
					<PropsTable props={breadcrumbListProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Item Props
					</h2>
					<PropsTable props={breadcrumbItemProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Link Props
					</h2>
					<PropsTable props={breadcrumbLinkProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Page Props
					</h2>
					<PropsTable props={breadcrumbPageProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Separator Props
					</h2>
					<PropsTable props={breadcrumbSeparatorProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Breadcrumb.Ellipsis Props
					</h2>
					<PropsTable props={breadcrumbEllipsisProps} />
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
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/breadcrumb')({
	component: Page,
})
