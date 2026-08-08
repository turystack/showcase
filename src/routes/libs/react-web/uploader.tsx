import { createFileRoute } from '@tanstack/react-router'
import { Provider, Uploader } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const uploaderProps = [
	{
		description:
			'Async function called before upload. Receives the file name and must return { fileName, fileNameSigned } where fileNameSigned is a presigned PUT URL.',
		name: 'handler',
		required: true,
		type: '(fileName: string) => Promise<{ fileName: string; fileNameSigned: string }>',
	},
	{
		description:
			'Accepted file types in MIME or extension format (passed to the input accept attribute).',
		name: 'accept',
		type: 'string',
	},
	{
		description: 'Maximum number of files the user can upload at once.',
		name: 'maxFiles',
		type: 'number',
	},
	{
		description: 'Maximum file size in bytes.',
		name: 'maxFileSize',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Disables the uploader, preventing file selection and drop.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description:
			'Handler called after a successful upload. Receives the handler response and the file index.',
		name: 'onUpload',
		type: '(response: UploaderHandlerResponse | UploaderHandlerResponse[], index: number) => void',
	},
]

const usageCode = `import { Uploader } from '@turystack/ui'

async function getUploadUrl(fileName: string) {
  const res = await fetch('/api/upload-url', {
    method: 'POST',
    body: JSON.stringify({ fileName }),
  })
  return res.json() // { fileName, fileNameSigned }
}

// Basic uploader
<Uploader handler={getUploadUrl} />

// Restricted to images, max 5 MB, max 3 files
<Uploader
  handler={getUploadUrl}
  accept="image/*"
  maxFileSize={5 * 1024 * 1024}
  maxFiles={3}
  onUpload={(response) => {
    console.log('Uploaded:', response.fileName)
  }}
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Uploader
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A drag-and-drop file uploader that uploads directly to a presigned
						URL. Tracks upload progress, shows errors, and lets users remove
						files.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={uploaderProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="File uploader (demo — no real upload)">
						<div className="w-full max-w-md">
							<Uploader
								handler={async (name) => ({
									fileName: name,
									fileNameSigned: 'https://httpbin.org/put',
								})}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With restrictions
					</h2>
					<ComponentPreview title="Images only, max 2 MB, max 3 files">
						<div className="w-full max-w-md">
							<Uploader
								accept="image/*"
								handler={async (name) => ({
									fileName: name,
									fileNameSigned: 'https://httpbin.org/put',
								})}
								maxFileSize={2 * 1024 * 1024}
								maxFiles={3}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled uploader">
						<div className="w-full max-w-md">
							<Uploader
								disabled
								handler={async (name) => ({
									fileName: name,
									fileNameSigned: '',
								})}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/uploader')({
	component: Page,
})
