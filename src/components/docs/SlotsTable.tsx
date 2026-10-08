import type { PlatformSlot } from '@/data/react-charts-slots'
import { reactWebSlots } from '@/data/react-web-slots'

/**
 * The classes a theme can reach on one component.
 *
 * Props say what a component accepts; slots say what it *paints*. A reader who
 * wants to restyle react-web needs the second list and could not get it from
 * the first — the names live in `tv()` calls in the library's source, and
 * before this table the only way to find one was to open the DOM inspector and
 * read a class list.
 *
 * The names are checked against react-web's source by `check:slots-table`, in
 * both directions: a slot the library dropped and a slot nobody documented are
 * both build failures. Descriptions are the one thing that cannot be derived,
 * so they are the only thing written by hand here.
 */
export function SlotsTable({ slug }: { slug: string }) {
	const slots = reactWebSlots[slug]

	if (!slots || slots.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm">
				This component paints nothing of its own — it renders only context for
				the components below it, so there is no class for a theme to reach.
			</div>
		)
	}

	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-border border-b bg-muted/50">
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Slot
						</th>
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Element
						</th>
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Description
						</th>
					</tr>
				</thead>
				<tbody>
					{slots.map((slot, index) => (
						<tr
							className={
								index < slots.length - 1 ? 'border-border border-b' : ''
							}
							key={slot.name}
						>
							<td className="px-4 py-3 align-top">
								<code className="whitespace-nowrap rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
									.{slot.name}
								</code>
							</td>
							<td className="px-4 py-3 align-top">
								<code className="whitespace-nowrap text-lib text-xs">
									{slot.element}
								</code>
							</td>
							<td className="px-4 py-3 align-top text-muted-foreground">
								{slot.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

/**
 * The heading and the sentence that go above the table.
 *
 * Pulled out so all ninety pages say the same thing about slots, in the same
 * words, without ninety copies of it drifting apart.
 */
export function SlotsSection({ slug }: { slug: string }) {
	return (
		<section className="space-y-3">
			<h2 className="font-display font-semibold text-xl">Slots</h2>
			<p className="max-w-3xl text-muted-foreground text-sm">
				Every element this component paints carries a stable class beside its
				utilities. Target them from your own stylesheet — or from the{' '}
				<strong className="text-foreground">Theme lab</strong> in the header —
				to reskin the component without forking it.
			</p>
			<SlotsTable slug={slug} />
		</section>
	)
}

/**
 * The same table for a library that ships to two platforms.
 *
 * react-charts restyles through one set of slot names: a class on the web, a
 * key of `ChartThemeProvider` on mobile. A dash says the slot does not exist
 * on that platform — the web's hidden caption and tooltip, the `Text` mobile
 * needs because React Native text does not inherit from its view.
 */
export function PlatformSlotsTable({ slots }: { slots: PlatformSlot[] }) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-border border-b bg-muted/50">
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Web class
						</th>
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Mobile key
						</th>
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Element
						</th>
						<th className="px-4 py-3 text-left font-medium text-muted-foreground">
							Description
						</th>
					</tr>
				</thead>
				<tbody>
					{slots.map((slot, index) => (
						<tr
							className={
								index < slots.length - 1 ? 'border-border border-b' : ''
							}
							key={slot.key}
						>
							<td className="px-4 py-3 align-top">
								{slot.className ? (
									<code className="whitespace-nowrap rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
										.{slot.className}
									</code>
								) : (
									<span className="text-muted-foreground">—</span>
								)}
							</td>
							<td className="px-4 py-3 align-top">
								{slot.element.mobile ? (
									<code className="whitespace-nowrap rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
										{slot.key}
									</code>
								) : (
									<span className="text-muted-foreground">—</span>
								)}
							</td>
							<td className="px-4 py-3 align-top">
								<code className="whitespace-nowrap text-lib text-xs">
									{[
										slot.element.web,
										slot.element.mobile,
									]
										.filter(Boolean)
										.join(' · ')}
								</code>
							</td>
							<td className="px-4 py-3 align-top text-muted-foreground">
								{slot.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
