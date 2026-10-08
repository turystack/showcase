import{F as s,j as e,aN as a,as as v,a5 as o,aO as j}from"./index-CQ2_D3U_.js";import{C as y}from"./CodeBlock-ftRQod4w.js";import{C as t}from"./ComponentPreview-x9-jqN-p.js";import{P as d}from"./PropsTable-CmvKG47z.js";import{S as w}from"./SlotsTable-DcNRogj3.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const N=[{description:"Content beside the circle; names and selects the radio.",name:"label",type:"React.ReactNode"},{description:"Helper content under the label.",name:"description",type:"React.ReactNode"},{description:'Value this radio stands for; standalone default "radio".',name:"value",type:"string"},{default:"false",description:"Prevents interaction and dims the whole row.",name:"disabled",type:"boolean"},{description:"Blocks it like disabled; a tooltip says why.",name:"disabledReason",type:"string"},{default:"false",description:"Wraps the row in a full-width bordered card.",name:"bordered",type:"boolean"},{description:"Controlled selected state. Standalone only.",name:"checked",type:"boolean"},{description:"Initial state when uncontrolled. Standalone only.",name:"defaultChecked",type:"boolean"},{description:"Fires with true when picked. Standalone only.",name:"onChange",type:"(checked: boolean) => void"}],k=[{description:"Options: label, value, description, disabled, badge…",name:"items",required:!0,type:"RadioItem[]"},{description:"Per item: blocks it like disabled; a tooltip says why.",name:"items[].disabledReason",type:"string"},{default:'"vertical"',description:"Layout: a stacked column, or a wrapping row with wider gaps.",name:"variant",type:'"vertical" | "horizontal"'},{description:"Controlled selection — the value of the picked item.",name:"value",type:"string"},{description:"Initial selection when uncontrolled.",name:"defaultValue",type:"string"},{default:"false",description:"Disables every radio in the group.",name:"disabled",type:"boolean"},{default:"false",description:"Applies the bordered card treatment to every item.",name:"bordered",type:"boolean"},{default:"false",description:"Turns every item into a card that is the radio.",name:"card",type:"boolean"},{description:"Fires with the value of the newly picked item.",name:"onChange",type:"(value: string) => void"},{description:"Accessible name for a group with no visible legend.",name:"ariaLabel",type:"string"}],l=[{description:"One project, community support.",label:"Free",value:"free"},{description:"Ten projects, email support, custom domains.",label:"Pro",value:"pro"},{description:"Not available on a personal account.",disabled:!0,label:"Enterprise",value:"enterprise"}],C=[{label:"Pix",value:"pix"},{label:"Cartão",value:"card"},{disabledReason:"Boleto só até 3 dias antes do check-in",label:"Boleto",value:"boleto"}],c=[{label:"Small",value:"s"},{label:"Medium",value:"m"},{label:"Large",value:"l"}],u=[{label:"Mensal",rightSection:e.jsx(o,{value:4990,weight:"semibold"}),value:"monthly"},{badge:e.jsx(j,{size:"sm",variant:"success",children:"Economize 15%"}),description:e.jsxs(e.Fragment,{children:["Cobrado uma vez por ano.",e.jsx("br",{}),"Equivale a"," ",e.jsx(o,{inheritColor:!0,size:"inherit",value:4241})," ","por mês."]}),label:"Anual",rightSection:e.jsx(o,{value:50900,weight:"semibold"}),value:"yearly"}],S=`import { Badge, MoneyText, Radio } from '@turystack/react-web'
import { useState } from 'react'

// A group — the normal case
function Plan() {
  const [plan, setPlan] = useState('free')

  return (
    <Radio.Group
      items={[
        { description: 'One project.', label: 'Free', value: 'free' },
        { description: 'Ten projects.', label: 'Pro', value: 'pro' },
        { disabled: true, label: 'Enterprise', value: 'enterprise' },
      ]}
      onChange={setPlan}
      value={plan}
    />
  )
}

// Uncontrolled
<Radio.Group defaultValue="m" items={sizes} />

// Horizontal, and bordered cards
<Radio.Group items={sizes} variant="horizontal" />
<Radio.Group bordered items={plans} />

// The whole group off
<Radio.Group defaultValue="free" disabled items={plans} />

// Card — the whole card is the radio; badge and rightSection are card-only.
// No visible legend names this group, so ariaLabel does.
<Radio.Group
  ariaLabel="Intervalo de cobrança"
  card
  variant="horizontal"
  value={interval}
  onChange={setInterval}
  items={[
    { label: 'Mensal', value: 'monthly', rightSection: <MoneyText value={4990} /> },
    {
      label: 'Anual',
      value: 'yearly',
      badge: <Badge size="sm" variant="success">Economize 15%</Badge>,
      description: 'Cobrado uma vez por ano.',
      rightSection: <MoneyText value={50900} />,
    },
  ]}
/>

// Standalone, controlled — you hold the state yourself
function Confirm() {
  const [agreed, setAgreed] = useState(false)

  return (
    <Radio
      checked={agreed}
      label="Yes, delete it"
      onChange={setAgreed}
      value="yes"
    />
  )
}

// Standalone, uncontrolled — defaultChecked seeds it and it holds its own state
<Radio defaultChecked label="Yes, delete it" value="yes" />`;function T(){const[r,p]=s.useState("free"),[i,m]=s.useState(!1),[h,x]=s.useState(!1),[b,f]=s.useState(!0),[n,g]=s.useState("yearly");return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Form"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Radio"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"One choice out of several, almost always through Radio.Group."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(d,{props:N})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Radio.Group props"}),e.jsx(d,{props:k})]}),e.jsx(w,{slug:"radio"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Group"}),e.jsx(t,{title:"Controlled — vertical (the default)",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx(a.Group,{items:l,onChange:p,value:r}),e.jsxs("span",{className:"text-muted-foreground text-sm",children:["value: ",r]})]})}),e.jsx(t,{title:"horizontal",children:e.jsx(a.Group,{defaultValue:"m",items:c,variant:"horizontal"})}),e.jsx(t,{title:"Uncontrolled — defaultValue",children:e.jsx(a.Group,{defaultValue:"pro",items:l})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Bordered"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"bordered"})," ","is a group-level prop here, and it stretches every row to the full width of the container."]}),e.jsx(t,{title:"A bordered group",children:e.jsx("div",{className:"w-full max-w-sm",children:e.jsx(a.Group,{bordered:!0,defaultValue:"pro",items:l})})}),e.jsx(t,{title:"Bordered and horizontal",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(a.Group,{bordered:!0,defaultValue:"m",items:c,variant:"horizontal"})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Card"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"card"})," ","makes each item a clickable card named by its label; give the row an"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"ariaLabel"})," ","when nothing names it."]}),e.jsx(t,{title:"Billing interval — horizontal, sharing the row",children:e.jsxs("div",{className:"flex w-full max-w-2xl flex-col gap-3",children:[e.jsx(a.Group,{ariaLabel:"Intervalo de cobrança",card:!0,items:u,onChange:g,value:n,variant:"horizontal"}),e.jsxs(v,{size:"sm",variant:"muted",children:["value: ",n]})]})}),e.jsx(t,{title:"Vertical cards",children:e.jsx("div",{className:"w-full max-w-sm",children:e.jsx(a.Group,{ariaLabel:"Intervalo de cobrança",card:!0,defaultValue:"monthly",items:u})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Disable per item, or the whole group at once."}),e.jsx(t,{title:"The whole group disabled",children:e.jsx(a.Group,{defaultValue:"free",disabled:!0,items:l})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled with a reason"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"disabledReason"})," ","blocks an item but keeps it reachable by arrows; hover or focus it to read why."]}),e.jsx(t,{title:"Boleto blocked among payment cards",children:e.jsx("div",{className:"w-full max-w-lg",children:e.jsx(a.Group,{ariaLabel:"Forma de pagamento",card:!0,defaultValue:"pix",items:C,variant:"horizontal"})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Standalone"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A standalone radio renders its own one-item group, controlled or uncontrolled like Switch and Checkbox."}),e.jsx(t,{title:"Controlled standalone",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx(a,{checked:i,label:"Yes, delete it",onChange:m,value:"yes"}),e.jsxs("span",{className:"text-muted-foreground text-sm",children:["checked: ",String(i)]})]})}),e.jsx(t,{title:"Uncontrolled — defaultChecked",children:e.jsx(a,{defaultChecked:!0,label:"Starts checked",value:"uncontrolled"})}),e.jsx(t,{title:"Description, bordered, disabled",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-3",children:[e.jsx(a,{checked:h,description:"Helper text under the label.",label:"With a description",onChange:x,value:"a"}),e.jsx(a,{bordered:!0,checked:b,description:"The border stretches to the container.",label:"Bordered",onChange:f,value:"b"}),e.jsx(a,{disabled:!0,label:"Disabled",value:"c"}),e.jsx(a,{checked:!0,disabled:!0,label:"Disabled and selected",value:"d"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(y,{code:S,filename:"example.tsx",language:"tsx"})]})]})}export{T as component};
