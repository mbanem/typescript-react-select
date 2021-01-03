import '../Styles/App.scss';

import { Cart, ICartProps } from './Cart';
import { Filter, IFilterProps, IOrderByProps, ISizeProps } from './Filter';
import {
	ICart,
	ICartItem,
	IData,
	IProduct,
	IState,
} from '../Models/Interfaces';
import React, { useEffect, useState } from 'react';

import { IOption } from '../Models/options';
import { Products } from './Products';
import { ValueType } from 'react-select';
import { formatCurrency } from '../Utils/FormatCurrency';
import { getInitialState } from '../Utils/GetInitialState';
import { proceed } from '../Utils/Payment';
import { sortProducts } from '../Utils/SortProducts';

export const App: React.FC<IData> = (data: IData): JSX.Element => {
	//
	const handleQuantity = (cartItem: ICartItem, delta: number) => {
		let cart = state.cart;
		let removeItem: any;
		let items;
		cart.items.forEach((item) => {
			if (
				item.product.id === cartItem.product.id &&
				item.size === cartItem.size
			) {
				if (item.quantity + delta > 0) {
					item.quantity += delta;
					cart.numberOfItems += delta;
					cart.total += delta * item.product.price;
				} else {
					removeItem = item;
				}
			}
		});
		if (removeItem) {
			// remove the model from the cart
			items = cart.items.filter(
				(item) =>
					item.product.id !== removeItem.product.id ||
					item.size !== removeItem.size
			);
			cart = { ...cart, items };
			cart.numberOfItems -= 1;
			//if no more models of removeItem type, decrement models number
			if (!items.some((item) => item.product.id === removeItem.product.id)) {
				cart.numberOfModels -= 1;
			}
			cart.total -= removeItem.product.price;
		}
		setState({ ...state, cart });
	};
	// initially state.products contains the full product list
	// but is changed based on the selected size
	const [state, setState] = useState<IState>(getInitialState(data.products));
	useEffect(() => {
		const cartAndFilter = {
			cart: state.cart,
			size: state.size,
			orderBy: state.orderBy,
		};
		localStorage.setItem('cartAndFilter', JSON.stringify(cartAndFilter));
	}, [state]);
	// state products includes products of the selected size
	// or full products list if size is cleared in the select size box
	// but always ordered according to the selected order by
	const onSelectSize = (value: ValueType<IOption, false>) => {
		if (value && value.value) {
			const size = value.value;
			let prods: IProduct[] = data.products.filter((product: IProduct) =>
				product.availableSizes.includes(size)
			);
			prods = sortProducts(prods, state.orderBy);
			setState({
				...state,
				size,
				products: prods,
			});
		} else {
			setState({
				...state,
				size: '',
				products: sortProducts(data.products, state.orderBy),
			});
		}
	};

	// order by always works with the products of a selected size
	// which is kept in the state.products
	const onSelectOrderBy = (value: ValueType<IOption, false>) => {
		// console.log('onSelectOrderBy value', value);
		const orderBy = value?.value || 'latest';
		const prods = sortProducts(state.products, orderBy);
		setState({
			...state,
			orderBy,
			products: prods,
		});
	};

	const addToCart = (product: IProduct) => {
		const items = state.cart.items.slice();
		let numberOfModels = state.cart.numberOfModels;
		if (!items.some((item) => item.product.id === product.id)) {
			numberOfModels += 1;
		}
		const total = state.cart.total + product.price;
		const numberOfItems = state.cart.numberOfItems + 1;
		let found = false;
		items.forEach((item) => {
			if (item.product.id === product.id && item.size === state.size) {
				item.quantity += 1;
				found = true;
			}
		});

		setState({
			...state,
			cart: { items, numberOfModels, numberOfItems, total },
		});
		if (!found) {
			// new item not yet in the cart
			items.push({ product, size: state.size, quantity: 1 });
			setState({
				...state,
				cart: { items, numberOfModels, numberOfItems, total },
			});
		}
		// check if item is already in the cart so increment the quantity
	};
	const cartItemsNumber = (): JSX.Element => {
		let items = '';
		const buttonProceed = state.cart.numberOfItems ? (
			<div className='button-proceed' onClick={proceed}>
				proceed to order
			</div>
		) : (
			''
		);
		if (state.cart.numberOfItems > 1) {
			items = `(${state.cart.numberOfItems.toString()} items)`;
		}
		const number = (() => {
			switch (state.cart.numberOfModels) {
				case 0:
					return 'Cart is empty';
					break;
				case 1:
					return `1 model in the cart ${items}`;
					break;
				default:
					return `${state.cart.numberOfModels} models ${items}`;
			}
		})();
		return (
			<>
				<div className='total'>
					<div style={{ textAlign: 'right' }}>
						<span>{number}</span>
						<div>Total {formatCurrency(state.cart.total)}</div>
					</div>
					<div style={{ width: '10.5rem' }}>{buttonProceed}</div>
				</div>
			</>
		);
	};
	const sizeProps: ISizeProps = {
		size: state.size,
		onSelectSize: onSelectSize,
	};
	const cartProps: ICartProps = {
		cart: state.cart,
		handleQuantity,
	};
	const orderByProps: IOrderByProps = {
		orderBy: state.orderBy,
		onSelectOrderBy: onSelectOrderBy,
	};
	const filterProps: IFilterProps = {
		orderBy: orderByProps,
		size: sizeProps,
	};
	const props = { products: state.products, addToCart };
	return (
		<div className='grid-band'>
			<div>
				<div className='title-band'>
					<a>React Shopping Cart</a>
				</div>
			</div>
			<div className='filter-band'>
				<div className='number-of-products'>
					{state.products.length} Products
				</div>
				<Filter {...filterProps} />
				<div className='cart-items-number'>{cartItemsNumber()}</div>
			</div>
			<div className='main-sidebar'>
				<Products props={props} />
				<div>
					<Cart {...cartProps} />
				</div>
				{/* <div className='total'>Total {formatCurrency(state.cart.total)}</div> */}
			</div>
			<div className='footer'>All Rights Reserved</div>
		</div>
	);
};
