<template>
	<header class="flex justify-between items-center gap-4 mb-4">
		<h2 class="text-xl font-bold">Карточки</h2>
		<div class="flex gap-4 items-center">
			<label for="project" class="flex gap-2 items-center">
				<span>Проект</span>
				<VProjectSelect
					:selectedProject="selectedProject"
					@update:selectedProject="setProject"
				/>
			</label>
			<VButtonModal />
		</div>
	</header>
</template>

<script setup lang="ts">
import VButtonModal from '@/components/Button/VButtonModal.vue'
import VProjectSelect from '@/components/VProjectSelect/VProjectSelect.vue'
import { defineEmits } from 'vue'

interface Props {
	selectedProject: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:selectedProject'])
const setProject = (value: string) => {
	emit('update:selectedProject', value)
}
</script>

<style lang="scss" scoped></style>
