import { defineComponent, ref, unref, computed } from 'vue'
import { NDataTable } from 'naive-ui'
import TableForm from '../../Form/src/Form'
import { basicProps } from './props'
// import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useLoading } from './hooks/useLoading'
import type { ProTableProps } from './props'

export default defineComponent({
	name: 'ProTable',
	props: basicProps,
	setup(props, { emit }) {
		const innerPropsRef = ref<Partial<ProTableProps>>()

		const getProps = computed(() => {
			return { ...props, ...unref(innerPropsRef) } as ProTableProps
		})

		const columns = useColumns(getProps)
		const { setLoading, getLoading } = useLoading(getProps)
		// const { getPagination, setPagination } = usePagination(getProps)

		const getBindValues = computed(() => {
			return {
				columns,
				loading: unref(getLoading)

			}
		})

		return { getBindValues }
	},

	render() {
		const { getBindValues } = this

		return (
			<>
				<TableForm />
				<NDataTable {...getBindValues} />
			</>
		)
	}
})
