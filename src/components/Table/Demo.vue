<script lang="ts" setup>
import { reactive, ref } from 'vue'
import ProTable from './src/ProTable'
const forms = reactive({
	inline: true,
	schemas: [
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
	]
})
const columns = ref([
	{
		title: '支付宝流水号&银行付款账号',
		key: 'statementNo'
	},
	{
		title: '付款人',
		key: 'payUserName'
	},
	{
		title: '客户名称',
		key: 'customerName'
	},
	{
		title: '导入批次',
		key: 'importNo'
	},
	{
		title: '签约主体',
		key: 'belongCompanyCode'
	}
])

const fetch = async() => {
	return {
		pageList: [{ statementNo: '1140279968@qq.com', payUserName: '马云', customerName: '小白', importNo: '第一批', belongCompanyCodeDesc: '第一公司' }],
		page: 1,
		pageSize: 10,
		totalSize: 1
	}
}

const paginationSetting = reactive({
	pageField: 'page', pageSizeField: 'pageSize', listField: 'pageList', totalField: 'totalSize',
	pageSizes: [10, 20, 50]
})
</script>

<template>
	<ProTable :fetch="fetch" :columns="columns" :forms="forms" :pagination-setting="paginationSetting" />
</template>
