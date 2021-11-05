import { computed, ref, unref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { ProTableProps } from '../props'

export function useLoading(getProps: ComputedRef<ProTableProps>) {
	const loadingRef = ref(false)

	const getLoading = computed(() => unref(loadingRef))

	const setLoading = (loading: boolean) => {
		loadingRef.value = loading
	}

	watch(() => unref(getProps).loading, (value) => {
		loadingRef.value = value as boolean
	})

	return { getLoading, setLoading }
}
