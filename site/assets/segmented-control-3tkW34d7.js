import{F as l,j as e,aD as o}from"./index-B7Ig6kNO.js";import{C as d}from"./CodeBlock-jMISp3qZ.js";import{C as a}from"./ComponentPreview-BlMdAug8.js";import{P as r}from"./PropsTable-r9MRwph6.js";import{S as c}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const p=[{description:"The app’s own option objects, used as-is.",name:"options",required:!0,type:"T[]"},{description:"Reads an option’s label: a key of T or a function.",name:"optionLabel",required:!0,type:"keyof T | ((option: T) => React.ReactNode)"},{description:"Reads an option’s value; what `onChange` delivers.",name:"optionValue",required:!0,type:"keyof T | ((option: T) => O)"},{description:"An icon rendered before the label.",name:"optionIcon",type:"keyof T | ((option: T) => React.ReactNode)"},{description:"Blocks one option without removing it from the row.",name:"optionDisabled",type:"keyof T | ((option: T) => boolean)"},{description:"Blocks one option and says why in a tooltip.",name:"optionDisabledReason",type:"keyof T | ((option: T) => string | undefined)"},{description:"Controlled selection.",name:"value",type:"I | null"},{description:"Uncontrolled initial selection.",name:"defaultValue",type:"I | null"},{description:"Fires with the option’s value, not a string key.",name:"onChange",type:"(value: O) => void"},{default:'"md"',description:"Visual size.",name:"size",type:'"sm" | "md" | "lg"'},{default:'"horizontal"',description:"Layout direction; vertical stacks the segments.",name:"orientation",type:'"horizontal" | "vertical"'},{default:"false",description:"Fills the container, sharing width equally.",name:"block",type:"boolean"},{description:"Blocks interaction and greys the whole control.",name:"disabled",type:"boolean"},{description:"Shows the choice at full contrast; cannot change it.",name:"readOnly",type:"boolean"},{description:"Blocks interaction and spins on the selected segment.",name:"loading",type:"boolean"},{description:"Accessible name of the radio group.",name:"ariaLabel",type:"string"}],m=`import { SegmentedControl } from '@turystack/react-web'

const views = [
  { id: 'list', name: 'List' },
  { id: 'board', name: 'Board' },
  { id: 'calendar', name: 'Calendar' },
]

<SegmentedControl
  ariaLabel="View"
  onChange={setView}
  optionLabel="name"
  optionValue="id"
  options={views}
  value={view}
/>

// The value is the option's, whatever its type
<SegmentedControl
  onChange={(nights: number) => setNights(nights)}
  optionLabel={(option) => \`\${option.nights} nights\`}
  optionValue={(option) => option.nights}
  options={packages}
/>

// Full width, and one option out of reach
<SegmentedControl
  block
  optionDisabled="soldOut"
  optionLabel="name"
  optionValue="id"
  options={fares}
/>

// Blocked, and saying why
<SegmentedControl
  optionDisabledReason={(plan) => (plan.locked ? 'Upgrade to unlock' : undefined)}
  optionLabel="name"
  optionValue="id"
  options={plans}
/>`,t=[{id:"list",name:"List"},{id:"board",name:"Board"},{id:"calendar",name:"Calendar",soldOut:!0}],x=[{id:"week",name:"Semana"},{id:"month",name:"Mês"},{id:"year",lockedReason:"Disponível no plano Pro",name:"Ano"}],u=["sm","md","lg"];function k(){const[s,i]=l.useState("list");return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Form"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"SegmentedControl"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"One choice among a few visible options; it selects a value, not a view like Tabs."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(r,{props:p})]}),e.jsx(c,{slug:"segmented-control"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Not the pill Tabs"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'<Tabs variant="pill" />'})," ","looks like this and is a different component: it owns panels and selects which one is shown."]}),e.jsx(a,{title:"Controlled, with the value beneath it",children:e.jsxs("div",{className:"flex w-full max-w-md flex-col items-center gap-4",children:[e.jsx(o,{ariaLabel:"View",onChange:i,optionLabel:"name",options:t,optionValue:"id",value:s}),e.jsxs("span",{className:"text-muted-foreground text-xs",children:["value: ",s]})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sizes and width"}),e.jsx(a,{title:"sm, md, lg — and block",children:e.jsxs("div",{className:"flex w-full max-w-md flex-col items-center gap-4",children:[u.map(n=>e.jsx(o,{ariaLabel:`Size ${n}`,defaultValue:"list",optionLabel:"name",options:t,optionValue:"id",size:n},n)),e.jsx(o,{ariaLabel:"Block",block:!0,defaultValue:"board",optionLabel:"name",options:t,optionValue:"id"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Vertical, and the blocked states"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"disabled"})," ","greys the control,"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"readOnly"})," ","locks the answer, and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"loading"})," ","shows a save in progress."]}),e.jsx(a,{title:"One option blocked, and three blocked controls",children:e.jsxs("div",{className:"flex w-full max-w-md flex-col items-center gap-4",children:[e.jsx(o,{ariaLabel:"Vertical",defaultValue:"list",optionDisabled:"soldOut",optionLabel:"name",options:t,optionValue:"id",orientation:"vertical"}),e.jsx(o,{ariaLabel:"Disabled",defaultValue:"list",disabled:!0,optionLabel:"name",options:t,optionValue:"id"}),e.jsx(o,{ariaLabel:"Read only",defaultValue:"board",optionLabel:"name",options:t,optionValue:"id",readOnly:!0}),e.jsx(o,{ariaLabel:"Loading",loading:!0,optionLabel:"name",options:t,optionValue:"id",value:"calendar"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled with a reason"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"optionDisabledReason"})," ","blocks a segment but keeps it reachable by arrows; hover or focus it to read why."]}),e.jsx(a,{title:"The yearly view locked by the plan",children:e.jsx(o,{ariaLabel:"Período",defaultValue:"week",optionDisabledReason:"lockedReason",optionLabel:"name",options:x,optionValue:"id"})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(d,{code:m,filename:"example.tsx",language:"tsx"})]})]})}export{k as component};
