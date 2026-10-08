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

const harnessModules = import.meta.glob('../../../harness-skill/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
}) as Record<string, string>

const modelingModules = import.meta.glob('../../../modeling-skill/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
}) as Record<string, string>

const proofModeModules = import.meta.glob('../../../proof-mode-skill/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
}) as Record<string, string>

/**
 * The blueprint is a Mintlify project, so its pages nest: product pages at the
 * root, the domain skeleton under `domains/_domain/` and the writing guide under
 * `guide/`. `example/` is deliberately outside the glob — it is a filled acme
 * blueprint, shown through the board page, not a section of the template.
 */
const BLUEPRINT_ROOT = '../../../blueprint-template-skill/'

const blueprintTemplateModules = import.meta.glob(
	[
		'../../../blueprint-template-skill/*.md',
		'../../../blueprint-template-skill/guide/*.md',
		'../../../blueprint-template-skill/domains/_domain/*.md',
	],
	{
		eager: true,
		import: 'default',
		query: '?raw',
	},
) as Record<string, string>

const uiuxTemplateModules = import.meta.glob(
	'../../../uiux-template-skill/*.md',
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
	'12-data-lifecycle': 'Data Lifecycle',
	SKILL: 'How to use',
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
	'14-resilience': 'Resilience',
	'15-idempotency': 'Idempotency',
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
	'15-performance': 'Performance',
	'16-file-uploads': 'File Uploads',
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
	'08-accessibility': 'Accessibility',
	SKILL: 'How to use',
}

const HARNESS_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-entry': 'Entry',
	'02-design-source': 'Design Source',
	'03-uiux-bootstrap': 'UI/UX Bootstrap',
	'04-blueprint-bootstrap': 'Blueprint Bootstrap',
	'05-board': 'Board',
	'06-implementation': 'Implementation',
	'07-routine': 'Routine',
	SKILL: 'How to use',
}

const DELIVERY_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-context': 'Context',
	'02-plan': 'Plan',
	'03-build': 'Build',
	'04-gates': 'Gates',
	'05-evidence': 'Evidence',
	'06-delivery': 'Delivery',
	SKILL: 'How to use',
}

const MODELING_TITLES: Record<string, string> = {
	'01-pattern': 'The pattern',
	'10-model-iam': 'Model · IAM',
	'11-model-billing': 'Model · Billing',
	'12-model-notifications': 'Model · Notifications',
	'13-model-storage': 'Model · Storage',
	'14-model-data-transfer': 'Model · Data Transfer',
	'15-model-audit-trail': 'Model · Audit Trail',
	SKILL: 'How to use',
}

const BLUEPRINT_TEMPLATE_TITLES: Record<string, string> = {
	conventions: 'Modeling conventions',
	'cross-domain': 'Cross-domain rules',
	'domain-flows': 'Domain · Events & schedules',
	'domain-model': 'Domain · Model',
	'domain-overview': 'Domain · Overview',
	'domain-rules': 'Domain · Rules',
	erd: 'Entity relationships',
	glossary: 'Glossary',
	'guide-domain': 'Guide · Product & domains',
	'guide-filling': 'Guide · Bootstrapping',
	'guide-flows': 'Guide · Events & schedules',
	'guide-model': 'Guide · Model',
	'guide-rules': 'Guide · Rules',
	'guide-task': 'Guide · Tasks',
	index: 'Product',
	SKILL: 'How to use',
}

const UIUX_TEMPLATE_TITLES: Record<string, string> = {
	'00-overview': 'Overview',
	'01-brand': 'Brand',
	'02-layout': 'Layout',
	'03-copy': 'Copy',
	'04-components': 'Components',
	'05-assets': 'Assets',
	'06-filling': 'Filling',
	'07-theme': 'Theme',
	SKILL: 'How to use',
}

/**
 * The start-here comments a materialized skill ships with.
 *
 * They are instructions for whoever just ran `turystack skills`, addressed to a
 * project that does not exist here — and a markdown renderer ends an HTML block
 * at the first blank line, so what reached this page was the comment's contents
 * as prose, above the section's own title.
 *
 * The blueprint is a Mintlify project and writes the same block as an MDX
 * comment, `{/* turystack:howto … *\/}`, which markdown does not hide at all.
 *
 * `turystack:unfilled` markers are deliberately left in: the skills document
 * that mechanism inside fenced blocks, and stripping by pattern would delete
 * the documentation along with the marker.
 */
function stripHowto(content: string): string {
	return content
		.replace(/[^\S\n]*<!--\s*turystack:howto[\s\S]*?-->\n?/g, '')
		.replace(/[^\S\n]*\{\/\*\s*turystack:howto[\s\S]*?\*\/\}\n?/g, '')
}

/**
 * The MDX form of the unfilled marker, `{/* turystack:unfilled *\/}`.
 *
 * An HTML comment never reached the page, so the old marker was invisible here
 * as it is in a materialized skill; the MDX one renders as literal braces above
 * the "Not filled in" note that already says what it means. Only a marker on a
 * line of its own outside a fence goes — the guide shows it inside fenced
 * blocks, and that is the documentation of the mechanism, not an instance of it.
 */
function stripMdxUnfilled(content: string): string {
	let fenced = false

	return content
		.split('\n')
		.filter((line) => {
			if (/^\s*(```|~~~)/.test(line)) {
				fenced = !fenced
				return true
			}
			return fenced || line.trim() !== '{/* turystack:unfilled */}'
		})
		.join('\n')
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

/** A flat skill: the slug is the file name. */
function fileSlug(path: string): string {
	return (path.split('/').at(-1) ?? '').replace('.md', '')
}

/**
 * A nested skill: the slug is the path inside the skill, flattened to one URL
 * segment — `guide/task.md` → `guide-task`. The template's domain skeleton,
 * `domains/_domain/`, reads as `domain-` (`domain-rules`): the underscore marks
 * a folder that is never a real domain, which is noise in a URL.
 */
function blueprintSlug(path: string): string {
	return path
		.slice(BLUEPRINT_ROOT.length)
		.replace(/\.md$/, '')
		.replace(/^domains\/_domain\//, 'domain/')
		.replaceAll('/', '-')
}

/**
 * A skill page as this site renders it: no frontmatter, no start-here comments,
 * no MDX markers. Exported for pages that render a skill file outside a section
 * list — the blueprint's generated board — so they cannot drift from it.
 */
export function prepareSkillMarkdown(content: string): string {
	return stripMdxUnfilled(stripHowto(stripFrontmatter(content)))
}

/**
 * A Mintlify page takes its heading from the frontmatter `title`, so the
 * blueprint's pages — the domain skeleton above all — may have no `#` line of
 * their own, and once the frontmatter is stripped they rendered headless. The
 * site's title for the section stands in: the frontmatter one is written for a
 * filled project ("Domain name"), not for the template shown here.
 */
function withHeading(content: string, title: string): string {
	return /^# /m.test(content) ? content : `# ${title}\n\n${content}`
}

function buildDocs(
	modules: Record<string, string>,
	titles: Record<string, string>,
	slugOf: (path: string) => string = fileSlug,
	headed = false,
): SkillDoc[] {
	return (
		Object.entries(modules)
			// README is a repository index, not a section. It is dropped before the
			// title lookup, not after: the lookup throws, so filtering later meant
			// every skill exploded on a file that was never going to be rendered.
			.filter(([path]) => !path.endsWith('/README.md'))
			.map(([path, content]) => {
				const slug = slugOf(path)
				const title = titles[slug]

				// A section shipped by a skill and missing from this map used to render
				// with its raw slug as the heading — the site stayed up and quietly said
				// "12-data-lifecycle" where a title belonged. Failing the build is what
				// makes a new section impossible to publish half-way.
				if (!title) {
					throw new Error(
						`skill-docs: no title for '${slug}' (${path}). Add it to the title map before shipping the section.`,
					)
				}

				return {
					content: headed
						? withHeading(prepareSkillMarkdown(content), title)
						: prepareSkillMarkdown(content),
					slug,
					title,
				}
			})
			.sort((a, b) => a.slug.localeCompare(b.slug))
	)
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

export const harnessDocs: SkillDoc[] = buildDocs(harnessModules, HARNESS_TITLES)

export const proofModeDocs: SkillDoc[] = buildDocs(
	proofModeModules,
	DELIVERY_TITLES,
)

export const blueprintTemplateDocs: SkillDoc[] = buildDocs(
	blueprintTemplateModules,
	BLUEPRINT_TEMPLATE_TITLES,
	blueprintSlug,
	true,
)

export const uiuxTemplateDocs: SkillDoc[] = buildDocs(
	uiuxTemplateModules,
	UIUX_TEMPLATE_TITLES,
)

export const modelingDocs: SkillDoc[] = buildDocs(
	modelingModules,
	MODELING_TITLES,
)

export const getHarnessDoc = (slug: string): SkillDoc | undefined =>
	harnessDocs.find((doc) => doc.slug === slug)

export const getProofModeDoc = (slug: string): SkillDoc | undefined =>
	proofModeDocs.find((doc) => doc.slug === slug)

export const getBlueprintTemplateDoc = (slug: string): SkillDoc | undefined =>
	blueprintTemplateDocs.find((doc) => doc.slug === slug)

export const getUiuxTemplateDoc = (slug: string): SkillDoc | undefined =>
	uiuxTemplateDocs.find((doc) => doc.slug === slug)

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

export const getModelingDoc = (slug: string): SkillDoc | undefined =>
	modelingDocs.find((doc) => doc.slug === slug)
