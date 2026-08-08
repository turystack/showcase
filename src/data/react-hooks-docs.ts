export type ReactHookDoc = {
	category: ReactHookCategory
	description: string
	name: string
	returns: string
	signature: string
	slug: string
	usage: string
}

export type ReactHookCategory =
	| 'State'
	| 'Async and debounce'
	| 'Lifecycle and timing'

export const reactHookDocs: ReactHookDoc[] = [
	{
		category: 'State',
		description:
			'Boolean state with explicit true, false, toggle, and setter actions.',
		name: 'useBoolean',
		returns: 'An object with value, setTrue, setFalse, toggle, and setValue.',
		signature: '(defaultValue?: boolean) => UseBooleanReturn',
		slug: 'use-boolean',
		usage: `const enabled = useBoolean()

<Button onPress={enabled.toggle}>
  {enabled.value ? 'Disable' : 'Enable'}
</Button>`,
	},
	{
		category: 'State',
		description:
			'Supports controlled and uncontrolled component state with one contract.',
		name: 'useControllableState',
		returns:
			'A tuple containing the current value and a React state dispatcher.',
		signature:
			'<T>(options: UseControllableStateOptions<T>) => UseControllableStateReturn<T>',
		slug: 'use-controllable-state',
		usage: `const [open, setOpen] = useControllableState({
  defaultValue: false,
  onChange: onOpenChange,
  value: openProp,
})

return <Modal open={open} onOpenChange={setOpen} />`,
	},
	{
		category: 'State',
		description:
			'Numeric state with increment, decrement, reset, and direct setter actions.',
		name: 'useCounter',
		returns: 'An object with count, increment, decrement, reset, and setCount.',
		signature: '(initialValue?: number) => UseCounterReturn',
		slug: 'use-counter',
		usage: `const counter = useCounter(1)

<Button onPress={counter.decrement}>-</Button>
<Text>{counter.count}</Text>
<Button onPress={counter.increment}>+</Button>`,
	},
	{
		category: 'State',
		description:
			'Open and close state for modal, sheet, popover, and menu components.',
		name: 'useDisclosure',
		returns: 'An object with value, on, off, and toggle.',
		signature: '(initial?: boolean) => UseDisclosureReturn',
		slug: 'use-disclosure',
		usage: `const disclosure = useDisclosure()

<Button onPress={disclosure.on}>Open</Button>
<Sheet open={disclosure.value} onOpenChange={disclosure.toggle}>
  <Button onPress={disclosure.off}>Close</Button>
</Sheet>`,
	},
	{
		category: 'State',
		description: 'Immutable Map state with semantic mutation actions.',
		name: 'useMap',
		returns:
			'A tuple containing a read-only Map interface and set, setAll, remove, and reset actions.',
		signature:
			'<K, V>(initialState?: MapOrEntries<K, V>) => UseMapReturn<K, V>',
		slug: 'use-map',
		usage: `const [filters, actions] = useMap<string, string>()

actions.set('status', 'active')
actions.remove('status')
actions.reset()`,
	},
	{
		category: 'State',
		description: 'Returns the value received during the preceding render.',
		name: 'usePrevious',
		returns: 'The previous value, or undefined during the first render.',
		signature: '<T>(value: T) => PreviousValue<T>',
		slug: 'use-previous',
		usage: `const previousStatus = usePrevious(order.status)

useEffect(() => {
  if (previousStatus !== order.status) {
    trackStatusChange(previousStatus, order.status)
  }
}, [order.status, previousStatus])`,
	},
	{
		category: 'State',
		description: 'Bounded one-based step navigation with directional guards.',
		name: 'useStep',
		returns: 'A tuple containing the current step and navigation actions.',
		signature: '(maxStep: number) => UseStepReturn',
		slug: 'use-step',
		usage: `const [step, actions] = useStep(4)

<Button disabled={!actions.canGoToPrevStep} onPress={actions.goToPrevStep}>
  Previous
</Button>
<Text>{step} / 4</Text>
<Button disabled={!actions.canGoToNextStep} onPress={actions.goToNextStep}>
  Next
</Button>`,
	},
	{
		category: 'State',
		description: 'Compact tuple API for boolean state.',
		name: 'useToggle',
		returns:
			'A tuple containing the value, toggle action, and state dispatcher.',
		signature: '(defaultValue?: boolean) => UseToggleReturn',
		slug: 'use-toggle',
		usage: `const [expanded, toggleExpanded, setExpanded] = useToggle()

<Button onPress={toggleExpanded}>Toggle details</Button>
{expanded && <Details />}
<Button onPress={() => setExpanded(false)}>Collapse</Button>`,
	},
	{
		category: 'Async and debounce',
		description:
			'Runs an abortable async factory when its dependencies change.',
		name: 'useAsync',
		returns: 'Async status and data or error, plus cancel and retry actions.',
		signature:
			'<T, E>(factory: AsyncFactory<T>, dependencies: readonly unknown[]) => UseAsyncReturn<T, E>',
		slug: 'use-async',
		usage: `const users = useAsync(
  (signal) => api.users.list({ signal, workspaceId }),
  [workspaceId],
)

if (users.status === 'loading') return <Loader />
if (users.status === 'error') return <Retry onPress={users.retry} />
return <UserList data={users.data} />`,
	},
	{
		category: 'Async and debounce',
		description:
			'Runs abortable async actions imperatively, such as form submissions.',
		name: 'useAsyncCallback',
		returns:
			'Async status and data or error, plus execute, cancel, and reset actions.',
		signature:
			'<Args, T, E>(callback: AsyncCallback<Args, T>) => UseAsyncCallbackReturn<Args, T, E>',
		slug: 'use-async-callback',
		usage: `const saveOrder = useAsyncCallback(
  (signal, input: OrderInput) =>
    api.orders.create(input, { signal }),
)

await saveOrder.execute(values)
// saveOrder.status: idle | loading | success | error`,
	},
	{
		category: 'Async and debounce',
		description: 'Debounces a typed callback and exposes lifecycle controls.',
		name: 'useDebounceCallback',
		returns: 'A debounced callback with cancel, flush, and isPending methods.',
		signature:
			'<Args, R>(callback: (...args: Args) => R, delay?: number, options?: DebounceOptions) => DebouncedCallback<Args, R>',
		slug: 'use-debounce-callback',
		usage: `const search = useDebounceCallback(
  (query: string) => loadResults(query),
  300,
)

<Input onChangeText={search} />
<Button onPress={search.flush}>Search now</Button>`,
	},
	{
		category: 'Async and debounce',
		description: 'Stores a value only after the configured debounce window.',
		name: 'useDebounceValue',
		returns: 'A tuple containing the debounced value and an update callback.',
		signature:
			'<T>(initialValue: T | (() => T), delay: number, options?: UseDebounceValueOptions<T>) => UseDebounceValueReturn<T>',
		slug: 'use-debounce-value',
		usage: `const [query, setQuery] = useDebounceValue('', 300)

<Input onChangeText={setQuery} />
<ResultList query={query} />`,
	},
	{
		category: 'Lifecycle and timing',
		description:
			'Countdown or count-up timer with start, stop, and reset controls.',
		name: 'useCountdown',
		returns: 'A tuple containing the count and countdown controller actions.',
		signature: '(options: CountdownOptions) => UseCountdownReturn',
		slug: 'use-countdown',
		usage: `const [seconds, controls] = useCountdown({
  countStart: 60,
  countStop: 0,
  intervalMs: 1000,
})

<Text>{seconds}s</Text>
<Button onPress={controls.startCountdown}>Start</Button>
<Button onPress={controls.resetCountdown}>Reset</Button>`,
	},
	{
		category: 'Lifecycle and timing',
		description:
			'Keeps a stable function identity while invoking the latest callback.',
		name: 'useEventCallback',
		returns: 'A stable callback with the same arguments and return type.',
		signature:
			'<Args, R>(callback: EventCallback<Args, R>) => EventCallback<Args, R>',
		slug: 'use-event-callback',
		usage: `const handleSubmit = useEventCallback(() => {
  onSubmit(form.getValues())
})

useEffect(() => subscribe('submit', handleSubmit), [handleSubmit])`,
	},
	{
		category: 'Lifecycle and timing',
		description: 'Runs a declarative interval and pauses when delay is null.',
		name: 'useInterval',
		returns:
			'No value. The interval lifecycle follows the component lifecycle.',
		signature: '(callback: () => void, delay: number | null) => void',
		slug: 'use-interval',
		usage: `const [elapsed, setElapsed] = useState(0)

useInterval(
  () => setElapsed((value) => value + 1),
  running ? 1000 : null,
)`,
	},
	{
		category: 'Lifecycle and timing',
		description:
			'Provides a function that reports whether the component is still mounted.',
		name: 'useIsMounted',
		returns: 'A stable function returning the current mounted state.',
		signature: '() => IsMounted',
		slug: 'use-is-mounted',
		usage: `const isMounted = useIsMounted()

async function load() {
  const data = await api.load()
  if (isMounted()) {
    setData(data)
  }
}`,
	},
	{
		category: 'Lifecycle and timing',
		description: 'Stores the latest value in a stable reference.',
		name: 'useLatest',
		returns: 'A stable object whose current property is updated every render.',
		signature: '<T>(value: T) => LatestReference<T>',
		slug: 'use-latest',
		usage: `const onCompleteRef = useLatest(onComplete)

useEffect(() => {
  return task.subscribe(() => onCompleteRef.current())
}, [onCompleteRef, task])`,
	},
	{
		category: 'Lifecycle and timing',
		description:
			'Composes callback and object refs for native or web elements.',
		name: 'useMergedRefs',
		returns: 'A callback ref that updates every supplied reference.',
		signature: '<T>(...refs: Array<MergeableRef<T>>) => UseMergedRefsReturn<T>',
		slug: 'use-merged-refs',
		usage: `const localRef = useRef<HTMLInputElement>(null)
const mergedRef = useMergedRefs(localRef, forwardedRef)

return <input ref={mergedRef} />`,
	},
	{
		category: 'Lifecycle and timing',
		description:
			'Runs a declarative one-shot timeout and pauses when delay is null.',
		name: 'useTimeout',
		returns:
			'No value. The timeout is cleared when dependencies or lifecycle require it.',
		signature: '(callback: () => void, delay: number | null) => void',
		slug: 'use-timeout',
		usage: `useTimeout(
  () => setVisible(false),
  visible ? 5000 : null,
)`,
	},
	{
		category: 'Lifecycle and timing',
		description: 'Runs the latest callback when the component unmounts.',
		name: 'useUnmount',
		returns: 'No value.',
		signature: '(callback: UnmountCallback) => void',
		slug: 'use-unmount',
		usage: `useUnmount(() => {
  draft.save()
  analytics.track('editor_closed')
})`,
	},
	{
		category: 'Lifecycle and timing',
		description: 'Runs an effect only after the initial mount.',
		name: 'useUpdateEffect',
		returns: 'No value. Cleanup follows the standard React effect contract.',
		signature:
			'(effect: EffectCallback, dependencies?: DependencyList) => void',
		slug: 'use-update-effect',
		usage: `useUpdateEffect(() => {
  onFiltersChange(filters)
}, [filters])`,
	},
]

export const reactHookGroups = [
	{
		hooks: reactHookDocs.filter((hook) => hook.category === 'State'),
		title: 'State',
	},
	{
		hooks: reactHookDocs.filter(
			(hook) => hook.category === 'Async and debounce',
		),
		title: 'Async and debounce',
	},
	{
		hooks: reactHookDocs.filter(
			(hook) => hook.category === 'Lifecycle and timing',
		),
		title: 'Lifecycle and timing',
	},
]
