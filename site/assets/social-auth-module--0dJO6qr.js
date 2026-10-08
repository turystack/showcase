import{j as e}from"./index-B7Ig6kNO.js";import{C as o}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const i=[{description:"Google configuration. Requires clientId for JWT audience validation.",name:"google",required:!1,type:"{ clientId: string }"},{description:"Facebook configuration. No credentials needed — uses access token directly.",name:"facebook",required:!1,type:"{}"},{description:'Microsoft configuration. Optional tenantId (defaults to "common" for multi-tenant).',name:"microsoft",required:!1,type:"{ tenantId?: string }"},{description:"Apple configuration. Requires clientId (Services ID) for JWT audience validation.",name:"apple",required:!1,type:"{ clientId: string }"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"SocialAuthModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"DynamicModule that registers the social auth adapters. Only the providers you configure are instantiated."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(o,{code:`import { SocialAuthModule } from '@turystack/nestjs-social-auth'

SocialAuthModule.register(
  options: SocialAuthModuleOptions | ((config: ConfigService) => SocialAuthModuleOptions),
): DynamicModule`,filename:"social-auth.module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app. register also accepts a plain options object."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(o,{code:`import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { SocialAuthModule } from '@turystack/nestjs-social-auth'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  GOOGLE_CLIENT_ID: z.string(),
  AZURE_TENANT_ID: z.string().nullable().default(null),
  APPLE_CLIENT_ID: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    SocialAuthModule.register((config) => ({
      google: { clientId: config.get('GOOGLE_CLIENT_ID') },
      facebook: {},
      microsoft: { tenantId: config.get('AZURE_TENANT_ID') ?? undefined },
      apple: { clientId: config.get('APPLE_CLIENT_ID') },
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"SocialAuthModuleOptions"}),e.jsx("p",{className:"text-muted-foreground",children:"Each key enables a specific provider. Omit a key to disable it."}),e.jsx(t,{props:i})]})]})}export{l as component};
