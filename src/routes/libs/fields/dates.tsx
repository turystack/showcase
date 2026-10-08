import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/dates')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Dates and time
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A calendar date is not an instant. Keeping the two apart is what
					removes the off-by-one-day bug for good.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The day that moves
				</h2>
				<p className="text-muted-foreground">
					<code>z.coerce.date()</code> turns <code>'2026-01-01'</code> into
					midnight UTC, which is 31 December in São Paulo. The birth date the
					user typed comes back a day earlier the moment it is formatted.
				</p>
				<CodeBlock
					code={`import { DateOnlySchema } from '@turystack/fields'

new Date('2026-01-01').toLocaleDateString('en-CA', {
  timeZone: 'America/Sao_Paulo',
})                                        // '2025-12-31'

DateOnlySchema().parse('2026-01-01')      // '2026-01-01'
DateOnlySchema().parse('28/02/2026')      // '2026-02-28'
DateOnlySchema().safeParse('2026-02-30')  // invalidDate`}
					filename="date-only.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The last line matters on its own: <code>new Date('2026-02-30')</code>{' '}
					does not throw, it rolls over to 2 March.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schemas</h2>
				<PropsTable
					props={[
						{
							description:
								'Calendar date held as YYYY-MM-DD, never as a Date. Accepts ISO, DD/MM/YYYY and Date, and rejects dates the calendar does not have.',
							name: 'DateOnlySchema',
							type: '(options?: DateOnlyOptions) => ZodType<string>',
						},
						{
							description:
								'Birth date with an age range measured in full years, so a birthday later this year does not count.',
							name: 'BirthDateSchema',
							type: '(options?: BirthDateOptions) => ZodType<string>',
						},
						{
							description:
								'Instant returned as a Date. Refuses an ISO string with no offset, which means a different moment in every zone.',
							name: 'DateTimeSchema',
							type: '(options?: DateTimeOptions) => ZodType<Date>',
						},
						{
							description:
								'Time of day as HH:mm with real hour and minute ranges — a loose regex accepts 25:99.',
							name: 'TimeSchema',
							type: '(options?: TimeOptions) => ZodType<string>',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The clock is injectable
				</h2>
				<p className="text-muted-foreground">
					Every relative rule reads <code>now</code> and <code>timeZone</code>{' '}
					from options. Without that, a test written against{' '}
					<code>new Date()</code> starts failing on a birthday.
				</p>
				<CodeBlock
					code={`import { BirthDateSchema, DateTimeSchema } from '@turystack/fields'

const now = () => new Date('2026-08-18T12:00:00Z')

BirthDateSchema({ minAge: 18, now }).safeParse('2008-08-19')  // ageTooLow
BirthDateSchema({ minAge: 18, now }).parse('2008-08-18')      // exactly 18 today

DateTimeSchema().safeParse('2026-01-01T10:00:00')       // missingTimezone
DateTimeSchema().parse('2026-01-01T10:00:00-03:00')     // Date`}
					filename="clock.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Civil date helpers
				</h2>
				<p className="text-muted-foreground">
					The date arithmetic is exported on its own, for the places a schema is
					not what you need.
				</p>
				<CodeBlock
					code={`import {
  civilOf,
  compareCivil,
  formatCivil,
  fullYearsBetween,
  isRealDate,
  parseCivil,
} from '@turystack/fields'

civilOf(new Date('2026-01-01T00:00:00Z'), 'America/Sao_Paulo')
// { year: 2025, month: 12, day: 31 }`}
					filename="civil.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
