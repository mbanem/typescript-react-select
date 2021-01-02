import { IProduct, IState } from '../Models/Interfaces';

import { sortProducts } from './SortProducts';

export const getInitialState = (products: IProduct[]): IState => {
	const emptyProduct = {
		id: -1,
		title: '',
		image: '',
		description: '',
		price: 0,
		availableSizes: [],
	};
	const state: IState = {
		products: sortProducts(products, 'latest'),
		cart: {
			items: [{ product: emptyProduct, quantity: 0 }],
			numberOfModels: 0,
			numberOfItems: 0,
			total: 0,
		},
		size: '',
		orderBy: 'latest',
	};
	state.cart.items.shift();
	return state;
};
