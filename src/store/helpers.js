export let calculateFactor = (auto, correction) =>{
	let decimals = 3;
	let decimalFactor = 10 ** decimals;
	let fontSize = 72;

	let total = auto - correction;

	return Math.round((total / fontSize) * decimalFactor) / decimalFactor;
}