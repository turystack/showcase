import {
	BellIcon,
	GlobeIcon,
	LaptopIcon,
	LockIcon,
	SmartphoneIcon,
	Trash2Icon,
	UserIcon,
} from '@turystack/react-icons'
import {
	AnchorNav,
	Avatar,
	Badge,
	Button,
	Card,
	Confirm,
	DateText,
	Flex,
	Form,
	Identity,
	Input,
	Layout,
	List,
	Select,
	Switch,
	Tabs,
	Typography,
} from '@turystack/react-web'
import { type FormEvent, type ReactNode, useState } from 'react'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { CUSTOMER } from '@/components/audiences/b2c/data'

/**
 * Preferences, security and the account itself, in the two ways consumer
 * products lay them out.
 *
 * - `vertical-tabs` — one section at a time, chosen from a column of tabs
 *   (a ride app's account page). On a phone it becomes a list and a detail page
 * - `anchored` — every section on one long page, with an index that jumps
 *   into it (a music app's settings)
 */
export type SettingsVariant = 'vertical-tabs' | 'anchored'

function Section({
	title,
	description,
	children,
}: {
	title: string
	description: string
	children: ReactNode
}) {
	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={2}>{title}</Card.Title>
				<Card.Description>{description}</Card.Description>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

/** Shaped like an address: something, an @, a domain with a dot. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** A phone as it is stored: `+` and digits. */
const E164 = /^\+[1-9]\d{7,14}$/

/** Name, email and phone, each checked when the form is saved. */
function AccountForm() {
	const [name, setName] = useState<string | null>(CUSTOMER.name)
	const [email, setEmail] = useState<string | null>(CUSTOMER.email)
	const [phone, setPhone] = useState<string | null>('+5511987654321')
	const [errors, setErrors] = useState<{
		email?: string
		name?: string
		phone?: string
	}>({})
	const typedEmail = email?.trim() ?? ''
	const typedPhone = (phone ?? '').replace(/[\s().-]/g, '')

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setErrors({
			email: !typedEmail
				? 'Enter your email address.'
				: EMAIL.test(typedEmail)
					? undefined
					: 'Enter a valid email address.',
			name: name?.trim() ? undefined : 'Enter your name.',
			phone:
				typedPhone && !E164.test(typedPhone)
					? 'Use the international format, starting with +.'
					: undefined,
		})
	}

	return (
		<Form onSubmit={submit}>
			<Form.Field
				error={errors.name}
				label="Name"
			>
				<Input
					autoComplete="name"
					onChange={setName}
					value={name}
				/>
			</Form.Field>
			<Form.Field
				description="Sign-in codes and receipts go here."
				error={errors.email}
				label="Email"
			>
				<Input
					autoComplete="email"
					inputMode="email"
					onChange={setEmail}
					value={email}
				/>
			</Form.Field>
			<Form.Field
				description="Couriers call this number if they cannot find you."
				error={errors.phone}
				label="Phone"
			>
				<Input
					autoComplete="tel"
					inputMode="tel"
					onChange={setPhone}
					placeholder="+1 202 555 0143"
					value={phone}
				/>
			</Form.Field>
			<Flex justify="end">
				<Button type="submit">Save changes</Button>
			</Flex>
		</Form>
	)
}

function AccountSection() {
	return (
		<Section
			description="How we reach you and what couriers see on the order."
			title="Account"
		>
			<AccountForm />
		</Section>
	)
}

function NotificationsSection() {
	return (
		<Section
			description="Order updates are always on; everything else is your choice."
			title="Notifications"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<Switch
					checked
					description="Confirmed, on its way, delivered. Required while an order is open."
					disabled
					label="Order status"
				/>
				<Switch
					defaultChecked
					description="Coupons and offers from stores you ordered from."
					label="Offers from your stores"
				/>
				<Switch
					description="New stores and dishes near your address."
					label="What's new nearby"
				/>
				<Switch
					defaultChecked
					description="A weekly summary of what you spent."
					label="Weekly email"
				/>
			</Flex>
		</Section>
	)
}

/** A `session` row: one device the person is signed in on. */
type Session = {
	device: string
	last_used_at: string
	location: string
	session_id: string
}

/** This browser: "This device", and no way to sign itself out from here. */
const CURRENT_SESSION = 'b2c-s1'

const minutesAgo = (minutes: number) =>
	new Date(Date.now() - minutes * 60_000).toISOString()

/** The person's b2c sessions (IAM-22); this browser is the current one. */
const SESSIONS: Session[] = [
	{
		device: 'Chrome on Windows',
		last_used_at: minutesAgo(0),
		location: 'São Paulo, Brasil',
		session_id: 'b2c-s1',
	},
	{
		device: 'Safari on iOS',
		last_used_at: minutesAgo(40),
		location: 'São Paulo, Brasil',
		session_id: 'b2c-s2',
	},
	{
		device: 'Safari on macOS',
		last_used_at: minutesAgo(3 * 24 * 60),
		location: 'Campinas, Brasil',
		session_id: 'b2c-s3',
	},
]

/**
 * One row per device: what it is, where, when it was last used — and a way
 * to sign it out. Signing out every other device asks first.
 */
function SignedInDevices() {
	const [sessions, setSessions] = useState(SESSIONS)
	const [confirming, setConfirming] = useState(false)
	const isCurrent = (session: Session) => session.session_id === CURRENT_SESSION

	return (
		<>
			<List
				ariaLabel="Where you’re signed in"
				divided
				footerSection={
					sessions.some((session) => !isCurrent(session)) ? (
						<Flex justify="end">
							<Button
								onClick={() => setConfirming(true)}
								size="sm"
								variant="outline"
							>
								Sign out everywhere else
							</Button>
						</Flex>
					) : null
				}
				gap="none"
				itemKey="session_id"
				items={sessions}
				renderItem={(session) => (
					<Flex
						align="center"
						gap="sm"
						justify="between"
					>
						<Identity
							action={
								isCurrent(session) ? (
									<Badge
										size="sm"
										variant="success"
									>
										This device
									</Badge>
								) : undefined
							}
							description={
								<>
									{session.location} ·{' '}
									{isCurrent(session) ? (
										'Active now'
									) : (
										<>
											Active{' '}
											<DateText
												inheritColor
												live
												size="inherit"
												value={session.last_used_at}
												variant="relative"
											/>
										</>
									)}
								</>
							}
							media={
								<Avatar
									alt=""
									size="sm"
									variant="square"
								>
									{/iOS|Android/.test(session.device) ? (
										<SmartphoneIcon size={14} />
									) : (
										<LaptopIcon size={14} />
									)}
								</Avatar>
							}
							size="sm"
							title={session.device}
						/>
						{isCurrent(session) ? null : (
							<Button
								ariaLabel={`Sign out ${session.device}`}
								onClick={() =>
									setSessions((current) =>
										current.filter(
											(row) => row.session_id !== session.session_id,
										),
									)
								}
								size="sm"
								variant="ghost"
							>
								Sign out
							</Button>
						)}
					</Flex>
				)}
			/>
			<Confirm
				confirmProps={{
					variant: 'destructive',
				}}
				confirmText="Sign out everywhere else"
				description="Every other device is signed out at its next refresh. This one stays signed in."
				onClose={() => setConfirming(false)}
				onConfirm={() => setSessions((current) => current.filter(isCurrent))}
				open={confirming}
				title="Sign out of every other device?"
			/>
		</>
	)
}

function PrivacySection() {
	return (
		<Section
			description="What others see, and what we keep."
			title="Privacy and security"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<Switch
					defaultChecked
					description="Your reviews and lists, under your first name."
					label="Public profile"
				/>
				<Switch
					description="Show friends which stores you ordered from."
					label="Share activity with friends"
				/>
				<Flex
					align="stretch"
					direction="col"
					gap="xs"
				>
					<Typography
						component="span"
						size="sm"
						weight="medium"
					>
						Signed-in devices
					</Typography>
					<SignedInDevices />
				</Flex>
				<Flex
					align="center"
					justify="between"
				>
					<Flex
						align="stretch"
						direction="col"
						gap="none"
					>
						<Typography
							component="span"
							size="sm"
							weight="medium"
						>
							Download your data
						</Typography>
						<Typography
							component="span"
							size="sm"
							variant="muted"
						>
							Orders, addresses and reviews, as one file.
						</Typography>
					</Flex>
					<Button
						size="sm"
						variant="outline"
					>
						Request
					</Button>
				</Flex>
			</Flex>
		</Section>
	)
}

/** Each language named in itself, so a reader finds theirs in any UI. */
const LANGUAGES = [
	{
		label: 'English',
		value: 'en',
	},
	{
		label: 'Español',
		value: 'es',
	},
	{
		label: 'Português (Brasil)',
		value: 'pt-BR',
	},
]

function LanguageForm() {
	const [language, setLanguage] = useState<string | null>('pt-BR')

	return (
		<Form onSubmit={(event) => event.preventDefault()}>
			<Form.Field label="Language">
				<Select
					clearable={false}
					mode="single"
					onChange={setLanguage}
					optionLabel="label"
					options={LANGUAGES}
					optionValue="value"
					value={language}
				/>
			</Form.Field>
			<Flex justify="end">
				<Button type="submit">Save changes</Button>
			</Flex>
		</Form>
	)
}

function LanguageSection() {
	return (
		<Section
			description="Language and how amounts and dates are written."
			title="Language and region"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<LanguageForm />
				<Switch
					description="Bigger text and higher contrast across the app."
					label="Larger text"
				/>
			</Flex>
		</Section>
	)
}

function DangerSection() {
	return (
		<Section
			description="Deleting removes your orders, addresses and credit. It cannot be undone."
			title="Delete account"
		>
			<Button variant="destructive">Delete my account</Button>
		</Section>
	)
}

const SECTIONS = [
	{
		icon: UserIcon,
		id: 'account',
		label: 'Account',
		render: () => <AccountSection />,
	},
	{
		icon: BellIcon,
		id: 'notifications',
		label: 'Notifications',
		render: () => <NotificationsSection />,
	},
	{
		icon: LockIcon,
		id: 'privacy',
		label: 'Privacy and security',
		render: () => <PrivacySection />,
	},
	{
		icon: GlobeIcon,
		id: 'language',
		label: 'Language and region',
		render: () => <LanguageSection />,
	},
	{
		icon: Trash2Icon,
		id: 'delete',
		label: 'Delete account',
		render: () => <DangerSection />,
	},
]

function Title() {
	return (
		<Typography
			component="h1"
			size="3xl"
			weight="bold"
		>
			Settings
		</Typography>
	)
}

export function Settings({ variant }: { variant: SettingsVariant }) {
	if (variant === 'anchored') {
		return (
			<ConsumerShell>
				<Layout.Content span={1}>
					<Flex
						align="stretch"
						direction="col"
						gap="md"
					>
						<Title />
						{/*
						 * The index is its own pane, so it stays in view while the
						 * sections scroll under it; each section carries the id its
						 * link points at, and the index follows the scroll. The
						 * sections scroll in their own pane, below the app header
						 * rather than under it, so a jump lands flush with the pane.
						 */}
						<AnchorNav
							defaultActiveId="account"
							items={SECTIONS.map((section) => ({
								id: section.id,
								label: section.label,
							}))}
							offset="none"
						/>
					</Flex>
				</Layout.Content>
				<Layout.Content span={3}>
					<Flex
						align="stretch"
						direction="col"
						gap="lg"
					>
						{SECTIONS.map((section) => (
							<Flex
								align="stretch"
								direction="col"
								id={section.id}
								key={section.id}
							>
								{section.render()}
							</Flex>
						))}
					</Flex>
				</Layout.Content>
			</ConsumerShell>
		)
	}

	return (
		<ConsumerShell>
			<Layout.Content maxWidth="lg">
				<Flex
					align="stretch"
					direction="col"
					gap="lg"
				>
					<Title />
					<Tabs
						defaultValue="account"
						justified={false}
						orientation="vertical"
					>
						<Tabs.List
							ariaLabel="Settings sections"
							justified={false}
						>
							{SECTIONS.map((section) => (
								<Tabs.Trigger
									icon={<section.icon size={16} />}
									key={section.id}
									value={section.id}
								>
									{section.label}
								</Tabs.Trigger>
							))}
						</Tabs.List>
						{SECTIONS.map((section) => (
							<Tabs.Content
								key={section.id}
								value={section.id}
							>
								{section.render()}
							</Tabs.Content>
						))}
					</Tabs>
				</Flex>
			</Layout.Content>
		</ConsumerShell>
	)
}
