import type { MutateFunction } from '../types';
import { sampleNorm } from '../util.js';

export const mutFlipBit = (flip_prob: number): MutateFunction<boolean[]> => {
	if(flip_prob < 0 || flip_prob > 1) throw new Error('flip_prob must be between 0 and 1');
	return (gene: boolean[]): boolean[] =>  gene.map(value => Math.random() < flip_prob ? !value : value);
};

export const mutGaussian: MutateFunction<number[]> = (gene: number[]): number[] => {
	return gene.map(value => value + sampleNorm(0, 1));
};