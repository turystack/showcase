import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"Validates the content type and signs a POST policy for a temp key. Output discriminated by visibility.",name:"signUpload",required:!0,type:"({ context, fileName, contentType, ownerId }) => Promise<SignUploadOutputOf<C>>"},{description:"Existence check, then copies temp → final key. url is string (PUBLIC) or null (PRIVATE).",name:"commitUpload",required:!0,type:"({ context, sourceKey, targetId?, secondaryTargetId? }) => Promise<CommitUploadOutputOf<C>>"},{description:"For update inputs: temp key → commit and return the public URL; anything else → pass through.",name:"resolvePublicUpload",required:!0,type:"({ context, value, targetId?, secondaryTargetId? }) => Promise<string | null | undefined>"},{description:"Commit a PRIVATE upload and return { key, fileName }.",name:"resolvePrivateUpload",required:!0,type:"({ context, value, targetId?, secondaryTargetId? }) => Promise<{ key, fileName }>"},{description:"Presigned GET with the original file name restored via Content-Disposition.",name:"signDownload",required:!0,type:"({ key }) => Promise<{ downloadUrl, fileName, expiresIn }>"},{description:"Deletes an object from the app bucket.",name:"deleteByKey",required:!0,type:"(key) => Promise<void>"}],o=[{description:"Content type not in the context allow-list.",name:"StorageContentTypeNotAllowedError",required:!1,type:"HTTP 400"},{description:"Temp or download object missing.",name:"StorageObjectNotFoundError",required:!1,type:"HTTP 404"},{description:"Context name has no definition in register().",name:"StorageContextNotConfiguredError",required:!1,type:"HTTP 500"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"StorageService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Context-driven uploads and downloads: every parameter comes from the context definition, so call sites only pass the context name."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sign an upload"}),e.jsx(t,{code:`const out = await this.storage.signUpload({
  context: 'USER_AVATAR', // autocompleted via StorageContextMap
  fileName: 'photo.png',
  contentType: 'image/png', // outside the allow-list → 400
  ownerId: user.id, // namespaces the temp key; authorization stays in the app
})

// temp key: temp/{ownerId}/{slug}/{uuid}{ext}
// PUBLIC → { visibility: 'PUBLIC', key, publicUrl, upload: { url, fields }, expiresIn }
// PRIVATE → same, without publicUrl
// content type and max size are enforced by the POST policy itself`,filename:"sign-upload.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"PUBLIC scenario — UpdateUser with the avatar as the target"}),e.jsx("p",{className:"text-muted-foreground",children:"The persisted value is the public URL. The update input carries a temp key (fresh upload), a committed URL (unchanged), or null (remove). One call resolves all three — existence check, copy, and URL building are internal."}),e.jsx(t,{code:`@Injectable()
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
}`,filename:"update-user.use-case.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"PRIVATE scenario — user document"}),e.jsx("p",{className:"text-muted-foreground",children:"The persisted value is the storage reference (key + original file name) — there is no public URL. Reading it back goes through a presigned download."}),e.jsx(t,{code:`@Injectable()
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
}`,filename:"user-document.use-cases.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Methods"}),e.jsx(a,{props:s}),e.jsxs("p",{className:"text-muted-foreground",children:["Low-level adapter operations remain available with an explicit bucket:"," ",e.jsx("code",{children:"createPresignedPost"}),", ",e.jsx("code",{children:"getPresignedDownloadUrl"}),", ",e.jsx("code",{children:"getObject"}),", ",e.jsx("code",{children:"headObject"}),","," ",e.jsx("code",{children:"copyObject"}),", ",e.jsx("code",{children:"deleteObject"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Exceptions"}),e.jsx(a,{props:o})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Frontend Integration"}),e.jsx(t,{code:`const { key, upload } = await api.post('/files/sign-upload', {
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
await api.patch('/users/me', { avatar: key })`,filename:"upload.ts",language:"ts"})]})]})}export{c as component};
