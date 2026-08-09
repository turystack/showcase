import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-cache/cache-service')({
	component: Page,
})

const cacheOptions = [
	{
		description:
			"Set mode. 'NX' sets only if key does not exist, 'XX' sets only if key exists.",
		name: 'mode',
		required: false,
		type: "'NX' | 'XX'",
	},
	{
		description: 'Time-to-live in seconds. Defaults to 3600 (1 hour).',
		name: 'ttl',
		required: false,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					CacheService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Injectable service that exposes all cache operations with automatic
					superjson serialization.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<CodeBlock
					code={`keys(pattern: string): Promise<string[]>

get<T>(key: string): Promise<T | null>

set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>

exists(key: string): Promise<boolean>

incr(key: string, options?: { ttl?: number; expiry?: 'always' | 'on-create' }): Promise<number>

decr(key: string): Promise<number>

del(keys: string[]): Promise<number>`}
					filename="cache-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { CacheService } from '@turystack/nestjs-cache'

@Injectable()
export class UserService {
  constructor(private readonly cache: CacheService) {}

  async findById(id: string) {
    const cached = await this.cache.get<User>(\`user:\${id}\`)
    if (cached) return cached

    const user = await this.repository.findById(id)
    await this.cache.set(\`user:\${id}\`, user, { ttl: 60 })
    return user
  }
}`}
					filename="user.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">CacheOptions</h2>
				<PropsTable props={cacheOptions} />
			</div>
		</div>
	)
}
