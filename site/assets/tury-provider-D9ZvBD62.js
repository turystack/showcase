import{j as e}from"./index-CQ2_D3U_.js";import{C as o}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import{S as s}from"./SlotsTable-DcNRogj3.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const l=[{description:"The application the provider wraps.",name:"children",required:!0,type:"React.ReactNode"},{default:'"system"',description:"ColorSchemeProvider’s first-visit default; storage wins.",name:"defaultColorScheme",type:'"system" | "dark" | "light"'},{default:"undefined",description:"LabelsProvider overrides, merged over English defaults.",name:"labels",type:"PartialTuryLabels"},{default:"undefined",description:"FormatProvider locale, time zone and currency.",name:"format",type:"FormatDefaults"},{default:"undefined",description:"PortalProvider container; unset, overlays go to body.",name:"portalContainer",type:"HTMLElement | null | (() => HTMLElement | null)"}],a=`// tury-provider.tsx, in full
export function TuryProvider({
  children,
  defaultColorScheme,
  labels,
  portalContainer,
}: TuryProviderProps) {
  return (
    <PortalProvider container={portalContainer}>
      <LabelsProvider labels={labels}>
        <ColorSchemeProvider defaultColorScheme={defaultColorScheme}>
          {children}
          <Toast />
        </ColorSchemeProvider>
      </LabelsProvider>
    </PortalProvider>
  )
}`,d=`import { TuryProvider } from '@turystack/react-web'
import '@turystack/react-web/styles.css'

// One provider, at the root, above the router
createRoot(document.getElementById('root')!).render(
  <TuryProvider defaultColorScheme="system">
    <App />
  </TuryProvider>,
)

// All three concerns configured at once
<TuryProvider
  defaultColorScheme="dark"
  labels={{ common: { cancel: 'Cancelar' } }}
  portalContainer={() => document.getElementById('overlays')}
>
  <App />
</TuryProvider>

// Everything below it now works
const { colorScheme, changeColorScheme } = useColorScheme()
const labels = useLabels()
toast.success('Saved')`,n=[{provides:"The DOM node every overlay portals into.",reads:"portalContainer",slug:"portal-provider"},{provides:"Every string the library renders, merged over the defaults.",reads:"labels",slug:"labels-provider"},{provides:"The light/dark choice, persisted and painted onto <html>.",reads:"defaultColorScheme",slug:"color-scheme-provider"}];function h(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Core"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"TuryProvider"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"The one element an application mounts at its root."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(t,{props:l})]}),e.jsx(s,{slug:"tury-provider"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it composes"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Outside in:"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"PortalProvider"})," ","→"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"LabelsProvider"})," ","→"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"ColorSchemeProvider"}),", with"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"<Toast />"})," ","after the children."]}),e.jsx(o,{code:a,filename:"tury-provider.tsx",language:"tsx"}),e.jsx("div",{className:"overflow-hidden rounded-lg border border-border",children:e.jsx("table",{className:"w-full text-sm",children:e.jsx("tbody",{children:n.map(r=>e.jsxs("tr",{className:"border-border border-b last:border-b-0",children:[e.jsx("td",{className:"px-4 py-3 align-top",children:e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs",children:r.slug})}),e.jsxs("td",{className:"px-4 py-3 align-top text-muted-foreground",children:["reads"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:r.reads})," ","— ",r.provides]})]},r.slug))})})}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Use the individual providers for one concern alone, e.g. a subtree in a second language."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(o,{code:d,filename:"main.tsx",language:"tsx"})]})]})}export{h as component};
