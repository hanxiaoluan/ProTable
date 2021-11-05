import { PropType, ExtractPropTypes } from 'vue'
import type { DataTableColumn } from 'naive-ui'
import type { SearchForm, PaginationSetting } from './types'

const defaultPaginationSetting = {
	pageField: 'page', pageSizeField: 'pageSize', listField: 'pageList', totalField: 'totalSize',
	pageSizes: [10, 20, 50]
}
export const basicProps = {
	request: {
		type: Function as PropType<(...args: any[])=> Promise<any>>
	},
	PaginationSetting: {
		type: Object as PropType<PaginationSetting>,
		default: () => defaultPaginationSetting
	},
	restParams: {
		type: Object as PropType<Recordable>, // 多余的参数，通常搭配自定义form里的插槽使用
		default: () => {}
	},
	forms: {
		type: Object as PropType<SearchForm>
	},
	columns: {
		type: Array as PropType<DataTableColumn[]>,
		default: () => []
	},
	data: {
		type: Array as PropType<Recordable[]>
	},
	bordered: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	bottomBordered: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	loading: {
		type: Boolean as PropType<boolean>
	}
} as const

export type ProTableProps = ExtractPropTypes<typeof basicProps>
