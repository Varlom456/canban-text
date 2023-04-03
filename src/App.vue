<template>
	<main class="p-4 h-screen">
		<VHeader
			@update:selectedProject="setProject"
			:selectedProject="selectedProject"
		/>
		<Columns :selectedProject="selectedProject" />
	</main>
</template>

<script lang="ts" setup>
import VHeader from '@/components/VHeader/VHeader.vue'
import Columns from '@/pages/Columns.vue'
import { ref } from 'vue'

const selectedProject = ref('project-1')

const setProject = (value: string) => {
	selectedProject.value = value
}
</script>

<style scoped></style>
