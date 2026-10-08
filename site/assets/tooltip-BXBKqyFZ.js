import{E as o,j as e,ch as t,aa as n}from"./index-CQ2_D3U_.js";import{C as r}from"./CodeBlock-ftRQod4w.js";import{C as a}from"./ComponentPreview-x9-jqN-p.js";import{P as d}from"./PropsTable-CmvKG47z.js";import{S as c}from"./SlotsTable-DcNRogj3.js";import{T as x}from"./trash-2-lg75LUpI.js";import{I as h}from"./info-DnZUKm__.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const p=[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]],l=o("bold",p);const m=[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]],u=o("italic",m);const j=[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]],g=o("underline",j),f=[{description:"What the hint says; any node, markup included.",name:"content",required:!0,type:"React.ReactNode"},{default:'"top"',description:"Preferred side; flips when there is no room.",name:"side",type:'"top" | "right" | "bottom" | "left"'},{default:"4",description:"Gap between the trigger and the hint, in pixels.",name:"sideOffset",type:"number"},{default:"200",description:"Hover delay in ms; focus shows it at once.",name:"delayDuration",type:"number"}],y=`import { Button, Tooltip } from '@turystack/react-web'

<Tooltip content="Save changes">
  <Button ariaLabel="Save" size="icon-md"><Save /></Button>
</Tooltip>

// Placed, offset and instant
<Tooltip content="Delete" delayDuration={0} side="right" sideOffset={12}>
  <Button ariaLabel="Delete" size="icon-md" variant="ghost">
    <Trash2 />
  </Button>
</Tooltip>

// A node, not just a string
<Tooltip
  content={
    <span>
      Search · <kbd>⌘K</kbd>
    </span>
  }
>
  <Button variant="outline">Search</Button>
</Tooltip>

// A long, structured hint. The popup ships no prose styles — every gap,
// bullet and rule below is one this markup put there.
<Tooltip
  content={
    <div className="space-y-2 py-1">
      <p className="font-semibold text-sm">Rate limit — 1,000 requests/hour</p>
      <p className="leading-relaxed">
        Counted per API key over a rolling window. Anything over the limit
        is answered with 429 and a Retry-After header.
      </p>
      <p className="leading-relaxed">
        Bursts are tolerated:
        <br />
        up to 50 requests in any one second.
      </p>
      <ul className="list-disc space-y-0.5 pl-4 leading-relaxed">
        <li>Reads and writes share the budget.</li>
        <li>Webhook deliveries are not counted.</li>
      </ul>
    </div>
  }
  side="right"
>
  <Button variant="outline">Rate limits</Button>
</Tooltip>`,b=["top","right","bottom","left"];function i(){return e.jsxs("div",{className:"space-y-2 py-1",children:[e.jsx("p",{className:"font-semibold text-sm",children:"Rate limit — 1,000 requests/hour"}),e.jsxs("p",{className:"leading-relaxed",children:["Counted per API key over a rolling window. Over the limit:"," ",e.jsx("code",{className:"rounded-lg bg-background/20 px-1",children:"429"})," and a"," ",e.jsx("code",{className:"rounded-lg bg-background/20 px-1",children:"Retry-After"})," ","header."]}),e.jsxs("p",{className:"leading-relaxed",children:["Bursts are tolerated:",e.jsx("br",{}),"up to 50 requests in any single second, as long as the hourly total still holds."]}),e.jsxs("ul",{className:"list-disc space-y-0.5 pl-4 leading-relaxed",children:[e.jsx("li",{children:"Reads and writes share one budget."}),e.jsx("li",{children:"Webhook deliveries are not counted."}),e.jsxs("li",{children:["A ",e.jsx("code",{className:"rounded-lg bg-background/20 px-1",children:"429"})," does not consume quota."]})]}),e.jsxs("div",{className:"flex items-center justify-between gap-2 border-background/25 border-t pt-2",children:[e.jsx("span",{className:"opacity-70",children:"Raise it in Settings"}),e.jsx("kbd",{className:"rounded-lg bg-background/20 px-1",children:"⌘,"})]})]})}function S(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Overlays"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Tooltip"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A hint shown on hover or keyboard focus."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(d,{props:f})]}),e.jsx(c,{slug:"tooltip"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Placement"}),e.jsx(a,{title:"All four sides",children:e.jsx("div",{className:"flex flex-wrap items-center justify-center gap-3",children:b.map(s=>e.jsx(t,{content:`side="${s}"`,side:s,sideOffset:8,children:e.jsx(n,{variant:"outline",children:s})},s))})}),e.jsx(a,{title:"sideOffset — 0, 4 (default) and 20 px",children:e.jsx("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[0,4,20].map(s=>e.jsx(t,{content:`${s} px from the trigger`,sideOffset:s,children:e.jsxs(n,{variant:"outline",children:[s," px"]})},s))})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Delay"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The delay applies to hover only; tabbing to the trigger shows the hint at once."}),e.jsx(a,{title:"0 ms, 200 ms (default) and 1000 ms",children:e.jsx("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[0,200,1e3].map(s=>e.jsx(t,{content:`Appeared after ${s} ms`,delayDuration:s,children:e.jsxs(n,{variant:"outline",children:[s," ms"]})},s))})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Content"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["The hint is capped at"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"max-w-xs"})," ","and wraps. It describes, not names: an icon-only button still needs"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"ariaLabel"}),"."]}),e.jsx(a,{title:"A string, a node, and a long one",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[e.jsx(t,{content:"Delete permanently",children:e.jsx(n,{ariaLabel:"Delete",size:"icon-md",variant:"ghost",children:e.jsx(x,{})})}),e.jsx(t,{content:e.jsxs("span",{children:["Bold ·"," ",e.jsx("kbd",{className:"rounded-lg bg-background/20 px-1",children:"⌘B"})]}),children:e.jsx(n,{ariaLabel:"Bold",size:"icon-md",variant:"outline",children:e.jsx(l,{})})}),e.jsx(t,{content:"A hint long enough to reach the max width and wrap onto a second and then a third line.",children:e.jsx(n,{variant:"outline",children:"Long hint"})})]})}),e.jsx(a,{title:"A toolbar of icon buttons",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(t,{content:"Bold",children:e.jsx(n,{ariaLabel:"Bold",size:"icon-sm",variant:"ghost",children:e.jsx(l,{})})}),e.jsx(t,{content:"Italic",children:e.jsx(n,{ariaLabel:"Italic",size:"icon-sm",variant:"ghost",children:e.jsx(u,{})})}),e.jsx(t,{content:"Underline",children:e.jsx(n,{ariaLabel:"Underline",size:"icon-sm",variant:"ghost",children:e.jsx(g,{})})})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"A large, structured hint"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Nothing stops you passing a whole document:"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"content"})," ","is a node."]}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"What it does not do is help you."}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The harder limit is not visual."}),e.jsx(a,{title:"Heading, paragraphs, break, list and rule",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[e.jsx(t,{content:e.jsx(i,{}),side:"right",sideOffset:8,children:e.jsx(n,{variant:"outline",children:"Rate limits"})}),e.jsx(t,{content:e.jsx(i,{}),delayDuration:0,children:e.jsx(n,{variant:"secondary",children:"Same hint, on top, no delay"})}),e.jsx(t,{content:e.jsx(i,{}),side:"bottom",children:e.jsx(n,{ariaLabel:"About rate limits",size:"icon-md",variant:"ghost",children:e.jsx(h,{})})})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Notes"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Each Tooltip installs a provider of its own, so"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"delayDuration"})," ","is per tooltip; a second hint in a row does not open instantly."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(r,{code:y,filename:"example.tsx",language:"tsx"})]})]})}export{S as component};
