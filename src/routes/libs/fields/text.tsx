import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/text')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">Text</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Free-text fields that are sanitized before they are measured, so a
					length rule applies to the value that actually reaches the database.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The empty problem
				</h2>
				<p className="text-muted-foreground">
					Three inputs a user considers empty pass{' '}
					<code>z.string().min(1)</code>: a whitespace-only value when{' '}
					<code>.trim()</code> comes after the bound, a zero-width space, and a
					byte order mark. All three have a non-zero <code>length</code>.
				</p>
				<CodeBlock
					code={`import { RequiredStringSchema } from '@turystack/fields'

// Zod, in the order most people write it
z.string().min(1).trim().parse('   ')       // passes
z.string().trim().min(1).safeParse('   ')   // fails as 'too_small'

RequiredStringSchema().safeParse('   ')     // fails as 'required'
RequiredStringSchema().safeParse('\\u200B') // fails as 'required'
RequiredStringSchema().parse('  Ana   Maria ')  // 'Ana Maria'`}
					filename="required.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schemas</h2>
				<PropsTable
					props={[
						{
							description:
								'Rejects blank and invisible-only input as required; sanitizes, then applies the bounds. Counts code points, matching how Postgres counts varchar.',
							name: 'RequiredStringSchema',
							type: '(options?: TextOptions) => ZodString',
						},
						{
							description:
								'Blank input becomes undefined instead of an empty string being written as if the user had typed something.',
							name: 'OptionalStringSchema',
							type: '(options?: TextOptions) => ZodType<string | undefined>',
						},
						{
							description:
								"Blank input becomes null, so a nullable column never has to tell '' and NULL apart.",
							name: 'NullableStringSchema',
							type: '(options?: TextOptions) => ZodType<string | null>',
						},
						{
							description:
								'Rejects line breaks instead of folding them — what a name field pasted from a PDF or a spreadsheet cell needs.',
							name: 'SingleLineSchema',
							type: '(options?: TextOptions) => ZodString',
						},
						{
							description:
								'Keeps line breaks: normalizes CRLF, trims each line, collapses blank runs, caps line count and line length.',
							name: 'MultilineSchema',
							type: '(options?: MultilineOptions) => ZodString',
						},
						{
							description:
								'Converts free text into a URL slug, or validates one in strict mode. Rejects route-colliding names, which a regex never catches.',
							name: 'SlugSchema',
							type: '(options?: SlugOptions) => ZodString',
						},
						{
							description:
								'Account handle: must start with a letter, no separator at an edge or doubled up, reserved names blocked, case folded so a handle cannot be taken twice.',
							name: 'UsernameSchema',
							type: '(options?: UsernameOptions) => ZodString',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Shared options</h2>
				<PropsTable
					props={[
						{
							default: '1',
							description: 'Minimum length, in code points.',
							name: 'min',
							type: 'number',
						},
						{
							default: '255',
							description: 'Maximum length, in code points.',
							name: 'max',
							type: 'number',
						},
						{
							default: "'collapse'",
							description:
								"How whitespace is handled: 'collapse', 'trim' or 'preserve'.",
							name: 'whitespace',
							type: "'collapse' | 'preserve' | 'trim'",
						},
						{
							default: "'NFC'",
							description:
								'Unicode normalization form. Without it the two spellings of an accented name are two different rows.',
							name: 'unicode',
							type: "'NFC' | 'NFD' | 'NFKC' | 'NFKD' | false",
						},
						{
							default: 'false',
							description:
								'Keeps zero-width and bidi-override characters instead of stripping them.',
							name: 'allowInvisible',
							type: 'boolean',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Slug and username
				</h2>
				<CodeBlock
					code={`import { SlugSchema, UsernameSchema } from '@turystack/fields'

SlugSchema().parse('  Ação   Rápida! ')          // 'acao-rapida'
SlugSchema().safeParse('admin')                  // reservedValue
SlugSchema({ strict: true }).safeParse('Ola')    // invalidSlug

UsernameSchema().parse(' Ana.Maria ')            // 'ana.maria'
UsernameSchema().safeParse('ana__maria')         // invalidUsername
UsernameSchema().safeParse('_ana')               // invalidUsername`}
					filename="slug-username.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
