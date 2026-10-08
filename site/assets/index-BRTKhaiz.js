import{j as e}from"./index-B7Ig6kNO.js";import{C as i}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function n({head:s,rows:r}){return e.jsx("div",{className:"overflow-x-auto rounded-lg border border-border",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsx("tr",{className:"border-border border-b bg-muted/50",children:s.map(t=>e.jsx("th",{className:"px-4 py-3 text-left font-medium text-muted-foreground",children:t},t))})}),e.jsx("tbody",{children:r.map((t,c)=>e.jsx("tr",{className:c<r.length-1?"border-border border-b":"",children:s.map(o=>e.jsx("td",{className:"px-4 py-3 align-top text-muted-foreground",children:o===s[0]?e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs",children:t[s.indexOf(o)]}):t[s.indexOf(o)]},o))},t.join("|")))})]})})}const d=[["./biome","biome.json","Lint + format preset, web and Expo"],["./tsconfig.web","tsconfig.web.json","Vite apps: DOM libs + vite/client types"],["./tsconfig.web.json","tsconfig.web.json","Same file, with the extension"],["./tsconfig.mobile","tsconfig.mobile.json","Expo / React Native: ES2022 lib only"],["./tsconfig.mobile.json","tsconfig.mobile.json","Same file, with the extension"],["./vitest","vitest.base.js (+ .d.ts)","web(), mobile, FLOOR, WebTestOverrides"]],l=[["web(overrides?)","(WebTestOverrides) => ViteUserConfig","Default test config for a web app"],["mobile","typeof web","The same function, named for Expo apps"],["FLOOR","number","Coverage floor, 85, from @turystack/config"],["WebTestOverrides","type","Vitest `test` options plus `plugins`"]],p=[{default:"'jsdom'",description:"Same DOM environment for web and mobile",name:"environment",type:"string"},{default:"false",description:"A suite with no tests fails",name:"passWithNoTests",type:"boolean"},{default:"'v8'",description:"Coverage provider",name:"coverage.provider",type:"string"},{default:"['src/**/*.{ts,tsx}']",description:"Untested files report 0% instead of vanishing",name:"coverage.include",type:"string[]"},{default:"['text', 'json-summary', 'json']",description:"Coverage reporters",name:"coverage.reporter",type:"string[]"},{default:"85",description:"branches, functions, lines, statements",name:"coverage.thresholds",type:"{ branches, functions, lines, statements }"},{default:"true",description:"Floor applies per file, not project average",name:"coverage.thresholds.perFile",type:"boolean"},{default:"see below",description:"Files with nothing to cover",name:"coverage.exclude",type:"string[]"}],m=[{description:"Hoisted to the Vite config root, not `test`",name:"plugins",type:"ViteUserConfig['plugins']"},{description:"Any Vitest `test` option, spread last",name:"...test options",type:"ViteUserConfig['test']"}],f=[["tsconfig","extends tsconfig.base.json","strict, skipLibCheck, two safety flags"],["biome","restated, not extended","Biome ignores a nested extends"],["vitest","imports coverage() and FLOOR","One coverage floor for backend and frontend"]];function j(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/frontend-config"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Biome, TypeScript and Vitest presets for web and Expo / React Native apps."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Exports"}),e.jsx(n,{head:["Specifier","File","Use"],rows:d}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"One Biome preset serves both platforms. TypeScript and Vitest have a web and a mobile entry."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Install"}),e.jsx(i,{code:"pnpm add -D @turystack/frontend-config",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Its only dependency is @turystack/config. The app installs biome, typescript, vitest, jsdom and @vitest/coverage-v8 itself."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Web app (Vite)"}),e.jsx(i,{tabs:[{code:`{
  "extends": ["@turystack/frontend-config/biome"]
}`,label:"biome.json"},{code:`{
  "extends": "@turystack/frontend-config/tsconfig.web",
  "include": ["src", "vite.config.ts", "vitest.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,label:"tsconfig.json"},{code:`import react from '@vitejs/plugin-react'
import { web } from '@turystack/frontend-config/vitest'

export default web({
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  plugins: [react()],
})`,label:"vitest.config.ts"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Mobile app (Expo / React Native)"}),e.jsx(i,{tabs:[{code:`{
  "extends": ["@turystack/frontend-config/biome"]
}`,label:"biome.json"},{code:`{
  "extends": "@turystack/frontend-config/tsconfig.mobile",
  "include": ["src", "app.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,label:"tsconfig.json"},{code:`import { mobile } from '@turystack/frontend-config/vitest'

export default mobile({
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
})`,label:"vitest.config.ts"}]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The Biome preset already lints app.config.ts. tsconfig.mobile drops DOM and vite/client."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Vitest preset"}),e.jsx(n,{head:["Export","Type","Description"],rows:l}),e.jsx("h3",{className:"font-display font-semibold text-lg",children:"Defaults"}),e.jsx(a,{props:p}),e.jsx(i,{code:`// from @turystack/config (UNCOVERED)
'**/*.d.ts', '**/*.mock.ts', '**/*.schema.ts',
'**/*.types.ts', '**/index.ts',
// added by frontend-config (composition roots)
'**/*.config.ts', '**/*.types.ts', '**/~sdk/**',
'**/main.tsx', '**/query-client.ts', '**/routeTree.gen.ts',
'**/router.tsx', '**/routes/__root.tsx'`,filename:"coverage.exclude",language:"ts"}),e.jsx("h3",{className:"font-display font-semibold text-lg",children:"WebTestOverrides"}),e.jsx(a,{props:m}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Overrides replace whole keys. Passing coverage drops the floor; passing environment replaces jsdom."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Built on @turystack/config"}),e.jsx(n,{head:["Preset","How","Why"],rows:f}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Biome's shared blocks are copied from the baseline. A check:baseline gate fails if they drift."})]})]})}export{j as component};
