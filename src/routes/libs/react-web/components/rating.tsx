import { createFileRoute } from '@tanstack/react-router'
import { Form, Rating } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/rating/rating.types.ts` and the
 * destructuring defaults in `rating.tsx` — `max = 5`, `size = 28`,
 * `readOnly = false`. There is no `tv()` variant table on this component, so
 * every default comes from the signature.
 */
const ratingProps = [
	{
		description: 'Names the group; omit inside a Form.Field.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'How many stars are filled.',
		name: 'value',
		required: true,
		type: 'number',
	},
	{
		description: 'Fires with the chosen star (1-based); omit for display-only.',
		name: 'onChange',
		type: '(value: number) => void',
	},
	{
		default: '5',
		description: 'How many stars to render.',
		name: 'max',
		type: 'number',
	},
	{
		default: '28',
		description: 'Star icon size in pixels. Passed straight to the icon.',
		name: 'size',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Shows the value only; stars cannot be picked.',
		name: 'readOnly',
		type: 'boolean',
	},
]

const usageCode = `import { Form, Rating } from '@turystack/react-web'
import { useState } from 'react'

function Review() {
  const [score, setScore] = useState(0)

  // No visible label: name the group
  return <Rating ariaLabel="Sua nota" onChange={setScore} value={score} />
}

// Inside a Form.Field the label names the group — no ariaLabel needed,
// and the description / error describe it and mark it invalid
<Form.Field description="De 1 a 5 estrelas." label="Como foi a estadia?">
  <Rating onChange={setScore} value={score} />
</Form.Field>

// Ten stars instead of five
<Rating ariaLabel="Nota de 1 a 10" max={10} onChange={setScore} value={score} />

// Smaller, for a dense list row
<Rating ariaLabel="Nota" onChange={setScore} size={16} value={score} />

// Display only — both of these render disabled stars
<Rating ariaLabel="Nota média" readOnly value={4} />
<Rating ariaLabel="Nota média" value={4} />`

function Page() {
	const [score, setScore] = useState(3)
	const [threeScore, setThreeScore] = useState(2)
	const [tenScore, setTenScore] = useState(7)
	const [sizedScore, setSizedScore] = useState(2)
	const [stayScore, setStayScore] = useState(4)
	const [cleanScore, setCleanScore] = useState(0)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Rating
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A star rating built as a radio group.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={ratingProps} />
			</section>

			<SlotsSection slug="rating" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Interactive</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Always controlled: there is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>
					, so the stars move only when your state does.
				</p>
				<ComponentPreview title="Controlled by the page">
					<div className="flex flex-col items-center gap-3">
						<Rating
							ariaLabel="Sua nota"
							onChange={setScore}
							value={score}
						/>
						<span className="text-muted-foreground text-sm">
							value: {score}
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Scale</h2>
				<ComponentPreview title="max — three, five and ten stars">
					<div className="flex flex-col items-center gap-6">
						<Rating
							ariaLabel="Nota de 1 a 3"
							max={3}
							onChange={setThreeScore}
							value={threeScore}
						/>
						<Rating
							ariaLabel="Nota de 1 a 5"
							onChange={setScore}
							value={score}
						/>
						<Rating
							ariaLabel="Nota de 1 a 10"
							max={10}
							onChange={setTenScore}
							value={tenScore}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Size</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>{' '}
					is a pixel number handed to the star icon, not a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						sm | md | lg
					</code>{' '}
					union — any number works.
				</p>
				<ComponentPreview title="16, 28 (the default) and 48 pixels">
					<div className="flex flex-col items-center gap-6">
						<Rating
							ariaLabel="Nota, 16 px"
							onChange={setSizedScore}
							size={16}
							value={sizedScore}
						/>
						<Rating
							ariaLabel="Nota, 28 px"
							onChange={setSizedScore}
							value={sizedScore}
						/>
						<Rating
							ariaLabel="Nota, 48 px"
							onChange={setSizedScore}
							size={48}
							value={sizedScore}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Display only</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						readOnly
					</code>{' '}
					or omit{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>
					; either disables every star.
				</p>
				<ComponentPreview title="readOnly, and no onChange at all">
					<div className="flex flex-col items-center gap-6">
						<Rating
							ariaLabel="Nota média, somente leitura"
							onChange={setScore}
							readOnly
							value={4}
						/>
						<Rating
							ariaLabel="Nota média, sem onChange"
							value={2}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Nothing filled, and everything filled">
					<div className="flex flex-col items-center gap-6">
						<Rating
							ariaLabel="Sem nota"
							value={0}
						/>
						<Rating
							ariaLabel="Nota máxima"
							value={5}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Keyboard and names
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Arrow keys and Home / End move the choice, stopping at the ends;
					outside a Form.Field, name the group with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<ComponentPreview title="Named by a Form.Field label">
					<div className="flex w-full max-w-sm flex-col gap-4">
						<Form.Field
							description="De 1 a 5 estrelas. As setas movem a nota."
							label="Como foi a estadia?"
						>
							<Rating
								onChange={setStayScore}
								value={stayScore}
							/>
						</Form.Field>
						<Form.Field
							error={
								cleanScore === 0
									? 'Escolha uma nota para a limpeza.'
									: undefined
							}
							label="Limpeza do quarto"
						>
							<Rating
								onChange={setCleanScore}
								value={cleanScore}
							/>
						</Form.Field>
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

export const Route = createFileRoute('/libs/react-web/components/rating')({
	component: Page,
})
