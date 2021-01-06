import { IProduct, IState } from '../Models/Interfaces';

import { sortProducts } from './SortProducts';

export const getInitialState = (products: IProduct[]): IState => {
	const cartAndFilter = localStorage.getItem('cartAndFilter');
	if (cartAndFilter) {
		const { cart, size, orderBy } = JSON.parse(cartAndFilter);
		const state: IState = { products, cart, size, orderBy };
		return state;
	}
	const emptyProduct = {
		id: 1,
		title: '',
		image: '',
		description: '',
		price: 0,
		availableSizes: [],
	};
	const state: IState = {
		products: sortProducts(products, 'latest'),
		cart: {
			items: [
				{
					productId: 1,
					sizeQuantity: [{ size: '', quantity: 0 }],
				},
			],
			numberOfModels: 0,
			numberOfItems: 0,
			total: 0,
		},
		size: 'M',
		orderBy: 'latest',
	};
	state.cart.items.shift();
	return state;
};
