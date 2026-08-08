import { createFileRoute } from '@tanstack/react-router'
import { Alert, Provider } from '@turystack/ui'
import { AlertCircle, Info, Terminal } from 'lucide-react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const alertProps = [
	{
		default: '"default"',
		description: 'The visual style variant of the alert.',
		name: 'variant',
		type: '"default" | "destructive"',
	},
	{
		default: 'false',
		description: 'When true, the alert can be closed.',
		name: 'closable',
		type: 'boolean',
	},
	{
		description: 'Handler called after the alert is dismissed.',
		name: 'onClose',
		type: '() => void',
	},
]

const usageCode = `import { Alert } from '@turystack/ui'
import { Info, AlertCircle, Terminal } from 'lucide-react'

// Default alert
<Alert>
  <Alert.Icon>
    <Info className="h-4 w-4" />
  </Alert.Icon>
  <Alert.Content>
    <Alert.Title>Heads up!</Alert.Title>
    <Alert.Description>
      You can add components to your app using the cli.
    </Alert.Description>
  </Alert.Content>
</Alert>

// Destructive alert
<Alert variant="destructive">
  <Alert.Icon>
    <AlertCircle className="h-4 w-4" />
  </Alert.Icon>
  <Alert.Content>
    <Alert.Title>Error</Alert.Title>
    <Alert.Description>
      Your session has expired. Please log in again.
    </Alert.Description>
  </Alert.Content>
</Alert>

// With action
<Alert>
  <Alert.Icon>
    <Terminal className="h-4 w-4" />
  </Alert.Icon>
  <Alert.Content>
    <Alert.Title>New update available</Alert.Title>
    <Alert.Description>
      A new version has been released.
    </Alert.Description>
    <Alert.Action>
      <button>Update</button>
    </Alert.Action>
  </Alert.Content>
</Alert>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Alert
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Displays a callout for user attention.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={alertProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>

					<ComponentPreview title="Default variant">
						<div className="w-full max-w-lg">
							<Alert>
								<Alert.Icon>
									<Info className="h-4 w-4" />
								</Alert.Icon>
								<Alert.Content>
									<Alert.Title>Heads up!</Alert.Title>
									<Alert.Description>
										You can add components to your app using the cli.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>

					<ComponentPreview title="Destructive variant">
						<div className="w-full max-w-lg">
							<Alert variant="destructive">
								<Alert.Icon>
									<AlertCircle className="h-4 w-4" />
								</Alert.Icon>
								<Alert.Content>
									<Alert.Title>Error</Alert.Title>
									<Alert.Description>
										Your session has expired. Please log in again.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With action</h2>

					<ComponentPreview title="Alert with action button">
						<div className="w-full max-w-lg">
							<Alert>
								<Alert.Icon>
									<Terminal className="h-4 w-4" />
								</Alert.Icon>
								<Alert.Content>
									<Alert.Title>New update available</Alert.Title>
									<Alert.Description>
										A new version has been released with bug fixes and
										improvements.
									</Alert.Description>
									<Alert.Action>
										<button
											className="t:font-medium t:text-sm t:underline t:underline-offset-4"
											type="button"
										>
											Update now
										</button>
									</Alert.Action>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Without icon</h2>

					<ComponentPreview title="Alert without icon">
						<div className="w-full max-w-lg">
							<Alert>
								<Alert.Content>
									<Alert.Title>Note</Alert.Title>
									<Alert.Description>
										You can use alerts without an icon for simpler messages.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Closable</h2>

					<ComponentPreview title="Closable alert">
						<div className="w-full max-w-lg">
							<Alert
								closable
								onClose={() => console.log('Alert closed')}
							>
								<Alert.Icon>
									<Info className="h-4 w-4" />
								</Alert.Icon>

								<Alert.Content>
									<Alert.Title>Dismissible alert</Alert.Title>
									<Alert.Description>
										This alert can be closed using the button in the top-right
										corner.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>

					<ComponentPreview title="Closable destructive alert">
						<div className="w-full max-w-lg">
							<Alert
								closable
								onClose={() => console.log('Destructive alert closed')}
								variant="destructive"
							>
								<Alert.Icon>
									<AlertCircle className="h-4 w-4" />
								</Alert.Icon>

								<Alert.Content>
									<Alert.Title>Error</Alert.Title>
									<Alert.Description>
										Your session has expired. Please log in again.
									</Alert.Description>
								</Alert.Content>
							</Alert>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/alert')({
	component: Page,
})
