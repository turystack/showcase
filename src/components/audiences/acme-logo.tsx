import { Flex, Typography } from '@turystack/react-web'

/**
 * Acme's mark: the letter A cut out of a rounded square.
 *
 * Artwork, so it is the one piece of these screens drawn by hand — the way a
 * product ships its logo as an SVG and never as a component. It is a single
 * `currentColor` shape with the A as a hole (`evenodd`), so it follows the
 * text colour around it and reads correctly in both colour schemes.
 */
export function AcmeMark({ size = 28 }: { size?: number }) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			height={size}
			viewBox="0 0 24 24"
			width={size}
		>
			<path
				clipRule="evenodd"
				d="M6 0h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Zm6 5.5 6.2 13h-2.9l-1.2-2.7H9.9l-1.2 2.7H5.8L12 5.5Zm0 4.1 1.76 3.7h-3.52L12 9.6Z"
				fillRule="evenodd"
			/>
		</svg>
	)
}

/**
 * The lockup the auth screens open with: the mark beside the name. A mark on
 * its own is a shape to a first-time visitor; the name is what tells them
 * which product's password they are about to type.
 */
export function AcmeLogo({ size = 'md' }: { size?: 'md' | 'lg' }) {
	return (
		<Flex
			align="center"
			gap="sm"
			inline
		>
			<AcmeMark size={size === 'lg' ? 36 : 28} />
			<Typography
				component="span"
				size={size === 'lg' ? '2xl' : 'xl'}
				weight="bold"
			>
				Acme
			</Typography>
		</Flex>
	)
}
