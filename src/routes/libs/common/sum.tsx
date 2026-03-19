import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/common/sum')({
	component: Page,
})

const params = [
	{
		description: 'The first operand.',
		name: 'a',
		required: true,
		type: 'number',
	},
	{
		description: 'The second operand.',
		name: 'b',
		required: true,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">sum</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Returns the sum of two numbers.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="function sum(a: number, b: number): number"
					filename="sum.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { sum } from '@tury/common'

sum(2, 3)    // 5
sum(-1, 1)   // 0
sum(0.1, 0.2) // 0.30000000000000004`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parameters</h2>
				<PropsTable props={params} />
			</div>
		</div>
	)
}
