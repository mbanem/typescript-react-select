import { DeepMap, FieldError } from 'react-hook-form';
export type IProduct = {
	id: number;
	title: string;
	image: string;
	description: string;
	price: number;
	availableSizes: string[];
};
export type IData = {
	products: IProduct[];
};
export interface ISizeQuantity {
	size: string;
	quantity: number;
}
export interface ICartItem {
	productId: number;
	sizeQuantity: ISizeQuantity[];
}
export interface ICart {
	items: ICartItem[];
	numberOfModels: number;
	numberOfItems: number;
	total: number;
}
export interface IState {
	products: IProduct[]; // sorted according to
	cart: ICart;
	size: string;
	orderBy: string;
}
export interface ICartAndFilter {
	cart: ICart;
	size: string;
	orderBy: string;
}
export interface ICartProps {
	cart: ICart;
	handleQuantity: (item: ICartItem, quantity: number) => void;
}
export interface IProductProps {
	props: {
		products: IProduct[];
		addToCart: (item: IProduct) => void;
	};
}
// ----------- USER DATA ---------------
export interface IRegister {
	firstName: string;
	lastName: string;
	street: string;
	city: string;
	zip: number;
	phone: string;
	userId: string;
	password: string;
}
export interface IUserData {
	firstName: string;
	lastName: string;
	street: string;
	city: string;
	zip: number;
	phone: string;
}
export interface ILoginData {
	userId: string;
	password: string;
}

// --------- FORM ----------
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
