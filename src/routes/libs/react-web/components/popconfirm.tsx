import { createFileRoute } from '@tanstack/react-router'
import { Badge, Button, MoneyText, Popconfirm } from '@turystack/react-web'
import { RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const popconfirmProps = [
	{
		description: 'The question.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'One line of why, when the title is not enough.',
		name: 'description',
		type: 'string',
	},
	{
		default: '"simple"',
		description: 'How the decision is gated; the same five modes as Confirm.',
		name: 'mode',
		type: '"simple" | "typed" | "password" | "otp" | "acknowledge"',
	},
	{
		description: 'mode="typed", required: the exact text to retype.',
		name: 'confirmationValue',
		type: 'string',
	},
	{
		description: 'mode="acknowledge", required: the statement to tick.',
		name: 'acknowledgement',
		type: 'string',
	},
	{
		default: '[6]',
		description: 'mode="otp": digit count per segment, e.g. [3, 3].',
		name: 'otpPattern',
		type: 'number[]',
	},
	{
		description: 'Overrides the label above the challenge field.',
		name: 'challengeLabel',
		type: 'string',
	},
	{
		description: 'Field placeholder; typed defaults to the target text.',
		name: 'challengePlaceholder',
		type: 'string',
	},
	{
		description: 'Node under the description: what the action affects.',
		name: 'content',
		type: 'React.ReactNode',
	},
	{
		description: 'The action; gets the collected value. Throw to refuse.',
		name: 'onConfirm',
		type: '(value: string) => void | Promise<void>',
	},
	{
		description: 'Fires when the reader backs out.',
		name: 'onCancel',
		type: '() => void',
	},
	{
		description: 'Overrides the label group’s wording.',
		name: 'confirmText',
		type: 'string',
	},
	{
		description: 'Overrides the label group’s wording.',
		name: 'cancelText',
		type: 'string',
	},
	{
		description: 'Style of the confirm button.',
		name: 'confirmProps',
		type: 'Omit<ButtonProps, "loading" | "onClick">',
	},
	{
		description: 'Style of the cancel button.',
		name: 'cancelProps',
		type: 'Omit<ButtonProps, "loading" | "onClick">',
	},
	{
		description: 'Controlled visibility.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Fires when it opens or closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		description: 'Preferred placement against the trigger.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		description: 'Alignment against the trigger.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
]

const usageCode = `import { Popconfirm } from '@turystack/react-web'

// The plain question
<Popconfirm
  confirmProps={{ variant: 'destructive' }}
  onConfirm={() => remove.mutateAsync({ id })}
  title="Delete this booking?"
>
  <Button ariaLabel="Delete TRY-1041" size="icon-sm" variant="ghost"><Trash2 /></Button>
</Popconfirm>

// Retype the name before it goes
<Popconfirm
  confirmationValue="TRY-1041"
  mode="typed"
  onConfirm={(typed) => remove.mutateAsync({ code: typed })}
  title="Delete this booking?"
>
  <Button size="sm" variant="ghost">Delete</Button>
</Popconfirm>

// A password the consumer validates — this component never checks a secret
<Popconfirm mode="password" onConfirm={(password) => payout({ password })} title="Release the payout?">
  <Button size="sm">Release</Button>
</Popconfirm>

// A code, in the segments you choose
<Popconfirm mode="otp" otpPattern={[3, 3]} onConfirm={(code) => verify(code)} title="Confirm with your code">
  <Button size="sm">Confirm</Button>
</Popconfirm>

// A statement to tick
<Popconfirm
  acknowledgement="I understand the guest will be charged"
  mode="acknowledge"
  onConfirm={charge}
  title="Charge the card?"
>
  <Button size="sm">Charge</Button>
</Popconfirm>`

type Row = {
	code: string
	cents: number
	/** The one the API refuses, so the failing path is reachable on purpose. */
	locked?: boolean
}

const INITIAL_ROWS: Row[] = [
	{
		cents: 128_000,
		code: 'TRY-1041',
	},
	{
		cents: 96_000,
		code: 'TRY-1042',
		locked: true,
	},
	{
		cents: 54_000,
		code: 'TRY-1043',
	},
]

const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms)
	})

function Page() {
	const [rows, setRows] = useState(INITIAL_ROWS)

	/**
	 * A real round trip: the button spins for as long as it takes, and a refusal
	 * throws rather than returning — that is what keeps the popover open with the
	 * reason instead of closing on a delete that never happened.
	 */
	async function remove(row: Row) {
		await wait(1200)

		if (row.locked) {
			throw new Error(`${row.code} is already invoiced`)
		}

		setRows((current) => current.filter((item) => item.code !== row.code))
	}

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Overlays
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Popconfirm
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The small confirmation that belongs to one control.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={popconfirmProps} />
			</section>

			<SlotsSection slug="popconfirm" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Anchored to what it confirms
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The second one refuses on purpose: the popover stays open with the
					reason.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The Button you pass is the trigger (via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>
					), carrying{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-expanded
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-haspopup
					</code>
					; an icon-only one needs its{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<ComponentPreview title="Two rows, one question each">
					<div className="flex w-full max-w-sm flex-col gap-2 text-sm">
						<div className="flex items-center justify-between gap-4 rounded-md border border-border px-3 py-2">
							<span>TRY-1041</span>
							<Popconfirm
								confirmProps={{
									variant: 'destructive',
								}}
								confirmText="Delete"
								description="This cannot be undone."
								title="Delete this booking?"
							>
								<Button
									size="sm"
									variant="ghost"
								>
									Delete
								</Button>
							</Popconfirm>
						</div>
						<div className="flex items-center justify-between gap-4 rounded-md border border-border px-3 py-2">
							<span>TRY-1042</span>
							<Popconfirm
								onConfirm={() => Promise.reject(new Error('Already invoiced'))}
								title="Delete this booking?"
							>
								<Button
									size="sm"
									variant="ghost"
								>
									Delete
								</Button>
							</Popconfirm>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A confirm that waits
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Return a promise from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onConfirm
					</code>{' '}
					and the button spins until it settles; the popover stays open
					meanwhile.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Throw to refuse; it stays open with the message.{' '}
					<strong>TRY-1042</strong> refuses on purpose.
				</p>
				<ComponentPreview title="Delete for real — one of them fails">
					<div className="flex w-full max-w-sm flex-col gap-2 text-sm">
						{rows.map((row) => (
							<div
								className="flex items-center justify-between gap-4 rounded-md border border-border px-3 py-2"
								key={row.code}
							>
								<span className="flex items-center gap-2">
									{row.code}
									{row.locked ? (
										<Badge variant="warning">invoiced</Badge>
									) : null}
								</span>
								<span className="flex items-center gap-3">
									<MoneyText
										muted
										size="sm"
										value={row.cents}
									/>
									<Popconfirm
										confirmProps={{
											variant: 'destructive',
										}}
										confirmText="Delete"
										description="This cannot be undone."
										onConfirm={() => remove(row)}
										title={`Delete ${row.code}?`}
									>
										<Button
											ariaLabel={`Delete ${row.code}`}
											size="icon-sm"
											variant="ghost"
										>
											<Trash2 />
										</Button>
									</Popconfirm>
								</span>
							</div>
						))}
						{rows.length === 0 ? (
							<p className="py-4 text-center text-muted-foreground">
								Every booking is gone.
							</p>
						) : null}
						<Button
							className="self-end"
							leftSection={<RotateCcw className="size-4" />}
							onClick={() => setRows(INITIAL_ROWS)}
							size="sm"
							variant="outline"
						>
							Reset
						</Button>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					A challenge and a promise compose: the button is blocked until the
					challenge is satisfied, and only then does it start spinning.
				</p>
				<ComponentPreview title="Typed, then a round trip">
					<Popconfirm
						confirmationValue="TRY-1041"
						confirmProps={{
							variant: 'destructive',
						}}
						confirmText="Delete"
						description="Retype the code, then we ask the server."
						mode="typed"
						onConfirm={async (typed) => {
							await wait(1400)
							throw new Error(`${typed} is already invoiced`)
						}}
						title="Delete TRY-1041?"
					>
						<Button
							leftSection={<Trash2 className="size-4" />}
							variant="outline"
						>
							Typed + async
						</Button>
					</Popconfirm>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The same challenges Confirm has
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode
					</code>{' '}
					adds Confirm's challenges. Until met, the button is aria-disabled and
					says why; input is dropped on close.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Use Confirm when the decision deserves the whole screen; this one is
					anchored.
				</p>
				<ComponentPreview title="typed, password, otp and acknowledge">
					<div className="flex flex-wrap items-center justify-center gap-2">
						<Popconfirm
							confirmationValue="TRY-1041"
							confirmProps={{
								variant: 'destructive',
							}}
							confirmText="Delete"
							description="Retype the code to confirm."
							mode="typed"
							title="Delete TRY-1041?"
						>
							<Button
								leftSection={<Trash2 className="size-4" />}
								size="sm"
								variant="outline"
							>
								Typed
							</Button>
						</Popconfirm>
						<Popconfirm
							description="Payouts need your password."
							mode="password"
							title="Release the payout?"
						>
							<Button
								size="sm"
								variant="outline"
							>
								Password
							</Button>
						</Popconfirm>
						<Popconfirm
							description="Enter the code we sent you."
							mode="otp"
							otpPattern={[
								3,
								3,
							]}
							title="Confirm with your code"
						>
							<Button
								size="sm"
								variant="outline"
							>
								OTP
							</Button>
						</Popconfirm>
						<Popconfirm
							acknowledgement="I understand the guest will be charged"
							content={
								<MoneyText
									size="sm"
									value={128_000}
									weight="medium"
								/>
							}
							description="The card on file is charged immediately."
							mode="acknowledge"
							title="Charge the card?"
						>
							<Button
								size="sm"
								variant="outline"
							>
								Acknowledge
							</Button>
						</Popconfirm>
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

export const Route = createFileRoute('/libs/react-web/components/popconfirm')({
	component: Page,
})
