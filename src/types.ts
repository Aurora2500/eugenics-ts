export type SelectFunction<TGene> = (genes: TGene[], fitnesses: number[], k: number) => [population: TGene[], fitnesses: number[]];
export type CrossFunction<TGene> = (a: TGene, b: TGene) => [TGene, TGene];
export type MutateFunction<TGene> = (gene: TGene) => TGene;
export type FitnessFunction<TGene> = (gene: TGene) => number;

export type AlgorithmParameters<TGene> = {
	selection: SelectFunction<TGene>,
	crossover?: CrossFunction<TGene>,
	mutation?: MutateFunction<TGene>,
	fitness: FitnessFunction<TGene>,
};

export type AlgorithmOptions<TGene, Stats extends string> = {
	ngen: number,
	crossover_prob: number,
	mutation_prob: number,
	stats?: StatsFunctions<TGene, Stats>
};


export type StatsFunctions<TGene, LogKeys extends string> = {
	[Key in LogKeys]: (fitnesses: number[], population: TGene[]) => number;
};

export type StatsResults<LogKeys extends string> = {
	[Key in LogKeys | 'gen']: number;
};

export type EvolutionResult<TGene, Stats extends string> = {
	population: TGene[],
	fitnesses: number[],
	stats: StatsResults<Stats>[],
	hallOfFame?: TGene[],
};

export type EvolutionFunction<TGene, Stats extends string> = (
	population: TGene[],
	parameters: AlgorithmParameters<TGene>,
	options?: Partial<AlgorithmOptions<TGene, Stats>>
) => EvolutionResult<TGene, Stats>;