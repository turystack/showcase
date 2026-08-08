import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-database
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Define the schema once, get one typed repository per table. PostgreSQL
					(Drizzle) built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<p className="text-muted-foreground">
					Install the library along with its required peer dependencies:
				</p>
				<CodeBlock
					tabs={[
						{
							code: 'pnpm add @turystack/nestjs-database drizzle-orm pg',
							label: 'pnpm',
						},
						{
							code: 'npm install @turystack/nestjs-database drizzle-orm pg',
							label: 'npm',
						},
						{
							code: 'yarn add @turystack/nestjs-database drizzle-orm pg',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-database drizzle-orm pg',
							label: 'bun',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					For migrations and Drizzle Studio, also add the dev tooling:
				</p>
				<CodeBlock
					tabs={[
						{
							code: 'pnpm add -D drizzle-kit @types/pg',
							label: 'pnpm',
						},
						{
							code: 'npm install -D drizzle-kit @types/pg',
							label: 'npm',
						},
						{
							code: 'yarn add -D drizzle-kit @types/pg',
							label: 'yarn',
						},
						{
							code: 'bun add -D drizzle-kit @types/pg',
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
							Drizzle ORM with PostgreSQL — type-safe queries and mutations
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Schema builder API — define tables without importing drizzle
							directly
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Auto-generated repositories — findMany, findFirst, create, update,
							delete, upsert, count, exists
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Transactional decorator — method-level transactions via
							AsyncLocalStorage
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Relations support — define Drizzle relations for nested queries
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Auto UUID v7 — primary keys without defaults are auto-generated
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Start</h2>
				<p className="text-muted-foreground text-sm">
					1. Define your schema and type augmentation — in the lib that owns the
					database model:
				</p>
				<CodeBlock
					code={`import {
  defineDatabaseSchema,
  type InferDatabaseConfig,
} from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  users: schema.table({
    id: schema.uuid().primaryKey(),
    name: schema.text().notNull(),
    email: schema.text().notNull(),
  }),
}))

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDatabaseConfig<ReturnType<typeof databaseSchema>> {}
}`}
					filename="database.schema.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					2. Register the module once at the app root (API or lambda handler) —
					it is global:
				</p>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { configSchema } from './config.schema'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					3. Inject the typed DatabaseService from any domain service — no
					module imports needed:
				</p>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@turystack/nestjs-database'

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.users.findMany()
  }

  async create(name: string, email: string) {
    return this.db.users.create({ name, email })
  }
}`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
