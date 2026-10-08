import {
	Activity,
	Boxes,
	Braces,
	ChartLine,
	CircleAlert,
	ClipboardList,
	Compass,
	Database,
	FileCog,
	FileText,
	Fingerprint,
	FlagTriangleRight,
	HardDrive,
	KeyRound,
	Languages,
	LayoutTemplate,
	Lock,
	Milestone,
	Network,
	Paintbrush,
	Palette,
	Radio,
	Server,
	ServerCog,
	Settings2,
	Shapes,
	Shield,
	ShieldCheck,
	SlidersHorizontal,
	Sparkles,
	SpellCheck,
	Terminal,
	Users,
	Webhook,
	Wrench,
	Zap,
} from 'lucide-react'

export const categories = [
	'CLI',
	'React',
	'NestJS',
	'Frontend Utilities',
	'Backend Utilities',
	'Shared',
	'Skills',
] as const

export const libraries = [
	{
		category: 'React' as const,
		color: 'fuchsia' as const,
		description:
			'Accessible, customizable web UI components with built-in dark mode and full TypeScript support.',
		href: '/libs/react-web' as const,
		icon: <Palette size={20} />,
		name: '@turystack/react-web',
		tagline: 'React Web UI',
	},
	{
		category: 'React' as const,
		color: 'lavender' as const,
		description:
			'Semantic icons with a stable API for web applications, backed by Solar Icons.',
		href: '/libs/react-icons' as const,
		icon: <Sparkles size={20} />,
		name: '@turystack/react-icons',
		tagline: 'React Icons',
	},
	{
		category: 'React' as const,
		color: 'ochre' as const,
		description:
			'Line, area and bar charts plus KPI sparklines, painted with react-web tokens.',
		href: '/libs/react-charts' as const,
		icon: <ChartLine size={20} />,
		name: '@turystack/react-charts',
		tagline: 'React Charts',
	},
	{
		category: 'Backend Utilities' as const,
		color: 'orange' as const,
		description:
			'Class decorator that registers entities with superjson for type-safe serialization across boundaries.',
		href: '/libs/entity' as const,
		icon: <Wrench size={20} />,
		name: '@turystack/entity',
		tagline: 'Entity',
	},
	{
		category: 'Backend Utilities' as const,
		color: 'burgundy' as const,
		description:
			'Type-safe exception classes with stable domain codes, metadata, and explicit HTTP status mapping.',
		href: '/libs/exceptions' as const,
		icon: <CircleAlert size={20} />,
		name: '@turystack/exceptions',
		tagline: 'Exceptions',
	},
	{
		category: 'Backend Utilities' as const,
		color: 'purple' as const,
		description:
			'Orchestrator for distributed compensating transactions with LIFO rollback and structured logging.',
		href: '/libs/saga' as const,
		icon: <Wrench size={20} />,
		name: '@turystack/saga',
		tagline: 'Saga',
	},
	{
		category: 'NestJS' as const,
		color: 'yellow' as const,
		description:
			'Adapter-based caching with superjson serialization, NX/XX set modes, and method-level decorators. Redis adapter built-in.',
		href: '/libs/nestjs-cache' as const,
		icon: <Zap size={20} />,
		name: '@turystack/nestjs-cache',
		tagline: 'NestJS Cache',
	},
	{
		category: 'NestJS' as const,
		color: 'green' as const,
		description:
			'Schema-first typed config: zod-validated process.env at boot with a fully typed get() — no getOrThrow, optionals are | null.',
		href: '/libs/nestjs-config' as const,
		icon: <SlidersHorizontal size={20} />,
		name: '@turystack/nestjs-config',
		tagline: 'NestJS Config',
	},
	{
		category: 'NestJS' as const,
		color: 'blue' as const,
		description:
			'Typed schema builder with per-table repositories and a transactional decorator. Two engines: PostgreSQL through Drizzle, and DynamoDB.',
		href: '/libs/nestjs-database' as const,
		icon: <Database size={20} />,
		name: '@turystack/nestjs-database',
		tagline: 'NestJS Database',
	},
	{
		category: 'NestJS' as const,
		color: 'red' as const,
		description:
			'Distributed locking on pluggable cache adapters (Redis built-in) with configurable TTL, wait timeout, and retry intervals.',
		href: '/libs/nestjs-lock' as const,
		icon: <Lock size={20} />,
		name: '@turystack/nestjs-lock',
		tagline: 'NestJS Lock',
	},
	{
		category: 'NestJS' as const,
		color: 'cyan' as const,
		description:
			'Structured logging with pluggable transport adapters (Pino + Elasticsearch built-in). Extends NestJS ConsoleLogger.',
		href: '/libs/nestjs-logger' as const,
		icon: <FileText size={20} />,
		name: '@turystack/nestjs-logger',
		tagline: 'NestJS Logger',
	},
	{
		category: 'NestJS' as const,
		color: 'mint' as const,
		description:
			'Request-scoped context (correlation id, actor, tenant) propagated across use-cases, events and handlers via AsyncLocalStorage.',
		href: '/libs/nestjs-context' as const,
		icon: <Network size={20} />,
		name: '@turystack/nestjs-context',
		tagline: 'NestJS Context',
	},
	{
		category: 'NestJS' as const,
		color: 'emerald' as const,
		description:
			'Timeout, retry with exponential backoff and circuit breaker decorators for calls that leave the process.',
		href: '/libs/nestjs-resilience' as const,
		icon: <ShieldCheck size={20} />,
		name: '@turystack/nestjs-resilience',
		tagline: 'NestJS Resilience',
	},
	{
		category: 'NestJS' as const,
		color: 'burgundy' as const,
		description:
			'Idempotency keys for repeatable requests and redeliverable events. Replays the first result or skips the repeat.',
		href: '/libs/nestjs-idempotency' as const,
		icon: <Fingerprint size={20} />,
		name: '@turystack/nestjs-idempotency',
		tagline: 'NestJS Idempotency',
	},
	{
		category: 'NestJS' as const,
		color: 'pink' as const,
		description:
			'Events on one EventBridge bus: shared contracts, a publisher for the API, typed handlers for the workers, and the generated SST stack.',
		href: '/libs/nestjs-events' as const,
		icon: <Radio size={20} />,
		name: '@turystack/nestjs-events',
		tagline: 'NestJS Events',
	},
	{
		category: 'NestJS' as const,
		color: 'amber' as const,
		description:
			'Distributed rate limiting on pluggable cache adapters (Redis built-in) with sliding window counter and method-level decorator.',
		href: '/libs/nestjs-rate-limit' as const,
		icon: <Shield size={20} />,
		name: '@turystack/nestjs-rate-limit',
		tagline: 'NestJS Rate Limit',
	},
	{
		category: 'NestJS' as const,
		color: 'teal' as const,
		description:
			'NestJS bootstrap factory with Swagger/OpenAPI, Scalar reference, Zod validation, and response transforms (field projection, blacklist, error messages).',
		href: '/libs/nestjs-server' as const,
		icon: <Server size={20} />,
		name: '@turystack/nestjs-server',
		tagline: 'NestJS Server',
	},
	{
		category: 'NestJS' as const,
		color: 'indigo' as const,
		description:
			'JWT authentication and CASL-based ACL for NestJS with guard decorators and organization/workspace scoping.',
		href: '/libs/nestjs-iam' as const,
		icon: <KeyRound size={20} />,
		name: '@turystack/nestjs-iam',
		tagline: 'NestJS IAM',
	},
	{
		category: 'NestJS' as const,
		color: 'violet' as const,
		description:
			'Context-driven object storage: typed upload contexts, presigned POST policies, temp → commit flow. AWS S3 built-in.',
		href: '/libs/nestjs-storage' as const,
		icon: <HardDrive size={20} />,
		name: '@turystack/nestjs-storage',
		tagline: 'NestJS Storage',
	},
	{
		category: 'NestJS' as const,
		color: 'lime' as const,
		description:
			'Social OAuth identity resolution for Google, Facebook, Microsoft, and Apple with normalized profile output.',
		href: '/libs/nestjs-social-auth' as const,
		icon: <Users size={20} />,
		name: '@turystack/nestjs-social-auth',
		tagline: 'NestJS Social Auth',
	},
	{
		category: 'NestJS' as const,
		color: 'charcoal' as const,
		description:
			'CloudWatch-first metrics via EMF: fire-and-forget counters, gauges, durations, and a @Measure decorator. Local adapter built-in.',
		href: '/libs/nestjs-observability' as const,
		icon: <Activity size={20} />,
		name: '@turystack/nestjs-observability',
		tagline: 'NestJS Observability',
	},
	{
		/**
		 * Shared, not backend.
		 *
		 * The same schema validates the request body and the form that fills it —
		 * that is the whole point of the package, and filing it under Backend
		 * hides it from the half of the readers who need it most.
		 */
		category: 'Shared' as const,
		color: 'navy' as const,
		description:
			'Zod schemas for entity fields — required text, money, dates, uploads and Brazilian documents — one definition behind both the request body and the form.',
		href: '/libs/fields' as const,
		icon: <SpellCheck size={20} />,
		name: '@turystack/fields',
		tagline: 'Fields',
	},
	{
		/**
		 * Shared, not backend.
		 *
		 * The backend parses the query string with these schemas and the
		 * frontend writes it with their serializers — one grammar on both ends.
		 */
		category: 'Shared' as const,
		color: 'sulfur' as const,
		description:
			'Zod schemas for query-string parameters — pagination, sort, ranges, lists, filters — parsed by the API, written by the frontend.',
		href: '/libs/query-dsl' as const,
		icon: <Wrench size={20} />,
		name: '@turystack/query-dsl',
		tagline: 'Query DSL',
	},
	{
		/**
		 * Shared, not frontend.
		 *
		 * The generated SDK runs on fetch alone, so a backend calling another
		 * service uses it exactly as a web app calls its own API.
		 */
		category: 'Shared' as const,
		color: 'terracotta' as const,
		description:
			'Generates a typed, dependency-free SDK from any OpenAPI document — sdk.tag.operation(), in the browser or in Node.',
		href: '/libs/openapi-sdk' as const,
		icon: <Braces size={20} />,
		name: '@turystack/openapi-sdk',
		tagline: 'OpenAPI SDK',
	},
	{
		category: 'React' as const,
		color: 'electric' as const,
		description:
			'Reusable React hooks for state, data, and browser APIs shared by turystack frontends.',
		href: '/libs/react-hooks' as const,
		icon: <Webhook size={20} />,
		name: '@turystack/react-hooks',
		tagline: 'React Hooks',
	},
	{
		category: 'React' as const,
		color: 'sand' as const,
		description:
			'Typed translations for React: a Provider, hooks, and define* helpers.',
		href: '/libs/react-i18n' as const,
		icon: <Languages size={20} />,
		name: '@turystack/react-i18n',
		tagline: 'React i18n',
	},
	{
		category: 'Frontend Utilities' as const,
		color: 'slate' as const,
		description:
			'Shared biome + TypeScript config for web apps — every frontend extends it.',
		href: '/libs/frontend-config' as const,
		icon: <Settings2 size={20} />,
		name: '@turystack/frontend-config',
		tagline: 'Frontend Config',
	},
	{
		category: 'Backend Utilities' as const,
		color: 'olive' as const,
		description:
			'Shared biome + TypeScript config for APIs and handlers — every backend extends it.',
		href: '/libs/backend-config' as const,
		icon: <FileCog size={20} />,
		name: '@turystack/backend-config',
		tagline: 'Backend Config',
	},
	{
		category: 'CLI' as const,
		color: 'emerald' as const,
		description:
			'Builds Turystack monorepos that sign people in on the first run, then grows them by audience and domain.',
		href: '/libs/cli' as const,
		icon: <Terminal size={20} />,
		name: '@turystack/cli',
		tagline: 'Project Scaffolding',
	},
	{
		category: 'Skills' as const,
		color: 'lavender' as const,
		description:
			'Skill that encodes the frontend conventions — SDK boundary, layers, routing, data, and UX law.',
		href: '/libs/frontend-pattern' as const,
		icon: <LayoutTemplate size={20} />,
		name: '@turystack/frontend-pattern',
		tagline: 'Frontend Pattern',
	},
	{
		category: 'Skills' as const,
		color: 'teal' as const,
		description:
			'What exists and how it relates — entities, cardinalities, tenancy and evolution, plus the canonical models the CLI generates literally, IAM first.',
		href: '/libs/modeling' as const,
		icon: <Boxes size={20} />,
		name: '@turystack/modeling',
		tagline: 'Modeling',
	},
	{
		category: 'Skills' as const,
		color: 'slate' as const,
		description:
			'The constitution — topology, layers, contracts, consistency, the cross-stack seams, idempotency and resilience. The law that survives a change of stack.',
		href: '/libs/architecture-pattern' as const,
		icon: <Compass size={20} />,
		name: '@turystack/architecture-pattern',
		tagline: 'Architecture Pattern',
	},
	{
		category: 'Skills' as const,
		color: 'mint' as const,
		description:
			'Skill that encodes the backend conventions — NestJS modules, domain libs, and the monorepo wiring.',
		href: '/libs/backend-pattern' as const,
		icon: <ServerCog size={20} />,
		name: '@turystack/backend-pattern',
		tagline: 'Backend Pattern',
	},
	{
		category: 'Skills' as const,
		color: 'peach' as const,
		description:
			'Skill that encodes how primitive components are written — in the UI kit, or as project-specific primitives.',
		href: '/libs/frontend-primitives-pattern' as const,
		icon: <Shapes size={20} />,
		name: '@turystack/frontend-primitives-pattern',
		tagline: 'Primitives Pattern',
	},
	{
		category: 'Skills' as const,
		color: 'indigo' as const,
		description:
			"The session's entry point: bootstraps a project from its design into its own spec and UI/UX skills, derives the board, then asks whether this session implements, audits or hunts.",
		href: '/libs/harness' as const,
		icon: <Milestone size={20} />,
		name: '@turystack/harness',
		tagline: 'Project Harness',
	},
	{
		category: 'Skills' as const,
		color: 'electric' as const,
		description:
			'The delivery harness: it takes one task, resolves its context, routes to the pattern skills, runs the gate ladder per slice, and closes with an evidence-backed report.',
		href: '/libs/proof-mode' as const,
		icon: <FlagTriangleRight size={20} />,
		name: '@turystack/proof-mode',
		tagline: 'Delivery Harness',
	},
	{
		/**
		 * Filed under Skills, not Backend Utilities.
		 *
		 * Only 24% of its 114 checks come from the backend skill — the rest are
		 * architecture, frontend, primitives, modeling, harness, proof, spec and
		 * uiux laws, including `PROP-*`, `STY-*`, `AXS-*` and `TAB-*`. Someone asking why `story-coverage` went
		 * red would never look for the answer under a backend heading.
		 *
		 * A category is about what the reader is after, not what the artifact is
		 * made of. Skills is where the laws are; this is what executes them.
		 */
		category: 'Skills' as const,
		color: 'sulfur' as const,
		description:
			'The runner behind every `gate:` the skills declare: the proof ladder, 114 structural checks across all nine skills, and a report whose verdict is computed rather than declared.',
		href: '/libs/proof-mode-gates' as const,
		icon: <ShieldCheck size={20} />,
		name: '@turystack/proof-mode-gates',
		tagline: 'Gate Runner',
	},
	{
		category: 'Skills' as const,
		color: 'mint' as const,
		description:
			"Template for a project's own blueprint skill — materialized once as <project>-blueprint: per-domain business rules and modeling as a Mintlify site, plus the continuous board.",
		href: '/libs/blueprint-template' as const,
		icon: <ClipboardList size={20} />,
		name: '@turystack/blueprint-template',
		tagline: 'Project Blueprint',
	},
	{
		category: 'Skills' as const,
		color: 'rose' as const,
		description:
			"Template for a project's own UI/UX skill — materialized once as <project>-uiux: tokens, layout, copy, component mapping and design exports.",
		href: '/libs/uiux-template' as const,
		icon: <Paintbrush size={20} />,
		name: '@turystack/uiux-template',
		tagline: 'Project UI/UX',
	},
]

export type Library = (typeof libraries)[number]
