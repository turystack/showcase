import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-context/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-context
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Request-scoped context propagated across use-cases, events and
					handlers without threading it through method signatures.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-context',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-context',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-context',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-context',
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
						<span>
							Correlation id generated at the entrypoint and carried to every
							layer
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Authenticated actor and tenant attached once, read anywhere
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							AsyncLocalStorage under the hood — survives await, isolates
							concurrent operations
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@WithContext opens a scope for queue handlers, scheduled ticks and
							CLI commands
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it is for</h2>
				<p className="text-muted-foreground">
					One operation crosses many layers, and every one of them wants the
					same few facts: which request am I part of, who is acting, which
					tenant. Passing them down as parameters pollutes every signature
					between the entrypoint and the code that actually needs them.
				</p>
				<CodeBlock
					code={`HTTP Request → Use Case → Event → Handler → External API
     └──────────── one correlation id ────────────┘`}
					filename="propagation"
					language="bash"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { ContextModule } from '@turystack/nestjs-context'

@Module({
  imports: [ContextModule.register()],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<CodeBlock
					code={`import { ContextService } from '@turystack/nestjs-context'

@Injectable()
export class CancelOrderUseCase {
  constructor(private readonly context: ContextService) {}

  async execute(input: CancelOrderInput) {
    const { correlationId, actor } = this.context.require()
  }
}`}
					filename="cancel-order.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
