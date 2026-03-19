import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

const i18nProps = [
	{
		default: '"No results found"',
		description: 'Message displayed when a select has no matching options.',
		name: 'select.empty',
		type: 'string',
	},
	{
		default: '"Loading more..."',
		description: 'Message displayed while loading additional select options.',
		name: 'select.loadingMore',
		type: 'string',
	},
	{
		default: '"Search country..."',
		description: 'Placeholder for the country search input in PhoneInput.',
		name: 'phoneInput.searchCountry',
		type: 'string',
	},
	{
		default: '"No countries found"',
		description:
			'Message displayed when no countries match the search in PhoneInput.',
		name: 'phoneInput.noCountriesFound',
		type: 'string',
	},
	{
		default: '"From"',
		description: 'Label for the start of a currency range.',
		name: 'currencyInput.from',
		type: 'string',
	},
	{
		default: '"To"',
		description: 'Label for the end of a currency range.',
		name: 'currencyInput.to',
		type: 'string',
	},
	{
		default: '"Cancel"',
		description: 'Label for the cancel action in CurrencyInput.',
		name: 'currencyInput.cancel',
		type: 'string',
	},
	{
		default: '"Confirm"',
		description: 'Label for the confirm action in CurrencyInput.',
		name: 'currencyInput.confirm',
		type: 'string',
	},
	{
		default: '"Select range"',
		description: 'Label for the range selection action in CurrencyInput.',
		name: 'currencyInput.selectRange',
		type: 'string',
	},
]

const usageCode = `import { Provider } from '@turystack/ui'

function App() {
  return (
    <Provider
      translations={{
        select: {
          empty: 'Nenhum resultado encontrado',
          loadingMore: 'Carregando mais...',
        },
        phoneInput: {
          searchCountry: 'Buscar país...',
          noCountriesFound: 'Nenhum país encontrado',
        },
        currencyInput: {
          from: 'De',
          to: 'Para',
          cancel: 'Cancelar',
          confirm: 'Confirmar',
          selectRange: 'Selecionar período',
        },
      }}
    >
      {children}
    </Provider>
  )
}`

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">I18n</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					An optional translations system that lets you override the default
					English strings used by components internally. Pass a partial
					translations object to the Provider and only the keys you provide will
					be replaced.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">I18nTranslations</h2>
				<PropsTable props={i18nProps} />
			</div>

			<div className="space-y-4">
				<p className="text-muted-foreground text-sm">
					All keys are optional. Any key you omit will fall back to the built-in
					English default.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Usage via Provider
				</h2>
				<p className="text-muted-foreground text-sm">
					Pass the{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						translations
					</code>{' '}
					prop to the Provider to override default strings for your locale.
				</p>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/ui/i18n')({
	component: Page,
})
