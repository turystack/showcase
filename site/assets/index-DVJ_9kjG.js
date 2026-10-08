import{j as e,_ as c,U as n}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{C as m}from"./ComponentPreview-BlMdAug8.js";import{P as p}from"./PropsTable-r9MRwph6.js";import{g as h,b as x}from"./react-charts-samples-BOPJQqfP.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const u=`import { Chart, Sparkline } from '@turystack/react-charts'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function GrossVolume({ days }: { days: { day: string; current: number; previous: number }[] }) {
  return (
    <Chart
      title="Volume bruto"
      type="area"
      data={days}
      xKey="day"
      series={[{ key: 'current', label: 'Este mês' }]}
      compare={{ key: 'previous', label: 'Mês passado' }}
      valueFormat={(value) => money.format(value)}
      legend
      emptyText="Sem vendas no período"
      loadingText="Carregando o volume bruto"
    />
  )
}

export function BookingsTrend({ weekly }: { weekly: number[] }) {
  return <Sparkline data={weekly} trend="up" />
}`,b=`npx expo install react-native-svg
npm install @turystack/react-charts @wuba/react-native-echarts zrender@6.1.0`,y=`// '@turystack/react-charts' also resolves here under Metro; /mobile carries the types everywhere
import { Chart, ChartThemeProvider } from '@turystack/react-charts/mobile'

export function Revenue({ days }: { days: { day: string; current: number }[] }) {
  return (
    <ChartThemeProvider styles={{ chart: { legendText: { fontSize: 13 } } }}>
      <Chart
        title="Receita"
        type="line"
        data={days}
        xKey="day"
        series={[{ key: 'current', label: 'Este mês' }]}
        emptyText="Sem vendas no período"
        loadingText="Carregando a receita"
      />
    </ChartThemeProvider>
  )
}`,f=`// metro.config.js — ECharts imports tslib, which Metro resolves to a
// wrapper with no default export
const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

const config = getDefaultConfig(__dirname)
const resolveRequest = config.resolver.resolveRequest

config.resolver.resolveRequest = (context, moduleName, platform) =>
  moduleName === 'tslib'
    ? { type: 'sourceFile', filePath: path.join(__dirname, 'node_modules/tslib/tslib.es6.js') }
    : (resolveRequest ?? context.resolveRequest)(context, moduleName, platform)

module.exports = config`,g=`// main.tsx — the order matters
import '@turystack/react-web/styles.css'
import '@turystack/react-charts/styles.css'`,j=[["@turystack/react-charts","Web build; mobile under Metro with exports on (RN 0.79+)"],["@turystack/react-charts/web","Chart, Sparkline and the slot lists, for the DOM"],["@turystack/react-charts/mobile","Chart, Sparkline, ChartThemeProvider, mobile slot lists"],["@turystack/react-charts/styles.css","The web utilities. Import after react-web’s stylesheet"]],v=[["chart1 … chart5","--chart-1 … --chart-5","The series, in order or by color"],["mutedForeground","--muted-foreground","Axis text, previous period, neutral trend"],["border","--border","Grid lines, the empty frame"],["muted","--muted","Loading placeholder; bar hover band (web)"],["background","--background","Ring on the point under the pointer (web)"],["—","--popover, --popover-foreground","The tooltip (web only)"],["—","--radius","Corners of the tooltip, frames, swatches (web only)"],["success","--success","A rising sparkline"],["destructive","--destructive","A falling sparkline"]],k=[{description:"Hex per scheme, merged over react-web’s values.",name:"tokens",type:"{ light?: Partial<ChartTokens>; dark?: … }"},{description:"A style, or a function of the variants, per slot.",name:"styles",type:"{ chart?: ChartSlotStyles; sparkline?: … }"},{default:"the device",description:"Forces light or dark.",name:"colorScheme",type:'"light" | "dark"'},{description:"The charts it themes.",name:"children",required:!0,type:"ReactNode"}],N=`import { CHART_SLOTS, CHART_WEB_SLOTS, CHART_MOBILE_SLOTS, SPARKLINE_SLOTS, slotClass } from '@turystack/react-charts/web'

CHART_SLOTS          // painted on both: root, frame, skeleton, empty, legend…
CHART_WEB_SLOTS      // web only: caption, loadingText, tooltip…
CHART_MOBILE_SLOTS   // mobile only: emptyText, legendText
slotClass('chart', 'legendItem') // → 'chart-legend-item'`;function d({head:s,rows:o}){return e.jsx("div",{className:"overflow-x-auto rounded-lg border border-border",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsx("tr",{className:"border-border border-b bg-muted/50",children:s.map(r=>e.jsx("th",{className:"px-4 py-3 text-left font-medium text-muted-foreground",children:r},r))})}),e.jsx("tbody",{children:o.map((r,i)=>e.jsx("tr",{className:i<o.length-1?"border-border border-b":"",children:r.map((a,l)=>e.jsx("td",{className:l===0?"px-4 py-3 align-top":"px-4 py-3 align-top text-muted-foreground",children:l<r.length-1?e.jsx("code",{className:"whitespace-nowrap rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:a}):a},a))},r[0]))})]})})}const w=["Chart: line, area or bar, stacked or compared","Sparkline: an axis-free trend for a KPI tile","Painted only with react-web's tokens; follows light and dark","Accessible: titled, keyboard-walkable charts","React Native: same props, themed per slot","Loading and empty states keep the plot size"];function E(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/react-charts"}),e.jsx("div",{className:"mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground",children:e.jsx("p",{children:"Charts and sparklines on ECharts, painted with react-web tokens, for the web and React Native."})})]}),e.jsx(m,{title:"Gross volume",children:e.jsx("div",{className:"w-full max-w-3xl",children:e.jsx(c,{compare:{key:"previous",label:"Mês passado"},data:h,emptyText:"Nenhuma venda no período",legend:!0,loadingText:"Carregando o volume bruto",series:[{key:"current",label:"Este mês"}],title:"Volume bruto por dia",type:"area",valueFormat:s=>x.format(s),xKey:"day"})})}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(t,{tabs:[{code:"npm install @turystack/react-charts",label:"npm"},{code:"pnpm add @turystack/react-charts",label:"pnpm"},{code:"yarn add @turystack/react-charts",label:"yarn"},{code:"bun add @turystack/react-charts",label:"bun"}]}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"echarts"})," ","is installed with it;"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"react"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"react-dom"})," ","19+ are peers on the web."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Styles"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Import it after react-web's; it reads react-web's tokens."}),e.jsx(t,{code:g,filename:"main.tsx",language:"tsx"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Mobile"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Same props in React Native, drawn with react-native-svg. No tooltip; colours are react-web's tokens as hex."}),e.jsx(t,{code:b,language:"bash"}),e.jsx(t,{code:y,filename:"revenue.tsx",language:"tsx"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"ChartThemeProvider takes tokens and a style per slot, under the names the web publishes as classes."}),e.jsx(t,{code:f,filename:"metro.config.js",language:"js"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Entry points"}),e.jsx(d,{head:["Import","What it is"],rows:j})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Tokens"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The web reads the custom property; mobile takes the key, as hex, react-web’s values by default."}),e.jsx(d,{head:["Mobile key","Web property","Paints"],rows:v})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ChartThemeProvider (mobile)"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"What a web theme does with CSS: tokens, and a style per slot under the web’s slot names."}),e.jsx(p,{props:k})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Slot lists"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Exported for tooling — the Theme lab is built from them. Each component page has the full table."}),e.jsx(t,{code:N,language:"ts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsx("ul",{className:"space-y-2 text-muted-foreground",children:w.map(s=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:s})]},s))})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Components"}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs(n,{className:"rounded-lg border border-border p-4 transition-colors hover:border-lib/50",to:"/libs/react-charts/chart",children:[e.jsx("p",{className:"font-display font-semibold",children:"Chart"}),e.jsx("p",{className:"mt-1 text-muted-foreground text-sm",children:"Line, area or bar chart over time."})]}),e.jsxs(n,{className:"rounded-lg border border-border p-4 transition-colors hover:border-lib/50",to:"/libs/react-charts/sparkline",children:[e.jsx("p",{className:"font-display font-semibold",children:"Sparkline"}),e.jsx("p",{className:"mt-1 text-muted-foreground text-sm",children:"An axis-free trend for a KPI tile."})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:u,filename:"gross-volume.tsx",language:"tsx"})]})]})}export{E as component};
