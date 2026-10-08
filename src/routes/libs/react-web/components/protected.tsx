import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	Protected,
	ProtectedProvider,
	Switch,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const protectedProps = [
	{
		description: 'Permission ids to hold; none means enabled.',
		name: 'permissionIds',
		type: 'PermissionId[]',
	},
	{
		default: '"all"',
		description: 'Whether every id is required, or any one of them is enough.',
		name: 'mode',
		type: '"all" | "any"',
	},
	{
		description: 'A node to guard, or a renderer given state and reason.',
		name: 'children',
		required: true,
		type: 'React.ReactNode | ((state: ProtectedState) => React.ReactNode)',
	},
	{
		default: 'null',
		description: 'Replacement for a refused node (node form only).',
		name: 'fallback',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Protected, useProtected } from '@turystack/react-web'

// A node: rendered when the permission is held, replaced when it is not
<Protected permissionIds={['user:delete']}>
  <Button variant="destructive">Delete</Button>
</Protected>

// A renderer: always rendered; reason is set only when refused,
// loading while the provider is still fetching permissions
<Protected permissionIds={['booking:refund']}>
  {({ loading, reason }) => (
    <Button disabledReason={reason} loading={loading}>Refund</Button>
  )}
</Protected>

// Any one of several
<Protected mode="any" permissionIds={['user:update', 'user:manage']}>
  <EditForm />
</Protected>

// Outside JSX — a column that should not be built, a menu item filtered out
const { enabled, reason } = useProtected(['user:delete'])`

function Page() {
	const [allowed, setAllowed] = useState(false)
	const permissions = allowed
		? [
				'booking:cancel',
			]
		: []

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Guard
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Protected
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Asks whether a permission is held, and hides or disables accordingly.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={protectedProps} />
			</section>

			<SlotsSection slug="protected" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Hide, or disable</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both are right, for different screens.
				</p>
				<ComponentPreview title="Toggle the permission and watch both">
					<div className="flex w-full max-w-md flex-col gap-4">
						<Switch
							checked={allowed}
							label="Holds booking:cancel"
							onCheckedChange={setAllowed}
						/>
						<ProtectedProvider permissions={permissions}>
							<div className="flex flex-col gap-3">
								<div className="flex items-center justify-between gap-4">
									<span className="text-muted-foreground text-xs">
										node child — hidden
									</span>
									<Protected
										fallback={
											<span className="text-muted-foreground text-xs">
												(nothing)
											</span>
										}
										permissionIds={[
											'booking:cancel',
										]}
									>
										<Button variant="destructive">Cancel booking</Button>
									</Protected>
								</div>
								<div className="flex items-center justify-between gap-4">
									<span className="text-muted-foreground text-xs">
										renderer — with reason
									</span>
									<Protected
										permissionIds={[
											'booking:cancel',
										]}
									>
										{({ loading, reason }) => (
											<Button
												disabledReason={reason}
												loading={loading}
												variant="destructive"
											>
												Cancel booking
											</Button>
										)}
									</Protected>
								</div>
							</div>
						</ProtectedProvider>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A refused renderer also gets{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						reason
					</code>
					; pass it to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					and the control says why.
				</p>
				<ComponentPreview title="Refund refused, reschedule allowed">
					<ProtectedProvider
						permissions={[
							'booking:update',
						]}
					>
						<div className="flex flex-wrap items-center justify-center gap-3">
							<Protected
								permissionIds={[
									'booking:update',
								]}
							>
								{({ reason }) => (
									<Button
										disabledReason={reason}
										variant="outline"
									>
										Remarcar reserva
									</Button>
								)}
							</Protected>
							<Protected
								permissionIds={[
									'booking:refund',
								]}
							>
								{({ reason }) => (
									<Button
										disabledReason={reason}
										variant="destructive"
									>
										Reembolsar
									</Button>
								)}
							</Protected>
						</div>
					</ProtectedProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">all and any</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every id is required by default;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">any</code>{' '}
					needs just one.
				</p>
				<ComponentPreview title="One held id, two questions">
					<ProtectedProvider
						permissions={[
							'user:read',
						]}
					>
						<div className="flex w-full max-w-md flex-col gap-2 text-sm">
							<Protected
								fallback={
									<span className="text-muted-foreground">
										all — refused, because user:delete is missing
									</span>
								}
								mode="all"
								permissionIds={[
									'user:read',
									'user:delete',
								]}
							>
								<span>all — allowed</span>
							</Protected>
							<Protected
								fallback={
									<span className="text-muted-foreground">any — refused</span>
								}
								mode="any"
								permissionIds={[
									'user:read',
									'user:delete',
								]}
							>
								<span>any — allowed, because user:read is held</span>
							</Protected>
						</div>
					</ProtectedProvider>
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

export const Route = createFileRoute('/libs/react-web/components/protected')({
	component: Page,
})
