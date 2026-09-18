// Classic "nice numbers" axis-tick algorithm (Heckbert), producing round
// step sizes (1/2/5 × 10^n) instead of raw linear divisions of the data range.
function niceNumber(range: number, round: boolean): number {
	const exponent = Math.floor(Math.log10(range));
	const fraction = range / Math.pow(10, exponent);
	let niceFraction: number;

	if (round) {
		if (fraction < 1.5) niceFraction = 1;
		else if (fraction < 3) niceFraction = 2;
		else if (fraction < 7) niceFraction = 5;
		else niceFraction = 10;
	} else {
		if (fraction <= 1) niceFraction = 1;
		else if (fraction <= 2) niceFraction = 2;
		else if (fraction <= 5) niceFraction = 5;
		else niceFraction = 10;
	}

	return niceFraction * Math.pow(10, exponent);
}

export function getNiceTicks(
	min: number,
	max: number,
	targetTickCount = 6
): number[] {
	if (min === max) return [min];

	const range = niceNumber(max - min, false);
	const step = niceNumber(range / (targetTickCount - 1), true);
	const niceMin = Math.floor(min / step) * step;
	const niceMax = Math.ceil(max / step) * step;

	const ticks: number[] = [];
	for (let value = niceMin; value <= niceMax + step / 2; value += step) {
		ticks.push(Number(value.toFixed(10)));
	}
	return ticks;
}
