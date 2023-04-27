export type CrossFunction<TGene> = (a: TGene, b: TGene) => TGene;
export type MutateFunction<TGene> = (gene: TGene) => TGene;
export type FitnessFunction<TGene> = (gene: TGene) => number;
