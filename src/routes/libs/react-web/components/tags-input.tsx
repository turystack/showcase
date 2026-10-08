import { createFileRoute, Link } from '@tanstack/react-router'
import { TagsInput } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/tags-input/tags-input.types.ts`,
 * which is
 * `Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'debounce'>` plus
 * the tag rules. debounce is the one InputProps field the type drops — every
 * other inherited prop, including the section slots and loading, is read and
 * rendered by the implementation below.
 */
const tagsInputProps = [
	{
		description: 'Controlled tag list; shows only what you pass back.',
		name: 'value',
		type: 'string[]',
	},
	{
		default: '[]',
		description: 'Initial tag list when uncontrolled; read once on mount.',
		name: 'defaultValue',
		type: 'string[]',
	},
	{
		description: 'Fires with the whole next list on every add or removal.',
		name: 'onChange',
		type: '(value: string[]) => void',
	},
	{
		description: 'Max tags; Enter is ignored at the limit.',
		name: 'maxTags',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Allows the same tag twice.',
		name: 'allowDuplicates',
		type: 'boolean',
	},
	{
		description: 'Fires on a refused entry with its text and the reason.',
		name: 'onReject',
		type: "(value: string, reason: TagsInputRejectReason) => void — TagsInputRejectReason = 'duplicate' | 'max-tags'",
	},
	{
		default: '"md"',
		description: 'Minimum height: 36, 40 or 44px; grows as tags wrap.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'ghost drops the border and the background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		description: 'Shown while the list is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Prevents typing and dims the container.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Inherited from InputProps. Slot left of the tags.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Inherited from InputProps. Right slot; loading replaces it.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Inherited from InputProps. Width of the left slot.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		default: '36',
		description: 'Inherited from InputProps. Width of the right slot.',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from InputProps. Disables, with a spinner.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id of the native input.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Inherited from Input. On the text field, not the tags.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Id of a form the field joins.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Inherited from Input. aria-label when no label is visible.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Marks the field invalid.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id(s) of the hint or error.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"tags-input-field"',
		description: 'Inherited from Input. Test id on the text field.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Browser autofill hint.',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Which virtual keyboard a phone opens.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Max characters accepted.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Inherited from Input. Min characters for validation.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Required for form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Nothing can be typed or added.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Runs inside the field’s key handler.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field is clicked.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { TagsInput } from '@turystack/react-web'

const [tags, setTags] = useState<string[]>([])

// Enter adds, click a tag to remove it, Backspace on an empty field pops
<TagsInput onChange={setTags} placeholder="Add a tag" value={tags} />

// A ceiling
<TagsInput maxTags={3} onChange={setTags} value={tags} />

// Told when an entry is refused, and why
<TagsInput
  maxTags={3}
  onChange={setTags}
  onReject={(value, reason) => console.log(value, reason)}
  value={tags}
/>

// Repeats allowed
<TagsInput allowDuplicates onChange={setTags} value={tags} />

// Uncontrolled — the component keeps the list
<TagsInput defaultValue={['react', 'typescript']} />

// Sizes and variants
<TagsInput size="sm" />
<TagsInput size="lg" />
<TagsInput variant="ghost" />

// Input's form attributes reach the text field — name it with ariaLabel
<TagsInput ariaLabel="Topics" disabled id="topics" />`

function ReadOut({ tags }: { tags: string[] }) {
	return (
		<p className="text-muted-foreground text-xs">
			onChange: <code>[{tags.map((tag) => `"${tag}"`).join(', ')}]</code>
		</p>
	)
}

function BasicPreview() {
	const [tags, setTags] = useState<string[]>([
		'react',
	])

	return (
		<div className="w-full max-w-sm space-y-2">
			<TagsInput
				onChange={setTags}
				placeholder="Type and press Enter"
				value={tags}
			/>
			<ReadOut tags={tags} />
		</div>
	)
}

function MaxTagsPreview() {
	const [tags, setTags] = useState<string[]>([
		'react',
		'vue',
	])
	const [rejected, setRejected] = useState<string | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<TagsInput
				maxTags={3}
				onChange={setTags}
				onReject={(value) => setRejected(value)}
				placeholder="Three at most"
				value={tags}
			/>
			<p className="text-muted-foreground text-xs">
				{tags.length} of 3{rejected && ` — onReject: "${rejected}" as max-tags`}
			</p>
		</div>
	)
}

function DuplicatesPreview() {
	const [strict, setStrict] = useState<string[]>([
		'react',
	])
	const [loose, setLoose] = useState<string[]>([
		'react',
	])
	const [rejected, setRejected] = useState<string | null>(null)

	return (
		<div className="w-full max-w-sm space-y-3">
			<div className="space-y-2">
				<TagsInput
					onChange={setStrict}
					onReject={(value) => setRejected(value)}
					placeholder="Type react again — refused"
					value={strict}
				/>
				<ReadOut tags={strict} />
				<p className="text-muted-foreground text-xs">
					{rejected
						? `onReject: "${rejected}" as duplicate`
						: 'onReject has not fired yet.'}
				</p>
			</div>
			<div className="space-y-2">
				<TagsInput
					allowDuplicates
					onChange={setLoose}
					placeholder="Type react again — accepted"
					value={loose}
				/>
				<ReadOut tags={loose} />
			</div>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					TagsInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A field that collects a list of strings.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={tagsInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					. They land on the text field.
				</p>
			</section>

			<SlotsSection slug="tags-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Adding and removing
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Enter adds the trimmed contents of the field; whitespace on its own is
					dropped.
				</p>
				<ComponentPreview title="A controlled list">
					<BasicPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Rules</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Neither rule blocks typing — they only decide whether Enter turns the
					field's contents into a tag.
				</p>
				<ComponentPreview title="maxTags">
					<MaxTagsPreview />
				</ComponentPreview>
				<ComponentPreview title="allowDuplicates, off and on">
					<DuplicatesPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Uncontrolled</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					the component keeps the list itself and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>{' '}
					seeds it.
				</p>
				<ComponentPreview title="defaultValue">
					<div className="w-full max-w-sm">
						<TagsInput
							defaultValue={[
								'react',
								'typescript',
							]}
							placeholder="Add another"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The size sets a minimum height, not a fixed one — the container grows
					downwards once the tags need a second row.
				</p>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<TagsInput
							defaultValue={[
								'sm',
							]}
							size="sm"
						/>
						<TagsInput
							defaultValue={[
								'md',
							]}
							size="md"
						/>
						<TagsInput
							defaultValue={[
								'lg',
							]}
							size="lg"
						/>
						<TagsInput
							defaultValue={[
								'react',
								'typescript',
								'tailwind',
								'vite',
								'tanstack-router',
								'biome',
							]}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="w-full max-w-sm space-y-3">
						<TagsInput
							defaultValue={[
								'default',
							]}
							variant="default"
						/>
						<TagsInput
							defaultValue={[
								'ghost',
							]}
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<ComponentPreview title="Disabled">
					<div className="w-full max-w-sm">
						<TagsInput
							defaultValue={[
								'react',
								'vue',
							]}
							disabled
							placeholder="disabled"
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

export const Route = createFileRoute('/libs/react-web/components/tags-input')({
	component: Page,
})
