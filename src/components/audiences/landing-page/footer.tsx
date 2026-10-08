import {
	Badge,
	Button,
	Flex,
	Grid,
	Separator,
	Typography,
} from '@turystack/react-web'

import { AcmeLogo } from '@/components/audiences/acme-logo'
import { pathOf, Section } from '@/components/audiences/landing-page/section'

/**
 * Links, legal and the way out — and where the links cut from the header go.
 *
 * - `simple` — one row: logo, five links, copyright
 * - `columns` — the SaaS default: the logo and a tagline, four groups of four
 *   links, then the legal line. On a phone the groups fold to two a row,
 *   under the logo
 *
 * Every link is a `Button href` in the `link-muted` variant: muted text that
 * turns foreground on hover, with no padding of its own, so a column of them
 * starts on the same edge as its heading.
 */
export type FooterVariant = 'simple' | 'columns'

const SIMPLE_LINKS = [
	'Product',
	'Pricing',
	'Docs',
	'Privacy',
	'Status',
]

const GROUPS = [
	{
		links: [
			'Features',
			'Pricing',
			'Integrations',
			'Changelog',
		],
		title: 'Product',
	},
	{
		links: [
			'About',
			'Customers',
			'Careers',
			'Contact',
		],
		title: 'Company',
	},
	{
		links: [
			'Docs',
			'Guides',
			'API reference',
			'Community',
		],
		title: 'Resources',
	},
	{
		links: [
			'Privacy',
			'Security',
			'LGPD',
			'Cookies',
		],
		title: 'Legal',
	},
]

const COPYRIGHT = '© 2026 Acme Tecnologia Ltda. · CNPJ 12.345.678/0001-90'

function Copyright() {
	return (
		<Typography
			size="sm"
			variant="muted"
		>
			{COPYRIGHT}
		</Typography>
	)
}

export function Footer({ variant }: { variant: FooterVariant }) {
	if (variant === 'simple') {
		return (
			<Flex direction="col">
				<Separator />
				<Section spacing="md">
					<Flex
						align="center"
						gap="lg"
						justify="between"
						wrap="wrap"
					>
						<AcmeLogo />
						<Flex
							align="center"
							gap="lg"
							wrap="wrap"
						>
							{SIMPLE_LINKS.map((label) => (
								<Button
									href={pathOf(label)}
									key={label}
									size="sm"
									variant="link-muted"
								>
									{label}
								</Button>
							))}
						</Flex>
						<Copyright />
					</Flex>
				</Section>
			</Flex>
		)
	}

	return (
		<Flex direction="col">
			<Separator />
			<Section>
				<Flex
					direction="col"
					gap="xl"
				>
					<Grid
						cols={{
							base: 2,
							md: 6,
						}}
						gap="xl"
					>
						<Grid.Item span={2}>
							<Flex
								align="start"
								direction="col"
								gap="md"
							>
								<AcmeLogo />
								<Typography
									component="p"
									size="sm"
									variant="muted"
								>
									Orders, billing and customers for operations teams, in one
									workspace.
								</Typography>
								<Badge variant="success">All systems operational</Badge>
							</Flex>
						</Grid.Item>
						{GROUPS.map((group) => (
							<Flex
								align="start"
								direction="col"
								gap="sm"
								key={group.title}
							>
								{/* h2: the footer is a landmark of its own, not a part of the
								    section above it. */}
								<Typography
									component="h2"
									size="sm"
									weight="semibold"
								>
									{group.title}
								</Typography>
								{group.links.map((label) => (
									<Button
										href={pathOf(label)}
										key={label}
										size="sm"
										variant="link-muted"
									>
										{label}
									</Button>
								))}
							</Flex>
						))}
					</Grid>
					<Separator />
					<Flex
						align="center"
						gap="md"
						justify="between"
						wrap="wrap"
					>
						<Copyright />
						<Typography
							size="sm"
							variant="muted"
						>
							Made in São Paulo
						</Typography>
					</Flex>
				</Flex>
			</Section>
		</Flex>
	)
}
