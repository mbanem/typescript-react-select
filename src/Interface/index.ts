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
