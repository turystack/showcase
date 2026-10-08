import { createFileRoute } from '@tanstack/react-router'
import { uiLabelsEn } from '@turystack/react-i18n'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/react-i18n/ui-labels')({
	component: Page,
})

/**
 * Read from the English set the package ships, which is typed as the whole
 * `UiLabels` — so these can only be the contract's own groups and count. The
 * hand-kept list this replaced was missing a group, and its count was eighteen
 * strings behind.
 */
const GROUPS = Object.keys(uiLabelsEn).sort()

const STRINGS = Object.values(uiLabelsEn).reduce(
	(total, group) => total + Object.keys(group).length,
	0,
)

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<p className="font-medium text-lib text-sm">UI labels</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					The words the components own
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					"No records found", "Rows per page", "Are you sure?" — the strings{' '}
					<code className="text-base">@turystack/react-web</code> renders on its
					own. They live here, translated, on their own channel.
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Why not part of <code>t</code>
				</h2>
				<p className="max-w-3xl text-muted-foreground">
					A component library's wording is not your copy. Merged into your
					dictionary it would clutter autocomplete and turn a patch release into
					a diff in your translation files. So{' '}
					<code className="rounded bg-muted px-1 py-0.5">useUiLabels()</code> is
					a separate hook, and{' '}
					<code className="rounded bg-muted px-1 py-0.5">
						useTranslations()
					</code>{' '}
					returns only what you wrote.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Wiring</h2>
				<CodeBlock
					code={`import { TuryProvider } from '@turystack/react-web'

import { I18nProvider, useUiLabels } from './i18n'

function Ui({ children }: { children: React.ReactNode }) {
  return <TuryProvider labels={useUiLabels()}>{children}</TuryProvider>
}

export function App() {
  return (
    <I18nProvider defaultLocale="pt-br">
      <Ui>
        <Routes />
      </Ui>
    </I18nProvider>
  )
}`}
					filename="app.tsx"
					language="tsx"
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					<code className="rounded bg-muted px-1 py-0.5">useUiLabels()</code>{' '}
					follows the active language, so one switch relabels the components and
					your own copy together. It has to sit inside{' '}
					<code className="rounded bg-muted px-1 py-0.5">I18nProvider</code>,
					which is why the wrapper exists.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What ships</h2>
				<p className="max-w-3xl text-muted-foreground">
					Three languages, complete: <code>en</code>, <code>pt-br</code>,{' '}
					<code>es</code>. Use any of them and the components are translated for
					free. Declare one outside the set and the type asks you for its labels
					instead of quietly serving English.
				</p>
				<CodeBlock
					code={`import { uiLabels, uiLabelsEn, uiLabelsEs, uiLabelsPtBr } from '@turystack/react-i18n'

uiLabels['pt-br'] === uiLabelsPtBr  // true — the map is the same objects

defineI18n({
  base: 'en',
  locales: { en, de },
  //  → Property 'ui' is missing: 'de' is outside the set this package translates
})`}
					filename="ui-labels.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Overriding</h2>
				<p className="max-w-3xl text-muted-foreground">
					<code className="rounded bg-muted px-1 py-0.5">defineUiLabels</code>{' '}
					takes one complete set, or a set plus the strings you want changed.
					The second form leaves everything you did not name alone.
				</p>
				<CodeBlock
					code={`import { defineI18n, defineUiLabels, uiLabels } from '@turystack/react-i18n'

defineI18n({
  base: 'en',
  locales: { en, 'pt-br': ptBR },
  ui: {
    'pt-br': defineUiLabels(uiLabels['pt-br'], {
      editableText: { save: 'Gravar' },   // 'cancel' and the rest survive
    }),
  },
})`}
					filename="i18n.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The shape</h2>
				<p className="max-w-3xl text-muted-foreground">
					<code className="rounded bg-muted px-1 py-0.5">UiLabels</code> is{' '}
					{STRINGS} strings in {GROUPS.length} groups, one per component that
					says anything on its own.{' '}
					<code className="rounded bg-muted px-1 py-0.5">PartialUiLabels</code>{' '}
					is the same tree with every string optional.
				</p>
				<div className="flex flex-wrap gap-2">
					{GROUPS.map((group) => (
						<code
							className="rounded-lg border border-border bg-muted px-2 py-1 font-mono text-xs"
							key={group}
						>
							{group}
						</code>
					))}
				</div>
			</section>
		</div>
	)
}
