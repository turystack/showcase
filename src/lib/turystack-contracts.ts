import { Entity } from '@turystack/entity'
import { createExceptions } from '@turystack/exceptions'
import {
	BooleanSchema,
	DateRangeSchema,
	dateRangeToQuery,
	FilterSchema,
	ListSchema,
	listToQuery,
	queryToDateRange,
	queryToList,
	queryToRange,
	RangeSchema,
	rangeToQuery,
} from '@turystack/query-dsl'
import { Saga, type SagaLogger } from '@turystack/saga'
import z from 'zod'

/**
 * Compile-time contracts that keep the showcase documentation aligned with the
 * public APIs of the local Turystack packages. This module is intentionally not
 * imported by the application bundle; `tsc -b` still validates it.
 */
export function verifyEntityContract() {
	class ShowcaseEntity {}

	Entity('showcase.entity')(ShowcaseEntity)

	const exceptions = createExceptions((builder) => ({
		showcase: builder.module('showcase', {
			conflict: [
				'invalid_state',
			],
		}),
	}))

	return {
		invalidStateCode: exceptions.showcase.invalidState.code,
		invalidStateError: new exceptions.showcase.invalidState({
			showcaseId: 'showcase-1',
		}),
		notFoundError: new exceptions.showcase.notFound({
			showcaseId: 'showcase-1',
		}),
	}
}

export function verifyQueryDslContract() {
	const range = RangeSchema.parse('>=10;<=50')
	const dateRange = DateRangeSchema.parse(
		'>=2026-01-01T00:00:00.000Z;<=2026-12-31',
	)
	const list = ListSchema(
		z.enum([
			'active',
			'inactive',
		]),
		[
			'active',
			'inactive',
		] as const,
	).safeParse('active,inactive')

	return {
		boolean: BooleanSchema.parse('true'),
		dateRange,
		dateRangeQuery: dateRange ? dateRangeToQuery(dateRange) : '',
		filter: FilterSchema([
			'name',
			'email',
		]).parse('john'),
		list,
		listQuery: listToQuery(queryToList<'active' | 'inactive'>('active')),
		parsedDateRange: queryToDateRange('>=2026-01-01'),
		parsedRange: queryToRange('>=10'),
		range,
		rangeQuery: rangeToQuery(range),
	}
}

export function verifySagaContract(logger: SagaLogger) {
	const saga = new Saga('showcase', logger)

	saga.addCompensation(() => undefined)

	return saga.rollback()
}
