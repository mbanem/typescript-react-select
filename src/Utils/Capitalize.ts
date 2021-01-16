// import TChangeHandler from '../Models/Interfaces';
export const capitalizeName = (str: string) => {
	return (
		str
			.replace(/\s*([A-Z]+)/g, ' $1')
			// .toLowerCase()
			.replace(/\b\w/g, (char: string) => {
				return char.toUpperCase();
			})
	);
};
export const capitalize = (value: string) => {
	value = value.replace(/[^A-Za-z -]/g, '');
	return value.replace(/^[a-z]|[ -][a-z]/g, (c) => c.toUpperCase());
};

// the 1st and any letter after space or dash to uppercase
export const capitalizeOnEvent = ({
	target: { name, value },
}: React.ChangeEvent<HTMLInputElement>) => {
	const val = value.replace(/^[a-z]|[ -][a-z]/g, (c) => c.toUpperCase());

	console.log('val', val);
	return val;
};
