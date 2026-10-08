import{E as i,j as e,cb as r,U as a,a$ as l}from"./index-B7Ig6kNO.js";import{C as c}from"./CodeBlock-jMISp3qZ.js";import{C as s}from"./ComponentPreview-BlMdAug8.js";import{P as t}from"./PropsTable-r9MRwph6.js";import{S as d}from"./SlotsTable-CHbQbO6v.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const n=[["path",{d:"M22 2 2 22",key:"y4kqgn"}]],m=i("slash",n),o=[],x=[{description:"Renders the child (e.g. a router Link) instead of an anchor.",name:"asChild",type:"boolean"},{description:"Navigation target; omitted, the anchor has no href.",name:"href",type:"string"}],h=`import { Breadcrumb } from '@turystack/react-web'

<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/settings">Settings</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Billing</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// A collapsed middle, and a separator glyph of your own
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator><Slash /></Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator><Slash /></Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Invoice 1042</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>

// asChild hands the styling to a router link
<Breadcrumb.Item>
  <Breadcrumb.Link asChild>
    <Link to="/libs/react-web">react-web</Link>
  </Breadcrumb.Link>
</Breadcrumb.Item>`,j={breadcrumb:{label:"Trilha de navegação",more:"Mais"}};function I(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("header",{children:[e.jsx("p",{className:"font-medium text-lib text-xs uppercase tracking-wider",children:"Navigation"}),e.jsx("h1",{className:"mt-2 font-bold font-display text-3xl tracking-tight",children:"Breadcrumb"}),e.jsx("p",{className:"mt-3 max-w-prose text-lg text-muted-foreground",children:"The trail back up the hierarchy, assembled from six parts with no items array."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Props"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["Only"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"Breadcrumb.Link"})," ","takes props; landmark, list and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:'aria-current="page"'})," ","are built in."]}),e.jsx("h3",{className:"font-medium text-sm",children:"Breadcrumb · List · Item · Page · Separator · Ellipsis"}),e.jsx(t,{props:o}),e.jsx("h3",{className:"font-medium text-sm",children:"Breadcrumb.Link"}),e.jsx(t,{props:x})]}),e.jsx(d,{slug:"breadcrumb"}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Structure"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"Breadcrumb.Separator"})," ","is its own list item; write one between each pair."]}),e.jsx(s,{title:"A full trail",children:e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Home"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Settings"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Billing"})})]})})}),e.jsx(s,{title:"One level — a Page on its own",children:e.jsx(r,{children:e.jsx(r.List,{children:e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Dashboard"})})})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Separator"}),e.jsx("p",{className:"max-w-prose text-muted-foreground text-sm",children:"Children replace the default chevron entirely."}),e.jsx(s,{title:"Default chevron and a custom glyph",children:e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Home"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Reports"})})]})}),e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Home"})}),e.jsx(r.Separator,{children:e.jsx(m,{})}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Reports"})})]})}),e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Home"})}),e.jsx(r.Separator,{children:"·"}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Reports"})})]})})]})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Ellipsis"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"Breadcrumb.Ellipsis"})," ","is a static glyph standing in for the levels you left out."]}),e.jsx(s,{title:"A collapsed middle",children:e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Home"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Ellipsis,{})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Invoices"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Invoice 1042"})})]})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Names come from the labels"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:["The"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"breadcrumb.label"})," ","and"," ",e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"breadcrumb.more"})," ","labels come from"," ",e.jsx(a,{className:"text-lib underline underline-offset-4",to:"/libs/react-web/components/labels-provider",children:"LabelsProvider"}),"."]}),e.jsx(s,{title:"Inside LabelsProvider: labels in Portuguese",children:e.jsx(l,{labels:j,children:e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{href:"#",children:"Início"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Ellipsis,{})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Fatura 1042"})})]})})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Link"}),e.jsxs("p",{className:"max-w-prose text-muted-foreground text-sm",children:[e.jsx("code",{className:"rounded-lg bg-muted px-1.5 py-0.5 text-xs",children:"asChild"})," ","passes the breadcrumb class to the child, so a router link fits the trail."]}),e.jsx(s,{title:"A router link through asChild",children:e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{asChild:!0,children:e.jsx(a,{to:"/libs/react-web",children:"react-web"})})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Link,{asChild:!0,children:e.jsx(a,{to:"/libs/react-web/components",children:"Components"})})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"Breadcrumb"})})]})})}),e.jsx(s,{title:"Without an href — a plain, unnavigable anchor",children:e.jsx(r,{children:e.jsxs(r.List,{children:[e.jsx(r.Item,{children:e.jsx(r.Link,{children:"Archived"})}),e.jsx(r.Separator,{}),e.jsx(r.Item,{children:e.jsx(r.Page,{children:"2019"})})]})})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(c,{code:h,filename:"example.tsx",language:"tsx"})]})]})}export{I as component};
