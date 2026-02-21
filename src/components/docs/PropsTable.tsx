interface Prop {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              className={i < props.length - 1 ? 'border-b border-border' : ''}
              key={prop.name}
            >
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1.5 text-xs text-red-500">*</span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-tury-cyan">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {prop.default ? (
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    {prop.default}
                  </code>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
