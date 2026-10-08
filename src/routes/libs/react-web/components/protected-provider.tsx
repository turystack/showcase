import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	Protected,
	ProtectedProvider,
	SegmentedControl,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const protectedProviderProps = [
	{
		description: 'Ids the signed-in user holds, as `subject:action`.',
		name: 'permissions',
		required: true,
		type: 'PermissionId[]',
	},
	{
		default: 'false',
		description: 'Permissions not known yet; nothing reads as denied.',
		name: 'loading',
		type: 'boolean',
	},
]

const registryCode = `import type { Permission } from '@/sdk'

// Your generated client already publishes the union. Register it once.
declare module '@turystack/react-web' {
  interface TuryPermissionRegistry {
    permission: Permission
  }
}

// From here on, PermissionId is that union: 'user:create' | 'user:read' | …
// A typo is a compile error instead of a button that never appears.
// Without the augmentation, PermissionId is plain string and nothing breaks.`

const usageCode = `import { ProtectedProvider } from '@turystack/react-web'

function App() {
  const { data: profile } = useProfile()

  return (
    <ProtectedProvider permissions={profile?.permissions ?? []}>
      <Routes />
    </ProtectedProvider>
  )
}`

const ROLES = [
	{
		id: 'viewer',
		name: 'Viewer',
		permissions: [
			'booking:read',
			'user:read',
		],
	},
	{
		id: 'agent',
		name: 'Agent',
		permissions: [
			'booking:read',
			'booking:cancel',
			'user:read',
		],
	},
	{
		id: 'admin',
		name: 'Admin',
		permissions: [
			'user:manage',
			'booking:manage',
		],
	},
]

function Page() {
	const [role, setRole] = useState('viewer')
	const active = ROLES.find((entry) => entry.id === role) ?? ROLES[0]

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					ProtectedProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The permissions the signed-in user holds, expanded by the same rules
					the API applies.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={protectedProviderProps} />
			</section>

			<SlotsSection slug="protected-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Typing the ids, once
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						declare module
					</code>{' '}
					types{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						PermissionId
					</code>{' '}
					from the union your generated client publishes.
				</p>
				<CodeBlock
					code={registryCode}
					filename="permissions.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Manage grants expand
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Change the role:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						user:manage
					</code>{' '}
					also answers for{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						user:delete
					</code>
					, as the API does.
				</p>
				<ComponentPreview title="Three roles, one screen">
					<div className="flex w-full max-w-md flex-col gap-4">
						<SegmentedControl
							ariaLabel="Role"
							block
							onChange={setRole}
							optionLabel="name"
							options={ROLES}
							optionValue="id"
							value={role}
						/>
						<ProtectedProvider permissions={active.permissions}>
							<div className="flex flex-col gap-2 text-sm">
								<Protected
									permissionIds={[
										'booking:read',
									]}
								>
									<span>Sees the booking list</span>
								</Protected>
								<Protected
									fallback={
										<span className="text-muted-foreground">
											Cannot cancel bookings
										</span>
									}
									permissionIds={[
										'booking:cancel',
									]}
								>
									<span>Can cancel a booking</span>
								</Protected>
								<Protected
									permissionIds={[
										'user:delete',
									]}
								>
									{({ enabled }) => (
										<Button
											block
											disabled={!enabled}
											variant="destructive"
										>
											Delete user
										</Button>
									)}
								</Protected>
							</div>
						</ProtectedProvider>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What it does not do
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It does not authorise anything.
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
	'/libs/react-web/components/protected-provider',
)({
	component: Page,
})
