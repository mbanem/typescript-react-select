import * as VAL from './Validators2';

import { IFormSpecs, TSubmit, TUpdateState } from './Interfaces';

export const userFormSpecs = (
	onSubmit: TSubmit,
	state?: any,
	updateState?: TUpdateState
): IFormSpecs => {
	// const stateItems: IStateItem[] = [];
	const formSpecs: IFormSpecs = {
		formId: 'testForm',
		// todo check if this should be in use
		className: 'test-form',
		fieldDefs: [
			{
				htmlType: 'input',
				type: 'text',
				name: 'firstName',
				errorClass: 'error-class',
				placeholder: 'enter First Name',
				onChange: updateState,
				registerBody: {
					required: 'First name is required',
					validate: VAL.nameValidator,
					minLength: {
						value: 2,
						message: 'Min length is 2 chars',
					},
					maxLength: {
						value: 20,
						message: 'Max length is 18 chars',
					},
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'lastName',
				errorClass: 'error-class',
				placeholder: 'enter last name',
				onChange: updateState,
				registerBody: {
					required: 'Last name is required',
					validate: VAL.nameValidator,
					minLength: {
						value: 2,
						message: 'Min length is 3 chars',
					},
					maxLength: {
						value: 20,
						message: 'Max length is 20 chars',
					},
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'address',
				onChange: updateState,
				errorClass: 'error-class',
				registerBody: {
					required: 'address is required',
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'city',
				onChange: updateState,
				errorClass: 'error-class',
				registerBody: {
					required: 'City is required',
					minLength: {
						value: 2,
						message: 'Min length is 2 chars',
					},
					maxLength: {
						value: 20,
						message: 'Max length is 20 chars',
					},
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'zip',
				onChange: updateState,
				errorClass: 'error-class',
				registerBody: {
					required: 'Zip is required',
					pattern: {
						value: /^\d{5}\s?\d{0,4}?$/,
						message: 'Like XXXXX or XXXXX XXXX',
					},
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'phone',
				onChange: updateState,
				errorClass: 'error-class',
				registerBody: {
					required: 'Phone is required',
					pattern: {
						// value: /^\d{3,3} \d{3,3} \d{4,4}$/,
						value: /^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
						message: 'Incorrect phone format',
						// /^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/
					},
				},
			},
			{
				htmlType: 'input',
				type: 'text',
				name: 'email',
				onChange: updateState,
				errorClass: 'error-class',
				placeholder: 'this will be your UserID',
				registerBody: {
					pattern: {
						value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
						message: 'email structure is incorrect',
					},
					required: 'email is required',
					validate: VAL.emailValidator,
				},
			},
			{
				htmlType: 'input',
				type: 'password',
				name: 'password',
				onChange: updateState,
				errorClass: 'error-class',
				registerBody: {
					required: 'password is required',
					validate: VAL.passwordValidator,
					minLength: {
						value: 5,
						message: 'Min length is 5 chars',
					},
					maxLength: {
						value: 20,
						message: 'Max length is 20 chars',
					},
				},
			},
		],
	};
	// formSpecs.fieldDefs.forEach((fd) => {
	// 	if (fd.onChange) {
	// 		stateItems.push({ fd.name, value: null });
	// 	}
	// });
	// const stateFormSpecs: IStateFormSpecs = { formSpecs };
	return formSpecs;
};
