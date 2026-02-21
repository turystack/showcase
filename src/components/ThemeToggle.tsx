import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
	const [dark, setDark] = useState(true)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark)
	}, [
		dark,
	])

	useEffect(() => {
		document.documentElement.classList.add('dark')
	}, [])

	return (
		<button
			aria-label="Toggle theme"
			className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
			onClick={() => setDark(!dark)}
			type="button"
		>
			{dark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}
