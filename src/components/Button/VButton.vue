<template>
	<button
		class="w-full p-1 rounded bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white h-10"
		@click="handler"
	>
		{{ title }}
	</button>
</template>

<script setup lang="ts">
interface Props {
	title: string
	handler: () => void
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
