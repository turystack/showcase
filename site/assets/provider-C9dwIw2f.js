import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-lib text-sm",children:"Runtime"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Provider and hooks"}),e.jsxs("p",{className:"mt-3 max-w-3xl text-lg text-muted-foreground",children:[e.jsx("code",{className:"text-base",children:"defineI18n"})," binds your dictionary to a Provider and four hooks, already typed by the languages you passed."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Wiring"}),e.jsx(s,{code:`import { defineI18n } from '@turystack/react-i18n'

import { en } from './locales/en'
import { ptBR } from './locales/pt-br'

export const {
  I18nProvider,
  useI18n,
  useTranslations,
  useLocale,
  useUiLabels,
} = defineI18n({
  base: 'en',
  locales: {
    en,                             // bundled — the base must be
    'pt-br': ptBR,                  // bundled
    es: () => import('./locales/es'),  // fetched on first use
  },
})`,filename:"i18n.ts",language:"ts"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground text-sm",children:["A language is either a tree or a function returning one. The base has to be a tree, since everything else falls back to it — naming a fetched language as"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"base"})," is a compile error. A loader may resolve the tree or a module with the tree as its ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"default"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"I18nProvider"}),e.jsx(a,{props:[{description:"Controlled. Pass it and your router or store owns the language, not the Provider.",name:"locale",type:"Locale"},{default:"base",description:"Uncontrolled starting point. Ignored when `locale` is passed.",name:"defaultLocale",type:"Locale"},{description:"Fires on every change, including the one `setLocale` makes. Save it here.",name:"onLocaleChange",type:"(locale: Locale) => void"}]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Reading"}),e.jsx(s,{code:`function Cart({ count }: { count: number }) {
  const t = useTranslations()

  return <p>{count === 0 ? t.cart.empty : t.cart.items(count)}</p>
}

function LocalePicker() {
  const { locale, locales, setLocale, loading } = useLocale()

  return (
    <select
      disabled={loading}
      onChange={(event) => setLocale(event.target.value as typeof locale)}
      value={locale}
    >
      {locales.map((tag) => (
        <option key={tag} value={tag}>{tag}</option>
      ))}
    </select>
  )
}`,filename:"cart.tsx",language:"tsx"}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useI18n()"})," ","returns everything —"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"{ t, locale, locales, setLocale, loading }"}),"."," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useTranslations()"})," ","is the ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"t"})," alone,"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"useLocale()"})," is everything else. Outside the Provider they came from, all of them throw."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Loading"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:["While a fetched language is on its way,"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"t"})," serves the base and ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"loading"})," ","is true, so the screen keeps its words. What has been loaded is kept, so going back is instant."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Persistence"}),e.jsxs("p",{className:"max-w-3xl text-muted-foreground",children:["The package saves nothing. Where the language is kept —"," ",e.jsx("code",{className:"rounded bg-muted px-1 py-0.5",children:"localStorage"}),", a cookie, the URL — is the app's call, so it hands you the event and stays out of the way."]}),e.jsx(s,{code:`// Controlled — your router or store owns the language.
<I18nProvider locale={locale} onLocaleChange={setLocale}>
  <App />
</I18nProvider>

// Uncontrolled — read storage once, before mount.
<I18nProvider defaultLocale={stored ?? 'en'} onLocaleChange={persist}>
  <App />
</I18nProvider>`,filename:"app.tsx",language:"tsx"})]})]})}export{d as component};
