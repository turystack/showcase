import{E as x,F as a,j as e,ce as t,aa as n}from"./index-B7Ig6kNO.js";import{C as u}from"./CodeBlock-jMISp3qZ.js";import{C as s}from"./ComponentPreview-BlMdAug8.js";import{P as c}from"./PropsTable-r9MRwph6.js";import{S as j}from"./SlotsTable-CHbQbO6v.js";import{I as i}from"./info-BhVHZk-n.js";import{T as r}from"./triangle-alert-MelD468u.js";import{F as f}from"./flask-conical-DQ-jEUvL.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],d=x("circle-check",g);const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],A=x("circle-x",y),b=[{default:'"default"',description:"Tone of the message; recolours every part via context.",name:"variant",type:'"default" | "info" | "success" | "warning" | "destructive"'},{default:'"card"',description:"card: a bordered box; banner: a one-line shell strip.",name:"layout",type:'"card" | "banner"'},{default:"false",description:"Adds a close button to the banner’s top-right corner.",name:"closable",type:"boolean"},{description:"Fires after the close transition ends, not on the click.",name:"onClose",type:"() => void"}],v=[{description:"Leading icon, tinted by the variant, hidden from AT.",name:"Alert.Icon",type:"children"},{description:"The headline of the banner.",name:"Alert.Title",type:"children"},{description:"Body copy; nested anchors are underlined.",name:"Alert.Description",type:"children"},{description:"A control in its own column beside the text.",name:"Alert.Action",type:"children"}],N=`import { Alert, Button } from '@turystack/react-web'
import { Info } from 'lucide-react'

// Title and description
<Alert>
  <Alert.Title>Booking confirmed</Alert.Title>
  <Alert.Description>We sent the voucher to your email.</Alert.Description>
</Alert>

// With a leading icon
<Alert>
  <Alert.Icon><Info /></Alert.Icon>
  <Alert.Title>Booking confirmed</Alert.Title>
  <Alert.Description>We sent the voucher to your email.</Alert.Description>
</Alert>

// Destructive tone
<Alert variant="destructive">
  <Alert.Icon><TriangleAlert /></Alert.Icon>
  <Alert.Title>Payment failed</Alert.Title>
  <Alert.Description>The card was declined.</Alert.Description>
</Alert>

// With an action in the corner
<Alert>
  <Alert.Title>Sync paused</Alert.Title>
  <Alert.Description>Nothing has been lost.</Alert.Description>
  <Alert.Action>
    <Button size="sm" variant="outline">Resume</Button>
  </Alert.Action>
</Alert>

// Other tones: info, success, warning
<Alert variant="warning">
  <Alert.Icon><TriangleAlert /></Alert.Icon>
  <Alert.Title>Card expires soon</Alert.Title>
</Alert>

// Banner across the top of the shell — role="status", not "alert"
<Alert layout="banner" variant="warning">
  <Alert.Icon><FlaskConical /></Alert.Icon>
  <Alert.Title>Sandbox</Alert.Title>
  <Alert.Description>You are viewing test data.</Alert.Description>
  <Alert.Action>
    <Button size="sm" variant="outline">Go live</Button>
  </Alert.Action>
</Alert>

// Dismissible — onClose fires after the 200ms fade, once it has unmounted
<Alert closable onClose={() => console.log('gone')}>
  <Alert.Title>You can close this one</Alert.Title>
</Alert>`;function W(){const[l,o]=a.useState(null),[h,m]=a.useState(0);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Feedback"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Alert"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"A message that stands out from the page — a card in the content, or a banner across the top of the app."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsx(c,{props:b})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parts"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Every part is typed as an empty object in"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"alert.types.ts"}),": they accept children and nothing else."]}),e.jsx(c,{props:v})]}),e.jsx(j,{slug:"alert"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Variants"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Every tone is a theme token:"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"success"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"warning"})," ","use their own tokens,"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"info"})," ","uses"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"primary"}),", and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"destructive"})," ","the destructive red."]}),e.jsx(s,{title:"All five tones",children:e.jsxs("div",{className:"w-full max-w-md space-y-3",children:[e.jsxs(t,{children:[e.jsx(t.Icon,{children:e.jsx(d,{})}),e.jsx(t.Title,{children:"Booking confirmed"}),e.jsx(t.Description,{children:"We sent the voucher to your email."})]}),e.jsxs(t,{variant:"info",children:[e.jsx(t.Icon,{children:e.jsx(i,{})}),e.jsx(t.Title,{children:"Check-in opens tomorrow"}),e.jsx(t.Description,{children:"You can pick your seat from 08:00."})]}),e.jsxs(t,{variant:"success",children:[e.jsx(t.Icon,{children:e.jsx(d,{})}),e.jsx(t.Title,{children:"Pagamento aprovado"}),e.jsx(t.Description,{children:"O recibo já está na sua caixa de entrada."})]}),e.jsxs(t,{variant:"warning",children:[e.jsx(t.Icon,{children:e.jsx(r,{})}),e.jsx(t.Title,{children:"Card expires soon"}),e.jsx(t.Description,{children:"Update it before 30/10 to keep the subscription running."})]}),e.jsxs(t,{variant:"destructive",children:[e.jsx(t.Icon,{children:e.jsx(r,{})}),e.jsx(t.Title,{children:"Payment failed"}),e.jsx(t.Description,{children:"The card was declined. Try another one."})]})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Composition"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The root reads which parts it contains."}),e.jsx(s,{title:"Title only, title and description, icon added",children:e.jsxs("div",{className:"w-full max-w-md space-y-3",children:[e.jsx(t,{children:e.jsx(t.Title,{children:"Saved"})}),e.jsxs(t,{children:[e.jsx(t.Title,{children:"Saved"}),e.jsx(t.Description,{children:"Your changes are stored on this device."})]}),e.jsxs(t,{children:[e.jsx(t.Icon,{children:e.jsx(i,{})}),e.jsx(t.Title,{children:"Saved"}),e.jsx(t.Description,{children:"Your changes are stored on this device."})]})]})}),e.jsx(s,{title:"With an action",children:e.jsxs("div",{className:"w-full max-w-md space-y-3",children:[e.jsxs(t,{children:[e.jsx(t.Icon,{children:e.jsx(i,{})}),e.jsx(t.Title,{children:"Sync paused"}),e.jsx(t.Description,{children:"Nothing has been lost — pick it up whenever you like."}),e.jsx(t.Action,{children:e.jsx(n,{size:"sm",variant:"outline",children:"Resume"})})]}),e.jsxs(t,{variant:"destructive",children:[e.jsx(t.Icon,{children:e.jsx(r,{})}),e.jsx(t.Title,{children:"Upload failed"}),e.jsx(t.Description,{children:"Three files did not go up."}),e.jsx(t.Action,{children:e.jsx(n,{size:"sm",variant:"destructive",children:"Retry"})})]})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Banner layout"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'layout="banner"'})," ","is a one-line strip for the shell's banner slot, announced politely with"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'role="status"'}),"; the description truncates."]}),e.jsx(s,{title:"Sandbox notice with an action",children:e.jsxs("div",{className:"w-full overflow-hidden rounded-lg border",children:[e.jsxs(t,{layout:"banner",variant:"warning",children:[e.jsx(t.Icon,{children:e.jsx(f,{})}),e.jsx(t.Title,{children:"Sandbox"}),e.jsx(t.Description,{children:"You are viewing test data — nothing here reaches real customers."}),e.jsx(t.Action,{children:e.jsx(n,{size:"sm",variant:"outline",children:"Go live"})})]}),e.jsx("div",{className:"p-6 text-muted-foreground text-sm",children:"App content sits below the banner."})]})}),e.jsx(s,{title:"Closable destructive banner",children:e.jsxs("div",{className:"w-full overflow-hidden rounded-lg border",children:[e.jsxs(t,{closable:!0,layout:"banner",variant:"destructive",children:[e.jsx(t.Icon,{children:e.jsx(A,{})}),e.jsx(t.Title,{children:"Manutenção programada"}),e.jsx(t.Description,{children:"Pagamentos ficam indisponíveis domingo, das 02:00 às 04:00."})]}),e.jsx("div",{className:"p-6 text-muted-foreground text-sm",children:"App content sits below the banner."})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Dismissing"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"The close button does not remove the banner straight away."}),e.jsx(s,{title:"Closable",children:e.jsxs("div",{className:"w-full max-w-md space-y-3",children:[e.jsxs(t,{closable:!0,onClose:()=>o(new Date().toLocaleTimeString()),children:[e.jsx(t.Icon,{children:e.jsx(i,{})}),e.jsx(t.Title,{children:"Close me"}),e.jsx(t.Description,{children:"Watch the fade before the callback runs."})]},h),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(n,{onClick:()=>{o(null),m(p=>p+1)},size:"sm",variant:"outline",children:"Bring it back"}),e.jsx("span",{className:"text-muted-foreground text-xs",children:l?`onClose fired at ${l}`:"Still open"})]})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(u,{code:N,filename:"example.tsx",language:"tsx"})]})]})}export{W as component};
