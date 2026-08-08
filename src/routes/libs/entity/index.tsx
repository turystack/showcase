import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/entity/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/entity
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Class decorator that registers entities with superjson for type-safe
					serialization across boundaries.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/entity superjson',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/entity superjson',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/entity superjson',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/entity superjson',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>@Entity decorator with stable SuperJSON identifiers</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Preserves class instances, Dates, and non-JSON-native types
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Works seamlessly with messaging systems like SNS/SQS</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Entity } from '@turystack/entity'

@Entity('orders.order')
class Order {
  id: string
  createdAt: Date
}

@Entity('orders.order-item')
class OrderItem {
  productId: string
  quantity: number
  price: number
}`}
					filename="example.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
