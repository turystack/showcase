import {
	Activity,
	AlarmClock,
	CircleAlert,
	Cloud,
	Compass,
	Database,
	FileCog,
	FileText,
	Fingerprint,
	HardDrive,
	KeyRound,
	LayoutTemplate,
	Lock,
	Network,
	Palette,
	Radio,
	Server,
	ServerCog,
	Settings2,
	Shapes,
	Shield,
	ShieldCheck,
	SlidersHorizontal,
	Smartphone,
	Sparkles,
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
		color: 'terracotta' as const,
		description:
			'UI components for React Native apps — the same design language as react-web, on mobile.',
		href: '/libs/react-mobile' as const,
		icon: <Smartphone size={20} />,
		name: '@turystack/react-mobile',
		tagline: 'React Mobile UI',
	},
	{
		category: 'React' as const,
		color: 'lavender' as const,
		description:
			'Semantic icons with a stable API shared by web, React Native, and Expo applications.',
		href: '/libs/react-icons' as const,
		icon: <Sparkles size={20} />,
		name: '@turystack/react-icons',
		tagline: 'React Icons',
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
			'Typed schema builder with per-table repositories and transactional decorator. PostgreSQL (Drizzle) built-in.',
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
			'Adapter-based message publishing to topics and queues with superjson serialization. AWS EventBridge/SQS built-in.',
		href: '/libs/nestjs-publisher' as const,
		icon: <Radio size={20} />,
		name: '@turystack/nestjs-publisher',
		tagline: 'NestJS Publisher',
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
		color: 'rose' as const,
		description:
			'Serverless handler wrapper: normalizes any event source (queues, topics, buses, schedules, envelope chains) with Zod validation. AWS built-in.',
		href: '/libs/nestjs-serverless' as const,
		icon: <Cloud size={20} />,
		name: '@turystack/nestjs-serverless',
		tagline: 'NestJS Serverless',
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
		color: 'ochre' as const,
		description:
			'Scheduler abstraction: declare cron jobs as classes with optional distributed lock. Local (in-process) adapter built-in.',
		href: '/libs/nestjs-scheduler' as const,
		icon: <AlarmClock size={20} />,
		name: '@turystack/nestjs-scheduler',
		tagline: 'NestJS Scheduler',
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
		category: 'Backend Utilities' as const,
		color: 'sulfur' as const,
		description:
			'Zod schemas for query-string parameters: pagination, sort, ranges, date ranges, lists, booleans, and filters.',
		href: '/libs/query-dsl' as const,
		icon: <Wrench size={20} />,
		name: '@turystack/query-dsl',
		tagline: 'Query DSL',
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
		category: 'Frontend Utilities' as const,
		color: 'slate' as const,
		description:
			'Shared biome + TypeScript config for web and mobile apps — every frontend extends it.',
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
			'Scaffolds standalone NestJS APIs with Turystack conventions and local-first package links.',
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
]

export type Library = (typeof libraries)[number]
