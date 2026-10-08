import{F as d,j as e,aa as m,bf as P,bB as x,L as k}from"./index-CQ2_D3U_.js";import{C as I}from"./CodeBlock-ftRQod4w.js";import{C as p}from"./ComponentPreview-x9-jqN-p.js";import{P as u}from"./PropsTable-CmvKG47z.js";import{S as T}from"./SlotsTable-DcNRogj3.js";import{F as g}from"./file-up-Dqk2hmq6.js";import{u as R}from"./use-data-outcome-BKjBOcAk.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const N=[{description:"Columns a row can hold; required ones block mapping.",name:"columns",required:!0,type:"DataTransferColumn<T>[]"},{description:"Starts the import with validated rows; returns the job.",name:"onImport",required:!0,type:"(rows: T[], meta: { lines, mapping, raw }) => Promise<DataTransferJob>"},{description:"Router link to the import’s own page.",name:"resultLink",required:!0,type:"(job: DataTransferJob) => React.ReactNode"},{description:"Result step content, usually Records over the job.",name:"result",type:"(job: DataTransferJob) => React.ReactNode"},{description:"Per-row validation; any zod schema fits.",name:"schema",type:"StandardSchema<T>"},{description:"Cross-row checks, e.g. duplicates within the file.",name:"onValidate",type:"(rows: T[]) => DataTransferImportIssue[]"},{description:"Parser for non-CSV formats or server-side imports.",name:"parse",type:"(file: File) => Promise<{ headers, rows }>"},{default:'".csv,text/csv"',description:"Accepted file types; pair with parse for non-CSV.",name:"accept",type:"string"},{description:"Most rows a file may hold; more is refused.",name:"maxRows",type:"number"},{default:'"template.csv"',description:"What the template downloads as.",name:"templateFileName",type:"string"},{description:"What is being imported; titles the surface.",name:"entity",type:"{ plural: string; singular?: string }"},{default:'"sheet"',description:"Where the four steps are shown.",name:"surface",type:'"modal" | "sheet"'},{default:'"md"',description:"Surface width, in the Modal and Sheet scale.",name:"size",type:'"sm" | "md" | "lg" | "xl"'},{description:"Overrides what the entity would have said.",name:"title",type:"string"},{description:"Overrides what the entity would have said.",name:"description",type:"string"},{description:"What opens it. Its own onClick still fires.",name:"trigger",type:"React.ReactElement"},{description:"Controlled visibility.",name:"open",type:"boolean"},{description:"Uncontrolled initial visibility.",name:"defaultOpen",type:"boolean"},{description:"Fires when it opens or closes.",name:"onOpenChange",type:"(open: boolean) => void"}],v=[{description:"Columns to show and their labels.",name:"columns",required:!0,type:"DataTransferColumn<T>[]"},{description:"The page shown, as a DataOutcome from the query.",name:"outcome",required:!0,type:"DataOutcome<DataTransferImportRecord<T>[]>"},{description:"Required pagination; the list never loads whole.",name:"pagination",required:!0,type:"PaginationProps"}],S=[{description:"Source file row number, as shown in the Check step.",name:"row",required:!0,type:"number"},{description:"What the row held, keyed by column.",name:"values",required:!0,type:"Partial<Record<keyof T, string | number | boolean | null>>"},{description:"Row status: pending, success or error.",name:"status",required:!0,type:'"pending" | "success" | "error"'},{description:"Why the API refused the row (status error).",name:"errors",type:"string[]"}],C=`import { Link } from '@tanstack/react-router'
import { useDataOutcome } from '@turystack/react-hooks'
import { DataTransferImport } from '@turystack/react-web'

import {
  createBookingSchema,
  useImportBookings,
  useImportRecords,
} from '@/~sdk/bookings'

<DataTransferImport
  columns={columns}
  entity={{ plural: 'bookings' }}
  maxRows={5000}
  onImport={(rows, { lines }) =>
    importBookings.mutateAsync({ data: rows, lines })     // answers { id }
  }
  result={(job) => <ImportRecords id={job.id} />}
  resultLink={(job) => (
    <Link params={{ importId: job.id }} to="/imports/$importId">
      Open the import
    </Link>
  )}
  schema={createBookingSchema}      // the same schema the form validates with
  surface="sheet"
  templateFileName="bookings-template.csv"
  trigger={<Button>Import</Button>}
/>

// The same component on the Result step and on /imports/$importId
function ImportRecords({ id }: { id: string }) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const query = useImportRecords(
    { id, page, perPage },
    // asks again while the API is still working through the rows
    { refetchInterval: (query) => (query.state.data?.pending ? 2000 : false) },
  )
  const outcome = useDataOutcome({
    // A poll is not a refresh the reader asked for: only a page change is.
    // Passed through, isFetching becomes \`refreshing\` and the table dims
    // under a spinner on every tick of the interval.
    query: { ...query, isFetching: query.isPlaceholderData },
    select: (answer) => answer.records,
  })

  return (
    <DataTransferImport.Records
      columns={columns}
      outcome={outcome}
      pagination={{
        mode: 'offset',
        onPageChange: setPage,
        onRowsPerPageChange: setPerPage,
        page,
        rowsPerPage: perPage,
        total: query.data?.total ?? 0,
      }}
    />
  )
}

// A file too big for the browser: upload it, let the API read the headers
<DataTransferImport
  accept=".xlsx"
  columns={columns}
  onImport={commit}
  parse={async (file) => {
    const { key } = await uploadToBucket(file)
    return api.inspectImport({ key })
  }}
  resultLink={(job) => (
    <Link params={{ importId: job.id }} to="/imports/$importId">
      Open the import
    </Link>
  )}
/>`,w=[{example:"TRY-1041",key:"code",label:"Code",required:!0},{example:"Ada Lovelace",key:"guest",label:"Guest"},{example:"128000",hint:"In cents, the way CurrencyInput reads it",key:"price",label:"Price"}],D=["Code,Guest,Price","TRY-1041,Ada Lovelace,128000","TRY-1042,Grace Hopper,94000","TRY-1001,Alan Turing,210000","TRY-1043,Katherine Johnson,76000",'TRY-1044,Margaret Hamilton,"R$ 1.320,00"',"TRY-1045,Hedy Lamarr,132000","TRY-1046,Radia Perlman,88000","TRY-1042,Barbara Liskov,99000","TRY-1047,Frances Allen,154000","TRY-1048,Edsger Dijkstra,67000","TRY-1049,Donald Knuth,112000","TRY-1050,Leslie Lamport,143000"].join(`
`),A=`data:text/csv;charset=utf-8,${encodeURIComponent(D)}`,q=900,L=800,O=2,F=500,M=new Set(["TRY-1001"]),y=new Map,f=new Set;let j=null;function Y(t){return new Promise(n=>setTimeout(n,t))}function B(t,n,a){const r=[],s=String(t.code??"").trim(),o=String(t.price??"").trim();return M.has(s)?r.push(`A booking with code ${s} already exists`):a.has(s)?r.push(`Code ${s} already appears on line ${a.get(s)} of this import`):a.set(s,n),String(t.guest??"").trim()===""&&r.push("Guest is required"),o!==""&&Number.isNaN(Number(o))&&r.push(`Price is not a number: “${o}”`),r}async function E(t,{lines:n}){await Y(q);const a=`imp_${Math.random().toString(36).slice(2,8)}`,r=new Map;y.set(a,{records:t.map((s,o)=>{const i=n[o]??o+1,c=B(s,i,r);return{errors:c,row:i,status:c.length>0?"error":"success",values:{code:s.code,guest:s.guest,price:s.price}}}),startedAt:Date.now()}),j={id:a};for(const s of f)s();return{id:a}}function $(t){return f.add(t),()=>{f.delete(t)}}function W(t,n,a){const r=y.get(t);if(!r)return{pending:0,records:[],total:0};const s=Math.floor((Date.now()-r.startedAt)/L)*O,o=r.records.map((i,c)=>c<s?i:{row:i.row,status:"pending",values:i.values});return{pending:Math.max(0,r.records.length-s),records:o.slice((n-1)*a,n*a),total:r.records.length}}function V(t,n,a){const[,r]=d.useState(0),s=W(t,n,a),o=s.pending>0;return d.useEffect(()=>{if(!o)return;const i=window.setInterval(()=>r(c=>c+1),F);return()=>window.clearInterval(i)},[o]),{data:s,isFetching:!1,isPending:!1,refetch:()=>r(i=>i+1)}}function b({job:t}){const[n,a]=d.useState(1),[r,s]=d.useState(5),o=V(t.id,n,r),i=R({query:o,select:c=>c.records});return e.jsx(x.Records,{columns:w,outcome:i,pagination:{mode:"offset",onPageChange:a,onRowsPerPageChange:c=>{s(c),a(1)},page:n,rowsPerPage:r,rowsPerPageOptions:[5,10,20],total:o.data.total}})}function h({noun:t,surface:n,trigger:a}){const[r,s]=d.useState(!1);return e.jsx(x,{columns:w,entity:{plural:t},maxRows:500,onImport:E,onOpenChange:s,open:r,result:o=>e.jsx(b,{job:o}),resultLink:o=>e.jsxs(k,{hash:"import-result",onClick:()=>{s(!1),document.getElementById("import-result")?.scrollIntoView()},to:"/libs/react-web/components/data-transfer-import",children:["Import ",o.id]}),surface:n,templateFileName:`${t}-template.csv`,trigger:a})}function l({children:t}){return e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:t})}function Z(){const t=d.useSyncExternalStore($,()=>j);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"DataTransfer"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"DataTransferImport"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"Rows in from a file, in four steps: pick, map, check, and follow the API."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(u,{props:N})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"DataTransferImport.Records"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Import rows as the API processes them. Takes a"," ",e.jsx(l,{children:"DataOutcome"})," and is always paginated."]}),e.jsx(u,{props:v}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx(l,{children:"DataTransferImportRecord<T>"})," — one row after it reached the API."]}),e.jsx(u,{props:S})]}),e.jsx(T,{slug:"data-transfer-import"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The four steps"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Try"," ",e.jsx("a",{className:"text-lib underline underline-offset-4",download:"bookings-sample.csv",href:A,children:"the sample file"})," ","(with errors) or any CSV with header ",e.jsx(l,{children:"Code,Guest,Price"}),"."]}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Import opens a fake job; rows settle two at a time, refused ones with their reason."}),e.jsx(p,{title:"File, Columns, Check, Result",children:e.jsx(h,{noun:"bookings",trigger:e.jsx(m,{leftSection:e.jsx(g,{className:"size-4"}),children:"Import bookings"})})})]}),e.jsxs("section",{className:"scroll-mt-8 space-y-4",id:"import-result",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The import’s own page"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Where ",e.jsx(l,{children:"resultLink"})," leads: the same"," ",e.jsx(l,{children:"DataTransferImport.Records"})," over the same job. Close early and watch rows settle here."]}),e.jsx(p,{className:"items-stretch",title:t?`imports/${t.id}`:"no import yet",children:t?e.jsx("div",{className:"w-full",children:e.jsx(b,{job:t},t.id)}):e.jsx(P,{description:"Start one above and its rows appear here, still settling if the API has not reached them all.",icon:e.jsx(g,{}),title:"No import yet"})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Modal or sheet"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["The same four steps, in whichever surface the screen wants."," ",e.jsx(l,{children:"size"})," sets the width in the Modal’s and the Sheet’s own scale, and starts at ",e.jsx(l,{children:"md"}),"."]}),e.jsx(p,{title:"Same four steps, two surfaces",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[e.jsx(h,{noun:"guests",surface:"modal",trigger:e.jsx(m,{variant:"outline",children:"In a modal"})}),e.jsx(h,{noun:"invoices",surface:"sheet",trigger:e.jsx(m,{variant:"outline",children:"In a sheet"})})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What crosses the boundary"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["The ",e.jsx(l,{children:"File"})," is parsed and validated in the browser; the API gets ",e.jsx(l,{children:"T["}),"] and returns a job."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(I,{code:C,filename:"example.tsx",language:"tsx"})]})]})}export{Z as component};
