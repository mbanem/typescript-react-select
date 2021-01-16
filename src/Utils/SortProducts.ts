import { IProduct } from '../Interface';

export const sortProducts = (
	products: IProduct[],
	orderBy: string
): IProduct[] => {
	const prods = products.sort((a, b) => {
		return orderBy === 'lowest'
			? a.price < b.price
				? -1
				: 1
			: orderBy === 'highest'
			? a.price > b.price
				? -1
				: 1
			: a.id > b.id
			? -1
			: 1;
	});
	return prods;
};
