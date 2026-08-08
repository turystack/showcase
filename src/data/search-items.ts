import type { SidebarSection } from '@/components/docs/DocsSidebar'
import { reactHookGroups } from '@/data/react-hooks-docs'
import { reactMobileDocGroups, reactMobileDocs } from '@/data/react-mobile-docs'

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
				label: 'Playground',
				to: '/libs/react-web/playground',
			},
		],
		title: 'Playground',
	},
	{
		items: [
			{
				label: 'Blocks',
				to: '/libs/react-web/blocks',
			},
		],
		title: 'Blocks',
	},
	{
		items: [
			{
				label: 'Provider',
				to: '/libs/react-web/provider',
			},
			{
				label: 'Theme',
				to: '/libs/react-web/theme',
			},
			{
				label: 'ColorScheme',
				to: '/libs/react-web/color-scheme',
			},
			{
				label: 'Layout',
				to: '/libs/react-web/layout',
			},
			{
				label: 'I18n',
				to: '/libs/react-web/i18n',
			},
		],
		title: 'Core',
	},
	{
		subsections: [
			{
				items: [
					{
						label: 'Checkbox',
						to: '/libs/react-web/checkbox',
					},
					{
						label: 'CurrencyInput',
						to: '/libs/react-web/currency-input',
					},
					{
						label: 'DateInput',
						to: '/libs/react-web/date-input',
					},
					{
						label: 'DateRangeInput',
						to: '/libs/react-web/date-range-input',
					},
					{
						label: 'DocumentInput',
						to: '/libs/react-web/document-input',
					},
					{
						label: 'Form',
						to: '/libs/react-web/form',
					},
					{
						label: 'Input',
						to: '/libs/react-web/input',
					},
					{
						label: 'Label',
						to: '/libs/react-web/label',
					},
					{
						label: 'MaskInput',
						to: '/libs/react-web/mask-input',
					},
					{
						label: 'NumberInput',
						to: '/libs/react-web/number-input',
					},
					{
						label: 'OTPInput',
						to: '/libs/react-web/otp-input',
					},
					{
						label: 'PasswordInput',
						to: '/libs/react-web/password-input',
					},
					{
						label: 'PhoneInput',
						to: '/libs/react-web/phone-input',
					},
					{
						label: 'Radio',
						to: '/libs/react-web/radio',
					},
					{
						label: 'Select',
						to: '/libs/react-web/select',
					},
					{
						label: 'Slider',
						to: '/libs/react-web/slider',
					},
					{
						label: 'Switch',
						to: '/libs/react-web/switch',
					},
					{
						label: 'TagsInput',
						to: '/libs/react-web/tags-input',
					},
					{
						label: 'Textarea',
						to: '/libs/react-web/textarea',
					},
					{
						label: 'Uploader',
						to: '/libs/react-web/uploader',
					},
				],
				title: 'Form',
			},
			{
				items: [
					{
						label: 'Accordion',
						to: '/libs/react-web/accordion',
					},
					{
						label: 'Avatar',
						to: '/libs/react-web/avatar',
					},
					{
						label: 'Badge',
						to: '/libs/react-web/badge',
					},
					{
						label: 'Box',
						to: '/libs/react-web/box',
					},
					{
						label: 'Breadcrumb',
						to: '/libs/react-web/breadcrumb',
					},
					{
						label: 'Button',
						to: '/libs/react-web/button',
					},
					{
						label: 'Card',
						to: '/libs/react-web/card',
					},
					{
						label: 'Container',
						to: '/libs/react-web/container',
					},
					{
						label: 'Flex',
						to: '/libs/react-web/flex',
					},
					{
						label: 'Grid',
						to: '/libs/react-web/grid',
					},
					{
						label: 'Separator',
						to: '/libs/react-web/separator',
					},
					{
						label: 'Skeleton',
						to: '/libs/react-web/skeleton',
					},
					{
						label: 'Table',
						to: '/libs/react-web/table',
					},
					{
						label: 'Tabs',
						to: '/libs/react-web/tabs',
					},
					{
						label: 'Typography',
						to: '/libs/react-web/typography',
					},
				],
				title: 'Display',
			},
			{
				items: [
					{
						label: 'Alert',
						to: '/libs/react-web/alert',
					},
					{
						label: 'Confirm',
						to: '/libs/react-web/confirm',
					},
					{
						label: 'Loader',
						to: '/libs/react-web/t-loader',
					},
					{
						label: 'LoadingOverlay',
						to: '/libs/react-web/loading-overlay',
					},
					{
						label: 'Pagination',
						to: '/libs/react-web/pagination',
					},
					{
						label: 'Progress',
						to: '/libs/react-web/progress',
					},
					{
						label: 'Toast',
						to: '/libs/react-web/toast',
					},
				],
				title: 'Feedback',
			},
			{
				items: [
					{
						label: 'DropdownMenu',
						to: '/libs/react-web/dropdown-menu',
					},
					{
						label: 'Modal',
						to: '/libs/react-web/modal',
					},
					{
						label: 'Popover',
						to: '/libs/react-web/popover',
					},
					{
						label: 'Sheet',
						to: '/libs/react-web/sheet',
					},
					{
						label: 'Tooltip',
						to: '/libs/react-web/tooltip',
					},
				],
				title: 'Overlays',
			},
		],
		title: 'Components',
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

export const nestjsPublisherSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-publisher',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'PublisherModule',
				to: '/libs/nestjs-publisher/publisher-module',
			},
			{
				label: 'PublisherService',
				to: '/libs/nestjs-publisher/publisher-service',
			},
			{
				label: 'Outbox',
				to: '/libs/nestjs-publisher/outbox',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Subscriber',
				to: '/libs/nestjs-publisher/subscriber-decorator',
			},
		],
		title: 'Decorators',
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

export const nestjsSchedulerSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-scheduler',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'SchedulerModule',
				to: '/libs/nestjs-scheduler/scheduler-module',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Schedule',
				to: '/libs/nestjs-scheduler/schedule-decorator',
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

export const nestjsServerlessSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/nestjs-serverless',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'ServerlessModule',
				to: '/libs/nestjs-serverless/serverless-module',
			},
			{
				label: 'Factory',
				to: '/libs/nestjs-serverless/serverless-create',
			},
		],
		title: 'Module',
	},
	{
		items: [
			{
				label: 'Handler',
				to: '/libs/nestjs-serverless/handler-decorator',
			},
		],
		title: 'Decorators',
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

export const reactMobileSections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/react-mobile',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Overview',
				to: '/libs/react-mobile/components',
			},
		],
		subsections: reactMobileDocGroups.map((category) => ({
			items: reactMobileDocs
				.filter((component) => component.category === category)
				.map((component) => ({
					label: component.name,
					to: `/libs/react-mobile/components/${component.slug}`,
				})),
			title: category,
		})),
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
		],
		title: 'Quality',
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
		],
		title: 'Quality',
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
	...flattenSections(uiSections, '@turystack/react-web'),
	...flattenSections(entitySections, '@turystack/entity'),
	...flattenSections(exceptionsSections, '@turystack/exceptions'),
	...flattenSections(sagaSections, '@turystack/saga'),
	...flattenSections(nestjsConfigSections, '@turystack/nestjs-config'),
	...flattenSections(nestjsCacheSections, '@turystack/nestjs-cache'),
	...flattenSections(nestjsDatabaseSections, '@turystack/nestjs-database'),
	...flattenSections(nestjsLockSections, '@turystack/nestjs-lock'),
	...flattenSections(nestjsLoggerSections, '@turystack/nestjs-logger'),
	...flattenSections(nestjsPublisherSections, '@turystack/nestjs-publisher'),
	...flattenSections(nestjsSchedulerSections, '@turystack/nestjs-scheduler'),
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
	...flattenSections(nestjsServerlessSections, '@turystack/nestjs-serverless'),
	...flattenSections(nestjsIamSections, '@turystack/nestjs-iam'),
	...flattenSections(nestjsSocialAuthSections, '@turystack/nestjs-social-auth'),
	...flattenSections(nestjsStorageSections, '@turystack/nestjs-storage'),
	...flattenSections(queryDslSections, '@turystack/query-dsl'),
	...flattenSections(reactHooksSections, '@turystack/react-hooks'),
	...flattenSections(reactIconsSections, '@turystack/react-icons'),
	...flattenSections(reactMobileSections, '@turystack/react-mobile'),
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
]
