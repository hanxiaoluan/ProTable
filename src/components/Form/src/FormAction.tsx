import { defineComponent, PropType } from 'vue'
import { NButton, NFormItem, NSpace } from 'naive-ui'
import { useContext } from './utils/useFormContext'
import type { ButtonProps } from 'naive-ui'

export default defineComponent({
	name: 'TableFormAction',
	props: {
		showResetButton: {
			type: Boolean as PropType<boolean>,
			default: true
		},
		showSubmitButton: {
			type: Boolean as PropType<boolean>,
			default: true
		},
		resetButtonOptions: {
			type: Object as PropType<ButtonProps>,
			// eslint-disable-next-line no-labels
			default: () => ({ type: 'default', text: false, round: true })
		},
		submitButtonOptions: {
			type: Object as PropType<ButtonProps>,
			// eslint-disable-next-line no-labels
			default: () => ({ type: 'primary', text: false, round: true })
		}
	},
	setup() {

		const { submitAction, resetAction } = useContext()
		return {
			submitAction, resetAction
		}

	},
	render() {

		return (
			<>
				<NFormItem>
					<NSpace>
						<NButton {...this.submitButtonOptions} onClick={this.submitAction}>搜索</NButton>
						<NButton {...this.resetButtonOptions} onClick={this.resetAction}>重置</NButton>
					</NSpace>
				</NFormItem>
			</>
		)
	}
})
