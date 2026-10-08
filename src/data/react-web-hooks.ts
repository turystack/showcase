/**
 * The hook catalogue for `@turystack/react-web`.
 *
 * Only hooks the library itself implements are listed. It used to re-export a
 * dozen from `usehooks-ts` and `@turystack/react-hooks`; a second name for the
 * same hook is a second place to look and a second thing to keep in step, so
 * they are gone from the package and from here.
 *
 * Every signature and return shape was read from the package's own `.d.ts` —
 * the types a consumer actually sees — not written from memory. A
 * plausible-looking signature is worse than no signature, because the reader
 * trusts it and finds out at the call site.
 */

export type HookParam = {
	name: string
	type: string
	description: string
}

export type HookEntry = {
	name: string
	slug: string
	/** One line, for the menu and the card. */
	description: string
	/** The declaration, as the package exports it. */
	signature: string
	params?: HookParam[]
	returns: string
	example: string
	/** Why it exists, and what it does not do. */
	notes?: string
}

export type HookGroup = {
	title: string
	hooks: HookEntry[]
}

export const hookGroups: HookGroup[] = [
	{
		hooks: [
			{
				description: 'The active colour scheme and the setter that changes it.',
				example: `const { colorScheme, changeColorScheme } = useColorScheme()

<Button onClick={() => changeColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
  {colorScheme === 'dark' ? 'Light' : 'Dark'}
</Button>`,
				name: 'useColorScheme',
				notes: 'Throws outside a TuryProvider instead of guessing a scheme.',
				returns: `{
  colorScheme: ColorScheme
  changeColorScheme: (colorScheme: ColorScheme) => void
}`,
				signature: 'function useColorScheme(): ColorSchemeContextState',
				slug: 'use-color-scheme',
			},
			{
				description:
					'Sidebar presence, gutter and variant of the nearest Layout.',
				example: `const { withSidebar } = useLayout()

return <header className={withSidebar ? 'pl-64' : 'pl-0'}>…</header>`,
				name: 'useLayout',
				notes:
					'Derived from the tree, never passed. Outside a Layout: no sidebar, `md` padding, `default` variant.',
				returns:
					'{ padding: LayoutPadding; variant: LayoutVariant; withSidebar: boolean }',
				signature: 'const useLayout: () => LayoutContextValue',
				slug: 'use-layout',
			},
			{
				description: 'The sidebar’s state and controls, from inside it.',
				example: `const { open, toggleSidebar } = useSidebar()

<Button ariaLabel={open ? 'Collapse' : 'Expand'} onClick={toggleSidebar}>
  <PanelLeft />
</Button>`,
				name: 'useSidebar',
				notes:
					'Desktop `open` and phone `openMobile` are separate states. Throws outside a `Layout.Sidebar.Provider`.',
				returns: `{
  state: SidebarState
  variant: SidebarVariant
  collapsible: SidebarCollapsible
  side: SidebarSide
  open: boolean
  setOpen: (open: boolean | ((current: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}`,
				signature: 'function useSidebar(): SidebarContextValue',
				slug: 'use-sidebar',
			},
			{
				description: 'Every string the library renders, already merged.',
				example: `const labels = useLabels()

<button type="button">{labels.common.cancel}</button>
<p>{labels.pagination.range(1, 20, 137)}</p>`,
				name: 'useLabels',
				notes:
					'Falls back to the default labels outside a provider. Overrides merge per group.',
				returns: 'TuryLabels',
				signature: 'function useLabels(): TuryLabels',
				slug: 'use-labels',
			},
			{
				description: 'Where the provider says overlays should mount, raw.',
				example: `const container = usePortalContainerConfig()`,
				name: 'usePortalContainerConfig',
				notes:
					'`undefined` means the document body. Pass an element, `null` (wait) or a function for a themed subtree or iframe.',
				returns: 'PortalContainer | undefined',
				signature:
					'function usePortalContainerConfig(): PortalContainer | undefined',
				slug: 'use-portal-container-config',
			},
			{
				description: 'The same container, shaped the way Base UI accepts it.',
				example: `const container = usePortalContainer()

<Popover.Portal container={container}>…</Popover.Portal>`,
				name: 'usePortalContainer',
				notes:
					'Hands Base UI an element, null or ref object, read when the portal mounts. Used by every overlay.',
				returns: 'PortalContainerProp | undefined',
				signature:
					'function usePortalContainer(): PortalContainerProp | undefined',
				slug: 'use-portal-container',
			},
			{
				description: 'The same container as a real element, for createPortal.',
				example: `const container = useResolvedPortalContainer()

return container ? createPortal(node, container) : node`,
				name: 'useResolvedPortalContainer',
				notes:
					'Resolves the node itself for `createPortal`. Only Toast needs it.',
				returns: 'HTMLElement | null',
				signature: 'function useResolvedPortalContainer(): HTMLElement | null',
				slug: 'use-resolved-portal-container',
			},
			{
				description:
					'The active step and its controls, for a custom control bar.',
				example: `const { active, totalSteps, isLast, goTo } = useStepper()

<p>Step {active + 1} of {totalSteps}</p>
<Button disabled={isLast} onClick={() => goTo(active + 1)}>Next</Button>`,
				name: 'useStepper',
				notes:
					"Only when `Stepper.Next` and `Stepper.Previous` don't fit. They already handle the edges.",
				returns: `{
  active: number
  goTo: (step: number) => void
  isFirst: boolean
  isLast: boolean
  isStepActive: (step: number) => boolean
  isStepCompleted: (step: number) => boolean
  totalSteps: number
}`,
				signature: 'function useStepper(): UseStepperReturn',
				slug: 'use-stepper',
			},
			{
				description: 'Guards navigation away from a form with unsaved changes.',
				example: `const [guard, UnsavedDialog] = useUnsaved({
  unsaved: form.formState.isDirty,
  onProceed: () => navigate({ to: '/orders' }),
})

<Button onClick={guard}>Back to orders</Button>
{UnsavedDialog()}`,
				name: 'useUnsaved',
				notes:
					'Returns the dialog to render in your tree. It is the shared `Confirm`.',
				params: [
					{
						description:
							'Whether there is anything to lose; false skips the dialog.',
						name: 'unsaved',
						type: 'boolean',
					},
					{
						description: 'Runs when the person confirms they want to leave.',
						name: 'onProceed',
						type: '() => void',
					},
					{
						description:
							'Confirm overrides; the hook owns `open` and the callbacks.',
						name: 'confirm',
						type: "Omit<ConfirmProps, 'open' | 'onConfirm' | 'onClose'>",
					},
					{
						description: 'Marks a navigation already in flight.',
						name: 'leaving',
						type: 'boolean',
					},
				],
				returns: '[trigger: () => void, dialog: () => React.ReactNode]',
				signature:
					'function useUnsaved(options: UnsavedOptions): UseUnsavedReturn',
				slug: 'use-unsaved',
			},
			{
				description:
					"Rewrites a field's text per keystroke, keeping the caret.",
				example: `const { props, value } = useInputTransform<number>({
  transform: (raw) => raw.replace(/\\D/g, ''),
  parse: (shown) => Number(shown),
  onChange: (amount) => setTotal(amount),
})

<input {...props} inputMode="numeric" />`,
				name: 'useInputTransform',
				notes:
					'The engine under the masked, currency and document inputs. `transform` must be pure.',
				params: [
					{
						description:
							'Rewrites the shown text, on keystrokes and on value. Pure.',
						name: 'transform',
						type: '(raw: string) => string',
					},
					{
						description:
							'Turns the shown text back into the value for `onChange`.',
						name: 'parse',
						type: '(shown: string) => T',
					},
					{
						description: 'Receives the parsed value, never the event.',
						name: 'onChange',
						type: '(value: T) => void',
					},
					{
						description: 'Controlled value. Omit it to run uncontrolled.',
						name: 'value',
						type: 'T',
					},
				],
				returns: `{
  props: { ref, value, onChange }  // spread onto the input or textarea
  value: T                         // the parsed value
  displayed: string                // what the field is showing
}`,
				signature:
					'function useInputTransform<T = string>(options: UseInputTransformOptions<T>): UseInputTransformReturn<T>',
				slug: 'use-input-transform',
			},
			{
				description: 'The locale, time zone and currency formatters use.',
				example: `const { currency, locale, timeZone } = useFormat()

const price = new Intl.NumberFormat(locale, { currency, style: 'currency' })`,
				name: 'useFormat',
				notes:
					"Falls back to `defaultFormat` (en-US, usd) outside a provider. No `timeZone` means the runtime's zone.",
				returns: `{
  currency: Currency
  locale: string
  timeZone?: string
  dateFormat?: string
  timeFormat?: string
  dateTimeFormat?: string
}`,
				signature: 'function useFormat(): FormatValues',
				slug: 'use-format',
			},
			{
				description:
					'The permissions the signed-in user holds, and a way to ask.',
				example: `const { can, loading } = usePermissions()

if (!loading && can(['booking:cancel'])) {
  // \u2026
}`,
				name: 'usePermissions',
				notes:
					'`can` applies the manage grants. Outside a provider only an empty list passes.',
				returns: `{
  can: (permissionIds: PermissionId[], mode?: ProtectedMode) => boolean
  loading: boolean
  permissions: PermissionId[]
}`,
				signature: 'function usePermissions(): PermissionsContextValue',
				slug: 'use-permissions',
			},
			{
				description: 'One permission question, answered outside JSX.',
				example: `const { loading, reason } = useProtected(['user:delete'])

<Button disabledReason={reason} loading={loading}>Delete</Button>`,
				name: 'useProtected',
				notes:
					'What Protected renders with, outside JSX. `reason` is set only once denied; `loading` while the permissions are unknown.',
				returns: `{
  enabled: boolean
  loading: boolean
  reason?: string
}`,
				signature:
					'function useProtected(permissionIds?: PermissionId[], mode?: ProtectedMode): ProtectedState',
				slug: 'use-protected',
			},
		],
		title: 'Library state',
	},
	{
		hooks: [
			{
				description: 'True below this library’s mobile breakpoint.',
				example: `const isMobile = useIsMobile()

return isMobile ? <Sheet {...props} /> : <Modal {...props} />`,
				name: 'useIsMobile',
				notes:
					'768px, the same breakpoint the library uses. Updates on resize.',
				returns: 'boolean',
				signature: 'function useIsMobile(): boolean',
				slug: 'use-is-mobile',
			},
		],
		title: 'Viewport',
	},
]

export const allHooks: HookEntry[] = hookGroups.flatMap((group) => group.hooks)

export function findHook(slug: string): HookEntry | undefined {
	return allHooks.find((hook) => hook.slug === slug)
}

export function findHookGroup(slug: string): string | undefined {
	return hookGroups.find((group) =>
		group.hooks.some((hook) => hook.slug === slug),
	)?.title
}

/**
 * Exports that are neither a component nor a hook.
 *
 * They are listed rather than dropped: "everything the package exports" has to
 * mean everything, and an export with no page and no mention is one a reader
 * only finds by opening the bundle. `check-react-web-api.mjs` asserts this list
 * covers them all.
 */
export const OTHER_EXPORTS = [
	{
		name: 'toast',
		note: 'The imperative handle — documented on the Toast page, which is where you would look for it.',
	},
	{
		name: 'styles',
		note: 'The stylesheet entry point, imported once at the root of an app.',
	},
	{
		name: 'DEFAULT_COLORS',
		note: 'The palette ColorPicker offers when it is given no colours of its own.',
	},
	{
		name: 'ColorSchemeContext',
		note: 'The context object behind useColorScheme. The hook is the API; this is for a custom provider.',
	},
	{
		name: 'LayoutContext',
		note: 'The context object behind useLayout, exported for the same reason.',
	},
	{
		name: 'PortalContext',
		note: 'The context PortalProvider writes to. The three usePortalContainer hooks are the API; this is for a custom provider.',
	},
	{
		name: 'LabelsContext',
		note: 'The context LabelsProvider writes to. useLabels is the API; this is for a custom provider that wants to supply the merged set itself.',
	},
] as const
