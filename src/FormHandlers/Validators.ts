type TValidate = (str: any) => boolean | string;
export const fakeValidate: TValidate = (obj: any) => {
	console.log('obj', obj);
	return true;
};

export const validatePassword = (value: string) => {
	if (value.match(/^matia|filip$/i)) {
		return `Protected word`;
	}
	return true;
};

export const passwordValidator: TValidate = (value: string) => {
	if (value.match(/^matia|filip$/i)) {
		return `Protected word`;
	}
	return true;
};
export const emailValidator: TValidate = (value: string) => {
	if (value === 'fake@fake.com') {
		return 'Protected email';
	}
	return true;
};
export const nameValidator: TValidate = (value: string) => {
	// dash must be between at least two chars
	if (
		value
			.split('-')
			.reduce((min, c) => (c.length < min ? c.length : min), 100) < 2
	) {
		return 'Min 2 chars around a dash';
	}
	if (value.match(/[^A-Za-z- ]/)) {
		return 'Only letters spaces and dashes';
	}
	return true;
};
