<script lang="ts" setup>
import { ref, Ref } from 'vue'
import TableForm from './components/TableForm'

import type { FormSchema } from './type'
const schemas: Ref<FormSchema[]> = ref([
	{
		component: 'Input',
		defaultValue: 'xx',
		valueField: 'statementNo',
		label: '支付宝流水号&银行付款账号',
		placeholder: '支付宝流水号&银行付款账'
	},
	{ valueField: 'payUserName', label: '付款人', placeholder: '付款人' },
	{ valueField: 'customerName', label: '客户名称', placeholder: '客户名称' },
	{ valueField: 'importNo', label: '导入批次', placeholder: '导入批次' },
	{ valueField: 'belongCompanyCode', component: 'Select', label: '签约主体', placeholder: '请选择签约主体', options: [{ label: '第一公司', value: 1 }, { label: '第二公司', value: 2 }] },
	{ valueField: ['startTime', 'endTime'], component: 'DatePicker', label: '查询日期', startPlaceholder: '开始日期(start)', endPlaceholder: '结束日期(end)', type: 'daterange', format: 'yyyy-MM-dd' }
])
const onSubmit = (values: any) => { console.log(values) }
</script>

<template>
	<TableForm :schemas="schemas" :on-submit="onSubmit" />
</template>
