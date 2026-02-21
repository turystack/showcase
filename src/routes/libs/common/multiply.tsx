import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/common/multiply')({
	component: Page,
})

const params = [
	{
		name: 'a',
		type: 'number',
		description: 'The first factor.',
		required: true,
	},
	{
		name: 'b',
		type: 'number',
		description: 'The second factor.',
		required: true,
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					multiply
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Returns the product of two numbers.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="function multiply(a: number, b: number): number"
					filename="multiply.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { multiply } from '@tury/common'

multiply(3, 7)   // 21
multiply(-2, 5)  // -10
multiply(0, 99)  // 0`}
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
