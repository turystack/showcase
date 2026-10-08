import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/react-i18n/dictionary')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<p className="font-medium text-lib text-sm">Dictionary</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Base and locales
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					Three helpers. Each one makes a different mistake fail in the file
					that made it.
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					defineTranslations
				</h2>
				<p className="max-w-3xl text-muted-foreground">
					Declares the base dictionary. It returns what you pass; the work is in
					the type.
				</p>
				<CodeBlock
					code={`import { defineTranslations } from '@turystack/react-i18n'

export const en = defineTranslations({
  cart: {
    empty: 'Your cart is empty',
    items: (count: number) => \`\${count} items\`,
    total: (value: string) => \`Total: \${value}\`,
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
  },
})

export type AppTranslations = typeof en`}
					filename="locales/en.ts"
					language="ts"
				/>
				<div className="rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm">
					<p>
						Interpolation is a function, not a{' '}
						<code className="rounded bg-muted px-1 py-0.5">{'{name}'}</code>{' '}
						placeholder. Nothing is parsed at run time, and the compiler checks
						every argument. Type the parameters{' '}
						<strong className="text-foreground">here only</strong> — the other
						languages inherit them.
					</p>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">defineLocale</h2>
				<p className="max-w-3xl text-muted-foreground">
					Declares a complete language. You name the base, so a missing key, an
					invented key, or a wrong argument type fails right here.
				</p>
				<CodeBlock
					code={`import { defineLocale } from '@turystack/react-i18n'

import type { AppTranslations } from './en'

export const ptBR = defineLocale<AppTranslations>({
  cart: {
    empty: 'Seu carrinho está vazio',
    items: (count) => \`\${count} itens\`, // \`count\` is already number
    total: (value) => \`Total: \${value}\`,
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
  },
})`}
					filename="locales/pt-br.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					definePartialLocale
				</h2>
				<p className="max-w-3xl text-muted-foreground">
					Declares a language that is still being translated. What is missing
					falls back to the base. It is a separate helper so the code says which
					languages are unfinished.
				</p>
				<CodeBlock
					code={`import { definePartialLocale } from '@turystack/react-i18n'

import type { AppTranslations } from './en'

export const es = definePartialLocale<AppTranslations>({
  common: {
    save: 'Guardar',
  },
})

// t.common.save  → 'Guardar'
// t.cart.empty   → 'Your cart is empty'  (falls back to base)`}
					filename="locales/es.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What fails</h2>
				<CodeBlock
					code={`defineLocale<AppTranslations>({
  cart: {
    empty: 'Seu carrinho está vazio',
    items: (count) => \`\${count} itens\`,
    // total is missing
    //   → Property 'total' is missing in type '{ empty: string; items: … }'
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    //   → Object literal may only specify known properties
  },
})`}
					filename="what-fails.ts"
					language="ts"
				/>
			</section>
		</div>
	)
}
