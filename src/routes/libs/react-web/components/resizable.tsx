import { createFileRoute } from '@tanstack/react-router'
import { Resizable } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const resizableProps = [
	{
		default: '"horizontal"',
		description: 'Which way the panels sit.',
		name: 'direction',
		type: '"horizontal" | "vertical"',
	},
	{
		description: 'Starting sizes by panel id, usually the stored ones.',
		name: 'defaultLayout',
		type: 'Record<string, number>',
	},
	{
		description: 'Fires while a panel resizes; persisting it is the app’s job.',
		name: 'onChange',
		type: '(layout: Record<string, number>) => void',
	},
	{
		description: 'Pins every panel in the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Resizable.Panel: starting percentage.',
		name: 'defaultSize',
		type: 'number',
	},
	{
		description: 'Resizable.Panel: percentage it cannot shrink past.',
		name: 'minSize',
		type: 'number',
	},
	{
		description: 'Resizable.Panel: percentage it cannot grow past.',
		name: 'maxSize',
		type: 'number',
	},
	{
		description: 'Resizable.Panel: snaps shut at its minimum.',
		name: 'collapsible',
		type: 'boolean',
	},
	{
		description: 'Resizable.Panel: percentage it collapses to.',
		name: 'collapsedSize',
		type: 'number',
	},
	{
		description: 'Resizable.Panel: its key in the layout the group reports.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Resizable.Handle: draws a grip on the hairline.',
		name: 'withGrip',
		type: 'boolean',
	},
]

const usageCode = `import { Resizable } from '@turystack/react-web'

<Resizable defaultLayout={stored} onChange={store}>
  <Resizable.Panel collapsible defaultSize={30} id="list" minSize={20}>
    <BookingList />
  </Resizable.Panel>
  <Resizable.Handle withGrip />
  <Resizable.Panel id="detail">
    <BookingDetail />
  </Resizable.Panel>
</Resizable>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Resizable
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Panels the reader can resize, with a keyboard-operable handle between
					them.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The table covers the three parts: the group, a panel and the handle.
				</p>
				<PropsTable props={resizableProps} />
			</section>

			<SlotsSection slug="resizable" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A list and a detail
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every size is a percentage of the group.
				</p>
				<ComponentPreview title="Drag the handle, or focus it and use the arrows">
					<div className="h-44 w-full max-w-lg rounded-lg border border-border">
						<Resizable>
							<Resizable.Panel
								defaultSize={35}
								id="list"
								minSize={20}
							>
								<div className="p-3 text-sm">Bookings</div>
							</Resizable.Panel>
							<Resizable.Handle withGrip />
							<Resizable.Panel id="detail">
								<div className="p-3 text-muted-foreground text-sm">
									Pick one on the left.
								</div>
							</Resizable.Panel>
						</Resizable>
					</div>
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

export const Route = createFileRoute('/libs/react-web/components/resizable')({
	component: Page,
})
