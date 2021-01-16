import { IRegister, IUserData } from '../../Models/Interfaces/index';

import React from 'react';

export const RegisterUser = ({
	firstName,
	lastName,
	address,
	city,
	zip,
	phone,
	userId,
	password,
}: IRegister): boolean => {
	console.log('usedData', userData);
	return true;
};
