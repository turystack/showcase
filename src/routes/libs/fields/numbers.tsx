import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/numbers')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Numbers and money
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Numeric fields that read masked input, refuse to invent a zero, and
					never let a currency amount touch a float.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A blank field is not a zero
				</h2>
				<CodeBlock
					code={`import { NumberSchema } from '@turystack/fields'

z.coerce.number().parse('')     // 0
z.coerce.number().parse('  ')   // 0

NumberSchema().safeParse('')        // required
NumberSchema().safeParse('abc')     // notANumber
NumberSchema().safeParse('1e5')     // notANumber
NumberSchema().parse('1.234,56')    // 1234.56`}
					filename="number.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Money is an integer
				</h2>
				<p className="text-muted-foreground">
					<code>MoneySchema</code> assembles minor units from the digit string,
					so no amount is rounded-lg through binary floating point. Extra
					decimals are rejected rather than rounded-lg, because rounding a price
					the user typed is a decision the server should not make silently.
				</p>
				<CodeBlock
					code={`import { MoneySchema, DecimalSchema } from '@turystack/fields'

Math.round(1.005 * 100)                    // 100 — a cent gone
MoneySchema({ scale: 3 }).parse('1,005')   // 1005

MoneySchema().parse('R$ 1.234,56')         // 123456
MoneySchema().safeParse('10,999')          // tooManyDecimals

// Mirrors numeric(precision, scale): validated here, not at INSERT time
DecimalSchema({ precision: 6, scale: 2 }).parse('1.234,5')   // '1234.50'
DecimalSchema({ precision: 4, scale: 2 }).safeParse('12345') // precisionExceeded`}
					filename="money.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schemas</h2>
				<PropsTable
					props={[
						{
							description:
								'Decimal number. Blank is required, NaN and Infinity are rejected, exponent notation is refused, masked input is understood.',
							name: 'NumberSchema',
							type: '(options?: NumberOptions) => ZodType<number>',
						},
						{
							description:
								'Integer. Rejects a fraction instead of truncating it, and refuses values past MAX_SAFE_INTEGER.',
							name: 'IntSchema',
							type: '(options?) => ZodType<number>',
						},
						{
							description:
								'Positive integer constrained to a step measured from min — a pack sold in sixes accepts 6 and 12, not 8.',
							name: 'QuantitySchema',
							type: '(options?: QuantityOptions) => ZodType<number>',
						},
						{
							description:
								'Percentage that states its scale, so a 0-1 ratio and a 0-100 reading can never be confused. Accepts "45%".',
							name: 'PercentageSchema',
							type: '(options?: PercentageOptions) => ZodType<number>',
						},
						{
							description:
								'Monetary amount returned as an integer in minor units, assembled from digits.',
							name: 'MoneySchema',
							type: '(options?: MoneyOptions) => ZodType<number>',
						},
						{
							description:
								'Fixed-precision decimal returned as a normalized string, mirroring a numeric(p, s) column.',
							name: 'DecimalSchema',
							type: '(options: DecimalOptions) => ZodType<string>',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Which character is the decimal point
				</h2>
				<p className="text-muted-foreground">
					<code>'auto'</code> reads the last of <code>.</code> and{' '}
					<code>,</code> as the decimal separator when both appear. With a
					single dot it is read as the decimal point, so a pt-BR masked field
					that sends <code>'1.234'</code> should be parsed with{' '}
					<code>separator: 'comma'</code>.
				</p>
				<CodeBlock
					code={`import { parseDecimal } from '@turystack/fields'

parseDecimal('R$ 1.234,56', 'auto')  // { sign: '', integer: '1234', fraction: '56' }
parseDecimal('1.234', 'comma')       // { sign: '', integer: '1234', fraction: '' }
parseDecimal('1.234', 'auto')        // { sign: '', integer: '1', fraction: '234' }`}
					filename="separator.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
