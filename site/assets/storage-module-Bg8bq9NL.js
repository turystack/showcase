import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const o=[{description:"Storage adapter. AWS S3 is the built-in option.",name:"adapter",required:!0,type:"'aws-s3'"},{description:"The AWS region.",name:"aws.region",required:!0,type:"string"},{description:"AWS credentials. Optional — falls back to the default provider chain.",name:"aws.credentials",required:!1,type:"{ accessKeyId, secretAccessKey }"},{description:"The app bucket. All context operations use it.",name:"bucket",required:!0,type:"string"},{description:"Base URL for PUBLIC objects (e.g. the CDN). Required if any context is PUBLIC.",name:"publicBaseUrl",required:!1,type:"string"},{description:"Default presigned-upload TTL in seconds. Default: 300.",name:"uploadTtlSeconds",required:!1,type:"number"},{description:"Default presigned-download TTL in seconds. Default: 60.",name:"downloadTtlSeconds",required:!1,type:"number"},{description:"Upload contexts — visibility, size, content types, and key layout per context.",name:"contexts",required:!1,type:"Record<string, StorageContextDefinition>"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"StorageModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Registers the bucket, the adapter, and the upload contexts — once, in the app root. StorageService is then injectable anywhere."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { StorageModule } from '@turystack/nestjs-storage'

StorageModule.register(
  options: StorageModuleOptions | ((config: ConfigService) => StorageModuleOptions),
): DynamicModule`,filename:"storage-module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app. register also accepts a plain options object."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`// storage.contexts.ts — one object: runtime config AND source of the types
import { defineStorageContexts, type InferStorageContexts } from '@turystack/nestjs-storage'

export const storageContexts = defineStorageContexts({
  USER_AVATAR: {
    visibility: 'PUBLIC',
    slug: 'user-avatar',
    maxSizeBytes: 5 * 1024 * 1024,
    allowedContentTypes: ['image/png', 'image/jpeg', 'image/webp'],
    buildFinalKey: ({ basename }) => \`public/user-avatar/\${basename}\`,
  },
  USER_DOCUMENT: {
    visibility: 'PRIVATE',
    slug: 'user-document',
    maxSizeBytes: 10 * 1024 * 1024,
    allowedContentTypes: ['application/pdf'],
    buildFinalKey: ({ basename, targetId }) =>
      \`private/users/\${targetId}/user-document/\${basename}\`,
  },
})

// derived, never written by hand:
declare module '@turystack/nestjs-storage' {
  interface StorageContextMap extends InferStorageContexts<typeof storageContexts> {}
}

// app.module.ts
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { StorageModule } from '@turystack/nestjs-storage'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  AWS_REGION: z.string(),
  STORAGE_BUCKET: z.string(),
  CDN_BASE_URL: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    StorageModule.register((config) => ({
      adapter: 'aws-s3',
      aws: { region: config.get('AWS_REGION') },
      bucket: config.get('STORAGE_BUCKET'),
      publicBaseUrl: config.get('CDN_BASE_URL'),
      contexts: storageContexts,
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"StorageModuleOptions"}),e.jsx(s,{props:o})]})]})}export{d as component};
