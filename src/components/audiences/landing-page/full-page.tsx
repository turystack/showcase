import { Layout } from '@turystack/react-web'

import { CallToAction } from '@/components/audiences/landing-page/call-to-action'
import { Faq } from '@/components/audiences/landing-page/faq'
import { Features } from '@/components/audiences/landing-page/features'
import { Footer } from '@/components/audiences/landing-page/footer'
import { SiteHeader } from '@/components/audiences/landing-page/header'
import { Hero } from '@/components/audiences/landing-page/hero'
import { Pricing } from '@/components/audiences/landing-page/pricing'
import { SocialProof } from '@/components/audiences/landing-page/social-proof'

/**
 * Every section, in the order the SaaS templates converge on: header, hero,
 * logos, features, the long-form features, testimonials, pricing, FAQ, the
 * closing call to action, footer.
 *
 * The header is the shell's own `Layout.Header`, outside `Layout.Content` — the
 * one box that scrolls — so it stays on screen the whole way down, and it
 * condenses once the page leaves its top (`condenseOnScroll`). Its Product,
 * Pricing and Customers links are anchors to the sections carrying those
 * ids. Two
 * sections carry the muted background (the feature grid and the closing
 * band); everything else sits on the page colour, so the alternation reads as
 * rhythm rather than stripes.
 *
 * The primary action appears three times with one label — header, hero,
 * closing band — plus on the paid tiers.
 */
export type FullPageVariant = 'recommended'

export function FullPage(_: { variant: FullPageVariant }) {
	return (
		<Layout height="fill">
			<SiteHeader variant="sticky-condensing" />
			<Layout.Main>
				<Layout.Content padding="none">
					<Hero variant="centered-with-screenshot" />
					<SocialProof variant="logos" />
					<Features
						bg="muted"
						id="features"
						variant="grid"
					/>
					<Features variant="alternating" />
					<SocialProof
						id="customers"
						variant="testimonials"
					/>
					<Pricing
						compare
						id="pricing"
						variant="tiers"
					/>
					<Faq
						id="faq"
						variant="two-column-open"
					/>
					<CallToAction variant="banner" />
					<Footer variant="columns" />
				</Layout.Content>
			</Layout.Main>
		</Layout>
	)
}
