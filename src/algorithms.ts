export const crossOnePoint = <TGene>(a: TGene[], b: TGene[]): TGene[] => {
	const index = Math.floor(Math.random() * a.length);
	return [...a.slice(0, index), ...b.slice(index)];
};

export const crossTwoPoint = <TGene>(a: TGene[], b: TGene[]): TGene[] => {
	const index1 = Math.floor(Math.random() * a.length);
	const index2 = Math.floor(Math.random() * a.length);
	return [...a.slice(0, index1), ...b.slice(index1, index2), ...a.slice(index2)];
};