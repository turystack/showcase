import { createFileRoute } from '@tanstack/react-router'
import {
	Uploader,
	type UploaderHandlerResponse,
	type UploaderRejection,
} from '@turystack/react-web'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/uploader/uploader.types.ts`. The
 * type is one flat `UploaderProps` bag now — the old
 * `BaseUploaderProps & (SingleUploaderProps | MultipleUploaderProps)` union is
 * gone, along with the array form of `onUpload` it existed to type.
 */
const uploaderProps = [
	{
		description: 'Resolves each file’s upload target; POSTed as FormData.',
		name: 'handler',
		required: true,
		type: '(fileName: string) => Promise<UploaderHandlerResponse>',
	},
	{
		description: 'Accept filter for the picker, listed under the dropzone.',
		name: 'accept',
		type: 'string',
	},
	{
		description: 'Max files in the list; 1 turns off multi-select.',
		name: 'maxFiles',
		type: 'number',
	},
	{
		description: 'Max size per file, in bytes.',
		name: 'maxFileSize',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Blocks the dropzone, picker and row remove buttons.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Fires once with the rejected files and each reason.',
		name: 'onReject',
		type: "(rejections: UploaderRejection[]) => void — UploaderRejection = { file: File; reason: UploaderRejectionReason }; UploaderRejectionReason = 'maxFiles' | 'maxFileSize'",
	},
	{
		description: 'Fires per finished file with the response and its index.',
		name: 'onUpload',
		type: '(response: UploaderHandlerResponse, index: number) => void',
	},
]

const handlerCode = `type Upload = {
  url: string
  fields: Record<string, string>
}

type UploaderHandlerResponse = {
  key: string
  cdnUrl: string
  upload: Upload
  expiresIn: number
}`

const rejectionCode = `type UploaderRejectionReason = 'maxFiles' | 'maxFileSize'

type UploaderRejection = {
  file: File
  reason: UploaderRejectionReason
}`

const usageCode = `import { Uploader } from '@turystack/react-web'
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
<Uploader disabled handler={sign} />`

const PREVIEW_ENDPOINT = 'https://uploader.preview.invalid/bucket'

/**
 * The showcase has no upload server, and Uploader reaches for one directly
 * through `new XMLHttpRequest()` — there is no seam to hand it a fake. So a
 * stand-in is installed for as long as this page is mounted. It answers only
 * requests aimed at PREVIEW_ENDPOINT and passes every other URL to the
 * browser's own implementation, so nothing else on the page is touched.
 *
 * Without it the progress bar, the done state and `onUpload` would all be
 * undemonstrable here: the POST would simply fail and every file would land on
 * `error`. Everything else in these previews — the picker, the drop target,
 * `accept`, `maxFiles`, `maxFileSize`, `disabled`, removal — is the real
 * component with no help from this.
 */
function usePreviewUploadServer() {
	useEffect(() => {
		const RealXhr = window.XMLHttpRequest

		class PreviewXhr extends RealXhr {
			simulated = false

			open(method: string, url: string | URL) {
				if (url === PREVIEW_ENDPOINT) {
					this.simulated = true
					return
				}
				super.open(method, url)
			}

			send(body?: Document | XMLHttpRequestBodyInit | null) {
				if (!this.simulated) {
					super.send(body)
					return
				}

				const total = 100
				let loaded = 0

				const tick = () => {
					loaded = Math.min(total, loaded + 20)
					this.upload.dispatchEvent(
						new ProgressEvent('progress', {
							lengthComputable: true,
							loaded,
							total,
						}),
					)
					if (loaded < total) {
						window.setTimeout(tick, 200)
						return
					}
					Object.defineProperty(this, 'status', {
						configurable: true,
						value: 204,
					})
					this.onload?.(new ProgressEvent('load'))
				}

				window.setTimeout(tick, 200)
			}
		}

		window.XMLHttpRequest = PreviewXhr

		return () => {
			window.XMLHttpRequest = RealXhr
		}
	}, [])
}

function wait(ms: number) {
	return new Promise<void>((resolve) => {
		window.setTimeout(resolve, ms)
	})
}

async function previewHandler(
	fileName: string,
): Promise<UploaderHandlerResponse> {
	await wait(400)
	return {
		cdnUrl: `https://cdn.preview.invalid/${fileName}`,
		expiresIn: 3600,
		key: `uploads/${fileName}`,
		upload: {
			fields: {
				key: `uploads/${fileName}`,
			},
			url: PREVIEW_ENDPOINT,
		},
	}
}

async function refusingHandler(): Promise<UploaderHandlerResponse> {
	await wait(400)
	throw new Error('This preview signs nothing.')
}

function UploadLogExample() {
	const [log, setLog] = useState<string[]>([])

	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<Uploader
				handler={previewHandler}
				onUpload={(response: UploaderHandlerResponse, index: number) => {
					setLog((entries) => [
						...entries,
						`${index} → ${response.cdnUrl}`,
					])
				}}
			/>
			<p className="text-muted-foreground text-xs">
				{log.length === 0
					? 'onUpload has not fired yet.'
					: `onUpload fired ${log.length} time(s):`}
			</p>
			{log.length > 0 && (
				<ul className="flex flex-col gap-1">
					{log.map((entry) => (
						<li key={entry}>
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								{entry}
							</code>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

function RejectionLogExample() {
	const [log, setLog] = useState<string[]>([])
	const countRef = useRef(0)

	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<Uploader
				handler={previewHandler}
				maxFileSize={50_000}
				maxFiles={2}
				onReject={(rejections: UploaderRejection[]) => {
					setLog((entries) => [
						...entries,
						...rejections.map((rejection) => {
							countRef.current += 1
							return `${countRef.current}. ${rejection.file.name} — ${rejection.reason}`
						}),
					])
				}}
			/>
			<p className="text-muted-foreground text-xs">
				maxFiles=2, maxFileSize=50 KB — pick three files, or one over 50 KB, to
				see onReject fire.
			</p>
			{log.length > 0 && (
				<ul className="flex flex-col gap-1">
					{log.map((entry) => (
						<li key={entry}>
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								{entry}
							</code>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

function PendingPreview() {
	const [pendingFiles, setPendingFiles] = useState<string[]>([])
	const resolversRef = useRef<Record<string, () => void>>({})

	const handler = useCallback((fileName: string) => {
		return new Promise<UploaderHandlerResponse>((resolve) => {
			resolversRef.current[fileName] = () => {
				resolve({
					cdnUrl: `https://cdn.preview.invalid/${fileName}`,
					expiresIn: 3600,
					key: `uploads/${fileName}`,
					upload: {
						fields: {
							key: `uploads/${fileName}`,
						},
						url: PREVIEW_ENDPOINT,
					},
				})
			}
			setPendingFiles((files) => [
				...files,
				fileName,
			])
		})
	}, [])

	function releaseAll() {
		for (const resolve of Object.values(resolversRef.current)) {
			resolve()
		}
		resolversRef.current = {}
		setPendingFiles([])
	}

	return (
		<div className="w-full max-w-md space-y-3">
			<Uploader handler={handler} />
			<button
				className="rounded-md border border-border px-3 py-1.5 text-xs disabled:opacity-50"
				disabled={pendingFiles.length === 0}
				onClick={releaseAll}
				type="button"
			>
				{pendingFiles.length > 0
					? `Sign ${pendingFiles.length} pending file(s) and start uploading`
					: 'Pick a file — it holds at "pending" until you sign it below'}
			</button>
		</div>
	)
}

function Page() {
	usePreviewUploadServer()

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Uploader
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A dropzone with a file list under it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={uploaderProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Seven props, no HTML passthrough: no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					, no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">ref</code>
					, no way to relabel the dropzone.
				</p>
			</section>

			<SlotsSection slug="uploader" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The handler contract
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The handler is called once per file with that file's name, and is
					expected to come back with a signed destination.
				</p>
				<CodeBlock
					code={handlerCode}
					filename="uploader.types.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The upload</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Drop a file on the previews below, or click to pick one.
				</p>
				<ComponentPreview title="Pick or drop a file, and watch onUpload">
					<UploadLogExample />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Here the handler refuses to sign: the file never uploads and the row
					ends on a red icon.
				</p>
				<ComponentPreview title="A handler that throws">
					<div className="w-full max-w-md">
						<Uploader handler={refusingHandler} />
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows are matched by id, not position, so removing one file mid-upload
					does not scramble the rest.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Pending</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A file sits at{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						pending
					</code>{' '}
					— clock icon, no progress bar — for as long as its handler call takes
					to resolve.
				</p>
				<ComponentPreview title="pending until you sign it">
					<PendingPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Limits</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						accept
					</code>{' '}
					only filters the native picker — a dropped file is never rechecked
					against it.
				</p>
				<ComponentPreview title='accept="image/*,.pdf" — echoed under the dropzone'>
					<div className="w-full max-w-md">
						<Uploader
							accept="image/*,.pdf"
							handler={previewHandler}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="maxFiles={2} — pick three, keep two">
					<div className="w-full max-w-md">
						<Uploader
							handler={previewHandler}
							maxFiles={2}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="maxFiles={1} — the picker drops multi-select">
					<div className="w-full max-w-md">
						<Uploader
							handler={previewHandler}
							maxFiles={1}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="maxFileSize={50_000} — over 50 KB is rejected">
					<div className="w-full max-w-md">
						<Uploader
							handler={previewHandler}
							maxFileSize={50_000}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="onReject — told which file, and why">
					<RejectionLogExample />
				</ComponentPreview>
				<CodeBlock
					code={rejectionCode}
					filename="uploader.types.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Disabled</h2>
				<ComponentPreview title="Nothing goes in, nothing comes out">
					<div className="w-full max-w-md">
						<Uploader
							disabled
							handler={previewHandler}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/uploader')({
	component: Page,
})
