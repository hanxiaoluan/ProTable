import type { ComputedRef } from 'vue'
import type { ProTableProps } from '../props'

export function useColumns(getProps: ComputedRef<ProTableProps>) {

	if (!getProps.value.columns) throw new Error('columns是必传项')

	return getProps.value.columns
}

