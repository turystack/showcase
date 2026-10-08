import{E as A,F as l,j as e,aa as b,b2 as i,aO as m,aK as c,bf as $,bn as U,ba as r}from"./index-B7Ig6kNO.js";import{C as h}from"./CodeBlock-jMISp3qZ.js";import{C as o}from"./ComponentPreview-BlMdAug8.js";import{P}from"./PropsTable-r9MRwph6.js";import{S as _}from"./SlotsTable-CHbQbO6v.js";import{I as T}from"./inbox-pwaC5tkX.js";import{X as J}from"./x-DkxbXzM3.js";import{E as X}from"./ellipsis-FQYLVToM.js";import{P as Z}from"./pencil-DG6m0zfO.js";import{a as Q}from"./copy-DmxgNTfX.js";import{T as Y}from"./trash-2-C7WQW_5Q.js";import"./highlight-XlOl9cwO.js";const ee=[["path",{d:"M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2",key:"1m57jg"}],["path",{d:"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14",key:"1l99gc"}],["path",{d:"M10 20h4",key:"ni2waw"}],["circle",{cx:"16",cy:"20",r:"2",key:"1vifvg"}],["circle",{cx:"8",cy:"20",r:"2",key:"ckkr5m"}]],te=A("luggage",ee);const se=[["path",{d:"M5 12h14",key:"1ays0h"}]],ae=A("minus",se),ie=[{description:"Column definitions (key, label, selector, width, sorter…).",name:"columns",required:!0,type:"TableColumns<T>"},{description:"Row field used as key for React and selection.",name:"itemKey",required:!0,type:"keyof T"},{description:"Rows to render, already sorted and paged.",name:"items",type:"T[]"},{default:'"none"',description:"multiple adds row checkboxes and a select-all box.",name:"selection",type:'"none" | "multiple"'},{description:"Names each row checkbox for screen readers.",name:"rowName",type:"(row: T) => string"},{description:"Controlled selection; reported via onSelectionChange.",name:"selectedKeys",type:"string[]"},{default:"[]",description:"Initial selection, read once (uncontrolled).",name:"defaultSelectedKeys",type:"string[]"},{description:"Current sort: key ascending, -key descending.",name:"sort",type:"string"},{description:"Config passed to the Pagination below the table.",name:"pagination",type:"PaginationProps"},{default:"false",description:"Keeps the pagination config but hides the control.",name:"hidePagination",type:"boolean"},{default:'"default"',description:"Row spacing; compact tightens padding and header.",name:"density",type:'"compact" | "default"'},{description:"Key of the row open elsewhere; sets aria-current.",name:"activeKey",type:"string | number"},{default:"false",description:"Overlays a LoadingOverlay; excludes outcome.",name:"loading",type:"boolean"},{description:"Remote-read state painted by the table; excludes items.",name:"outcome",type:"DataOutcome<T[]>"},{default:"3",description:"Skeleton rows drawn while an outcome is pending.",name:"loadingRows",type:"number"},{description:"Body content when there are no rows.",name:"emptySection",type:"React.ReactNode"},{description:"Replaces the body when the outcome is denied.",name:"deniedSection",type:"React.ReactNode"},{description:"Replaces the body when the outcome failed.",name:"errorSection",type:"React.ReactNode"},{description:"Minimum width in px; scrolls horizontally below it.",name:"layoutWidth",type:"number"},{description:"Fires with the row; ignores clicks on cell controls.",name:"onRowClick",type:"(row: T) => void"},{description:"Fires with the full list of selected keys after any change.",name:"onSelectionChange",type:"(value: string[]) => void"},{description:"Fires with the next sort when a header is clicked.",name:"onSortChange",type:"(sort?: string) => void"}],oe=[{description:"Column id; read off the row when there is no selector.",name:"key",required:!0,type:"string"},{description:"Header text. Nothing is rendered in the header without it.",name:"label",type:"string"},{description:"Renders the cell from the row and its index.",name:"selector",type:"(row: T, index: number) => React.ReactNode"},{default:'"left"',description:"Header and cell alignment; center suits a lone action.",name:"align",type:'"left" | "center" | "right"'},{description:"Column width, as a share of all widths.",name:"width",type:"number"},{default:"false",description:"Makes width exact pixels instead of a share.",name:"fixedWidth",type:"boolean"},{description:"Pins the column to the left or right edge on scroll.",name:"sticky",type:'"left" | "right"'},{default:"false",description:"Makes the header a sort button (needs onSortChange).",name:"sorter",type:"boolean"},{default:"false",description:"Removes the column: header, cells and colgroup.",name:"hide",type:"boolean"}],n=[{departure:"2026-03-12",id:"R-4821",passenger:"Ana Silva",route:"GRU → LIS",seats:2,status:"confirmada",total:4820.5},{departure:"2026-03-14",id:"R-4822",passenger:"Bruno Costa",route:"CGH → SDU",seats:1,status:"pendente",total:612},{departure:"2026-03-15",id:"R-4823",passenger:"Carla Mendes",route:"BSB → MIA",seats:3,status:"confirmada",total:9210.9},{departure:"2026-03-18",id:"R-4824",passenger:"Diego Ramos",route:"POA → EZE",seats:1,status:"cancelada",total:1150},{departure:"2026-03-19",id:"R-4825",passenger:"Elisa Prado",route:"REC → LIS",seats:2,status:"confirmada",total:5340.75},{departure:"2026-03-21",id:"R-4826",passenger:"Felipe Nunes",route:"GIG → MCO",seats:4,status:"pendente",total:11480},{departure:"2026-03-23",id:"R-4827",passenger:"Gabriela Rocha",route:"SSA → CDG",seats:1,status:"confirmada",total:6120.4},{departure:"2026-03-25",id:"R-4828",passenger:"Henrique Dias",route:"CWB → SCL",seats:2,status:"confirmada",total:2980},{departure:"2026-03-27",id:"R-4829",passenger:"Isabela Freitas",route:"FOR → LIS",seats:1,status:"cancelada",total:3410.2},{departure:"2026-03-29",id:"R-4830",passenger:"João Barreto",route:"VCP → BOG",seats:3,status:"pendente",total:7755},{departure:"2026-04-02",id:"R-4831",passenger:"Karina Lopes",route:"GRU → JFK",seats:2,status:"confirmada",total:10230.6},{departure:"2026-04-05",id:"R-4832",passenger:"Lucas Antunes",route:"BEL → MAO",seats:1,status:"pendente",total:890}],K=[{code:"AG-0197",email:"ana.silva@turystack.com",id:"AG-0197",name:"Ana Silva",role:"Consultora sênior",status:"ativo",team:"Corporativo"},{code:"AG-0204",email:"bruno.costa@turystack.com",id:"AG-0204",name:"Bruno Costa",role:"Consultor",status:"convidado",team:"Lazer"},{code:"AG-0231",email:"gabriela.rocha.esteves@grupo-turystack.com.br",id:"AG-0231",name:"Gabriela Rocha Esteves",role:"Coordenadora de emissão",status:"ativo",team:"Emissão"},{code:"AG-0248",email:"henrique.dias@turystack.com",id:"AG-0248",name:"Henrique Dias",role:"Analista de suporte",status:"suspenso",team:"Suporte"}],j=new Intl.NumberFormat("pt-BR",{currency:"BRL",style:"currency"}),y={cancelada:"destructive",confirmada:"success",pendente:"warning"},z={ativo:"success",convidado:"info",suspenso:"destructive"};function ne(s){return s.split(" ").slice(0,2).map(a=>a[0]).join("").toUpperCase()}function le({agent:s}){return e.jsxs("div",{className:"flex min-w-0 items-center gap-2.5",children:[e.jsx(U,{size:"sm",children:ne(s.name)}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"truncate font-medium text-foreground",children:s.name}),e.jsx("p",{className:"truncate text-muted-foreground text-xs",children:s.email})]})]})}function re({agent:s}){return e.jsxs("div",{className:"min-w-0 space-y-1",children:[e.jsxs("div",{className:"flex min-w-0 items-center gap-2",children:[e.jsx("span",{className:"truncate font-medium text-foreground",children:s.name}),e.jsx(m,{size:"sm",variant:z[s.status],children:s.status})]}),e.jsxs("p",{className:"truncate text-muted-foreground text-xs",children:[s.code," · ",s.role]})]})}function de({onAction:s,reservation:a}){return e.jsxs(r,{children:[e.jsx(r.Trigger,{asChild:!0,children:e.jsx(b,{ariaLabel:`Ações da reserva ${a.id}`,size:"icon-sm",variant:"ghost",children:e.jsx(X,{})})}),e.jsxs(r.Content,{align:"end",width:200,children:[e.jsxs(r.Item,{onClick:()=>s(`editar ${a.id}`),children:[e.jsx(Z,{})," Editar",e.jsx(r.Shortcut,{children:"⌘E"})]}),e.jsxs(r.Item,{onClick:()=>s(`duplicar ${a.id}`),children:[e.jsx(Q,{})," Duplicar",e.jsx(r.Shortcut,{children:"⌘D"})]}),e.jsx(r.Separator,{}),e.jsxs(r.Item,{onClick:()=>s(`excluir ${a.id}`),variant:"destructive",children:[e.jsx(Y,{})," Excluir"]})]})]})}function ce({onClose:s,reservation:a}){return e.jsxs("div",{className:"space-y-4 p-4",children:[e.jsxs("div",{className:"flex items-start justify-between gap-3",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-muted-foreground text-xs",children:a.id}),e.jsx("p",{className:"truncate font-semibold text-foreground",children:a.passenger})]}),e.jsx(b,{ariaLabel:"Fechar pré-visualização",onClick:s,size:"icon-sm",variant:"ghost",children:e.jsx(J,{})})]}),e.jsx(m,{variant:y[a.status],children:a.status}),e.jsxs("dl",{className:"grid grid-cols-2 gap-x-4 gap-y-3 text-sm",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground text-xs",children:"Trecho"}),e.jsx("dd",{className:"font-medium",children:a.route})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground text-xs",children:"Embarque"}),e.jsx("dd",{className:"font-medium",children:a.departure})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground text-xs",children:"Assentos"}),e.jsx("dd",{className:"font-medium",children:a.seats})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"text-muted-foreground text-xs",children:"Total"}),e.jsx("dd",{className:"font-medium tabular-nums",children:j.format(a.total)})]})]})]})}function me(s,a){if(!a)return s;const u=a.startsWith("-"),w=u?a.slice(1):a;return[...s].sort((x,N)=>{const p=x[w],g=N[w],f=typeof p=="number"&&typeof g=="number"?p-g:String(p).localeCompare(String(g),"pt-BR");return u?-f:f})}const ue=`import { Table, type TableColumns } from '@turystack/react-web'

const columns: TableColumns<Reservation> = [
  { key: 'id', label: 'Código', sorter: true, width: 120 },
  { key: 'passenger', label: 'Passageiro', sorter: true, width: 220 },
  {
    align: 'right',
    key: 'total',
    label: 'Total',
    selector: (row) => currency.format(row.total),
    sorter: true,
    width: 140,
  },
  {
    key: 'status',
    label: 'Status',
    selector: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    width: 140,
  },
]

// The table renders; the page sorts and slices.
const sorted = sortReservations(reservations, sort)
const page = sorted.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)

<Table
  columns={columns}
  emptySection={<EmptyState />}
  itemKey="id"
  items={page}
  loading={loading}
  onRowClick={(row) => open(row)}
  onSelectionChange={setSelectedKeys}
  onSortChange={setSort}
  pagination={{
    mode: 'offset',
    onPageChange: setPageNumber,
    onRowsPerPageChange: setRowsPerPage,
    page: pageNumber,
    rowsPerPage,
    total: sorted.length,
  }}
  rowName={(row) => row.passenger}
  selectedKeys={selectedKeys}
  selection="multiple"
  sort={sort}
/>`,he=`// Several fields of one entity in a single cell. The key still has to be a
// real field — sorting and nothing else reads it — but the selector decides
// what is drawn, so the cell can carry as many of them as it needs.
{
  key: 'name',
  label: 'Agente',
  sorter: true,
  // Wider than a plain text column: two lines and an avatar need the room.
  width: 280,
  selector: (agent) => (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar size="sm">{initialsOf(agent.name)}</Avatar>
      {/* min-w-0 on the parent, truncate on the children — the cell is
          whitespace-nowrap and nothing in the table clips it for you. */}
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{agent.name}</p>
        <p className="truncate text-muted-foreground text-xs">{agent.email}</p>
      </div>
    </div>
  ),
}`,xe=`// Row actions are not a table prop — just an ordinary last column.
{
  align: 'center',
  // No field on the row is called "actions" — with a selector, item[key] is
  // never read, so the key is just an identifier here. Leave sorter off.
  key: 'actions',
  label: '',
  // 56 real pixels, not a share of the total…
  width: 56,
  fixedWidth: true,
  // …and pinned to the right edge while the rest scrolls sideways.
  sticky: 'right',
  selector: (row) => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button ariaLabel={\`Ações da reserva \${row.id}\`} size="icon-sm" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" width={200}>
        <DropdownMenu.Item onClick={() => edit(row)}>
          <Pencil /> Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => duplicate(row)}>
          <Copy /> Duplicar
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => remove(row)} variant="destructive">
          <Trash2 /> Excluir
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
}

// The trigger is a <button> and the open menu is portalled out of the row;
// onRowClick ignores both — no stopPropagation needed.
<Table
  columns={columns}
  itemKey="id"
  items={rows}
  layoutWidth={900}
  onRowClick={open}
/>`,pe=`// width is a share; fixedWidth makes it exact pixels
const columns: TableColumns<Reservation> = [
  { key: 'passenger', label: 'Passageiro', width: 200 }, // two shares…
  { key: 'route', label: 'Trecho', width: 100 },        // …to one
  {
    align: 'center',   // an icon alone is centred too, not only text
    fixedWidth: true,  // 96px however wide the table is
    key: 'baggage',
    label: 'Bagagem',
    selector: (row) =>
      row.seats > 1
        ? <Luggage aria-label="Com bagagem" className="size-4" role="img" />
        : <Minus aria-label="Sem bagagem" className="size-4 text-muted-foreground" role="img" />,
    width: 96,
  },
]`,ge=`// Pinned at both ends: the name on the left, the total on the right.
// layoutWidth makes the table wider than its box, so the middle scrolls.
const columns: TableColumns<Reservation> = [
  { key: 'passenger', label: 'Passageiro', sticky: 'left', width: 200 },
  { key: 'id', label: 'Código', width: 120 },
  { key: 'route', label: 'Trecho', width: 160 },
  { key: 'departure', label: 'Partida', width: 160 },
  { align: 'center', key: 'seats', label: 'Assentos', width: 120 },
  { key: 'status', label: 'Status', selector: (row) => <Badge>{row.status}</Badge>, width: 160 },
  {
    align: 'right',
    key: 'total',
    label: 'Total',
    selector: (row) => currency.format(row.total),
    sticky: 'right',
    width: 140,
  },
]

<Table columns={columns} itemKey="id" items={rows} layoutWidth={1060} selection="multiple" />`,ye='<Table columns={columns} density="compact" itemKey="id" items={rows} />',we=`const [openId, setOpenId] = useState<string>()
const open = reservations.find((row) => row.id === openId)

<Resizable>
  <Resizable.Panel defaultSize={60} minSize={40}>
    <Table
      activeKey={openId}
      columns={columns}
      density="compact"
      itemKey="id"
      items={reservations}
      onRowClick={(row) => setOpenId(row.id)}
    />
  </Resizable.Panel>
  <Resizable.Handle withGrip />
  <Resizable.Panel minSize={25}>
    {open ? <ReservationPreview reservation={open} /> : <EmptyState title="Nenhuma reserva aberta" />}
  </Resizable.Panel>
</Resizable>`;function Ae(){const[s,a]=l.useState("id"),[u,w]=l.useState(1),[x,N]=l.useState(5),[p,g]=l.useState([]),[f,M]=l.useState(!1),[I,D]=l.useState(null),[E,B]=l.useState(null),[L,W]=l.useState(null),[C,S]=l.useState("R-4823"),k=l.useMemo(()=>me(n,s),[s]),G=l.useMemo(()=>k.slice((u-1)*x,u*x),[u,x,k]),v=[{key:"id",label:"Código",sorter:!0,width:110},{key:"passenger",label:"Passageiro",sorter:!0,width:200},{key:"route",label:"Trecho",width:130},{align:"center",key:"seats",label:"Assentos",sorter:!0,width:110},{key:"status",label:"Status",selector:t=>e.jsx(m,{variant:y[t.status],children:t.status}),width:140},{align:"right",key:"total",label:"Total",selector:t=>j.format(t.total),sorter:!0,width:150}],d=[{key:"id",label:"Código"},{key:"passenger",label:"Passageiro"},{key:"route",label:"Trecho"}],O=[{key:"id",label:"Código",width:110},{key:"passenger",label:"Passageiro",width:200},{key:"route",label:"Trecho",width:130},{key:"departure",label:"Embarque",width:130},{key:"status",label:"Status",selector:t=>e.jsx(m,{variant:y[t.status],children:t.status}),width:140},{align:"right",key:"total",label:"Total",selector:t=>j.format(t.total),width:150},{align:"center",fixedWidth:!0,key:"actions",label:"",selector:t=>e.jsx(de,{onAction:B,reservation:t}),sticky:"right",width:56}],F=[{key:"passenger",label:"Passageiro (width 200)",width:200},{key:"route",label:"Trecho (width 100)",width:100},{align:"center",fixedWidth:!0,key:"baggage",label:"Bagagem",selector:t=>t.seats>1?e.jsx(te,{"aria-label":"Com bagagem",className:"size-4",role:"img"}):e.jsx(ae,{"aria-label":"Sem bagagem",className:"size-4 text-muted-foreground",role:"img"}),width:96}],q=[{key:"id",label:"Código",width:90},{key:"passenger",label:"Passageiro",width:160},{key:"status",label:"Status",selector:t=>e.jsx(m,{size:"sm",variant:y[t.status],children:t.status}),width:110}],R=n.find(t=>t.id===C),H=[{key:"name",label:"Agente",selector:t=>e.jsx(le,{agent:t}),sorter:!0,width:280},{key:"team",label:"Equipe",width:140},{align:"right",key:"status",label:"Status",selector:t=>e.jsx(m,{variant:z[t.status],children:t.status}),width:130}],V=[{key:"name",label:"Agente",selector:t=>e.jsx(re,{agent:t}),width:280},{key:"email",label:"E-mail",width:240},{align:"right",key:"team",label:"Equipe",width:140}];return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Display"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Table"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A generic data table: columns as data, selection, a sort control, a pagination bar, a loading overlay and an empty state."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(P,{props:ie}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Each entry in"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"columns"})," ","is an object of its own."]}),e.jsx(P,{props:oe})]}),e.jsx(_,{slug:"table"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Everything at once"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Twelve reservations behind a five-row page."}),e.jsx(o,{className:"items-stretch",title:"Sortable, selectable, paginated",children:e.jsxs("div",{className:"w-full space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsx(b,{onClick:()=>M(t=>!t),size:"sm",variant:"outline",children:f?"Stop loading":"Show the loading overlay"}),e.jsx(b,{onClick:()=>g([]),size:"sm",variant:"ghost",children:"Clear selection"}),e.jsxs("span",{className:"text-muted-foreground text-sm",children:["sort:"," ",e.jsx("code",{className:"text-foreground",children:s??"undefined"})," · selected: ",p.length," · last row clicked:"," ",e.jsx("code",{className:"text-foreground",children:I?.id??"—"})]})]}),e.jsx(i,{columns:v,itemKey:"id",items:G,loading:f,onRowClick:t=>D(t),onSelectionChange:g,onSortChange:a,pagination:{mode:"offset",onPageChange:w,onRowsPerPageChange:t=>{N(t),w(1)},page:u,rowsPerPage:x,total:k.length},selectedKeys:p,selection:"multiple",sort:s})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Selection"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"defaultSelectedKeys"})," ","lets the table own the selection;"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"selectedKeys"})," ","makes you own it."]}),e.jsx(o,{className:"items-stretch",title:'selection="multiple", uncontrolled',children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,defaultSelectedKeys:["R-4822"],itemKey:"id",items:n.slice(0,4),selection:"multiple"})})}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["The header box turns indeterminate on partial selection."," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"rowName"})," ","names each row box, e.g. “Select row Bruno Costa”."]}),e.jsx(o,{className:"items-stretch",title:"rowName and an indeterminate header box",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,defaultSelectedKeys:["R-4822"],itemKey:"id",items:n.slice(0,4),rowName:t=>t.passenger,selection:"multiple"})})}),e.jsx(o,{className:"items-stretch",title:'selection="none" — the default',children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,itemKey:"id",items:n.slice(0,4)})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Loading and empty"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"loading"})," ","overlays the rows; they stay in the DOM and the height holds."]}),e.jsx(o,{className:"items-stretch",title:"loading over real rows",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,itemKey:"id",items:n.slice(0,3),loading:!0})})}),e.jsx(o,{className:"items-stretch",title:"No rows, default message",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,itemKey:"id",items:[]})})}),e.jsx(o,{className:"items-stretch",title:"No rows, custom emptySection",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,emptySection:e.jsxs("div",{className:"flex flex-col items-center gap-3 py-6",children:[e.jsx(T,{className:"size-8 text-muted-foreground"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("p",{className:"font-medium text-foreground",children:"Nenhuma reserva neste período"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Ajuste o intervalo de datas ou limpe os filtros."})]}),e.jsx(b,{size:"sm",variant:"outline",children:"Limpar filtros"})]}),itemKey:"id",items:[]})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Columns"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"selector"})," ","is what turns a field into a cell — a badge, a formatted amount, a link."]}),e.jsx(o,{className:"items-stretch",title:"selector, align, and a hidden column",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:[{key:"id",label:"Código",width:110},{hide:!0,key:"passenger",label:"Passageiro (hide: true)",width:200},{align:"center",key:"seats",label:"align center",width:130},{align:"right",key:"total",label:"align right",selector:t=>j.format(t.total),width:150},{key:"status",label:"selector → Badge",selector:t=>e.jsx(m,{variant:y[t.status],children:t.status}),width:160}],itemKey:"id",items:n.slice(0,4)})})}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"layoutWidth"})," ","is the opt-in for horizontal scrolling."]}),e.jsx(o,{className:"items-stretch",title:"layoutWidth={900}",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:v,itemKey:"id",items:n.slice(0,4),layoutWidth:900})})}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"sticky"})," ","pins a column:"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"'left'"})," ","the first,"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"'right'"})," ","the last. Scroll sideways to see."]}),e.jsx(o,{className:"items-stretch",title:"Left and right sticky columns",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:[{key:"passenger",label:"Passageiro",sticky:"left",width:200},{key:"id",label:"Código",width:120},{key:"route",label:"Trecho",width:160},{key:"departure",label:"Partida",width:160},{align:"center",key:"seats",label:"Assentos",width:120},{key:"status",label:"Status",selector:t=>e.jsx(m,{variant:y[t.status],children:t.status}),width:160},{align:"right",key:"total",label:"Total",selector:t=>j.format(t.total),sticky:"right",width:140}],defaultSelectedKeys:["R-4822"],itemKey:"id",items:n.slice(0,4),layoutWidth:1060,selection:"multiple"})})}),e.jsx(h,{code:ge,filename:"sticky-columns.tsx",language:"tsx"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"width"})," ","alone is a ratio;"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"fixedWidth"})," ","makes it exact pixels. Drag the handle: the icon column stays put."]}),e.jsx(o,{className:"items-stretch",title:"Shares, a fixed 96px column, and a centred icon",children:e.jsx("div",{className:"h-72 w-full overflow-hidden rounded-lg border border-border",children:e.jsxs(c,{children:[e.jsx(c.Panel,{defaultSize:75,minSize:40,children:e.jsx("div",{className:"p-3",children:e.jsx(i,{columns:F,density:"compact",itemKey:"id",items:n.slice(0,4)})})}),e.jsx(c.Handle,{withGrip:!0}),e.jsx(c.Panel,{minSize:15,children:e.jsx("div",{className:"p-3 text-muted-foreground text-xs",children:"Drag the handle"})})]})})}),e.jsx(h,{code:pe,filename:"columns.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Identity columns"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A row is one entity, so the first column is usually more than one field of it: a face, a name and the address you would actually search by."}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Two things to get right: give the column room with width, and truncate the text yourself — cells do not wrap."}),e.jsx(o,{className:"items-stretch",title:"Avatar, name and e-mail in one cell",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:H,itemKey:"id",items:K,layoutWidth:720,onSortChange:()=>{}})})}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The same without a picture: name with an inline badge, two identifiers on line two."}),e.jsx(o,{className:"items-stretch",title:"Name with a status badge, code and role underneath",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:V,itemKey:"id",items:K})})}),e.jsx(h,{code:he,filename:"identity-column.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"An actions column"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["A last"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"DropdownMenu"})," ","column keeps per-row actions out of the way."]}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["An ordinary column:"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"width: 56"})," ","with"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"fixedWidth"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"sticky: 'right'"}),"."]}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Works with"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"onRowClick"}),": picking a menu item does not fire the row click."]}),e.jsx(o,{className:"items-stretch",title:"A pinned DropdownMenu column with onRowClick",children:e.jsxs("div",{className:"w-full space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-muted-foreground text-sm",children:[e.jsxs("span",{children:["row clicked:"," ",e.jsx("code",{className:"text-foreground",children:L?.id??"—"})]}),e.jsxs("span",{children:["action picked:"," ",e.jsx("code",{className:"text-foreground",children:E??"—"})]})]}),e.jsx(i,{columns:O,itemKey:"id",items:n.slice(0,5),layoutWidth:900,onRowClick:t=>W(t)})]})}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["With"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"onRowClick"}),", rows are Tab stops; Enter or Space opens them."]}),e.jsx(h,{code:xe,filename:"actions-column.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Density"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'density="compact"'})," ","tightens the cell padding and the header height, for back-office screens that need a lot of rows on one screen."]}),e.jsx(o,{className:"items-stretch",title:'density="compact"',children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:v,density:"compact",itemKey:"id",items:n.slice(0,6)})})}),e.jsx(h,{code:ye,filename:"compact.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Split view"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"activeKey"})," ","highlights the open row and marks it"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'aria-current="true"'}),"."]}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"It is not selection. Checking a box and opening a row are separate acts, and a row can be both at once."}),e.jsx(o,{className:"items-stretch",title:"activeKey with a resizable preview panel",children:e.jsx("div",{className:"h-96 w-full overflow-hidden rounded-lg border border-border",children:e.jsxs(c,{children:[e.jsx(c.Panel,{defaultSize:60,minSize:40,children:e.jsx("div",{className:"p-3",children:e.jsx(i,{activeKey:C,columns:q,density:"compact",itemKey:"id",items:n.slice(0,8),onRowClick:t=>S(t.id)})})}),e.jsx(c.Handle,{withGrip:!0}),e.jsx(c.Panel,{minSize:25,children:R?e.jsx(ce,{onClose:()=>S(void 0),reservation:R}):e.jsx("div",{className:"flex h-full items-center justify-center p-4",children:e.jsx($,{description:"Clique em uma linha para ver os detalhes.",icon:e.jsx(T,{}),size:"sm",title:"Nenhuma reserva aberta"})})})]})})}),e.jsx(h,{code:we,filename:"split-view.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Pagination"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The pagination object goes straight to Pagination, so cursor mode works here too."}),e.jsx(o,{className:"items-stretch",title:'pagination mode="cursor"',children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,itemKey:"id",items:n.slice(0,3),pagination:{hasNextPage:!0,hasPreviousPage:!1,mode:"cursor",rowsPerPage:3}})})}),e.jsx(o,{className:"items-stretch",title:"The same configuration with hidePagination",children:e.jsx("div",{className:"w-full",children:e.jsx(i,{columns:d,hidePagination:!0,itemKey:"id",items:n.slice(0,3),pagination:{hasNextPage:!0,hasPreviousPage:!1,mode:"cursor",rowsPerPage:3}})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(h,{code:ue,filename:"example.tsx",language:"tsx"})]})]})}export{Ae as component};
