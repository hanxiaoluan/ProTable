import { render } from 'naive-ui/lib/_utils'
import { defineProps, defineComponent, provide, inject, computed, InjectionKey, Ref, PropType, renderSlot } from 'vue'

export default defineComponent({
	name: 'MyConfig',
	props: {
		bordered: {
			type: Boolean as PropType<boolean | undefined>,
			default: undefined
		}
	},
	setup(props) {
		const configProviderInjectionKey: InjectionKey<{mergedBorderedRef: Ref<any>}> =
        Symbol('configProviderInjection')
		const testConfigProvider = inject(configProviderInjectionKey, null)
		const mergedBorderedRef = computed(() => {
			const { bordered } = props
			console.log(bordered, bordered === undefined, testConfigProvider?.mergedBorderedRef.value)
			return bordered === undefined
				? testConfigProvider?.mergedBorderedRef.value
				: bordered
		})
		console.log(mergedBorderedRef.value)
		// const message = useMessage()
		// message.info('xxxxxx')
		provide(configProviderInjectionKey, {
			mergedBorderedRef
		})
		return {
			mergedBordered: mergedBorderedRef
		}
	},
	render() {
		return (
			<div>
				{renderSlot(this.$slots, 'default')}
			</div>
		)
	}
})
