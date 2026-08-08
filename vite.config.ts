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
			allow: ['..'],
		},
		port: 3000,
	},
})
