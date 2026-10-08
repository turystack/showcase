import{j as e,U as a}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const r=[{default:"—",description:"Required by diff, deploy and remove.",name:"--stage",required:!1,type:"<name>"},{default:"AWS_PROFILE",description:"Falls back to the default credential chain.",name:"--profile",required:!1,type:"<name>"},{default:"AWS_REGION",description:"Falls back to the profile's region.",name:"--region",required:!1,type:"<name>"},{default:"false",description:"generate only. Fails when stale, writes nothing.",name:"--check",required:!1,type:"boolean"},{default:"false",description:"Skips pnpm run build. dist/ must be current.",name:"--no-build",required:!1,type:"boolean"},{default:"dist",description:"Compiled output to scan for handlers.",name:"--out-dir",required:!1,type:"<dir>"},{default:"false",description:"Confirms remove.",name:"--yes",required:!1,type:"boolean"}],n=[{default:"—",description:"Bus rule → own queue + DLQ (14 days) → lambda.",name:"EVENTBRIDGE-SQS",required:!1,type:"bus.subscribeQueue"},{default:"—",description:"Bus rule → lambda; 2 retries, then its DLQ.",name:"EVENTBRIDGE",required:!1,type:"bus.subscribe"},{default:"—",description:"Default bus rule on the bucket path → queue + DLQ.",name:"S3",required:!1,type:"defaultBus.subscribeQueue"},{default:"—",description:"Scheduler → lambda; 2 retries, then its DLQ.",name:"SCHEDULE",required:!1,type:"sst.aws.CronV2"}],i=[{default:"—",description:"The project bus, from infra.bus.",name:"dev-acme-events",required:!1,type:"bus"},{default:"—",description:"From infra.bucket. Hash of account + project.",name:"dev-acme-files-<hash6>",required:!1,type:"bucket"},{default:"—",description:"The handler class name, per queue and function.",name:"dev-acme-<Handler>",required:!1,type:"queue, function"},{default:"—",description:"The handler's dead-letter queue.",name:"dev-acme-<Handler>-dlq",required:!1,type:"DLQ"},{default:"—",description:"Every SSM value of the stage.",name:"/dev/acme/<KEY>",required:!1,type:"SSM path"},{default:"—",description:"The SST app; its own stack in the monorepo.",name:"acme-workers",required:!1,type:"SST app"}],l=[{default:"—",description:"Role every lambda runs as. ARN without a path.",name:"WORKERS_ROLE_ARN",required:!1,type:"String"},{default:"—",description:"Private subnets of the Postgres VPC.",name:"WORKERS_VPC_SUBNETS",required:!1,type:"StringList"},{default:"—",description:"Security groups; set with the subnets or not at all.",name:"WORKERS_VPC_SECURITY_GROUPS",required:!1,type:"StringList"}];function u(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Infra & CLI"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["The ",e.jsx("code",{children:"nestjs-events"})," CLI reads every @Handler and writes the SST stack for the workers app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The workers app"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"apps/workers"})," deploys the consumers and schedulers. Name each lambda entry ",e.jsx("code",{children:"*.handler.ts"}),"."]}),e.jsxs("p",{className:"text-muted-foreground",children:["The project config comes from"," ",e.jsx(a,{className:"text-lib underline",to:"/libs/nestjs-events/workers-module",children:"WorkersModule.register"}),": ",e.jsx("code",{children:"project"})," and ",e.jsx("code",{children:"infra"}),", shared by every handler."]}),e.jsx(t,{code:`pnpm add -D sst @aws-sdk/client-ssm @aws-sdk/client-sts
echo .sst >> .gitignore`,filename:"apps/workers",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Commands"}),e.jsx("p",{className:"text-muted-foreground",children:"Run inside the workers app."}),e.jsx(t,{code:`nestjs-events generate            # clean build → discover → write sst.generated.ts (+ sst.config.ts once)
nestjs-events generate --check    # CI gate: fails when sst.generated.ts is stale
nestjs-events diff   --stage dev
nestjs-events deploy --stage dev [--profile acme-dev] [--region us-east-1]
nestjs-events remove --stage dev --yes`,filename:"apps/workers",language:"bash"}),e.jsx(s,{props:r}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"--check"})," names the handler blocks that drifted. diff and deploy run generate first."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What each source gets"}),e.jsxs("p",{className:"text-muted-foreground",children:["Settings come from the"," ",e.jsx(a,{className:"text-lib underline",to:"/libs/nestjs-events/handler-decorator",children:"third @Handler argument"}),". Every handler goes through EventBridge."]}),e.jsx(s,{props:n}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"S3 only publishes to the default bus, so S3 rules live there, filtered by the stage's bucket name."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Broken settings fail at generate, with the handler named, before anything reaches AWS."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Naming: stage first"}),e.jsxs("p",{className:"text-muted-foreground",children:["Every name is ",e.jsx("code",{children:"<stage>-<project>-<name>"}),". With project ",e.jsx("code",{children:"acme"}),", bucket ",e.jsx("code",{children:"files"})," and stage"," ",e.jsx("code",{children:"dev"}),":"]}),e.jsx(s,{props:i}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The root package.json name is not used. deploy checks AWS's name length caps for the stage."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What the stack holds"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"One bus per stage, created by the stack. Never the AWS default bus, which every stage shares."})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Its name reaches each lambda as ",e.jsx("code",{children:"EVENT_BUS_NAME"}),", with"," ",e.jsx("code",{children:"events:PutEvents"}),"."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Also written to SSM at"," ",e.jsx("code",{children:"/<stage>/<project>/EVENT_BUS_NAME"})," for apps outside the stack."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["With ",e.jsx("code",{children:"infra.bucket"}),", one project bucket: EventBridge notifications on, retained on removal."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Every lambda may read and write it. Its name arrives as"," ",e.jsx("code",{children:"BUCKET_NAME"})," and is written to SSM."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Every lambda gets the root ",e.jsx("code",{children:".env"})," keys. Values come from SSM at"," ",e.jsx("code",{children:"/<stage>/<project>/<KEY>"}),"."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Lambda-reserved and other ",e.jsx("code",{children:"AWS_*"})," keys are skipped: they would override the execution role."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Values land in plain text in the function config, readable with"," ",e.jsx("code",{children:"lambda:GetFunctionConfiguration"}),"."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Queues and DLQs are retained when they leave the stack. SST's"," ",e.jsx("code",{children:"'retain'"})," skips SQS, so the stack sets it per queue."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Renaming a handler leaves its old queue and DLQ behind, messages included: drain or delete them by hand."})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Shared role and Postgres VPC"}),e.jsxs("p",{className:"text-muted-foreground",children:["Reserved keys in the root ",e.jsx("code",{children:".env"})," switch these on. They never reach the lambdas; values come from SSM per stage."]}),e.jsx(s,{props:l}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["SST uses a given role as-is, so the stack adds an inline policy,"," ",e.jsx("code",{children:"<stage>-<project>-workers"}),"."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Logs, the bus, the bucket, its queues, the async DLQs and VPC network interfaces. Grant the rest on the role."})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["No internet inside the VPC without a NAT. Publishing to the bus needs a NAT or an ",e.jsx("code",{children:"events"})," VPC endpoint."]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Checks before deploy"}),e.jsx("p",{className:"text-muted-foreground",children:"deploy never logs in. It takes credentials from the environment, then checks before SST runs:"}),e.jsxs("ol",{className:"list-decimal space-y-2 pl-5 text-muted-foreground",children:[e.jsx("li",{children:"Who the credentials are: account, region and ARN are printed."}),e.jsx("li",{children:"Every resource name fits AWS's length cap for the stage: bucket, queues, DLQs, functions."}),e.jsxs("li",{children:["Every ",e.jsx("code",{children:".env"})," key exists in SSM for the stage, and role and VPC values are well-formed. Missing ones get a put-parameter hint."]}),e.jsx("li",{children:"The environment fits Lambda's 4 KB, with 256 bytes kept for SST's own keys."})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Why handlers point at dist/"}),e.jsxs("p",{className:"text-muted-foreground",children:["SST bundles with esbuild, which drops"," ",e.jsx("code",{children:"emitDecoratorMetadata"}),". Nest's constructor injection needs it."]}),e.jsxs("p",{className:"text-muted-foreground",children:["So each function runs the tsc output,"," ",e.jsx("code",{children:"dist/**/*.handler.js"}),", never the TypeScript source."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The generated file"}),e.jsxs("p",{className:"text-muted-foreground",children:["Deterministic: unchanged handlers give a byte-identical file, so"," ",e.jsx("code",{children:"--check"})," can compare it."]}),e.jsx(t,{code:`// Generated by @turystack/nestjs-events — do not edit.

const PROJECT = 'acme'

/** Root \`.env\` keys; deployed values come from SSM \`/<stage>/acme/<KEY>\`. */
const ENV_KEYS = ['DATABASE_URL'] as const

export function workers() {
  // Stage first, in every name and SSM path.
  const prefix = \`\${$app.stage}-\${PROJECT}\`
  const ssm = \`/\${$app.stage}/\${PROJECT}\`

  const bus = new sst.aws.Bus('Bus', {
    transform: { bus: (args) => { args.name = \`\${prefix}-events\` } },
  })
  new aws.ssm.Parameter('EventBusName', {
    name: \`\${ssm}/EVENT_BUS_NAME\`, overwrite: true, type: 'String', value: bus.name,
  })

  // … hash = short stable hash of account + project
  const bucket = new sst.aws.Bucket('Bucket', {
    transform: { bucket: (args) => { args.bucket = $interpolate\`\${prefix}-files-\${hash}\` } },
  })
  new aws.s3.BucketNotification('BucketEvents', { bucket: bucket.name, eventbridge: true })
  // … BucketName SSM parameter, like EventBusName

  // S3 rules live on the default bus; the bucket name keeps stages apart.
  const defaultBus = sst.aws.Bus.get('DefaultBus', 'default')

  // … parameters, environment() (+ BUCKET_NAME, EVENT_BUS_NAME), permissions

  // ResizeAvatar — S3
  const resizeAvatarDlq = new sst.aws.Queue('ResizeAvatarDlq', {
    transform: {
      queue: (args, opts) => {
        args.messageRetentionSeconds = 1209600
        args.name = \`\${prefix}-ResizeAvatar-dlq\`
        opts.retainOnDelete = true
      },
    },
  })
  const resizeAvatarQueue = new sst.aws.Queue('ResizeAvatarQueue', {
    dlq: { queue: resizeAvatarDlq.arn, retry: 3 },
    transform: {
      queue: (args, opts) => {
        args.name = \`\${prefix}-ResizeAvatar\`
        opts.retainOnDelete = true
      },
    },
    visibilityTimeout: '180 seconds',
  })
  defaultBus.subscribeQueue('ResizeAvatar', resizeAvatarQueue, {
    pattern: {
      detail: {
        bucket: { name: [bucket.name] },
        object: { key: [{ wildcard: 'avatars/*.png' }] },
      },
      detailType: ['Object Created'],
      source: ['aws.s3'],
    },
  })
  resizeAvatarQueue.subscribe({
    architecture: 'arm64',
    handler: 'dist/files/resize-avatar.handler.handler',
    memory: '512 MB',
    nodejs: { esbuild: { external: [/* Nest optional packages */] } },
    timeout: '30 seconds',
    environment: environment(),
    name: \`\${prefix}-ResizeAvatar\`,
    permissions,
  }, {
    batch: { partialResponses: true, size: 10 },
  })

  return { bucket: bucket.name, bus: bus.name }
}`,filename:"apps/workers/sst.generated.ts (trimmed)",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"sst.config.ts"})," is written once, only when missing, and imports ",e.jsx("code",{children:"workers()"}),"."]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Its app name is the stack's identity: generate fails unless it is"," ",e.jsx("code",{children:"<project>-workers"}),"."]})]})]})}export{u as component};
