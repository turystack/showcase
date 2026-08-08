import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-cache/cache-del')({
	component: Page,
})

const params = [
	{
		description:
			'A static string, array of strings, or a function that receives the method arguments array and returns the cache key(s) to delete.',
		name: 'key',
		required: true,
		type: 'CacheDelKeyResolver',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Cache.Del
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that deletes the resolved cache key(s) after the
					method runs. Deletion errors are logged, not propagated.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="Cache.Del(key: string | string[] | ((args: unknown[]) => string | string[] | Promise<string | string[]>)): MethodDecorator"
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

  @Cache.Del((args) => \`user:\${args[0]}\`)
  async remove(id: string) {
    return this.repository.delete(id)
  }

  @Cache.Del((args) => [\`user:\${args[0]}\`, 'users:all'])
  async update(id: string, data: UpdateUserDto) {
    return this.repository.update(id, data)
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
