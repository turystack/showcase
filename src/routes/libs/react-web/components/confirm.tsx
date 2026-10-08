import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Confirm } from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/confirm/confirm.types.ts` and the
 * destructuring defaults in `confirm.tsx`.
 *
 * Split in two because the contract is: everything in the first table is
 * common to all five modes, everything in the second either selects a mode or
 * belongs to exactly one of them. A single table would have hidden that.
 */
const sharedProps = [
	{
		description: 'Controlled visibility; renders nothing while false.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Heading of the dialog. Names it for assistive technology.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'Body copy. Becomes the dialog description.',
		name: 'description',
		required: true,
		type: 'string',
	},
	{
		description: 'Node under the description: what the action hits.',
		name: 'content',
		type: 'React.ReactNode',
	},
	{
		default: 'labels.confirm.confirm',
		description: 'Confirm button label.',
		name: 'confirmText',
		type: 'string',
	},
	{
		default: 'labels.confirm.cancel',
		description: 'Cancel button label.',
		name: 'cancelText',
		type: 'string',
	},
	{
		description: 'Confirm Button props; its disabled is respected.',
		name: 'confirmProps',
		type: "Omit<ButtonProps, 'loading' | 'onClick'>",
	},
	{
		default: '{ variant: "outline" }',
		description: 'Cancel Button props; a variant replaces outline.',
		name: 'cancelProps',
		type: "Omit<ButtonProps, 'loading' | 'onClick'>",
	},
	{
		description: 'Runs on cancel; a promise spins the button.',
		name: 'onCancel',
		type: '() => void',
	},
	{
		description: 'Fires on every close; set open to false here.',
		name: 'onClose',
		type: '() => void',
	},
]

const modeProps = [
	{
		default: '"simple"',
		description: 'Challenge before confirming; unlocks that mode’s props.',
		name: 'mode',
		type: '"simple" | "typed" | "password" | "otp" | "acknowledge"',
	},
	{
		description: 'typed only, required: the exact text to retype.',
		name: 'confirmationValue',
		type: 'string',
	},
	{
		description: 'acknowledge only, required: the statement to tick.',
		name: 'acknowledgement',
		type: 'string',
	},
	{
		default: '[6]',
		description: 'otp only: digits per segment; [3, 3] is two groups of 3.',
		name: 'otpPattern',
		type: 'number[]',
	},
	{
		description: 'typed, password, otp: label above the field.',
		name: 'challengeLabel',
		type: 'string',
	},
	{
		description: 'typed, password: placeholder; typed shows the target text.',
		name: 'challengePlaceholder',
		type: 'string',
	},
	{
		description: 'Runs on confirm; a rejection keeps the dialog open.',
		name: 'onConfirm',
		type: '() => void | ((value: string) => void)',
	},
]

const usageCode = `import { Confirm } from '@turystack/react-web'

const [open, setOpen] = useState(false)

// simple — the default, no mode to declare
<Confirm
  description="Everyone on the list gets an e-mail straight away."
  onClose={() => setOpen(false)}
  onConfirm={() => sendInvites()}
  open={open}
  title="Send the invites?"
/>

// typed — the confirm button unlocks once the text matches exactly
<Confirm
  confirmProps={{ variant: 'destructive' }}
  confirmationValue="acme-prod"
  description="The project and everything in it goes."
  mode="typed"
  onClose={() => setOpen(false)}
  onConfirm={(typed) => remove(typed)}
  open={open}
  title="Delete acme-prod?"
/>

// password — the component collects it, you validate it
<Confirm
  description="Rotating invalidates every token signed with the old key."
  mode="password"
  onClose={() => setOpen(false)}
  onConfirm={async (password) => {
    // reject and the dialog stays open with this message
    await rotateKey(password)
  }}
  open={open}
  title="Confirm it is you"
/>

// otp — two groups of three instead of the default six
<Confirm
  description="We sent a code to the number on file."
  mode="otp"
  onClose={() => setOpen(false)}
  onConfirm={async (code) => await verify(code)}
  open={open}
  otpPattern={[3, 3]}
  title="Enter the code"
/>

// acknowledge — a statement to tick, nothing to hand back
<Confirm
  acknowledgement="I understand this cannot be undone."
  description="The export will contain personal data."
  mode="acknowledge"
  onClose={() => setOpen(false)}
  onConfirm={() => download()}
  open={open}
  title="Download the export?"
/>

// content — a node, under the description, in any mode
<Confirm
  content={
    <ul>
      <li>12 bookings</li>
      <li>3 payment methods</li>
    </ul>
  }
  description="This cannot be undone."
  onClose={() => setOpen(false)}
  onConfirm={() => remove()}
  open={open}
  title="Delete this account?"
/>

// These do not compile — the union refuses them
<Confirm confirmationValue="acme" ... />          // no mode: simple takes none
<Confirm mode="typed" ... />                      // typed needs confirmationValue
<Confirm mode="acknowledge" otpPattern={[6]} ... /> // otpPattern is not its prop`

function Outcome({ children }: { children: ReactNode }) {
	return <span className="text-muted-foreground text-xs">{children}</span>
}

/** simple: the whole dialog is the question. */
function SimpleDemo() {
	const [open, setOpen] = useState(false)
	const [fired, setFired] = useState<string[]>([])

	const record = (name: string) => {
		setFired((names) => [
			...names,
			name,
		])
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => {
					setFired([])
					setOpen(true)
				}}
			>
				Send the invites
			</Button>
			<Outcome>
				{fired.length > 0 ? fired.join(' → ') : 'No callback has fired yet'}
			</Outcome>
			<Confirm
				description="Everyone on the list gets an e-mail straight away."
				onCancel={() => record('onCancel')}
				onClose={() => {
					record('onClose')
					setOpen(false)
				}}
				onConfirm={() => record('onConfirm')}
				open={open}
				title="Send the invites?"
			/>
		</div>
	)
}

/** typed: the confirm button waits for an exact string. */
function TypedDemo() {
	const [open, setOpen] = useState(false)
	const [received, setReceived] = useState<string>()

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => {
					setReceived(undefined)
					setOpen(true)
				}}
				variant="destructive"
			>
				Delete project
			</Button>
			<Outcome>
				{received
					? `onConfirm received "${received}"`
					: 'The dialog asks you to type acme-prod'}
			</Outcome>
			<Confirm
				confirmationValue="acme-prod"
				confirmProps={{
					variant: 'destructive',
				}}
				confirmText="Delete"
				description="The project, its environments and its API keys go with it."
				mode="typed"
				onClose={() => setOpen(false)}
				onConfirm={(value) => setReceived(value)}
				open={open}
				title="Delete acme-prod?"
			/>
		</div>
	)
}

/**
 * password: the dialog collects, the caller validates.
 *
 * Rejecting is the whole point — a wrong password has to leave the dialog
 * standing, because closing it would throw away the attempt.
 */
function PasswordDemo() {
	const [open, setOpen] = useState(false)
	const [done, setDone] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => {
					setDone(false)
					setOpen(true)
				}}
				variant="outline"
			>
				Rotate the signing key
			</Button>
			<Outcome>
				{done
					? 'Confirmed — and the password is already gone from the dialog'
					: 'The password in this demo is hunter2; anything else is refused'}
			</Outcome>
			<Confirm
				description="Rotating invalidates every token signed with the old key."
				mode="password"
				onClose={() => setOpen(false)}
				onConfirm={async (value) => {
					await new Promise((resolve) => setTimeout(resolve, 600))
					if (value !== 'hunter2') {
						throw new Error('That is not your password.')
					}
					setDone(true)
				}}
				open={open}
				title="Confirm it is you"
			/>
		</div>
	)
}

/** otp: two groups of three, rather than the default single six. */
function OtpDemo() {
	const [open, setOpen] = useState(false)
	const [received, setReceived] = useState<string>()

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => {
					setReceived(undefined)
					setOpen(true)
				}}
			>
				Approve the transfer
			</Button>
			<Outcome>
				{received
					? `onConfirm received "${received}"`
					: 'Any six digits will do — nothing here checks them'}
			</Outcome>
			<Confirm
				description="We sent a code to the number ending 4417."
				mode="otp"
				onClose={() => setOpen(false)}
				onConfirm={(value) => setReceived(value)}
				open={open}
				otpPattern={[
					3,
					3,
				]}
				title="Enter the code"
			/>
		</div>
	)
}

/** acknowledge: a statement to tick, and nothing collected. */
function AcknowledgeDemo() {
	const [open, setOpen] = useState(false)
	const [done, setDone] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => {
					setDone(false)
					setOpen(true)
				}}
				variant="outline"
			>
				Download the export
			</Button>
			<Outcome>
				{done
					? 'onConfirm ran, with no argument — there was nothing to hand over'
					: 'The confirm button stays blocked until the box is ticked'}
			</Outcome>
			<Confirm
				acknowledgement="I understand this file contains personal data."
				confirmText="Download"
				description="The export includes names, e-mail addresses and phone numbers."
				mode="acknowledge"
				onClose={() => setOpen(false)}
				onConfirm={() => setDone(true)}
				open={open}
				title="Download the export?"
			/>
		</div>
	)
}

/** content: the slot under the description, here in typed mode. */
function BlastRadiusDemo() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => setOpen(true)}
				variant="destructive"
			>
				Close the account
			</Button>
			<Confirm
				confirmationValue="close"
				confirmProps={{
					variant: 'destructive',
				}}
				confirmText="Close the account"
				content={
					<ul className="space-y-1 rounded-lg border border-border p-3">
						<li>12 bookings, 3 of them still upcoming</li>
						<li>2 saved payment methods</li>
						<li>R$ 1.240,00 of unredeemed credit</li>
					</ul>
				}
				description="Everything below goes with it, and none of it comes back."
				mode="typed"
				onClose={() => setOpen(false)}
				open={open}
				title="Close this account?"
			/>
		</div>
	)
}

/** A rejection that carries a message of its own. */
function RejectionDemo() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button onClick={() => setOpen(true)}>Archive the workspace</Button>
			<Outcome>
				The handler always rejects — the dialog will not go away
			</Outcome>
			<Confirm
				description="Confirming calls a handler that throws every single time."
				onClose={() => setOpen(false)}
				onConfirm={async () => {
					await new Promise((resolve) => setTimeout(resolve, 600))
					throw new Error('The workspace still has 3 active bookings.')
				}}
				open={open}
				title="Archive this workspace?"
			/>
		</div>
	)
}

/** A rejection with nothing to say, which falls back to the label. */
function SilentRejectionDemo() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				Retry the payment
			</Button>
			<Outcome>The rejection carries no message, so the label fills in</Outcome>
			<Confirm
				description="Confirming rejects with an error that has no message."
				onClose={() => setOpen(false)}
				onConfirm={async () => {
					await new Promise((resolve) => setTimeout(resolve, 600))
					throw new Error()
				}}
				open={open}
				title="Retry this payment?"
			/>
		</div>
	)
}

/** A confirm handler slow enough to see the button spin. */
function SlowConfirmDemo() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button onClick={() => setOpen(true)}>Publish the changes</Button>
			<Confirm
				description="The confirm button spins for a second and a half, then the dialog closes itself."
				onClose={() => setOpen(false)}
				onConfirm={async () => {
					await new Promise((resolve) => setTimeout(resolve, 1500))
				}}
				open={open}
				title="Publish these changes?"
			/>
		</div>
	)
}

/**
 * A cancel handler slow enough to see the button spin.
 *
 * The cancel button closes the dialog on the click, while its handler is still
 * running — so a slow cancel would flash past. This flag holds the dialog open
 * until the handler settles, which is the only way to see the spinner the
 * component puts on that button.
 */
function SlowCancelDemo() {
	const [open, setOpen] = useState(false)
	const cancelling = useRef(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				Discard with a wait
			</Button>
			<Confirm
				cancelText="Discard the draft"
				confirmText="Keep editing"
				description="Discarding takes a second and a half. The cancel button spins for all of it."
				onCancel={async () => {
					cancelling.current = true
					await new Promise((resolve) => setTimeout(resolve, 1500))
					cancelling.current = false
					setOpen(false)
				}}
				onClose={() => {
					// Runs in the same click as onCancel, in an order the component does
					// not promise — read the flag on the next tick, by which time
					// onCancel has certainly set it.
					setTimeout(() => {
						if (!cancelling.current) {
							setOpen(false)
						}
					}, 0)
				}}
				open={open}
				title="Leave without saving?"
			/>
		</div>
	)
}

/** Both buttons dressed by hand. */
function StyledDemo() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				onClick={() => setOpen(true)}
				variant="destructive"
			>
				Delete booking
			</Button>
			<Confirm
				cancelProps={{
					variant: 'ghost',
				}}
				cancelText="Keep it"
				confirmProps={{
					ariaLabel: 'Delete this booking for good',
					variant: 'destructive',
				}}
				confirmText="Delete"
				description="The booking, its payments and its messages go with it."
				onClose={() => setOpen(false)}
				open={open}
				title="Delete this booking?"
			/>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Confirm
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An alert dialog that asks one question before something irreversible
					runs.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">Every mode</h3>
				<PropsTable props={sharedProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					The backdrop is the shared{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bg-overlay
					</code>{' '}
					scrim, blurred by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay-blur
					</code>
					; theme it via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay
					</code>
					.
				</p>
				<h3 className="font-medium text-sm">The mode, and what it unlocks</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					Everything in this table except{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onConfirm
					</code>{' '}
					belongs to exactly one mode, and is a type error anywhere else.
				</p>
				<PropsTable props={modeProps} />
			</section>

			<SlotsSection slug="confirm" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Why the props are a union
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ConfirmProps
					</code>{' '}
					is not one object with optional extras.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The interesting part is the default.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					So the simple arm declares the other modes’ props as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						never
					</code>
					:
				</p>
				<CodeBlock
					code={`export type ConfirmSimpleProps = ConfirmBaseProps & {
  mode?: 'simple'
  acknowledgement?: never
  challengeLabel?: never
  challengePlaceholder?: never
  confirmationValue?: never
  otpPattern?: never
  onConfirm?: () => void
}`}
					filename="confirm.types.ts"
					language="ts"
				/>
				<p className="max-w-prose text-muted-foreground text-sm">
					A prop from another mode is now a type error on the line that passed
					it.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The five modes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Until the challenge is met, confirm stays focusable but aria-disabled,
					described by the reason, and ignores presses.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Focus opens inside the challenge field, and it sits in a form — so
					Enter submits from any of the three challenge modes.
				</p>
				<ComponentPreview title='mode="simple" — the default'>
					<SimpleDemo />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						typed
					</code>{' '}
					makes the user retype a name — for irreversible actions among
					look-alike rows.
				</p>
				<ComponentPreview title='mode="typed" — the text has to match exactly'>
					<TypedDemo />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						password
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">otp</code>{' '}
					collect a secret and hand it to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onConfirm
					</code>
					. It is never checked or stored — validate it and reject to refuse.
				</p>
				<ComponentPreview title='mode="password" — collected here, validated by you'>
					<PasswordDemo />
				</ComponentPreview>
				<ComponentPreview title='mode="otp" with otpPattern={[3, 3]}'>
					<OtpDemo />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						acknowledge
					</code>{' '}
					collects nothing — it makes the user state that they understood
					something before the button unlocks.
				</p>
				<ComponentPreview title='mode="acknowledge" — a statement to tick'>
					<AcknowledgeDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Blast radius</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						content
					</code>{' '}
					is a node slot rendered under the description, before the challenge.
				</p>
				<ComponentPreview title="A blast radius on a typed confirm">
					<BlastRadiusDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Refusing the answer
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A rejected{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onConfirm
					</code>{' '}
					keeps the dialog open and shows its message in a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="alert"
					</code>{' '}
					line above the buttons.
				</p>
				<ComponentPreview title="A rejection with a message">
					<RejectionDemo />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without an{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Error
					</code>{' '}
					message, it falls back to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						labels.confirm.error
					</code>
					.
				</p>
				<ComponentPreview title="A rejection with nothing to say">
					<SilentRejectionDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Closing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The dialog holds no open state, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClose
					</code>{' '}
					is the single place to set{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						open
					</code>{' '}
					back to false.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					One asymmetry is worth knowing:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onConfirm
					</code>{' '}
					is awaited <em>before</em> the close, which is what lets a rejection
					cancel it —{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onCancel
					</code>{' '}
					is not.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The first preview under{' '}
					<strong className="text-foreground">The five modes</strong> prints
					every callback the dialog fired, in order. Try all four ways out and
					watch what shows up.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Async handlers</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both handlers may return a promise; its button spins and is disabled
					until it settles. The other button stays live.
				</p>
				<ComponentPreview title="Slow confirm">
					<SlowConfirmDemo />
				</ComponentPreview>
				<ComponentPreview title="Slow cancel">
					<SlowCancelDemo />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Wording and style
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						confirmProps
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						cancelProps
					</code>{' '}
					reach the two buttons whole, minus{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>
					, which the dialog needs for itself.
				</p>
				<ComponentPreview title="Destructive confirm, ghost cancel">
					<StyledDemo />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every word comes from the{' '}
					<Link
						className="underline underline-offset-2"
						to="/libs/react-web/components/labels-provider"
					>
						confirm label group
					</Link>
					; the text props override one dialog, the provider overrides them all.
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

export const Route = createFileRoute('/libs/react-web/components/confirm')({
	component: Page,
})
