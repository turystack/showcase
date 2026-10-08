import { createFileRoute } from '@tanstack/react-router'
import { PhoneText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const phoneTextProps = [
	{
		description: 'The PhoneInput value shape, or an E.164 string.',
		name: 'value',
		required: true,
		type: 'PhoneValue | string | null',
	},
	{
		default: '"national"',
		description: 'national ((11) 98765-4321), international or e164.',
		name: 'variant',
		type: 'PhoneTextVariant',
	},
	{
		description: 'Value is already redacted; render as given, with no link.',
		name: 'privacy',
		type: 'boolean',
	},
	{
		description: 'Renders the number as a tel: link.',
		name: 'callable',
		type: 'boolean',
	},
	{
		description: 'Adds a link to the WhatsApp conversation.',
		name: 'whatsapp',
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

const usageCode = `import { PhoneText, Typography } from '@turystack/react-web'

// The value shape PhoneInput writes, or an E.164 string
<PhoneText value={contact.phone} />              // (11) 98765-4321
<PhoneText value="+5511987654321" />

// Reachable from the page
<PhoneText callable value={contact.phone} />
<PhoneText value={contact.phone} whatsapp />

// Covered — and then no link, because an href would leak the digits
<PhoneText privacy value={contact.maskedPhone} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Dúvidas? Ligue para <PhoneText inheritColor size="inherit" value={support.phone} />.
</Typography>`

const PHONE = {
	ddi: '55',
	iso: 'BR',
	number: '11987654321',
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					PhoneText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A phone number in its own country’s format, optionally linked or
					redacted.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={phoneTextProps} />
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

			<SlotsSection slug="phone-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Shapes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Formatted by react-phone-number-input, the same library PhoneInput
					uses.
				</p>
				<ComponentPreview title="One number, three shapes">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">national</span>
							<PhoneText value={PHONE} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								international
							</span>
							<PhoneText
								value={PHONE}
								variant="international"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">e164</span>
							<PhoneText
								value={PHONE}
								variant="e164"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Links, and when they disappear
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A redacted number renders no link, since an href would need the hidden
					digits.
				</p>
				<ComponentPreview title="Callable, WhatsApp, and covered">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">callable</span>
							<PhoneText
								callable
								value={PHONE}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">whatsapp</span>
							<PhoneText
								value={PHONE}
								whatsapp
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">privacy</span>
							<PhoneText
								privacy
								value="(**) *****-4321"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								privacy — no links offered
							</span>
							<PhoneText
								callable
								privacy
								value="(**) *****-4321"
								whatsapp
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
							Dúvidas sobre a reserva? Ligue para{' '}
							<PhoneText
								inheritColor
								size="inherit"
								value="11987654321"
								weight="semibold"
							/>
							, de segunda a sexta, das 9h às 18h.
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

export const Route = createFileRoute('/libs/react-web/components/phone-text')({
	component: Page,
})
