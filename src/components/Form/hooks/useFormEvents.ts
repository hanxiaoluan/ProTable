import { unref } from 'vue'
import { isFunction } from 'lodash-es'
import { basicProps } from '../props'
import { getFormValues } from '../utils/handleFormValues'
import type { ComputedRef } from 'vue'
import type { Recordable, FormSchema } from '../type'

interface UseFormActionContext {
	emit: (event: 'submit'|'reset', ...args: any[])=> void,
	getProps: ComputedRef<typeof basicProps>,
	formModel: Recordable,
	getSchemas: ComputedRef<FormSchema[]>
}

export function useFormEvents({ emit, getProps, formModel, getSchemas }: UseFormActionContext) {

	async function handleSubmit(e: Event): Promise<void> {
		e && e.preventDefault()
		const { onSubmit } = unref(getProps)

		const values = getFormValues(formModel, getSchemas)

		// 如果props里传入的有onSubmit那就取props的onSubmit，否则用@onSubmit这种事件方法进行获取
		if (onSubmit && isFunction(onSubmit)) {
			await onSubmit(values)
		} else {
			emit('submit', values)
		}
	}

	return { handleSubmit }
}
