import { createFileRoute } from '@tanstack/react-router'
import {
	AnchorNav,
	type AnchorNavOffset,
	Button,
	Card,
	Input,
	Switch,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const anchorNavProps = [
	{
		description: 'The sections, in page order.',
		name: 'items',
		required: true,
		type: 'AnchorNavItem[]',
	},
	{
		default: '"header"',
		description: 'Clearance above a section; header clears a sticky one.',
		name: 'offset',
		type: '"none" | "header"',
	},
	{
		default: 'true',
		description: 'Follows the scroll position.',
		name: 'scrollSpy',
		type: 'boolean',
	},
	{
		description: 'Controlled active section id.',
		name: 'activeId',
		type: 'string',
	},
	{
		description: 'Initial active section. Defaults to the URL hash.',
		name: 'defaultActiveId',
		type: 'string',
	},
	{
		description: 'Called with the newly active id.',
		name: 'onActiveChange',
		type: '(id: string) => void',
	},
	{
		description: 'Names the nav. Defaults to the anchorNav.label label.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const itemProps = [
	{
		description: 'The id of the section element on the page.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'What the link says.',
		name: 'label',
		required: true,
		type: 'React.ReactNode',
	},
]

/** This page's own sections — the nav in the right column walks them. */
const pageSections = [
	{
		id: 'props',
		label: 'Props',
	},
	{
		id: 'anchor-nav-item',
		label: 'AnchorNavItem',
	},
	{
		id: 'slots',
		label: 'Slots',
	},
	{
		id: 'sticky',
		label: 'Sticky',
	},
	{
		id: 'spy',
		label: 'Scroll spy',
	},
	{
		id: 'offset',
		label: 'Offset',
	},
	{
		id: 'controlled',
		label: 'Controlled',
	},
	{
		id: 'usage',
		label: 'Usage',
	},
]

/** A settings screen inside the preview frame; ids prefixed to stay unique. */
const settingsSections = [
	{
		id: 'settings-general',
		label: 'Geral',
	},
	{
		id: 'settings-booking',
		label: 'Reservas',
	},
	{
		id: 'settings-billing',
		label: 'Faturamento',
	},
	{
		id: 'settings-notifications',
		label: 'Notificacoes',
	},
]

const usageCode = `import { AnchorNav } from '@turystack/react-web'

const sections = [
  { id: 'general', label: 'General' },
  { id: 'billing', label: 'Billing' },
]

// The column is sticky, not the nav — pinning is the layout's job
<div className="grid grid-cols-[1fr_12rem] gap-8">
  <div>
    <section id="general">…</section>
    <section id="billing">…</section>
  </div>
  <aside>
    <div className="sticky top-20">
      <AnchorNav items={sections} />
    </div>
  </aside>
</div>

// Controlled, following the scroll
<AnchorNav activeId={section} items={sections} onActiveChange={setSection} />

// Clicks only
<AnchorNav items={sections} offset="none" scrollSpy={false} />`

function Code({ children }: { children: string }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Page() {
	const [section, setSection] = useState('props')
	const [offset, setOffset] = useState<AnchorNavOffset>('none')
	const [framed, setFramed] = useState('settings-general')

	return (
		<div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_12rem]">
			<div className="min-w-0 space-y-10">
				<header>
					<p className="font-medium text-lib text-xs uppercase tracking-wider">
						Navigation
					</p>
					<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
						AnchorNav
					</h1>
					<p className="mt-3 max-w-prose text-lg text-muted-foreground">
						An "On this page" index that follows the scroll, like the one on the
						right.
					</p>
				</header>

				<section
					className="space-y-4"
					id="props"
				>
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={anchorNavProps} />
				</section>

				<section
					className="space-y-4"
					id="anchor-nav-item"
				>
					<h2 className="font-display font-semibold text-xl">AnchorNavItem</h2>
					<PropsTable props={itemProps} />
				</section>

				<div id="slots">
					<SlotsSection slug="anchor-nav" />
				</div>

				<section
					className="space-y-4"
					id="sticky"
				>
					<h2 className="font-display font-semibold text-xl">Sticky</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						AnchorNav does not pin itself; put it in a sticky column. The active
						link gets <Code>aria-current="location"</Code>.
					</p>
					<ComponentPreview title="Settings screen">
						<div className="h-96 w-full max-w-3xl overflow-y-auto rounded-lg bg-background ring-1 ring-foreground/10">
							<div className="grid grid-cols-[minmax(0,1fr)_10rem] gap-6 p-6">
								<div className="space-y-6">
									<section id="settings-general">
										<Card>
											<Card.Header bordered>
												<Card.Title>Geral</Card.Title>
											</Card.Header>
											<Card.Content>
												<div className="flex flex-col gap-3">
													<Input
														ariaLabel="Nome da propriedade"
														defaultValue="Pousada do Sol"
													/>
													<Input
														ariaLabel="E-mail"
														defaultValue="contato@pousadasol.com.br"
													/>
													<Input
														ariaLabel="Fuso horario"
														defaultValue="America/Sao_Paulo"
													/>
												</div>
											</Card.Content>
										</Card>
									</section>
									<section id="settings-booking">
										<Card>
											<Card.Header bordered>
												<Card.Title>Reservas</Card.Title>
											</Card.Header>
											<Card.Content>
												<div className="flex flex-col gap-4">
													<Switch
														defaultChecked
														label="Confirmar reservas automaticamente"
													/>
													<Switch label="Aceitar reservas no mesmo dia" />
													<Input
														ariaLabel="Horario de check-in"
														defaultValue="14:00"
													/>
												</div>
											</Card.Content>
										</Card>
									</section>
									<section id="settings-billing">
										<Card>
											<Card.Header bordered>
												<Card.Title>Faturamento</Card.Title>
											</Card.Header>
											<Card.Content>
												<div className="flex flex-col gap-3">
													<Input
														ariaLabel="CNPJ"
														defaultValue="12.345.678/0001-90"
													/>
													<Input
														ariaLabel="E-mail de cobranca"
														defaultValue="financeiro@pousadasol.com.br"
													/>
												</div>
											</Card.Content>
										</Card>
									</section>
									<section id="settings-notifications">
										<Card>
											<Card.Header bordered>
												<Card.Title>Notificacoes</Card.Title>
											</Card.Header>
											<Card.Content>
												<div className="flex flex-col gap-4">
													<Switch
														defaultChecked
														label="Nova reserva"
													/>
													<Switch
														defaultChecked
														label="Cancelamento"
													/>
													<Switch label="Avaliacao recebida" />
												</div>
											</Card.Content>
										</Card>
									</section>
								</div>
								<aside>
									<div className="sticky top-0">
										<AnchorNav
											ariaLabel="Secoes das configuracoes"
											items={settingsSections}
										/>
									</div>
								</aside>
							</div>
						</div>
					</ComponentPreview>
				</section>

				<section
					className="space-y-4"
					id="spy"
				>
					<h2 className="font-display font-semibold text-xl">Scroll spy</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						The section crossing the top half of the scroller is active; a click
						holds until the reader scrolls.
					</p>
				</section>

				<section
					className="space-y-4"
					id="offset"
				>
					<h2 className="font-display font-semibold text-xl">Offset</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						A click scrolls to the section and writes <Code>#id</Code> to the
						URL. <Code>offset="header"</Code> clears a sticky page header; this
						site uses <Code>none</Code>.
					</p>
					<ComponentPreview title="Offset of the nav on the right">
						<div className="flex flex-wrap items-center justify-center gap-2">
							<Button
								onClick={() => setOffset('none')}
								size="sm"
								variant={offset === 'none' ? 'default' : 'outline'}
							>
								offset="none"
							</Button>
							<Button
								onClick={() => setOffset('header')}
								size="sm"
								variant={offset === 'header' ? 'default' : 'outline'}
							>
								offset="header"
							</Button>
						</div>
					</ComponentPreview>
				</section>

				<section
					className="space-y-4"
					id="controlled"
				>
					<h2 className="font-display font-semibold text-xl">Controlled</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						<Code>activeId</Code> and <Code>onActiveChange</Code> control it.{' '}
						<Code>{'scrollSpy={false}'}</Code> moves the link only on click or{' '}
						<Code>activeId</Code>.
					</p>
					<ComponentPreview title="scrollSpy off">
						<div className="flex w-full max-w-md flex-col items-center gap-4">
							<div className="flex flex-wrap justify-center gap-2">
								{settingsSections.map((item) => (
									<Button
										key={item.id}
										onClick={() => setFramed(item.id)}
										size="sm"
										variant={framed === item.id ? 'default' : 'outline'}
									>
										{item.label}
									</Button>
								))}
							</div>
							<AnchorNav
								activeId={framed}
								ariaLabel="Secoes, controladas"
								items={settingsSections}
								offset="none"
								onActiveChange={setFramed}
								scrollSpy={false}
							/>
							<span className="text-muted-foreground text-sm">
								activeId: "{framed}"
							</span>
						</div>
					</ComponentPreview>
				</section>

				<section
					className="space-y-4"
					id="usage"
				>
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</section>
			</div>

			<aside className="hidden xl:block">
				<div className="sticky top-8 flex flex-col gap-3">
					<p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
						Nesta pagina
					</p>
					<div className="react-web-surface">
						<AnchorNav
							activeId={section}
							items={pageSections}
							offset={offset}
							onActiveChange={setSection}
						/>
					</div>
					<p className="text-muted-foreground text-xs">
						Voce esta em:{' '}
						<span className="font-medium text-foreground">
							{pageSections.find((item) => item.id === section)?.label}
						</span>
					</p>
				</div>
			</aside>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/anchor-nav')({
	component: Page,
})
