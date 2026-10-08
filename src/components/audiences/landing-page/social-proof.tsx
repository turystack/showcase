import {
	AtomIcon,
	CompassIcon,
	LayersIcon,
	LeafIcon,
	MessageSquareIcon,
	SendIcon,
	SunIcon,
	WavesIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Card,
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
 * Why to believe it.
 *
 * - `logos` — six monochrome customer marks under one line of context, right
 *   below the hero
 * - `featured` — one long quote, large, with the person and their company
 * - `testimonials` — three short quotes in cards, each with a face, a name and
 *   a role
 *
 * The customer marks are not artwork: they are a react-icons glyph beside a
 * wordmark, set in the muted text colour so none shouts louder than another.
 */
export type SocialProofVariant = 'logos' | 'featured' | 'testimonials'

const CUSTOMERS = [
	{
		icon: CompassIcon,
		name: 'Northwind',
	},
	{
		icon: LayersIcon,
		name: 'Vertex',
	},
	{
		icon: SunIcon,
		name: 'Lumen',
	},
	{
		icon: AtomIcon,
		name: 'Orbital',
	},
	{
		icon: LeafIcon,
		name: 'Pinecrest',
	},
	{
		icon: SendIcon,
		name: 'Kestrel',
	},
]

function Logos() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<Typography
				align="center"
				component="p"
				size="sm"
				variant="muted"
			>
				Trusted by 2.000+ operations teams across Brazil
			</Typography>
			<Flex
				align="center"
				gap="xl"
				justify="between"
				wrap="wrap"
			>
				{CUSTOMERS.map(({ icon: Icon, name }) => (
					<Typography
						component="div"
						key={name}
						size="xl"
						variant="muted"
						weight="semibold"
					>
						<Flex
							align="center"
							gap="sm"
						>
							<Icon size={22} />
							{name}
						</Flex>
					</Typography>
				))}
			</Flex>
		</Flex>
	)
}

function Person({
	initials,
	jobTitle,
	name,
}: {
	initials: string
	jobTitle: string
	name: string
}) {
	return (
		<Flex
			align="center"
			gap="sm"
		>
			<Avatar>{initials}</Avatar>
			<Flex direction="col">
				<Typography
					size="sm"
					weight="semibold"
				>
					{name}
				</Typography>
				<Typography
					size="sm"
					variant="muted"
				>
					{jobTitle}
				</Typography>
			</Flex>
		</Flex>
	)
}

function Featured() {
	return (
		<Container maxWidth="md">
			<Flex
				align="center"
				direction="col"
				gap="lg"
			>
				<Typography
					component="div"
					size="xl"
					variant="muted"
					weight="semibold"
				>
					<Flex
						align="center"
						gap="sm"
					>
						<WavesIcon size={22} />
						Cascade
					</Flex>
				</Typography>
				<Typography
					align="center"
					component="p"
					size="3xl"
					weight="medium"
				>
					“We closed the month in two days instead of eight. Orders, invoices
					and the numbers finally live in the same place.”
				</Typography>
				<Person
					initials="CF"
					jobTitle="Head of Operations, Cascade"
					name="Camila Ferreira"
				/>
			</Flex>
		</Container>
	)
}

const TESTIMONIALS = [
	{
		initials: 'RL',
		name: 'Rafael Lima',
		quote:
			'Our three sales channels used to mean three spreadsheets. Now it is one queue, and stock stopped going negative.',
		role: 'COO, Northwind',
	},
	{
		initials: 'JP',
		name: 'Júlia Prado',
		quote:
			'Overdue invoices dropped by a third in the first quarter, and nobody on the team sends reminders by hand anymore.',
		role: 'Finance Lead, Lumen',
	},
	{
		initials: 'TN',
		name: 'Thiago Nunes',
		quote:
			'The audit trail sold it to our accountant. Every price change has a name and a time next to it.',
		role: 'Founder, Kestrel',
	},
]

function Testimonials() {
	return (
		<Flex
			direction="col"
			gap="xl"
		>
			<SectionHeading
				description="Teams that moved their operation to Acme, in their own words."
				eyebrow="Customers"
				title="Less copying, more closing"
			/>
			<Grid
				cols={{
					base: 1,
					md: 3,
				}}
				gap="lg"
			>
				{TESTIMONIALS.map((testimonial) => (
					<Card key={testimonial.name}>
						<Card.Content>
							<Flex
								direction="col"
								gap="md"
							>
								<Typography
									component="div"
									variant="muted"
								>
									<MessageSquareIcon size={20} />
								</Typography>
								<Typography component="p">{testimonial.quote}</Typography>
							</Flex>
						</Card.Content>
						<Card.Footer>
							<Person
								initials={testimonial.initials}
								jobTitle={testimonial.role}
								name={testimonial.name}
							/>
						</Card.Footer>
					</Card>
				))}
			</Grid>
		</Flex>
	)
}

export function SocialProof({
	id,
	variant,
}: {
	id?: string
	variant: SocialProofVariant
}) {
	if (variant === 'logos') {
		return (
			<Section
				id={id}
				spacing="md"
			>
				<Logos />
			</Section>
		)
	}

	return (
		<Section id={id}>
			{variant === 'featured' ? <Featured /> : <Testimonials />}
		</Section>
	)
}
