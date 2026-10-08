import { createFileRoute } from '@tanstack/react-router'
import {
	CurrencyInput,
	EditableText,
	FormatProvider,
	MoneyText,
	Select,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const editableTextProps = [
	{
		description: 'Controlled value.',
		name: 'value',
		type: 'T | null',
	},
	{
		description: 'Uncontrolled initial value.',
		name: 'defaultValue',
		type: 'T | null',
	},
	{
		description: 'Fires on commit, with the value — never the event.',
		name: 'onChange',
		type: '(value: T | null) => void',
	},
	{
		description: 'Commit; may be async. A rejection keeps the editor open.',
		name: 'onSave',
		type: '(value: T | null) => void | Promise<void>',
	},
	{
		description: 'Renders the editor from the editing state. Default: Input.',
		name: 'children',
		type: '(state: EditableTextEditorState<T | null>) => React.ReactNode',
	},
	{
		description: 'Custom display for the committed value.',
		name: 'renderValue',
		type: '(value: T | null) => React.ReactNode',
	},
	{
		default: 'false',
		description: 'Edits in a Textarea; Enter adds a newline.',
		name: 'multiline',
		type: 'boolean',
	},
	{
		default: '"click"',
		description: 'What opens the editor: click, doubleClick or icon.',
		name: 'trigger',
		type: '"click" | "doubleClick" | "icon"',
	},
	{
		default: '"flow"',
		description: 'flow lets the editor take space; stable keeps the layout.',
		name: 'layout',
		type: '"flow" | "stable"',
	},
	{
		default: "['enter', 'blur']",
		description: 'What commits. "action" adds buttons; Escape cancels.',
		name: 'submitOn',
		type: 'EditableTextSubmitOn[]',
	},
	{
		description: 'Shows confirm and cancel buttons beside the editor.',
		name: 'actions',
		type: 'boolean',
	},
	{
		description: 'Error message from the app, as on Form.Field.',
		name: 'error',
		type: 'React.ReactNode',
	},
	{
		description: 'Stands in for an empty value.',
		name: 'placeholder',
		type: 'string',
	},
	{
		description: 'Controlled open state.',
		name: 'editing',
		type: 'boolean',
	},
	{
		description: 'Uncontrolled initial open state.',
		name: 'defaultEditing',
		type: 'boolean',
	},
	{
		description: 'Fires when the editor opens or closes.',
		name: 'onEditingChange',
		type: '(editing: boolean) => void',
	},
	{
		description: 'Refuses to open.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'An external save is in flight: blocks and shows a spinner.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Accessible name of the display button.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const appearanceProps = [
	{
		default: '"span"',
		description: 'The element the value renders as.',
		name: 'component',
		type: 'TypographyComponent',
	},
	{
		default: '"base" / "md"',
		description: 'flow: Typography size. stable: field size (36/40/44px).',
		name: 'size',
		type: 'TypographySize | InputSize',
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
		description: 'Muted text colour. Empty values are muted anyway.',
		name: 'muted',
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
	{
		description: 'Adds a CopyButton beside the display that copies the value.',
		name: 'copyable',
		type: 'boolean',
	},
	{
		description: 'Reveals the displayed value on hover.',
		name: 'tooltip',
		type: 'boolean',
	},
]

const usageCode = `import { CurrencyInput, EditableText, MoneyText } from '@turystack/react-web'

// The 90% case: a name that becomes an Input
<EditableText onSave={saveName} value={customer.name} />

// A note that becomes a Textarea
<EditableText multiline onSave={saveNote} value={booking.note} />

// Any control in the library, through the render prop
<EditableText<number>
  onSave={savePrice}
  renderValue={(cents) => <MoneyText value={cents} />}
  value={rate.price}
>
  {({ disabled, onChange, value }) => (
    <CurrencyInput
      autoFocus
      disabled={disabled}
      onChange={onChange}
      value={value}
      variant="brl"
    />
  )}
</EditableText>

// A copy control beside the value — copying never opens the editor
<EditableText copyable onSave={saveCode} value={booking.locator} />

// Nothing on the page moves when this one opens
<EditableText layout="stable" onSave={saveName} value={customer.name} />

// Inside a form: react-hook-form owns the value and the message
<Controller
  control={form.control}
  name="name"
  render={({ field, fieldState }) => (
    <EditableText
      error={fieldState.error?.message}
      layout="stable"
      onChange={field.onChange}
      value={field.value}
    />
  )}
/>

// Outside a form, refuse a commit by throwing — sync or async
<EditableText
  onSave={async (name) => {
    if (!name) {
      throw new Error('A name is required')
    }
    await saveName(name)
  }}
  submitOn={['enter', 'action']}
  value={customer.name}
/>`

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

const CABINS = [
	{
		id: 'economy',
		name: 'Economy',
	},
	{
		id: 'premium',
		name: 'Premium',
	},
	{
		id: 'business',
		name: 'Business',
	},
]

function Page() {
	const [name, setName] = useState<string | null>('Ada Lovelace')
	const [note, setNote] = useState<string | null>(null)
	const [price, setPrice] = useState<number | null>(39900)
	const [cabin, setCabin] = useState<string | null>('economy')
	const [saved, setSaved] = useState<string | null>(null)
	const [locator, setLocator] = useState<string | null>('TRY-4F82QK')

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					EditableText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A value that turns into a field where it is shown.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={editableTextProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Appearance</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The display uses the formatter family’s style, so it sits beside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						MoneyText
					</code>{' '}
					without looking different.
				</p>
				<PropsTable props={appearanceProps} />
			</section>

			<SlotsSection slug="editable-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The layout that never moves
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					In{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						flow
					</code>{' '}
					the value is plain text and the editor is a field, so size, offset and
					width jump on open.
				</p>
				<ComponentPreview title="Same component, two layouts">
					<div className="grid w-full max-w-lg gap-8 sm:grid-cols-2">
						<div className="flex flex-col gap-2">
							<span className="text-muted-foreground text-xs">flow</span>
							<EditableText
								ariaLabel="Flow example"
								defaultValue="Ada Lovelace"
							/>
							<span className="rounded-lg bg-muted px-2 py-1 text-xs">
								the line below
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-muted-foreground text-xs">stable</span>
							<EditableText
								ariaLabel="Stable example"
								defaultValue="Ada Lovelace"
								layout="stable"
							/>
							<span className="rounded-lg bg-muted px-2 py-1 text-xs">
								the line below
							</span>
						</div>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						stable
					</code>{' '}
					fills its container; a box sized to its value would reflow on the next
					save.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Click and type</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Enter commits, Escape puts the old value back, and leaving the field
					commits too — that last one is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						submitOn
					</code>{' '}
					and it is a choice, not a law.
				</p>
				<ComponentPreview title="A name, a note and an empty value">
					<div className="flex w-full max-w-md flex-col gap-4 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">name</span>
							<EditableText
								ariaLabel="Customer name"
								onChange={setName}
								value={name}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								note (multiline)
							</span>
							<EditableText
								ariaLabel="Booking note"
								multiline
								onChange={setNote}
								placeholder="No note yet"
								value={note}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								pencil trigger
							</span>
							<EditableText
								ariaLabel="Customer name"
								onChange={setName}
								trigger="icon"
								value={name}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Copy</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						copyable
					</code>{' '}
					adds a sibling copy button, so copying never opens the editor. In{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						stable
					</code>{' '}
					it hides while editing.
				</p>
				<ComponentPreview title="A booking locator — flow and stable">
					<div className="flex w-full max-w-md flex-col gap-4 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">flow</span>
							<EditableText
								ariaLabel="Localizador"
								copyable
								onChange={setLocator}
								value={locator}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">stable</span>
							<div className="w-56">
								<EditableText
									ariaLabel="Localizador"
									copyable
									layout="stable"
									onChange={setLocator}
									trigger="icon"
									value={locator}
								/>
							</div>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Any control</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The render prop receives the draft, a setter, and the commit and
					cancel handlers.
				</p>
				<ComponentPreview title="CurrencyInput and Select as editors">
					<FormatProvider
						format={{
							currency: 'brl',
							locale: 'pt-BR',
						}}
					>
						<div className="flex w-full max-w-md flex-col gap-4 text-sm">
							<div className="flex items-center justify-between gap-6">
								<span className="text-muted-foreground text-xs">
									nightly rate
								</span>
								<EditableText<number>
									ariaLabel="Nightly rate"
									layout="stable"
									onChange={setPrice}
									renderValue={(cents) => <MoneyText value={cents} />}
									value={price}
								>
									{({ disabled, onChange, value }) => (
										<CurrencyInput
											autoFocus
											disabled={disabled}
											onChange={onChange}
											value={value}
											variant="brl"
										/>
									)}
								</EditableText>
							</div>
							<div className="flex items-center justify-between gap-6">
								<span className="text-muted-foreground text-xs">cabin</span>
								<EditableText
									ariaLabel="Cabin"
									layout="stable"
									onChange={setCabin}
									renderValue={(id) => (
										<span>
											{
												CABINS.find((cabinOption) => cabinOption.id === id)
													?.name
											}
										</span>
									)}
									submitOn={[
										'action',
									]}
									value={cabin}
								>
									{({ onChange, value }) => (
										<Select
											mode="single"
											onChange={onChange}
											optionLabel="name"
											options={CABINS}
											optionValue="id"
											value={value}
										/>
									)}
								</EditableText>
							</div>
						</div>
					</FormatProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Saving, and being refused
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An async{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onSave
					</code>{' '}
					blocks the editor while it runs.
				</p>
				<ComponentPreview title="Validation, a slow save, and a rejection">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<EditableText
							actions
							ariaLabel="Customer name"
							onSave={async (next) => {
								if ((next ?? '').length < 3) {
									throw new Error('At least three characters')
								}

								await sleep(900)

								if (/\d/.test(next ?? '')) {
									throw new Error('That name is already taken')
								}

								setSaved(next)
							}}
							submitOn={[
								'enter',
								'action',
							]}
							value={saved ?? 'Ada Lovelace'}
						/>
						<span className="text-muted-foreground text-xs">
							saved: {saved ?? '(nothing yet)'}
						</span>
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
	'/libs/react-web/components/editable-text',
)({
	component: Page,
})
