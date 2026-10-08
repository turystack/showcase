import { createFileRoute } from '@tanstack/react-router'
import { Alert, Button } from '@turystack/react-web'
import {
	CircleCheck,
	CircleX,
	FlaskConical,
	Info,
	TriangleAlert,
} from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/alert/alert.types.ts` and the
 * `defaultVariants` in `alert.tsx`. The four sub-components are typed as empty
 * objects — they take children and nothing else.
 */
const alertProps = [
	{
		default: '"default"',
		description: 'Tone of the message; recolours every part via context.',
		name: 'variant',
		type: '"default" | "info" | "success" | "warning" | "destructive"',
	},
	{
		default: '"card"',
		description: 'card: a bordered box; banner: a one-line shell strip.',
		name: 'layout',
		type: '"card" | "banner"',
	},
	{
		default: 'false',
		description: 'Adds a close button to the banner’s top-right corner.',
		name: 'closable',
		type: 'boolean',
	},
	{
		description: 'Fires after the close transition ends, not on the click.',
		name: 'onClose',
		type: '() => void',
	},
]

const alertParts = [
	{
		description: 'Leading icon, tinted by the variant, hidden from AT.',
		name: 'Alert.Icon',
		type: 'children',
	},
	{
		description: 'The headline of the banner.',
		name: 'Alert.Title',
		type: 'children',
	},
	{
		description: 'Body copy; nested anchors are underlined.',
		name: 'Alert.Description',
		type: 'children',
	},
	{
		description: 'A control in its own column beside the text.',
		name: 'Alert.Action',
		type: 'children',
	},
]

const usageCode = `import { Alert, Button } from '@turystack/react-web'
import { Info } from 'lucide-react'

// Title and description
<Alert>
  <Alert.Title>Booking confirmed</Alert.Title>
  <Alert.Description>We sent the voucher to your email.</Alert.Description>
</Alert>

// With a leading icon
<Alert>
  <Alert.Icon><Info /></Alert.Icon>
  <Alert.Title>Booking confirmed</Alert.Title>
  <Alert.Description>We sent the voucher to your email.</Alert.Description>
</Alert>

// Destructive tone
<Alert variant="destructive">
  <Alert.Icon><TriangleAlert /></Alert.Icon>
  <Alert.Title>Payment failed</Alert.Title>
  <Alert.Description>The card was declined.</Alert.Description>
</Alert>

// With an action in the corner
<Alert>
  <Alert.Title>Sync paused</Alert.Title>
  <Alert.Description>Nothing has been lost.</Alert.Description>
  <Alert.Action>
    <Button size="sm" variant="outline">Resume</Button>
  </Alert.Action>
</Alert>

// Other tones: info, success, warning
<Alert variant="warning">
  <Alert.Icon><TriangleAlert /></Alert.Icon>
  <Alert.Title>Card expires soon</Alert.Title>
</Alert>

// Banner across the top of the shell — role="status", not "alert"
<Alert layout="banner" variant="warning">
  <Alert.Icon><FlaskConical /></Alert.Icon>
  <Alert.Title>Sandbox</Alert.Title>
  <Alert.Description>You are viewing test data.</Alert.Description>
  <Alert.Action>
    <Button size="sm" variant="outline">Go live</Button>
  </Alert.Action>
</Alert>

// Dismissible — onClose fires after the 200ms fade, once it has unmounted
<Alert closable onClose={() => console.log('gone')}>
  <Alert.Title>You can close this one</Alert.Title>
</Alert>`

function Page() {
	const [closedAt, setClosedAt] = useState<string | null>(null)
	const [alertKey, setAlertKey] = useState(0)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Alert
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A message that stands out from the page — a card in the content, or a
					banner across the top of the app.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={alertProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parts</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every part is typed as an empty object in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						alert.types.ts
					</code>
					: they accept children and nothing else.
				</p>
				<PropsTable props={alertParts} />
			</section>

			<SlotsSection slug="alert" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every tone is a theme token:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						success
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						warning
					</code>{' '}
					use their own tokens,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						info
					</code>{' '}
					uses{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						primary
					</code>
					, and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						destructive
					</code>{' '}
					the destructive red.
				</p>
				<ComponentPreview title="All five tones">
					<div className="w-full max-w-md space-y-3">
						<Alert>
							<Alert.Icon>
								<CircleCheck />
							</Alert.Icon>
							<Alert.Title>Booking confirmed</Alert.Title>
							<Alert.Description>
								We sent the voucher to your email.
							</Alert.Description>
						</Alert>
						<Alert variant="info">
							<Alert.Icon>
								<Info />
							</Alert.Icon>
							<Alert.Title>Check-in opens tomorrow</Alert.Title>
							<Alert.Description>
								You can pick your seat from 08:00.
							</Alert.Description>
						</Alert>
						<Alert variant="success">
							<Alert.Icon>
								<CircleCheck />
							</Alert.Icon>
							<Alert.Title>Pagamento aprovado</Alert.Title>
							<Alert.Description>
								O recibo já está na sua caixa de entrada.
							</Alert.Description>
						</Alert>
						<Alert variant="warning">
							<Alert.Icon>
								<TriangleAlert />
							</Alert.Icon>
							<Alert.Title>Card expires soon</Alert.Title>
							<Alert.Description>
								Update it before 30/10 to keep the subscription running.
							</Alert.Description>
						</Alert>
						<Alert variant="destructive">
							<Alert.Icon>
								<TriangleAlert />
							</Alert.Icon>
							<Alert.Title>Payment failed</Alert.Title>
							<Alert.Description>
								The card was declined. Try another one.
							</Alert.Description>
						</Alert>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Composition</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The root reads which parts it contains.
				</p>
				<ComponentPreview title="Title only, title and description, icon added">
					<div className="w-full max-w-md space-y-3">
						<Alert>
							<Alert.Title>Saved</Alert.Title>
						</Alert>
						<Alert>
							<Alert.Title>Saved</Alert.Title>
							<Alert.Description>
								Your changes are stored on this device.
							</Alert.Description>
						</Alert>
						<Alert>
							<Alert.Icon>
								<Info />
							</Alert.Icon>
							<Alert.Title>Saved</Alert.Title>
							<Alert.Description>
								Your changes are stored on this device.
							</Alert.Description>
						</Alert>
					</div>
				</ComponentPreview>
				<ComponentPreview title="With an action">
					<div className="w-full max-w-md space-y-3">
						<Alert>
							<Alert.Icon>
								<Info />
							</Alert.Icon>
							<Alert.Title>Sync paused</Alert.Title>
							<Alert.Description>
								Nothing has been lost — pick it up whenever you like.
							</Alert.Description>
							<Alert.Action>
								<Button
									size="sm"
									variant="outline"
								>
									Resume
								</Button>
							</Alert.Action>
						</Alert>
						<Alert variant="destructive">
							<Alert.Icon>
								<TriangleAlert />
							</Alert.Icon>
							<Alert.Title>Upload failed</Alert.Title>
							<Alert.Description>Three files did not go up.</Alert.Description>
							<Alert.Action>
								<Button
									size="sm"
									variant="destructive"
								>
									Retry
								</Button>
							</Alert.Action>
						</Alert>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Banner layout</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						layout="banner"
					</code>{' '}
					is a one-line strip for the shell's banner slot, announced politely
					with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="status"
					</code>
					; the description truncates.
				</p>
				<ComponentPreview title="Sandbox notice with an action">
					<div className="w-full overflow-hidden rounded-lg border">
						<Alert
							layout="banner"
							variant="warning"
						>
							<Alert.Icon>
								<FlaskConical />
							</Alert.Icon>
							<Alert.Title>Sandbox</Alert.Title>
							<Alert.Description>
								You are viewing test data — nothing here reaches real customers.
							</Alert.Description>
							<Alert.Action>
								<Button
									size="sm"
									variant="outline"
								>
									Go live
								</Button>
							</Alert.Action>
						</Alert>
						<div className="p-6 text-muted-foreground text-sm">
							App content sits below the banner.
						</div>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Closable destructive banner">
					<div className="w-full overflow-hidden rounded-lg border">
						<Alert
							closable
							layout="banner"
							variant="destructive"
						>
							<Alert.Icon>
								<CircleX />
							</Alert.Icon>
							<Alert.Title>Manutenção programada</Alert.Title>
							<Alert.Description>
								Pagamentos ficam indisponíveis domingo, das 02:00 às 04:00.
							</Alert.Description>
						</Alert>
						<div className="p-6 text-muted-foreground text-sm">
							App content sits below the banner.
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Dismissing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The close button does not remove the banner straight away.
				</p>
				<ComponentPreview title="Closable">
					<div className="w-full max-w-md space-y-3">
						<Alert
							closable
							key={alertKey}
							onClose={() => setClosedAt(new Date().toLocaleTimeString())}
						>
							<Alert.Icon>
								<Info />
							</Alert.Icon>
							<Alert.Title>Close me</Alert.Title>
							<Alert.Description>
								Watch the fade before the callback runs.
							</Alert.Description>
						</Alert>
						<div className="flex items-center gap-3">
							<Button
								onClick={() => {
									setClosedAt(null)
									setAlertKey((key) => key + 1)
								}}
								size="sm"
								variant="outline"
							>
								Bring it back
							</Button>
							<span className="text-muted-foreground text-xs">
								{closedAt ? `onClose fired at ${closedAt}` : 'Still open'}
							</span>
						</div>
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

export const Route = createFileRoute('/libs/react-web/components/alert')({
	component: Page,
})
