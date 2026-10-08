import{F as g,j as e,a3 as i,be as f,bf as r,aa as c,b2 as y,bg as h,aE as j}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import{C as d}from"./ComponentPreview-BlMdAug8.js";import{P as w}from"./PropsTable-r9MRwph6.js";import{S as N}from"./SlotsTable-CHbQbO6v.js";import{I as u}from"./inbox-pwaC5tkX.js";import{S as b}from"./shield-alert-DKwBZRo7.js";import{u as v}from"./use-data-outcome-CnNXPP5f.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const k=[{description:"The five states of a remote read, from useDataOutcome.",name:"outcome",required:!0,type:"DataOutcome<T>"},{description:"Render function, run only once the read succeeded.",name:"children",required:!0,type:"(data: T) => ReactNode"},{description:"Replaces the denied card (which has no retry).",name:"deniedSection",type:"ReactNode"},{description:"Replaces the card shown when the read came back empty.",name:"emptySection",type:"ReactNode"},{description:"Replaces the failed card (default has a retry).",name:"errorSection",type:"ReactNode"},{description:"Replaces the skeleton drawn while the read is pending.",name:"loadingSection",type:"ReactNode"},{default:"3",description:"How many skeleton blocks the pending state draws.",name:"loadingRows",type:"number"},{default:'"md"',description:"Size of the state cards, as in EmptyState.",name:"size",type:'"sm" | "md" | "lg"'}],x=[{guest:"Ada Lovelace",id:"b1",nights:3},{guest:"Grace Hopper",id:"b2",nights:5},{guest:"Alan Turing",id:"b3",nights:2}],S=[{key:"guest",label:"Guest"},{key:"nights",label:"Nights"}],C=["pending","denied","error","empty","success","refreshing"],p=new Error("denied");function R(t){return v({denied:s=>s===p?"Guest details start on the Business contract":void 0,query:{data:t==="success"||t==="refreshing"?x:t==="empty"?[]:void 0,error:t==="denied"?p:t==="error"?new Error("the network went away"):void 0,isFetching:t==="refreshing",isPending:t==="pending",refetch:()=>{}}})}function m({onChange:t,value:o}){return e.jsx("div",{className:"flex flex-wrap gap-2",children:C.map(s=>e.jsx(c,{onClick:()=>t(s),size:"sm",variant:s===o?"default":"outline",children:s},s))})}const E=`import { useDataOutcome } from '@turystack/react-hooks'

const outcome = useDataOutcome({
  query: useListBookings(params),
  select: (page) => page.data,
})`,D=`import { Loaded } from '@turystack/react-web'

<Loaded outcome={outcome}>
  {(bookings) => <BookingSummary bookings={bookings} />}
</Loaded>

// Only the empty state usually carries copy of its own
<Loaded
  emptySection={
    <EmptyState
      action={<Button>New booking</Button>}
      title="No bookings yet"
    />
  }
  outcome={outcome}
>
  {(bookings) => <BookingSummary bookings={bookings} />}
</Loaded>`,T=`// A table keeps its header, columns and pagination in every state
<Table columns={columns} itemKey="id" outcome={outcome} />

// A list draws skeleton rows, then the rows
<List itemKey="id" outcome={outcome} renderItem={renderBooking} />

// A select paints the state inside its own popup, and never disables the
// trigger — a disabled control fires no pointer events, so the reason
// would be out of reach
<Select
  mode="single"
  optionLabel="guest"
  optionValue="id"
  outcome={outcome}
/>`,A=`// A failed next page is not a failed read: the rows stay, the footer
// carries the failure, and the sentinel stops asking for more
<List
  infinite={{
    error: page.isError,
    errorSection: (
      <Button onClick={page.fetchNextPage} variant="outline">
        Try again
      </Button>
    ),
    hasMore: page.hasNextPage,
    loadingMore: page.isFetchingNextPage,
    onLoadMore: page.fetchNextPage,
  }}
  itemKey="id"
  outcome={outcome}
  renderItem={renderBooking}
/>`,L=`// When no surface paints it for you — a confirmation modal that has to
// read its blast radius before offering the button
switch (outcome.status) {
  case 'pending':
    return <ImpactSkeleton reason="Checking what will be affected" />
  case 'denied':
    return <Unavailable reason={outcome.reason} />
  case 'error':
    return <ImpactFailed onRetry={outcome.retry} />
  case 'empty':
    return <Confirm description="This guest drags nothing along." />
  case 'success':
    return <ImpactConfirm impact={outcome.data} />
}

// outcome.data does not exist outside the success branch, so the
// fallback that turns a failure into an empty list has nowhere to happen`,P=`// Once, at the root: which codes mean "you may not"
<DataOutcomeContext value={{ denied: resolveDenial }}>
  <App />
</DataOutcomeContext>

// src/api/denial.ts
const DENIAL_REASONS: Partial<Record<ErrorCode, string>> = {
  'booking.period_closed': 'This period is closed',
  'report.contract_tier_too_low': 'Reports start on the Business contract',
}

export function resolveDenial(error: unknown) {
  return isException(error) ? DENIAL_REASONS[error.code] : undefined
}`;function H(){const[t,o]=g.useState("pending"),s=R(t);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Data"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Loaded"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"Renders its children once a read lands, and the reason why not until then."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Where the value comes from"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Five outcomes, in order: pending, denied, error, empty, success. Denied comes before error so it never offers a retry."}),e.jsx(a,{code:E,filename:"use-outcome.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(w,{props:k})]}),e.jsx(N,{slug:"loaded"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The five states"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Pick a state and every surface below follows; the real hook derives the outcome."}),e.jsx(m,{onChange:o,value:t}),e.jsx(d,{title:"Loaded inside a card",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsxs(i,{children:[e.jsxs(i.Header,{bordered:!0,children:[e.jsx(i.Title,{children:"Reservas"}),e.jsx(i.Description,{children:"Próximos check-ins"})]}),e.jsx(i.Content,{children:e.jsx(f,{emptySection:e.jsx(r,{action:e.jsx(c,{size:"sm",children:"Nova reserva"}),icon:e.jsx(u,{}),size:"sm",title:"Nenhuma reserva ainda"}),outcome:s,size:"sm",children:n=>e.jsx("ul",{className:"space-y-2 text-sm",children:n.map(l=>e.jsxs("li",{className:"flex justify-between",children:[e.jsx("span",{children:l.guest}),e.jsxs("span",{className:"text-muted-foreground",children:[l.nights," noites"]})]},l.id))})})})]})})}),e.jsx(a,{code:D,filename:"booking-panel.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"A table takes the same value"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A failed read shows inside the table, keeping header, columns and pagination in place."}),e.jsx(m,{onChange:o,value:t}),e.jsx(d,{title:"Table outcome",children:e.jsx("div",{className:"w-full max-w-2xl",children:e.jsx(y,{columns:S,itemKey:"id",outcome:s})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"So do a list and a select"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A select paints the state in its popup and keeps the trigger usable."}),e.jsx(m,{onChange:o,value:t}),e.jsx(d,{title:"List and Select on the same outcome",children:e.jsxs("div",{className:"grid w-full max-w-3xl gap-6 md:grid-cols-2",children:[e.jsx(h,{emptySection:e.jsx(r,{size:"sm",title:"Nenhuma reserva"}),itemKey:"id",outcome:s,renderItem:n=>e.jsx("span",{className:"text-sm",children:n.guest})}),e.jsx(j,{mode:"single",optionLabel:"guest",optionValue:"id",outcome:s,placeholder:"Escolha um hóspede",searchable:!0})]})}),e.jsx(a,{code:T,filename:"surfaces.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Denied is not an error"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Empty, failed and denied are different facts. The denied card states the reason, with no retry."}),e.jsx(d,{title:"Three cards that must not look alike",children:e.jsxs("div",{className:"grid w-full max-w-3xl gap-4 md:grid-cols-3",children:[e.jsx(r,{icon:e.jsx(u,{}),size:"sm",title:"Nenhuma reserva ainda"}),e.jsx(r,{action:e.jsx(c,{size:"sm",variant:"outline",children:"Tentar novamente"}),size:"sm",title:"Não foi possível carregar"}),e.jsx(r,{icon:e.jsx(b,{}),size:"sm",title:"Relatórios começam no contrato Business"})]})}),e.jsx(a,{code:P,filename:"denial.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"A failed next page is not a failed read"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"A failed next page shows in the footer; loaded rows stay and the sentinel stops observing."}),e.jsx(d,{title:"The rows stay, the footer explains",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(h,{infinite:{error:!0,errorSection:e.jsx(c,{size:"sm",variant:"outline",children:"Tentar novamente"}),hasMore:!0,onLoadMore:()=>{}},itemKey:"id",items:x,renderItem:n=>e.jsx("span",{className:"text-sm",children:n.guest})})})}),e.jsx(a,{code:A,filename:"booking-feed.tsx",language:"tsx"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"When nothing paints it for you"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Elsewhere, read the union directly; the compiler flags any missing case."}),e.jsx(a,{code:L,filename:"delete-modal.tsx",language:"tsx"})]})]})}export{H as component};
