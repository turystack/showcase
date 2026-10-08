import { createFileRoute, Link } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/infra')({
	component: Page,
})

const flags = [
	{
		default: '—',
		description: 'Required by diff, deploy and remove.',
		name: '--stage',
		required: false,
		type: '<name>',
	},
	{
		default: 'AWS_PROFILE',
		description: 'Falls back to the default credential chain.',
		name: '--profile',
		required: false,
		type: '<name>',
	},
	{
		default: 'AWS_REGION',
		description: "Falls back to the profile's region.",
		name: '--region',
		required: false,
		type: '<name>',
	},
	{
		default: 'false',
		description: 'generate only. Fails when stale, writes nothing.',
		name: '--check',
		required: false,
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Skips pnpm run build. dist/ must be current.',
		name: '--no-build',
		required: false,
		type: 'boolean',
	},
	{
		default: 'dist',
		description: 'Compiled output to scan for handlers.',
		name: '--out-dir',
		required: false,
		type: '<dir>',
	},
	{
		default: 'false',
		description: 'Confirms remove.',
		name: '--yes',
		required: false,
		type: 'boolean',
	},
]

const generated = [
	{
		default: '—',
		description: 'Bus rule → own queue + DLQ (14 days) → lambda.',
		name: 'EVENTBRIDGE-SQS',
		required: false,
		type: 'bus.subscribeQueue',
	},
	{
		default: '—',
		description: 'Bus rule → lambda; 2 retries, then its DLQ.',
		name: 'EVENTBRIDGE',
		required: false,
		type: 'bus.subscribe',
	},
	{
		default: '—',
		description: 'Default bus rule on the bucket path → queue + DLQ.',
		name: 'S3',
		required: false,
		type: 'defaultBus.subscribeQueue',
	},
	{
		default: '—',
		description: 'Scheduler → lambda; 2 retries, then its DLQ.',
		name: 'SCHEDULE',
		required: false,
		type: 'sst.aws.CronV2',
	},
]

const names = [
	{
		default: '—',
		description: 'The project bus, from infra.bus.',
		name: 'dev-acme-events',
		required: false,
		type: 'bus',
	},
	{
		default: '—',
		description: 'From infra.bucket. Hash of account + project.',
		name: 'dev-acme-files-<hash6>',
		required: false,
		type: 'bucket',
	},
	{
		default: '—',
		description: 'The handler class name, per queue and function.',
		name: 'dev-acme-<Handler>',
		required: false,
		type: 'queue, function',
	},
	{
		default: '—',
		description: "The handler's dead-letter queue.",
		name: 'dev-acme-<Handler>-dlq',
		required: false,
		type: 'DLQ',
	},
	{
		default: '—',
		description: 'Every SSM value of the stage.',
		name: '/dev/acme/<KEY>',
		required: false,
		type: 'SSM path',
	},
	{
		default: '—',
		description: 'The SST app; its own stack in the monorepo.',
		name: 'acme-workers',
		required: false,
		type: 'SST app',
	},
]

const infraKeys = [
	{
		default: '—',
		description: 'Role every lambda runs as. ARN without a path.',
		name: 'WORKERS_ROLE_ARN',
		required: false,
		type: 'String',
	},
	{
		default: '—',
		description: 'Private subnets of the Postgres VPC.',
		name: 'WORKERS_VPC_SUBNETS',
		required: false,
		type: 'StringList',
	},
	{
		default: '—',
		description: 'Security groups; set with the subnets or not at all.',
		name: 'WORKERS_VPC_SECURITY_GROUPS',
		required: false,
		type: 'StringList',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Infra &amp; CLI
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The <code>nestjs-events</code> CLI reads every @Handler and writes the
					SST stack for the workers app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The workers app</h2>
				<p className="text-muted-foreground">
					<code>apps/workers</code> deploys the consumers and schedulers. Name
					each lambda entry <code>*.handler.ts</code>.
				</p>
				<p className="text-muted-foreground">
					The project config comes from{' '}
					<Link
						className="text-lib underline"
						to="/libs/nestjs-events/workers-module"
					>
						WorkersModule.register
					</Link>
					: <code>project</code> and <code>infra</code>, shared by every
					handler.
				</p>
				<CodeBlock
					code={`pnpm add -D sst @aws-sdk/client-ssm @aws-sdk/client-sts
echo .sst >> .gitignore`}
					filename="apps/workers"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Commands</h2>
				<p className="text-muted-foreground">Run inside the workers app.</p>
				<CodeBlock
					code={`nestjs-events generate            # clean build → discover → write sst.generated.ts (+ sst.config.ts once)
nestjs-events generate --check    # CI gate: fails when sst.generated.ts is stale
nestjs-events diff   --stage dev
nestjs-events deploy --stage dev [--profile acme-dev] [--region us-east-1]
nestjs-events remove --stage dev --yes`}
					filename="apps/workers"
					language="bash"
				/>
				<PropsTable props={flags} />
				<p className="text-muted-foreground text-sm">
					<code>--check</code> names the handler blocks that drifted. diff and
					deploy run generate first.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What each source gets
				</h2>
				<p className="text-muted-foreground">
					Settings come from the{' '}
					<Link
						className="text-lib underline"
						to="/libs/nestjs-events/handler-decorator"
					>
						third @Handler argument
					</Link>
					. Every handler goes through EventBridge.
				</p>
				<PropsTable props={generated} />
				<p className="text-muted-foreground text-sm">
					S3 only publishes to the default bus, so S3 rules live there, filtered
					by the stage's bucket name.
				</p>
				<p className="text-muted-foreground text-sm">
					Broken settings fail at generate, with the handler named, before
					anything reaches AWS.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Naming: stage first
				</h2>
				<p className="text-muted-foreground">
					Every name is <code>&lt;stage&gt;-&lt;project&gt;-&lt;name&gt;</code>.
					With project <code>acme</code>, bucket <code>files</code> and stage{' '}
					<code>dev</code>:
				</p>
				<PropsTable props={names} />
				<p className="text-muted-foreground text-sm">
					The root package.json name is not used. deploy checks AWS's name
					length caps for the stage.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What the stack holds
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							One bus per stage, created by the stack. Never the AWS default
							bus, which every stage shares.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Its name reaches each lambda as <code>EVENT_BUS_NAME</code>, with{' '}
							<code>events:PutEvents</code>.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Also written to SSM at{' '}
							<code>/&lt;stage&gt;/&lt;project&gt;/EVENT_BUS_NAME</code> for
							apps outside the stack.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							With <code>infra.bucket</code>, one project bucket: EventBridge
							notifications on, retained on removal.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every lambda may read and write it. Its name arrives as{' '}
							<code>BUCKET_NAME</code> and is written to SSM.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every lambda gets the root <code>.env</code> keys. Values come
							from SSM at{' '}
							<code>/&lt;stage&gt;/&lt;project&gt;/&lt;KEY&gt;</code>.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Lambda-reserved and other <code>AWS_*</code> keys are skipped:
							they would override the execution role.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Values land in plain text in the function config, readable with{' '}
							<code>lambda:GetFunctionConfiguration</code>.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Queues and DLQs are retained when they leave the stack. SST's{' '}
							<code>'retain'</code> skips SQS, so the stack sets it per queue.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Renaming a handler leaves its old queue and DLQ behind, messages
							included: drain or delete them by hand.
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Shared role and Postgres VPC
				</h2>
				<p className="text-muted-foreground">
					Reserved keys in the root <code>.env</code> switch these on. They
					never reach the lambdas; values come from SSM per stage.
				</p>
				<PropsTable props={infraKeys} />
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							SST uses a given role as-is, so the stack adds an inline policy,{' '}
							<code>&lt;stage&gt;-&lt;project&gt;-workers</code>.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Logs, the bus, the bucket, its queues, the async DLQs and VPC
							network interfaces. Grant the rest on the role.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							No internet inside the VPC without a NAT. Publishing to the bus
							needs a NAT or an <code>events</code> VPC endpoint.
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Checks before deploy
				</h2>
				<p className="text-muted-foreground">
					deploy never logs in. It takes credentials from the environment, then
					checks before SST runs:
				</p>
				<ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
					<li>Who the credentials are: account, region and ARN are printed.</li>
					<li>
						Every resource name fits AWS's length cap for the stage: bucket,
						queues, DLQs, functions.
					</li>
					<li>
						Every <code>.env</code> key exists in SSM for the stage, and role
						and VPC values are well-formed. Missing ones get a put-parameter
						hint.
					</li>
					<li>
						The environment fits Lambda's 4 KB, with 256 bytes kept for SST's
						own keys.
					</li>
				</ol>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Why handlers point at dist/
				</h2>
				<p className="text-muted-foreground">
					SST bundles with esbuild, which drops{' '}
					<code>emitDecoratorMetadata</code>. Nest's constructor injection needs
					it.
				</p>
				<p className="text-muted-foreground">
					So each function runs the tsc output,{' '}
					<code>{'dist/**/*.handler.js'}</code>, never the TypeScript source.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The generated file
				</h2>
				<p className="text-muted-foreground">
					Deterministic: unchanged handlers give a byte-identical file, so{' '}
					<code>--check</code> can compare it.
				</p>
				<CodeBlock
					code={`// Generated by @turystack/nestjs-events — do not edit.

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
}`}
					filename="apps/workers/sst.generated.ts (trimmed)"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					<code>sst.config.ts</code> is written once, only when missing, and
					imports <code>workers()</code>.
				</p>
				<p className="text-muted-foreground text-sm">
					Its app name is the stack's identity: generate fails unless it is{' '}
					<code>&lt;project&gt;-workers</code>.
				</p>
			</div>
		</div>
	)
}
