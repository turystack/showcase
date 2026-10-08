import { createFileRoute } from '@tanstack/react-router'
import { uiLabelsEn } from '@turystack/react-i18n'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/react-i18n/api')({
	component: Page,
})

type Entry = {
	name: string
	signature: string
	description: string
}

const FUNCTIONS: Entry[] = [
	{
		description:
			'Declares the base dictionary. The inferred type is the contract.',
		name: 'defineTranslations',
		signature: '<T extends TranslationTree>(tree: T) => T',
	},
	{
		description:
			'Declares a complete language. A missing, invented, or wrongly typed key fails here.',
		name: 'defineLocale',
		signature: '<Base extends TranslationTree>(tree: Base) => Base',
	},
	{
		description:
			'Declares an unfinished language. What is missing falls back to the base.',
		name: 'definePartialLocale',
		signature:
			'<Base extends TranslationTree>(tree: DeepPartial<Base>) => DeepPartial<Base>',
	},
	{
		description:
			'Binds a dictionary to a Provider and four hooks, already typed.',
		name: 'defineI18n',
		signature: '(config: { base, locales, ui? }) => I18nInstance<Base, Locale>',
	},
	{
		description:
			'Builds the label set a UI package renders. A whole set, or a set plus changes.',
		name: 'defineUiLabels',
		signature:
			'(labels: UiLabels) => UiLabels\n(base: UiLabels, overrides: PartialUiLabels) => UiLabels',
	},
]

const VALUES: Entry[] = [
	{
		description:
			'The shipped labels by language tag — the same objects as the three exports below.',
		name: 'uiLabels',
		signature: "{ en, es, 'pt-br' }",
	},
	{
		description: 'The English label set. This is what react-web ships with.',
		name: 'uiLabelsEn',
		signature: 'UiLabels',
	},
	{
		description: 'The Brazilian Portuguese label set.',
		name: 'uiLabelsPtBr',
		signature: 'UiLabels',
	},
	{
		description: 'The Spanish label set.',
		name: 'uiLabelsEs',
		signature: 'UiLabels',
	},
]

const TYPES: Entry[] = [
	{
		description: 'A string, or a function returning one.',
		name: 'TranslationLeaf',
		signature: 'string | ((...args: never[]) => string)',
	},
	{
		description: 'The shape a dictionary is allowed to take.',
		name: 'TranslationTree',
		signature: '{ readonly [key: string]: TranslationLeaf | TranslationTree }',
	},
	{
		description: 'Optional down the tree, but a string is either there or not.',
		name: 'DeepPartial',
		signature: 'DeepPartial<T>',
	},
	{
		description:
			'A language fetched instead of bundled. You write the import, so the bundler splits it its own way.',
		name: 'LocaleLoader',
		signature: '<T>() => Promise<T | { readonly default: T }>',
	},
	{
		description: 'A tree, a partial tree, or a loader for one.',
		name: 'LocaleSource',
		signature: 'T | DeepPartial<T> | LocaleLoader<T>',
	},
	{
		description:
			'The languages that are bundled. `base` comes from this set, so a fetched base is a compile error.',
		name: 'EagerKeys',
		signature: 'EagerKeys<L>',
	},
	{
		description: `${Object.values(uiLabelsEn).reduce((total, group) => total + Object.keys(group).length, 0)} strings in ${Object.keys(uiLabelsEn).length} groups — the words react-web renders on its own.`,
		name: 'UiLabels',
		signature: 'UiLabels',
	},
	{
		description: 'The same tree with every string optional.',
		name: 'PartialUiLabels',
		signature: 'PartialUiLabels',
	},
	{
		description: 'The languages this package ships labels for.',
		name: 'ShippedUiLocale',
		signature: "'en' | 'es' | 'pt-br'",
	},
]

function Table({ entries, title }: { entries: Entry[]; title: string }) {
	return (
		<section className="space-y-4">
			<h2 className="font-display font-semibold text-xl">{title}</h2>
			<div className="overflow-hidden rounded-lg border border-border">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-border border-b bg-muted/50">
							<th className="px-4 py-3 text-left font-medium text-muted-foreground">
								Name
							</th>
							<th className="px-4 py-3 text-left font-medium text-muted-foreground">
								Signature
							</th>
							<th className="px-4 py-3 text-left font-medium text-muted-foreground">
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, index) => (
							<tr
								className={
									index < entries.length - 1 ? 'border-border border-b' : ''
								}
								key={entry.name}
							>
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
										{entry.name}
									</code>
								</td>
								<td className="px-4 py-3 align-top">
									<code className="whitespace-pre-line text-lib text-xs">
										{entry.signature}
									</code>
								</td>
								<td className="px-4 py-3 align-top text-muted-foreground">
									{entry.description}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<p className="font-medium text-lib text-sm">Reference</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					API
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					Everything the package exports, from one entry point.
				</p>
			</div>

			<Table
				entries={FUNCTIONS}
				title="Functions"
			/>
			<Table
				entries={VALUES}
				title="Values"
			/>
			<Table
				entries={TYPES}
				title="Types"
			/>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What defineI18n returns
				</h2>
				<CodeBlock
					code={`type I18nInstance<Base, Locale> = {
  I18nProvider: (props: I18nProviderProps<Locale>) => React.ReactNode
  useI18n: () => {
    t: Base
    locale: Locale
    locales: readonly Locale[]
    setLocale: (locale: Locale) => void
    loading: boolean
  }
  useTranslations: () => Base
  useLocale: () => Omit<I18nValue<Base, Locale>, 't'>
  useUiLabels: () => UiLabels
}`}
					filename="i18n-instance.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Platform</h2>
				<p className="max-w-3xl text-muted-foreground">
					The package is built without the DOM, so a stray{' '}
					<code className="rounded bg-muted px-1 py-0.5">window</code> or{' '}
					<code className="rounded bg-muted px-1 py-0.5">localStorage</code>{' '}
					fails the build instead of the app at run time.
				</p>
			</section>
		</div>
	)
}
