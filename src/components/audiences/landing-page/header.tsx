import { MenuIcon } from '@turystack/react-icons'
import {
	Box,
	Button,
	Flex,
	Layout,
	Separator,
	Sheet,
} from '@turystack/react-web'
import { useState } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'
import { Features } from '@/components/audiences/landing-page/features'
import { Hero } from '@/components/audiences/landing-page/hero'
import {
	HREF,
	PRIMARY_CTA,
	pathOf,
} from '@/components/audiences/landing-page/section'
import { SocialProof } from '@/components/audiences/landing-page/social-proof'

/**
 * The marketing header: logo, four links, "Sign in" as a text link and one
 * filled button. No mega-menu, no search, no language picker — whatever is cut
 * from here lives in the footer.
 *
 * - `minimal` — links beside the logo, actions at the far end
 * - `centered` — links on the bar's true centre (`Layout.Header
 *   centerSection`), however wide the logo and the actions either side are
 * - `sticky-condensing` — the minimal bar that condenses as the page scrolls
 *   (`condenseOnScroll`): once the content leaves its top the bar drops from
 *   64 to 48px and shows its border, and at the top it restores both. It is
 *   never hidden on scroll
 *
 * Below 768px (`md`) the four links and "Sign in" leave the bar
 * (`hideBelow="md"`) and a menu button takes their place (`hideAbove="md"`),
 * opening a sheet that lists them; the logo and the filled button stay, so
 * the bar fits a 360px phone without clipping.
 *
 * In all three the bar sits outside `Layout.Content`, the one box that
 * scrolls, so it stays on screen without being sticky itself. The links are
 * real links (`Button href`): the three in-page ones jump to the sections of
 * the full page, Docs leaves it.
 */
export type HeaderVariant = 'minimal' | 'centered' | 'sticky-condensing'

const LINKS = [
	{
		href: '#features',
		label: 'Product',
	},
	{
		href: '#pricing',
		label: 'Pricing',
	},
	{
		href: '#customers',
		label: 'Customers',
	},
	{
		href: pathOf('Docs'),
		label: 'Docs',
	},
]

function NavLinks() {
	return (
		<Flex
			align="center"
			gap="lg"
			hideBelow="md"
		>
			{LINKS.map(({ href, label }) => (
				<Button
					href={href}
					key={label}
					variant="link-muted"
				>
					{label}
				</Button>
			))}
		</Flex>
	)
}

/**
 * The phone menu: an icon button that only exists below `md`, and the sheet
 * it opens with the same links stacked, then "Sign in" and the trial button.
 * Following a link closes the sheet, so an in-page jump lands on its section
 * instead of behind the backdrop.
 */
function MobileMenu() {
	const [open, setOpen] = useState(false)
	const close = () => setOpen(false)

	return (
		<Box hideAbove="md">
			<Button
				ariaLabel="Open menu"
				onClick={() => setOpen(true)}
				size="icon-md"
				variant="ghost"
			>
				<MenuIcon size={20} />
			</Button>
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>Menu</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body>
					<Flex
						direction="col"
						gap="md"
					>
						<Flex
							align="start"
							direction="col"
							gap="md"
						>
							{LINKS.map(({ href, label }) => (
								<Button
									href={href}
									key={label}
									onClick={close}
									variant="link-muted"
								>
									{label}
								</Button>
							))}
						</Flex>
						<Separator />
						<Button
							block
							href={HREF.signIn}
							onClick={close}
							variant="outline"
						>
							Sign in
						</Button>
						<Button
							block
							href={HREF.signUp}
							onClick={close}
						>
							{PRIMARY_CTA}
						</Button>
					</Flex>
				</Sheet.Body>
			</Sheet>
		</Box>
	)
}

function Actions() {
	return (
		<Flex
			align="center"
			gap="md"
			justify="end"
		>
			<Box hideBelow="md">
				<Button
					href={HREF.signIn}
					variant="link-muted"
				>
					Sign in
				</Button>
			</Box>
			<Button href={HREF.signUp}>{PRIMARY_CTA}</Button>
			<MobileMenu />
		</Flex>
	)
}

/**
 * The bar alone, for the full page to reuse.
 *
 * The row variants cap the bar's content at the sections' width
 * (`maxWidth="lg"`, padding `md`), the same edges as every section's
 * `Container maxWidth="lg" paddingX="md"`, so the logo lines up with the
 * headings below. The centred one is the header's three-column bar, which
 * spans the whole width with the shell's gutter.
 */
export function SiteHeader({ variant }: { variant: HeaderVariant }) {
	if (variant === 'centered') {
		return (
			<Layout.Header
				centerSection={<NavLinks />}
				leftSection={<AcmeLogo />}
				rightSection={<Actions />}
				size="lg"
			/>
		)
	}

	return (
		<Layout.Header
			condenseOnScroll={variant === 'sticky-condensing'}
			leftSection={
				<Flex
					align="center"
					gap="xl"
				>
					<AcmeLogo />
					<NavLinks />
				</Flex>
			}
			maxWidth="lg"
			padding="md"
			rightSection={<Actions />}
			size="lg"
		/>
	)
}

/**
 * The header over the page it heads, so it is judged in place: at the top of
 * the hero for the first two, and over content long enough to scroll for the
 * condensing bar — scroll the stage to watch it condense.
 */
export function Header({ variant }: { variant: HeaderVariant }) {
	return (
		<Layout height="fill">
			<SiteHeader variant={variant} />
			<Layout.Main>
				<Layout.Content padding="none">
					{variant === 'sticky-condensing' ? (
						<>
							<Hero variant="centered" />
							<Features
								bg="muted"
								variant="grid"
							/>
							<SocialProof variant="testimonials" />
						</>
					) : (
						<Hero variant="centered" />
					)}
				</Layout.Content>
			</Layout.Main>
		</Layout>
	)
}
