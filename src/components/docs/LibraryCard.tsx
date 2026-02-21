import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

type LibraryColor = 'cyan' | 'orange' | 'green' | 'pink' | 'yellow' | 'purple'

export type LibraryCardProps = {
	name: string
	icon: ReactNode
	color: LibraryColor
	description: string
	tagline: string
	version: string
	downloads: string
}

const colorMap = {
	cyan: {
		bg: 'bg-tury-cyan/5',
		border: 'border-tury-cyan/20 hover:border-tury-cyan/50',
		dot: 'bg-tury-cyan',
		glow: 'shadow-[var(--glow-cyan)]',
		text: 'text-tury-cyan',
	},
	green: {
		bg: 'bg-tury-green/5',
		border: 'border-tury-green/20 hover:border-tury-green/50',
		dot: 'bg-tury-green',
		glow: 'shadow-[var(--glow-green)]',
		text: 'text-tury-green',
	},
	orange: {
		bg: 'bg-tury-orange/5',
		border: 'border-tury-orange/20 hover:border-tury-orange/50',
		dot: 'bg-tury-orange',
		glow: 'shadow-[var(--glow-orange)]',
		text: 'text-tury-orange',
	},
	pink: {
		bg: 'bg-tury-pink/5',
		border: 'border-tury-pink/20 hover:border-tury-pink/50',
		dot: 'bg-tury-pink',
		glow: 'shadow-[var(--glow-pink)]',
		text: 'text-tury-pink',
	},
	purple: {
		bg: 'bg-tury-purple/5',
		border: 'border-tury-purple/20 hover:border-tury-purple/50',
		dot: 'bg-tury-purple',
		glow: 'shadow-[var(--glow-purple)]',
		text: 'text-tury-purple',
	},
	yellow: {
		bg: 'bg-tury-yellow/5',
		border: 'border-tury-yellow/20 hover:border-tury-yellow/50',
		dot: 'bg-tury-yellow',
		glow: 'shadow-[var(--glow-yellow)]',
		text: 'text-tury-yellow',
	},
}

export function LibraryCard({
	description,
	tagline,
	name,
	icon,
	color,
	version,
	downloads,
}: LibraryCardProps) {
	const c = colorMap[color]

	return (
		<div
			className={`group relative flex flex-col rounded-lg border ${c.border} bg-card p-6 transition-all duration-300 hover:${c.glow}`}
		>
			<div className="flex items-start justify-between">
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} ${c.text}`}
				>
					{icon}
				</div>
				<ArrowUpRight
					className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
					size={16}
				/>
			</div>
			<h3 className={`mt-4 font-mono font-semibold text-sm ${c.text}`}>
				{name}
			</h3>
			<p className="mt-1 font-bold font-display text-foreground text-lg">
				{tagline}
			</p>
			<p className="mt-2 flex-1 text-muted-foreground text-sm leading-relaxed">
				{description}
			</p>
			<div className="mt-6 flex items-center gap-4 border-border border-t pt-4">
				<div className="flex items-center gap-1.5">
					<div className={`h-2 w-2 rounded-full ${c.dot}`} />
					<span className="font-mono text-muted-foreground text-xs">
						{version}
					</span>
				</div>
				<span className="text-muted-foreground text-xs">
					{downloads} downloads/wk
				</span>
			</div>
		</div>
	)
}
