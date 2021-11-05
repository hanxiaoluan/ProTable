import { ref, unref, nextTick, onUnmounted } from 'vue'
import { error } from '../../../../utils/warn'
import type { FormActionType } from '../type'

type Register = (instance: FormActionType)=> void
type UseFormReturnType = [Register, FormActionType]
export function useForm(): UseFormReturnType {
	const formRef = ref<null|FormActionType>(null)
	const loadedRef = ref(false)

	async function getForm() {
		const form = unref(formRef)
		if (!form) {
			error('getForm', 'form实例还未获取，请确保form已经被渲染当执行form操作时')
		}

		await nextTick()
		return form as FormActionType
	}

	function register(instance: FormActionType) {
		onUnmounted(() => {
			formRef.value = null
			loadedRef.value = false
		})
		if (unref(loadedRef) && instance === unref(formRef)) return

		formRef.value = instance
		console.log(formRef.value)
		loadedRef.value = true
	}

	const methods = {
		async getFieldsValue() {
			const form = await getForm()
			return form.getFieldsValue()
		},
		async submit() {
			const form = await getForm()
			return form.submit()
		}
	}

	return [register, methods]
}
