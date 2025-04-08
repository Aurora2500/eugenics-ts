import type { AlgorithmOptions, AlgorithmParameters, EvolutionResult, StatsFunctions, StatsResults } from '../types';
import { mapObj } from '../util.js';

export const defaultOptions = {
	ngen: 1,
	crossover_prob: 0.5,
	mutation_prob: 0.2,
} satisfies AlgorithmOptions<unknown, never>;

export const evolveSimple = <TGene, Stats extends string>(population: TGene[], parameters: AlgorithmParameters<TGene>, options?: Partial<AlgorithmOptions<TGene, Stats>>): EvolutionResult<TGene, Stats> => {
	const {fitness, selection, crossover, mutation} = parameters;
	const {ngen, crossover_prob, mutation_prob, stats:statsFuncs={} as StatsFunctions<TGene,Stats>} = {...defaultOptions, ...options};

	let newPopulation = [...population];
	let fitnesses = newPopulation.map(fitness);
	const stats: StatsResults<Stats>[] = [];

	for (let i = 0; i < ngen; i++) {
		const [selectedPopulation, selectedFitnesses] = selection(newPopulation, fitnesses, newPopulation.length);
		if(crossover) {
			for(let j = 0; j < selectedPopulation.length - (selectedPopulation.length % 2); j += 2) {
				if (Math.random() < crossover_prob) {
					const [a, b] = crossover(selectedPopulation[j], selectedPopulation[j + 1]);
					selectedPopulation[j] = a;
					selectedPopulation[j + 1] = b;
					selectedFitnesses[j] = mutation === undefined ? fitness(a) : NaN;
					selectedFitnesses[j + 1] = mutation === undefined ? fitness(b) : NaN;
				}
			}
		}
		if(mutation) {
			for(let j = 0; j < selectedPopulation.length; j++) {
				if (Math.random() < mutation_prob) {
					selectedPopulation[j] = mutation(selectedPopulation[j]);
					selectedFitnesses[j] = fitness(selectedPopulation[j]);
				} else {
					if(isNaN(selectedFitnesses[j])) selectedFitnesses[j] = fitness(selectedPopulation[j]);
				}
			}
		}
		newPopulation = selectedPopulation;
		fitnesses = selectedFitnesses;

		stats.push({
			gen: i,
			...mapObj(statsFuncs, (func: (fitnesses: number[], pop: TGene[]) => number) => func(fitnesses, newPopulation))
		});
	}

	return {
		population: newPopulation,
		fitnesses,
		stats
	};
};