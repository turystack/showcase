import{j as s}from"./index-B7Ig6kNO.js";import{C as e}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function i(){return s.jsxs("div",{className:"space-y-8",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/react-hooks"}),s.jsxs("div",{className:"mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground",children:[s.jsx("p",{children:"A collection of reusable React hooks for state, async work, timing, and lifecycle."}),s.jsx("p",{children:"It provides shared behavior across Turystack apps without coupling application logic to a UI library."})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),s.jsx(e,{tabs:[{code:"npm install @turystack/react-hooks",label:"npm"},{code:"pnpm add @turystack/react-hooks",label:"pnpm"},{code:"yarn add @turystack/react-hooks",label:"yarn"},{code:"bun add @turystack/react-hooks",label:"bun"}]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),s.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"APIs with no UI dependency, shared by every Turystack app"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Focused utilities for state, async work, debounce, timing, and lifecycle"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"TypeScript-first APIs with complete type definitions"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"UI-independent behavior without browser, router, or styling dependencies"})]})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),s.jsx(e,{code:`import { useDisclosure } from '@turystack/react-hooks'

export function DisclosureExample() {
  const disclosure = useDisclosure()

  return (
    <>
      <button type="button" onClick={disclosure.on}>Open</button>
      {disclosure.value && (
        <button type="button" onClick={disclosure.off}>Close</button>
      )}
    </>
  )
}`,filename:"disclosure-example.tsx",language:"tsx"})]})]})}export{i as component};
