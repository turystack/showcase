interface TuryMarkProps {
	className?: string
	size?: number
}

/**
 * Brand mark: a "T" built from stacked, tapering layers — the tury stack.
 * Colors come from the theme palette so the mark adapts with it.
 */
export function TuryMark({ className, size = 24 }: TuryMarkProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			fill="none"
			height={size}
			viewBox="0 0 64 64"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				fill="var(--tury-green)"
				height="11"
				rx="5.5"
				width="48"
				x="8"
				y="9"
			/>
			<rect
				fill="var(--tury-purple)"
				height="11"
				rx="5.5"
				width="26"
				x="19"
				y="26.5"
			/>
			<rect
				fill="var(--tury-pink)"
				height="11"
				rx="5.5"
				width="14"
				x="25"
				y="44"
			/>
		</svg>
	)
}
