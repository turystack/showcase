import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-storage/storage-service')({
	component: Page,
})

const contextMethods = [
	{
		description:
			'Validates the content type and signs a POST policy for a temp key. Output discriminated by visibility.',
		name: 'signUpload',
		required: true,
		type: '({ context, fileName, contentType, ownerId }) => Promise<SignUploadOutputOf<C>>',
	},
	{
		description:
			'Existence check, then copies temp → final key. url is string (PUBLIC) or null (PRIVATE).',
		name: 'commitUpload',
		required: true,
		type: '({ context, sourceKey, targetId?, secondaryTargetId? }) => Promise<CommitUploadOutputOf<C>>',
	},
	{
		description:
			'For update inputs: temp key → commit and return the public URL; anything else → pass through.',
		name: 'resolvePublicUpload',
		required: true,
		type: '({ context, value, targetId?, secondaryTargetId? }) => Promise<string | null | undefined>',
	},
	{
		description: 'Commit a PRIVATE upload and return { key, fileName }.',
		name: 'resolvePrivateUpload',
		required: true,
		type: '({ context, value, targetId?, secondaryTargetId? }) => Promise<{ key, fileName }>',
	},
	{
		description:
			'Presigned GET with the original file name restored via Content-Disposition.',
		name: 'signDownload',
		required: true,
		type: '({ key }) => Promise<{ downloadUrl, fileName, expiresIn }>',
	},
	{
		description: 'Deletes an object from the app bucket.',
		name: 'deleteByKey',
		required: true,
		type: '(key) => Promise<void>',
	},
]

const exceptions = [
	{
		description: 'Content type not in the context allow-list.',
		name: 'StorageContentTypeNotAllowedError',
		required: false,
		type: 'HTTP 400',
	},
	{
		description: 'Temp or download object missing.',
		name: 'StorageObjectNotFoundError',
		required: false,
		type: 'HTTP 404',
	},
	{
		description: 'Context name has no definition in register().',
		name: 'StorageContextNotConfiguredError',
		required: false,
		type: 'HTTP 500',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					StorageService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Context-driven uploads and downloads: every parameter comes from the
					context definition, so call sites only pass the context name.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sign an upload</h2>
				<CodeBlock
					code={`const out = await this.storage.signUpload({
  context: 'USER_AVATAR', // autocompleted via StorageContextMap
  fileName: 'photo.png',
  contentType: 'image/png', // outside the allow-list → 400
  ownerId: user.id, // namespaces the temp key; authorization stays in the app
})

// temp key: temp/{ownerId}/{slug}/{uuid}{ext}
// PUBLIC → { visibility: 'PUBLIC', key, publicUrl, upload: { url, fields }, expiresIn }
// PRIVATE → same, without publicUrl
// content type and max size are enforced by the POST policy itself`}
					filename="sign-upload.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PUBLIC scenario — UpdateUser with the avatar as the target
				</h2>
				<p className="text-muted-foreground">
					The persisted value is the public URL. The update input carries a temp
					key (fresh upload), a committed URL (unchanged), or null (remove). One
					call resolves all three — existence check, copy, and URL building are
					internal.
				</p>
				<CodeBlock
					code={`@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly storage: StorageService,
    private readonly db: Database,
  ) {}

  async execute(input: UpdateUserInput) {
    const avatar = await this.storage.resolvePublicUpload({
      context: 'USER_AVATAR',
      value: input.avatar,
      targetId: input.userId, // forwarded to buildFinalKey
    })

    return this.db.user.update({
      where: { id: input.userId },
      data: { name: input.name, avatar },
    })
  }
}`}
					filename="update-user.use-case.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PRIVATE scenario — user document
				</h2>
				<p className="text-muted-foreground">
					The persisted value is the storage reference (key + original file
					name) — there is no public URL. Reading it back goes through a
					presigned download.
				</p>
				<CodeBlock
					code={`@Injectable()
export class AttachUserDocumentUseCase {
  constructor(
    private readonly storage: StorageService,
    private readonly db: Database,
  ) {}

  async execute(input: AttachDocumentInput) {
    // commits temp → private/users/{userId}/user-document/... and returns { key, fileName }
    const document = await this.storage.resolvePrivateUpload({
      context: 'USER_DOCUMENT',
      value: input.document, // temp key from signUpload
      targetId: input.userId, // forwarded to buildFinalKey
    })

    return this.db.user.update({
      where: { id: input.userId },
      data: { documentKey: document.key, documentFileName: document.fileName },
    })
  }
}

@Injectable()
export class DownloadUserDocumentUseCase {
  constructor(
    private readonly storage: StorageService,
    private readonly db: Database,
  ) {}

  async execute(input: DownloadDocumentInput) {
    const { documentKey } = await this.db.user.findUniqueOrThrow({
      where: { id: input.userId },
    })

    // presigned GET; Content-Disposition restores the original file name
    return this.storage.signDownload({ key: documentKey })
    // { downloadUrl, fileName, expiresIn }
  }
}`}
					filename="user-document.use-cases.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<PropsTable props={contextMethods} />
				<p className="text-muted-foreground">
					Low-level adapter operations remain available with an explicit bucket:{' '}
					<code>createPresignedPost</code>, <code>getPresignedDownloadUrl</code>
					, <code>getObject</code>, <code>headObject</code>,{' '}
					<code>copyObject</code>, <code>deleteObject</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Exceptions</h2>
				<PropsTable props={exceptions} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Frontend Integration
				</h2>
				<CodeBlock
					code={`const { key, upload } = await api.post('/files/sign-upload', {
  context: 'USER_AVATAR',
  fileName: file.name,
  contentType: file.type,
})

const form = new FormData()
for (const [name, value] of Object.entries(upload.fields)) {
  form.append(name, value)
}
form.append('file', file) // must be the last field

await fetch(upload.url, { method: 'POST', body: form })

// submit the entity update with the temp key
await api.patch('/users/me', { avatar: key })`}
					filename="upload.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
