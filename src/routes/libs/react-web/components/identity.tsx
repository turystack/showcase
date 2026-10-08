import { createFileRoute } from '@tanstack/react-router'
import {
	Avatar,
	Badge,
	Button,
	Identity,
	MoneyText,
} from '@turystack/react-web'
import { ExternalLink } from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const identityProps = [
	{
		description: 'The entity name or primary label.',
		name: 'title',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Avatar, thumbnail, icon, or another media node.',
		name: 'media',
		type: 'React.ReactNode',
	},
	{
		description: 'Content below the title: document, price, status or node.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'An action beside the title, such as a menu or redirect link.',
		name: 'action',
		type: 'React.ReactNode',
	},
	{
		default: '"default"',
		description: 'Placement: table, compact, default, or header.',
		name: 'variant',
		type: 'IdentityVariant',
	},
	{
		default: '"md"',
		description: 'Independent density: sm, md, or lg.',
		name: 'size',
		type: 'IdentitySize',
	},
]

const usageCode = `import { Avatar, Button, Identity, MoneyText } from '@turystack/react-web'
import { ExternalLink } from 'lucide-react'

<Identity
  description="12.345.678/0001-90"
  media={<Avatar size="sm">NW</Avatar>}
  title="Northwind Travel"
  variant="table"
/>

<Identity
  action={
    <Button aria-label="Open organisation" size="icon-sm" variant="link">
      <ExternalLink />
    </Button>
  }
  description="12.345.678/0001-90"
  media={<Avatar size="lg">NW</Avatar>}
  title="Northwind Travel"
  variant="header"
/>

<Identity
  description={<MoneyText value={12900} />}
  media={<Avatar size="md" variant="square">TP</Avatar>}
  title="Trail pass"
/>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Content
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Identity
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One consistent identity treatment for organisations, products, people,
					and any other domain entity.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={identityProps} />
			</section>

			<SlotsSection slug="identity" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Same structure, different domains
				</h2>
				<ComponentPreview title="Organisation and product, each in its own row">
					<div className="w-full max-w-2xl space-y-6">
						<Identity
							description={
								<span className="flex items-center gap-2">
									12.345.678/0001-90
									<Badge variant="success">Active</Badge>
								</span>
							}
							media={<Avatar>NT</Avatar>}
							title="Northwind Travel"
						/>
						<div className="border-border border-t" />
						<Identity
							description={
								<span className="flex items-center gap-2">
									<MoneyText value={12900} />
									<span>Day pass</span>
								</span>
							}
							media={<Avatar variant="square">TP</Avatar>}
							title="Trail pass"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Action</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Action stays beside the title, for a contextual menu or a route to the
					entity — never at the far edge of the containing surface.
				</p>
				<ComponentPreview title="An icon link beside the organisation name">
					<Identity
						action={
							<Button
								aria-label="Open organisation"
								size="icon-sm"
								variant="link"
							>
								<ExternalLink />
							</Button>
						}
						description="12.345.678/0001-90"
						media={<Avatar size="lg">NT</Avatar>}
						title="Northwind Travel"
						variant="header"
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="Every placement has one focused purpose">
					<div className="w-full max-w-2xl space-y-6">
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">table</p>
							<Identity
								description="12.345.678/0001-90"
								media={<Avatar size="sm">NT</Avatar>}
								title="Northwind Travel"
								variant="table"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">compact</p>
							<Identity
								description="ana@example.com"
								media={<Avatar size="sm">AS</Avatar>}
								title="Ana Silva"
								variant="compact"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">default</p>
							<Identity
								description={<MoneyText value={12900} />}
								media={<Avatar variant="square">TP</Avatar>}
								title="Trail pass"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">header + action</p>
							<Identity
								action={<Button size="sm">Edit</Button>}
								description="12.345.678/0001-90"
								media={<Avatar size="lg">NT</Avatar>}
								title="Northwind Travel"
								variant="header"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="The same identity at each density">
					<div className="w-full max-w-2xl space-y-6">
						{(
							[
								'sm',
								'md',
								'lg',
							] as const
						).map((size) => (
							<div
								className="flex items-center gap-5"
								key={size}
							>
								<span className="w-8 text-muted-foreground text-xs">
									{size}
								</span>
								<Identity
									description="12.345.678/0001-90"
									media={<Avatar size={size}>NT</Avatar>}
									size={size}
									title="Northwind Travel"
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Table density</h2>
				<ComponentPreview title="Compact cell: supporting line kept, facts hidden">
					<div className="w-full max-w-md">
						<Identity
							description="SKU TP-001"
							media={
								<Avatar
									size="sm"
									variant="square"
								>
									TP
								</Avatar>
							}
							title="Trail pass"
							variant="table"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/identity')({
	component: Page,
})
