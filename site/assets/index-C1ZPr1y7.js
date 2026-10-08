import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function i(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-storage"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Define each upload context once; call sites just pass the context name. AWS S3 built-in."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/nestjs-storage",label:"npm"},{code:"pnpm add @turystack/nestjs-storage",label:"pnpm"},{code:"yarn add @turystack/nestjs-storage",label:"yarn"},{code:"bun add @turystack/nestjs-storage",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Pluggable storage adapters — AWS S3 built-in"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Typed upload contexts — params defined once, typed via StorageContextMap"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Presigned POST uploads — content type and max size enforced by policy"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Temp → commit flow with one-call resolvers for update inputs"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{code:`import { ConfigModule } from '@turystack/nestjs-config'
import { StorageModule } from '@turystack/nestjs-storage'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    StorageModule.register((config) => ({
      adapter: 'aws-s3',
      aws: { region: config.get('AWS_REGION') },
      bucket: config.get('STORAGE_BUCKET'),
      publicBaseUrl: config.get('CDN_BASE_URL'),
      contexts: {
        USER_AVATAR: {
          visibility: 'PUBLIC',
          slug: 'user-avatar',
          maxSizeBytes: 5 * 1024 * 1024,
          allowedContentTypes: ['image/png', 'image/jpeg', 'image/webp'],
          buildFinalKey: ({ basename }) => \`public/user-avatar/\${basename}\`,
        },
      },
    })),
  ],
})
export class AppModule {}

// then, in any use case — the user as the commit target:
const avatar = await this.storage.resolvePublicUpload({
  context: 'USER_AVATAR',
  value: input.avatar,
  targetId: userId,
})`,filename:"app.module.ts",language:"ts"})]})]})}export{i as component};
