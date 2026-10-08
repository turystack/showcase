import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-rate-limit"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Distributed rate limiting for NestJS on pluggable cache adapters. Redis built-in."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/nestjs-rate-limit",label:"npm"},{code:"pnpm add @turystack/nestjs-rate-limit",label:"pnpm"},{code:"yarn add @turystack/nestjs-rate-limit",label:"yarn"},{code:"bun add @turystack/nestjs-rate-limit",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Storage-agnostic rate limiting via cache adapters (Redis built-in)"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Fixed window: an atomic counter per key, with the window measured from the first hit"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Uses @turystack/nestjs-cache under the hood"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{code:`import { CacheModule } from '@turystack/nestjs-cache'
import { RateLimitModule } from '@turystack/nestjs-rate-limit'

// CacheModule registered once, app-wide; RateLimitModule reuses its connection
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    RateLimitModule.register(),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]})]})}export{r as component};
