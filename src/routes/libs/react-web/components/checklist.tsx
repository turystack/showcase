import { createFileRoute } from '@tanstack/react-router'
import { Button, Checklist, type ChecklistItem } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const checklistProps = [
	{
		description: 'The steps, in order. Progress is derived from them.',
		name: 'items',
		required: true,
		type: 'ChecklistItem[]',
	},
	{
		description: 'The heading. Also names the list.',
		name: 'title',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Folds done steps behind a toggle.',
		name: 'collapsible',
		type: 'boolean',
	},
	{
		description: 'Adds a close control to the header.',
		name: 'onDismiss',
		type: '() => void',
	},
]

const itemProps = [
	{
		description: 'Stable key for the step.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'What the step is.',
		name: 'label',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Whether the step is finished.',
		name: 'done',
		required: true,
		type: 'boolean',
	},
	{
		description: 'One line on what the step involves.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'The call to action. Hidden once done.',
		name: 'action',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Button, Checklist } from '@turystack/react-web'

<Checklist
  items={[
    { done: true, id: 'profile', label: 'Complete your profile' },
    {
      action: <Button size="sm">Add</Button>,
      done: false,
      id: 'bank',
      label: 'Add a bank account',
    },
  ]}
  title="Set up your account"
/>

// Done steps folded away, and a way to put the list aside
<Checklist
  collapsible
  items={steps}
  onDismiss={hideChecklist}
  title="Get started"
/>`

type Step = {
	id: string
	label: string
	description: string
	cta: string
}

const steps: Step[] = [
	{
		cta: 'Completar',
		description: 'Nome fantasia, CNPJ e endereco da propriedade.',
		id: 'profile',
		label: 'Complete o perfil da pousada',
	},
	{
		cta: 'Adicionar',
		description: 'Tipos de quarto, capacidade e fotos.',
		id: 'rooms',
		label: 'Cadastre os quartos',
	},
	{
		cta: 'Definir',
		description: 'Preco por noite e regras de temporada.',
		id: 'rates',
		label: 'Defina as tarifas',
	},
	{
		cta: 'Conectar',
		description: 'Recebimento via Pix e cartao.',
		id: 'bank',
		label: 'Conecte a conta bancaria',
	},
	{
		cta: 'Conectar',
		description: 'Booking.com, Airbnb ou Expedia.',
		id: 'channel',
		label: 'Conecte um canal de venda',
	},
]

function useSteps(initiallyDone: string[]) {
	const [done, setDone] = useState<string[]>(initiallyDone)

	const items: ChecklistItem[] = steps.map((step) => ({
		action: (
			<Button
				onClick={() =>
					setDone((current) => [
						...current,
						step.id,
					])
				}
				size="sm"
				variant="outline"
			>
				{step.cta}
			</Button>
		),
		description: step.description,
		done: done.includes(step.id),
		id: step.id,
		label: step.label,
	}))

	return {
		items,
		reset: () => setDone(initiallyDone),
	}
}

function Page() {
	const basic = useSteps([
		'profile',
		'rooms',
	])
	const folded = useSteps([
		'profile',
		'rooms',
		'rates',
	])
	const dismissible = useSteps([
		'profile',
	])
	const [dismissed, setDismissed] = useState(false)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Checklist
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Setup steps for a new account, with progress.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={checklistProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">ChecklistItem</h2>
				<PropsTable props={itemProps} />
			</section>

			<SlotsSection slug="checklist" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Progress</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The count and bar come from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						done
					</code>
					. The first undone step is marked{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-current="step"
					</code>
					; the bar is named by the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						checklist.progress
					</code>{' '}
					label.
				</p>
				<ComponentPreview title="Two of five done">
					<div className="flex w-full max-w-lg flex-col gap-3">
						<Checklist
							items={basic.items}
							title="Configure sua pousada"
						/>
						<Button
							className="self-center"
							onClick={basic.reset}
							size="sm"
							variant="ghost"
						>
							Recomecar
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Collapsible</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Done steps start folded behind a toggle.
				</p>
				<ComponentPreview title="Three done, folded">
					<div className="flex w-full max-w-lg flex-col gap-3">
						<Checklist
							collapsible
							items={folded.items}
							title="Quase la"
						/>
						<Button
							className="self-center"
							onClick={folded.reset}
							size="sm"
							variant="ghost"
						>
							Recomecar
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Dismissible</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onDismiss
					</code>{' '}
					adds a close control. The page decides what dismissing means.
				</p>
				<ComponentPreview title="Dismiss and restore">
					<div className="flex w-full max-w-lg flex-col gap-3">
						{dismissed ? (
							<Button
								className="self-center"
								onClick={() => {
									dismissible.reset()
									setDismissed(false)
								}}
								size="sm"
								variant="outline"
							>
								Mostrar o guia de configuracao
							</Button>
						) : (
							<Checklist
								collapsible
								items={dismissible.items}
								onDismiss={() => setDismissed(true)}
								title="Primeiros passos"
							/>
						)}
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

export const Route = createFileRoute('/libs/react-web/components/checklist')({
	component: Page,
})
