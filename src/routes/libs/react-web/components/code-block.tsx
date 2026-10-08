import { createFileRoute } from '@tanstack/react-router'
// Imported under another name: the docs chrome already has a `CodeBlock`
// (the usage snippet at the bottom of every page), and the two must not clash.
import { Badge, Card, CodeBlock as CodeBlockView } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const codeBlockProps = [
	{
		description: 'The code. An object is printed as JSON.',
		name: 'value',
		required: true,
		type: 'string | object',
	},
	{
		default: 'json for an object, text for a string',
		description: 'How the text is coloured.',
		name: 'language',
		type: '"json" | "text"',
	},
	{
		description: 'Header with the title and copy control.',
		name: 'title',
		type: 'React.ReactNode',
	},
	{
		default: 'true',
		description: 'Adds a copy control.',
		name: 'copyable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a line-number gutter.',
		name: 'lineNumbers',
		type: 'boolean',
	},
	{
		default: '"none"',
		description: 'Caps the height: 10rem, 20rem or 32rem.',
		name: 'maxHeight',
		type: '"sm" | "md" | "lg" | "none"',
	},
	{
		default: 'false',
		description: 'Wraps long lines instead of scrolling.',
		name: 'wrap',
		type: 'boolean',
	},
	{
		description: 'Names the region. Overrides title.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const response = {
	data: {
		booking: {
			checkIn: '2026-10-12',
			checkOut: '2026-10-15',
			code: 'RSV-20931',
			guests: 2,
			paid: true,
			room: null,
			total: 1840.5,
		},
		guest: {
			email: 'ana.souza@example.com',
			name: 'Ana Souza',
			tags: [
				'vip',
				'returning',
			],
		},
	},
	meta: {
		requestId: 'req_7f3a91c2',
		tookMs: 84,
	},
}

const stackTrace = `TypeError: Cannot read properties of undefined (reading 'checkIn')
    at nightsOf (webpack-internal:///./src/domains/bookings/booking.utils.ts:42:31)
    at BookingSummary (webpack-internal:///./src/domains/bookings/components/BookingSummary.tsx:18:22)
    at renderWithHooks (webpack-internal:///./node_modules/react-dom/cjs/react-dom-client.development.js:5529:22)
    at updateFunctionComponent (webpack-internal:///./node_modules/react-dom/cjs/react-dom-client.development.js:8897:19)
    at beginWork (webpack-internal:///./node_modules/react-dom/cjs/react-dom-client.development.js:10522:18)
    at runWithFiberInDEV (webpack-internal:///./node_modules/react-dom/cjs/react-dom-client.development.js:1519:30)`

const webhookConfig = {
	events: [
		'booking.created',
		'booking.cancelled',
		'booking.checked_in',
		'booking.checked_out',
		'payment.captured',
		'payment.refunded',
		'guest.updated',
	],
	headers: {
		'X-Tury-Account': 'acc_2931',
		'X-Tury-Signature': 'sha256=…',
	},
	retry: {
		backoff: 'exponential',
		maxAttempts: 8,
		startAfterSeconds: 30,
	},
	secret: 'whsec_••••••••••••',
	timeoutSeconds: 10,
	url: 'https://hooks.pousada-sol.com.br/tury',
	version: '2026-09-01',
}

const usageCode = `import { CodeBlock } from '@turystack/react-web'

// An object is printed as JSON and coloured
<CodeBlock maxHeight="md" title="Response" value={response.body} />

// A string is shown as is — a stack trace wants wrapping and line numbers
<CodeBlock language="text" lineNumbers value={error.stack} wrap />

// Read-only and nothing worth copying
<CodeBlock copyable={false} value={{ status: 'ok' }} />

// No visible title, so name the region for a screen reader
<CodeBlock ariaLabel="Webhook configuration" maxHeight="sm" value={config} />`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Content
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					CodeBlock
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Read-only code and JSON, such as a payload or a stack trace.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Imported here as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						CodeBlockView
					</code>{' '}
					to avoid a name clash; in an app it is <code>CodeBlock</code>.
				</p>
				<PropsTable props={codeBlockProps} />
			</section>

			<SlotsSection slug="code-block" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">JSON</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pass the object, not a string: it is printed and coloured for you.
				</p>
				<ComponentPreview title="Response body">
					<div className="w-full max-w-2xl">
						<CodeBlockView value={response} />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Line numbers and wrapping
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A string is shown as given. Copying skips the line numbers.
				</p>
				<ComponentPreview title="Stack trace">
					<div className="w-full max-w-2xl">
						<CodeBlockView
							language="text"
							lineNumbers
							title="Stack trace"
							value={stackTrace}
							wrap
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Title and max height
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An overflowing block is a focusable region, scrolled with the arrow
					keys. One that fits is not a tab stop.
				</p>
				<ComponentPreview title="Overflowing and fitting">
					<div className="flex w-full max-w-2xl flex-col gap-4">
						<CodeBlockView
							maxHeight="md"
							title={
								<span className="flex items-center gap-2">
									Webhook
									<Badge
										size="sm"
										variant="outline"
									>
										v2026-09-01
									</Badge>
								</span>
							}
							value={{
								...webhookConfig,
								deliveries: Array.from(
									{
										length: 6,
									},
									(_, index) => ({
										event: webhookConfig.events[index],
										id: `dlv_${4810 + index}`,
										status: index === 3 ? 500 : 200,
									}),
								),
							}}
						/>
						<CodeBlockView
							maxHeight="md"
							title="Health"
							value={{
								status: 'ok',
							}}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					No copy, no title
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without a title, name the region with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					; otherwise it falls back to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						codeBlock.label
					</code>
					.
				</p>
				<ComponentPreview title="Inside a card">
					<div className="w-full max-w-2xl">
						<Card>
							<Card.Header bordered>
								<Card.Title>Configuracao do webhook</Card.Title>
								<Card.Description>
									Somente leitura — edite em Integracoes.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<CodeBlockView
									ariaLabel="Configuracao do webhook"
									copyable={false}
									maxHeight="sm"
									value={webhookConfig}
								/>
							</Card.Content>
						</Card>
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

export const Route = createFileRoute('/libs/react-web/components/code-block')({
	component: Page,
})
