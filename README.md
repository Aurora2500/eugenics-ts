# Eugenics

Eugenics is an immutable typescript library for genetic algorithms.
It is designed to be used in a functional programming style,
returning new objects instead of mutating existing ones for libraries like React or Redux.

The library has been inspired by Python's [DEAP](https://github.com/deap/deap]) library.

## Installation

```bash
npm install eugenics
```

## Usage

### Knapsack problem

Here's an example implementation of the knapsack problem using `eugenics`.

```typescript
import { crossTwoPoint, mutFlipBit, selTournament, evolveSimple } from 'eugenics';

const generateProblem = n => {
	const weights = [];
	const values = [];
	for (let i = 0; i < n; i++) {
		weights.push(Math.ceil(Math.random() * 10 + 5));
		values.push(Math.ceil(Math.random() * 10 + 5));
	}
	return { weights, values };
};
const max_weight = 40;
const problem = generateProblem(10);

const fitness = (individual: boolean[]) => {
	let weight = 0;
	let value = 0;
	for (let i = 0; i < individual.length; i++) {
		if (individual[i]) {
			weight += problem.weights[i];
			value += problem.values[i];
		}
	}
	if (weight > max_weight) {
		return 0;
	}
	return value;
};

const population = Array.from({ length: 100 }, () =>
	Array.from({ length: problem.weights.length }, () => Math.random() > 0.5)
);

const {population: newPopulation} = evolveSimple(population, {
	fitness,
	crossover: crossTwoPoint,
	mutation: mutFlipBit(0.05),
	selection: selTournament,
}, {
	ngen: 100
});
```

## Contributing

To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Push your changes to your fork
5. Submit a pull request