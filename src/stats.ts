export const mean = (fitnesses: number[]): number => fitnesses.reduce((a, b) => a + b, 0) / fitnesses.length;
export const min = (fitnesses: number[]): number => fitnesses.reduce((a, b) => a < b ? a : b, +Infinity);
export const max = (fitnesses: number[]): number => fitnesses.reduce((a, b) => a > b ? a : b, -Infinity);
