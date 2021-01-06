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
	products: IProduct[]; // sorted according to orderBy; default: latest
	cart: ICart;
	size: string; // currently selected dropdown
	orderBy: string; // currently selected dropdown
}
export interface ICartAndFilter {
	cart: ICart;
	size: string;
	orderBy: string;
}
export interface ICartProps {
	cart: ICart;
	handleQuantity: (item: ICartItem, delta: number) => void;
}
export interface IProductProps {
	props: {
		products: IProduct[];
		addToCart: (item: IProduct) => void;
	};
}
