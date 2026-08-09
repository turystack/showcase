import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/',
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
