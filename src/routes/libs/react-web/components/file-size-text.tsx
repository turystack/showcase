import { createFileRoute } from '@tanstack/react-router'
import { FileSizeText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const fileSizeTextProps = [
	{
		description: 'The size in bytes.',
		name: 'value',
		required: true,
		type: 'number | null',
	},
	{
		default: '"decimal"',
		description: 'decimal (kB, MB; powers of 1000) or binary (KiB, MiB; 1024).',
		name: 'variant',
		type: 'FileSizeTextVariant',
	},
	{
		default: '1',
		description: 'Decimal places above bytes. Bytes stay whole.',
		name: 'fractionDigits',
		type: 'number',
	},
	{
		description: 'Overrides the FormatProvider locale for this instance.',
		name: 'locale',
		type: 'string',
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

const usageCode = `import { FileSizeText, Typography } from '@turystack/react-web'

<FileSizeText value={file.size} />                    // 1.4 MB
<FileSizeText value={file.size} variant="binary" />   // 1.4 MiB
<FileSizeText fractionDigits={0} value={file.size} /> // 1 MB

// Beside an Uploader, where the number came from the file itself
<FileSizeText muted size="xs" value={file.size} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  O limite para anexos é de <FileSizeText inheritColor size="inherit" value={10_000_000} />.
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					FileSizeText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A byte count as a readable size, the natural companion of the
					Uploader.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={fileSizeTextProps} />
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

			<SlotsSection slug="file-size-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The ladder</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It climbs to the largest unit that still leaves a number at or above
					one, which is the unit a person would have said it in.
				</p>
				<ComponentPreview title="From bytes to gigabytes">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">512 bytes</span>
							<FileSizeText value={512} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">a document</span>
							<FileSizeText value={1433600} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">a video</span>
							<FileSizeText value={4831838208} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">binary</span>
							<FileSizeText
								value={1433600}
								variant="binary"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								more precision
							</span>
							<FileSizeText
								fractionDigits={3}
								value={1433600}
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
							O comprovante tem{' '}
							<FileSizeText
								inheritColor
								size="inherit"
								value={2_400_000}
								weight="semibold"
							/>{' '}
							— o limite para anexos é de{' '}
							<FileSizeText
								inheritColor
								size="inherit"
								value={10_000_000}
							/>
							.
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
	'/libs/react-web/components/file-size-text',
)({
	component: Page,
})
