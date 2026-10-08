import { createFileRoute, Link } from '@tanstack/react-router'
import {
	Button,
	Modal,
	PortalProvider,
	usePortalContainerConfig,
	useResolvedPortalContainer,
} from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/portal-provider/portal-provider.types.ts`.
 *
 * The three hooks are the rest of the API, but they are not props, so they are
 * documented below rather than smuggled into this table.
 */
const providerProps = [
	{
		description: 'Where overlays mount: element, null (wait) or a function.',
		name: 'container',
		type: 'HTMLElement | null | (() => HTMLElement | null)',
	},
	{
		description: 'The subtree whose overlays mount into that container.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

type HookDoc = {
	signature: string
	returns: string
	when: string
}

const hooks: HookDoc[] = [
	{
		returns: 'PortalContainer | undefined',
		signature: 'usePortalContainerConfig()',
		when: 'The configured container, exactly as it was passed — element, null, function, or undefined outside any provider. Read it when you need to know whether a container was configured at all; undefined means “wherever the headless primitive puts it”, which is the body.',
	},
	{
		returns: 'PortalContainerProp | undefined',
		signature: 'usePortalContainer()',
		when: 'The same container in the shape Base UI accepts: an element, an explicit null, or a ref object — never a function. A configured function is handed over as a ref-shaped object so Base UI calls it when the portal mounts. The result is memoised, so a portal does not remount on every render. This is what almost every overlay in the library passes to its Portal.',
	},
	{
		returns: 'HTMLElement | null',
		signature: 'useResolvedPortalContainer()',
		when: 'The container as a real element, for createPortal — which resolves nothing itself and needs the node. Comes back null when nothing is configured, and createPortal will not take null, so guard before you call it. Toast is the one surface the library renders directly rather than through a headless primitive, so it is the one that resolves by hand.',
	},
]

const usageCode = `import { PortalProvider } from '@turystack/react-web'

// An element you already have
<PortalProvider container={document.getElementById('overlays')}>
  <App />
</PortalProvider>

// The usual case: the host is created by the tree this provider wraps, so it
// does not exist on the first render. A function is read when a portal mounts.
function Shell() {
  const host = useRef<HTMLDivElement>(null)
  const container = useCallback(() => host.current, [])

  return (
    <PortalProvider container={container}>
      <div className="themed-subtree">
        <App />
        <div ref={host} />
      </div>
    </PortalProvider>
  )
}

// An explicit null holds the portal until a container resolves, rather than
// falling back to the body
<PortalProvider container={null}>
  <App />
</PortalProvider>

// Reading it yourself, for an overlay of your own
import {
  usePortalContainer,
  useResolvedPortalContainer,
} from '@turystack/react-web'

function MyPopup() {
  const container = usePortalContainer()      // Base UI shape
  return <Popover.Portal container={container}>…</Popover.Portal>
}

function MyToast({ children }) {
  const container = useResolvedPortalContainer() // a real element, or null
  return container ? createPortal(children, container) : null
}`

function HookCard({ hook }: { hook: HookDoc }) {
	return (
		<div className="space-y-2 rounded-lg border border-border p-4">
			<div className="flex flex-wrap items-baseline gap-2">
				<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
					{hook.signature}
				</code>
				<span className="text-muted-foreground text-xs">returns</span>
				<code className="text-lib text-xs">{hook.returns}</code>
			</div>
			<p className="text-muted-foreground text-sm">{hook.when}</p>
		</div>
	)
}

function describe(
	node: HTMLElement | null | undefined,
	host: HTMLElement | null,
) {
	if (node === undefined) {
		return 'undefined'
	}
	if (node === null) {
		return 'null'
	}
	if (node === document.body) {
		return 'document.body'
	}
	if (node === host) {
		return 'the div at the bottom of this preview'
	}

	return 'the app-wide host mounted in __root.tsx'
}

/** Reports what the hooks see, so a preview can show the wiring itself. */
function Readout({ host, title }: { host: HTMLElement | null; title: string }) {
	const config = usePortalContainerConfig()
	const resolved = useResolvedPortalContainer()

	const configText =
		typeof config === 'function'
			? `a function — ${describe(config(), host)}`
			: describe(config, host)

	return (
		<div className="w-full space-y-2 rounded-lg border border-border p-4">
			<p className="font-medium text-foreground text-sm">{title}</p>
			<dl className="space-y-1">
				<div className="flex flex-wrap items-baseline gap-2">
					<dt className="text-muted-foreground text-xs">
						usePortalContainerConfig()
					</dt>
					<dd className="text-foreground text-sm">{configText}</dd>
				</div>
				<div className="flex flex-wrap items-baseline gap-2">
					<dt className="text-muted-foreground text-xs">
						useResolvedPortalContainer()
					</dt>
					<dd className="text-foreground text-sm">
						{describe(resolved, host)}
					</dd>
				</div>
			</dl>
		</div>
	)
}

function Panel({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="w-full space-y-3 rounded-lg border border-border p-4">
			<p className="font-medium text-foreground text-sm">{title}</p>
			{children}
		</div>
	)
}

function DemoModal({
	label,
	onChange,
	open,
}: {
	label: string
	onChange: (open: boolean) => void
	open: boolean
}) {
	return (
		<Modal
			onChange={onChange}
			open={open}
		>
			<Modal.Header
				bordered
				closable
			>
				<Modal.Header.Title>{label}</Modal.Header.Title>
				<Modal.Header.Description>
					Look at the Save button. Its colour tells you which stylesheet won.
				</Modal.Header.Description>
			</Modal.Header>
			<Modal.Body>
				<p className="text-muted-foreground text-sm">
					Both Buttons read <code>--primary</code>; they differ only in which
					element they inherit it from.
				</p>
			</Modal.Body>
			<Modal.Footer bordered>
				<Button onClick={() => onChange(false)}>Save</Button>
				<Button
					onClick={() => onChange(false)}
					variant="outline"
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

/**
 * The bug and the fix, one above the other.
 *
 * The first modal overrides this site's own container back to `document.body`,
 * which is what an app with no provider gets. The second names nothing and so
 * inherits what `__root.tsx` configured — a host wearing `.react-web-surface`.
 * Neither is parented inside the preview box: that box is `overflow-hidden` and
 * eight rem tall, and a modal mounted there renders in the right colours and is
 * clipped to a strip.
 */
function PaletteDemo() {
	const [bodyOpen, setBodyOpen] = useState(false)
	const [hostedOpen, setHostedOpen] = useState(false)

	return (
		<div className="flex w-full flex-col gap-4">
			<Panel title="container={document.body} — no provider">
				<PortalProvider container={document.body}>
					<Button
						onClick={() => setBodyOpen(true)}
						variant="outline"
					>
						Open
					</Button>
					<DemoModal
						label="Mounted on the body"
						onChange={setBodyOpen}
						open={bodyOpen}
					/>
				</PortalProvider>
			</Panel>
			<Panel title="No override — this site’s root host">
				<Button
					onClick={() => setHostedOpen(true)}
					variant="outline"
				>
					Open
				</Button>
				<DemoModal
					label="Mounted in the site's portal host"
					onChange={setHostedOpen}
					open={hostedOpen}
				/>
			</Panel>
		</div>
	)
}

/** The four configurations the hooks can be in. */
function ReadoutDemo() {
	// A state ref rather than useRef, only so this readout re-renders once the
	// host exists — a useRef would leave it reporting the null it saw on the
	// first pass, which is true of the first render and misleading about every
	// one after it.
	const [host, setHost] = useState<HTMLDivElement | null>(null)
	const container = useCallback(
		() => host,
		[
			host,
		],
	)

	return (
		<div className="flex w-full flex-col gap-4">
			<Readout
				host={host}
				title="No override — this site’s root host"
			/>
			<PortalProvider container={null}>
				<Readout
					host={host}
					title="container={null}"
				/>
			</PortalProvider>
			<PortalProvider container={document.body}>
				<Readout
					host={host}
					title="container={document.body}"
				/>
			</PortalProvider>
			<PortalProvider container={container}>
				<Readout
					host={host}
					title="container={() => host}"
				/>
			</PortalProvider>
			<div ref={setHost} />
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					PortalProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Names the element the library mounts its overlays into.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={providerProps} />
			</section>

			<SlotsSection slug="portal-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Why it exists</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Modal, Sheet, Popover, Tooltip, DropdownMenu, Select, Confirm,
					ColorPicker, Toast and Layout.Sidebar all render through a portal.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					It is also as far from your CSS variables as you can get, and that is
					the catch.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					This site is a live example: every preview frame wears the class that
					restores react-web’s own tokens.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The host sits at the root: inside the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						overflow-hidden
					</code>{' '}
					preview box, a modal would be clipped.
				</p>
				<ComponentPreview
					className="flex-col items-stretch"
					title="The same modal, mounted in two places"
				>
					<PaletteDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What container accepts
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						PortalContainer
					</code>{' '}
					is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						HTMLElement | null | (() =&gt; HTMLElement | null)
					</code>
					, and each of the three means something different.
				</p>
				<div className="space-y-3">
					<div className="space-y-1 rounded-lg border border-border p-4">
						<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
							an element
						</code>
						<p className="text-muted-foreground text-sm">
							The straightforward case, for a host that already exists — one you
							rendered outside React, or found by id.
						</p>
					</div>
					<div className="space-y-1 rounded-lg border border-border p-4">
						<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
							a function
						</code>
						<p className="text-muted-foreground text-sm">
							For a host from a{' '}
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								ref
							</code>{' '}
							callback: read when a portal mounts. Keep it stable with{' '}
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								useCallback
							</code>
							.
						</p>
					</div>
					<div className="space-y-1 rounded-lg border border-border p-4">
						<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
							an explicit null
						</code>
						<p className="text-muted-foreground text-sm">
							Unlike omitting the prop (body fallback),{' '}
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								null
							</code>{' '}
							holds the portal until a container resolves.
						</p>
					</div>
				</div>
				<ComponentPreview
					className="flex-col items-stretch"
					title="What the hooks see in each configuration"
				>
					<ReadoutDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The three hooks</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Three shapes for three kinds of consumer; all are safe outside a
					provider.
				</p>
				<div className="space-y-3">
					{hooks.map((hook) => (
						<HookCard
							hook={hook}
							key={hook.signature}
						/>
					))}
				</div>
				<p className="max-w-prose text-muted-foreground text-sm">
					Only needed for an overlay of your own; library overlays already use
					them.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Where it sits</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/tury-provider"
					>
						TuryProvider
					</Link>{' '}
					mounts this outermost and forwards its{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						portalContainer
					</code>{' '}
					prop to it.
				</p>
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

export const Route = createFileRoute(
	'/libs/react-web/components/portal-provider',
)({
	component: Page,
})
