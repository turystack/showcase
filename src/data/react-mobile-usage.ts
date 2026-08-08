export type MobileUsageExample = {
	code: string
	description?: string
	title: string
}

const example = (
	title: string,
	code: string,
	description?: string,
): MobileUsageExample => ({
	code,
	description,
	title,
})

export const reactMobileUsageExamples: Record<string, MobileUsageExample[]> = {
	accordion: [
		example(
			'Single open item',
			`<Accordion defaultValue="billing" type="single">
  <Accordion.Item value="billing">
    <Accordion.Trigger><Typography>Billing</Typography></Accordion.Trigger>
    <Accordion.Content><BillingDetails /></Accordion.Content>
  </Accordion.Item>
</Accordion>`,
		),
		example(
			'Multiple controlled items',
			`<Accordion
  onValueChange={setOpenSections}
  type="multiple"
  value={openSections}
>
  {sections.map((section) => (
    <Accordion.Item key={section.id} value={section.id}>
      <Accordion.Trigger>
        <Typography>{section.title}</Typography>
      </Accordion.Trigger>
      <Accordion.Content>{section.content}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion>`,
		),
	],
	'action-sheet': [
		example(
			'Action list',
			`<ActionSheet onChange={setOpen} open={open}>
  <ActionSheet.Trigger><Button>More actions</Button></ActionSheet.Trigger>
  <ActionSheet.Content title="Actions">
    <ActionSheet.Item icon={<EditIcon />} onPress={edit}>Edit</ActionSheet.Item>
    <ActionSheet.Separator />
    <ActionSheet.Item onPress={archive}>Archive</ActionSheet.Item>
  </ActionSheet.Content>
</ActionSheet>`,
		),
		example(
			'Destructive item with confirmation',
			`<ActionSheet.Item
  confirm={{
    description: 'This action cannot be undone.',
    onConfirm: remove,
    title: 'Delete item?',
  }}
  icon={<TrashIcon />}
  variant="destructive"
>
  Delete
</ActionSheet.Item>`,
		),
	],
	alert: [
		example(
			'Informational message',
			`<Alert variant="info">
  <Alert.Icon><InfoIcon /></Alert.Icon>
  <Alert.Title>Heads up</Alert.Title>
  <Alert.Description>Your profile is incomplete.</Alert.Description>
</Alert>`,
		),
		example(
			'Destructive message with action',
			`<Alert variant="destructive">
  <Alert.Title>Payment failed</Alert.Title>
  <Alert.Description>Update your payment method.</Alert.Description>
  <Alert.Action>
    <Button onPress={openBilling} variant="ghost">Review billing</Button>
  </Alert.Action>
</Alert>`,
		),
	],
	avatar: [
		example(
			'Image avatar',
			`<Avatar alt="Ana Silva" size="lg" src={{ uri: user.avatarUrl }} />`,
		),
		example(
			'Fallback and shape',
			`<Avatar fallback="AS" size="md" variant="rounded" />`,
		),
	],
	badge: [
		example(
			'Status variants',
			`<Badge>Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Blocked</Badge>`,
		),
		example(
			'Loading metadata',
			`<Badge align="center" loading>Synchronizing</Badge>`,
		),
	],
	'bottom-tabs': [
		example(
			'Primary navigation',
			`<BottomTabs onValueChange={navigate} value={route}>
  <BottomTabs.Item icon={<HomeIcon />} label="Home" value="home" />
  <BottomTabs.Item icon={<SearchIcon />} label="Search" value="search" />
  <BottomTabs.Item icon={<UserIcon />} label="Profile" value="profile" />
</BottomTabs>`,
		),
		example(
			'Icon-only navigation',
			`<BottomTabs showLabels={false} value={route}>
  <BottomTabs.Item icon={<HomeIcon />} label="Home" value="home" />
  <BottomTabs.Item icon={<SettingsIcon />} label="Settings" value="settings" />
</BottomTabs>`,
		),
	],
	box: [
		example(
			'Semantic surface',
			`<Box bg="card" padding="md" rounded="lg">
  <Typography>Card content</Typography>
</Box>`,
		),
		example(
			'Full-width growing region',
			`<Box grow minHeight="screen" paddingX="lg" width="full">
  <ScreenContent />
</Box>`,
		),
	],
	button: [
		example(
			'Actions and states',
			`<Button onPress={save}>Save changes</Button>
<Button loading={pending} onPress={save}>Saving</Button>
<Button disabled>Unavailable</Button>`,
		),
		example(
			'Variants and sections',
			`<Button leftSection={<SaveIcon />} variant="outline">
  Save draft
</Button>
<Button rightSection={<ArrowRightIcon />} variant="ghost">
  Continue
</Button>
<Button variant="destructive">Delete</Button>`,
		),
	],
	calendar: [
		example(
			'Single date',
			`<Calendar mode="single" onChange={setDate} value={date} />`,
		),
		example(
			'Date range',
			`<Calendar
  mode="range"
  onChange={setRange}
  value={{ from: range.from, to: range.to }}
/>`,
		),
	],
	card: [
		example(
			'Content card',
			`<Card>
  <Card.Header>
    <Card.Title>Monthly summary</Card.Title>
    <Card.Description>Updated moments ago</Card.Description>
  </Card.Header>
  <Card.Separator />
  <Card.Content><Summary /></Card.Content>
</Card>`,
		),
		example(
			'Card with actions',
			`<Card minHeight="full" verticalAlign="bottom">
  <Card.Content><PlanDetails /></Card.Content>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Choose plan</Button>
  </Card.Footer>
</Card>`,
		),
	],
	checkbox: [
		example(
			'Controlled checkbox',
			`const [accepted, setAccepted] = useState(false)

<Checkbox
  checked={accepted}
  label="I accept the terms"
  onCheckedChange={setAccepted}
/>`,
		),
		example(
			'Multiple-choice group',
			`const plans = [
  { label: 'Email', value: 'email' },
  { label: 'Push', value: 'push' },
]

<Checkbox.Group
  data={plans}
  onChange={setChannels}
  value={channels}
  variant="cards"
/>`,
		),
	],
	'color-picker': [
		example(
			'Controlled palette',
			`<ColorPicker
  colors={['#2563eb', '#16a34a', '#dc2626']}
  onChange={setColor}
  value={color}
/>`,
		),
		example(
			'Size variants',
			`<ColorPicker colors={brandColors} size="sm" value={color} />
<ColorPicker colors={brandColors} size="lg" value={color} />`,
		),
	],
	'color-scheme-provider': [
		example(
			'Follow the device',
			`import { ColorSchemeProvider } from '@turystack/react-mobile'

<ColorSchemeProvider defaultColorScheme="system">
  <Application />
</ColorSchemeProvider>`,
		),
		example(
			'Change the preference',
			`import { Button, useColorScheme } from '@turystack/react-mobile'

function DarkModeAction() {
  const { changeColorScheme, colorScheme } = useColorScheme()

  return (
    <Button onPress={() => changeColorScheme('dark')}>
      Current: {colorScheme}
    </Button>
  )
}`,
		),
	],
	'color-scheme-switcher': [
		example(
			'Default switcher',
			`<ColorSchemeSwitcher />`,
			'Cycles through the appearance preferences supplied by the provider.',
		),
		example(
			'Size variants',
			`<Flex direction="row" gap="md">
  <ColorSchemeSwitcher size="sm" />
  <ColorSchemeSwitcher size="md" />
  <ColorSchemeSwitcher size="lg" />
</Flex>`,
		),
	],
	confirm: [
		example(
			'Destructive confirmation',
			`<Confirm
  cancelText="Keep account"
  confirmProps={{ variant: 'destructive' }}
  confirmText="Delete account"
  description="This action cannot be undone."
  onClose={() => setOpen(false)}
  onConfirm={deleteAccount}
  open={open}
  title="Delete account?"
/>`,
		),
		example(
			'Custom action states',
			`<Confirm
  cancelProps={{ disabled: saving }}
  confirmProps={{ loading: saving }}
  onConfirm={saveChanges}
  open={open}
  title="Apply changes?"
/>`,
		),
	],
	'confirm-sheet': [
		example(
			'Bottom confirmation',
			`<ConfirmSheet
  description="The selected files will be removed."
  onClose={() => setOpen(false)}
  onConfirm={removeFiles}
  open={open}
  side="bottom"
  size="sm"
  title="Remove files?"
/>`,
		),
		example(
			'Large confirmation flow',
			`<ConfirmSheet
  onClose={close}
  onConfirm={submit}
  open={open}
  size="lg"
  title="Submit application?"
/>`,
		),
	],
	container: [
		example(
			'Screen content',
			`<Container maxWidth="lg">
  <ScreenHeader />
  <ScreenContent />
</Container>`,
		),
		example(
			'Centered copy',
			`<Container maxWidth="sm" textAlign="center">
  <Typography variant="heading">Welcome</Typography>
  <Typography variant="muted">Start by creating an account.</Typography>
</Container>`,
		),
	],
	'currency-input': [
		example(
			'Single monetary value',
			`<CurrencyInput
  currency="BRL"
  mode="single"
  onValueChange={setPrice}
  value={price}
/>`,
		),
		example(
			'Multiple monetary values',
			`<CurrencyInput
  currency="USD"
  maxPlaceholder="Maximum"
  minPlaceholder="Minimum"
  mode="multiple"
  onValueChange={setRange}
  value={{ min: 100, max: 500 }}
/>`,
		),
	],
	'date-input': [
		example(
			'Date field',
			`<DateInput mode="date" onChange={setDate} value={date} />`,
		),
		example(
			'Constrained date',
			`<DateInput
  maximumDate={new Date(2030, 11, 31)}
  minimumDate={new Date()}
  onChange={setDeparture}
  value={departure}
/>`,
		),
	],
	'date-native-input': [
		example(
			'Platform date picker',
			`<DateNativeInput mode="date" onChange={setBirthday} value={birthday} />`,
		),
		example(
			'Platform time picker',
			`<DateNativeInput mode="time" onChange={setTime} value={time} />`,
		),
	],
	'date-picker-sheet': [
		example(
			'Date selection sheet',
			`<DatePickerSheet
  description="Choose the delivery day"
  mode="date"
  onChange={setDeliveryDate}
  onClose={() => setOpen(false)}
  open={open}
  title="Delivery date"
  value={deliveryDate}
/>`,
		),
		example(
			'Date and time sheet',
			`<DatePickerSheet
  minimumDate={new Date()}
  mode="datetime"
  onChange={setStartsAt}
  onClose={close}
  open={open}
  title="Starts at"
  value={startsAt}
/>`,
		),
	],
	'date-range-input': [
		example(
			'Controlled interval',
			`<DateRangeInput
  onChange={setPeriod}
  value={{ from: period.from, to: period.to }}
/>`,
		),
		example(
			'Preset ranges',
			`<DateRangeInput
  onChange={setPeriod}
  presets={[
    { label: 'This week', value: thisWeek },
    { label: 'This month', value: thisMonth },
  ]}
  value={period}
/>`,
		),
	],
	'date-time-input': [
		example(
			'Date and time',
			`<DateTimeInput mode="datetime" onChange={setStartsAt} value={startsAt} />`,
		),
		example(
			'Allowed interval',
			`<DateTimeInput
  maximumDate={windowEnd}
  minimumDate={windowStart}
  mode="datetime"
  onChange={setStartsAt}
  value={startsAt}
/>`,
		),
	],
	'document-input': [
		example(
			'CPF',
			`<DocumentInput
  documentType="cpf"
  onValueChange={setDocument}
/>`,
		),
		example(
			'CNPJ and generic document',
			`<DocumentInput documentType="cnpj" onValueChange={setCnpj} />
<DocumentInput documentType="other" onValueChange={setPassport} />`,
		),
	],
	'dropdown-menu': [
		example(
			'Grouped menu',
			`<DropdownMenu onChange={setOpen} open={open}>
  <DropdownMenu.Trigger><Button>Open menu</Button></DropdownMenu.Trigger>
  <DropdownMenu.Content title="Account">
    <DropdownMenu.Label>Profile</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item onPress={editProfile}>Edit profile</DropdownMenu.Item>
      <DropdownMenu.Item onPress={openSettings}>Settings</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu>`,
		),
		example(
			'Destructive menu item',
			`<DropdownMenu.Item
  confirm={{ onConfirm: signOut, title: 'Sign out?' }}
  variant="destructive"
>
  Sign out
</DropdownMenu.Item>`,
		),
	],
	flex: [
		example(
			'Action row',
			`<Flex align="center" direction="row" gap="sm" justify="end">
  <Button variant="ghost">Cancel</Button>
  <Button>Save</Button>
</Flex>`,
		),
		example(
			'Wrapping content',
			`<Flex direction="row" gap="sm" wrap="wrap">
  {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
</Flex>`,
		),
	],
	form: [
		example(
			'Field with validation',
			`<Form>
  <Form.Field
    error={errors.email}
    label="Email"
    required
  >
    <Input value={email} />
  </Form.Field>
</Form>`,
		),
		example(
			'Grouped fields',
			`<Form.FieldSet legend="Address">
  <Form.FieldGroup>
    <Form.Field label="City"><Input /></Form.Field>
    <Form.Field label="State"><Input /></Form.Field>
  </Form.FieldGroup>
  <Form.FieldSeparator />
</Form.FieldSet>`,
		),
	],
	grid: [
		example(
			'Two-column grid',
			`<Grid cols={2} gap="md">
  <Grid.Item span={6}><Card /></Grid.Item>
  <Grid.Item span={6}><Card /></Grid.Item>
</Grid>`,
		),
		example(
			'Mixed spans',
			`<Grid cols={12} gap="sm">
  <Grid.Item span="full"><Summary /></Grid.Item>
  <Grid.Item span={4}><Filters /></Grid.Item>
  <Grid.Item span={8}><Results /></Grid.Item>
</Grid>`,
		),
	],
	input: [
		example('Default field', `<Input />`),
		example(
			'Sections and validation',
			`<Input
  leftSection={<SearchIcon />}
  rightSection={<ClearAction />}
  size="lg"
/>
<Input variant="error" />`,
		),
	],
	label: [
		example(
			'Label and description',
			`<Label description="Use your work email" required>
  Email
</Label>`,
		),
		example(
			'Validation message',
			`<Label error="Enter a valid email">Email</Label>`,
		),
	],
	layout: [
		example(
			'Complete screen shell',
			`<Layout>
  <Layout.Header size="md"><ScreenTitle /></Layout.Header>
  <Layout.Content>
    <Layout.Main><ScreenContent /></Layout.Main>
  </Layout.Content>
  <Layout.Footer><ScreenActions /></Layout.Footer>
</Layout>`,
		),
		example(
			'Scrollable content',
			`<Layout>
  <Layout.Main>
    {sections.map((section) => <Section key={section.id} {...section} />)}
  </Layout.Main>
</Layout>`,
		),
	],
	list: [
		example(
			'Basic typed list',
			`<List
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <UserRow user={user} />}
/>`,
		),
		example(
			'Filtered data',
			`const visibleOrders = orders.filter((order) => order.status === status)

<List
  data={visibleOrders}
  keyExtractor={(order) => order.id}
  renderItem={(order) => <OrderRow order={order} />}
/>`,
		),
	],
	loader: [
		example('Inline loader', `<Loader />`),
		example(
			'Sized indicator',
			`<Loader color="#2563eb" size="sm" />
<Loader size="lg" />`,
		),
	],
	'loading-overlay': [
		example(
			'Block a screen section',
			`<Box>
  <ProfileForm />
  <LoadingOverlay open={saving} text="Saving profile…" />
</Box>`,
		),
		example('Loading without copy', `<LoadingOverlay open={loading} />`),
	],
	'mask-input': [
		example(
			'Phone mask with section',
			`<MaskInput
  leftSection={<PhoneIcon />}
  mask="(99) 99999-9999"
/>`,
		),
		example('Date mask', `<MaskInput mask="99/99/9999" size="lg" />`),
	],
	modal: [
		example(
			'Form modal',
			`<Modal onChange={setOpen} open={open}>
  <Modal.Header>
    <Modal.Title>Edit profile</Modal.Title>
    <Modal.Description>Update your public information.</Modal.Description>
  </Modal.Header>
  <Modal.Body><ProfileForm /></Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
    <Button onPress={save}>Save</Button>
  </Modal.Footer>
</Modal>`,
		),
		example(
			'Simple content modal',
			`<Modal onChange={setOpen} open={open}>
  <Modal.Body><Details /></Modal.Body>
</Modal>`,
		),
	],
	'number-input': [
		example(
			'Controlled number',
			`<NumberInput onValueChange={setQuantity} value={quantity} />`,
		),
		example(
			'Bounded value',
			`<NumberInput
  max={100}
  min={1}
  onValueChange={setPercentage}
  value={percentage}
/>`,
		),
	],
	'otp-input': [
		example(
			'Controlled six-digit code',
			`<OTPInput
  onChange={setCode}
  pattern={[6]}
  value={code}
/>`,
		),
		example(
			'Grouped code',
			`<OTPInput
  defaultValue=""
  onChange={setCode}
  pattern={[3, 3]}
  size="lg"
/>`,
		),
	],
	'password-input': [
		example(
			'Password field with leading content',
			`<PasswordInput
  leftSection={<LockIcon />}
  size="md"
/>`,
		),
		example(
			'Password strength',
			`<PasswordInput
  size="lg"
  showStrength
/>`,
		),
	],
	'phone-input': [
		example('Phone value change', `<PhoneInput onValueChange={setPhone} />`),
		example(
			'Field with sections',
			`<PhoneInput
  leftSection={<CountryFlag code="BR" />}
  onValueChange={setPhone}
/>`,
		),
	],
	progress: [
		example(
			'Percentage progress',
			`<Progress max={100} value={uploadProgress} />`,
		),
		example(
			'Step completion',
			`<Progress max={steps.length} size="lg" value={completedSteps} />`,
		),
	],
	radio: [
		example(
			'Individual controlled option',
			`<Radio
  checked={delivery === 'express'}
  label="Express delivery"
/>`,
		),
		example(
			'Single-choice group',
			`<Radio.Group
  data={[
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ]}
  onChange={setBillingCycle}
  value={billingCycle}
  variant="cards"
/>`,
		),
	],
	rating: [
		example(
			'Controlled rating',
			`<Rating count={5} onChange={setRating} value={rating} />`,
		),
		example(
			'Ten-point score',
			`<Rating count={10} onChange={setScore} value={score} />`,
		),
	],
	select: [
		example(
			'Single selection',
			`<Select
  clearable
  mode="single"
  onChange={setCityId}
  optionLabel="name"
  options={cities}
  optionValue="id"
  placeholder="Choose a city"
  value={cityId}
/>`,
		),
		example(
			'Multiple searchable selection',
			`<Select
  mode="multiple"
  onChange={setMemberIds}
  optionLabel={(member) => member.name}
  options={members}
  optionValue={(member) => member.id}
  searchable
  searchPlaceholder="Search members"
  value={memberIds}
/>`,
		),
		example(
			'Infinite options',
			`<Select
  infinite={{
    hasMore: page.hasNext,
    loadingMore: page.loading,
    loadingMoreText: 'Loading more customers…',
    onLoadMore: page.loadNext,
  }}
  mode="single"
  optionLabel="name"
  options={customers}
  optionValue="id"
/>`,
		),
	],
	separator: [
		example('Horizontal divider', `<Separator orientation="horizontal" />`),
		example(
			'Vertical divider',
			`<Flex align="center" direction="row" gap="md">
  <Typography>Previous</Typography>
  <Separator orientation="vertical" />
  <Typography>Next</Typography>
</Flex>`,
		),
	],
	sheet: [
		example(
			'Controlled sheet',
			`<Sheet
  description="Choose one of the available actions."
  onChange={setOpen}
  open={open}
  size="md"
  title="Actions"
>
  <ActionList />
</Sheet>`,
		),
		example(
			'Composed sheet sections',
			`<Sheet onChange={setOpen} open={open} size="lg">
  <Sheet.Header>
    <Sheet.Title>Filters</Sheet.Title>
    <Sheet.Description>Refine the visible results.</Sheet.Description>
  </Sheet.Header>
  <Sheet.Body><Filters /></Sheet.Body>
  <Sheet.Footer><Button onPress={apply}>Apply</Button></Sheet.Footer>
</Sheet>`,
		),
	],
	skeleton: [
		example(
			'Card placeholder',
			`<Card>
  <Skeleton />
  <Skeleton />
  <Skeleton />
</Card>`,
		),
		example(
			'List placeholder',
			`<Flex gap="sm">
  {Array.from({ length: 4 }, (_, index) => (
    <Skeleton key={index} />
  ))}
</Flex>`,
		),
	],
	slider: [
		example(
			'Controlled single value',
			`<Slider
  mode="single"
  onValueChange={setVolume}
  orientation="horizontal"
  size="md"
  value={volume}
/>`,
		),
		example(
			'Uncontrolled range',
			`<Slider
  defaultValue={[20, 80]}
  mode="range"
  onValueChange={setPriceRange}
  orientation="vertical"
  size="lg"
/>`,
		),
	],
	stepper: [
		example(
			'Controlled flow',
			`<Stepper active={step} onActiveChange={setStep} variant="numbered">
  <Stepper.Step label="Account"><AccountForm /></Stepper.Step>
  <Stepper.Step label="Profile"><ProfileForm /></Stepper.Step>
  <Stepper.Completed><Success /></Stepper.Completed>

  <Flex direction="row" gap="sm">
    <Stepper.Previous />
    <Stepper.Next lastChildren="Finish" />
  </Flex>
</Stepper>`,
		),
		example(
			'Vertical selectable steps',
			`<Stepper
  active={step}
  allowNextStepsSelect
  onActiveChange={setStep}
  orientation="vertical"
  variant="dotted"
>
  {steps.map((item) => (
    <Stepper.Step key={item.id} label={item.label}>{item.content}</Stepper.Step>
  ))}
</Stepper>`,
		),
	],
	switch: [
		example('Labeled setting', `<Switch label="Notifications" />`),
		example(
			'Sized controls',
			`<Switch label="Compact control" size="sm" />
<Switch label="Prominent control" size="lg" />`,
		),
	],
	tabs: [
		example(
			'Uncontrolled tabs',
			`<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview"><Typography>Overview</Typography></Tabs.Trigger>
    <Tabs.Trigger value="activity"><Typography>Activity</Typography></Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview"><Overview /></Tabs.Content>
  <Tabs.Content value="activity"><Activity /></Tabs.Content>
</Tabs>`,
		),
		example(
			'Controlled vertical tabs',
			`<Tabs
  onValueChange={setTab}
  orientation="vertical"
  value={tab}
  variant="pills"
>
  <Tabs.List>{triggers}</Tabs.List>
  {panels}
</Tabs>`,
		),
	],
	'tags-input': [
		example(
			'Controlled tags',
			`<TagsInput
  onValueChange={setTags}
  value={tags}
/>`,
		),
		example(
			'Tags with leading content',
			`<TagsInput leftSection={<TagIcon />} onValueChange={setSkills} />`,
		),
	],
	textarea: [
		example(
			'Notes with sections',
			`<Textarea
  leftSection={<NoteIcon />}
  rightSection={<ClearAction />}
/>`,
		),
		example(
			'Validation state',
			`<Textarea
  size="lg"
  variant="error"
/>`,
		),
	],
	'theme-provider': [
		example(
			'Provide the default theme',
			`import { ThemeProvider } from '@turystack/react-mobile'

<ThemeProvider defaultTheme="default">
  <Application />
</ThemeProvider>`,
		),
		example(
			'Read and change the theme',
			`import { Button, useTheme } from '@turystack/react-mobile'

function ThemeAction() {
  const { changeTheme, theme } = useTheme()

  return (
    <Button onPress={() => changeTheme('default')}>
      Current theme: {theme}
    </Button>
  )
}`,
		),
	],
	'time-input': [
		example(
			'Time field',
			`<TimeInput mode="time" onChange={setOpeningTime} value={openingTime} />`,
		),
		example(
			'Allowed time window',
			`<TimeInput
  maximumDate={closingLimit}
  minimumDate={openingLimit}
  mode="time"
  onChange={setTime}
  value={time}
/>`,
		),
	],
	toast: [
		example(
			'Host and notification',
			`import { Button, Toast, toast } from '@turystack/react-mobile'

<>
  <Toast position="top-center" theme="system" />
  <Button onPress={() => toast('Profile saved')}>Save</Button>
</>`,
		),
		example(
			'Rich notification content',
			`toast(
  <Flex align="center" direction="row" gap="sm">
    <SuccessIcon />
    <Typography>Upload completed</Typography>
  </Flex>,
)`,
		),
	],
	'truncated-text': [
		example(
			'Two-line summary',
			`<TruncatedText lines={2} position="end">
  {article.summary}
</TruncatedText>`,
		),
		example(
			'Middle truncation',
			`<TruncatedText component="span" lines={1} position="middle">
  {longFileName}
</TruncatedText>`,
		),
	],
	'tury-provider': [
		example(
			'Application root',
			`import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TuryProvider } from '@turystack/react-mobile'

export function App() {
  return (
    <GestureHandlerRootView>
      <TuryProvider defaultColorScheme="system">
        <RootNavigator />
      </TuryProvider>
    </GestureHandlerRootView>
  )
}`,
			'Mount the provider once around the Expo application.',
		),
		example(
			'Explicit appearance',
			`<TuryProvider
  defaultColorScheme="dark"
  portalHostName="app-overlays"
  theme="default"
>
  <AppRoutes />
</TuryProvider>`,
		),
	],
	typography: [
		example(
			'Text hierarchy',
			`<Typography size="2xl" variant="heading" weight="bold">
  Dashboard
</Typography>
<Typography variant="muted">Updated five minutes ago</Typography>`,
		),
		example(
			'Alignment and readable width',
			`<Typography align="center" maxWidth="md" variant="body">
  Your account is ready to use on every device.
</Typography>`,
		),
	],
	uploader: [
		example(
			'Single document upload',
			`async function getSignedUpload(
  fileName: string,
): Promise<UploaderHandlerResponse> {
  return api.uploads.create({ fileName })
}

<Uploader
  accept="application/pdf"
  handler={getSignedUpload}
  label="Attach invoice"
  maxFileSize={5_000_000}
  mode="single"
  onUpload={(response) => setInvoiceUrl(response.cdnUrl)}
/>`,
		),
		example(
			'Multiple images and documents',
			`<Uploader
  accept="image/*,application/pdf"
  handler={getSignedUpload}
  maxFiles={5}
  mode="multiple"
  onUpload={(responses) => setAttachments(responses)}
/>`,
		),
	],
}

Object.assign(reactMobileUsageExamples, {
	accordion: [
		example(
			'Single collapsible item',
			`<Accordion defaultValue="billing" type="single" collapsible onChange={setSection}>
  <Accordion.Item value="billing"><Accordion.Trigger>Billing</Accordion.Trigger><Accordion.Content><BillingDetails /></Accordion.Content></Accordion.Item>
</Accordion>`,
		),
		example(
			'Multiple controlled items',
			`<Accordion bordered onChange={setSections} type="multiple" value={sections}>
  <Accordion.Item disabled value="profile"><Accordion.Trigger>Profile</Accordion.Trigger><Accordion.Content><Profile /></Accordion.Content></Accordion.Item>
</Accordion>`,
		),
	],
	'action-sheet': [
		example(
			'Action list',
			`<ActionSheet onChange={setOpen} open={open}>
  <ActionSheet.Trigger><Button>More actions</Button></ActionSheet.Trigger>
  <ActionSheet.Content title="Actions"><ActionSheet.Item icon={<EditIcon />} onClick={edit}>Edit</ActionSheet.Item><ActionSheet.Separator /><ActionSheet.Item onClick={archive}>Archive</ActionSheet.Item></ActionSheet.Content>
</ActionSheet>`,
		),
		example(
			'Destructive confirmation',
			`<ActionSheet.Item confirm={{ title: 'Delete item?', description: 'This cannot be undone.', onConfirm: remove }} variant="destructive">Delete</ActionSheet.Item>`,
		),
	],
	avatar: [
		example(
			'Remote image',
			`<Avatar alt="Ana Silva" size="lg" src={user.avatarUrl} />`,
		),
		example(
			'Initials fallback',
			`<Avatar alt="Ana Silva" size="md" variant="square" />`,
		),
	],
	'bottom-tabs': [
		example(
			'Controlled navigation',
			`<BottomTabs onChange={(_, value) => navigate(value)} value={route}><BottomTabs.Item icon={<HomeIcon />} label="Home" value="home" /><BottomTabs.Item icon={<SearchIcon />} label="Search" value="search" /></BottomTabs>`,
		),
		example(
			'Icon-only navigation',
			`<BottomTabs onChange={(_, value) => setRoute(value)} showLabels={false} value={route}><BottomTabs.Item icon={<HomeIcon />} label="Home" value="home" /><BottomTabs.Item disabled icon={<SettingsIcon />} label="Settings" value="settings" /></BottomTabs>`,
		),
	],
	button: [
		example(
			'Actions and states',
			`<Button onClick={save}>Save changes</Button>
<Button loading={pending} onClick={save}>Saving</Button>
<Button disabled>Unavailable</Button>`,
		),
		example(
			'Variants and sections',
			`<Button leftSection={<SaveIcon />} variant="outline">Save draft</Button>
<Button rightSection={<ArrowRightIcon />} variant="ghost">Continue</Button>
<Button variant="destructive">Delete</Button>`,
		),
	],
	calendar: [
		example(
			'Single date',
			`<Calendar mode="single" onDateChange={setDate} selected={date} weekStartsOn={1} />`,
		),
		example(
			'Date range',
			`<Calendar maxDate={limit} minDate={today} mode="range" onDateChange={setRange} selected={range} showOutsideDays />`,
		),
	],
	confirm: [
		example(
			'Destructive confirmation',
			`<Confirm description="This action cannot be undone." onCancel={close} onClose={close} onConfirm={remove} open={open} title="Delete item?" />`,
		),
		example(
			'Custom action states',
			`<Confirm cancelText="Keep" confirmProps={{ variant: 'destructive' }} confirmText="Delete" description="The record will be removed permanently." onClose={close} onConfirm={remove} open={open} title="Confirm deletion" />`,
		),
	],
	'confirm-sheet': [
		example(
			'Bottom confirmation',
			`<ConfirmSheet description="The file will be removed." onCancel={close} onClose={close} onConfirm={remove} open={open} side="bottom" title="Delete file?" />`,
		),
		example(
			'Large confirmation flow',
			`<ConfirmSheet confirmText="Continue" description="Review the operation before continuing." onClose={close} onConfirm={submit} open={open} size="lg" title="Confirm operation" />`,
		),
	],
	'currency-input': [
		example(
			'Single monetary value',
			`<CurrencyInput mode="single" onChange={setAmount} value={amount} variant="brl" />`,
		),
		example(
			'Multiple monetary values',
			`<CurrencyInput fromPlaceholder="Minimum" mode="multiple" onChange={setRange} toPlaceholder="Maximum" value={{ from: 100, to: 500 }} variant="usd" />`,
		),
	],
	'date-input': [
		example(
			'Controlled date',
			`<DateInput onChange={setDate} placeholder="Choose a date" value={date} />`,
		),
		example(
			'Uncontrolled date',
			`<DateInput defaultValue={new Date()} disabled={locked} variant="ghost" />`,
		),
	],
	'date-picker-sheet': [
		example(
			'Date selection sheet',
			`<DatePickerSheet clearable description="Choose the delivery date" onChange={setDate} title="Delivery" value={date} />`,
		),
		example(
			'Constrained selection',
			`<DatePickerSheet defaultValue={today} maxDate={lastDay} minDate={today} onChange={setDate} valueFormat="dd/MM/yyyy" />`,
		),
	],
	'date-time-input': [
		example(
			'Date and time',
			`<DateTimeInput onChange={setWhen} value={when} withSeconds />`,
		),
		example(
			'Allowed interval',
			`<DateTimeInput maxDate={lastDay} maxTime="18:00" minDate={today} minTime="08:00" onChange={setWhen} />`,
		),
	],
	'document-input': [
		example(
			'CPF',
			`<DocumentInput onChange={setDocument} value={{ type: 'cpf', number: cpf }} variant="cpf" />`,
		),
		example(
			'Any document',
			`<DocumentInput defaultValue={{ type: 'cnpj', number: companyId }} onChange={setDocument} variant="any" />`,
		),
	],
	'dropdown-menu': [
		example(
			'Grouped menu',
			`<DropdownMenu onOpenChange={setOpen} open={open}><DropdownMenu.Trigger><Button>Options</Button></DropdownMenu.Trigger><DropdownMenu.Content align="end"><DropdownMenu.Label>Account</DropdownMenu.Label><DropdownMenu.Item onClick={edit}>Edit</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item onClick={signOut}>Sign out</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu>`,
		),
		example(
			'Selectable items',
			`<DropdownMenu.CheckboxItem checked={dense} onCheckedChange={setDense}>Dense mode</DropdownMenu.CheckboxItem>
<DropdownMenu.RadioGroup onValueChange={setTheme} value={theme}><DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem><DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem></DropdownMenu.RadioGroup>`,
		),
	],
	form: [
		example(
			'Field with validation',
			`<Form onSubmit={save}><Form.Field error={errors.email} label={{ content: 'Email', required: true }} name="email"><Input value={email} onChange={setEmail} /></Form.Field></Form>`,
		),
		example(
			'Grouped fields',
			`<Form.FieldSet legend="Address" tooltip="Shipping address"><Form.FieldGroup><Form.Field label="Street"><Input /></Form.Field><Form.Field label="City"><Input /></Form.Field></Form.FieldGroup></Form.FieldSet>`,
		),
	],
	label: [
		example(
			'Required label',
			`<Label required tooltip="Used for notifications">Email</Label>`,
		),
		example(
			'Optional and disabled',
			`<Label disabled optional>Nickname</Label>`,
		),
	],
	list: [
		example(
			'Basic typed list',
			`<List items={orders} itemKey="id" renderItem={(order) => <OrderCard order={order} />} />`,
		),
		example(
			'Infinite loading',
			`<List infinite={{ hasMore, loadingMore, onLoadMore }} items={orders} itemKey={(order) => order.id} loading={loading} renderItem={renderOrder} />`,
		),
	],
	loader: [
		example('Small indicator', `<Loader size="sm" />`),
		example('Large indicator', `<Loader size="lg" />`),
	],
	'loading-overlay': [
		example('Visible while loading', `<LoadingOverlay visible={isLoading} />`),
		example('Hidden state', `<LoadingOverlay visible={false} />`),
	],
	'number-input': [
		example(
			'Controlled number',
			`<NumberInput onChange={setQuantity} step={1} value={quantity} />`,
		),
		example(
			'Bounded value',
			`<NumberInput grouping max={1000} min={0} onChange={setAmount} value={amount} />`,
		),
	],
	'phone-input': [
		example(
			'Phone value',
			`<PhoneInput defaultCountry="BR" onChange={setPhone} value={{ iso: 'BR', ddi: '55', number: '11999999999' }} />`,
		),
		example(
			'Uncontrolled phone',
			`<PhoneInput defaultValue={{ iso: 'US', ddi: '1', number: '5551234567' }} onChange={setPhone} placeholder="Phone" />`,
		),
	],
	progress: [
		example('Percentage progress', `<Progress label="Upload" value={65} />`),
		example(
			'Uncontrolled progress',
			`<Progress defaultValue={25} size="lg" />`,
		),
	],
	radio: [
		example(
			'Controlled radio',
			`<Radio checked={plan === 'pro'} label="Pro" onChange={() => setPlan('pro')} value="pro" />`,
		),
		example(
			'Single-choice group',
			`<Radio.Group items={[{ label: 'Monthly', value: 'monthly' }, { label: 'Yearly', value: 'yearly' }]} onChange={setBilling} value={billing} variant="stacked" />`,
		),
	],
	rating: [
		example(
			'Controlled rating',
			`<Rating max={5} onChange={setScore} value={score} />`,
		),
		example(
			'Read-only score',
			`<Rating max={10} readOnly size={20} value={8} />`,
		),
	],
	sheet: [
		example(
			'Controlled sheet',
			`<Sheet onChange={setOpen} open={open} side="bottom" size="lg"><Sheet.Header closable><Sheet.Title>Filters</Sheet.Title><Sheet.Description>Refine the results</Sheet.Description></Sheet.Header><Sheet.Body><Filters /></Sheet.Body></Sheet>`,
		),
		example(
			'Sheet with footer',
			`<Sheet onChange={setOpen} open={open}><Sheet.Body minHeight={240}><Editor /></Sheet.Body><Sheet.Footer bordered><Button onClick={save}>Save</Button></Sheet.Footer></Sheet>`,
		),
	],
	tabs: [
		example(
			'Controlled tabs',
			`<Tabs onChange={setTab} value={tab}><Tabs.List justified><Tabs.Trigger value="details">Details</Tabs.Trigger><Tabs.Trigger value="history">History</Tabs.Trigger></Tabs.List><Tabs.Content value="details"><Details /></Tabs.Content><Tabs.Content value="history"><History /></Tabs.Content></Tabs>`,
		),
		example(
			'Vertical pills',
			`<Tabs defaultValue="profile" orientation="vertical" variant="pill"><Tabs.List variant="pill"><Tabs.Trigger icon={<UserIcon />} value="profile">Profile</Tabs.Trigger></Tabs.List><Tabs.Content value="profile"><Profile /></Tabs.Content></Tabs>`,
		),
	],
	'tags-input': [
		example(
			'Controlled tags',
			`<TagsInput maxTags={5} onChange={setTags} value={tags} />`,
		),
		example(
			'Uncontrolled tags',
			`<TagsInput allowDuplicates={false} defaultValue={['expo']} onChange={setTags} placeholder="Add tag" />`,
		),
	],
	textarea: [
		example(
			'Controlled notes',
			`<Textarea maxLength={500} onChange={setNotes} placeholder="Notes" value={notes} />`,
		),
		example(
			'Read-only state',
			`<Textarea defaultValue="Locked note" disabled size="lg" />`,
		),
	],
	'time-input': [
		example(
			'Time field',
			`<TimeInput onChange={setTime} value={time} withSeconds />`,
		),
		example(
			'Allowed time window',
			`<TimeInput maxTime="18:00" minTime="08:00" onChange={setTime} />`,
		),
	],
	'truncated-text': [
		example(
			'Two-line summary',
			`<TruncatedText lines={2} position="end" value={article.summary} />`,
		),
		example(
			'Middle truncation',
			`<TruncatedText component="span" end={8} lines={1} position="middle" start={12} value={longFileName} />`,
		),
	],
})

export function getReactMobileUsageExamples(slug: string) {
	return reactMobileUsageExamples[slug] ?? []
}
