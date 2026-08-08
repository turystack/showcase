const architectureModules = import.meta.glob(
	'../../../architecture-pattern-skill/*.md',
	{
		eager: true,
		import: 'default',
		query: '?raw',
	},
) as Record<string, string>

const backendModules = import.meta.glob('../../../backend-pattern-skill/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
}) as Record<string, string>

const frontendPrimitivesModules = import.meta.glob(
	'../../../frontend-primitives-pattern-skill/*.md',
	{
		eager: true,
		import: 'default',
		query: '?raw',
	},
) as Record<string, string>

const frontendPatternModules = import.meta.glob(
	'../../../frontend-pattern-skill/*.md',
	{
		eager: true,
		import: 'default',
		query: '?raw',
	},
) as Record<string, string>

export type SkillDoc = {
	content: string
	slug: string
	title: string
}

const ARCHITECTURE_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-topology': 'Topology',
	'02-layers': 'Layers & Boundaries',
	'03-contracts': 'Contracts',
	'04-consistency': 'Consistency',
	'05-delivery': 'Delivery Boundaries',
	'06-errors': 'Errors',
	'07-security': 'Structural Security',
	'08-observability': 'Observability',
	'09-idempotency': 'Idempotency',
	'10-resilience': 'Resilience',
	'11-testing': 'Testing',
}

const BACKEND_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-project-structure': 'Project Structure & Domain Boundaries',
	'02-schemas': 'Schemas',
	'03-controllers': 'Controllers & Transport Contracts',
	'04-use-cases': 'Use Cases',
	'05-repositories': 'Repositories & Persistence Policy',
	'06-entities': 'Entities',
	'07-adapters': 'Adapters',
	'08-background-handlers': 'Background Handlers',
	'09-events': 'Events',
	'10-error-handling': 'Error Handling',
	'11-security': 'Security',
	'12-testing': 'Testing',
	'13-telemetry': 'Telemetry Policy',
	SKILL: 'How to use',
}

const FRONTEND_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-project-structure': 'Project Structure & Ownership',
	'02-sdk': 'API Contract & Server State',
	'03-components-client-state': 'Features, Components & Client State',
	'04-routes-app-shell': 'Routes & App Shell',
	'05-forms': 'Forms',
	'06-data-surfaces': 'Tables & Detail Surfaces',
	'07-ui-states-and-feedback': 'UI States & Feedback',
	'08-accessibility': 'Accessibility',
	'09-content-i18n': 'Content & i18n',
	'10-responsive-density': 'Responsive & Density',
	'11-error-handling': 'Error Handling',
	'12-security-permissions': 'Security & Permissions',
	'13-testing': 'Testing',
	'14-telemetry': 'Telemetry',
	SKILL: 'How to use',
}

const PRIMITIVES_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-component-structure': 'Component Structure',
	'02-props': 'Props',
	'03-styles': 'Styles',
	'04-composition': 'Composition',
	'05-stories': 'Stories',
	'06-tests': 'Tests',
	'07-consumption': 'Consumption',
	SKILL: 'How to use',
}

function stripFrontmatter(content: string): string {
	if (!content.startsWith('---')) {
		return content
	}
	const end = content.indexOf('\n---', 3)
	if (end === -1) {
		return content
	}
	return content.slice(end + 4).trimStart()
}

function buildDocs(
	modules: Record<string, string>,
	titles: Record<string, string>,
): SkillDoc[] {
	return Object.entries(modules)
		.map(([path, content]) => {
			const slug = (path.split('/').at(-1) ?? '').replace('.md', '')
			return {
				content: stripFrontmatter(content),
				slug,
				title: titles[slug] ?? slug,
			}
		})
		.filter((doc) => doc.slug !== 'README')
		.sort((a, b) => a.slug.localeCompare(b.slug))
}

export const architecturePatternDocs: SkillDoc[] = buildDocs(
	architectureModules,
	ARCHITECTURE_TITLES,
)

export const backendPatternDocs: SkillDoc[] = buildDocs(
	backendModules,
	BACKEND_TITLES,
)

export const frontendPrimitivesPatternDocs: SkillDoc[] = buildDocs(
	frontendPrimitivesModules,
	PRIMITIVES_TITLES,
)

export const frontendPatternDocs: SkillDoc[] = buildDocs(
	frontendPatternModules,
	FRONTEND_TITLES,
)

export const getArchitecturePatternDoc = (slug: string): SkillDoc | undefined =>
	architecturePatternDocs.find((doc) => doc.slug === slug)

export const getBackendPatternDoc = (slug: string): SkillDoc | undefined =>
	backendPatternDocs.find((doc) => doc.slug === slug)

export const getFrontendPatternDoc = (slug: string): SkillDoc | undefined =>
	frontendPatternDocs.find((doc) => doc.slug === slug)

export const getFrontendPrimitivesPatternDoc = (
	slug: string,
): SkillDoc | undefined =>
	frontendPrimitivesPatternDocs.find((doc) => doc.slug === slug)
