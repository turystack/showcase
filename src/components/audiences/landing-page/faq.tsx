import {
	Accordion,
	Container,
	Flex,
	Grid,
	Typography,
} from '@turystack/react-web'

import {
	Section,
	SectionHeading,
} from '@/components/audiences/landing-page/section'

/**
 * The objections, answered.
 *
 * - `accordion` — for a long list or long answers: one open at a time, the
 *   first one open, so the section never looks empty on arrival. `size="lg"`
 *   is the marketing scale: base-size questions and answers, roomier rows
 * - `two-column-open` — every answer visible, in two columns. Preferred on a
 *   desktop page with six or fewer short answers: nothing to click to read
 */
export type FaqVariant = 'accordion' | 'two-column-open'

const QUESTIONS = [
	{
		answer:
			'Fourteen days of the Pro plan, with every feature. No card is asked for, and nothing is charged when it ends unless you choose a plan.',
		question: 'How does the free trial work?',
	},
	{
		answer:
			'Yes. Upload a CSV of customers, products and open orders, or connect your store and we bring the last 12 months in.',
		question: 'Can I import from my spreadsheets?',
	},
	{
		answer:
			'PIX, card and boleto. Plans can be paid monthly or once a year, and the yearly price is 20% lower.',
		question: 'Which payment methods do you accept?',
	},
	{
		answer:
			'Any time, from the billing page. You keep access until the end of the period already paid, and can export all your data.',
		question: 'Can I cancel whenever I want?',
	},
	{
		answer:
			'Data is stored in São Paulo, encrypted at rest and in transit, and we follow the LGPD. Business adds SSO and an audit trail.',
		question: 'Where is my data kept?',
	},
	{
		answer:
			'Email on every plan, chat in business hours on Pro, and a named account manager on Business.',
		question: 'What support do I get?',
	},
	{
		answer:
			'Yes. Change plans from the billing page; the difference is prorated to the day, up or down.',
		question: 'Can I change plans later?',
	},
	{
		answer:
			'The major store platforms, marketplaces and business messaging apps out of the box, and an API for anything else.',
		question: 'Which tools does Acme connect to?',
	},
]

function Heading() {
	return (
		<SectionHeading
			description="Anything else? Our team answers in under a business day."
			eyebrow="FAQ"
			title="Questions before you start"
		/>
	)
}

export function Faq({ id, variant }: { id?: string; variant: FaqVariant }) {
	if (variant === 'two-column-open') {
		return (
			<Section id={id}>
				<Flex
					direction="col"
					gap="xl"
				>
					<Heading />
					<Grid
						cols={{
							base: 1,
							md: 2,
						}}
						gap="xl"
					>
						{QUESTIONS.slice(0, 6).map(({ answer, question }) => (
							<Flex
								direction="col"
								gap="sm"
								key={question}
							>
								<Typography
									component="h3"
									size="lg"
									weight="semibold"
								>
									{question}
								</Typography>
								<Typography
									component="p"
									variant="muted"
								>
									{answer}
								</Typography>
							</Flex>
						))}
					</Grid>
				</Flex>
			</Section>
		)
	}

	return (
		<Section id={id}>
			<Flex
				direction="col"
				gap="xl"
			>
				<Heading />
				<Container maxWidth="md">
					<Accordion
						collapsible
						defaultValue={QUESTIONS[0]?.question}
						size="lg"
						type="single"
					>
						{QUESTIONS.map(({ answer, question }) => (
							<Accordion.Item
								key={question}
								value={question}
							>
								<Accordion.Trigger>{question}</Accordion.Trigger>
								<Accordion.Content>
									<Typography
										component="p"
										variant="muted"
									>
										{answer}
									</Typography>
								</Accordion.Content>
							</Accordion.Item>
						))}
					</Accordion>
				</Container>
			</Flex>
		</Section>
	)
}
