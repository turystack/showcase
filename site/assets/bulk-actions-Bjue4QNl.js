import{j as e,F as c,b2 as x,bM as m,aa as g,bg as j,bt as v,a5 as h,aG as N,aP as w}from"./index-B7Ig6kNO.js";import{C as k}from"./CodeBlock-jMISp3qZ.js";import{C as d}from"./ComponentPreview-BlMdAug8.js";import{P as p}from"./PropsTable-r9MRwph6.js";import{S}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const R=[{description:"The selection: keys, rows or ids (generic, default string).",name:"selection",required:!0,type:"T[]"},{description:"Actions to run on the selection.",name:"actions",required:!0,type:"BulkAction<T>[]"},{description:"Empties the selection (X, Escape, finished action).",name:"onClear",type:"() => void"},{default:"true",description:"Whether a successful action clears the selection.",name:"clearOnRun",type:"boolean"},{description:"Node beside the count; a function gets the selection.",name:"extra",type:"React.ReactNode | ((selection: T[]) => React.ReactNode)"},{default:"3",description:"Actions shown as buttons; the rest go in a menu.",name:"maxVisible",type:"number"},{description:"A node before the count: a thumbnail row, an avatar stack.",name:"leftSection",type:"React.ReactNode"},{default:'"bottom"',description:"Which edge the bar floats over. Floating placement only.",name:"position",type:'"bottom" | "top"'},{default:'"floating"',description:"floating Sheet over the page, or inline in the flow.",name:"placement",type:'"floating" | "inline"'},{description:"Blocks every action.",name:"disabled",type:"boolean"},{description:"The page is busy: the bar says so and refuses to run.",name:"loading",type:"boolean"}],C=[{description:"Stable identity, and the React key.",name:"id",required:!0,type:"string"},{description:"What the control says.",name:"label",required:!0,type:"string"},{description:"Runs the action with the selection and challenge input.",name:"onRun",required:!0,type:"(selection: T[], confirmation?: string) => void | Promise<void>"},{description:"Confirm dialog config, or a function of the selection.",name:"confirm",type:"BulkActionConfirm | ((selection: T[]) => BulkActionConfirm)"},{description:"A node before the label. Never an icon name.",name:"icon",type:"React.ReactNode"},{default:'"ghost"',description:"Visual weight. destructive for the ones that are.",name:"variant",type:"ButtonVariant"},{description:"Disables the action; a function reads the selection.",name:"disabled",type:"boolean | ((selection: T[]) => boolean)"},{description:"Blocks it and says why in a tooltip.",name:"disabledReason",type:"string | ((selection: T[]) => string | undefined)"},{description:"Absent from the bar entirely, rather than shown greyed.",name:"hidden",type:"boolean | ((selection: T[]) => boolean)"},{description:"Not held: blocked, with a permission-denied reason.",name:"permissionIds",type:"PermissionId[]"}],T=`import { BulkActions, Table } from '@turystack/react-web'

const [selectedKeys, setSelectedKeys] = useState<string[]>([])

const actions: BulkAction<string>[] = [
  {
    icon: <ArrowDownToLine />,
    id: 'export',
    label: 'Export',
    onRun: (ids) => exportBookings.mutateAsync({ ids }),
  },
  {
    // a function of the selection, so the dialog can count
    confirm: (ids) => ({
      content: <BookingSummary ids={ids} />,
      description: 'This cannot be undone.',
      mode: 'typed',
      confirmationValue: \`DELETE \${ids.length}\`,
      title: \`Delete \${ids.length} bookings?\`,
    }),
    icon: <Trash2 />,
    id: 'delete',
    label: 'Delete',
    permissionIds: ['booking:delete'],
    variant: 'destructive',
    // the typed text arrives here; a password or an OTP would too
    onRun: (ids, confirmation) =>
      deleteBookings.mutateAsync({ confirmation, ids }),
  },
]

<Table
  columns={columns}
  itemKey="id"
  items={bookings}
  onSelectionChange={setSelectedKeys}
  selectedKeys={selectedKeys}
  selection="multiple"
/>

<BulkActions
  actions={actions}
  onClear={() => setSelectedKeys([])}
  selection={selectedKeys}
/>

// extra is whatever else this bar has to say. Select-all is one thing you
// can put there — it is no longer the only thing the slot can hold.
<BulkActions
  actions={actions}
  extra={(selection) =>
    selection.length >= total ? (
      <span className="text-muted-foreground text-sm">All {total} selected</span>
    ) : (
      <Button onClick={selectEveryMatch} size="sm" variant="link">
        Select all {total}
      </Button>
    )
  }
  onClear={() => setSelectedKeys([])}
  selection={selectedKeys}
/>

// Inline — the toolbar row becomes the bar while something is selected
{selectedKeys.length > 0 ? (
  <BulkActions
    actions={actions}
    onClear={() => setSelectedKeys([])}
    placement="inline"
    selection={selectedKeys}
  />
) : (
  <Input placeholder="Buscar reserva" />
)}`,o=[{code:"TRY-1041",id:"1",price:128e3,status:"Confirmed"},{code:"TRY-1042",id:"2",price:39900,status:"Pending"},{code:"TRY-1043",id:"3",price:812e3,status:"Confirmed"}],f=[{key:"code",label:"Code"},{key:"status",label:"Status"},{key:"price",label:"Price",selector:s=>e.jsx(h,{value:s.price})}];function y(s){return[{id:"export",label:"Export",onRun:t=>s(`Exported ${t.length}`)},{id:"archive",label:"Archive",onRun:t=>s(`Archived ${t.length}`)},{id:"tag",label:"Tag",onRun:t=>s(`Tagged ${t.length}`)},{confirm:t=>({description:"This cannot be undone.",title:`Delete ${t.length} bookings?`}),id:"delete",label:"Delete",onRun:t=>s(`Deleted ${t.length}`),variant:"destructive"}]}function A(){const[s,t]=c.useState([]),[l,a]=c.useState(null),r=y(a);return e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsx(x,{columns:f,itemKey:"id",items:o,onSelectionChange:t,selectedKeys:s,selection:"multiple"}),e.jsxs("span",{className:"text-muted-foreground text-xs",children:["last run: ",l??"(nothing yet)"]}),e.jsx(m,{actions:r,extra:n=>n.length>=o.length?e.jsxs("span",{className:"text-muted-foreground text-sm",children:["All ",o.length," selected"]}):e.jsxs(g,{onClick:()=>t(o.map(i=>i.id)),size:"sm",variant:"link",children:["Select all ",o.length]}),maxVisible:2,onClear:()=>t([]),selection:s})]})}function B(){const[s,t]=c.useState([]),[l,a]=c.useState(null);function r(n,i){t(u=>i?[...u,n]:u.filter(b=>b.id!==n.id))}return e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsx(j,{divided:!0,itemKey:"id",items:o,renderItem:n=>e.jsxs("div",{className:"flex items-center gap-3 py-2 text-sm",children:[e.jsx(v,{checked:s.some(i=>i.id===n.id),label:n.code,onChange:i=>r(n,i===!0)}),e.jsx("span",{className:"flex-1"}),e.jsx(h,{muted:!0,size:"sm",value:n.price})]})}),e.jsxs("span",{className:"text-muted-foreground text-xs",children:["last run: ",l??"(nothing yet)"]}),e.jsx(m,{actions:[{id:"export",label:"Export",onRun:n=>a(n.map(i=>i.code).join(", "))},{disabled:n=>n.some(i=>i.status==="Pending"),id:"invoice",label:"Invoice",onRun:n=>a(`Invoiced ${n.length}`)}],leftSection:e.jsx(h,{value:s.reduce((n,i)=>n+i.price,0),weight:"semibold"}),onClear:()=>t([]),selection:s})]})}function K(){const[s,t]=c.useState(o.slice(0,2));return e.jsx(w,{permissions:[],children:e.jsx("div",{className:"flex min-h-12 w-full items-center",children:s.length>0?e.jsx("div",{className:"w-full",children:e.jsx(m,{actions:[{id:"export",label:"Exportar",onRun:()=>{}},{disabledReason:l=>l.some(a=>a.status==="Pending")?"Reservas pendentes não podem ser faturadas":void 0,id:"invoice",label:"Faturar",onRun:()=>{}},{id:"delete",label:"Excluir",onRun:()=>{},permissionIds:["booking:delete"],variant:"destructive"}],clearOnRun:!1,onClear:()=>t([]),placement:"inline",selection:s})}):e.jsx(g,{onClick:()=>t(o.slice(0,2)),size:"sm",variant:"outline",children:"Selecionar de novo"})})})}function E(){const[s,t]=c.useState(["1"]),[l,a]=c.useState(null),r=y(a);return e.jsxs("div",{className:"flex w-full flex-col gap-3",children:[e.jsx("div",{className:"flex min-h-12 items-center",children:s.length>0?e.jsx("div",{className:"w-full",children:e.jsx(m,{actions:r,maxVisible:2,onClear:()=>t([]),placement:"inline",selection:s})}):e.jsx(N,{ariaLabel:"Buscar reserva",placeholder:"Buscar reserva por código"})}),e.jsx(x,{columns:f,itemKey:"id",items:o,onSelectionChange:t,selectedKeys:s,selection:"multiple"}),e.jsxs("span",{className:"text-muted-foreground text-xs",children:["last run: ",l??"(nothing yet)"]})]})}function V(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Overlays"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"BulkActions"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A bar that shows up when a selection exists and offers what can be done to it — floating over the page, or inline in place of its toolbar."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(p,{props:R})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"BulkAction"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["One entry in"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"actions"}),". Everything that varies per action lives here rather than in the bar, so a screen adds a button by adding an object."]}),e.jsx(p,{props:C})]}),e.jsx(S,{slug:"bulk-actions"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"With a Table, which selects keys"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"Table"})," ","emits row keys through"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"onSelectionChange"}),", and those keys go straight in — the generic defaults to"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"string"})," ","for exactly this."]}),e.jsx(d,{title:"Table selection, keys in the bar",children:e.jsx(A,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"With a List, which selects nothing at all"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"List"})," ","has no selection of its own — the screen owns it, with whatever control fits the row."]}),e.jsx(d,{title:"Rows in the bar, and a running total",children:e.jsx(B,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Inline, in place of the toolbar"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'placement="inline"'})," ","draws the bar in the page flow, replacing the toolbar while rows are selected."," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"position"})," ","does not apply."]}),e.jsx(d,{title:"The search row becomes the bar",children:e.jsx(E,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled with a reason"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"disabledReason"})," ","can read the selection; a missing permission brings its own reason. Hover or focus to read it."]}),e.jsx(d,{title:"One reason from rows, one from permissions",children:e.jsx(K,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Confirmation belongs to the action"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"An action with confirm hands its whole run to Confirm: the dialog spins, refuses, and closes only on success."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(k,{code:T,filename:"example.tsx",language:"tsx"})]})]})}export{V as component};
