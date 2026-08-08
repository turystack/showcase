import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-cache/cache-get')({
	component: Page,
})

const params = [
	{
		description:
			'A static string or a function that receives the method arguments array and returns the cache key.',
		name: 'key',
		required: true,
		type: 'CacheKeyResolver',
	},
	{
		description: 'Optional cache options (ttl in seconds, mode).',
		name: 'options',
		required: false,
		type: 'CacheOptions',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Cache.Get
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Cache-aside (read-through) decorator: serves the cached value or runs
					the method and caches the result.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="Cache.Get(key: string | ((args: unknown[]) => string | Promise<string>), options?: CacheOptions): MethodDecorator"
					filename="cache.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Cache } from '@turystack/nestjs-cache'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  @Cache.Get((args) => \`user:\${args[0]}\`, { ttl: 60 })
  async findById(id: string) {
    return this.repository.findById(id)
  }

  @Cache.Get('users:all', { ttl: 300 })
  async findAll() {
    return this.repository.findAll()
  }
}`}
					filename="user.service.ts"
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
