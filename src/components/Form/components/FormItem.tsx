import { defineComponent, PropType, Component } from 'vue'
import { NFormItem } from 'naive-ui'
import { componentMap } from '../utils/componentMap'
import { pick, omit } from 'lodash-es'
import type { FormatFormSchema } from '../type'
import type { FormItemProps } from 'naive-ui'

export default defineComponent({
	name: 'TableFormItem',
	props: {
		schema: {
			type: Object as PropType<FormatFormSchema>,
			default: () => {}
		},
		model: {
			type: Object as PropType<Record<string, any>>,
			required: true
		},
		width: {
			type: String as PropType<string>,
			required: true
		}
	},
	setup(props) {

		const renderComponent = (schema: FormatFormSchema) => {

			const { component: tag = 'Input', defaultValue = null } = schema
			const component = componentMap.get(tag) as Component

			const getComponentProps = (schema: FormatFormSchema) => {
				return {
					clearable: true,
					defaultValue,
					...pick(schema, ['size', 'options', 'type', 'endPlaceholder', 'startPlaceholder', 'placeholder', 'format'])
				}
			}

			const compAttr = {
				...getComponentProps(schema)
			}

			return <component {...compAttr} v-model={[props.model[schema.valueField as string], 'value']} style={{ width: props.width }} />

		}

		const getFormItemProps = (schema: FormatFormSchema): FormItemProps => {
			const defaultFormItemProps = {
				feedback: undefined,
				first: false,
				labelAlign: 'left',
				labelPlacement: 'top',
				path: schema.valueField,
				showRequireMark: false,
				size: 'medium'
			}

			return {
				...defaultFormItemProps,
				...omit(schema, ['component', 'placeholder', 'defaultValue', 'valueField'])
			} as FormItemProps
		}
		return { renderComponent, getFormItemProps }
	},
	render() {
		const { schema, renderComponent, getFormItemProps } = this
		return (
			<NFormItem {...getFormItemProps(schema)}>
				{renderComponent(schema)}
			</NFormItem>
		)
	}
})
