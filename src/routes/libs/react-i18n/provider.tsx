import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/react-i18n/provider')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<p className="font-medium text-lib text-sm">Runtime</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Provider and hooks
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					<code className="text-base">defineI18n</code> binds your dictionary to
					a Provider and four hooks, already typed by the languages you passed.
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Wiring</h2>
				<CodeBlock
					code={`import { defineI18n } from '@turystack/react-i18n'

import { en } from './locales/en'
import { ptBR } from './locales/pt-br'

export const {
  I18nProvider,
  useI18n,
  useTranslations,
  useLocale,
  useUiLabels,
} = defineI18n({
  base: 'en',
  locales: {
    en,                             // bundled — the base must be
    'pt-br': ptBR,                  // bundled
    es: () => import('./locales/es'),  // fetched on first use
  },
})`}
					filename="i18n.ts"
					language="ts"
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					A language is either a tree or a function returning one. The base has
					to be a tree, since everything else falls back to it — naming a
					fetched language as{' '}
					<code className="rounded bg-muted px-1 py-0.5">base</code> is a
					compile error. A loader may resolve the tree or a module with the tree
					as its <code className="rounded bg-muted px-1 py-0.5">default</code>.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">I18nProvider</h2>
				<PropsTable
					props={[
						{
							description:
								'Controlled. Pass it and your router or store owns the language, not the Provider.',
							name: 'locale',
							type: 'Locale',
						},
						{
							default: 'base',
							description:
								'Uncontrolled starting point. Ignored when `locale` is passed.',
							name: 'defaultLocale',
							type: 'Locale',
						},
						{
							description:
								'Fires on every change, including the one `setLocale` makes. Save it here.',
							name: 'onLocaleChange',
							type: '(locale: Locale) => void',
						},
					]}
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Reading</h2>
				<CodeBlock
					code={`function Cart({ count }: { count: number }) {
  const t = useTranslations()

  return <p>{count === 0 ? t.cart.empty : t.cart.items(count)}</p>
}

function LocalePicker() {
  const { locale, locales, setLocale, loading } = useLocale()

  return (
    <select
      disabled={loading}
      onChange={(event) => setLocale(event.target.value as typeof locale)}
      value={locale}
    >
      {locales.map((tag) => (
        <option key={tag} value={tag}>{tag}</option>
      ))}
    </select>
  )
}`}
					filename="cart.tsx"
					language="tsx"
				/>
				<div className="rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm">
					<code className="rounded bg-muted px-1 py-0.5">useI18n()</code>{' '}
					returns everything —{' '}
					<code className="rounded bg-muted px-1 py-0.5">
						{'{ t, locale, locales, setLocale, loading }'}
					</code>
					.{' '}
					<code className="rounded bg-muted px-1 py-0.5">
						useTranslations()
					</code>{' '}
					is the <code className="rounded bg-muted px-1 py-0.5">t</code> alone,{' '}
					<code className="rounded bg-muted px-1 py-0.5">useLocale()</code> is
					everything else. Outside the Provider they came from, all of them
					throw.
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Loading</h2>
				<p className="max-w-3xl text-muted-foreground">
					While a fetched language is on its way,{' '}
					<code className="rounded bg-muted px-1 py-0.5">t</code> serves the
					base and <code className="rounded bg-muted px-1 py-0.5">loading</code>{' '}
					is true, so the screen keeps its words. What has been loaded is kept,
					so going back is instant.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Persistence</h2>
				<p className="max-w-3xl text-muted-foreground">
					The package saves nothing. Where the language is kept —{' '}
					<code className="rounded bg-muted px-1 py-0.5">localStorage</code>, a
					cookie, the URL — is the app's call, so it hands you the event and
					stays out of the way.
				</p>
				<CodeBlock
					code={`// Controlled — your router or store owns the language.
<I18nProvider locale={locale} onLocaleChange={setLocale}>
  <App />
</I18nProvider>

// Uncontrolled — read storage once, before mount.
<I18nProvider defaultLocale={stored ?? 'en'} onLocaleChange={persist}>
  <App />
</I18nProvider>`}
					filename="app.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}
