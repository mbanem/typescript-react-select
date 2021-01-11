import { IRegister, IUserData } from '../../Models/Interfaces/index';

import React from 'react';

export const RegisterUser = ({
	firstName,
	lastName,
	street,
	city,
	zip,
	phone,
	userId,
	password,
}: IRegister): boolean => {
	const userData: IUserData = {
		firstName,
		lastName,
		street,
		city,
		zip,
		phone,
	};
	console.log('usedData', userData);
	return true;
};
