import { createFileRoute } from '@tanstack/react-router'
import { DocumentText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const documentTextProps = [
	{
		description: 'A DocumentInput value or a digit string; non-digits ignored.',
		name: 'value',
		required: true,
		type: 'DocumentValue | string | null',
	},
	{
		default: '"any"',
		description: 'cpf, cnpj, or any (detected by digit count, then type).',
		name: 'variant',
		type: 'DocumentTextVariant',
	},
	{
		description: 'Value is already redacted; render it as given, unformatted.',
		name: 'privacy',
		type: 'boolean',
	},
	{
		description: 'Prefixes the number with CPF or CNPJ.',
		name: 'showType',
		type: 'boolean',
	},
]

const appearanceProps = [
	{
		default: '"—"',
		description: 'Text shown for an absent or unreadable value.',
		name: 'fallback',
		type: 'string',
	},
	{
		description: 'Adds a button that copies the rendered text.',
		name: 'copyable',
		type: 'boolean',
	},
	{
		description: 'Shows the rendered text in a tooltip on hover.',
		name: 'tooltip',
		type: 'boolean',
	},
	{
		default: '"span"',
		description: 'The element the value renders as.',
		name: 'component',
		type: 'TypographyComponent',
	},
	{
		default: '"base"',
		description: 'Typography size preset; "inherit" takes the parent\'s size.',
		name: 'size',
		type: 'TypographySize | "inherit"',
	},
	{
		default: '"normal"',
		description: 'Font weight.',
		name: 'weight',
		type: 'TypographyWeight',
	},
	{
		description: 'Text alignment.',
		name: 'align',
		type: 'TypographyAlign',
	},
	{
		description: 'Renders in the muted foreground colour.',
		name: 'muted',
		type: 'boolean',
	},
	{
		default: 'false',
		description: "Takes the surrounding text's colour instead of foreground.",
		name: 'inheritColor',
		type: 'boolean',
	},
	{
		description: 'Renders in the error colour.',
		name: 'destructive',
		type: 'boolean',
	},
	{
		description: 'Truncates with an ellipsis on overflow.',
		name: 'truncate',
		type: 'boolean',
	},
]

const usageCode = `import { DocumentText, Typography } from '@turystack/react-web'

// The value shape DocumentInput writes, or a bare string
<DocumentText value={customer.document} />
<DocumentText value="12345678901" />          // 123.456.789-01

// The server sent it redacted; render it as it came
<DocumentText privacy value={customer.maskedDocument} />

// Named, for a table with mixed document types
<DocumentText showType value={customer.document} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Nota emitida para o CPF <DocumentText inheritColor size="inherit" value={customer.cpf} />.
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DocumentText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A CPF or CNPJ under its mask, or passed through as redacted by the
					server.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={documentTextProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Shared with every formatter
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						*Text
					</code>{' '}
					component shares these appearance props.
				</p>
				<PropsTable props={appearanceProps} />
			</section>

			<SlotsSection slug="document-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Masks, and telling one from the other
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					"any" reads the digit count: 11 is a CPF, 14 a CNPJ; anything else
					shows as is.
				</p>
				<ComponentPreview title="CPF, CNPJ and something that is neither">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">CPF</span>
							<DocumentText value="12345678901" />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">CNPJ</span>
							<DocumentText value="12345678000199" />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">named</span>
							<DocumentText
								showType
								value="12345678901"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">neither</span>
							<DocumentText value="12345" />
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Privacy</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Redaction is the server’s job. With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						privacy
					</code>{' '}
					the value renders verbatim; copying copies what is on screen.
				</p>
				<ComponentPreview title="Formatted, and passed straight through">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">formatted</span>
							<DocumentText value="12345678901" />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">privacy</span>
							<DocumentText
								privacy
								value="***.456.789-**"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								privacy + copyable
							</span>
							<DocumentText
								copyable
								privacy
								value="***.***.***-**"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Inline in a sentence
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					In running text,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="inherit"
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inheritColor
					</code>{' '}
					take the sentence's size and colour;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						weight
					</code>{' '}
					can still lift it.
				</p>
				<ComponentPreview title='size="inherit" and inheritColor in muted copy'>
					<div className="max-w-md">
						<Typography
							size="sm"
							variant="muted"
						>
							A nota fiscal será emitida para o CPF{' '}
							<DocumentText
								inheritColor
								size="inherit"
								value="12345678909"
								weight="semibold"
							/>
							. Confira antes de pagar.
						</Typography>
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
	'/libs/react-web/components/document-text',
)({
	component: Page,
})
