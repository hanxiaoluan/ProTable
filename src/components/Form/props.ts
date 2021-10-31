import { PropType } from 'vue'
import { FormSchema } from './type'
export const basicProps = {
	model: {
		type: Object as PropType<Record<string, any>>,
		default: {}
	},
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium'
	},
	showLabel: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	labelAlign: {
		type: String as PropType<'left' | 'right' >,
		default: 'left'
	},
	labelPlacement: {
		type: String as PropType<'left' | 'top'>,
		default: 'left'
	},
	inline: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	schemas: {
		type: Array as PropType<Array<FormSchema>>
	},
	itemWidth: {
		type: [String, Number] as PropType<string|number>,
		default: '270px'
	},
	onSubmit: {
		type: Function as PropType<()=> Promise<void>>
	}

} as const
