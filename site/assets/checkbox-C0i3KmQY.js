import{F as n,j as e,bt as s}from"./index-CQ2_D3U_.js";import{C as u}from"./CodeBlock-ftRQod4w.js";import{C as a}from"./ComponentPreview-x9-jqN-p.js";import{P as h}from"./PropsTable-CmvKG47z.js";import{S as b}from"./SlotsTable-DcNRogj3.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const f=[{description:"Text beside the box. Clicking it toggles the checkbox.",name:"label",type:"string"},{description:"Accessible name for a box with no visible label.",name:"ariaLabel",type:"string"},{description:"Helper text under the label.",name:"description",type:"string"},{description:"Value submitted with a form.",name:"value",type:"string"},{default:'"md"',description:"Box size: 12px, 16px or 20px.",name:"size",type:'"sm" | "md" | "lg"'},{default:"false",description:"Prevents interaction and dims the whole row.",name:"disabled",type:"boolean"},{description:"Blocks it like disabled; a tooltip says why.",name:"disabledReason",type:"string"},{default:"false",description:"Wraps the row in a full-width bordered card.",name:"bordered",type:"boolean"},{default:"false",description:"Marks the box invalid, with a destructive border and ring.",name:"error",type:"boolean"},{description:"Error text under the label; implies error.",name:"errorMessage",type:"React.ReactNode"},{description:"Controlled checked state.",name:"checked",type:"boolean"},{description:"Initial state when uncontrolled.",name:"defaultChecked",type:"boolean"},{default:"false",description:"Mixed state: shows a dash; wins over checked.",name:"indeterminate",type:"boolean"},{description:"Fires with the new state on every toggle.",name:"onChange",type:"(checked: boolean) => void"}],g=[{description:"Accessible name of the group (a fieldset).",name:"ariaLabel",type:"string"},{description:"Options: label, value, optional description and disabled.",name:"items",required:!0,type:"CheckboxItem[]"},{description:"Per item: blocks it like disabled; a tooltip says why.",name:"items[].disabledReason",type:"string"},{description:"Controlled selection, as an array of item values.",name:"value",type:"string[]"},{default:"[]",description:"Initial selection when uncontrolled.",name:"defaultValue",type:"string[]"},{default:'"md"',description:"Size applied to every checkbox in the group.",name:"size",type:'"sm" | "md" | "lg"'},{default:"false",description:"Disables every checkbox in the group.",name:"disabled",type:"boolean"},{default:"false",description:"Applies the bordered card to every item.",name:"bordered",type:"boolean"},{default:'"vertical"',description:"Layout: a stacked column, or a wrapping row with wider gaps.",name:"variant",type:'"vertical" | "horizontal"'},{default:"false",description:"Marks the group and every box invalid.",name:"error",type:"boolean"},{description:"Error text under the group; implies error.",name:"errorMessage",type:"React.ReactNode"},{description:"Fires with the whole selection after a toggle.",name:"onChange",type:"(value: string[]) => void"}],r=[{description:"Crisp and light.",label:"Apple",value:"apple"},{description:"Naturally wrapped.",label:"Banana",value:"banana"},{description:"Small and tart.",label:"Cherry",value:"cherry"},{description:"Notoriously pungent.",disabled:!0,label:"Durian (out of stock)",value:"durian"}],j=[{label:"Café da manhã",value:"breakfast"},{label:"Late checkout",value:"late-checkout"},{disabledReason:"Disponível no plano Pro",label:"Traslado do aeroporto",value:"transfer"}],y=[{label:"E-mail",value:"email"},{label:"WhatsApp",value:"whatsapp"},{label:"SMS",value:"sms"}],k=`import { Checkbox } from '@turystack/react-web'
import { useState } from 'react'

// Single, controlled
function Terms() {
  const [accepted, setAccepted] = useState(false)

  return (
    <Checkbox
      checked={accepted}
      label="I accept the terms"
      onChange={setAccepted}
    />
  )
}

// Single, uncontrolled
<Checkbox defaultChecked label="Remember me" />

// Sizes
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />

// Description, border, disabled
<Checkbox description="Sent once a week." label="Newsletter" />
<Checkbox bordered description="Sent once a week." label="Newsletter" />
<Checkbox disabled label="Locked" />

// A group — onChange receives the whole selection
function Basket() {
  const [picked, setPicked] = useState<string[]>(['apple'])

  return (
    <Checkbox.Group
      items={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { disabled: true, label: 'Durian', value: 'durian' },
      ]}
      onChange={setPicked}
      value={picked}
    />
  )
}

// Horizontal layout
<Checkbox.Group items={items} variant="horizontal" />

// Uncontrolled group
<Checkbox.Group defaultValue={['apple']} items={items} />

// size and bordered reach every item; description is per item
<Checkbox.Group bordered items={items} size="lg" />

// Select-all: a box with no visible label, mixed while some are ticked
<Checkbox
  ariaLabel="Selecionar todos os hóspedes"
  checked={all}
  indeterminate={some && !all}
  onChange={(next) => setSelected(next ? guests.map((g) => g.id) : [])}
/>

// Validation — errorMessage implies error and is the box's description
<Checkbox label="I accept the terms" errorMessage={errors.terms} />

// An invalid group: name it, and the message renders once under it
<Checkbox.Group
  ariaLabel="Canais de aviso"
  errorMessage="Escolha pelo menos um canal."
  items={channels}
/>`,p=[{id:"ana",name:"Ana Silva"},{id:"bruno",name:"Bruno Costa"},{id:"carla",name:"Carla Mendes"}];function v(){const[l,c]=n.useState(["bruno"]),i=l.length===p.length,m=l.length>0;return e.jsxs("div",{className:"w-full max-w-xs rounded-lg border border-border",children:[e.jsxs("div",{className:"flex items-center gap-3 border-border border-b px-4 py-2.5",children:[e.jsx(s,{ariaLabel:"Selecionar todos os hóspedes",checked:i,indeterminate:m&&!i,onChange:t=>c(t?p.map(o=>o.id):[])}),e.jsxs("span",{className:"font-medium text-sm",children:["Hóspedes · ",l.length," de ",p.length]})]}),p.map(t=>e.jsxs("div",{className:"flex items-center gap-3 px-4 py-2.5",children:[e.jsx(s,{ariaLabel:`Selecionar ${t.name}`,checked:l.includes(t.id),onChange:o=>c(d=>o?[...d,t.id]:d.filter(x=>x!==t.id))}),e.jsx("span",{className:"text-sm",children:t.name})]},t.id))]})}function L(){const[l,c]=n.useState(!1),[i,m]=n.useState(["apple"]),[t,o]=n.useState(!1),[d,x]=n.useState([]);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Form"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Checkbox"}),e.jsxs("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:["A boolean field; as"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-sm",children:"Checkbox.Group"})," ","it is a multi-select."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(h,{props:f})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Checkbox.Group props"}),e.jsx(h,{props:g})]}),e.jsx(b,{slug:"checkbox"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sizes"}),e.jsx(a,{title:"sm, md and lg",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{defaultChecked:!0,label:"Small",size:"sm"}),e.jsx(s,{defaultChecked:!0,label:"Medium",size:"md"}),e.jsx(s,{defaultChecked:!0,label:"Large",size:"lg"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"State"}),e.jsx(a,{title:"Controlled",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx(s,{checked:l,label:"I accept the terms",onChange:c}),e.jsxs("span",{className:"text-muted-foreground text-sm",children:["checked: ",String(l)]})]})}),e.jsx(a,{title:"Uncontrolled — defaultChecked",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{label:"Starts empty"}),e.jsx(s,{defaultChecked:!0,label:"Starts ticked"})]})}),e.jsx(a,{title:"Disabled",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(s,{disabled:!0,label:"Disabled, empty"}),e.jsx(s,{defaultChecked:!0,disabled:!0,label:"Disabled, ticked"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled with a reason"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"disabledReason"})," ","blocks a box but keeps it focusable; hover or focus it to read why."]}),e.jsx(a,{title:"One extra locked by the plan",children:e.jsx(s.Group,{ariaLabel:"Extras da reserva",defaultValue:["breakfast"],items:j})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Mixed state, and a box without a label"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"indeterminate"})," ","draws a dash and wins over"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"checked"}),"; label-less boxes take"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"ariaLabel"}),"."]}),e.jsx(a,{title:"A select-all with indeterminate and ariaLabel",children:e.jsx(v,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Description"}),e.jsx(a,{title:"With and without",children:e.jsxs("div",{className:"flex max-w-sm flex-col gap-4",children:[e.jsx(s,{label:"Newsletter"}),e.jsx(s,{description:"One email a week, and nothing else. Unsubscribe any time.",label:"Newsletter"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Bordered"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"bordered"})," ","also stretches the row to the full width of its container, so give it a parent with a width you want."]}),e.jsx(a,{title:"bordered, alone and with a description",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-3",children:[e.jsx(s,{bordered:!0,label:"Standard delivery"}),e.jsx(s,{bordered:!0,defaultChecked:!0,description:"Arrives tomorrow before noon.",label:"Express delivery"}),e.jsx(s,{bordered:!0,description:"Not available for this address.",disabled:!0,label:"Same-day delivery"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Group"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"size"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"bordered"})," ","reach every item; description and disabled are per item."]}),e.jsx(a,{title:"Controlled — vertical (the default)",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx(s.Group,{items:r,onChange:m,value:i}),e.jsxs("span",{className:"text-muted-foreground text-sm",children:["value: [",i.join(", "),"]"]})]})}),e.jsx(a,{title:"horizontal",children:e.jsx(s.Group,{defaultValue:["banana"],items:r,variant:"horizontal"})}),e.jsx(a,{title:"Uncontrolled — defaultValue",children:e.jsx(s.Group,{defaultValue:["apple","cherry"],items:r})}),e.jsx(a,{title:"size, forwarded to every item",children:e.jsx(s.Group,{items:r,size:"lg"})}),e.jsx(a,{title:"bordered, forwarded to every item",children:e.jsx("div",{className:"w-full max-w-sm",children:e.jsx(s.Group,{bordered:!0,items:r})})}),e.jsx(a,{title:"The whole group disabled",children:e.jsx(s.Group,{defaultValue:["apple"],disabled:!0,items:r})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Validation"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"errorMessage"})," ","implies"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"error"}),"; it renders under the box, or once under a group."]}),e.jsx(a,{title:"A required checkbox",children:e.jsx(s,{checked:t,errorMessage:t?void 0:"Aceite os termos para continuar.",label:"Li e aceito os termos de uso",onChange:o})}),e.jsx(a,{title:"An invalid group — named with ariaLabel",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"font-medium text-sm",children:"Canais de aviso"}),e.jsx(s.Group,{ariaLabel:"Canais de aviso",errorMessage:d.length===0?"Escolha pelo menos um canal.":void 0,items:y,onChange:x,value:d,variant:"horizontal"})]})}),e.jsx(a,{title:"error without a message",children:e.jsx(s,{error:!0,label:"Only the border and ring turn destructive"})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(u,{code:k,filename:"example.tsx",language:"tsx"})]})]})}export{L as component};
