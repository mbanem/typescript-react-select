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
import {
	addNewSizeToProductInCart,
	addProductOfSizeToCart,
	changeProductOfSizeQuantity,
	isProductInCart,
	isProductOfSizeInCart,
} from '../Utils/CartItemHandlers';
import { sendMessage, useSubject } from './Handlers/UseSubject';

import { IOption } from '../Models/options';
import { Products } from './Products';
import { Subject } from 'rxjs';
import { ValueType } from 'react-select';
import { cartItemsNumber } from './Handlers/CartItemNumber';
import { getInitialState } from '../Utils/GetInitialState';
// import { proceed } from '../Utils/Payment'; Bane
import { productFromId } from '..';
import { sortProducts } from '../Utils/SortProducts';

// this subject is used to handle global state and broadcast
// messages to subscribers when a message is sent via
// subj.next(message)

export const App: React.FC<IData> = (data: IData): JSX.Element => {
	//
	const [refresh, setRefresh] = useState(false);
	const globalState = useSubject();
	// usee=d to force re-render when state or globalState mutates
	let tf = false;

	const handleQuantity = (cartItem: ICartItem, delta: number) => {
		let cart = state.cart;
		let removeItem: any;
		let items;
		const product = productFromId(cartItem.productId);
		const newCart = changeProductOfSizeQuantity(
			product,
			state.cart,
			state.size,
			delta
		);
		setState({ ...state, cart: newCart });
	};
	// initially state.products contains the full product list
	// but is changed based on the selected size
	const [state, setState] = useState<IState>(getInitialState(data.products));
	useEffect(() => {
		tf = !refresh;
		setRefresh(tf);
		const cartAndFilter = {
			cart: state.cart,
			size: state.size,
			orderBy: state.orderBy,
		};
		localStorage.setItem('cartAndFilter', JSON.stringify(cartAndFilter));
	}, [globalState, state]);
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
		let cart: ICart = state.cart;

		if (isProductOfSizeInCart(product, state.cart, state.size)) {
			// find model-size and increment the quantity, numberOfItems and total
			const newCart = changeProductOfSizeQuantity(
				product,
				state.cart,
				state.size,
				1
			);
			if (newCart != undefined) {
				setState({ ...state, cart: newCart });
			} else {
				setState({
					...state,
					cart,
				});
			}
		} else {
			if (isProductInCart(product, state.cart)) {
				// update numberOfItems and total
				const newCart = addNewSizeToProductInCart(
					product,
					state.cart,
					state.size
				);
				setState({ ...state, cart: newCart });
			} else {
				// adjust number of items, models and total
				const newCart = addProductOfSizeToCart(product, cart, state.size);
				setState({ ...state, cart: newCart });
			}
		}
	};

	const sizeProps: ISizeProps = {
		size: state.size,
		onSelectSize: onSelectSize,
	};
	const cartProps: ICartProps = {
		cart: state.cart,
		size: state.size,
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
	const productProps = {
		products: sortProducts(state.products, state.orderBy),
		addToCart,
	};
	return (
		<>
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
					<div className='cart-items-number'>{cartItemsNumber(state)}</div>
				</div>
				<div className='main-sidebar'>
					<Products props={productProps} />
					<div>
						<Cart {...cartProps} />
					</div>
				</div>
				<div className='footer'>All Rights Reserved</div>
			</div>
		</>
	);
};
