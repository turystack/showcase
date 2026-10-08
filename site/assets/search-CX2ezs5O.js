import{j as e,U as A,F as m,ay as R,aE as r,aF as y,aG as k,aH as L,aI as O,aD as q}from"./index-B7Ig6kNO.js";import{C as h}from"./CodeBlock-jMISp3qZ.js";import{C as d}from"./ComponentPreview-BlMdAug8.js";import{P as u}from"./PropsTable-r9MRwph6.js";import{S as V}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const E=[{description:"The debounced query field (table below).",name:"filter",type:"SearchFilterProps"},{description:"The filters, each saying where it lives.",name:"items",type:"SearchItems<T>[]"},{description:"Current values by item id; read to count active filters.",name:"value",type:"T"},{description:"Clears filters and query; disabled while nothing to clear.",name:"onReset",type:"() => void"},{default:'"bar"',description:"bar for a list screen; grid lays items out as a form.",name:"variant",type:'"bar" | "grid"'},{default:"2",description:"Grid only: cells per row, by the grid’s own width.",name:"columns",type:"1 | 2 | 3 | 4"}],F=[{description:"The query, controlled.",name:"value",type:"string | null"},{description:"The initial query, when the bar owns it.",name:"defaultValue",type:"string | null"},{description:"Fires with the query, debounced.",name:"onChange",type:"(value: string | null) => void"},{default:"labels.search.placeholder",description:"The hint inside the empty field.",name:"placeholder",type:"string"},{default:"the placeholder’s words",description:"The field’s accessible name; defaults to its placeholder.",name:"ariaLabel",type:"string"},{default:"false",description:"Shows the field’s own loader while a search is in flight.",name:"loading",type:"boolean"}],D=[{description:"A key of value. Names which entry this field is about.",name:"id",required:!0,type:"keyof T & string"},{description:"The control itself. It carries its own placeholder.",name:"field",required:!0,type:"React.ReactNode"},{default:'"inline"',description:"Where it lives: the first row, Show more, or a popover.",name:"placement",type:'"inline" | "popover" | "expand"'},{description:"Beside the field on a row; required above it in a popover.",name:"label",type:"React.ReactNode"},{description:"Overrides the emptiness rule for this field.",name:"isActive",type:"(value: T[K]) => boolean"}],W=`// src/features/orders/components/orders-toolbar/orders-toolbar.tsx
import { Search, Select, Switch } from '@turystack/react-web'

export function OrdersToolbar({ onSearchChange, value }: OrdersToolbarProps) {
  // one callback, always the complete object — the page reset lives in the merge
  function change(next: Partial<ListOrdersQueryParams>) {
    onSearchChange({ ...value, ...next, page: 1 })
  }

  function handleQueryChange(term: string | null) {
    change({ search: term ?? undefined })
  }

  function handleStatusChange(next: string[]) {
    change({ status: next.length > 0 ? next.join(',') : undefined })
  }

  function handleArchivedChange(archived: boolean) {
    change({ archived: archived || undefined })
  }

  function handleReset() {
    onSearchChange({ page: 1, perPage: value.perPage })
  }

  return (
    <Search
      filter={{
        // named by the placeholder's words unless ariaLabel says otherwise
        ariaLabel: 'Search orders',
        onChange: handleQueryChange,
        placeholder: 'Search by code or customer',
        value: value.search,
      }}
      items={[
        {
          id: 'status',
          field: (
            <Select
              ariaLabel="Status" // a placeholder is not an accessible name
              mode="multiple"
              onChange={handleStatusChange}
              options={STATUS_OPTIONS}
              placeholder="Filter by status"
              value={value.status?.split(',')}
            />
          ),
        },
        {
          id: 'archived',
          placement: 'popover',
          label: 'Archived',
          field: (
            <Switch checked={value.archived ?? false} onChange={handleArchivedChange} />
          ),
        },
      ]}
      onReset={handleReset}
      value={value}
    />
  )
}`,_=`// A form's filter section — inside a modal, a sheet, a card
<Search
  columns={3}                      // cells per row once the grid is wide enough
  items={[
    { id: 'guest', label: 'Guest', field: <Input onChange={setGuest} value={criteria.guest} /> },
    { id: 'status', label: 'Status', field: <Select mode="single" … /> },
    { id: 'checkIn', label: 'Check-in', field: <DateRangeInput … /> },
  ]}
  onReset={reset}                  // Reset, in a footer under the cells
  value={criteria}
  variant="grid"
/>`,G=`// A route's search is not only filters:
{
  "page": 1,                   // no item -> invisible to the count
  "perPage": 20,               // no item -> invisible
  "sort": "-created_at",        // no item -> invisible
  "search": "acme",            // the query field, not a filter
  "status": "paid,pending",    // item -> counts
  "channelId": null,           // item -> does not
  "archived": true             // item -> counts
}
// 2 set, 1 of them in the popover. Badge reads 1. Reset enables.

// Only what you declared as an item can count. Counting every key of
// value would report three filters to someone who set none.`,j=[{label:"Paid",value:"paid"},{label:"Awaiting",value:"awaiting"},{label:"Refunded",value:"refunded"}],w=[{label:"Web",value:"web"},{label:"Store",value:"store"},{label:"Partner",value:"partner"}],p=[{label:"High",value:"high"},{label:"Normal",value:"normal"}],g={archived:!1,channelId:null,page:1,perPage:20,priority:null};function i({children:s}){return e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:s})}function b({overflow:s}){const[a,o]=m.useState(g);function l(n){o(I=>({...I,...n,page:1}))}function t(n){l({search:n??void 0})}function c(n){l({status:n.length>0?n.join(","):void 0})}function S(n){l({channelId:n})}function N(n){l({archived:n})}function f(n){l({priority:n})}function P(){o(g)}const x=e.jsx(R,{checked:a.archived,onCheckedChange:N}),T=s==="popover"?[{field:x,id:"archived",label:"Archived",placement:"popover"},{field:e.jsx(r,{mode:"single",onChange:f,optionLabel:"label",options:p,optionValue:"value",placeholder:"Any",value:a.priority}),id:"priority",label:"Priority",placement:"popover"}]:[{field:x,id:"archived",label:"Archived",placement:"expand"},{field:e.jsx(r,{ariaLabel:"Priority",mode:"single",onChange:f,optionLabel:"label",options:p,optionValue:"value",placeholder:"Any priority",value:a.priority}),id:"priority",placement:"expand"}];return e.jsx(y,{filter:{onChange:t,placeholder:"Search by code or customer",value:a.search},items:[{field:e.jsx(r,{ariaLabel:"Status",mode:"multiple",onChange:c,optionLabel:"label",options:j,optionValue:"value",placeholder:"Filter by status",value:a.status?.split(",")}),id:"status"},{field:e.jsx(r,{ariaLabel:"Channel",mode:"single",onChange:S,optionLabel:"label",options:w,optionValue:"value",placeholder:"Filter by channel",value:a.channelId}),id:"channelId"},...T],onReset:P,value:a})}const v={channel:null,checkIn:null,guest:null,minimum:null,priority:null,status:null};function C({columns:s}){const[a,o]=m.useState(v);function l(t){o(c=>({...c,...t}))}return e.jsx(y,{columns:s,items:[{field:e.jsx(k,{onChange:t=>l({guest:t}),placeholder:"Any guest",value:a.guest}),id:"guest",label:"Guest"},{field:e.jsx(r,{mode:"single",onChange:t=>l({status:t}),optionLabel:"label",options:j,optionValue:"value",placeholder:"Any status",value:a.status}),id:"status",label:"Status"},{field:e.jsx(L,{onChange:t=>l({checkIn:t}),value:a.checkIn}),id:"checkIn",label:"Check-in"},{field:e.jsx(O,{onChange:t=>l({minimum:t}),value:a.minimum}),id:"minimum",label:"Minimum total"},{field:e.jsx(r,{mode:"single",onChange:t=>l({channel:t}),optionLabel:"label",options:w,optionValue:"value",placeholder:"Any channel",value:a.channel}),id:"channel",label:"Channel"},{field:e.jsx(r,{mode:"single",onChange:t=>l({priority:t}),optionLabel:"label",options:p,optionValue:"value",placeholder:"Any priority",value:a.priority}),id:"priority",label:"Priority"}],onReset:()=>o(v),value:a,variant:"grid"})}const B=[{label:"360px",value:"360"},{label:"512px",value:"512"},{label:"768px",value:"768"}];function H(){const[s,a]=m.useState("768");return e.jsxs("div",{className:"flex w-full flex-col items-center gap-4",children:[e.jsx(q,{ariaLabel:"Width of the box around the grid",onChange:o=>a(o),optionLabel:"label",options:B,optionValue:"value",size:"sm",value:s}),e.jsx("div",{className:"max-w-full rounded-lg border border-border border-dashed p-4",style:{width:Number(s)},children:e.jsx(C,{columns:3})})]})}function Z(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Layout"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Search"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A list’s filter bar, or a form’s filter section as a grid."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(u,{props:E}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(i,{children:"SearchFilterProps"}),": the query field, named by"," ",e.jsx(i,{children:"ariaLabel"})," or its placeholder."]}),e.jsx(u,{props:F}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(i,{children:"SearchItems"})," — one filter. A union on the"," ",e.jsx(i,{children:"placement"}),", so the label rule is the compiler's to keep."]}),e.jsx(u,{props:D})]}),e.jsx(V,{slug:"search"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Playground"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Every filter has a fixed width, so filling one moves nothing."," ",e.jsx(i,{children:"Reset"})," stays in place, disabled until needed."]}),e.jsx(d,{className:"min-h-44",title:"the overflow behind a Filters popover",children:e.jsx("div",{className:"w-full max-w-4xl",children:e.jsx(b,{overflow:"popover"})})}),e.jsx(d,{className:"min-h-44",title:"the overflow on a second row",children:e.jsx("div",{className:"w-full max-w-4xl",children:e.jsx(b,{overflow:"expand"})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"As a form’s filter section"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(i,{children:'variant="grid"'})," makes each item a labelled cell; Reset moves to a footer. It is how"," ",e.jsx(A,{className:"text-lib underline underline-offset-4",to:"/libs/react-web/components/data-transfer-export",children:"DataTransferExport"})," ","draws its filters."]}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsxs(i,{children:["columns=","{2}"]}),", the default: two fields per row. The box is as wide as an ",e.jsx(i,{children:"md"})," modal."]}),e.jsx(d,{title:'variant="grid" columns={2}, in a md modal’s width',children:e.jsx("div",{className:"w-full max-w-lg rounded-lg border border-border border-dashed p-4",children:e.jsx(C,{columns:2})})}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Columns follow the box’s width, not the window’s: one under 384px, two from there, three from 672px."}),e.jsx(d,{title:'variant="grid" columns={3}, in a box you size',children:e.jsx(H,{})}),e.jsx(h,{code:_,filename:"booking-filters.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What counts"}),e.jsx(h,{code:G,filename:"counting.jsonc",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(h,{code:W,filename:"orders-toolbar.tsx",language:"tsx"})]})]})}export{Z as component};
