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

export interface ICartItem {
	product: IProduct;
	size: string;
	quantity: number;
}
export interface ICart {
	items: ICartItem[];
	numberOfModels: number;
	numberOfItems: number;
	total: number;
}
export interface IState {
	products: IProduct[];
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
