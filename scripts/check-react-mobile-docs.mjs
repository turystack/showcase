import ts from '@typescript/typescript6'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { reactMobileCompoundDocs } from '../src/data/react-mobile-compounds.ts'
import { reactMobileDocs } from '../src/data/react-mobile-docs.ts'
import { reactMobileUsageExamples } from '../src/data/react-mobile-usage.ts'

const errors = []
const repositoryRoot = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const mobileRoot = path.join(repositoryRoot, 'react-mobile')
const configFile = ts.readConfigFile(
	path.join(mobileRoot, 'tsconfig.json'),
	ts.sys.readFile,
)
const parsedConfig = ts.parseJsonConfigFileContent(
	configFile.config,
	ts.sys,
	mobileRoot,
)
const mobileProgram = ts.createProgram({
	options: parsedConfig.options,
	rootNames: parsedConfig.fileNames,
})
const mobileChecker = mobileProgram.getTypeChecker()
const docsBySlug = new Map(
	reactMobileDocs.map((component) => [
		component.slug,
		component,
	]),
)
const allowedSharedTypes = {
	'currency-input': new Set(['CurrencyVariant', 'InputSize']),
	'date-input': new Set(['InputSize', 'InputVariant']),
	'date-native-input': new Set(['InputSize', 'InputVariant']),
	'date-picker-sheet': new Set(['InputSize', 'InputVariant']),
	'date-range-input': new Set(['InputSize', 'InputVariant']),
	'date-time-input': new Set(['InputSize', 'InputVariant']),
	'document-input': new Set(['InputSize']),
	'mask-input': new Set(['InputSize', 'InputVariant']),
	'number-input': new Set(['InputSize']),
	'password-input': new Set(['InputSize', 'InputVariant']),
	'phone-input': new Set(['InputSize', 'InputVariant']),
	'tags-input': new Set(['InputSize', 'InputVariant']),
	textarea: new Set(['InputSize']),
	'time-input': new Set(['InputSize', 'InputVariant']),
	'confirm-sheet': new Set([
		'SheetSize',
	]),
}
const componentTypePattern =
	/\b[A-Z][A-Za-z0-9]*(?:Orientation|Size|Variant)\b/g
const discriminatedModes = {
	'currency-input': [
		'single',
		'multiple',
	],
	select: [
		'single',
		'multiple',
	],
	slider: [
		'single',
		'range',
	],
	uploader: [
		'single',
		'multiple',
	],
}

const requiredContracts = {
	'action-sheet': ['ActionSheetItemConfirmProps', 'ButtonProps'],
	calendar: ['CalendarRangeValue', 'CalendarLocale'],
	confirm: ['ButtonProps'],
	'currency-input': ['CurrencyInputMultipleValue', 'CurrencyInputSingleProps', 'CurrencyInputMultipleProps'],
	'date-range-input': ['DateRange', 'DateRangeInputPreset'],
	'document-input': ['DocumentValue'],
	form: ['FormTooltipProps'],
	list: ['ListInfiniteProps', 'ListPaginationProps'],
	'phone-input': ['PhoneValue'],
	progress: ['LabelProps'],
	select: ['SelectInfiniteProps'],
	slider: ['SliderSingleProps', 'SliderRangeProps'],
	switch: ['LabelProps'],
	uploader: ['Upload', 'UploaderHandlerResponse', 'SingleUploaderProps', 'MultipleUploaderProps'],
}

const collectProperties = (type) => {
	if (type.isUnionOrIntersection()) {
		return new Set(type.types.flatMap((entry) => [...collectProperties(entry)]))
	}
	return new Set(
		mobileChecker
			.getPropertiesOfType(type)
			.filter((symbol) =>
				!symbol.getJsDocTags(mobileChecker).some((tag) => tag.name === 'internal'),
			)
			.map((symbol) => symbol.name),
	)
}

for (const component of reactMobileDocs) {
	const sourcePath = path.join(
		mobileRoot,
		'src',
		'components',
		component.slug,
		`${component.slug}.tsx`,
	)
	const source = mobileProgram.getSourceFile(sourcePath)
	const moduleSymbol = source && mobileChecker.getSymbolAtLocation(source)
	const exported = moduleSymbol && mobileChecker
		.getExportsOfModule(moduleSymbol)
		.find((symbol) => symbol.name === component.name)
	const declaration = exported?.valueDeclaration ?? exported?.declarations?.[0]
	const signature = declaration && mobileChecker
		.getTypeOfSymbolAtLocation(exported, declaration)
		.getCallSignatures()[0]
	const parameter = signature?.parameters[0]
	const parameterDeclaration = parameter?.valueDeclaration ?? parameter?.declarations?.[0]

	if (!source || !exported || !parameter || !parameterDeclaration) {
		errors.push(`${component.name}: unable to inspect the public component signature`)
		continue
	}

	const publicProps = collectProperties(
		mobileChecker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration),
	)
	const documentedProps = new Set(component.props.map((item) => item.name))

	for (const property of publicProps) {
		if (!documentedProps.has(property)) {
			errors.push(`${component.name}: public prop ${property} is not documented`)
		}
	}
	for (const property of documentedProps) {
		if (!publicProps.has(property)) {
			errors.push(`${component.name}: documented prop ${property} is not public`)
		}
	}
}

for (const [slug, names] of Object.entries(requiredContracts)) {
	const component = docsBySlug.get(slug)
	const documented = new Set(component?.contracts?.map((item) => item.name))
	for (const name of names) {
		if (!documented.has(name)) errors.push(`${slug}: missing ${name} contract table`)
	}
}

for (const component of reactMobileDocs) {
	const propNames = new Set()

	for (const prop of component.props) {
		if (propNames.has(prop.name)) {
			errors.push(`${component.name}: duplicated prop ${prop.name}`)
		}
		propNames.add(prop.name)

		for (const typeName of prop.type.match(componentTypePattern) ?? []) {
			const isComponentType = typeName.startsWith(component.name)
			const isSharedType = allowedSharedTypes[component.slug]?.has(typeName)

			if (!isComponentType && !isSharedType) {
				errors.push(
					`${component.name}.${prop.name}: ${typeName} belongs to another component`,
				)
			}
		}
	}
}

for (const [slug, modes] of Object.entries(discriminatedModes)) {
	const component = docsBySlug.get(slug)
	const documentedModes = component?.options?.find(
		(option) => option.name === 'mode',
	)?.values
	const modeProp = component?.props.find((prop) => prop.name === 'mode')
	const usage = reactMobileUsageExamples[slug] ?? []

	if (!component || !documentedModes || !modeProp?.required) {
		errors.push(`${slug}: mode must be a required documented discriminator`)
		continue
	}

	if (
		documentedModes.length !== modes.length ||
		modes.some((mode) => !documentedModes.includes(mode))
	) {
		errors.push(
			`${component.name}: mode options do not match ${modes.join(' | ')}`,
		)
	}

	for (const mode of modes) {
		if (!usage.some((example) => example.code.includes(`mode="${mode}"`))) {
			errors.push(`${component.name}: missing a ${mode} mode usage example`)
		}
	}
}

for (const [slug, examples] of Object.entries(reactMobileUsageExamples)) {
	const component = docsBySlug.get(slug)

	if (!component) {
		errors.push(`${slug}: usage exists without component documentation`)
		continue
	}

	if (examples.length < 2) {
		errors.push(`${component.name}: expected at least two usage examples`)
	}

	const allowedProps = new Map([
		[
			component.name,
			new Set(component.props.map((prop) => prop.name)),
		],
	])
	const requiredProps = new Map([
		[
			component.name,
			new Set(
				component.props.filter((prop) => prop.required && prop.name !== 'children').map((prop) => prop.name),
			),
		],
	])

	for (const compound of reactMobileCompoundDocs[slug] ?? []) {
		allowedProps.set(
			compound.name,
			new Set(compound.props.map((prop) => prop.name)),
		)
		requiredProps.set(
			compound.name,
			new Set(
				compound.props.filter((prop) => prop.required && prop.name !== 'children').map((prop) => prop.name),
			),
		)
	}

	for (const example of examples) {
		const source = ts.createSourceFile(
			`${slug}.tsx`,
			example.code,
			ts.ScriptTarget.Latest,
			true,
			ts.ScriptKind.TSX,
		)

		const visit = (node) => {
			if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
				const tagName = node.tagName.getText(source)
				const documentedProps = allowedProps.get(tagName)
				const presentProps = new Set()

				if (documentedProps) {
					for (const attribute of node.attributes.properties) {
						if (ts.isJsxSpreadAttribute(attribute)) {
							errors.push(
								`${component.name} / ${example.title}: ${tagName} cannot spread undocumented props`,
							)
							continue
						}

						const propName = attribute.name.getText(source)
						presentProps.add(propName)

						if (propName !== 'key' && !documentedProps.has(propName)) {
							errors.push(
								`${component.name} / ${example.title}: ${tagName}.${propName} is not documented`,
							)
						}
					}

					for (const propName of requiredProps.get(tagName) ?? []) {
						if (!presentProps.has(propName)) {
							errors.push(
								`${component.name} / ${example.title}: ${tagName}.${propName} is required`,
							)
						}
					}
				}
			}

			ts.forEachChild(node, visit)
		}

		visit(source)
	}
}

for (const component of reactMobileDocs) {
	if (!reactMobileUsageExamples[component.slug]) {
		errors.push(`${component.name}: missing usage examples`)
	}
}

if (errors.length > 0) {
	console.error(errors.map((error) => `- ${error}`).join('\n'))
	process.exitCode = 1
} else {
	console.log(
		`Validated ${reactMobileDocs.length} components and ${
			Object.values(reactMobileUsageExamples).flat().length
		} usage examples.`,
	)
}
