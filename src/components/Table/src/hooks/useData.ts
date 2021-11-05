import { ref, unref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ProTableProps } from '../props'

export function useData(getProps: ComputedRef<ProTableProps>) {

	const tableDataRef = ref<Recordable[]>([])

	const getTableData = computed(() => {
		const tableData = unref(tableDataRef)
		if (!tableData || tableData.length === 0) return []

		return tableData
	})

	const fetch = async() => {

	}

	function setTableData<T = Recordable>(values: T[]) {
		tableDataRef.value = values
	}

	return {
		getTableData

	}
}
