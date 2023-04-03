<template>
	<article
		class="column p-4 w-64 bg-indigo-200 rounded"
		:id="column.id.toString()"
	>
		<div class="column-container flex flex-col justify-between gap-2 h-full">
			<header class="column-header flex justify-between mb-2">
				<h1 class="text-base font-bold">{{ column.name }}</h1>
				<button @click="() => sortBy(orderBy)">
					<ArrowsUpDownIcon
						class="h-6 w-6 fill-slate-700 hover:fill-indigo-800 active:fill-slate-700"
					/>
				</button>
			</header>
			<div class="flex flex-col grow gap-2 justify-start">
				<draggable
					class="list-group flex flex-col grow gap-2 justify-start"
					:list="filteredCards"
					@change="checkMove"
					tag="ul"
					itemKey="id"
				>
					<template #item="{ element }">
						<ColumnCard
							class="list-group-item"
							:card="element"
							:key="element.id"
						/>
					</template>
				</draggable>
			</div>
			<footer class="column-footer">
				<VButton :title="'Добавить'" :handler="() => {}" />
			</footer>
		</div>
	</article>
</template>

<script setup lang="ts">
import { getCards } from '@/api/base'
import VButton from '@/components/Button/VButton.vue'
import ColumnCard from '@/components/Column/ColumnCard.vue'
import { ICard, ICards } from '@/interface/card'
import { IColumn } from '@/interface/column'
import { ArrowsUpDownIcon } from '@heroicons/vue/20/solid'
import { onMounted, ref, watch } from 'vue'
import draggable from 'vuedraggable'

interface Props {
	column: IColumn
	selectedProject: string
}
const props = defineProps<Props>()
const cards = ref<ICards | []>([])
const filteredCards = ref<ICards | []>([])
let orderBy = ref('asc')
const localCards = ref(localStorage.getItem('cards'))

onMounted(async () => {
	getCards()
	if (typeof localCards.value === 'string') {
		cards.value = JSON.parse(localCards.value)
		filteredCards.value = cards.value
			.filter((card: ICard) => card.stage === props.column.code)
			.filter((card: ICard) => card.project === props.selectedProject)
	}
})

watch(
	() => props.selectedProject,
	newValue => {
		if (typeof localCards.value === 'string') {
			const filterCards = cards.value
				.filter((card: ICard) => card.stage === props.column.code)
				.filter((card: ICard) => {
					if (card.project === newValue) {
						return true
					}
				})
			filteredCards.value = filterCards
		}
	}
)

const checkMove = (e: any) => {}

const switchOrder = (order: string) => {
	if (order === 'asc') orderBy.value = 'desc'
	if (order === 'desc') orderBy.value = 'asc'
}

const sortBy = (order: string) => {
	if (orderBy.value === 'asc') {
		switchOrder(order)
		return cards.value.sort((a: ICard, b: ICard) => {
			if (a.score < b.score) return -1
			if (a.score > b.score) return 1
			return 0
		})
	} else if (orderBy.value === 'desc') {
		switchOrder(order)
		return cards.value.sort((a: ICard, b: ICard) => {
			if (a.score < b.score) return 1
			if (a.score > b.score) return -1
			return 0
		})
	}
}
</script>

<style scoped></style>
