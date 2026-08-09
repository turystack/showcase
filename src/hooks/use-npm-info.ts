import { useEffect, useState } from 'react'

type NpmInfo = {
	version?: string
	downloads?: string
}

const memoryCache = new Map<string, NpmInfo>()
const inflight = new Map<string, Promise<NpmInfo>>()

/**
 * How long a stored answer is trusted.
 *
 * Without it the first answer of a session was the only one: a package
 * published — or bumped — after the tab opened kept showing whatever was read
 * before, and a whole scope sat on `v0.0.0` long after it went live.
 */
const TTL = 10 * 60 * 1000

type StoredNpmInfo = NpmInfo & {
	/** When this was read, so a stale answer can be told from a fresh one. */
	at: number
}

function formatDownloads(count: number): string {
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1)}M`
	}
	if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1)}k`
	}
	return String(count)
}

async function fetchNpmInfo(packageName: string): Promise<{
	info: NpmInfo
	found: boolean
}> {
	const encoded = packageName.replace('/', '%2F')
	const [versionResult, downloadsResult] = await Promise.allSettled([
		fetch(`https://registry.npmjs.org/${encoded}/latest`).then((response) =>
			response.ok ? response.json() : null,
		),
		fetch(
			`https://api.npmjs.org/downloads/point/last-week/${packageName}`,
		).then((response) => (response.ok ? response.json() : null)),
	])

	const info: NpmInfo = {
		downloads: '0',
		version: 'v0.0.0',
	}

	if (versionResult.status === 'fulfilled' && versionResult.value?.version) {
		info.version = `v${versionResult.value.version}`
	}
	if (
		downloadsResult.status === 'fulfilled' &&
		typeof downloadsResult.value?.downloads === 'number'
	) {
		info.downloads = formatDownloads(downloadsResult.value.downloads)
	}

	return {
		found: versionResult.status === 'fulfilled' && !!versionResult.value,
		info,
	}
}

function readStored(packageName: string): NpmInfo | undefined {
	const raw = sessionStorage.getItem(`npm-info:${packageName}`)
	if (!raw) {
		return undefined
	}

	try {
		const { at, ...info } = JSON.parse(raw) as StoredNpmInfo
		return Date.now() - at < TTL ? info : undefined
	} catch {
		return undefined
	}
}

function loadNpmInfo(packageName: string): Promise<NpmInfo> {
	const cached = memoryCache.get(packageName)
	if (cached) {
		return Promise.resolve(cached)
	}

	const stored = readStored(packageName)
	if (stored) {
		memoryCache.set(packageName, stored)
		return Promise.resolve(stored)
	}

	let pending = inflight.get(packageName)
	if (!pending) {
		pending = fetchNpmInfo(packageName).then(({ found, info }) => {
			memoryCache.set(packageName, info)
			// Only a real answer is worth storing. Persisting the "no such
			// package" fallback pinned a whole scope to v0.0.0 for the rest of
			// the session on the one page load that happened before it shipped.
			if (found) {
				sessionStorage.setItem(
					`npm-info:${packageName}`,
					JSON.stringify({
						...info,
						at: Date.now(),
					}),
				)
			}
			inflight.delete(packageName)
			return info
		})
		inflight.set(packageName, pending)
	}
	return pending
}

/**
 * Live npm data for a package: latest version and weekly downloads.
 * Cached per session; empty until loaded. Unpublished packages (or missing
 * download stats) resolve to `v0.0.0` / `0`.
 */
export function useNpmInfo(packageName: string): NpmInfo {
	const [info, setInfo] = useState<NpmInfo>(
		() => memoryCache.get(packageName) ?? {},
	)

	useEffect(() => {
		let active = true
		loadNpmInfo(packageName)
			.then((loaded) => {
				if (active) {
					setInfo(loaded)
				}
			})
			.catch(() => {
				// offline or unpublished — keep the static fallback
			})
		return () => {
			active = false
		}
	}, [
		packageName,
	])

	return info
}
