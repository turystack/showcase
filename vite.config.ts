import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/',
	/**
	 * Always re-optimise on start, never serve yesterday's copy.
	 *
	 * A `file:` dependency reaches the site as a copy — `src → dist →
	 * node_modules` — and the optimiser fingerprints the manifest, not the
	 * bundle. Rebuilding react-web and reinstalling changes neither the version
	 * nor the lockfile, so the cache stayed valid and the site kept serving a
	 * build from before `Export` existed: "does not provide an export named
	 * 'Export'", which reads like a build problem and is a cache problem.
	 *
	 * `exclude` was the first attempt and it was the wrong lever: it also stops
	 * pre-bundling what those packages import, and React's `jsx-runtime`,
	 * `lodash.debounce` and friends are CJS — the optimiser is exactly what
	 * gives them named exports. Forcing costs a couple of seconds per `pnpm
	 * dev` and keeps every dependency working the way Vite intends.
	 */
	optimizeDeps: {
		force: true,
	},
	plugins: [
		tailwindcss(),
		tanstackRouter({
			// Each route becomes its own chunk. Without it every page paid for
			// every other one, and the icon playground alone — which has to load
			// the whole catalogue to show it — put ~300 kB of SVG on the home page.
			autoCodeSplitting: true,
			routesDirectory: './src/routes',
		}),
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		/**
		 * One React, whatever the importer's real path.
		 *
		 * `@turystack/react-charts` is linked by hand-made symlink, so its
		 * imports (`react`, `echarts`) resolve from `react-charts/node_modules`
		 * — where React sits as a devDependency. Without dedupe the charts get
		 * a second React and every hook inside one throws "Invalid hook call".
		 * ECharts holds no React, so it is left to resolve beside the charts.
		 */
		dedupe: [
			'react',
			'react-dom',
		],
	},
	server: {
		fs: {
			allow: [
				'..',
			],
		},
		port: 3000,
	},
})
