import { createFileRoute } from '@tanstack/react-router'
import {
	Badge,
	DescriptionList,
	type DescriptionListItem,
} from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/description-list/description-list.types.ts` and
 * the `tv()` call in `description-list.tsx`. The item shape is a separate
 * contract, `DescriptionListItem`, checked as a part table.
 */
const descriptionListProps = [
	{
		description: 'The label / value pairs, in order.',
		name: 'items',
		required: true,
		type: 'DescriptionListItem[]',
	},
	{
		default: '"stacked"',
		description: 'Label above the value, or beside it.',
		name: 'layout',
		type: '"stacked" | "inline"',
	},
	{
		default: '1',
		description: 'Pairs per row. Collapses on small screens.',
		name: 'columns',
		type: '1 | 2 | 3',
	},
	{
		default: 'false',
		description: 'Draws a rule between rows of pairs.',
		name: 'dividers',
		type: 'boolean',
	},
]

const itemProps = [
	{
		description: 'The term, rendered in the dt.',
		name: 'label',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'The value, rendered in the dd. Empty renders a dash.',
		name: 'value',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Copy button: true copies the value; a string copies itself.',
		name: 'copyable',
		type: 'string | boolean',
	},
	{
		description: 'Stable identity for the pair. Defaults to its index.',
		name: 'key',
		type: 'string',
	},
]

const usageCode = `import { DescriptionList } from '@turystack/react-web'

<DescriptionList
  items={[
    { label: 'Payment ID', value: payment.id, copyable: true },
    // A node value: say what to copy
    { label: 'Customer', value: <a href={url}>{name}</a>, copyable: email },
    { label: 'Refund', value: null }, // renders a muted em dash
  ]}
/>

<DescriptionList columns={2} dividers items={items} layout="inline" />`

const payment: DescriptionListItem[] = [
	{
		copyable: true,
		label: 'Payment ID',
		value: 'pay_3PqK8e2mTz91LxAa',
	},
	{
		label: 'Status',
		value: <Badge variant="success">Pago</Badge>,
	},
	{
		copyable: 'ana.souza@example.com',
		label: 'Cliente',
		value: (
			<a
				className="underline underline-offset-4"
				href="#cliente"
			>
				Ana Souza
			</a>
		),
	},
	{
		label: 'Método',
		value: 'Pix',
	},
	{
		copyable: true,
		label: 'Valor',
		value: 'R$ 1.280,00',
	},
	{
		label: 'Reembolso',
		value: null,
	},
]

const reservation: DescriptionListItem[] = [
	{
		label: 'Hóspede',
		value: 'Bruno Lima',
	},
	{
		label: 'Quarto',
		value: 'Suíte Mar 204',
	},
	{
		label: 'Check-in',
		value: '12 mar 2026, 14:00',
	},
	{
		label: 'Check-out',
		value: '19 mar 2026, 11:00',
	},
	{
		label: 'Hóspedes',
		value: 2,
	},
	{
		label: 'Observações',
		value: '',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Content
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DescriptionList
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Label / value pairs for a record's details, as a real{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;dl&gt;
					</code>
					.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={descriptionListProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						DescriptionListItem
					</code>{' '}
					— one pair.
				</p>
				<PropsTable props={itemProps} />
			</section>

			<SlotsSection slug="description-list" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Stacked and inline
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Stacked suits a narrow panel; inline suits a wide one.
				</p>
				<ComponentPreview title="Stacked and inline">
					<div className="grid w-full gap-8 sm:grid-cols-2">
						<DescriptionList items={payment} />
						<DescriptionList
							items={payment}
							layout="inline"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Columns and dividers
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						columns
					</code>{' '}
					collapses to one column below{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dividers
					</code>{' '}
					rules between rows.
				</p>
				<ComponentPreview title="columns 2, dividers">
					<div className="w-full">
						<DescriptionList
							columns={2}
							dividers
							items={reservation}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="columns 3, inline">
					<div className="w-full">
						<DescriptionList
							columns={3}
							dividers
							items={reservation}
							layout="inline"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Copyable items</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						copyable: true
					</code>{' '}
					copies the value;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						copyable: 'text'
					</code>{' '}
					copies that text, for node values.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Empty values</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					null, undefined, false and "" render a muted dash, with no copy
					button.
				</p>
				<ComponentPreview title="Missing fields">
					<div className="w-full max-w-sm">
						<DescriptionList
							items={[
								{
									copyable: true,
									label: 'Nota fiscal',
									value: null,
								},
								{
									label: 'Cupom',
									value: '',
								},
								{
									label: 'Faturado',
									value: false,
								},
							]}
							layout="inline"
						/>
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

export const Route = createFileRoute(
	'/libs/react-web/components/description-list',
)({
	component: Page,
})
