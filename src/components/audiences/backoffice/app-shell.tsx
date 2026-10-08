import {
	Button,
	Card,
	Grid,
	Layout,
	MoneyText,
	NumberText,
	Page,
	Stat,
} from '@turystack/react-web'

import { PAYMENTS } from './data'
import { PaymentsTable } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `sidebar`           — the rail expanded, the default for an internal tool
 * - `sidebar-collapsed` — the rail reduced to icons, more room for the table
 * - `topbar-nav`        — navigation in the header, only for a small tool
 */
export type AppShellVariant = 'sidebar' | 'sidebar-collapsed' | 'topbar-nav'

const NAV = {
	sidebar: 'sidebar',
	'sidebar-collapsed': 'collapsed',
	'topbar-nav': 'topbar',
} as const

/** The page the shell is shown around: today's figures and latest payments. */
export function AppShellHome() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					action={
						<Button
							href="#payments"
							size="sm"
							variant="outline"
						>
							View all payments
						</Button>
					}
					description={'Friday, 26 September\u00a0· updated a minute ago'}
					title="Today"
				/>
				<Page.Content>
					<Grid
						cols={3}
						gap="md"
					>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="Since midnight"
									label="Gross volume"
									trend={
										<NumberText
											colored
											signDisplay="always"
											size="inherit"
											value={0.084}
											variant="percent"
										/>
									}
									value={
										<MoneyText
											currency="brl"
											size="inherit"
											value={4_218_390}
											weight="inherit"
										/>
									}
								/>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="Arrives 29 Sep"
									label="Next payout"
									value={
										<MoneyText
											currency="brl"
											size="inherit"
											value={3_912_004}
											weight="inherit"
										/>
									}
								/>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="Respond by 3 Oct"
									label="Open disputes"
									value={
										<NumberText
											size="inherit"
											value={2}
											weight="inherit"
										/>
									}
								/>
							</Card.Content>
						</Card>
					</Grid>
					<PaymentsTable items={PAYMENTS.slice(0, 7)} />
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/**
 * The frame, shown around the page it most often holds: today's figures and
 * the payments that just came in.
 *
 * All three variants carry the sandbox banner over the whole shell and the
 * same header — search first, then help, the bell, settings and create. What
 * changes is only where the navigation lives.
 */
export function AppShell({ variant }: { variant: AppShellVariant }) {
	return (
		<BackofficeShell
			active="home"
			nav={NAV[variant]}
		>
			<AppShellHome />
		</BackofficeShell>
	)
}
