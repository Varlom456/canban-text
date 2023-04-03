<template>
	<select
		name="project"
		class="bg-indigo-100 rounded h-10 p-2"
		:value="selectedProject"
		@change="
				(e:any) => {
					if (e.target) $emit('update:selectedProject', e.target.value)
				}
			"
	>
		<option v-for="project in projects" :value="project.code">
			{{ project.name }}
		</option>
	</select>
</template>

<script setup lang="ts">
import { getProjects } from '@/api/base'
import { IProjects } from '@/interface/project'
import { defineEmits, onMounted, ref, watchEffect } from 'vue'

const projects = ref<IProjects | null>(null)
const localProjects = ref(localStorage.getItem('projects'))
const props = defineProps({
	selectedProject: {
		type: String,
	},
})

defineEmits(['update:selectedProject'])

watchEffect(() => {
	if (typeof localProjects.value === 'string') {
		projects.value = JSON.parse(localProjects.value)
	}
})

onMounted(async () => {
	await getProjects()
})
</script>

<style scoped></style>
