import { DeepMap, FieldError } from 'react-hook-form';

// --------- FORM ----------
export type TSubmit = (data: Object) => void;
export type TUpdateState = ({
	target: { name, value },
}: React.ChangeEvent<HTMLInputElement>) => void;
export type TChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
// export type TChangeHandler = React.ChangeEvent<HTMLInputElement>;
export interface IFieldDefs {
	htmlType: string;
	id?: string | number;
	type: string;
	name: string;
	group?: string[]; // labels for radios
	className?: string;
	errorClass?: string;
	placeholder?: string;
	checked?: boolean;
	value?: string;
	registerBody: Object;
}
export interface IFormProps {
	formId: string;
	className: string;
	onSubmit: (data: Object) => any;
	validatePassword: (str: string) => boolean | string;
	fieldDefs: IFieldDefs[];
}
export type TErrors = DeepMap<Record<string, any>, FieldError>;
// ----------- USER DATA ---------------
export interface IUserData {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	zip: number;
	phone: string;
}
export interface IRegisterUser {
	userData: IUserData;
	userId: string;
	password: string;
}
export interface ILoginUser {
	userId: string;
	password: string;
}

export interface IFieldSpecs {
	htmlType: string;
	id?: string | number;
	type: string;
	name: string;
	group?: string[]; // labels for radios
	className?: string;
	errorClass?: string;
	placeholder?: string;
	checked?: boolean;
	value?: string;
	onChange?: (value: any) => void;
	registerBody: Object;
}
export interface IFormSpecs {
	formId: string;
	className: string;
	fieldDefs: IFieldSpecs[];
}
