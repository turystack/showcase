import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

const i18nProps = [
	// select
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
	// phoneInput
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
	// currencyInput
	{
		default: '-',
		description: 'Label for the start of a currency range.',
		name: 'currencyInput.from',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the end of a currency range.',
		name: 'currencyInput.to',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the cancel action in CurrencyInput range.',
		name: 'currencyInput.cancel',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the confirm action in CurrencyInput range.',
		name: 'currencyInput.confirm',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Placeholder shown in the CurrencyInput range trigger when no value is selected and no placeholder prop is provided.',
		name: 'currencyInput.selectRange',
		type: 'string',
	},
	// numberInput
	{
		default: '-',
		description: 'Label for the start of a number range.',
		name: 'numberInput.from',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the end of a number range.',
		name: 'numberInput.to',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the cancel action in NumberInput range.',
		name: 'numberInput.cancel',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the confirm action in NumberInput range.',
		name: 'numberInput.confirm',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Placeholder shown in the NumberInput range trigger when no value is selected and no placeholder prop is provided.',
		name: 'numberInput.selectRange',
		type: 'string',
	},
	// uploader
	{
		default: '-',
		description: 'Main instructional text shown in the Uploader drop zone.',
		name: 'uploader.clickOrDrag',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Text shown next to the accepted file types in the Uploader drop zone.',
		name: 'uploader.accepted',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Text shown next to the max file size in the Uploader drop zone.',
		name: 'uploader.maxSize',
		type: 'string',
	},
	{
		default: '-',
		description: 'Error message shown when a file fails to upload.',
		name: 'uploader.errorUploading',
		type: 'string',
	},
	// alert
	{
		default: '-',
		description: 'Accessible label for the close button in Alert.',
		name: 'alert.close',
		type: 'string',
	},
	// label
	{
		default: '" *"',
		description: 'Marker appended to a Label when required is true.',
		name: 'label.required',
		type: 'string',
	},
	{
		default: '" (optional)"',
		description: 'Marker appended to a Label when optional is true.',
		name: 'label.optional',
		type: 'string',
	},
	// table
	{
		default: '-',
		description: 'Message displayed in the Table when there are no rows.',
		name: 'table.noData',
		type: 'string',
	},
	// confirm
	{
		default: '-',
		description: 'Label for the confirm button in the Confirm dialog.',
		name: 'confirm.confirm',
		type: 'string',
	},
	{
		default: '-',
		description: 'Label for the cancel button in the Confirm dialog.',
		name: 'confirm.cancel',
		type: 'string',
	},
	// sidebar
	{
		default: '-',
		description: 'Accessible label for the sidebar toggle button.',
		name: 'sidebar.toggle',
		type: 'string',
	},
	// documentInput
	{
		default: '"CPF"',
		description: 'Label for the CPF option in DocumentInput.',
		name: 'documentInput.cpf',
		type: 'string',
	},
	{
		default: '"CNPJ"',
		description: 'Label for the CNPJ option in DocumentInput.',
		name: 'documentInput.cnpj',
		type: 'string',
	},
	{
		default: '-',
		description: 'Placeholder for the CPF input in DocumentInput.',
		name: 'documentInput.cpfPlaceholder',
		type: 'string',
	},
	{
		default: '-',
		description: 'Placeholder for the CNPJ input in DocumentInput.',
		name: 'documentInput.cnpjPlaceholder',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Placeholder shown in DocumentInput when the variant is "any" (CPF or CNPJ).',
		name: 'documentInput.cpfOrCnpjPlaceholder',
		type: 'string',
	},
	// pagination
	{
		default: '-',
		description: 'Label shown before the rows-per-page selector in Pagination.',
		name: 'pagination.rowsPerPage',
		type: 'string',
	},
	{
		default: '-',
		description:
			'Word shown between the current range and the total in Pagination (e.g. "1–10 of 100").',
		name: 'pagination.of',
		type: 'string',
	},
	// passwordInput
	{
		default: '"Very weak"',
		description: 'Label for the lowest password strength level.',
		name: 'passwordInput.veryWeak',
		type: 'string',
	},
	{
		default: '"Weak"',
		description: 'Label for the weak password strength level.',
		name: 'passwordInput.weak',
		type: 'string',
	},
	{
		default: '"Medium"',
		description: 'Label for the medium password strength level.',
		name: 'passwordInput.medium',
		type: 'string',
	},
	{
		default: '"Strong"',
		description: 'Label for the strong password strength level.',
		name: 'passwordInput.strong',
		type: 'string',
	},
	{
		default: '"Very strong"',
		description: 'Label for the highest password strength level.',
		name: 'passwordInput.veryStrong',
		type: 'string',
	},
	// dateInput
	{
		default: '"dd/MM/yyyy"',
		description: 'Date format string used by DateInput (date-fns tokens).',
		name: 'dateInput.format',
		type: 'string',
	},
	// dateRangeInput
	{
		default: '"dd/MM/yyyy"',
		description: 'Date format string used by DateRangeInput (date-fns tokens).',
		name: 'dateRangeInput.format',
		type: 'string',
	},
	{
		default: '"~"',
		description: 'Separator between the start and end dates in DateRangeInput.',
		name: 'dateRangeInput.separator',
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
          to: 'Até',
          cancel: 'Cancelar',
          confirm: 'Confirmar',
          selectRange: 'Selecionar período',
        },
        numberInput: {
          from: 'De',
          to: 'Até',
          cancel: 'Cancelar',
          confirm: 'Confirmar',
          selectRange: 'Selecionar intervalo',
        },
        uploader: {
          clickOrDrag: 'Clique ou arraste arquivos para enviar',
          accepted: 'Aceitos',
          maxSize: 'Tamanho máximo',
          errorUploading: 'Erro ao enviar',
        },
        alert: {
          close: 'Fechar',
        },
        label: {
          required: ' *',
          optional: ' (opcional)',
        },
        table: {
          noData: 'Nenhum dado',
        },
        confirm: {
          confirm: 'Confirmar',
          cancel: 'Cancelar',
        },
        sidebar: {
          toggle: 'Alternar menu lateral',
        },
        documentInput: {
          cpf: 'CPF',
          cnpj: 'CNPJ',
          cpfPlaceholder: '000.000.000-00',
          cnpjPlaceholder: '00.000.000/0000-00',
          cpfOrCnpjPlaceholder: 'CPF ou CNPJ',
        },
        pagination: {
          rowsPerPage: 'Linhas por página:',
          of: 'de',
        },
        passwordInput: {
          veryWeak: 'Muito fraca',
          weak: 'Fraca',
          medium: 'Média',
          strong: 'Forte',
          veryStrong: 'Muito forte',
        },
        dateInput: {
          format: 'dd/MM/yyyy',
        },
        dateRangeInput: {
          format: 'dd/MM/yyyy',
          separator: '~',
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
					Overrides the components' default English strings. Pass a partial
					translations object to the Provider.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">I18nTranslations</h2>
				<PropsTable props={i18nProps} />
			</div>

			<div className="space-y-4">
				<p className="text-muted-foreground text-sm">
					All keys are optional. Keys marked with a default value will fall back
					to that value when omitted. Keys marked{' '}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">-</code> have
					no built-in default and will render empty if not provided.
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

export const Route = createFileRoute('/libs/react-web/i18n')({
	component: Page,
})
