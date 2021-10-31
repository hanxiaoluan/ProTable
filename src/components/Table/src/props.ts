import { PropType } from 'vue'

export const basicProps = {
	request: {
		type: Function as PropType<(...args: any[])=> Promise<any>>
	},
	params: {
		type: Object as PropType<Recordable>
	}

}
