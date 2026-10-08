import{j as e,b1 as s,aa as i,b2 as p,a3 as r,b3 as x,b4 as u,aO as g}from"./index-CQ2_D3U_.js";import{C as l}from"./CodeBlock-ftRQod4w.js";import{C as n}from"./ComponentPreview-x9-jqN-p.js";import{P as o}from"./PropsTable-CmvKG47z.js";import{S as b}from"./SlotsTable-DcNRogj3.js";import{P as d}from"./package-LU1DE_tN.js";import{P as c}from"./plus-CnCrY8zU.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const j=[{description:"The column holding the parts; renders no landmark.",name:"children",type:"React.ReactNode"}],y=[{description:"What this page is. Rendered as the heading.",name:"title",required:!0,type:"React.ReactNode"},{description:"Mark beside the title, in a 40px tinted square.",name:"icon",type:"React.ReactNode"},{description:"One line under the title. Omitted entirely when not given.",name:"description",type:"React.ReactNode"},{description:"Primary action at the row’s end; wraps under the title.",name:"action",type:"React.ReactNode"},{description:"Trail above the title; the last step is the current page.",name:"breadcrumbs",type:"Array<{ label: React.ReactNode; href?: string }>"},{description:"DOM id on the header, an in-page anchor target.",name:"id",type:"string"}],f=[{description:"The filters. Sits between the header and the body.",name:"children",type:"React.ReactNode"},{description:"DOM id on the toolbar, the target of an in-page anchor link.",name:"id",type:"string"}],P=[{description:"The body: the table, the cards, the screen’s subject.",name:"children",type:"React.ReactNode"},{description:"DOM id on the block, an in-page anchor target.",name:"id",type:"string"}],N=`import { Page, Search, Table } from '@turystack/react-web'

// src/routes/_app/orders.tsx — the route owns the router, nothing else does
export const Route = createFileRoute('/_app/orders')({
  component: OrdersPage,
  validateSearch: (raw) => listOrdersQueryParamsSchema.parse(raw),
})

function OrdersPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  function handleSearchChange(nextSearch: ListOrdersQueryParams) {
    navigate({ search: nextSearch })
  }

  function handleSelect(order: Order) {
    navigate({ params: { orderId: order.order_id }, to: '/orders/$orderId' })
  }

  return (
    <Page>
      <Page.Header
        action={<Button>New order</Button>}
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Orders' }]}
        description="Every order, across every channel."
        icon={<Package />}
        title="Orders"
      />
      <Page.Toolbar>
        {/* the search goes down whole — the toolbar does not know Route exists */}
        <OrdersToolbar onSearchChange={handleSearchChange} value={search} />
      </Page.Toolbar>
      <Page.Content>
        <OrderList onSelect={handleSelect} params={search} />
      </Page.Content>
    </Page>
  )
}`,v=`import { AnchorNav, Page } from '@turystack/react-web'

const sections = [
  { id: 'items', label: 'Itens' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'activity', label: 'Histórico' },
]

<Page>
  <Page.Header id="summary" title="Pedido #4812" />
  <Page.Content id="items"><OrderItems /></Page.Content>
  <Page.Content id="payment"><Payment /></Page.Content>
  <Page.Content id="activity"><Activity /></Page.Content>
</Page>

// Beside it, in a column the layout makes sticky
<AnchorNav items={sections} />`,h=[{id:"pedido-itens",label:"Itens",rows:[{label:"Aéreo",value:"GRU → LIS, 12 out"},{label:"Hotel",value:"Hotel Avenida Palace, 4 noites"},{label:"Hotel",value:"Pestana Vintage Porto, 3 noites"},{label:"Traslado",value:"Aeroporto ↔ hotel, ida e volta"}]},{id:"pedido-pagamento",label:"Pagamento",rows:[{label:"Forma",value:"Cartão de crédito, 10x"},{label:"Total",value:"R$ 13.780,00"},{label:"Situação",value:"Aprovado"}]},{id:"pedido-historico",label:"Histórico",rows:[{label:"24 set, 10:12",value:"Pedido criado pelo site"},{label:"24 set, 10:15",value:"Pagamento aprovado"},{label:"25 set, 09:40",value:"Vouchers enviados ao cliente"}]}],w=[{channel:"Web",id:"1042",status:"Paid",total:"R$ 1.240,00"},{channel:"Store",id:"1041",status:"Awaiting",total:"R$ 380,00"},{channel:"Web",id:"1040",status:"Shipped",total:"R$ 2.115,00"},{channel:"Partner",id:"1039",status:"Refunded",total:"R$ 90,00"}],R=[{key:"id",label:"Order",selector:t=>`#${t.id}`},{key:"channel",label:"Channel"},{key:"status",label:"Status",selector:t=>e.jsx(g,{size:"sm",children:t.status})},{align:"right",key:"total",label:"Total"}];function a({children:t}){return e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:t})}function L(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Layout"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Page"}),e.jsxs("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:["The inside of a shell: what a route renders into"," ",e.jsx(a,{children:"Layout.Content"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(a,{children:"Page"})," — the column."]}),e.jsx(o,{props:j}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(a,{children:"Page.Header"})," — the only part with props, because its arrangement is fixed."]}),e.jsx(o,{props:y}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(a,{children:"Page.Toolbar"})," — a slot: children, plus an id."]}),e.jsx(o,{props:f}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(a,{children:"Page.Content"})," — a slot: children, plus an id."]}),e.jsx(o,{props:P})]}),e.jsx(b,{slug:"page"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Playground"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"One screen, whole: trail, identity, action, filters, body."}),e.jsx(n,{className:"block items-stretch p-6",title:"A list screen",children:e.jsx("div",{className:"rounded-lg border border-border p-6",children:e.jsxs(s,{children:[e.jsx(s.Header,{action:e.jsxs(i,{size:"sm",children:[e.jsx(c,{}),"New order"]}),breadcrumbs:[{href:"#operations",label:"Operations"},{label:"Orders"}],description:"Every order, across every channel.",icon:e.jsx(d,{}),title:"Orders"}),e.jsx(s.Content,{children:e.jsx(p,{columns:R,itemKey:"id",items:w})})]})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"When the row runs out of room"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The header row wraps: when the title block can’t keep about 16rem, the action moves under the title."}),e.jsx(n,{className:"block items-stretch p-6",title:"The same header in a 22rem column",children:e.jsx("div",{className:"max-w-88 rounded-lg border border-border p-6",children:e.jsx(s.Header,{action:e.jsxs(i,{size:"sm",children:[e.jsx(c,{}),"New order"]}),description:"Every order, across every channel.",icon:e.jsx(d,{}),title:"Orders"})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sections you can link to"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Each ",e.jsx(a,{children:"Page.Content"})," takes an ",e.jsx(a,{children:"id"}),", so the block itself is an ",e.jsx(a,{children:"AnchorNav"})," or ",e.jsx(a,{children:"#pagamento"})," target."]}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["This frame scrolls itself, so the nav uses ",e.jsx(a,{children:'offset="none"'})," ","and no scroll spy. Click a section."]}),e.jsx(n,{title:"Order detail: one Page.Content per section",children:e.jsx("div",{className:"h-96 w-full max-w-3xl overflow-y-auto rounded-lg bg-background ring-1 ring-foreground/10",children:e.jsxs("div",{className:"grid grid-cols-[minmax(0,1fr)_9rem] gap-6 p-6",children:[e.jsxs(s,{children:[e.jsx(s.Header,{description:"Lisboa e Porto — 2 adultos, 7 noites",id:"pedido-resumo",title:"Pedido #4812"}),h.map(t=>e.jsx(s.Content,{id:t.id,children:e.jsxs(r,{children:[e.jsx(r.Header,{bordered:!0,children:e.jsx(r.Title,{children:t.label})}),e.jsx(r.Content,{children:e.jsx(x,{items:t.rows,layout:"inline"})})]})},t.id))]}),e.jsx("aside",{children:e.jsx("div",{className:"sticky top-0",children:e.jsx(u,{ariaLabel:"Seções do pedido",items:[{id:"pedido-resumo",label:"Resumo"},...h.map(({id:t,label:m})=>({id:t,label:m}))],offset:"none",scrollSpy:!1})})})]})})}),e.jsx(l,{code:v,filename:"order-detail.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(l,{code:N,filename:"orders.tsx",language:"tsx"})]})]})}export{L as component};
