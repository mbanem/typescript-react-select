export const validatePassword = (str: string) => {
	// min of 8 chars with at least one uppercase,
	// one lowercase and one special char
	const lnt1 = str.length;
	const lnt2 = str.replace(/[A-Z]/g, '').length;
	const lnt3 = str.replace(/[A-Z0-9]/g, '').length;
	return lnt1 >= 8 && lnt1 > lnt2 && lnt2 > lnt3;
};
