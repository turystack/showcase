import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/openapi-sdk/naming')({
	component: Page,
})

const rules = [
	{
		description: 'The tag, camelCased: Coupon codes → couponCodes',
		name: 'namespace',
		type: 'first tag',
	},
	{
		description: 'The operationId, camelCased: redeem-code → redeemCode',
		name: 'method',
		type: 'operationId',
	},
	{
		description: 'NestJS prefix dropped: CouponController_create → create',
		name: 'method',
		type: '<Name>Controller_x',
	},
	{
		description: 'Method + path: GET /coupons/{id} → getCouponsById',
		name: 'method',
		type: 'no operationId',
	},
	{
		description: 'Placed on the root: sdk.health()',
		name: 'namespace',
		type: 'no tag',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Naming
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Every operation becomes <code>sdk.namespace.method</code>, derived
					from the document alone.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Rules</h2>
				<PropsTable props={rules} />
				<p className="text-muted-foreground">
					A shared path prefix like <code>/api/v1</code> is left out of derived
					names. Only the first tag counts.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Overrides</h2>
				<CodeBlock
					code={`defineSdk({
  name: 'acme',
  input: './openapi.json',
  output: './src/~sdk',
  naming: {
    namespace: (tag, fallback) => fallback.replace(/Api$/, ''),
    method: (operation, fallback) => fallback.replace(/^fetch/, 'get'),
  },
})`}
					filename="openapi-sdk.config.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Each override gets the default name, so it adjusts instead of starting
					over.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Collisions</h2>
				<CodeBlock
					code={`✗ The OpenAPI document cannot become an SDK:
  - GET /a and POST /a both become "coupon.list"; rename one with naming.method or a distinct operationId
  - POST /auth/2fa: "2fa" is not a valid method name; rename it with naming.method`}
					filename="terminal"
					language="bash"
				/>
				<p className="text-muted-foreground">
					Two operations on one name fail the run, listing all of them. Equal
					operationIds under different tags are fine.
				</p>
			</div>
		</div>
	)
}
