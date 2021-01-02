import '../Styles/Cart.scss';

import { ICart, ICartItem } from '../Models/Interfaces/Interfaces';

import React from 'react';
import { formatCurrency } from '../Utils/FormatCurrency';

export interface ICartProps {
	cart: ICart;
	handleQuantity: (item: ICartItem, quantity: number) => void;
}
type handleQuantity = (item: ICartItem, delta: number) => void;
export const Cart: React.FC<ICartProps> = ({
	cart,
	handleQuantity,
}): JSX.Element => {
	const itemInfo = (item: ICartItem): JSX.Element => {
		const times = item.quantity > 1 ? `${item.quantity} x` : '';
		const total = item.quantity * item.product.price;
		const str = `${times} ${item.product.title}`;
		return (
			<>
				<div style={{ padding: 0, margin: 0 }}>
					{times} {item.product.title}
				</div>
				<div style={{ padding: '3px', margin: 0 }}>
					Total {formatCurrency(total)}
				</div>
			</>
		);
	};

	return (
		<>
			<div className='cart'>
				<ul className='cart-items'>
					{cart.items.map((item) => (
						<li key={item.product.id}>
							<img
								width='50px'
								height='70px'
								src={item.product.image}
								alt={item.product.title}
							/>
							<div>
								<div className='cart-item-title'>{itemInfo(item)}</div>
								<div>
									<div
										onClick={() => handleQuantity(item, 1)}
										className='quantity-button'
									>
										+
									</div>
									<div
										onClick={() => handleQuantity(item, -1)}
										className='quantity-button'
									>
										-
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
