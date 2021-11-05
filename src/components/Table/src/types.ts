import { FormProps } from '../../Form/src/props'

export type SearchForm = Pick<FormProps, 'inline'|'itemWidth'|'labelAlign'|'schemas'|'size'>

export interface PaginationSetting {
	// 请求接口当前页数
	pageField: string;
	// 每页显示多少条
	pageSizeField: string;
	// 请求结果列表字段
	listField: string;
	// 请求结果总数字段
	totalField: string;
	// 分页条数控制
	pageSizes: Array<number>;
}
