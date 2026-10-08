import { useInterval } from '@turystack/react-hooks'
import { Flex, Typography } from '@turystack/react-web'
import { type ReactNode, useCallback, useState } from 'react'

/**
 * What every auth card in this audience shares that is not markup: the field
 * state and the pending flag. The cards themselves are composed in each
 * screen from Card, Form, Input and Button, so the composition is what the
 * reader sees there.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** A light shape check — the server is the one that knows the address exists. */
export function isEmail(value: string): boolean {
	return EMAIL.test(value.trim())
}

/** The empty-or-malformed message an e-mail field shows, or none. */
export function emailError(value: string): string | undefined {
	if (!value.trim()) {
		return 'Enter your email'
	}
	return isEmail(value) ? undefined : 'Enter a valid email'
}

export type FieldErrors<F extends string> = Partial<Record<F, string>>

/**
 * Values as the API body spells them, and the client's own errors. Editing a
 * field clears its error; `check` sets the errors of a submit and answers
 * whether there were none.
 *
 * The screens pass `undefined` for a field that is fine, so a whole check
 * reads as one object literal.
 */
export function useFields<F extends string>(initial: Record<F, string>) {
	const [values, setValues] = useState(initial)
	const [errors, setErrors] = useState<FieldErrors<F>>({})

	const change = (field: F) => (value: string | null) => {
		setValues((current) => ({
			...current,
			[field]: value ?? '',
		}))
		setErrors((current) => {
			if (!(field in current)) {
				return current
			}
			const next = {
				...current,
			}
			delete next[field]
			return next
		})
	}

	/** Keeps only the messages that are set, so `{ email: undefined }` passes. */
	const check = (next: FieldErrors<F>) => {
		const set = Object.fromEntries(
			Object.entries(next).filter(([, message]) => message),
		) as FieldErrors<F>
		setErrors(set)
		return Object.keys(set).length === 0
	}

	return {
		change,
		check,
		errors,
		values,
	}
}

/**
 * Runs a handler that may return a promise and is pending until it settles.
 * A second run while one is pending is ignored; the answer says whether the
 * handler settled well.
 */
export function usePending() {
	const [pending, setPending] = useState(false)

	const run = useCallback(
		async (action: () => unknown): Promise<boolean> => {
			if (pending) {
				return false
			}
			setPending(true)
			try {
				await action()
				return true
			} catch {
				return false
			} finally {
				setPending(false)
			}
		},
		[
			pending,
		],
	)

	return {
		pending,
		run,
	}
}

/**
 * The wait before a code can be sent again: `seconds` from mount and from
 * each `restart`, ticking once a second while there is anything left.
 */
export function useCooldown(seconds: number) {
	const [now, setNow] = useState(() => Date.now())
	const [until, setUntil] = useState(() => Date.now() + seconds * 1000)
	const wait = Math.max(0, Math.ceil((until - now) / 1000))

	useInterval(() => setNow(Date.now()), wait > 0 ? 1000 : null)

	const restart = () => {
		const at = Date.now()
		setNow(at)
		setUntil(at + seconds * 1000)
	}

	return {
		restart,
		wait,
	}
}

/** A muted line of text followed by a link-styled action, centred. */
export function AuthPrompt({
	action,
	children,
}: {
	action: ReactNode
	children: ReactNode
}) {
	return (
		<Flex
			align="center"
			gap="xs"
			justify="center"
			wrap="wrap"
		>
			<Typography
				component="span"
				size="sm"
				variant="muted"
			>
				{children}
			</Typography>
			{action}
		</Flex>
	)
}
