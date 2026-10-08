import{j as s}from"./index-CQ2_D3U_.js";import{C as e}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function i(){return s.jsxs("div",{className:"space-y-10",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-lock"}),s.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Distributed locks for NestJS on pluggable cache adapters. Redis built-in."})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),s.jsx(e,{tabs:[{code:"npm install @turystack/nestjs-lock",label:"npm"},{code:"pnpm add @turystack/nestjs-lock",label:"pnpm"},{code:"yarn add @turystack/nestjs-lock",label:"yarn"},{code:"bun add @turystack/nestjs-lock",label:"bun"}]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),s.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Storage-agnostic locking via cache adapters (Redis built-in)"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Configurable TTL, wait timeout, and retry interval"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Method-level @Lock decorator"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Uses @turystack/nestjs-cache under the hood"})]})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),s.jsx(e,{code:`import { CacheModule } from '@turystack/nestjs-cache'
import { LockModule } from '@turystack/nestjs-lock'

// CacheModule registered once, app-wide; LockModule reuses its connection
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    LockModule.register(),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]})]})}export{i as component};
