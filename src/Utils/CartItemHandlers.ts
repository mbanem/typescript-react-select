import {
	ICart,
	ICartItem,
	IProduct,
	ISizeQuantity,
	IState,
} from '../Interface/index';

import { productFromId } from '../../src/index';

export const addTotalToCart = (cart: ICart, delta: number): ICart => {
	cart.total = Math.round((cart.total + delta) * 100) / 100;
	if (cart.total < 0) {
		// probably unnecessary for floating point epsilon error
		cart.total = 0;
	}
	return cart;
};
export const sizeQuantityList = (item: ICartItem): string => {
	const sq = item.sizeQuantity.reduce(
		(sqList: string, sq: ISizeQuantity, ix: number) => {
			const comma = ix > 0 ? ', ' : '';
			return `${sqList}${comma}${sq.size}x${sq.quantity}`;
		},
		''
	);
	return `(${sq})`;
};
export const cartItemSizeList = (item: ICartItem): string => {
	const list = item.sizeQuantity.reduce(
		(sizeList: string, sq: ISizeQuantity, ix: number) => {
			const comma = ix > 0 ? ', ' : '';
			return `${sizeList}${comma}${sq.size}`;
		},
		''
	);
	const among = list.includes(',') ? 'among' : 'size';
	return `${among} ( ${list} )`;
};
export const cartItemTotalQuantity = (item: ICartItem): number => {
	const qty = item.sizeQuantity.reduce((sum: number, sq: ISizeQuantity) => {
		return sum + sq.quantity;
	}, 0);
	return qty;
};
export const cartItemProduct = (item: ICartItem): IProduct => {
	return productFromId(item.productId);
};
export const isProductIdInCart = (productId: number, cart: ICart) => {
	return cart.items.some((item) => cartItemProduct(item).id === productId);
};
export const isProductInCart = (
	product: IProduct,
	cart: ICart,
	fake: number = 0
) => {
	return cart.items.some((item) => cartItemProduct(item).id === product.id);
};
export const isProductOfSizeInCart = (
	product: IProduct,
	cart: ICart,
	size: string
): boolean => {
	return cart.items.some((item: ICartItem) => {
		return (
			item.productId === product.id &&
			item.sizeQuantity.some((sq) => sq.size === size)
		);
	});
};
const shouldKeepItem = (item: ICartItem): boolean => {
	const sizeQuantity = item.sizeQuantity.filter((sq) => sq.quantity > 0);
	item.sizeQuantity = sizeQuantity;
	return sizeQuantity.length > 0;
};
export const changeProductOfSizeQuantity = (
	product: IProduct,
	cart: ICart,
	size: string,
	delta: number
): ICart => {
	const items = cart.items;
	let removeSize = false;
	for (let item of items) {
		if (item.productId === product.id) {
			for (let sq of item.sizeQuantity) {
				if (sq.size === size) {
					sq.quantity += delta;
					cart.numberOfItems += delta;
					addTotalToCart(cart, delta * product.price); // float point sometimes makes small negative
					// avoid removing item from the list while in the loop
					removeSize = sq.quantity === 0;
					break;
				}
			}
		}
	}
	if (removeSize) {
		const length = cart.items.length;
		cart.items = cart.items.filter((item) => shouldKeepItem(item));
		cart.numberOfModels += cart.items.length - length;
		if (cart.numberOfModels === 0) {
			localStorage.clear();
		}
	}

	return cart;
};
export const addNewSizeToProductInCart = (
	product: IProduct,
	cart: ICart,
	size: string
): ICart => {
	const items = cart.items;
	for (let item of items) {
		if (item.productId === product.id) {
			item.sizeQuantity.push({ size, quantity: 1 });
			cart.numberOfItems += 1;
			addTotalToCart(cart, product.price);
			return cart;
		}
	}
	return cart;
};
export const addProductOfSizeToCart = (
	product: IProduct,
	cart: ICart,
	size: string
): ICart => {
	const item: ICartItem = {
		productId: product.id,
		sizeQuantity: [{ size, quantity: 1 }],
	};
	cart.numberOfModels += 1;
	cart.numberOfItems += 1;
	addTotalToCart(cart, product.price);
	cart.items.push(item);
	return cart;
};
