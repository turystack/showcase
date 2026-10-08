import { createFileRoute } from '@tanstack/react-router'
import type {
	StepFragmentProps,
	StepperProps,
	StepperRadius,
	StepperSize,
	StepperVariant,
} from '@turystack/react-web'
import { Button, Stepper, useStepper } from '@turystack/react-web'
import { CreditCard, PartyPopper, Truck, User } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/stepper/stepper.types.ts` and the
 * `defaultVariants` plus destructuring defaults in `stepper.tsx`.
 */
const stepperProps = [
	{
		description: 'Zero-based active step index (controlled).',
		name: 'active',
		required: true,
		type: 'number',
	},
	{
		default: 'false',
		description: 'Makes every indicator clickable, not just passed steps.',
		name: 'allowNextStepsSelect',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'On advancing, focuses the first heading in the new panel.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Indicator content for passed steps.',
		name: 'completedIcon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
	{
		default: '"line"',
		description: 'Rule drawn between indicators; none hides it.',
		name: 'connector',
		type: '"none" | "line" | "dashed"',
	},
	{
		description: 'Indicator content for steps not yet passed.',
		name: 'icon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
	{
		default: '"left"',
		description: 'Which side of the label the indicator sits on.',
		name: 'iconPosition',
		type: '"left" | "right"',
	},
	{
		description: 'Overrides the indicator box width and height.',
		name: 'iconSize',
		type: 'string | number',
	},
	{
		default: 'false',
		description: 'Keeps every panel mounted, hiding inactive ones.',
		name: 'keepMounted',
		type: 'boolean',
	},
	{
		description: 'Fires with the index the stepper wants to move to.',
		name: 'onActiveChange',
		type: '(active: number) => void',
	},
	{
		default: '"horizontal"',
		description: 'Places the indicator list above or beside the panel.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		description: 'Indicator content for a step marked loading.',
		name: 'progressIcon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
	{
		default: '"xl"',
		description: 'Corner radius of the indicator box.',
		name: 'radius',
		type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
	},
	{
		default: '"md"',
		description: 'Indicator box, label and description scale together.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"numbered"',
		description: 'Indicator preset; path renders chevron stages.',
		name: 'variant',
		type: '"numbered" | "dotted" | "icon" | "path"',
	},
	{
		default: 'true',
		description: 'Lets indicators wrap onto a second line (horizontal).',
		name: 'wrap',
		type: 'boolean',
	},
]

const stepProps = [
	{
		description: 'Per-step override of the root allowNextStepsSelect.',
		name: 'allowStepClick',
		type: 'boolean',
	},
	{
		description: 'Alias of allowStepClick (Mantine parity).',
		name: 'allowStepSelect',
		type: 'boolean',
	},
	{
		description: 'Panel body, rendered while the step is active.',
		name: 'children',
		type: 'ReactNode',
	},
	{
		description: 'Per-step override of the root completedIcon.',
		name: 'completedIcon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
	{
		description: 'Second line under the label, in muted type.',
		name: 'description',
		type: 'ReactNode',
	},
	{
		description: 'Blocks the step; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		description: 'Per-step override of the root icon.',
		name: 'icon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
	{
		description: 'Step title, beside the indicator.',
		name: 'label',
		type: 'ReactNode',
	},
	{
		default: 'false',
		description: 'Forces the step into the progress state.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Per-step override of the root progressIcon.',
		name: 'progressIcon',
		type: 'ReactNode | ComponentType<{ step: number; state: StepState }>',
	},
]

const completedProps = [
	{
		description: 'Shown once active reaches the step count.',
		name: 'children',
		type: 'ReactNode',
	},
]

const previousProps = [
	{
		description: 'Runs before moving, with the index being left.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>, currentStep: number) => void',
	},
	{
		description: 'Replaces the button; onClick prop is not called.',
		name: 'render',
		type: '(slotProps: { onClick: () => void; disabled: boolean }) => React.ReactElement',
	},
	{
		default: 'isFirst',
		description: 'Overrides auto-disabling (disabled on the first step).',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: '"Back"',
		description: 'Button label.',
		name: 'children',
		type: 'ReactNode',
	},
	{
		default: '"outline" / "md"',
		description: 'Other ButtonProps; leftSection replaces the chevron.',
		name: '…ButtonProps',
		type: 'Omit<ButtonProps, "onClick" | "type">',
	},
]

const nextProps = [
	{
		description: 'Label used only on the last step, in place of children.',
		name: 'lastChildren',
		type: 'ReactNode',
	},
	{
		description: 'Runs before moving, with the index being left.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>, currentStep: number) => void',
	},
	{
		description: 'Replaces the advance when pressed on the last step.',
		name: 'onLastClick',
		type: '() => void',
	},
	{
		description: 'Replaces the button; onClick/onLastClick not called.',
		name: 'render',
		type: '(slotProps: { disabled: boolean; isLast: boolean; onClick: () => void }) => React.ReactElement',
	},
	{
		default: 'false',
		description: 'Disables the button; never disabled automatically.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: '"Next" / "Finish"',
		description: 'Button label. The last step falls back to lastChildren.',
		name: 'children',
		type: 'ReactNode',
	},
	{
		default: '"default" / "md"',
		description: 'Other ButtonProps; rightSection replaces the chevron.',
		name: '…ButtonProps',
		type: 'Omit<ButtonProps, "onClick" | "type">',
	},
]

const useStepperProps = [
	{
		description: 'The active index, as given to the root.',
		name: 'active',
		type: 'number',
	},
	{
		description: 'Asks to move to a step; no-op if already active.',
		name: 'goTo',
		type: '(step: number) => void',
	},
	{
		description: 'Whether active is at or before zero.',
		name: 'isFirst',
		type: 'boolean',
	},
	{
		description: 'Whether active is at or past the last step.',
		name: 'isLast',
		type: 'boolean',
	},
	{
		description: 'Whether the given index is the active one.',
		name: 'isStepActive',
		type: '(step: number) => boolean',
	},
	{
		description: 'Whether the given index sits before the active one.',
		name: 'isStepCompleted',
		type: '(step: number) => boolean',
	},
	{
		description: 'How many Stepper.Step children the root found.',
		name: 'totalSteps',
		type: 'number',
	},
]

const usageCode = `import { Stepper, useStepper } from '@turystack/react-web'
import { useState } from 'react'

const [active, setActive] = useState(0)

<Stepper active={active} onActiveChange={setActive}>
  <Stepper.Step description="Who you are" label="Account">
    …fields…
  </Stepper.Step>
  <Stepper.Step description="Where it goes" label="Shipping">
    …fields…
  </Stepper.Step>
  <Stepper.Step description="How you pay" label="Payment">
    …fields…
  </Stepper.Step>
  <Stepper.Completed>All done.</Stepper.Completed>

  <Stepper.Previous />
  <Stepper.Next lastChildren="Place order" />
</Stepper>

// The rule between steps — 'line' is the default, 'none' removes it
<Stepper active={active} connector="dashed" onActiveChange={setActive}>
  …
</Stepper>

// An indicator that reads its own state
<Stepper
  active={active}
  icon={({ step, state }) => <span data-state={state}>{step + 1}</span>}
  onActiveChange={setActive}
  variant="icon"
>
  …
</Stepper>

// A pipeline header — chevron stages, any stage selectable
<Stepper active={stage} allowNextStepsSelect onActiveChange={setStage} variant="path">
  <Stepper.Step label="Prospecção" />
  <Stepper.Step label="Qualificação" />
  <Stepper.Step label="Proposta" />
  <Stepper.Step label="Fechado" />
</Stepper>

// A status bar: childless stages leave no panel space under the row, so a
// button beside it lines up with the chevrons
<Flex align="center" gap="sm">
  <Box grow>
    <Stepper active={stage} onActiveChange={setStage} variant="path">
      {STAGES.map((label) => <Stepper.Step key={label} label={label} />)}
    </Stepper>
  </Box>
  <Button onClick={advance} size="sm">Marcar como concluído</Button>
</Flex>

// Your own buttons, off the hook
function Controls() {
  const { active, goTo, isLast, totalSteps } = useStepper()
  return (
    <Button onClick={() => goTo(isLast ? totalSteps : active + 1)}>
      {isLast ? 'Finish' : 'Continue'}
    </Button>
  )
}`

const VARIANTS: StepperVariant[] = [
	'numbered',
	'dotted',
	'icon',
]

const SIZES: StepperSize[] = [
	'sm',
	'md',
	'lg',
]

const RADII: StepperRadius[] = [
	'none',
	'sm',
	'md',
	'lg',
	'xl',
	'full',
]

type FlowProps = Omit<StepperProps, 'active' | 'onActiveChange'> & {
	descriptions?: boolean
	withCompleted?: boolean
}

/** Three steps, controlled here, with the built-in buttons. */
function Flow({
	descriptions = false,
	withCompleted = true,
	...props
}: FlowProps) {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				{...props}
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step
					description={descriptions ? 'Who you are' : undefined}
					label="Account"
				>
					<PanelBody>Name, e-mail and a password.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					description={descriptions ? 'Where it goes' : undefined}
					label="Shipping"
				>
					<PanelBody>Street, city and postcode.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					description={descriptions ? 'How you pay' : undefined}
					label="Payment"
				>
					<PanelBody>Card details.</PanelBody>
				</Stepper.Step>
				{withCompleted ? (
					<Stepper.Completed>
						<PanelBody>
							Order placed. Press Back to step back into the flow.
						</PanelBody>
					</Stepper.Completed>
				) : null}
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

const STAGES = [
	'Prospecção',
	'Qualificação',
	'Proposta enviada ao cliente para aprovação',
	'Negociação',
	'Fechado',
]

/**
 * A sales pipeline: the case `path` is for. The stages are the page's
 * header, not a wizard, so any stage can be picked.
 */
function PathFlow() {
	const [active, setActive] = useState(2)

	return (
		<div className="w-full max-w-3xl space-y-3">
			<Stepper
				active={active}
				allowNextStepsSelect
				onActiveChange={setActive}
				variant="path"
			>
				{STAGES.map((stage) => (
					<Stepper.Step
						key={stage}
						label={stage}
					>
						<PanelBody>
							Oportunidade em <strong>{stage}</strong>.
						</PanelBody>
					</Stepper.Step>
				))}
			</Stepper>
		</div>
	)
}

/**
 * The same stages with no children: a status bar at the top of a record. No
 * step has a panel, so nothing is rendered under the row and the button
 * beside it centres on the chevrons.
 */
function PathStatusBar() {
	const [active, setActive] = useState(1)
	const done = active >= STAGES.length

	return (
		<div className="flex w-full max-w-3xl items-center gap-3">
			<div className="min-w-0 flex-1">
				<Stepper
					active={active}
					allowNextStepsSelect
					onActiveChange={setActive}
					variant="path"
				>
					{STAGES.map((stage) => (
						<Stepper.Step
							key={stage}
							label={stage}
						/>
					))}
				</Stepper>
			</div>
			<Button
				disabled={done}
				onClick={() => setActive(active + 1)}
				size="sm"
			>
				Marcar como concluído
			</Button>
		</div>
	)
}

function PanelBody({ children }: { children: React.ReactNode }) {
	return (
		<div className="rounded-lg border border-border p-4 text-muted-foreground text-sm">
			{children}
		</div>
	)
}

function StateTag({ state, step }: StepFragmentProps) {
	return <span className="text-[0.6rem]">{`${step}${state.slice(4, 5)}`}</span>
}

function IconFlow() {
	const [active, setActive] = useState(1)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
				radius="full"
				variant="icon"
			>
				<Stepper.Step
					icon={<User />}
					label="Account"
				>
					<PanelBody>Name, e-mail and a password.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					icon={<Truck />}
					label="Shipping"
				>
					<PanelBody>Street, city and postcode.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					icon={<CreditCard />}
					label="Payment"
				>
					<PanelBody>Card details.</PanelBody>
				</Stepper.Step>
				<Stepper.Completed>
					<PanelBody>Done.</PanelBody>
				</Stepper.Completed>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function FragmentComponentFlow() {
	const [active, setActive] = useState(1)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				completedIcon={StateTag}
				icon={StateTag}
				onActiveChange={setActive}
				progressIcon={StateTag}
			>
				<Stepper.Step label="Account">
					<PanelBody>
						Each indicator is the same component, told its own index and state.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					label="Payment"
					loading
				>
					<PanelBody>Third panel — this step is marked loading.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function LoadingFlow() {
	const [active, setActive] = useState(1)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					label="Verifying"
					loading
				>
					<PanelBody>
						This step is loading, so its indicator spins whether or not it is
						the active one.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					label="Also loading"
					loading
					progressIcon={<span className="text-[0.6rem]">…</span>}
				>
					<PanelBody>Same, with a progressIcon of its own.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function ClickableFlow({
	allowNextStepsSelect,
}: {
	allowNextStepsSelect: boolean
}) {
	const [active, setActive] = useState(1)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				allowNextStepsSelect={allowNextStepsSelect}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Payment">
					<PanelBody>Third panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function PerStepClickFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					allowStepClick
					label="Shipping (allowStepClick)"
				>
					<PanelBody>
						This one opts in on its own, though the root is linear.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					allowStepSelect
					label="Payment (allowStepSelect)"
				>
					<PanelBody>The Mantine-parity alias does the same thing.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function ReasonFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				allowNextStepsSelect
				onActiveChange={setActive}
			>
				<Stepper.Step label="Hóspede">
					<PanelBody>Nome e documento.</PanelBody>
				</Stepper.Step>
				<Stepper.Step
					disabledReason="Cadastre uma forma de pagamento"
					label="Pagamento"
				>
					<PanelBody>Nunca aparece.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Revisão">
					<PanelBody>Confira e confirme.</PanelBody>
				</Stepper.Step>
			</Stepper>
		</div>
	)
}

function KeepMountedFlow({ keepMounted }: { keepMounted: boolean }) {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				keepMounted={keepMounted}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Type something">
					<input
						className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
						defaultValue=""
						placeholder="Type here, then go forward and back"
					/>
				</Stepper.Step>
				<Stepper.Step label="Come back">
					<PanelBody>
						{keepMounted
							? 'Step one is still mounted, hidden and inert — go back and your text is there.'
							: 'Step one was unmounted, so its text is gone.'}
					</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function WrapFlow({ wrap }: { wrap: boolean }) {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-sm">
			<Stepper
				active={active}
				onActiveChange={setActive}
				size="sm"
				wrap={wrap}
			>
				{[
					'Account',
					'Shipping',
					'Payment',
					'Review',
					'Confirm',
					'Receipt',
				].map((label) => (
					<Stepper.Step
						key={label}
						label={label}
					>
						<PanelBody>{label} panel.</PanelBody>
					</Stepper.Step>
				))}
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function ButtonsFlow() {
	const [active, setActive] = useState(0)
	const [leaving, setLeaving] = useState<number | null>(null)

	return (
		<div className="w-full max-w-xl space-y-3">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Completed>
					<PanelBody>Finished.</PanelBody>
				</Stepper.Completed>
				<Stepper.Previous
					onClick={(_event, currentStep) => setLeaving(currentStep)}
					variant="ghost"
				>
					Back
				</Stepper.Previous>
				<Stepper.Next
					lastChildren="Place order"
					onClick={(_event, currentStep) => setLeaving(currentStep)}
					variant="dark"
				>
					Continue
				</Stepper.Next>
			</Stepper>
			<p className="text-center text-muted-foreground text-xs">
				last step left:{' '}
				<code className="text-foreground">
					{leaving === null ? 'none' : leaving}
				</code>
			</p>
		</div>
	)
}

function OnLastClickFlow() {
	const [active, setActive] = useState(1)
	const [calls, setCalls] = useState(0)

	return (
		<div className="w-full max-w-xl space-y-3">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Payment">
					<PanelBody>
						Press Finish as many times as you like — onLastClick fires each
						time, and active never moves off 1 on its own.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next onLastClick={() => setCalls((c) => c + 1)} />
			</Stepper>
			<p className="text-center text-muted-foreground text-xs">
				active: <code className="text-foreground">{active}</code> · onLastClick
				calls: <code className="text-foreground">{calls}</code>
			</p>
		</div>
	)
}

function SectionsFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous leftSection={<User className="size-4" />}>
					Account
				</Stepper.Previous>
				<Stepper.Next rightSection={<Truck className="size-4" />}>
					Shipping
				</Stepper.Next>
			</Stepper>
		</div>
	)
}

function RenderPropFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Payment">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Previous
					render={({ disabled, onClick }) => (
						<Button
							disabled={disabled}
							onClick={onClick}
							size="sm"
							variant="link"
						>
							← back
						</Button>
					)}
				/>
				<Stepper.Next
					render={({ disabled, isLast, onClick }) => (
						<Button
							disabled={disabled}
							onClick={onClick}
							size="sm"
							variant={isLast ? 'destructive' : 'secondary'}
						>
							{isLast ? 'finish' : 'onwards'}
						</Button>
					)}
				/>
			</Stepper>
		</div>
	)
}

function HookControls() {
	const { active, goTo, isFirst, isLast, totalSteps } = useStepper()

	return (
		<div className="flex items-center gap-2">
			<Button
				disabled={isFirst}
				onClick={() => goTo(active - 1)}
				size="sm"
				variant="outline"
			>
				Back
			</Button>
			<Button
				onClick={() => goTo(isLast ? totalSteps : active + 1)}
				size="sm"
			>
				{isLast ? 'Finish' : 'Continue'}
			</Button>
			<span className="text-muted-foreground text-xs">
				{Math.min(active + 1, totalSteps)} / {totalSteps}
			</span>
		</div>
	)
}

function HookFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>First panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>Second panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Payment">
					<PanelBody>Third panel.</PanelBody>
				</Stepper.Step>
				<Stepper.Completed>
					<PanelBody>
						<PartyPopper className="mb-2 size-5" />
						Reached through goTo(totalSteps).
					</PanelBody>
				</Stepper.Completed>
				<HookControls />
			</Stepper>
		</div>
	)
}

function AutoFocusFlow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full max-w-xl">
			<Stepper
				active={active}
				autoFocus
				onActiveChange={setActive}
			>
				<Stepper.Step label="Account">
					<PanelBody>
						<h3
							className="font-medium text-foreground"
							tabIndex={-1}
						>
							Account details
						</h3>
						Advance and come back — focus lands on the next panel's heading, but
						only on the way forward.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Step label="Shipping">
					<PanelBody>
						<h3
							className="font-medium text-foreground"
							tabIndex={-1}
						>
							Shipping details
						</h3>
						This heading takes focus when you arrive here.
					</PanelBody>
				</Stepper.Step>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Stepper
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A wizard: an indicator list, one panel at a time, a completion slot,
					and Previous / Next buttons that already know where they are.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">Stepper</h3>
				<PropsTable props={stepperProps} />
				<h3 className="font-medium text-sm">Stepper.Step</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					Step renders nothing itself; it must be a direct child of Stepper.
				</p>
				<PropsTable props={stepProps} />
				<h3 className="font-medium text-sm">Stepper.Completed</h3>
				<PropsTable props={completedProps} />
				<h3 className="font-medium text-sm">Stepper.Previous</h3>
				<PropsTable props={previousProps} />
				<h3 className="font-medium text-sm">Stepper.Next</h3>
				<PropsTable props={nextProps} />
				<h3 className="font-medium text-sm">useStepper()</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					Called outside a Stepper it throws rather than returning an empty
					shape. The table lists what it returns.
				</p>
				<PropsTable props={useStepperProps} />
			</section>

			<SlotsSection slug="stepper" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The basic flow</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Wire{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onActiveChange
					</code>{' '}
					back into{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						active
					</code>
					. Finishing sets{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						active
					</code>{' '}
					to the step count, revealing{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Stepper.Completed
					</code>
					.
				</p>
				<ComponentPreview title="Three steps and a completion slot">
					<Flow />
				</ComponentPreview>
				<ComponentPreview title="With descriptions">
					<Flow descriptions />
				</ComponentPreview>
				<ComponentPreview title="Without a Completed slot">
					<Flow withCompleted={false} />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Connectors</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">This changed.</strong> A stepper
					now draws a rule between one indicator and the next, because{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						connector
					</code>{' '}
					defaults to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						"line"
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-hidden
					</code>{' '}
					rule fills with the primary colour as you advance.
				</p>
				<ComponentPreview title='connector="line" — the default'>
					<Flow
						connector="line"
						descriptions
					/>
				</ComponentPreview>
				<ComponentPreview title='connector="dashed"'>
					<Flow
						connector="dashed"
						descriptions
					/>
				</ComponentPreview>
				<ComponentPreview title='connector="none" — the old look'>
					<Flow
						connector="none"
						descriptions
					/>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					It turns with the orientation on its own — vertically the same prop
					draws a rule down the gutter beside the labels.
				</p>
				<ComponentPreview title="dashed, vertical">
					<Flow
						connector="dashed"
						descriptions
						orientation="vertical"
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						icon
					</code>{' '}
					carries no styling of its own — on its own it looks exactly like{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						numbered
					</code>
					.
				</p>
				{VARIANTS.map((variant) => (
					<ComponentPreview
						key={variant}
						title={`variant="${variant}"`}
					>
						<Flow variant={variant} />
					</ComponentPreview>
				))}
				<ComponentPreview title="dotted ignores icon — the dot stays empty">
					<Flow
						icon={<span>1</span>}
						variant="dotted"
					/>
				</ComponentPreview>
				<ComponentPreview title="variant='icon' with real icons">
					<IconFlow />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Path</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						variant="path"
					</code>{' '}
					draws one row of chevron stages.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						orientation
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						wrap
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						connector
					</code>{' '}
					do not apply.
				</p>
				<ComponentPreview title="A sales pipeline, any stage selectable">
					<PathFlow />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Childless stages render no panel, so the path works as a status bar
					beside a button.
				</p>
				<ComponentPreview title="A status bar: childless stages beside an action">
					<PathStatusBar />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				{SIZES.map((size) => (
					<ComponentPreview
						key={size}
						title={`size="${size}"`}
					>
						<Flow
							descriptions
							size={size}
						/>
					</ComponentPreview>
				))}
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						iconSize
					</code>{' '}
					sets the indicator size directly, overriding{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>
					.
				</p>
				<ComponentPreview title="size='sm' with iconSize={44}">
					<Flow
						iconSize={44}
						size="sm"
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Radius</h2>
				{RADII.map((radius) => (
					<ComponentPreview
						key={radius}
						title={`radius="${radius}"`}
					>
						<Flow radius={radius} />
					</ComponentPreview>
				))}
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Layout</h2>
				<ComponentPreview title="orientation='vertical'">
					<Flow
						descriptions
						orientation="vertical"
					/>
				</ComponentPreview>
				<ComponentPreview title="iconPosition='right'">
					<Flow
						descriptions
						iconPosition="right"
					/>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						wrap
					</code>{' '}
					is on by default and only means anything horizontally. These two hold
					six steps in a narrow column.
				</p>
				<ComponentPreview title="wrap (default)">
					<WrapFlow wrap />
				</ComponentPreview>
				<ComponentPreview title="wrap={false} — one line, squeezed">
					<WrapFlow wrap={false} />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Indicators</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Each of the three indicator slots takes either a node or a component.
				</p>
				<ComponentPreview title="A component in every slot">
					<FragmentComponentFlow />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					is not tied to the active step: any step marked loading shows the
					progress indicator, even one you have already passed.
				</p>
				<ComponentPreview title="Loading steps">
					<LoadingFlow />
				</ComponentPreview>
				<ComponentPreview title="A completedIcon of your own">
					<Flow completedIcon={<span className="text-xs">✓✓</span>} />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Jumping around</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					By default only passed steps are clickable. Both start on step two to
					show the difference.
				</p>
				<ComponentPreview title="allowNextStepsSelect={false} — the default">
					<ClickableFlow allowNextStepsSelect={false} />
				</ComponentPreview>
				<ComponentPreview title="allowNextStepsSelect: every indicator clickable">
					<ClickableFlow allowNextStepsSelect />
				</ComponentPreview>
				<ComponentPreview title="Per-step overrides on a linear root">
					<PerStepClickFlow />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					blocks a step and says why. On a linear root, steps ahead get a
					default reason.
				</p>
				<ComponentPreview title="Payment blocked, review still open">
					<ReasonFlow />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Panels</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						keepMounted
					</code>{' '}
					keeps all panels, hiding inactive ones with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hidden
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inert
					</code>
					.
				</p>
				<ComponentPreview title="keepMounted={false} — the default">
					<KeepMountedFlow keepMounted={false} />
				</ComponentPreview>
				<ComponentPreview title="keepMounted">
					<KeepMountedFlow keepMounted />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						autoFocus
					</code>{' '}
					moves focus to the first heading in the new panel, but only when you
					move forward — stepping back leaves focus alone.
				</p>
				<ComponentPreview title="autoFocus">
					<AutoFocusFlow />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Buttons</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both buttons take the rest of the Button API — variant, size, and the
					sections.
				</p>
				<ComponentPreview title="Custom labels, variants and onClick">
					<ButtonsFlow />
				</ComponentPreview>
				<ComponentPreview title="Sections you pass are kept, not replaced">
					<SectionsFlow />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						render
					</code>{' '}
					replaces the button; your{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onLastClick
					</code>{' '}
					are skipped.
				</p>
				<ComponentPreview title="Buttons replaced through render">
					<RenderPropFlow />
				</ComponentPreview>
				<ComponentPreview title="useStepper() driving buttons of your own">
					<HookFlow />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					On the last step,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onLastClick
					</code>{' '}
					replaces the advance;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						active
					</code>{' '}
					stays put.
				</p>
				<ComponentPreview title="onLastClick replaces the advance">
					<OnLastClickFlow />
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

export const Route = createFileRoute('/libs/react-web/components/stepper')({
	component: Page,
})
