import { argmax } from 'util.js';

export const selRandom = <TGene>(population: TGene[], fitnesses: number[], k: number): [TGene[], number[]] => {
	const selected: TGene[] = [];
	const selectedFitnesses: number[] = [];
	for(let i = 0; i < k; i++) {
		const index = Math.floor(Math.random() * population.length);
		selected.push(population[index]);
		selectedFitnesses.push(fitnesses[index]);
	}
	return [selected, selectedFitnesses];
};

export const selBest = <TGene>(population: TGene[], fitnesses: number[], k: number): [TGene[], number[]] => {
	const fitness_copy = [...fitnesses];
	const selected: TGene[] = [];
	const selectedFitnesses: number[] = [];
	for(let i = 0; i < k; i++) {
		const index = argmax(fitness_copy, value => value);
		selected.push(population[index]);
		selectedFitnesses.push(fitnesses[index]);
		fitnesses[index] = -Infinity;
	}
	return [selected, selectedFitnesses];
};

export const selRoulette = <TGene>(population: TGene[], fitnesses: number[], k: number): [TGene[], number[]] => {
	const ordered_pop_fitness = population.map((value, index) => [value, fitnesses[index]] as const).sort((a, b) => b[1] - a[1]);
	const selected: TGene[] = [];
	const selectedFitnesses: number[] = [];
	const total_fitness = fitnesses.reduce((a, b) => a + b, 0);
	for(let i = 0; i < k; i++) {
		const r = Math.random() * total_fitness;
		let sum = 0;
		for(let j = 0; j < ordered_pop_fitness.length; j++) {
			sum += ordered_pop_fitness[j][1];
			if(sum >= r) {
				selected.push(ordered_pop_fitness[j][0]);
				selectedFitnesses.push(ordered_pop_fitness[j][1]);
				break;
			}
		}
	}
	return [selected, selectedFitnesses];
};



export const selTournament = <TGene>(population: TGene[], fitnesses: number[], k: number): [TGene[], number[]] => {
	const selected: TGene[] = [];
	const selectedFitnesses: number[] = [];
	for(let i = 0; i < k; i++) {
		const index1 = Math.floor(Math.random() * population.length);
		const index2 = Math.floor(Math.random() * population.length);
		selected.push(fitnesses[index1] > fitnesses[index2] ? population[index1] : population[index2]);
		selectedFitnesses.push(fitnesses[index1] > fitnesses[index2] ? fitnesses[index1] : fitnesses[index2]);
	}
	return [selected, selectedFitnesses];
};