import{j as e,ar as r,F as c}from"./index-B7Ig6kNO.js";import{C as x}from"./CodeBlock-jMISp3qZ.js";import{C as o}from"./ComponentPreview-BlMdAug8.js";import{P as f}from"./PropsTable-r9MRwph6.js";import{S as g}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const j=[{description:"Resolves each file’s upload target; POSTed as FormData.",name:"handler",required:!0,type:"(fileName: string) => Promise<UploaderHandlerResponse>"},{description:"Accept filter for the picker, listed under the dropzone.",name:"accept",type:"string"},{description:"Max files in the list; 1 turns off multi-select.",name:"maxFiles",type:"number"},{description:"Max size per file, in bytes.",name:"maxFileSize",type:"number"},{default:"false",description:"Blocks the dropzone, picker and row remove buttons.",name:"disabled",type:"boolean"},{description:"Fires once with the rejected files and each reason.",name:"onReject",type:"(rejections: UploaderRejection[]) => void — UploaderRejection = { file: File; reason: UploaderRejectionReason }; UploaderRejectionReason = 'maxFiles' | 'maxFileSize'"},{description:"Fires per finished file with the response and its index.",name:"onUpload",type:"(response: UploaderHandlerResponse, index: number) => void"}],w=`type Upload = {
  url: string
  fields: Record<string, string>
}

type UploaderHandlerResponse = {
  key: string
  cdnUrl: string
  upload: Upload
  expiresIn: number
}`,y=`type UploaderRejectionReason = 'maxFiles' | 'maxFileSize'

type UploaderRejection = {
  file: File
  reason: UploaderRejectionReason
}`,b=`import { Uploader } from '@turystack/react-web'
import type { UploaderHandlerResponse } from '@turystack/react-web'

async function sign(fileName: string): Promise<UploaderHandlerResponse> {
  const res = await fetch(\`/api/uploads/sign?name=\${encodeURIComponent(fileName)}\`)
  return res.json()
}

// The whole component: a handler is the only thing it needs
<Uploader handler={sign} />

// Take the CDN url once each file lands
<Uploader
  handler={sign}
  onUpload={(response, index) => {
    console.log(index, response.cdnUrl)
  }}
/>

// Filter the picker, cap the count, cap the weight
<Uploader
  accept="image/*,.pdf"
  handler={sign}
  maxFileSize={5_000_000}
  maxFiles={3}
/>

// Told which files a limit turned away, and why
<Uploader
  handler={sign}
  maxFileSize={5_000_000}
  maxFiles={3}
  onReject={(rejections) => {
    for (const { file, reason } of rejections) {
      console.log(file.name, reason)
    }
  }}
/>

// One file only — this also drops the input's multiple attribute
<Uploader handler={sign} maxFiles={1} />

// Locked
<Uploader disabled handler={sign} />`,m="https://uploader.preview.invalid/bucket";function N(){c.useEffect(()=>{const s=window.XMLHttpRequest;class i extends s{simulated=!1;open(l,a){if(a===m){this.simulated=!0;return}super.open(l,a)}send(l){if(!this.simulated){super.send(l);return}const a=100;let t=0;const p=()=>{if(t=Math.min(a,t+20),this.upload.dispatchEvent(new ProgressEvent("progress",{lengthComputable:!0,loaded:t,total:a})),t<a){window.setTimeout(p,200);return}Object.defineProperty(this,"status",{configurable:!0,value:204}),this.onload?.(new ProgressEvent("load"))};window.setTimeout(p,200)}}return window.XMLHttpRequest=i,()=>{window.XMLHttpRequest=s}},[])}function h(s){return new Promise(i=>{window.setTimeout(i,s)})}async function d(s){return await h(400),{cdnUrl:`https://cdn.preview.invalid/${s}`,expiresIn:3600,key:`uploads/${s}`,upload:{fields:{key:`uploads/${s}`},url:m}}}async function v(){throw await h(400),new Error("This preview signs nothing.")}function U(){const[s,i]=c.useState([]);return e.jsxs("div",{className:"flex w-full max-w-md flex-col gap-3",children:[e.jsx(r,{handler:d,onUpload:(n,l)=>{i(a=>[...a,`${l} → ${n.cdnUrl}`])}}),e.jsx("p",{className:"text-muted-foreground text-xs",children:s.length===0?"onUpload has not fired yet.":`onUpload fired ${s.length} time(s):`}),s.length>0&&e.jsx("ul",{className:"flex flex-col gap-1",children:s.map(n=>e.jsx("li",{children:e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:n})},n))})]})}function R(){const[s,i]=c.useState([]),n=c.useRef(0);return e.jsxs("div",{className:"flex w-full max-w-md flex-col gap-3",children:[e.jsx(r,{handler:d,maxFileSize:5e4,maxFiles:2,onReject:l=>{i(a=>[...a,...l.map(t=>(n.current+=1,`${n.current}. ${t.file.name} — ${t.reason}`))])}}),e.jsx("p",{className:"text-muted-foreground text-xs",children:"maxFiles=2, maxFileSize=50 KB — pick three files, or one over 50 KB, to see onReject fire."}),s.length>0&&e.jsx("ul",{className:"flex flex-col gap-1",children:s.map(l=>e.jsx("li",{children:e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:l})},l))})]})}function k(){const[s,i]=c.useState([]),n=c.useRef({}),l=c.useCallback(t=>new Promise(p=>{n.current[t]=()=>{p({cdnUrl:`https://cdn.preview.invalid/${t}`,expiresIn:3600,key:`uploads/${t}`,upload:{fields:{key:`uploads/${t}`},url:m}})},i(u=>[...u,t])}),[]);function a(){for(const t of Object.values(n.current))t();n.current={},i([])}return e.jsxs("div",{className:"w-full max-w-md space-y-3",children:[e.jsx(r,{handler:l}),e.jsx("button",{className:"rounded-md border border-border px-3 py-1.5 text-xs disabled:opacity-50",disabled:s.length===0,onClick:a,type:"button",children:s.length>0?`Sign ${s.length} pending file(s) and start uploading`:'Pick a file — it holds at "pending" until you sign it below'})]})}function E(){return N(),e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Form"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Uploader"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A dropzone with a file list under it."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(f,{props:j}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Seven props, no HTML passthrough: no"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"className"}),", no"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"ref"}),", no way to relabel the dropzone."]})]}),e.jsx(g,{slug:"uploader"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The handler contract"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The handler is called once per file with that file's name, and is expected to come back with a signed destination."}),e.jsx(x,{code:w,filename:"uploader.types.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The upload"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Drop a file on the previews below, or click to pick one."}),e.jsx(o,{title:"Pick or drop a file, and watch onUpload",children:e.jsx(U,{})}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Here the handler refuses to sign: the file never uploads and the row ends on a red icon."}),e.jsx(o,{title:"A handler that throws",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{handler:v})})}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Rows are matched by id, not position, so removing one file mid-upload does not scramble the rest."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Pending"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["A file sits at"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"pending"})," ","— clock icon, no progress bar — for as long as its handler call takes to resolve."]}),e.jsx(o,{title:"pending until you sign it",children:e.jsx(k,{})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Limits"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"accept"})," ","only filters the native picker — a dropped file is never rechecked against it."]}),e.jsx(o,{title:'accept="image/*,.pdf" — echoed under the dropzone',children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{accept:"image/*,.pdf",handler:d})})}),e.jsx(o,{title:"maxFiles={2} — pick three, keep two",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{handler:d,maxFiles:2})})}),e.jsx(o,{title:"maxFiles={1} — the picker drops multi-select",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{handler:d,maxFiles:1})})}),e.jsx(o,{title:"maxFileSize={50_000} — over 50 KB is rejected",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{handler:d,maxFileSize:5e4})})}),e.jsx(o,{title:"onReject — told which file, and why",children:e.jsx(R,{})}),e.jsx(x,{code:y,filename:"uploader.types.ts",language:"ts"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Disabled"}),e.jsx(o,{title:"Nothing goes in, nothing comes out",children:e.jsx("div",{className:"w-full max-w-md",children:e.jsx(r,{disabled:!0,handler:d})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(x,{code:b,filename:"example.tsx",language:"tsx"})]})]})}export{E as component};
