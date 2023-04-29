export const crossOnePoint = <TGene>(a: TGene[], b: TGene[]): [TGene[], TGene[]] => {
	const index = Math.floor(Math.random() * a.length);
	return [
		[...a.slice(0, index), ...b.slice(index)],
		[...b.slice(0, index), ...a.slice(index)]
	];
};

export const crossTwoPoint = <TGene>(a: TGene[], b: TGene[]): [TGene[], TGene[]] => {
	let index1 = Math.floor(Math.random() * a.length);
	let index2 = Math.floor(Math.random() * a.length-1);

	if(index2 >= index1) {
		index2++;
	} else {
		[index1, index2] = [index2, index1];
	}

	return [
		[...a.slice(0, index1), ...b.slice(index1, index2), ...a.slice(index2)],
		[...b.slice(0, index1), ...a.slice(index1, index2), ...b.slice(index2)],
	];
};

export const crossUniform = (cross_prob: number) => {
	if(cross_prob < 0 || cross_prob > 1) throw new Error('cross_prob must be between 0 and 1');
	return <TGene>(a: TGene[], b: TGene[]): [TGene[], TGene[]] => {
		const cross_loc = a.map(() => Math.random() < cross_prob);
		return [
			a.map((value, index) => cross_loc[index] ? b[index] : value),
			b.map((value, index) => cross_loc[index] ? a[index] : value),
		];
	};
};
