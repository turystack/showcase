import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const cardProps = [
	{
		description: 'Handler called when the card is clicked. Makes the card appear clickable.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLDivElement>',
	},
]

const headerProps = [
	{
		default: 'false',
		description: 'When true, adds a bottom border to the header.',
		name: 'bordered',
		type: 'boolean',
	},
]

const footerProps = [
	{
		default: 'false',
		description: 'When true, adds a top border to the footer.',
		name: 'bordered',
		type: 'boolean',
	},
]

const usageCode = `import { Card } from '@turystack/ui'

// Basic card
<Card>
  <Card.Header>
    <Card.Title>Card title</Card.Title>
    <Card.Description>A brief description of this card.</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Main content goes here.</p>
  </Card.Content>
  <Card.Footer bordered>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>

// Clickable card
<Card onClick={() => navigate('/detail')}>
  <Card.Content>
    <p>Click me to navigate.</p>
  </Card.Content>
</Card>

// Card with separator
<Card>
  <Card.Content>Top section</Card.Content>
  <Card.Separator />
  <Card.Content>Bottom section</Card.Content>
</Card>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Card
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A container component for grouping related content and actions. Composed of Header, Content, Footer, and Separator sections.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Card Props</h2>
					<PropsTable props={cardProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Card.Header Props
					</h2>
					<PropsTable props={headerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Card.Footer Props
					</h2>
					<PropsTable props={footerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Full card</h2>
					<ComponentPreview title="Card with header, content, and footer">
						<div className="w-full max-w-sm">
							<Card>
								<Card.Header bordered>
									<Card.Title>Invoice #1042</Card.Title>
									<Card.Description>Due on March 15, 2025</Card.Description>
								</Card.Header>
								<Card.Content>
									<p className="text-sm">
										This invoice is for services rendered in February 2025.
										Please review and process payment at your earliest
										convenience.
									</p>
								</Card.Content>
								<Card.Footer bordered>
									<Button
										size="sm"
										variant="outline"
									>
										Decline
									</Button>
									<Button size="sm">Pay now</Button>
								</Card.Footer>
							</Card>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Simple card</h2>
					<ComponentPreview title="Card with content only">
						<div className="w-full max-w-sm">
							<Card>
								<Card.Content>
									<p className="text-sm">A simple card with only content.</p>
								</Card.Content>
							</Card>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Clickable card</h2>
					<ComponentPreview title="Card with onClick handler">
						<div className="w-full max-w-sm">
							<Card onClick={() => alert('Card clicked!')}>
								<Card.Content>
									<p className="font-medium text-sm">Click me</p>
									<p className="mt-1 text-muted-foreground text-xs">
										This card has an onClick handler and shows a hover state.
									</p>
								</Card.Content>
							</Card>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With separator
					</h2>
					<ComponentPreview title="Card with internal separator">
						<div className="w-full max-w-sm">
							<Card>
								<Card.Content>
									<p className="font-medium text-sm">Top section</p>
								</Card.Content>
								<Card.Separator />
								<Card.Content>
									<p className="text-muted-foreground text-sm">Bottom section</p>
								</Card.Content>
							</Card>
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

export const Route = createFileRoute('/libs/ui/card')({
	component: Page,
})
