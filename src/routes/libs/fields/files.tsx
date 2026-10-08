import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/files')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Files and URLs
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Two fields whose validation is mostly a security question, and where
					each check alone misses the attack.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">FileSchema</h2>
				<p className="text-muted-foreground">
					Zod can say "this is a File". What matters is the rest: a size
					ceiling, a MIME allowlist, a name that cannot traverse out of the
					upload directory or hide its real extension behind a bidi override,
					and agreement between the declared MIME type and the extension.
				</p>
				<CodeBlock
					code={`import { FileSchema, ImageSchema } from '@turystack/fields'

const Attachment = FileSchema({
  accept: ['application/pdf', 'image/*'],
  maxSize: 5 * 1024 * 1024,
})

Attachment.safeParse(new File([], 'payload.png', { type: 'application/pdf' }))
// fileExtensionMismatch — the oldest upload trick there is

Attachment.safeParse(new File([], '../escape.png', { type: 'image/png' }))
// invalidFileName

ImageSchema().safeParse(svgFile)  // fileTypeNotAllowed — svg executes script inline`}
					filename="file.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">UrlSchema</h2>
				<p className="text-muted-foreground">
					<code>z.url()</code> accepts <code>javascript:alert(1)</code> and{' '}
					<code>http://169.254.169.254/</code>. The first executes when rendered
					as a link; the second turns any server-side fetch of the stored value
					into a request to the cloud metadata service.
				</p>
				<CodeBlock
					code={`import { UrlSchema } from '@turystack/fields'

const Webhook = UrlSchema({ blockPrivateHosts: true, requireHttps: true })

Webhook.safeParse('javascript:alert(1)')     // urlProtocolNotAllowed
Webhook.safeParse('http://127.0.0.1')        // urlHostNotAllowed
Webhook.safeParse('http://service.internal') // urlHostNotAllowed

UrlSchema().parse(' HTTPS://Example.com/A ') // 'https://example.com/A'`}
					filename="url.ts"
					language="ts"
				/>
				<PropsTable
					props={[
						{
							default: "['https:', 'http:']",
							description: 'Accepted protocols.',
							name: 'protocols',
							type: 'readonly string[]',
						},
						{
							default: 'false',
							description: 'Accepts only https:.',
							name: 'requireHttps',
							type: 'boolean',
						},
						{
							default: 'false',
							description:
								'Rejects loopback, link-local, private ranges and .internal / .local hosts. Turn this on wherever the server itself will fetch the value.',
							name: 'blockPrivateHosts',
							type: 'boolean',
						},
						{
							default: '2048',
							description: 'Maximum length.',
							name: 'max',
							type: 'number',
						},
					]}
				/>
			</div>
		</div>
	)
}
