import{j as e}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-lib text-sm",children:"Dictionary"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Base and locales"}),e.jsx("p",{className:"mt-3 max-w-3xl text-lg text-muted-foreground",children:"Three helpers. Each one makes a different mistake fail in the file that made it."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"defineTranslations"}),e.jsx("p",{className:"max-w-3xl text-muted-foreground",children:"Declares the base dictionary. It returns what you pass; the work is in the type."}),e.jsx(a,{code:`import { defineTranslations } from '@turystack/react-i18n'

export const en = defineTranslations({
  cart: {
    empty: 'Your cart is empty',
    items: (count: number) => \`\${count} items\`,
    total: (value: string) => \`Total: \${value}\`,
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
  },
})

export type AppTranslations = typeof en`,filename:"locales/en.ts",language:"ts"}),e.jsx("div",{className:"rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm",children:e.jsxs("p",{children:["Interpolation is a function, not a"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"{name}"})," ","placeholder. Nothing is parsed at run time, and the compiler checks every argument. Type the parameters"," ",e.jsx("strong",{className:"text-foreground",children:"here only"})," — the other languages inherit them."]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"defineLocale"}),e.jsx("p",{className:"max-w-3xl text-muted-foreground",children:"Declares a complete language. You name the base, so a missing key, an invented key, or a wrong argument type fails right here."}),e.jsx(a,{code:`import { defineLocale } from '@turystack/react-i18n'

import type { AppTranslations } from './en'

export const ptBR = defineLocale<AppTranslations>({
  cart: {
    empty: 'Seu carrinho está vazio',
    items: (count) => \`\${count} itens\`, // \`count\` is already number
    total: (value) => \`Total: \${value}\`,
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
  },
})`,filename:"locales/pt-br.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"definePartialLocale"}),e.jsx("p",{className:"max-w-3xl text-muted-foreground",children:"Declares a language that is still being translated. What is missing falls back to the base. It is a separate helper so the code says which languages are unfinished."}),e.jsx(a,{code:`import { definePartialLocale } from '@turystack/react-i18n'

import type { AppTranslations } from './en'

export const es = definePartialLocale<AppTranslations>({
  common: {
    save: 'Guardar',
  },
})

// t.common.save  → 'Guardar'
// t.cart.empty   → 'Your cart is empty'  (falls back to base)`,filename:"locales/es.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What fails"}),e.jsx(a,{code:`defineLocale<AppTranslations>({
  cart: {
    empty: 'Seu carrinho está vazio',
    items: (count) => \`\${count} itens\`,
    // total is missing
    //   → Property 'total' is missing in type '{ empty: string; items: … }'
  },
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    //   → Object literal may only specify known properties
  },
})`,filename:"what-fails.ts",language:"ts"})]})]})}export{r as component};
