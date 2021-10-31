import { defineComponent, ref, computed, reactive, unref, Ref, ComputedRef } from 'vue'
import { NForm } from 'naive-ui'
import { createContext } from '../utils/useFormContext'
import { pick, isNumber, isArray } from 'lodash'
import FormItem from './FormItem'
import TableFormAction from './TableFormAction'
import { basicProps } from '../props'
import { useFormEvents } from '../hooks/useFormEvents'

import type { FormSchema, FormatFormSchema } from '../type'
import type { FormProps } from 'naive-ui'

import '../styles/index.css'

export default defineComponent({
	name: 'TableForm',
	props: basicProps,
	emits: ['submit', 'reset'],
	setup(props, { emit }) {
		const formModel = reactive<Record<string, any>>({

		})
		const formElRef = ref(null)
		const propsRef = ref<Partial<typeof basicProps>>({})
		const schemaRef: Ref<FormSchema[] | null> = ref(null)

		const getProps = computed(() => {
			return { ...props, ...unref(propsRef) } as typeof basicProps
		})

		const getSchemas = computed(() => {
			const schemas = unref(schemaRef) || unref(getProps).schemas;

			(schemas as FormatFormSchema[]).forEach(schema => {
				if (isArray(schema.valueField)) {
					// 如果是日期数组，需要进行特殊处理 😏
					schema.fieldMapToTime = schema.valueField
					schema.valueField = JSON.stringify(schema.valueField)
				}
			})
			return schemas as FormatFormSchema[]
		})

		const getFormProps: ComputedRef<FormProps> = computed(() => {

			return {
				...pick(props, ['showLabel', 'inline'])
			}

		})

		// 自定义每一个FormItem的宽度，在列表页使用
		const getItemWidth: ComputedRef<string> = computed(() => isNumber(props.itemWidth) ? `${props.itemWidth}px` : props.itemWidth)

		// 获取form表单的一些formEvents事件
		const { handleSubmit } = useFormEvents({ emit, formModel, getProps, getSchemas })
		createContext({ resetAction: () => { console.log('reset') }, submitAction: handleSubmit })
		return { formElRef, formModel, getProps, getSchemas, getFormProps, getItemWidth }
	},
	render() {
		return (
			<>
				<NForm ref='formElRef' model={this.formModel} {...this.getFormProps}>
					{
						unref(this.getSchemas).map(schema => <FormItem schema={schema} model={this.formModel} width={this.getItemWidth}/>)
					}
					<TableFormAction />
				</NForm>
			</>
		)
	}
})
