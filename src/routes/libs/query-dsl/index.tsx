import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/query-dsl/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/query-dsl
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Zod-based schemas for query-string parameters: pagination, sort,
					ranges, date ranges, comma-separated lists, booleans, and free-text
					filters. Mandatory in every turystack backend — in a monorepo it lives
					in the domains lib, typing the repository contracts.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/query-dsl zod',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/query-dsl zod',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/query-dsl zod',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/query-dsl zod',
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
							Numeric range parsing with comparison operators (e.g.{' '}
							<code>{'>=10;<=50'}</code>)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>ISO date range parsing with the same operator syntax</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Comma-separated list parsing with per-value validation and
							deduplication
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Boolean coercion from <code>"true"</code>/<code>"false"</code>{' '}
							strings
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Free-text filter schema with OpenAPI metadata generation
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Bidirectional helpers to convert between objects and query strings
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import {
  RangeSchema,
  DateRangeSchema,
  ListSchema,
  BooleanSchema,
  FilterSchema,
  rangeToQuery,
  queryToRange,
} from '@turystack/query-dsl'

import z from 'zod'

const range = RangeSchema.parse('>=10;<=50')

const dateRange = DateRangeSchema.parse('>=2024-01-01;<=2024-12-31')

const StatusEnum = z.enum(['active', 'inactive'])
const list = ListSchema(StatusEnum, ['active', 'inactive']).parse('active,inactive')

const bool = BooleanSchema.parse('true')

const filter = FilterSchema(['name', 'email'], { example: 'john' })`}
					filename="example.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
