import{j as e,a0 as n}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const a=Object.keys(n).sort(),o=Object.values(n).reduce((s,r)=>s+Object.keys(r).length,0);function m(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-lib text-sm",children:"UI labels"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"The words the components own"}),e.jsxs("p",{className:"mt-3 max-w-3xl text-lg text-muted-foreground",children:['"No records found", "Rows per page", "Are you sure?" — the strings'," ",e.jsx("code",{className:"text-base",children:"@turystack/react-web"})," renders on its own. They live here, translated, on their own channel."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["Why not part of ",e.jsx("code",{children:"t"})]}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:["A component library's wording is not your copy. Merged into your dictionary it would clutter autocomplete and turn a patch release into a diff in your translation files. So"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useUiLabels()"})," is a separate hook, and"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useTranslations()"})," ","returns only what you wrote."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Wiring"}),e.jsx(t,{code:`import { TuryProvider } from '@turystack/react-web'

import { I18nProvider, useUiLabels } from './i18n'

function Ui({ children }: { children: React.ReactNode }) {
  return <TuryProvider labels={useUiLabels()}>{children}</TuryProvider>
}

export function App() {
  return (
    <I18nProvider defaultLocale="pt-br">
      <Ui>
        <Routes />
      </Ui>
    </I18nProvider>
  )
}`,filename:"app.tsx",language:"tsx"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useUiLabels()"})," ","follows the active language, so one switch relabels the components and your own copy together. It has to sit inside"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"I18nProvider"}),", which is why the wrapper exists."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What ships"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:["Three languages, complete: ",e.jsx("code",{children:"en"}),", ",e.jsx("code",{children:"pt-br"}),","," ",e.jsx("code",{children:"es"}),". Use any of them and the components are translated for free. Declare one outside the set and the type asks you for its labels instead of quietly serving English."]}),e.jsx(t,{code:`import { uiLabels, uiLabelsEn, uiLabelsEs, uiLabelsPtBr } from '@turystack/react-i18n'

uiLabels['pt-br'] === uiLabelsPtBr  // true — the map is the same objects

defineI18n({
  base: 'en',
  locales: { en, de },
  //  → Property 'ui' is missing: 'de' is outside the set this package translates
})`,filename:"ui-labels.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Overriding"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:[e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"defineUiLabels"})," ","takes one complete set, or a set plus the strings you want changed. The second form leaves everything you did not name alone."]}),e.jsx(t,{code:`import { defineI18n, defineUiLabels, uiLabels } from '@turystack/react-i18n'

defineI18n({
  base: 'en',
  locales: { en, 'pt-br': ptBR },
  ui: {
    'pt-br': defineUiLabels(uiLabels['pt-br'], {
      editableText: { save: 'Gravar' },   // 'cancel' and the rest survive
    }),
  },
})`,filename:"i18n.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The shape"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:[e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"UiLabels"})," is"," ",o," strings in ",a.length," groups, one per component that says anything on its own."," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"PartialUiLabels"})," ","is the same tree with every string optional."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.map(s=>e.jsx("code",{className:"rounded-lg border border-border bg-muted px-2 py-1 font-mono text-xs",children:s},s))})]})]})}export{m as component};
