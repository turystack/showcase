import type { SidebarSection } from '@/components/docs/DocsSidebar'
import { reactHookGroups } from '@/data/react-hooks-docs'
import { audiences } from '@/data/react-web-audiences'
import { componentGroups } from '@/data/react-web-components'
import { hookGroups } from '@/data/react-web-hooks'

export type SearchItem = {
	label: string
	to: string
	library: string
	section: string
}

export const uiSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-web',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Overview',
				to: '/libs/react-web/audiences',
			},
			...audiences.map((audience) => ({
				label: audience.title,
				to: audience.to,
			})),
		],
		title: 'Audiences',
	},
	{
		items: [
			{
				label: 'Overview',
				to: '/libs/react-web/components',
			},
		],
		subsections: componentGroups.map((group) => ({
			items: group.components.map((component) => ({
				label: component.name,
				to: `/libs/react-web/components/${component.slug}`,
			})),
			title: group.title,
		})),
		title: 'Components',
	},
	{
		items: [
			{
				label: 'Overview',
				to: '/libs/react-web/hooks',
			},
		],
		subsections: hookGroups.map((group) => ({
			items: group.hooks.map((hook) => ({
				label: hook.name,
				to: `/libs/react-web/hooks/${hook.slug}`,
			})),
			title: group.title,
		})),
		title: 'Hooks',
	},
]

export const entitySections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/entity',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Entity',
				to: '/libs/entity/entity',
			},
		],
		title: 'Utilities',
	},
]

export const exceptionsSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/exceptions',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Exceptions',
				to: '/libs/exceptions/exceptions',
			},
		],
		title: 'Utilities',
	},
]

export const sagaSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/saga',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Saga',
				to: '/libs/saga/saga',
			},
		],
		title: 'Utilities',
	},
]

export const nestjsConfigSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-config',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'ConfigModule',
				to: '/libs/nestjs-config/config-module',
			},
			{
				label: 'ConfigService',
				to: '/libs/nestjs-config/config-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Schema & Typing',
				to: '/libs/nestjs-config/schema-and-typing',
			},
		],
		title: 'Typing',
	},
]

export const nestjsCacheSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-cache',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'CacheModule',
				to: '/libs/nestjs-cache/cache-module',
			},
			{
				label: 'CacheService',
				to: '/libs/nestjs-cache/cache-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Cache.Get',
				to: '/libs/nestjs-cache/cache-get',
			},
			{
				label: 'Cache.Del',
				to: '/libs/nestjs-cache/cache-del',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsContextSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-context',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'ContextModule',
				to: '/libs/nestjs-context/context-module',
			},
			{
				label: 'ContextService',
				to: '/libs/nestjs-context/context-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'WithContext',
				to: '/libs/nestjs-context/with-context',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsIdempotencySections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-idempotency',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'IdempotencyModule',
				to: '/libs/nestjs-idempotency/idempotency-module',
			},
			{
				label: 'IdempotencyService',
				to: '/libs/nestjs-idempotency/idempotency-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Idempotent',
				to: '/libs/nestjs-idempotency/idempotent-decorator',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsResilienceSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-resilience',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Timeout',
				to: '/libs/nestjs-resilience/timeout',
			},
			{
				label: 'Retry',
				to: '/libs/nestjs-resilience/retry',
			},
			{
				label: 'CircuitBreaker',
				to: '/libs/nestjs-resilience/circuit-breaker',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsDatabaseSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-database',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Schema Definition',
				to: '/libs/nestjs-database/schema-definition',
			},
			{
				label: 'DatabaseModule',
				to: '/libs/nestjs-database/database-module',
			},
			{
				label: 'DatabaseService',
				to: '/libs/nestjs-database/database-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Transactional',
				to: '/libs/nestjs-database/transactional',
			},
			{
				label: 'Audit stamping',
				to: '/libs/nestjs-database/audit',
			},
			{
				label: 'Transaction hooks',
				to: '/libs/nestjs-database/transaction-hooks',
			},
		],
		title: 'Decorators',
	},
	{
		items: [
			{
				label: 'PostgreSQL',
				to: '/libs/nestjs-database/postgresql',
			},
			{
				label: 'DynamoDB',
				to: '/libs/nestjs-database/dynamodb',
			},
		],
		title: 'Adapters',
	},
	{
		items: [
			{
				label: 'Types & Errors',
				to: '/libs/nestjs-database/types-and-errors',
			},
		],
		title: 'Reference',
	},
]

export const nestjsLockSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-lock',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'LockModule',
				to: '/libs/nestjs-lock/lock-module',
			},
			{
				label: 'LockService',
				to: '/libs/nestjs-lock/lock-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Lock',
				to: '/libs/nestjs-lock/lock-decorator',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsLoggerSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-logger',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'LoggerModule',
				to: '/libs/nestjs-logger/logger-module',
			},
			{
				label: 'LoggerService',
				to: '/libs/nestjs-logger/logger-service',
			},
		],
		title: 'Module',
	},
]

export const nestjsObservabilitySections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-observability',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'ObservabilityModule',
				to: '/libs/nestjs-observability/observability-module',
			},
			{
				label: 'MetricsService',
				to: '/libs/nestjs-observability/metrics-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Measure',
				to: '/libs/nestjs-observability/measure-decorator',
			},
			{
				label: 'Tracing',
				to: '/libs/nestjs-observability/tracing',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsRateLimitSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-rate-limit',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'RateLimitModule',
				to: '/libs/nestjs-rate-limit/rate-limit-module',
			},
			{
				label: 'RateLimitService',
				to: '/libs/nestjs-rate-limit/rate-limit-service',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'RateLimit',
				to: '/libs/nestjs-rate-limit/rate-limit-decorator',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsServerSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-server',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Factory',
				to: '/libs/nestjs-server/server-create',
			},
		],
		title: 'Factory',
	},
	{
		items: [
			{
				label: 'Controller',
				to: '/libs/nestjs-server/controller-decorator',
			},
			{
				label: 'Request',
				to: '/libs/nestjs-server/request-decorator',
			},
			{
				label: 'Route',
				to: '/libs/nestjs-server/route-decorator',
			},
		],
		title: 'Decorators',
	},
]

export const nestjsEventsSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-events',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Event contracts',
				to: '/libs/nestjs-events/contracts',
			},
		],
		title: 'Contract',
	},
	{
		items: [
			{
				label: 'Publisher',
				to: '/libs/nestjs-events/publisher',
			},
		],
		title: 'API',
	},
	{
		items: [
			{
				label: 'WorkersModule',
				to: '/libs/nestjs-events/workers-module',
			},
			{
				label: 'Handler',
				to: '/libs/nestjs-events/handler-decorator',
			},
			{
				label: 'Factory',
				to: '/libs/nestjs-events/serverless-create',
			},
		],
		title: 'Workers',
	},
	{
		items: [
			{
				label: 'Infra & CLI',
				to: '/libs/nestjs-events/infra',
			},
		],
		title: 'Deploy',
	},
]

export const nestjsSocialAuthSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-social-auth',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'SocialAuthModule',
				to: '/libs/nestjs-social-auth/social-auth-module',
			},
			{
				label: 'SocialAuthService',
				to: '/libs/nestjs-social-auth/social-auth-service',
			},
		],
		title: 'Module',
	},
]

export const nestjsIamSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-iam',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'IamModule',
				to: '/libs/nestjs-iam/iam-module',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: '@Auth',
				to: '/libs/nestjs-iam/auth-decorator',
			},
			{
				label: '@ACL',
				to: '/libs/nestjs-iam/acl-decorator',
			},
			{
				label: '@Profile',
				to: '/libs/nestjs-iam/authenticated-profile-decorator',
			},
		],
		title: 'Decorators',
	},
	{
		items: [
			{
				label: 'IamAclService',
				to: '/libs/nestjs-iam/acl-service',
			},
			{
				label: 'IamTokenService',
				to: '/libs/nestjs-iam/token-service',
			},
		],
		title: 'Services',
	},
]

export const queryDslSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/query-dsl',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'BooleanSchema',
				to: '/libs/query-dsl/boolean-schema',
			},
			{
				label: 'FilterSchema',
				to: '/libs/query-dsl/filter-schema',
			},
			{
				label: 'ListSchema',
				to: '/libs/query-dsl/list-schema',
			},
		],
		title: 'Schemas',
	},
	{
		items: [
			{
				label: 'RangeSchema',
				to: '/libs/query-dsl/range-schema',
			},
			{
				label: 'DateRangeSchema',
				to: '/libs/query-dsl/date-range-schema',
			},
		],
		title: 'Range',
	},
	{
		items: [
			{
				label: 'Pagination',
				to: '/libs/query-dsl/pagination-schema',
			},
			{
				label: 'SortSchema',
				to: '/libs/query-dsl/sort-schema',
			},
		],
		title: 'Pagination & Sort',
	},
]

export const openapiSdkSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/openapi-sdk',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Config & CLI',
				to: '/libs/openapi-sdk/config',
			},
			{
				label: 'Naming',
				to: '/libs/openapi-sdk/naming',
			},
		],
		title: 'Generate',
	},
	{
		items: [
			{
				label: 'Client',
				to: '/libs/openapi-sdk/client',
			},
		],
		title: 'Use',
	},
]

export const fieldsSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/fields',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Text',
				to: '/libs/fields/text',
			},
			{
				label: 'Identity',
				to: '/libs/fields/identity',
			},
			{
				label: 'Numbers and money',
				to: '/libs/fields/numbers',
			},
			{
				label: 'Dates and time',
				to: '/libs/fields/dates',
			},
			{
				label: 'Booleans and consent',
				to: '/libs/fields/booleans',
			},
			{
				label: 'Files and URLs',
				to: '/libs/fields/files',
			},
			{
				label: 'Collections and identifiers',
				to: '/libs/fields/collections',
			},
		],
		title: 'Fields',
	},
	{
		items: [
			{
				label: 'Cross-field rules',
				to: '/libs/fields/cross-field',
			},
			{
				label: 'Error codes',
				to: '/libs/fields/error-codes',
			},
		],
		title: 'Composition',
	},
	{
		items: [
			{
				label: 'Brazilian documents',
				to: '/libs/fields/brazil',
			},
		],
		title: 'Locale',
	},
]

export const nestjsStorageSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-storage',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'StorageModule',
				to: '/libs/nestjs-storage/storage-module',
			},
			{
				label: 'StorageService',
				to: '/libs/nestjs-storage/storage-service',
			},
		],
		title: 'Module',
	},
]

function flattenSections(
	sections: SidebarSection[],
	library: string,
): SearchItem[] {
	const items: SearchItem[] = []

	for (const section of sections) {
		if (section.items) {
			for (const item of section.items) {
				items.push({
					label: item.label,
					library,
					section: section.title,
					to: item.to,
				})
			}
		}
		if (section.subsections) {
			for (const subsection of section.subsections) {
				for (const item of subsection.items) {
					items.push({
						label: item.label,
						library,
						section: `${section.title} > ${subsection.title}`,
						to: item.to,
					})
				}
			}
		}
	}

	return items
}

export const reactHooksSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-hooks',
			},
		],
		title: 'Getting Started',
	},
	{
		subsections: reactHookGroups.map((group) => ({
			items: group.hooks.map((hook) => ({
				label: hook.name,
				to: `/libs/react-hooks/${hook.slug}`,
			})),
			title: group.title,
		})),
		title: 'Hooks',
	},
]

export const reactI18nSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-i18n',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Base and locales',
				to: '/libs/react-i18n/dictionary',
			},
			{
				label: 'Provider and hooks',
				to: '/libs/react-i18n/provider',
			},
		],
		title: 'Translations',
	},
	{
		items: [
			{
				label: 'The words the components own',
				to: '/libs/react-i18n/ui-labels',
			},
		],
		title: 'UI labels',
	},
	{
		items: [
			{
				label: 'API',
				to: '/libs/react-i18n/api',
			},
		],
		title: 'Reference',
	},
]

export const reactIconsSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-icons',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Playground',
				to: '/libs/react-icons/playground',
			},
		],
		title: 'Icons',
	},
]

export const reactChartsSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-charts',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Chart',
				to: '/libs/react-charts/chart',
			},
			{
				label: 'Sparkline',
				to: '/libs/react-charts/sparkline',
			},
		],
		title: 'Components',
	},
]

export const cliSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/cli',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Stack & Structure',
				to: '/libs/cli/api',
			},
		],
		title: 'API',
	},
]

export const frontendPatternSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/frontend-pattern',
			},
			{
				label: 'Overview',
				to: '/libs/frontend-pattern/00-overview',
			},
			{
				label: 'Project Structure & Ownership',
				to: '/libs/frontend-pattern/01-project-structure',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'API Contract & Server State',
				to: '/libs/frontend-pattern/02-sdk',
			},
			{
				label: 'Features, Components & Client State',
				to: '/libs/frontend-pattern/03-components-client-state',
			},
			{
				label: 'Routes & App Shell',
				to: '/libs/frontend-pattern/04-routes-app-shell',
			},
			{
				label: 'Forms',
				to: '/libs/frontend-pattern/05-forms',
			},
		],
		title: 'Application',
	},
	{
		items: [
			{
				label: 'Tables & Detail Surfaces',
				to: '/libs/frontend-pattern/06-data-surfaces',
			},
			{
				label: 'UI States & Feedback',
				to: '/libs/frontend-pattern/07-ui-states-and-feedback',
			},
			{
				label: 'Accessibility',
				to: '/libs/frontend-pattern/08-accessibility',
			},
			{
				label: 'Content & i18n',
				to: '/libs/frontend-pattern/09-content-i18n',
			},
			{
				label: 'Responsive & Density',
				to: '/libs/frontend-pattern/10-responsive-density',
			},
		],
		title: 'Data & UX',
	},
	{
		items: [
			{
				label: 'Error Handling',
				to: '/libs/frontend-pattern/11-error-handling',
			},
			{
				label: 'Security & Permissions',
				to: '/libs/frontend-pattern/12-security-permissions',
			},
			{
				label: 'Testing',
				to: '/libs/frontend-pattern/13-testing',
			},
			{
				label: 'Telemetry',
				to: '/libs/frontend-pattern/14-telemetry',
			},
			{
				label: 'Performance',
				to: '/libs/frontend-pattern/15-performance',
			},
			{
				label: 'File Uploads',
				to: '/libs/frontend-pattern/16-file-uploads',
			},
		],
		title: 'Quality',
	},
]

export const modelingSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/modeling',
			},
			{
				label: 'The pattern',
				to: '/libs/modeling/01-pattern',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'IAM',
				to: '/libs/modeling/10-model-iam',
			},
			{
				label: 'Billing',
				to: '/libs/modeling/11-model-billing',
			},
			{
				label: 'Notifications',
				to: '/libs/modeling/12-model-notifications',
			},
			{
				label: 'Storage',
				to: '/libs/modeling/13-model-storage',
			},
			{
				label: 'Data Transfer',
				to: '/libs/modeling/14-model-data-transfer',
			},
			{
				label: 'Audit Trail',
				to: '/libs/modeling/15-model-audit-trail',
			},
		],
		title: 'Domain models',
	},
]

export const architecturePatternSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/architecture-pattern',
			},
			{
				label: 'Overview',
				to: '/libs/architecture-pattern/00-overview',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Topology',
				to: '/libs/architecture-pattern/01-topology',
			},
			{
				label: 'Layers & Boundaries',
				to: '/libs/architecture-pattern/02-layers',
			},
			{
				label: 'Contracts',
				to: '/libs/architecture-pattern/03-contracts',
			},
			{
				label: 'Consistency',
				to: '/libs/architecture-pattern/04-consistency',
			},
			{
				label: 'Delivery Boundaries',
				to: '/libs/architecture-pattern/05-delivery',
			},
		],
		title: 'Structure',
	},
	{
		items: [
			{
				label: 'Errors',
				to: '/libs/architecture-pattern/06-errors',
			},
			{
				label: 'Structural Security',
				to: '/libs/architecture-pattern/07-security',
			},
			{
				label: 'Observability',
				to: '/libs/architecture-pattern/08-observability',
			},
			{
				label: 'Idempotency',
				to: '/libs/architecture-pattern/09-idempotency',
			},
			{
				label: 'Resilience',
				to: '/libs/architecture-pattern/10-resilience',
			},
			{
				label: 'Testing',
				to: '/libs/architecture-pattern/11-testing',
			},
			{
				label: 'Data Lifecycle',
				to: '/libs/architecture-pattern/12-data-lifecycle',
			},
		],
		title: 'Cross-cutting',
	},
]

export const backendPatternSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/backend-pattern',
			},
			{
				label: 'Overview',
				to: '/libs/backend-pattern/00-overview',
			},
			{
				label: 'Project Structure & Domain Boundaries',
				to: '/libs/backend-pattern/01-project-structure',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Schemas',
				to: '/libs/backend-pattern/02-schemas',
			},
			{
				label: 'Controllers & Transport Contracts',
				to: '/libs/backend-pattern/03-controllers',
			},
			{
				label: 'Use Cases',
				to: '/libs/backend-pattern/04-use-cases',
			},
			{
				label: 'Repositories & Persistence Policy',
				to: '/libs/backend-pattern/05-repositories',
			},
			{
				label: 'Entities',
				to: '/libs/backend-pattern/06-entities',
			},
		],
		title: 'Domain',
	},
	{
		items: [
			{
				label: 'Adapters',
				to: '/libs/backend-pattern/07-adapters',
			},
			{
				label: 'Background Handlers',
				to: '/libs/backend-pattern/08-background-handlers',
			},
			{
				label: 'Events',
				to: '/libs/backend-pattern/09-events',
			},
		],
		title: 'Integration & Delivery',
	},
	{
		items: [
			{
				label: 'Error Handling',
				to: '/libs/backend-pattern/10-error-handling',
			},
			{
				label: 'Security',
				to: '/libs/backend-pattern/11-security',
			},
			{
				label: 'Testing',
				to: '/libs/backend-pattern/12-testing',
			},
			{
				label: 'Telemetry Policy',
				to: '/libs/backend-pattern/13-telemetry',
			},
			{
				label: 'Resilience',
				to: '/libs/backend-pattern/14-resilience',
			},
			{
				label: 'Idempotency',
				to: '/libs/backend-pattern/15-idempotency',
			},
		],
		title: 'Quality',
	},
]

export const harnessSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/harness',
			},
			{
				label: 'Overview',
				to: '/libs/harness/00-overview',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Entry',
				to: '/libs/harness/01-entry',
			},
			{
				label: 'Design Source',
				to: '/libs/harness/02-design-source',
			},
			{
				label: 'Blueprint Bootstrap',
				to: '/libs/harness/04-blueprint-bootstrap',
			},
			{
				label: 'UI/UX Bootstrap',
				to: '/libs/harness/03-uiux-bootstrap',
			},
			{
				label: 'Board',
				to: '/libs/harness/05-board',
			},
		],
		title: 'Bootstrap',
	},
	{
		items: [
			{
				label: 'Implementation',
				to: '/libs/harness/06-implementation',
			},
			{
				label: 'Routine',
				to: '/libs/harness/07-routine',
			},
		],
		title: 'Every session after',
	},
	{
		items: [
			{
				label: 'The flow',
				to: '/libs/harness/flow',
			},
		],
		title: 'Live',
	},
]

export const proofModeSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/proof-mode',
			},
			{
				label: 'Overview',
				to: '/libs/proof-mode/00-overview',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Context',
				to: '/libs/proof-mode/01-context',
			},
			{
				label: 'Plan',
				to: '/libs/proof-mode/02-plan',
			},
			{
				label: 'Build',
				to: '/libs/proof-mode/03-build',
			},
			{
				label: 'Gates',
				to: '/libs/proof-mode/04-gates',
			},
			{
				label: 'Evidence',
				to: '/libs/proof-mode/05-evidence',
			},
			{
				label: 'Delivery',
				to: '/libs/proof-mode/06-delivery',
			},
		],
		title: 'Sections',
	},
]

export const blueprintTemplateSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/blueprint-template',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Product',
				to: '/libs/blueprint-template/index',
			},
			{
				label: 'Glossary',
				to: '/libs/blueprint-template/glossary',
			},
			{
				label: 'Modeling conventions',
				to: '/libs/blueprint-template/conventions',
			},
			{
				label: 'Entity relationships',
				to: '/libs/blueprint-template/erd',
			},
			{
				label: 'Cross-domain rules',
				to: '/libs/blueprint-template/cross-domain',
			},
		],
		title: 'Product',
	},
	{
		items: [
			{
				label: 'Overview',
				to: '/libs/blueprint-template/domain-overview',
			},
			{
				label: 'Rules',
				to: '/libs/blueprint-template/domain-rules',
			},
			{
				label: 'Model',
				to: '/libs/blueprint-template/domain-model',
			},
			{
				label: 'Events & schedules',
				to: '/libs/blueprint-template/domain-flows',
			},
		],
		title: 'Domain skeleton',
	},
	{
		items: [
			{
				label: 'Product & domains',
				to: '/libs/blueprint-template/guide-domain',
			},
			{
				label: 'Rules',
				to: '/libs/blueprint-template/guide-rules',
			},
			{
				label: 'Model',
				to: '/libs/blueprint-template/guide-model',
			},
			{
				label: 'Events & schedules',
				to: '/libs/blueprint-template/guide-flows',
			},
			{
				label: 'Tasks',
				to: '/libs/blueprint-template/guide-task',
			},
			{
				label: 'Bootstrapping',
				to: '/libs/blueprint-template/guide-filling',
			},
		],
		title: 'Guide',
	},
	{
		items: [
			{
				label: 'Board example',
				to: '/libs/blueprint-template/board',
			},
		],
		title: 'Live',
	},
]

export const uiuxTemplateSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/uiux-template',
			},
			{
				label: 'Overview',
				to: '/libs/uiux-template/00-overview',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Brand',
				to: '/libs/uiux-template/01-brand',
			},
			{
				label: 'Layout',
				to: '/libs/uiux-template/02-layout',
			},
			{
				label: 'Copy',
				to: '/libs/uiux-template/03-copy',
			},
			{
				label: 'Components',
				to: '/libs/uiux-template/04-components',
			},
			{
				label: 'Assets',
				to: '/libs/uiux-template/05-assets',
			},
			{
				label: 'Filling',
				to: '/libs/uiux-template/06-filling',
			},
			{
				label: 'Theme',
				to: '/libs/uiux-template/07-theme',
			},
		],
		title: 'Sections',
	},
	{
		items: [
			{
				label: 'Theme example',
				to: '/libs/uiux-template/theme',
			},
		],
		title: 'Live',
	},
]

export const proofModeGatesSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/proof-mode-gates',
			},
		],
		title: 'Getting Started',
	},
]

export const frontendPrimitivesPatternSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/frontend-primitives-pattern',
			},
			{
				label: 'Overview',
				to: '/libs/frontend-primitives-pattern/00-overview',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Component Structure',
				to: '/libs/frontend-primitives-pattern/01-component-structure',
			},
			{
				label: 'Props',
				to: '/libs/frontend-primitives-pattern/02-props',
			},
			{
				label: 'Styles',
				to: '/libs/frontend-primitives-pattern/03-styles',
			},
			{
				label: 'Composition',
				to: '/libs/frontend-primitives-pattern/04-composition',
			},
		],
		title: 'Writing a primitive',
	},
	{
		items: [
			{
				label: 'Stories',
				to: '/libs/frontend-primitives-pattern/05-stories',
			},
			{
				label: 'Tests',
				to: '/libs/frontend-primitives-pattern/06-tests',
			},
			{
				label: 'Consumption',
				to: '/libs/frontend-primitives-pattern/07-consumption',
			},
			{
				label: 'Accessibility',
				to: '/libs/frontend-primitives-pattern/08-accessibility',
			},
		],
		title: 'Proving & consuming',
	},
]

export const frontendConfigSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/frontend-config',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Biome',
				to: '/libs/frontend-config/biome',
			},
			{
				label: 'TypeScript',
				to: '/libs/frontend-config/typescript',
			},
		],
		title: 'Presets',
	},
]

export const backendConfigSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/backend-config',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Biome',
				to: '/libs/backend-config/biome',
			},
			{
				label: 'TypeScript',
				to: '/libs/backend-config/typescript',
			},
		],
		title: 'Presets',
	},
]

export const allSearchItems: SearchItem[] = [
	...flattenSections(harnessSections, '@turystack/harness'),
	...flattenSections(proofModeSections, '@turystack/proof-mode'),
	...flattenSections(
		blueprintTemplateSections,
		'@turystack/blueprint-template',
	),
	...flattenSections(uiuxTemplateSections, '@turystack/uiux-template'),
	...flattenSections(proofModeGatesSections, '@turystack/proof-mode-gates'),
	...flattenSections(uiSections, '@turystack/react-web'),
	...flattenSections(entitySections, '@turystack/entity'),
	...flattenSections(exceptionsSections, '@turystack/exceptions'),
	...flattenSections(sagaSections, '@turystack/saga'),
	...flattenSections(nestjsConfigSections, '@turystack/nestjs-config'),
	...flattenSections(nestjsCacheSections, '@turystack/nestjs-cache'),
	...flattenSections(nestjsDatabaseSections, '@turystack/nestjs-database'),
	...flattenSections(nestjsLockSections, '@turystack/nestjs-lock'),
	...flattenSections(nestjsLoggerSections, '@turystack/nestjs-logger'),
	...flattenSections(nestjsEventsSections, '@turystack/nestjs-events'),
	...flattenSections(
		nestjsObservabilitySections,
		'@turystack/nestjs-observability',
	),
	...flattenSections(nestjsRateLimitSections, '@turystack/nestjs-rate-limit'),
	...flattenSections(nestjsContextSections, '@turystack/nestjs-context'),
	...flattenSections(nestjsResilienceSections, '@turystack/nestjs-resilience'),
	...flattenSections(
		nestjsIdempotencySections,
		'@turystack/nestjs-idempotency',
	),
	...flattenSections(nestjsServerSections, '@turystack/nestjs-server'),
	...flattenSections(nestjsIamSections, '@turystack/nestjs-iam'),
	...flattenSections(nestjsSocialAuthSections, '@turystack/nestjs-social-auth'),
	...flattenSections(nestjsStorageSections, '@turystack/nestjs-storage'),
	...flattenSections(fieldsSections, '@turystack/fields'),
	...flattenSections(queryDslSections, '@turystack/query-dsl'),
	...flattenSections(openapiSdkSections, '@turystack/openapi-sdk'),
	...flattenSections(reactHooksSections, '@turystack/react-hooks'),
	...flattenSections(reactI18nSections, '@turystack/react-i18n'),
	...flattenSections(reactIconsSections, '@turystack/react-icons'),
	...flattenSections(reactChartsSections, '@turystack/react-charts'),
	...flattenSections(cliSections, '@turystack/cli'),
	...flattenSections(frontendPatternSections, '@turystack/frontend-pattern'),
	...flattenSections(
		architecturePatternSections,
		'@turystack/architecture-pattern',
	),
	...flattenSections(backendPatternSections, '@turystack/backend-pattern'),
	...flattenSections(
		frontendPrimitivesPatternSections,
		'@turystack/frontend-primitives-pattern',
	),
	...flattenSections(frontendConfigSections, '@turystack/frontend-config'),
	...flattenSections(backendConfigSections, '@turystack/backend-config'),
	...flattenSections(modelingSections, '@turystack/modeling'),
]
