import{j as e,bF as i,bG as d,aa as h,F as c}from"./index-B7Ig6kNO.js";import{C as m}from"./CodeBlock-jMISp3qZ.js";import{C as l}from"./ComponentPreview-BlMdAug8.js";import{P as n}from"./PropsTable-r9MRwph6.js";import{S as p}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const u=[{description:"The application the provider wraps.",name:"children",required:!0,type:"React.ReactNode"},{default:'"system"',description:"Starting scheme; a stored preference wins.",name:"defaultColorScheme",type:'"system" | "dark" | "light"'}],x=[{description:'What was chosen, possibly "system" — not the resolved one.',name:"colorScheme",type:'"system" | "dark" | "light"'},{description:"Persists the scheme and re-renders every consumer.",name:"changeColorScheme",type:"(colorScheme: ColorScheme) => void"}],f=[{term:"Persistence",what:"The choice is written to localStorage under turystack-color-scheme, read once in the initial state. A valid stored value beats defaultColorScheme; anything else is discarded."},{term:"Resolution",what:"On system the provider follows (prefers-color-scheme: dark) with a live listener. Picking an explicit scheme removes it."},{term:"What lands on the document",what:"The root element gets the light or dark class — what the stylesheet keys off — plus a matching data-color-scheme attribute for your own selectors."},{term:"No cross-fade",what:"Every CSS transition is suppressed by an injected stylesheet for the two frames the swap takes, so a theme change does not animate hundreds of colours at once."},{term:"Other tabs",what:"A storage listener follows the key across tabs of the same origin. If another tab clears the preference, this one falls back to defaultColorScheme — the one moment that prop matters after the first visit."},{term:"Browser only",what:"The initial state reads localStorage with no typeof window guard, so the provider cannot be server-rendered as it stands."}],g=`import {
  ColorSchemeProvider,
  useColorScheme,
} from '@turystack/react-web'

// Wrap the app once. TuryProvider already does this for you —
// reach for ColorSchemeProvider directly only when you do not
// want the toaster that TuryProvider also mounts.
<ColorSchemeProvider defaultColorScheme="system">
  <App />
</ColorSchemeProvider>

// Read and write the scheme from anywhere below it
function ThemeMenu() {
  const { colorScheme, changeColorScheme } = useColorScheme()

  return (
    <select
      onChange={(event) =>
        changeColorScheme(event.target.value as ColorScheme)
      }
      value={colorScheme}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  )
}

// Outside a provider the hook throws rather than guessing:
// "useColorScheme must be used within a TuryProvider"`,y=["light","dark","system"];function v(){const[t,o]=c.useState(()=>document.documentElement.dataset.colorScheme??"unset");return c.useEffect(()=>{const r=document.documentElement,s=()=>o(r.dataset.colorScheme??"unset"),a=new MutationObserver(s);return a.observe(r,{attributeFilter:["class","data-color-scheme"]}),s(),()=>a.disconnect()},[]),t}function w(){const{changeColorScheme:t,colorScheme:o}=d(),r=v();return e.jsxs("div",{className:"flex w-full max-w-sm flex-col items-center gap-4",children:[e.jsx("div",{className:"flex flex-wrap justify-center gap-2",children:y.map(s=>e.jsx(h,{onClick:()=>t(s),size:"sm",variant:o===s?"default":"outline",children:s},s))}),e.jsxs("dl",{className:"grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm",children:[e.jsx("dt",{className:"text-muted-foreground",children:"colorScheme"}),e.jsx("dd",{children:e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:o})}),e.jsx("dt",{className:"text-muted-foreground",children:"<html data-color-scheme>"}),e.jsx("dd",{children:e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:r})})]})]})}function T(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Core"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"ColorSchemeProvider"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"Holds the light/dark choice, persists it, and resolves system against the operating system."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(n,{props:u})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"useColorScheme()"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Outside a provider it throws"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"useColorScheme must be used within a TuryProvider"}),"."]}),e.jsx(n,{props:x})]}),e.jsx(p,{slug:"color-scheme-provider"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Live"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"This site is already inside a provider, so the buttons below drive the real thing — the page and the stored preference change with them."}),e.jsx(l,{title:"Choice versus resolution",children:e.jsx(w,{})}),e.jsx(l,{title:"The same state, through ColorSchemeSwitcher",children:e.jsx(i,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it does"}),e.jsx("dl",{className:"max-w-prose space-y-3 text-sm",children:f.map(t=>e.jsxs("div",{children:[e.jsx("dt",{className:"font-medium",children:t.term}),e.jsx("dd",{className:"text-muted-foreground",children:t.what})]},t.term))})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(m,{code:g,filename:"example.tsx",language:"tsx"})]})]})}export{T as component};
