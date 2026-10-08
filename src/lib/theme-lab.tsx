import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import {
	CUSTOM_STARTER,
	type ReactWebThemeMode,
	THEME_CSS,
	THEME_MODES,
} from '@/data/react-web-themes'

const STYLE_ID = 'react-web-theme-lab'
const MODE_KEY = 'tury.theme-lab.mode'
const CSS_KEY = 'tury.theme-lab.css'

type ThemeLabValue = {
	mode: ReactWebThemeMode
	setMode: (mode: ReactWebThemeMode) => void
	/** The reader's own CSS. Kept even while another mode is showing. */
	customCss: string
	setCustomCss: (css: string) => void
	/** What is on the page right now, whichever mode produced it. */
	activeCss: string
	reset: () => void
}

const ThemeLabContext = createContext<ThemeLabValue | null>(null)

/**
 * A private-window read can throw rather than return null, and a theme is not
 * worth taking the page down for.
 */
function read(key: string, fallback: string) {
	try {
		return window.localStorage.getItem(key) ?? fallback
	} catch {
		return fallback
	}
}

function write(key: string, value: string) {
	try {
		window.localStorage.setItem(key, value)
	} catch {
		// A viewer who blocks site data still gets the theme for this session.
	}
}

/**
 * Wrap the reader's CSS so it lands inside react-web's scope.
 *
 * Native nesting is what makes one wrapper serve both shapes: bare declarations
 * (`--primary: red`) apply to the scope element itself, and nested rules
 * (`.button { … }`) become descendant selectors under it. Without the wrapper a
 * `:root` block would lose to `react-web-scope.css`, which declares the same
 * tokens on `.react-web-surface` — more specific, so it wins.
 *
 * `.react-web-surface` covers the previews and the portal host at the root, so
 * overlays are re-skinned along with everything else.
 *
 * `@import` and `@font-face` are lifted back out before the wrapper closes.
 * An import is only honoured ahead of every other rule in the sheet, and a
 * font-face nested under a selector is dropped without a word — a theme that
 * brought its own typeface would silently render in the old one.
 *
 * The class is repeated on purpose, three times. `react-web-scope.css`
 * declares the same tokens twice: on `.react-web-surface` `(0,1,0)` and, for
 * the dark scheme, on `.dark .react-web-surface` `(0,2,0)`. A tie goes to
 * whichever stylesheet the browser saw last — decided by Vite's injection
 * order in dev and by a re-append on every HMR update. Doubled, the wrapper
 * tied the dark rule: a token a theme set once at the top (Slate's
 * `--border: transparent`) won in light and, depending on load order, lost in
 * dark, so borders came back for one reader and not another. Tripled to
 * `(0,3,0)` it beats both, whatever the order; a theme's own `.dark &` block
 * lands at `(0,4,0)` and still overrides its top level.
 */
/**
 * An @import cannot simply run to the next semicolon: a Google Fonts URL
 * carries them inside its own query string (`wght@400;500;600;700`). Match the
 * url()/quoted target first, then let the tail run to the real terminator.
 */
const HOISTED =
	/@import\s+(?:url\([^)]*\)|"[^"]*"|'[^']*')[^;]*;|@font-face\s*\{[^}]*\}/gi

function scoped(css: string) {
	if (!css.trim()) {
		return ''
	}

	const hoisted = css.match(HOISTED)?.join('\n') ?? ''
	const rest = css.replace(HOISTED, '').trim()

	if (!rest) {
		return hoisted
	}

	return [
		hoisted,
		`.react-web-surface.react-web-surface.react-web-surface {\n${rest}\n}`,
	]
		.filter(Boolean)
		.join('\n\n')
}

export function ThemeLabProvider({ children }: PropsWithChildren) {
	const [mode, setModeState] = useState<ReactWebThemeMode>(() => {
		const saved = read(MODE_KEY, 'default')
		// Storage can hold any string; an unknown mode has no CSS to look up.
		return THEME_MODES.some((option) => option.id === saved)
			? (saved as ReactWebThemeMode)
			: 'default'
	})
	const [customCss, setCustomCssState] = useState(() =>
		read(CSS_KEY, CUSTOM_STARTER),
	)

	const activeCss = useMemo(() => {
		if (mode === 'default') {
			return ''
		}
		if (mode === 'custom') {
			return customCss
		}
		return THEME_CSS[mode]
	}, [
		customCss,
		mode,
	])

	/**
	 * One <style> element, rewritten in place. Appending a new one per keystroke
	 * would leave the cascade deciding between a dozen stale copies.
	 */
	useEffect(() => {
		let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null

		if (!tag) {
			tag = document.createElement('style')
			tag.id = STYLE_ID
			document.head.append(tag)
		}

		tag.textContent = scoped(activeCss)
	}, [
		activeCss,
	])

	const value = useMemo<ThemeLabValue>(
		() => ({
			activeCss,
			customCss,
			mode,
			reset: () => {
				setModeState('default')
				setCustomCssState(CUSTOM_STARTER)
				write(MODE_KEY, 'default')
				write(CSS_KEY, CUSTOM_STARTER)
			},
			setCustomCss: (css) => {
				setCustomCssState(css)
				write(CSS_KEY, css)
			},
			setMode: (next) => {
				setModeState(next)
				write(MODE_KEY, next)
			},
		}),
		[
			activeCss,
			customCss,
			mode,
		],
	)

	return <ThemeLabContext value={value}>{children}</ThemeLabContext>
}

export function useThemeLab() {
	const context = useContext(ThemeLabContext)

	if (!context) {
		throw new Error('useThemeLab must be used inside ThemeLabProvider')
	}

	return context
}
