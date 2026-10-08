import { createFileRoute } from '@tanstack/react-router'
import {
	CheckIcon,
	GitHubColorIcon,
	GitHubIcon,
	GoogleColorIcon,
	GoogleIcon,
	SearchIcon,
} from '@turystack/react-icons'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/react-icons/')({
	component: Page,
})

type Row = {
	cells: string[]
	name: string
}

/**
 * The house table from react-i18n's API page: a first column of names, the
 * rest plain text. Only used where PropsTable's four fixed columns do not fit.
 */
function Table({ head, rows }: { head: string[]; rows: Row[] }) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-border border-b bg-muted/50">
						{head.map((label) => (
							<th
								className="px-4 py-3 text-left font-medium text-muted-foreground"
								key={label}
							>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr
							className={
								index < rows.length - 1 ? 'border-border border-b' : ''
							}
							key={row.name}
						>
							<td className="px-4 py-3 align-top">
								<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
									{row.name}
								</code>
							</td>
							{head.slice(1).map((label, column) => (
								<td
									className="px-4 py-3 align-top text-muted-foreground"
									key={label}
								>
									{row.cells[column]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function Code({ children }: { children: string }) {
	return <code className="rounded bg-muted px-1 py-0.5">{children}</code>
}

const ENTRY_POINTS: Row[] = [
	{
		cells: [
			'Web build; the react-native condition picks the mobile one',
		],
		name: '@turystack/react-icons',
	},
	{
		cells: [
			'Web build, always',
		],
		name: '@turystack/react-icons/web',
	},
	{
		cells: [
			'React Native build, always',
		],
		name: '@turystack/react-icons/mobile',
	},
	{
		cells: [
			'Icon list for pickers; renders nothing',
		],
		name: '@turystack/react-icons/manifest',
	},
]

const PEERS: Row[] = [
	{
		cells: [
			'>= 19',
			'Required',
			'Both',
		],
		name: 'react',
	},
	{
		cells: [
			'>= 0.72',
			'Optional',
			'React Native',
		],
		name: 'react-native',
	},
	{
		cells: [
			'>= 13',
			'Optional',
			'React Native (required there)',
		],
		name: 'react-native-svg',
	},
]

const DEFAULTS: Row[] = [
	{
		cells: [
			'1em (Solar) · 24 (glyphs, brands)',
			'24',
		],
		name: 'size',
	},
	{
		cells: [
			'currentColor',
			'currentColor',
		],
		name: 'color',
	},
	{
		cells: [
			'false',
			'false',
		],
		name: 'mirrored',
	},
	{
		cells: [
			'data-testid="icon-search"',
			'testID="icon-search"',
		],
		name: 'test id',
	},
]

const SOURCES: Row[] = [
	{
		cells: [
			'68',
			'DeleteIcon, SearchIcon, LoadingIcon',
			'Named for the job; artwork may change',
		],
		name: 'semantic',
	},
	{
		cells: [
			'491',
			'TrashIcon, Trash2Icon, XIcon',
			'lucide-react name + Icon, drawn by Solar',
		],
		name: 'lucide',
	},
	{
		cells: [
			'58',
			'GoogleIcon, GoogleColorIcon',
			'29 marks, each in two variants',
		],
		name: 'brand',
	},
]

const DRAWING: Row[] = [
	{
		cells: [
			'Every other semantic and lucide name',
		],
		name: 'Solar Outline',
	},
	{
		cells: [
			'HeartFilledIcon, StarFilledIcon',
		],
		name: 'Solar Bold',
	},
	{
		cells: [
			'CheckIcon, CloseIcon (and XIcon), MinusIcon, PlusIcon',
		],
		name: 'Own stroke path, width 1.8',
	},
	{
		cells: [
			'All 58 brand components',
		],
		name: 'Own filled paths',
	},
]

const MANIFEST_API: Row[] = [
	{
		cells: [
			'IconManifestEntry[]',
			'All 617 icons: name, source, category',
		],
		name: 'iconManifest',
	},
	{
		cells: [
			'IconCategory[]',
			'The 38 categories, in picker order',
		],
		name: 'iconCategories',
	},
	{
		cells: [
			'{ name; source; category }',
			'One manifest row',
		],
		name: 'IconManifestEntry',
	},
	{
		cells: [
			"'semantic' | 'lucide' | 'brand'",
			'Where the name comes from',
		],
		name: 'IconSource',
	},
	{
		cells: [
			"'arrows' | 'brands' | 'ui' | …",
			"Solar's grouping, plus brands",
		],
		name: 'IconCategory',
	},
]

const TYPES: Row[] = [
	{
		cells: [
			'Every prop an icon takes on that platform',
		],
		name: 'IconProps',
	},
	{
		cells: [
			'size, color, mirrored, accessibilityLabel',
		],
		name: 'CommonIconProps',
	},
	{
		cells: [
			'ComponentType<Props> — type for an icon prop',
		],
		name: 'IconComponent',
	},
	{
		cells: [
			'12 | 16 | 20 | 24 | 28 | 32 | 40 | number',
		],
		name: 'IconSize',
	},
]

const BRAND_MARKS = [
	'Apple',
	'Bitbucket',
	'Bluesky',
	'Discord',
	'Facebook',
	'GitHub',
	'GitLab',
	'Google',
	'Instagram',
	'Mastodon',
	'MercadoPago',
	'Messenger',
	'Microsoft',
	'PayPal',
	'Pinterest',
	'Pix',
	'Reddit',
	'Signal',
	'Snapchat',
	'Spotify',
	'Stripe',
	'Telegram',
	'Threads',
	'TikTok',
	'Twitch',
	'WeChat',
	'WhatsApp',
	'XSocial',
	'YouTube',
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-icons
				</h1>
				<div className="mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground">
					<p>
						617 icons backed by Solar, with one API for React on the web and
						React Native.
					</p>
					<p>
						Same names, same props and same defaults on both, except where the
						tables below say otherwise.
					</p>
				</div>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Platforms</h2>
				<Table
					head={[
						'Entry point',
						'Resolves to',
					]}
					rows={ENTRY_POINTS}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Solar comes from <Code>@solar-icons/react-perf</Code> on the web and{' '}
					<Code>@solar-icons/react-native</Code> on mobile. Both ship as
					dependencies.
				</p>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Only what you import is bundled: about 1.6 kB gzipped for the first
					icon, then 0.2–1 kB each, by drawing.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					language="bash"
					tabs={[
						{
							code: 'pnpm add @turystack/react-icons',
							label: 'Web',
						},
						{
							code: `npx expo install react-native-svg
pnpm add @turystack/react-icons`,
							label: 'React Native (Expo)',
						},
					]}
				/>
				<Table
					head={[
						'Peer',
						'Version',
						'Status',
						'Needed on',
					]}
					rows={PEERS}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					npm, yarn and bun work the same way: add the package, plus{' '}
					<Code>react-native-svg</Code> on mobile.
				</p>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Every mobile icon imports <Code>react-native-svg</Code>. Without it,
					the mobile build does not resolve.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					language="tsx"
					tabs={[
						{
							code: `import { SearchIcon } from '@turystack/react-icons'

export function SearchButton() {
  return (
    <button className="text-primary" type="button">
      <SearchIcon size={20} />
      Search
    </button>
  )
}`,
							label: 'Web',
						},
						{
							code: `import { SearchIcon } from '@turystack/react-icons'
import { Pressable, Text } from 'react-native'

export function SearchButton() {
  return (
    <Pressable accessibilityRole="button">
      <SearchIcon color="#18181b" size={20} />
      <Text>Search</Text>
    </Pressable>
  )
}`,
							label: 'React Native',
						},
					]}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Metro picks the <Code>react-native</Code> condition with package
					exports on (RN 0.79+). Before that, import{' '}
					<Code>@turystack/react-icons/mobile</Code>.
				</p>
				<ComponentPreview title="Web build">
					<span className="flex items-center gap-2 text-lib">
						<SearchIcon size={20} />
						Search
					</span>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-3xl text-muted-foreground">
					Every icon, on both platforms, takes these four.
				</p>
				<PropsTable
					props={[
						{
							default: 'see Defaults',
							description: 'Width and height. Number or a named step.',
							name: 'size',
							type: 'IconSize',
						},
						{
							default: 'currentColor',
							description: 'Stroke or fill. Brand palettes keep their own.',
							name: 'color',
							type: 'string',
						},
						{
							default: 'false',
							description: 'Flips the icon horizontally.',
							name: 'mirrored',
							type: 'boolean',
						},
						{
							description: 'Accessible name. Omit for decorative icons.',
							name: 'accessibilityLabel',
							type: 'string',
						},
					]}
				/>
				<h3 className="font-display font-semibold text-lg">Web only</h3>
				<PropsTable
					props={[
						{
							default: 'icon-{name}',
							description: 'Overrides the test id. Brand marks keep theirs.',
							name: 'data-testid',
							type: 'string',
						},
						{
							description: 'className, style, onClick and other SVG props.',
							name: '...rest',
							type: 'SVGProps<SVGSVGElement>',
						},
					]}
				/>
				<h3 className="font-display font-semibold text-lg">
					React Native only
				</h3>
				<PropsTable
					props={[
						{
							description: 'style, onPress and other react-native-svg props.',
							name: '...rest',
							type: 'SvgProps',
						},
					]}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Neither platform forwards <Code>ref</Code>, <Code>width</Code> or{' '}
					<Code>height</Code>. On mobile, <Code>testID</Code> is fixed too.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Defaults</h2>
				<Table
					head={[
						'Prop',
						'Web',
						'React Native',
					]}
					rows={DEFAULTS}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					On the web, Solar icons follow font size while glyphs and brands are
					24px. Pass <Code>size</Code> when they sit side by side.
				</p>
				<ComponentPreview title="No size passed, text-2xl parent">
					<span className="flex items-center gap-6 text-2xl">
						<span className="flex items-center gap-2">
							<SearchIcon />
							<code className="text-muted-foreground text-xs">1em</code>
						</span>
						<span className="flex items-center gap-2">
							<CheckIcon />
							<code className="text-muted-foreground text-xs">24</code>
						</span>
					</span>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Colour</h2>
				<p className="max-w-3xl text-muted-foreground">
					On the web, <Code>currentColor</Code> inherits the CSS text colour of
					the parent.
				</p>
				<ComponentPreview title="Web build, color inherited">
					<span className="flex items-center gap-4 text-lib">
						<SearchIcon size={28} />
						<CheckIcon size={28} />
						<GoogleIcon size={28} />
					</span>
				</ComponentPreview>
				<p className="max-w-3xl text-muted-foreground">
					React Native has no CSS cascade. Pass <Code>color</Code> from your
					theme on every icon.
				</p>
				<CodeBlock
					code={`import { SearchIcon } from '@turystack/react-icons'

<SearchIcon color={theme.colors.text} size={24} />`}
					filename="search.native.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Accessibility</h2>
				<Table
					head={[
						'',
						'Web',
						'React Native',
					]}
					rows={[
						{
							cells: [
								'aria-hidden="true"',
								'accessible={false}',
							],
							name: 'no label',
						},
						{
							cells: [
								'<title> (Solar) or aria-label + role="img"',
								'accessibilityLabel + accessible',
							],
							name: 'with label',
						},
					]}
				/>
				<CodeBlock
					code={`<DeleteIcon accessibilityLabel="Delete item" />
<SearchIcon /> {/* decorative: hidden from screen readers */}`}
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Naming</h2>
				<p className="max-w-3xl text-muted-foreground">
					One API across the set. The source only tells you how stable a name
					is.
				</p>
				<Table
					head={[
						'Source',
						'Count',
						'Examples',
						'Rule',
					]}
					rows={SOURCES}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					A lucide name with no Solar glyph is left out, not faked:{' '}
					<Code>Plane</Code>, <Code>Fingerprint</Code>, <Code>Puzzle</Code>,{' '}
					<Code>Barcode</Code>.
				</p>
				<Table
					head={[
						'Drawing',
						'Icons',
					]}
					rows={DRAWING}
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					31 lucide names re-export a semantic icon: <Code>CogIcon</Code> is{' '}
					<Code>SettingsIcon</Code>, <Code>XIcon</Code> is{' '}
					<Code>CloseIcon</Code>.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Brand marks</h2>
				<p className="max-w-3xl text-muted-foreground">
					Each mark ships twice. <Code>GoogleIcon</Code> follows{' '}
					<Code>color</Code>; <Code>GoogleColorIcon</Code> keeps the official
					palette.
				</p>
				<ComponentPreview title="Web build, text-lib parent">
					<span className="flex items-center gap-6 text-lib">
						<GoogleIcon size={32} />
						<GoogleColorIcon size={32} />
						<GitHubIcon size={32} />
						<GitHubColorIcon size={32} />
					</span>
				</ComponentPreview>
				<CodeBlock
					code={`<button type="button">
  <GoogleColorIcon size={20} />
  Continue with Google
</button>`}
					filename="sign-in.tsx"
					language="tsx"
				/>
				<ul className="max-w-3xl space-y-2 text-muted-foreground text-sm">
					<li>
						Apple, GitHub, TikTok, Threads and X have no colour. Their{' '}
						<Code>ColorIcon</Code> also follows <Code>color</Code>.
					</li>
					<li>
						Snapchat yellow and PayPal navy are low-contrast. Use a contrasting
						surface or the mono variant.
					</li>
					<li>
						X is <Code>XSocialIcon</Code>: <Code>XIcon</Code> is lucide&apos;s
						close cross.
					</li>
				</ul>
				<div className="flex max-w-3xl flex-wrap gap-1.5 text-muted-foreground text-xs">
					{BRAND_MARKS.map((mark) => (
						<Code key={mark}>{mark}</Code>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Manifest</h2>
				<p className="max-w-3xl text-muted-foreground">
					Lists every icon for pickers. A separate entry point, shared by both
					platforms: rendering an icon never loads it.
				</p>
				<Table
					head={[
						'Export',
						'Type',
						'Description',
					]}
					rows={MANIFEST_API}
				/>
				<CodeBlock
					code={`import { iconCategories, iconManifest } from '@turystack/react-icons/manifest'

const weather = iconManifest.filter((icon) => icon.category === 'weather')
// [{ name: 'CloudCheckIcon', source: 'lucide', category: 'weather' }, …]

const brands = iconManifest.filter((icon) => icon.source === 'brand')
// iconCategories: 'arrows', 'arrows-action', 'astronomy', 'brands', …`}
					filename="picker.ts"
					language="ts"
				/>
				<p className="max-w-3xl text-muted-foreground text-sm">
					Pair a name with its component by reading the module:{' '}
					<Code>{"import * as icons from '@turystack/react-icons'"}</Code>.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<Table
					head={[
						'Type',
						'Description',
					]}
					rows={TYPES}
				/>
				<CodeBlock
					code={`import type { IconComponent } from '@turystack/react-icons'

type MenuItem = { icon: IconComponent; label: string }`}
					language="ts"
				/>
			</section>
		</div>
	)
}
