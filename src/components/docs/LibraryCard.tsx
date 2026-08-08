import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { useNpmInfo } from '@/hooks/use-npm-info'

// Tipo atualizado com 30 cores no total (15 originais + 15 novas)
export type LibraryColor =
	| 'slate'
	| 'cyan'
	| 'orange'
	| 'green'
	| 'pink'
	| 'yellow'
	| 'purple'
	| 'blue'
	| 'red'
	| 'teal'
	| 'indigo'
	| 'amber'
	| 'rose'
	| 'lime'
	| 'violet'
	| 'charcoal'
	| 'sand'
	| 'taupe'
	| 'terracotta'
	| 'olive'
	| 'ochre'
	| 'mint'
	| 'lavender'
	| 'peach'
	| 'emerald'
	| 'navy'
	| 'burgundy'
	| 'fuchsia'
	| 'electric'
	| 'sulfur'

export type LibraryCardProps = {
	name: string
	icon: ReactNode
	color: LibraryColor
	description: string
	tagline: string
}

export const colorMap = {
	// --- ORIGINAIS ---
	amber: {
		bg: 'bg-tury-amber/5',
		border: 'border-tury-amber/20 hover:border-tury-amber/50',
		dot: 'bg-tury-amber',
		glow: 'shadow-[var(--glow-amber)]',
		text: 'text-tury-amber',
	},
	blue: {
		bg: 'bg-tury-blue/5',
		border: 'border-tury-blue/20 hover:border-tury-blue/50',
		dot: 'bg-tury-blue',
		glow: 'shadow-[var(--glow-blue)]',
		text: 'text-tury-blue',
	},
	burgundy: {
		bg: 'bg-tury-burgundy/5',
		border: 'border-tury-burgundy/20 hover:border-tury-burgundy/50',
		dot: 'bg-tury-burgundy',
		glow: 'shadow-[var(--glow-burgundy)]',
		text: 'text-tury-burgundy',
	},

	// --- NOVAS CORES (TERROSAS, PASTEL E LUXO) ---
	charcoal: {
		bg: 'bg-tury-charcoal/5',
		border: 'border-tury-charcoal/20 hover:border-tury-charcoal/50',
		dot: 'bg-tury-charcoal',
		glow: 'shadow-[var(--glow-charcoal)]',
		text: 'text-tury-charcoal',
	},
	cyan: {
		bg: 'bg-tury-cyan/5',
		border: 'border-tury-cyan/20 hover:border-tury-cyan/50',
		dot: 'bg-tury-cyan',
		glow: 'shadow-[var(--glow-cyan)]',
		text: 'text-tury-cyan',
	},
	electric: {
		bg: 'bg-tury-electric/5',
		border: 'border-tury-electric/20 hover:border-tury-electric/50',
		dot: 'bg-tury-electric',
		glow: 'shadow-[var(--glow-electric)]',
		text: 'text-tury-electric',
	},
	emerald: {
		bg: 'bg-tury-emerald/5',
		border: 'border-tury-emerald/20 hover:border-tury-emerald/50',
		dot: 'bg-tury-emerald',
		glow: 'shadow-[var(--glow-emerald)]',
		text: 'text-tury-emerald',
	},
	fuchsia: {
		bg: 'bg-tury-fuchsia/5',
		border: 'border-tury-fuchsia/20 hover:border-tury-fuchsia/50',
		dot: 'bg-tury-fuchsia',
		glow: 'shadow-[var(--glow-fuchsia)]',
		text: 'text-tury-fuchsia',
	},
	green: {
		bg: 'bg-tury-green/5',
		border: 'border-tury-green/20 hover:border-tury-green/50',
		dot: 'bg-tury-green',
		glow: 'shadow-[var(--glow-green)]',
		text: 'text-tury-green',
	},
	indigo: {
		bg: 'bg-tury-indigo/5',
		border: 'border-tury-indigo/20 hover:border-tury-indigo/50',
		dot: 'bg-tury-indigo',
		glow: 'shadow-[var(--glow-indigo)]',
		text: 'text-tury-indigo',
	},
	lavender: {
		bg: 'bg-tury-lavender/5',
		border: 'border-tury-lavender/20 hover:border-tury-lavender/50',
		dot: 'bg-tury-lavender',
		glow: 'shadow-[var(--glow-lavender)]',
		text: 'text-tury-lavender',
	},
	lime: {
		bg: 'bg-tury-lime/5',
		border: 'border-tury-lime/20 hover:border-tury-lime/50',
		dot: 'bg-tury-lime',
		glow: 'shadow-[var(--glow-lime)]',
		text: 'text-tury-lime',
	},
	mint: {
		bg: 'bg-tury-mint/5',
		border: 'border-tury-mint/20 hover:border-tury-mint/50',
		dot: 'bg-tury-mint',
		glow: 'shadow-[var(--glow-mint)]',
		text: 'text-tury-mint',
	},
	navy: {
		bg: 'bg-tury-navy/5',
		border: 'border-tury-navy/20 hover:border-tury-navy/50',
		dot: 'bg-tury-navy',
		glow: 'shadow-[var(--glow-navy)]',
		text: 'text-tury-navy',
	},
	ochre: {
		bg: 'bg-tury-ochre/5',
		border: 'border-tury-ochre/20 hover:border-tury-ochre/50',
		dot: 'bg-tury-ochre',
		glow: 'shadow-[var(--glow-ochre)]',
		text: 'text-tury-ochre',
	},
	olive: {
		bg: 'bg-tury-olive/5',
		border: 'border-tury-olive/20 hover:border-tury-olive/50',
		dot: 'bg-tury-olive',
		glow: 'shadow-[var(--glow-olive)]',
		text: 'text-tury-olive',
	},
	orange: {
		bg: 'bg-tury-orange/5',
		border: 'border-tury-orange/20 hover:border-tury-orange/50',
		dot: 'bg-tury-orange',
		glow: 'shadow-[var(--glow-orange)]',
		text: 'text-tury-orange',
	},
	peach: {
		bg: 'bg-tury-peach/5',
		border: 'border-tury-peach/20 hover:border-tury-peach/50',
		dot: 'bg-tury-peach',
		glow: 'shadow-[var(--glow-peach)]',
		text: 'text-tury-peach',
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
	red: {
		bg: 'bg-tury-red/5',
		border: 'border-tury-red/20 hover:border-tury-red/50',
		dot: 'bg-tury-red',
		glow: 'shadow-[var(--glow-red)]',
		text: 'text-tury-red',
	},
	rose: {
		bg: 'bg-tury-rose/5',
		border: 'border-tury-rose/20 hover:border-tury-rose/50',
		dot: 'bg-tury-rose',
		glow: 'shadow-[var(--glow-rose)]',
		text: 'text-tury-rose',
	},
	sand: {
		bg: 'bg-tury-sand/5',
		border: 'border-tury-sand/20 hover:border-tury-sand/50',
		dot: 'bg-tury-sand',
		glow: 'shadow-[var(--glow-sand)]',
		text: 'text-tury-sand',
	},
	slate: {
		bg: 'bg-tury-slate/5',
		border: 'border-tury-slate/20 hover:border-tury-slate/50',
		dot: 'bg-tury-slate',
		glow: 'shadow-[var(--glow-slate)]',
		text: 'text-tury-slate',
	},
	sulfur: {
		bg: 'bg-tury-sulfur/5',
		border: 'border-tury-sulfur/20 hover:border-tury-sulfur/50',
		dot: 'bg-tury-sulfur',
		glow: 'shadow-[var(--glow-sulfur)]',
		text: 'text-tury-sulfur',
	},
	taupe: {
		bg: 'bg-tury-taupe/5',
		border: 'border-tury-taupe/20 hover:border-tury-taupe/50',
		dot: 'bg-tury-taupe',
		glow: 'shadow-[var(--glow-taupe)]',
		text: 'text-tury-taupe',
	},
	teal: {
		bg: 'bg-tury-teal/5',
		border: 'border-tury-teal/20 hover:border-tury-teal/50',
		dot: 'bg-tury-teal',
		glow: 'shadow-[var(--glow-teal)]',
		text: 'text-tury-teal',
	},
	terracotta: {
		bg: 'bg-tury-terracotta/5',
		border: 'border-tury-terracotta/20 hover:border-tury-terracotta/50',
		dot: 'bg-tury-terracotta',
		glow: 'shadow-[var(--glow-terracotta)]',
		text: 'text-tury-terracotta',
	},
	violet: {
		bg: 'bg-tury-violet/5',
		border: 'border-tury-violet/20 hover:border-tury-violet/50',
		dot: 'bg-tury-violet',
		glow: 'shadow-[var(--glow-violet)]',
		text: 'text-tury-violet',
	},
	yellow: {
		bg: 'bg-tury-yellow/5',
		border: 'border-tury-yellow/20 hover:border-tury-yellow/50',
		dot: 'bg-tury-yellow',
		glow: 'shadow-[var(--glow-yellow)]',
		text: 'text-tury-yellow',
	},
} as const

export function LibraryCard({
	description,
	tagline,
	name,
	icon,
	color,
}: LibraryCardProps) {
	const c = colorMap[color]
	const npm = useNpmInfo(name)

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
			<p className="mt-2 min-h-[3.75rem] flex-1 text-muted-foreground text-sm leading-relaxed">
				{description}
			</p>
			<div className="mt-6 flex items-center gap-4 border-border border-t pt-4">
				<div className="flex items-center gap-1.5">
					<div className={`h-2 w-2 rounded-full ${c.dot}`} />
					<span className="font-mono text-muted-foreground text-xs">
						{npm.version ?? 'v0.0.0'}
					</span>
				</div>
				<span className="text-muted-foreground text-xs">
					{npm.downloads ?? '0'} downloads/wk
				</span>
			</div>
		</div>
	)
}
