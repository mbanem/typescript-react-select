export const capitalize = (str: string) => {
	return str.toLowerCase().replace(/\b\w/g, (char: string) => {
		return char.toUpperCase();
	});
};
