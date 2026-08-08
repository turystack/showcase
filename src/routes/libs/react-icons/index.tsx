import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/react-icons/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-icons
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A stable semantic icon API for web, React Native, and Expo, currently
					backed by Solar Icons.
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-icons',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-icons',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-icons',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/react-icons',
							label: 'bun',
						},
					]}
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable
					props={[
						{
							default: '1em (24 on glyph icons)',
							description:
								'Rendered icon size. Solar-backed icons inherit 1em from the underlying component; the four glyph icons (check, close, minus, plus) default to 24. Pass size explicitly when icons of both kinds sit side by side.',
							name: 'size',
							type: 'IconSize | string',
						},
						{
							default: 'currentColor',
							description: 'Stroke or fill color.',
							name: 'color',
							type: 'string',
						},
						{
							default: 'false',
							description: 'Mirrors the icon horizontally.',
							name: 'mirrored',
							type: 'boolean',
						},
						{
							description: 'Accessible name when the icon conveys meaning.',
							name: 'accessibilityLabel',
							type: 'string',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					Every icon exposes a fixed test identifier using
					`icon-&#123;name&#125;`. For example, SearchIcon renders
					`data-testid="icon-search"` on the web.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<div className="space-y-3 text-muted-foreground">
					<p>
						Import icons from{' '}
						<code className="text-lib">@turystack/react-icons</code>
						in application code. Web bundlers resolve the SVG implementation,
						while React Native and Expo resolve the native implementation
						through the package&apos;s{' '}
						<code className="text-lib">react-native</code> export condition.
					</p>
					<p>
						Both versions expose the same semantic icon names and shared props,
						so cross-platform components can keep the same icon API.
					</p>
				</div>
				<CodeBlock
					language="tsx"
					tabs={[
						{
							code: `import { SearchIcon } from '@turystack/react-icons'

export function SearchStatus() {
  return (
    <SearchIcon
      accessibilityLabel="Search"
      color="currentColor"
      size={20}
    />
  )
}`,
							label: 'Web',
						},
						{
							code: `import { SearchIcon } from '@turystack/react-icons'
import { View } from 'react-native'

export function SearchStatus() {
  return (
    <View>
      <SearchIcon
        accessibilityLabel="Search"
        color="#18181b"
        size={20}
      />
    </View>
  )
}`,
							label: 'React Native / Expo',
						},
					]}
				/>
				<div className="space-y-2 text-muted-foreground text-sm">
					<p>
						React Native projects must provide{' '}
						<code className="text-lib">react-native-svg</code>, which is a peer
						dependency of the mobile implementation.
					</p>
					<p>
						When a test, documentation tool, or mixed-target build needs an
						explicit implementation, import from{' '}
						<code className="text-lib">@turystack/react-icons/web</code> or{' '}
						<code className="text-lib">@turystack/react-icons/mobile</code>.
					</p>
				</div>
			</section>
		</div>
	)
}
