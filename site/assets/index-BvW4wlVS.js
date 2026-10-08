import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function c(){return e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/react-i18n"}),e.jsxs("div",{className:"mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground",children:[e.jsxs("p",{children:["Typed translations for React. A Provider, hooks, and"," ",e.jsx("code",{className:"text-base",children:"define*"})," helpers."]}),e.jsx("p",{children:"You write one dictionary. Its shape becomes the contract every other language is checked against."})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/react-i18n",label:"npm"},{code:"pnpm add @turystack/react-i18n",label:"pnpm"},{code:"yarn add @turystack/react-i18n",label:"yarn"},{code:"bun add @turystack/react-i18n",label:"bun"}]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"react >= 19"})," ","is the only peer dependency."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Interpolation is a function call, so the compiler checks the arguments"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"A missing or misspelled key fails in the language file that has it wrong"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Languages load with the app or on first use"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Ships the words react-web renders, in ",e.jsx("code",{children:"en"}),","," ",e.jsx("code",{children:"pt-br"})," and ",e.jsx("code",{children:"es"})]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"No DOM: a stray window fails the build, not a Node test"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { defineI18n, defineTranslations } from '@turystack/react-i18n'

const en = defineTranslations({
  cart: {
    empty: 'Your cart is empty',
    items: (count: number) => \`\${count} items\`,
  },
})

export const { I18nProvider, useTranslations } = defineI18n({
  base: 'en',
  locales: { en },
})

export function Cart({ count }: { count: number }) {
  const t = useTranslations()

  return <p>{count === 0 ? t.cart.empty : t.cart.items(count)}</p>
}`,filename:"i18n.tsx",language:"tsx"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Why a factory"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:["A hook imported from a package cannot know the shape of your dictionary. Returned from"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"defineI18n"}),", it already does — no"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"declare module"})," ","to keep in sync, and two apps in one process never share state."]})]})]})}export{c as component};
