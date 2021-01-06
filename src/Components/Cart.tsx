import '../Styles/Cart.scss';

import { ICart, ICartItem } from '../Models/Interfaces';

import React from 'react';
import { TooltipButton } from '../Utils/TooltipButton';
import { cartItemSizeList } from '../Utils/CartItemHandlers';
import { itemInfo } from './Handlers/ItemInfo';
import { productFromId } from '../index';

type handleQuantity = (item: ICartItem, delta: number) => void;
export interface ICartProps {
	cart: ICart;
	size: string;
	handleQuantity: (item: ICartItem, delta: number) => void;
}
// ------------------------------------------------------------
export const Cart: React.FC<ICartProps> = ({
	cart,
	size,
	handleQuantity,
}): JSX.Element => {
	let tooltip = '';
	const tooltipSize = () => {
		return tooltip;
	};
	const isEnabled = (item: ICartItem) => {
		if (item.sizeQuantity.find((sq) => sq.size === size) !== undefined) {
			tooltip = '';
			return 'quantity-button';
		} else {
			const sizeList = cartItemSizeList(item);
			tooltip = `to enable buttons select ${sizeList}`;
			return 'quantity-button-disabled';
		}
	};

	return (
		<>
			<div className='cart'>
				{cart.numberOfItems > 0 && (
					<span className='btn-enabled-msg'>
						Buttons enabled only for size ({size})
					</span>
				)}
				<ul className='cart-items'>
					{cart.items.map((item) => {
						const product = productFromId(item.productId);
						isEnabled(item);
						return (
							<li key={product.id}>
								<img
									width='50px'
									height='70px'
									src={product.image}
									alt={product.title}
								/>
								<div>
									<div className='cart-item-title'>{itemInfo(item)}</div>
									<TooltipButton
										tooltip={tooltip}
										item={item}
										delta={1}
										onClickHandler={() => handleQuantity(item, 1)}
										className={isEnabled(item)}
									>
										+
									</TooltipButton>
									<TooltipButton
										tooltip={tooltip}
										item={item}
										delta={-1}
										onClickHandler={() => handleQuantity(item, -1)}
										className={isEnabled(item)}
									>
										-
									</TooltipButton>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};
