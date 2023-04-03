<template>
	<li class="card bg-white rounded p-4 curs cursor-grab">
		<div class="card-container">
			<header>
				<h2 class="text-base">{{ card.title }}</h2>
			</header>
			<div class="card-content">
				<div class="card-score flex">
					<span>Балл</span>
					<span class="font-semibold ml-2">{{ card.score }}</span>
				</div>
			</div>
		</div>
	</li>
</template>

<script setup lang="ts">
import { ICard } from '@/interface/card'
interface Props {
	card: ICard
}
const props = defineProps<Props>()
</script>

<style scoped></style>
