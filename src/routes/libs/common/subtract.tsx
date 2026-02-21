import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/common/subtract')({
	component: Page,
})

const params = [
	{
		name: 'a',
		type: 'number',
		description: 'The value to subtract from.',
		required: true,
	},
	{
		name: 'b',
		type: 'number',
		description: 'The value to subtract.',
		required: true,
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					subtract
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Returns the difference between two numbers.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="function subtract(a: number, b: number): number"
					filename="subtract.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { subtract } from '@tury/common'

subtract(10, 4)  // 6
subtract(0, 5)   // -5
subtract(3, 3)   // 0`}
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
