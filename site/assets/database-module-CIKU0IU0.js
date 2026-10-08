import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as a}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const t=[{description:"The engine. A discriminated union: each arm brings its own config block and its own schema builder, so choosing one and passing the other's schema does not compile.",name:"adapter",required:!0,type:"'postgresql' | 'dynamodb'"},{description:"The PostgreSQL connection URL. Required with adapter: 'postgresql'.",name:"postgresql.url",required:!1,type:"string"},{description:"Region, table prefix, endpoint and credentials. Required with adapter: 'dynamodb' — see the DynamoDB page.",name:"dynamodb",required:!1,type:"DynamodbOptions"},{description:"A function that receives the engine's schema builder and returns the table definitions.",name:"schemaResolver",required:!0,type:"(schema: PgSchemaBuilder | DynamoSchemaBuilder) => …"},{description:"An optional function that receives materialized tables and a relations helper to define Drizzle relations. PostgreSQL only — relations have no counterpart in a key-value store.",name:"relationsResolver",required:!1,type:"(tables, helpers) => RelationsResolverResult"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"DatabaseModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Global module that connects and builds the repositories. Register it once at the app root."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`DatabaseModule.register(
  options: DatabaseModuleOptions | ((config: ConfigService) => DatabaseModuleOptions),
): DynamicModule`,filename:"database-module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Basic Usage"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Both forms below register the PostgreSQL engine; the two tabs are the static and the config-factory shapes, not two engines. The DynamoDB registration is in the next section."}),e.jsx(s,{tabs:[{code:`import { Module } from '@nestjs/common'
import { DatabaseModule } from '@turystack/nestjs-database'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    DatabaseModule.register({
      adapter: 'postgresql',
      postgresql: { url: 'postgres://localhost:5432/app' },
      schemaResolver: databaseSchema,
    }),
  ],
})
export class AppModule {}`,label:"Static"},{code:`import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { z } from 'zod'
import { databaseSchema } from './database.schema'

const configSchema = defineConfigSchema({ DATABASE_URL: z.string() })

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
export class AppModule {}`,label:"From config"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Choosing the engine"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"`adapter` discriminates the union. Each arm carries its own config block and its own schema builder, so passing the other engine's schema is a compile error rather than a runtime surprise."}),e.jsx(s,{filename:"app.module.ts",language:"ts",tabs:[{code:`DatabaseModule.register((config) => ({
  adapter: 'postgresql',
  postgresql: { url: config.get('DATABASE_URL') },
  relationsResolver: databaseRelations,
  schemaResolver: databaseSchema,
}))`,label:"PostgreSQL"},{code:`DatabaseModule.register((config) => ({
  adapter: 'dynamodb',
  dynamodb: {
    region: config.get('AWS_REGION'),
    tablePrefix: config.get('DYNAMODB_TABLE_PREFIX'),
    endpoint: config.get('DYNAMODB_ENDPOINT'), // DynamoDB Local, in tests
  },
  // no relationsResolver: relations have no counterpart in a key-value store
  schemaResolver: databaseSchema,
}))`,label:"DynamoDB"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["With Relations",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:'A key-value store has no join to plan, so `relationsResolver` exists only on the PostgreSQL arm of the union. On DynamoDB the equivalent of "belongs to" is the partition key, decided in the schema.'}),e.jsx(s,{code:`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { databaseSchema, databaseRelations } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
      relationsResolver: databaseRelations,
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"DatabaseModuleOptions"}),e.jsx(a,{props:t})]})]})}export{d as component};
