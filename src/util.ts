
/**
 * Samples a random number from a normal distribution with mean mu and standard deviation sigma.
 * @param mu the mean
 * @param sigma the standard deviation
 */
export const sampleNorm = (mu: number, sigma: number): number => {
	const u1 = 1 - Math.random();
	const u2 = Math.random();
	const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
	return z0 * sigma + mu;
};

export const argmax = <T>(array: T[], key: (value: T) => number): number => {
	let max = -Infinity;
	let max_index = -1;
	for(let i = 0; i < array.length; i++) {
		const value = key(array[i]);
		if(value > max) {
			max = value;
			max_index = i;
		}
	}
	return max_index;
};

/**
 * Returns the indices of the array sorted by the key function.
 * @param array 
 * @param key 
 */
export const argsort = <T>(array: T[], key: (value: T) => number): number[] => {
	const indices = [...array.keys()];
	return indices.sort((a, b) => key(array[a]) - key(array[b]));
};

export const mapObj = <T, U, S extends string=string>(obj: {[key in S]: T}, func: (value: T, key: S) => U): {[key in S]: U} => {
	const result: {[key in S]: U} = {} as {[key in S]: U};
	for(const key in obj) {
		result[key] = func(obj[key], key);
	}
	return result;
};