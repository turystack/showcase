import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@turystack/react-web'
import { ExternalLink, Mail, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/button/button.types.ts` and the
 * `defaultVariants` in `button.shared.ts` — not from an older copy of this
 * page, which had drifted from the library.
 */
const buttonProps = [
	{
		default: '"default"',
		description: 'Visual style of the button.',
		name: 'variant',
		type: '"default" | "dark" | "destructive" | "outline" | "dashed" | "secondary" | "ghost" | "link" | "link-muted"',
	},
	{
		default: '"md"',
		description: 'Button size; icon-* sizes are square, for one icon.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg"',
	},
	{
		description: 'Content rendered before the label — usually an icon.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered after the label — usually an icon.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Spinner in place of leftSection; implies disabled.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Stretches the button to the full width of its container.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Prevents interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		description: 'Accessible name; required on icon-only buttons.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: '"button"',
		description: 'Testing handle, rendered as the data-testid attribute.',
		name: 'data-testid',
		type: 'string',
	},
	{
		default: '"button"',
		description: 'The underlying HTML button type.',
		name: 'type',
		type: '"button" | "submit" | "reset"',
	},
	{
		description: 'Id of the form it submits, from outside that form.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Renders a real <a> link with the same variants and sizes.',
		name: 'href',
		type: 'string',
	},
	{
		default: 'false',
		description: 'With href: opens in a new tab, rel noopener noreferrer.',
		name: 'external',
		type: 'boolean',
	},
	{
		description: 'Marks the current item via aria-current.',
		name: 'current',
		type: 'boolean | "page" | "location"',
	},
	{
		default: 'false',
		description: 'Renders the child element with the button styling.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Extra classes merged onto the button.',
		name: 'className',
		type: 'string',
	},
	{
		description: 'Click handler — on the <a> when href is set.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>',
	},
]

const usageCode = `import { Button } from '@turystack/react-web'

// Variants
<Button>Default</Button>
<Button variant="dark">Dark</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button variant="link-muted">Link muted</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Icon-only — ariaLabel is what a screen reader announces
<Button ariaLabel="Search" size="icon-xs"><Search /></Button>
<Button ariaLabel="Search" size="icon-sm"><Search /></Button>
<Button ariaLabel="Search" size="icon-md"><Search /></Button>
<Button ariaLabel="Search" size="icon-lg"><Search /></Button>

// Sections
<Button leftSection={<Mail />}>Send email</Button>
<Button rightSection={<Trash2 />} variant="destructive">Delete</Button>

// States
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>
<Button disabledReason="Only admins can delete" variant="destructive">Delete</Button>
<Button block>Full width</Button>

// Rendering as something else
<Button href="/pricing">See pricing</Button>
<Button external href="https://docs.turystack.com" variant="link-muted">Docs</Button>

<p>
  Leia os <Button href="/termos" variant="link">termos de uso</Button> antes de continuar.
</p>

<Button asChild>
  <Link to="/pricing">See pricing</Link>
</Button>

// The link to the page on screen, in a top-bar nav
<nav aria-label="Principal">
  <Button current={pathname === '/reservas' && 'page'} href="/reservas" variant="ghost">Reservas</Button>
  <Button current={pathname === '/clientes' && 'page'} href="/clientes" variant="ghost">Clientes</Button>
</nav>

// Submitting a form it does not sit inside
<Button form="profile-form" type="submit">Save</Button>`

const NAV_ITEMS = [
	'Reservas',
	'Clientes',
	'Financeiro',
	'Relatórios',
] as const

type NavItem = (typeof NAV_ITEMS)[number]

function CurrentNav() {
	const [active, setActive] = useState<NavItem>('Reservas')

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<nav
				aria-label="Principal"
				className="flex flex-wrap justify-center gap-1"
			>
				{NAV_ITEMS.map((item) => (
					<Button
						current={active === item && 'page'}
						key={item}
						onClick={() => setActive(item)}
						variant="ghost"
					>
						{item}
					</Button>
				))}
			</nav>
			<nav
				aria-label="Rodapé"
				className="flex flex-wrap justify-center gap-4 text-sm"
			>
				{NAV_ITEMS.map((item) => (
					<Button
						current={active === item && 'page'}
						key={item}
						onClick={() => setActive(item)}
						variant="link-muted"
					>
						{item}
					</Button>
				))}
			</nav>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Button
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The primary way to trigger an action — and, with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>
					, the library's link.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={buttonProps} />
			</section>

			<SlotsSection slug="button" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dark
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						link-muted
					</code>
					: a high-contrast{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						default
					</code>
					, and a link that does not compete with its text.
				</p>
				<ComponentPreview title="All nine variants">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button>Default</Button>
						<Button variant="dark">Dark</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="dashed">Dashed</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="link">Link</Button>
						<Button variant="link-muted">Link muted</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="Text sizes">
					<div className="flex flex-wrap items-end justify-center gap-3">
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Icon-only sizes">
					<div className="flex flex-wrap items-end justify-center gap-3">
						<Button
							ariaLabel="Search"
							size="icon-xs"
						>
							<Search />
						</Button>
						<Button
							ariaLabel="Search"
							size="icon-sm"
						>
							<Search />
						</Button>
						<Button
							ariaLabel="Search"
							size="icon-md"
						>
							<Search />
						</Button>
						<Button
							ariaLabel="Search"
							size="icon-lg"
						>
							<Search />
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<ComponentPreview title="Left and right sections">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button leftSection={<Mail />}>Send email</Button>
						<Button
							rightSection={<Trash2 />}
							variant="destructive"
						>
							Delete
						</Button>
						<Button
							leftSection={<Search />}
							variant="outline"
						>
							Search
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					replaces{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>{' '}
					with a spinner and disables the button on its own — you do not need to
					pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					as well.
				</p>
				<ComponentPreview title="Loading">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button loading>Default</Button>
						<Button
							loading
							variant="outline"
						>
							Outline
						</Button>
						<Button
							leftSection={<Mail />}
							loading
							variant="secondary"
						>
							Replaces the icon
						</Button>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Disabled">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button disabled>Default</Button>
						<Button
							disabled
							variant="outline"
						>
							Outline
						</Button>
						<Button
							disabled
							variant="destructive"
						>
							Destructive
						</Button>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Block">
					<div className="w-full max-w-sm">
						<Button block>Full width</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					blocks the button but keeps it focusable; hover or focus it to read
					why.
				</p>
				<ComponentPreview title="A blocked delete next to a free edit">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button variant="outline">Editar</Button>
						<Button
							disabledReason="Só administradores podem excluir"
							leftSection={<Trash2 />}
							variant="destructive"
						>
							Excluir
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Links</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>{' '}
					renders a real{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;a&gt;
					</code>{' '}
					with every variant and size;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						external
					</code>{' '}
					opens it in a new tab.
				</p>
				<ComponentPreview title="Link-shaped buttons">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button href="#pricing">Ver planos</Button>
						<Button
							href="#pricing"
							variant="outline"
						>
							Falar com vendas
						</Button>
						<Button
							external
							href="https://github.com/turystack"
							rightSection={<ExternalLink />}
							variant="ghost"
						>
							GitHub
						</Button>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						link
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						link-muted
					</code>{' '}
					have no padding, so they sit inside a sentence. A disabled link drops
					its{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>{' '}
					and leaves the tab order.
				</p>
				<ComponentPreview title="Inline in a sentence">
					<div className="max-w-md space-y-3 text-sm">
						<p>
							Ao continuar, você concorda com os{' '}
							<Button
								href="#termos"
								variant="link"
							>
								termos de uso
							</Button>{' '}
							e a{' '}
							<Button
								external
								href="https://example.com/privacidade"
								variant="link"
							>
								política de privacidade
							</Button>
							.
						</p>
						<p className="text-muted-foreground">
							Precisa de ajuda?{' '}
							<Button
								href="#ajuda"
								variant="link-muted"
							>
								Central de ajuda
							</Button>{' '}
							·{' '}
							<Button
								disabled
								href="#fatura"
								variant="link-muted"
							>
								Baixar fatura (disponível dia 5)
							</Button>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The current item</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						current
					</code>{' '}
					sets{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-current
					</code>
					:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&quot;page&quot;
					</code>{' '}
					for a nav,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&quot;location&quot;
					</code>{' '}
					for a flow step,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						true
					</code>{' '}
					for any other set.
				</p>
				<ComponentPreview title='current="page" in a ghost nav and a link-muted nav'>
					<CurrentNav />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					As another element
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>{' '}
					renders the child with the styling — for a router link. For a plain
					URL, use{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>
					.
				</p>
				<ComponentPreview title="Rendered as an anchor">
					<Button asChild>
						<a href="https://github.com/turystack/react-web">Open the repo</a>
					</Button>
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

export const Route = createFileRoute('/libs/react-web/components/button')({
	component: Page,
})
