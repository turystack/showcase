import {
	CameraIcon,
	KeyRoundIcon,
	LaptopIcon,
	SmartphoneIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Button,
	Card,
	Confirm,
	DateText,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	Page,
	Select,
	Switch,
	Table,
	type TableColumns,
	Typography,
} from '@turystack/react-web'
import { type FormEvent, useState } from 'react'

import { HomeOverview } from './app-shell'
import { ME } from './crm-data'
import { AccountMenu, CrmShell } from './crm-shell'
import { SettingsNav } from './settings'

/**
 * The signed-in person.
 *
 * `page` is My profile inside Setup's navigation, because in a CRM the
 * profile is one more area of settings, not a place of its own: details
 * (a Form in a Grid), password and two-step verification, and the sessions
 * signed in right now (a Table).
 * `account-menu` is how people get there — the avatar at the end of the
 * header opens who you are, the settings, the workspace, and the way out.
 */
export type ProfileVariant = 'page' | 'account-menu'

const now = Date.now()
const hoursAgo = (hours: number) =>
	new Date(now - hours * 3_600_000).toISOString()

/** A `session` row: where the person is signed in, and when it was last used. */
type Session = {
	device: string
	ip_address: string
	last_used_at: string
	location: string
	session_id: string
}

/** The session the access token carries: "This device". */
const CURRENT_SESSION = 's1'

const SESSIONS: Session[] = [
	{
		device: 'Chrome on macOS',
		ip_address: '189.40.12.77',
		last_used_at: hoursAgo(0),
		location: 'São Paulo, Brasil',
		session_id: 's1',
	},
	{
		device: 'Safari on iOS',
		ip_address: '177.92.4.18',
		last_used_at: hoursAgo(2),
		location: 'São Paulo, Brasil',
		session_id: 's2',
	},
	{
		device: 'Edge on Windows',
		ip_address: '200.155.3.9',
		last_used_at: hoursAgo(15 * 24),
		location: 'Campinas, Brasil',
		session_id: 's3',
	},
]

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

/** "America/Sao_Paulo" → "America/Sao Paulo (GMT-3)". */
function zoneLabel(zone: string) {
	const offset = new Intl.DateTimeFormat('en-US', {
		timeZone: zone,
		timeZoneName: 'shortOffset',
	})
		.formatToParts(new Date())
		.find((part) => part.type === 'timeZoneName')?.value

	return `${zone.replace(/_/g, ' ')}${offset ? ` (${offset})` : ''}`
}

/** A phone as `user.phone` stores it: `+` and digits, or nothing. */
const E164 = /^\+[1-9]\d{7,14}$/

/**
 * The person's details, two to a row under the photo. The email is the
 * sign-in, so it is shown but only an admin changes it.
 */
function PersonalDetails() {
	const [name, setName] = useState<string | null>(ME.name)
	const [phone, setPhone] = useState<string | null>('+5511987654321')
	const [language, setLanguage] = useState<string | null>('en')
	const [zone, setZone] = useState<string | null>('America/Sao_Paulo')
	const [errors, setErrors] = useState<{
		name?: string
		phone?: string
	}>({})

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const typed = (phone ?? '').replace(/[\s().-]/g, '')

		setErrors({
			name: name?.trim() ? undefined : 'Enter your name.',
			phone:
				typed && !E164.test(typed)
					? 'Use the international format, starting with +.'
					: undefined,
		})
	}

	return (
		<Form onSubmit={submit}>
			<Flex
				align="center"
				gap="md"
			>
				<Avatar
					alt={ME.name}
					size="lg"
				>
					{ME.initials}
				</Avatar>
				<Button
					leftSection={<CameraIcon size={16} />}
					size="sm"
					variant="outline"
				>
					Change photo
				</Button>
			</Flex>
			<Grid
				cols={{
					base: 1,
					sm: 2,
				}}
				gap="md"
			>
				<Form.Field
					error={errors.name}
					label="Name"
				>
					<Input
						autoComplete="name"
						onChange={(value) => {
							setName(value)
							setErrors((current) => ({
								...current,
								name: undefined,
							}))
						}}
						value={name}
					/>
				</Form.Field>
				<Form.Field
					description="Ask an admin to change it."
					label="Email"
				>
					<Input
						autoComplete="email"
						inputMode="email"
						readOnly
						value={ME.email}
					/>
				</Form.Field>
				<Form.Field
					error={errors.phone}
					label="Phone"
				>
					<Input
						autoComplete="tel"
						inputMode="tel"
						onChange={(value) => {
							setPhone(value)
							setErrors((current) => ({
								...current,
								phone: undefined,
							}))
						}}
						placeholder="+1 202 555 0143"
						value={phone}
					/>
				</Form.Field>
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
				<Form.Field label="Time zone">
					<Select
						clearable={false}
						mode="single"
						onChange={setZone}
						optionLabel="label"
						options={TIME_ZONES.map((value) => ({
							label: zoneLabel(value),
							value,
						}))}
						optionValue="value"
						searchable
						value={zone}
					/>
				</Form.Field>
			</Grid>
			<Flex
				align="center"
				gap="sm"
				justify="end"
				wrap="wrap"
			>
				<Button type="submit">Save changes</Button>
			</Flex>
		</Form>
	)
}

/** Where you're signed in: each device, where it was, when it was last used. */
function Sessions() {
	const [sessions, setSessions] = useState(SESSIONS)
	const [confirming, setConfirming] = useState(false)
	const isCurrent = (session: Session) => session.session_id === CURRENT_SESSION
	const signOut = (session: Session) =>
		setSessions((current) =>
			current.filter((row) => row.session_id !== session.session_id),
		)

	const columns: TableColumns<Session> = [
		{
			key: 'device',
			label: 'Device',
			selector: (session) => (
				<Flex
					align="center"
					gap="sm"
				>
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
					<Typography
						size="sm"
						truncate
						weight="medium"
					>
						{session.device}
					</Typography>
					{isCurrent(session) ? (
						<Badge
							size="sm"
							variant="success"
						>
							This device
						</Badge>
					) : null}
				</Flex>
			),
			width: 300,
		},
		{
			key: 'location',
			label: 'Location',
			selector: (session) => (
				<Typography
					size="sm"
					variant="muted"
				>
					{session.location} · {session.ip_address}
				</Typography>
			),
			width: 220,
		},
		{
			key: 'last_used_at',
			label: 'Last active',
			selector: (session) => (
				<Typography
					size="sm"
					variant="muted"
				>
					{isCurrent(session) ? (
						'Active now'
					) : (
						<DateText
							inheritColor
							live
							size="inherit"
							value={session.last_used_at}
							variant="relative"
						/>
					)}
				</Typography>
			),
			width: 180,
		},
		{
			align: 'right',
			fixedWidth: true,
			key: 'action',
			selector: (session) =>
				isCurrent(session) ? null : (
					<Button
						ariaLabel={`Sign out ${session.device}`}
						onClick={() => signOut(session)}
						size="sm"
						variant="ghost"
					>
						Sign out
					</Button>
				),
			width: 112,
		},
	]

	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Table
				columns={columns}
				density="compact"
				itemKey="session_id"
				items={sessions}
				layoutWidth={812}
				rowName={(session) => session.device}
			/>
			{sessions.some((session) => !isCurrent(session)) ? (
				<Flex justify="end">
					<Button
						onClick={() => setConfirming(true)}
						size="sm"
						variant="outline"
					>
						Sign out everywhere else
					</Button>
				</Flex>
			) : null}
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
		</Flex>
	)
}

function MyProfile() {
	return (
		<Page>
			<Page.Header
				breadcrumbs={[
					{
						href: '#setup',
						label: 'Setup',
					},
					{
						label: 'Profile',
					},
				]}
				description="How you appear to your team, and how you sign in"
				title="My profile"
			/>
			<Page.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Personal details</Card.Title>
						</Card.Header>
						<Card.Content>
							<PersonalDetails />
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Password and security</Card.Title>
						</Card.Header>
						<Card.Content>
							<Flex
								align="stretch"
								direction="col"
								gap="md"
							>
								<Flex
									align="center"
									gap="md"
									justify="between"
								>
									<Flex
										align="stretch"
										direction="col"
										gap="none"
									>
										<Typography
											size="sm"
											weight="medium"
										>
											Password
										</Typography>
										<Typography
											size="sm"
											variant="muted"
										>
											Last changed on 3 June 2026
										</Typography>
									</Flex>
									<Button
										leftSection={<KeyRoundIcon size={16} />}
										size="sm"
										variant="outline"
									>
										Change password
									</Button>
								</Flex>
								<Switch
									bordered
									defaultChecked
									description="A code from your authenticator app at every sign-in."
									label="Two-step verification"
								/>
							</Flex>
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Where you’re signed in</Card.Title>
						</Card.Header>
						<Card.Content>
							<Sessions />
						</Card.Content>
					</Card>
				</Flex>
			</Page.Content>
		</Page>
	)
}

/** The zones this CRM's customers work in; the full IANA list is the default. */
const TIME_ZONES = [
	'America/Sao_Paulo',
	'America/Manaus',
	'America/Recife',
	'America/New_York',
	'Europe/Lisbon',
	'UTC',
]

export function Profile({ variant }: { variant: ProfileVariant }) {
	if (variant === 'account-menu') {
		return (
			<CrmShell
				account={<AccountMenu defaultOpen />}
				active="home"
			>
				<HomeOverview />
			</CrmShell>
		)
	}

	return (
		<CrmShell active="setup">
			<Layout.Content
				bg="muted"
				padding="sm"
				span={1}
			>
				<SettingsNav active="Profile" />
			</Layout.Content>
			<Layout.Content span={4}>
				<MyProfile />
			</Layout.Content>
		</CrmShell>
	)
}
