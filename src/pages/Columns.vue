<template>
	<div class="flex gap-4">
		<Column
			v-for="column in columns"
			:column="column"
			:selectedProject="selectedProject"
		/>
	</div>
</template>

<script setup lang="ts">
import { getColumns } from '@/api/base'
import Column from '@/components/Column/Column.vue'
import { IColumns } from '@/interface/column'
import { onMounted, ref, watch, watchEffect } from 'vue'

interface Props {
	selectedProject: string
}
const props = defineProps<Props>()

const columns = ref<IColumns | null>(null)
const localColumns = ref(localStorage.getItem('columns'))

watchEffect(() => {
	if (typeof localColumns.value === 'string') {
		columns.value = JSON.parse(localColumns.value)
	}
})

onMounted(async () => {
	await getColumns()
})

watch
</script>

<style scoped></style>
