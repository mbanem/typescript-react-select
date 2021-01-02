export const formatCurrency = (num: number) => {
	const dec = ['.00', '0', ''];
	const number = Math.round(num * 100) / 100;
	const m = number.toLocaleString().match(/(\d+)\.?(\d*)?/);
	if (m) {
		const length = m[2] ? m[2].length : 0;
		return `$${number}${dec[length]}`;
	}
	throw new Error(`formatCurrency: invalid entry ${num}`);
};
