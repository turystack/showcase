import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-context/context-module')({
	component: Page,
})

const options = [
	{
		default: '"x-correlation-id"',
		description:
			'Header carrying an inbound correlation id, so a chain that started upstream keeps its identifier.',
		name: 'header',
		required: false,
		type: 'string',
	},
	{
		default: 'true',
		description:
			'Attaches correlationId, actorId and tenantId to every line logged through @turystack/nestjs-logger. No-op when the logger is not installed.',
		name: 'enrichLogs',
		required: false,
		type: 'boolean',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ContextModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Registers the request context for the whole application.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ContextModule } from '@turystack/nestjs-context'

ContextModule.register(
  options?: ContextModuleOptions | ((config: ConfigService) => ContextModuleOptions),
): DynamicModule`}
					filename="context.module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ContextModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import { ContextModule } from '@turystack/nestjs-context'

@Module({
  imports: [ContextModule.register()],
})
export class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { ContextModule } from '@turystack/nestjs-context'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({ CORRELATION_HEADER: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ContextModule.register((config) => ({
      header: config.get('CORRELATION_HEADER'),
    })),
  ],
})
export class AppModule {}`,
							label: 'From config',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The module is global. Logging, tracing, auditing and publishing all
					read the context, so requiring every module to import it would be
					noise.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Logs get the correlation id for free
				</h2>
				<p className="text-muted-foreground">
					With <code>enrichLogs</code> on, every line written through
					@turystack/nestjs-logger carries the operation's fields without any
					caller passing them.
				</p>
				<CodeBlock
					code={`logger.info('Order cancelled', { orderId: 'o1' })

// what the adapter receives:
{ correlationId: 'req-42', actorId: 'user-9', orderId: 'o1' }`}
					filename="enrichment"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					An explicit argument always wins a key collision — the caller is more
					specific than the ambient value. The dependency points one way: the
					logger knows nothing about this package, and this module pushes the
					reader into it, so the two never form a cycle.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Who opens the scope
				</h2>
				<CodeBlock
					code={`@turystack/nestjs-server       HTTP request — honours x-correlation-id, echoes it back
@turystack/nestjs-serverless   one scope per record, inheriting the publisher's id
@turystack/nestjs-scheduler    one scope per tick, labelled with the job name
@WithContext()                 anything else — CLI, custom entrypoint`}
					filename="entrypoints"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Each of those declares this package as an <em>optional</em> peer: an
					application without it works the same, only without correlation.
				</p>
			</div>
		</div>
	)
}
