import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/react-i18n/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-i18n
				</h1>
				<div className="mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground">
					<p>
						Typed translations for React. A Provider, hooks, and{' '}
						<code className="text-base">define*</code> helpers.
					</p>
					<p>
						You write one dictionary. Its shape becomes the contract every other
						language is checked against.
					</p>
				</div>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-i18n',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-i18n',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-i18n',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/react-i18n',
							label: 'bun',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					<code className="rounded bg-muted px-1 py-0.5">react &gt;= 19</code>{' '}
					is the only peer dependency.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Interpolation is a function call, so the compiler checks the
							arguments
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A missing or misspelled key fails in the language file that has it
							wrong
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Languages load with the app or on first use</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Ships the words react-web renders, in <code>en</code>,{' '}
							<code>pt-br</code> and <code>es</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>No DOM: a stray window fails the build, not a Node test</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { defineI18n, defineTranslations } from '@turystack/react-i18n'

const en = defineTranslations({
  cart: {
    empty: 'Your cart is empty',
    items: (count: number) => \`\${count} items\`,
  },
})

export const { I18nProvider, useTranslations } = defineI18n({
  base: 'en',
  locales: { en },
})

export function Cart({ count }: { count: number }) {
  const t = useTranslations()

  return <p>{count === 0 ? t.cart.empty : t.cart.items(count)}</p>
}`}
					filename="i18n.tsx"
					language="tsx"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Why a factory</h2>
				<p className="max-w-3xl text-muted-foreground">
					A hook imported from a package cannot know the shape of your
					dictionary. Returned from{' '}
					<code className="rounded bg-muted px-1 py-0.5">defineI18n</code>, it
					already does — no{' '}
					<code className="rounded bg-muted px-1 py-0.5">declare module</code>{' '}
					to keep in sync, and two apps in one process never share state.
				</p>
			</div>
		</div>
	)
}
