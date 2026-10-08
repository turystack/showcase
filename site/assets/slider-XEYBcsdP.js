import{F as s,j as e,az as a}from"./index-B7Ig6kNO.js";import{C as p}from"./CodeBlock-jMISp3qZ.js";import{C as t}from"./ComponentPreview-BlMdAug8.js";import{P as g}from"./PropsTable-r9MRwph6.js";import{S as f}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const j=[{description:"One thumb (a number) or two thumbs (a [min, max] tuple).",name:"mode",required:!0,type:'"single" | "range"'},{description:"Which way the track runs; vertical needs a sized parent.",name:"orientation",required:!0,type:'"horizontal" | "vertical"'},{default:'"md"',description:"Thickness of the track and diameter of the thumb.",name:"size",type:'"sm" | "md" | "lg"'},{default:"false",description:"Prevents dragging and keyboard changes, and dims the track.",name:"disabled",type:"boolean"},{description:"Names the thumb (single) or the group (range).",name:"ariaLabel",type:"string"},{default:"0",description:"Lower bound of the scale.",name:"min",type:"number"},{default:"100",description:"Upper bound of the scale.",name:"max",type:"number"},{default:"1",description:"Increment per arrow-key press, and the grid a drag snaps to.",name:"step",type:"number"},{description:"Formats a value as its spoken text (aria-valuetext).",name:"formatValue",type:"(value: number) => string"},{default:"false",description:"Prints the formatted value above the track.",name:"showValue",type:"boolean"},{description:"Controlled position. A number in single mode.",name:"value",type:"number (single) | [number, number] (range)"},{description:"Initial position when uncontrolled.",name:"defaultValue",type:"number (single) | [number, number] (range)"},{description:"Fires on drag and arrow keys with the new value.",name:"onValueChange",type:"(value: number) => void (single) | (value: [number, number]) => void (range)"}],b=`import { Slider } from '@turystack/react-web'
import { useState } from 'react'

// A price filter — the scale, the unit, and a name
const brl = (value: number) => \`R$ \${value.toLocaleString('pt-BR')}\`

function PriceRange() {
  const [price, setPrice] = useState<[number, number]>([300, 1200])

  return (
    <Slider
      ariaLabel="Faixa de preço por noite"
      formatValue={brl}
      max={2000}
      min={0}
      mode="range"
      onValueChange={setPrice}
      orientation="horizontal"
      showValue
      step={50}
      value={price}
    />
  )
}

function Volume() {
  const [level, setLevel] = useState(40)

  return (
    <Slider
      mode="single"
      onValueChange={setLevel}
      orientation="horizontal"
      value={level}
    />
  )
}

function PriceFilter() {
  const [range, setRange] = useState<[number, number]>([20, 80])

  return (
    <Slider
      mode="range"
      onValueChange={setRange}
      orientation="horizontal"
      value={range}
    />
  )
}

// Uncontrolled
<Slider defaultValue={30} mode="single" orientation="horizontal" />
<Slider defaultValue={[10, 60]} mode="range" orientation="horizontal" />

// Sizes
<Slider defaultValue={50} mode="single" orientation="horizontal" size="sm" />
<Slider defaultValue={50} mode="single" orientation="horizontal" size="md" />
<Slider defaultValue={50} mode="single" orientation="horizontal" size="lg" />

// Vertical — the parent has to give it a height
<div className="h-56">
  <Slider defaultValue={40} mode="single" orientation="vertical" />
</div>

// Disabled
<Slider defaultValue={30} disabled mode="single" orientation="horizontal" />`,i=n=>`R$ ${n.toLocaleString("pt-BR")}`;function k(){const[n,o]=s.useState(40),[r,d]=s.useState([300,1200]),[m,c]=s.useState(800),[l,u]=s.useState([20,80]),[x,h]=s.useState(60);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Form"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Slider"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A draggable track for picking a number, or a pair of numbers."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(g,{props:j})]}),e.jsx(f,{slug:"slider"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Modes"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The mode decides the shape of the value and nothing else about the call."}),e.jsx(t,{title:"single — one thumb, one number",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-3",children:[e.jsx(a,{mode:"single",onValueChange:o,orientation:"horizontal",value:n}),e.jsxs("span",{className:"text-center text-muted-foreground text-sm",children:["value: ",n]})]})}),e.jsx(t,{title:"range — two thumbs, a tuple",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-3",children:[e.jsx(a,{mode:"range",onValueChange:u,orientation:"horizontal",value:l}),e.jsxs("span",{className:"text-center text-muted-foreground text-sm",children:["value: [",l[0],", ",l[1],"]"]})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Scale, unit and name"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"min"}),","," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"max"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"step"})," ","set the scale;"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"formatValue"})," ","sets the spoken and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"showValue"})," ","the printed value."]}),e.jsx(t,{title:"Price range per night — R$ 0 to R$ 2.000, step 50",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-2",children:[e.jsx("span",{className:"font-medium text-sm",children:"Preço por noite"}),e.jsx(a,{ariaLabel:"Faixa de preço por noite",formatValue:i,max:2e3,min:0,mode:"range",onValueChange:d,orientation:"horizontal",showValue:!0,step:50,value:r})]})}),e.jsx(t,{title:"Single — a maximum budget",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-2",children:[e.jsx("span",{className:"font-medium text-sm",children:"Orçamento máximo"}),e.jsx(a,{ariaLabel:"Orçamento máximo",formatValue:i,max:2e3,min:100,mode:"single",onValueChange:c,orientation:"horizontal",showValue:!0,step:100,value:m})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sizes"}),e.jsx(t,{title:"sm, md and lg — single",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-8",children:[e.jsx(a,{defaultValue:30,mode:"single",orientation:"horizontal",size:"sm"}),e.jsx(a,{defaultValue:50,mode:"single",orientation:"horizontal",size:"md"}),e.jsx(a,{defaultValue:70,mode:"single",orientation:"horizontal",size:"lg"})]})}),e.jsx(t,{title:"sm, md and lg — range",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-8",children:[e.jsx(a,{defaultValue:[10,40],mode:"range",orientation:"horizontal",size:"sm"}),e.jsx(a,{defaultValue:[20,60],mode:"range",orientation:"horizontal",size:"md"}),e.jsx(a,{defaultValue:[30,80],mode:"range",orientation:"horizontal",size:"lg"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Orientation"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A vertical slider fills its parent's height, so wrap it in something sized."}),e.jsx(t,{title:"vertical — single and range",children:e.jsxs("div",{className:"flex h-56 items-stretch gap-16",children:[e.jsx(a,{mode:"single",onValueChange:h,orientation:"vertical",value:x}),e.jsx(a,{defaultValue:[25,75],mode:"range",orientation:"vertical"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Uncontrolled"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Drop"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"value"})," ","and the slider keeps its own position from"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"defaultValue"}),". These two still move even though nothing on this page is listening."]}),e.jsx(t,{title:"defaultValue only",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-8",children:[e.jsx(a,{defaultValue:30,mode:"single",orientation:"horizontal"}),e.jsx(a,{defaultValue:[10,60],mode:"range",orientation:"horizontal"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled"}),e.jsx(t,{title:"disabled — single and range",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-8",children:[e.jsx(a,{defaultValue:30,disabled:!0,mode:"single",orientation:"horizontal"}),e.jsx(a,{defaultValue:[20,70],disabled:!0,mode:"range",orientation:"horizontal"})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(p,{code:b,filename:"example.tsx",language:"tsx"})]})]})}export{k as component};
