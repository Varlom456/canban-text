export const getColumns = async () => {
	setTimeout(async () => {
		const data = await fetch('http://localhost:3001/columns')
		const json = await data.json()

		localStorage.setItem('columns', JSON.stringify(json))
	}, 2000)
}

export const getProjects = async () => {
	const data = await fetch('http://localhost:3001/projects')
	const json = await data.json()
	localStorage.setItem('projects', JSON.stringify(json))
}

export const getCards = async () => {
	const data = await fetch('http://localhost:3001/cards')
	const json = await data.json()
	localStorage.setItem('cards', JSON.stringify(json))
}

export const addCards = ({
	project,
	title,
	score,
}: {
	project: string
	title: string
	score: number
}) => {
	const raw = localStorage.getItem('cards')
	let result = []
	if (typeof raw === 'string') {
		result = [...JSON.parse(raw)]
		const newCardID = result[result.length - 1].id + 1

		result.push({
			id: newCardID,
			stage: 'stage-1',
			project,
			title,
			score,
		})

		localStorage.setItem('cards', JSON.stringify(result))
	}
}
