import { Flex, Layout } from '@turystack/react-web'
import type { ReactNode } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'

/**
 * The page every single-card auth screen shares: `Layout` with no header and
 * no sidebar, `variant="centered"` so the column sits in the middle of the
 * pane, the logo above it. The card inside is the kit component; this is only
 * the page around it, which the kit leaves to the screen.
 */
export function AuthShell({
	children,
	footer,
}: {
	children: ReactNode
	footer?: ReactNode
}) {
	return (
		<Layout
			height="fill"
			variant="centered"
		>
			<Layout.Main>
				<Layout.Content>
					<Flex
						align="stretch"
						direction="col"
						gap="lg"
					>
						<Flex justify="center">
							<AcmeLogo />
						</Flex>
						{children}
						{footer}
					</Flex>
				</Layout.Content>
			</Layout.Main>
		</Layout>
	)
}

/** What a demo handler returns: a short wait, so the loading state shows. */
export function settle(): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, 900)
	})
}

/** A handler for a control whose destination is outside the demo. */
export const stay = () => undefined
