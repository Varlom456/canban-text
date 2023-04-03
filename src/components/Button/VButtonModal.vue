<template>
	<div class="w-64">
		<VButton :title="'Добавить'" :handler="() => (modalOpen = !modalOpen)" />
	</div>
	<teleport to="body">
		<div
			v-if="modalOpen"
			class="modal absolute w-full h-full bg-black bg-opacity-30 top-0 bottom-0 flex justify-center items-center"
		>
			<div class="relative p-8 bg-white w-96">
				<button
					@click="() => (modalOpen = false)"
					class="absolute top-2 right-2"
				>
					<XMarkIcon
						class="h-6 w-6 fill-slate-700 hover:fill-indigo-800 active:fill-slate-700"
					/>
				</button>
				<div class="">
					<form action="">
						<label for="title" class="flex flex-col">
							<span class="mb-2 mt-4">Заголовок*</span>
							<input
								v-model="title"
								type="text"
								name="title"
								class="bg-indigo-100 rounded h-8 p-2"
							/>
						</label>
						<label for="project" class="flex flex-col">
							<span class="mb-2 mt-4">Проект*</span>
							<VProjectSelect v-model="project" />
						</label>
						<label for="score" class="flex flex-col">
							<span class="mb-2 mt-4">Балл*</span>
							<input
								v-model="score"
								type="number"
								name="score"
								class="bg-indigo-100 rounded h-8 p-2"
							/>
						</label>
					</form>
					<VButton class="mt-4" :title="'Добавить'" :handler="onSubmit" />
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { addCards } from '@/api/base'
import VButton from '@/components/Button/VButton.vue'
import VProjectSelect from '@/components/VProjectSelect/VProjectSelect.vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { onMounted, ref, watch } from 'vue'

const modalOpen = ref(false)
const title = ref('')
const score = ref(0)
const project = ref('project-1')

const emit = defineEmits(['update:selectedProject'])

onMounted(() => {
	emit('update:selectedProject', project.value)
})

watch(project, (newValue, oldValue) => {
	emit('update:selectedProject', newValue)
})

const onSubmit = () => {
	addCards({ title: title.value, project: project.value, score: score.value })
}
</script>

<style scoped></style>
