import{j as e,aJ as r}from"./index-B7Ig6kNO.js";import{C as o}from"./CodeBlock-jMISp3qZ.js";import{C as a}from"./ComponentPreview-BlMdAug8.js";import{P as l}from"./PropsTable-r9MRwph6.js";import{S as i}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const n=[{default:'"vertical"',description:"Which way it scrolls; both suits a wide table.",name:"orientation",type:'"vertical" | "horizontal" | "both"'}],c=Array.from({length:12},(s,t)=>`TRY-${1040+t}`),d=`import { ScrollArea } from '@turystack/react-web'

// It takes the height it is given — there is no height prop, because a scroll
// region without a bounded parent is a region that never scrolls
<Box height="sm">
  <ScrollArea>
    <ActivityFeed />
  </ScrollArea>
</Box>

<ScrollArea orientation="both">
  <WideTable />
</ScrollArea>`;function u(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Layout"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"ScrollArea"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A scrollable region with a scrollbar the design system owns."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(l,{props:n})]}),e.jsx(i,{slug:"scroll-area"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"A bounded parent, and a list too long for it"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"It fills its parent; give the parent a height and the list scrolls."}),e.jsx(a,{title:"Vertical scrolling inside a fixed height",children:e.jsx("div",{className:"h-40 w-full max-w-sm rounded-md border border-border",children:e.jsx(r,{children:e.jsx("div",{className:"flex flex-col gap-2 p-3 text-sm",children:c.map(s=>e.jsxs("span",{children:["Booking ",s]},s))})})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(o,{code:d,filename:"example.tsx",language:"tsx"})]})]})}export{u as component};
