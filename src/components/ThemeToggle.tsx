import { useColorScheme } from '@turystack/ui'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
	const { colorScheme, changeColorScheme } = useColorScheme()

	const isDark =
		colorScheme === 'dark' ||
		(colorScheme === 'system' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)

	return (
		<button
			aria-label="Toggle theme"
			className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
			onClick={() => changeColorScheme(isDark ? 'light' : 'dark')}
			type="button"
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}
