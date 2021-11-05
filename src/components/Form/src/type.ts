import type { FormItemProps } from 'naive-ui'
import type { ComponentType } from './utils/componentMap'

export type Recordable = Record<string, any>

export type FormSchema = {
	label: string;
	defaultValue?: any;
	valueField: string | [string, string];
	component: ComponentType;
	placeholder?: string;
	options?: Array<{label: string, value: any}>;
	type?: 'date' | 'datetime' | 'daterange' |'datetimerange' |'month';
	startPlaceholder?: string; // daterange的时候第一个的placeholder
	endPlaceholder?: string; // daterange的时候第二个的placeholder
	format?: string;
}& FormItemProps

export interface FormatFormSchema extends FormSchema {
	fieldMapToTime?: [string, string], // daterange的 参数映射
}

export interface FormActionType {
	submit: ()=> Promise<void>;
	getFieldsValue: ()=> Recordable;
}
