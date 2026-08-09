import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-server/controller-decorator',
)({
	component: Page,
})

const controllerOptionsProps = [
	{
		description:
			'Route path for all endpoints in the controller. Inherited from NestJS ControllerOptions.',
		name: 'path',
		required: false,
		type: 'string | string[]',
	},
	{
		description: 'Swagger tag name for grouping endpoints.',
		name: 'tag',
		required: true,
		type: 'string',
	},
	{
		description:
			"Route prefix prepended to all routes (e.g. 'ops' → api/v1/ops/...). Core controllers omit it.",
		name: 'prefix',
		required: false,
		type: 'string',
	},
	{
		description:
			'Extra Zod schemas to register as Swagger models (key = model name).',
		name: 'schemas',
		required: false,
		type: 'Record<string, { schema: ZodSchema }>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Controller
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Wraps @Controller with a Swagger tag and optional Zod schema
					registration as OpenAPI models.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Controller } from '@turystack/nestjs-server'

@Controller(options: {
  path?: string | string[]
  tag: string
  prefix?: string
  schemas?: Record<string, { schema: ZodSchema }>
})`}
					filename="controller.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Controller } from '@turystack/nestjs-server'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

@Controller({
  path: 'users',
  tag: 'Users',
  schemas: { User: { schema: UserSchema } },
})
class UsersController {
  // ...
}`}
					filename="users.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ControllerOptions
				</h2>
				<PropsTable props={controllerOptionsProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it does</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Registers the controller route path prefix</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Applies @ApiTags with the provided tag name for Swagger grouping
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Registers Zod schemas as @ApiExtraModels for OpenAPI documentation
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
