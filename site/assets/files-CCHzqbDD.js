import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Files and URLs"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Two fields whose validation is mostly a security question, and where each check alone misses the attack."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"FileSchema"}),e.jsx("p",{className:"text-muted-foreground",children:'Zod can say "this is a File". What matters is the rest: a size ceiling, a MIME allowlist, a name that cannot traverse out of the upload directory or hide its real extension behind a bidi override, and agreement between the declared MIME type and the extension.'}),e.jsx(t,{code:`import { FileSchema, ImageSchema } from '@turystack/fields'

const Attachment = FileSchema({
  accept: ['application/pdf', 'image/*'],
  maxSize: 5 * 1024 * 1024,
})

Attachment.safeParse(new File([], 'payload.png', { type: 'application/pdf' }))
// fileExtensionMismatch — the oldest upload trick there is

Attachment.safeParse(new File([], '../escape.png', { type: 'image/png' }))
// invalidFileName

ImageSchema().safeParse(svgFile)  // fileTypeNotAllowed — svg executes script inline`,filename:"file.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"UrlSchema"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"z.url()"})," accepts ",e.jsx("code",{children:"javascript:alert(1)"})," and"," ",e.jsx("code",{children:"http://169.254.169.254/"}),". The first executes when rendered as a link; the second turns any server-side fetch of the stored value into a request to the cloud metadata service."]}),e.jsx(t,{code:`import { UrlSchema } from '@turystack/fields'

const Webhook = UrlSchema({ blockPrivateHosts: true, requireHttps: true })

Webhook.safeParse('javascript:alert(1)')     // urlProtocolNotAllowed
Webhook.safeParse('http://127.0.0.1')        // urlHostNotAllowed
Webhook.safeParse('http://service.internal') // urlHostNotAllowed

UrlSchema().parse(' HTTPS://Example.com/A ') // 'https://example.com/A'`,filename:"url.ts",language:"ts"}),e.jsx(a,{props:[{default:"['https:', 'http:']",description:"Accepted protocols.",name:"protocols",type:"readonly string[]"},{default:"false",description:"Accepts only https:.",name:"requireHttps",type:"boolean"},{default:"false",description:"Rejects loopback, link-local, private ranges and .internal / .local hosts. Turn this on wherever the server itself will fetch the value.",name:"blockPrivateHosts",type:"boolean"},{default:"2048",description:"Maximum length.",name:"max",type:"number"}]})]})]})}export{n as component};
