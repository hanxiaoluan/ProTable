import { isObject, isArray, isFunction, isString } from 'lodash-es'
import { format } from 'date-fns'
import type { ComputedRef } from 'vue'
import type { FormatFormSchema, Recordable } from '../type'

export function getFormValues(formModel: Recordable, schemas: ComputedRef<FormatFormSchema[]>) {
	if (!isObject(formModel)) return {}

	const result: Recordable = {}

	for (const item of Object.entries(formModel)) {
		let [, value] = item
		const [key] = item

		// 如果日期函数,为数组，如果需要格式转化，需要进行特殊处理
		if (!key || isArray(value) && value.length === 0 || isFunction(value)) {
			continue
		}

		if (isString(value)) value = value.trim()
		Reflect.set(result, key, value)
	}

	return transformDateRange(result, schemas)
}

// 对日期转换的数据进行特殊处理,如格式化，日期参数转换等
function transformDateRange(values: Recordable, schemas: ComputedRef<FormatFormSchema[]>) {

	for (const item of schemas.value) {
		if (item.component !== 'DatePicker') continue
		const formatDate = item.format || 'yyyy-MM-dd'
		let value = values[item.valueField as string]
		value = isArray(value) ? [format(value[0], formatDate), format(value[1], formatDate)] : format(value, formatDate)
		if (item.fieldMapToTime && isArray(item.fieldMapToTime)) {
			const [startTimeKey, endTimeKey] = item.fieldMapToTime
			// const rangeTime = values[valueField]
			// console.log(valueField, values, rangeTime)
			values[startTimeKey] = value[0]
			values[endTimeKey] = value[1]
			Reflect.deleteProperty(values, item.valueField as string)
		}
	}
	return values
}
