import { computed, ref, unref } from 'vue'
import type { PaginationProps } from 'naive-ui'
import type { ProTableProps } from '../props'

export function usePagination(getProps: ProTableProps) {

	const paginationRef = ref<Partial<PaginationProps>>({})
	const getPagination = computed(() => {

		return {
			page: 0,
			itemCount: 0,
			pageSize: 0,
			pageSizes: [10, 20, 50],
			showSizePicker: true,
			showQuickJumper: true,
			...paginationRef.value
		}
	})

	function setPagination(info: Partial<PaginationProps>) {
		const paginationInfo = unref(getPagination)
		paginationRef.value = {
			...paginationInfo,
			...info
		}
	}

	return { getPagination, setPagination }
}
