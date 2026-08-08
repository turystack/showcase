import { useEffect, useState } from 'react'

type NpmInfo = {
	version?: string
	downloads?: string
}

const memoryCache = new Map<string, NpmInfo>()
const inflight = new Map<string, Promise<NpmInfo>>()

function formatDownloads(count: number): string {
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1)}M`
	}
	if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1)}k`
	}
	return String(count)
}

async function fetchNpmInfo(packageName: string): Promise<NpmInfo> {
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

	return info
}

function loadNpmInfo(packageName: string): Promise<NpmInfo> {
	const cached = memoryCache.get(packageName)
	if (cached) {
		return Promise.resolve(cached)
	}

	const stored = sessionStorage.getItem(`npm-info:${packageName}`)
	if (stored) {
		const parsed = JSON.parse(stored) as NpmInfo
		memoryCache.set(packageName, parsed)
		return Promise.resolve(parsed)
	}

	let pending = inflight.get(packageName)
	if (!pending) {
		pending = fetchNpmInfo(packageName).then((info) => {
			memoryCache.set(packageName, info)
			sessionStorage.setItem(`npm-info:${packageName}`, JSON.stringify(info))
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
