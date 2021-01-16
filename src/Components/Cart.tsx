import '../Styles/Cart.scss';
import '../FormHandlers/Form.scss';

import { ICart, ICartItem } from '../Interface';
import React, { useState } from 'react';
import { capitalize, capitalizeName } from '../Utils';

import { FormGen } from '../FormHandlers/FormGen';
// import { RegistrationForm } from '../Forms/Registration';
import { TooltipButton } from './Handlers/TooltipButton';
import { cartItemInfo } from './Handlers/CartItemInfo';
import { cartItemSizeList } from '../Utils/CartItemHandlers';
import { gState } from './Handlers/UseSubject';
import { productFromId } from '../index';
import { userFormSpecs } from '../FormHandlers/UserFormSpecs';

export interface ICartProps {
	cart: ICart;
	size: string;
	handleQuantity: (item: ICartItem, delta: number) => void;
}
const initialState = {
	firstName: '',
	lastName: '',
	address: '',
	city: '',
	zip: '',
	phone: '',
	email: '',
	password: '',
};
// --------------  CART APP    -------------
export const Cart: React.FC<ICartProps> = ({
	cart,
	size,
	handleQuantity,
}): JSX.Element => {
	// todo make database handling via GraphQL
	const onSubmit = (data: any) => {
		console.log('onSubmit data`', data);
	};
	const [state, setState] = useState<any>(initialState);

	const updateState = (event: React.ChangeEvent<HTMLInputElement>) => {
		let { name, value } = event.target;

		if ('firstName lastName city'.includes(name)) {
			value = capitalize(value);
		} else if ('address city'.includes(name)) {
			value = capitalizeName(value);
		}
		setState({ ...state, [name]: value });
	};

	let tooltip = '';
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
			{gState.showRegistrationForm && (
				<div className='user-form-container'>
					<p className='reg-form-title'>Registration Form</p>
					<FormGen
						formSpecs={userFormSpecs}
						onSubmit={onSubmit}
						state={state}
						updateState={updateState}
					/>
				</div>
			)}
			<div className='cart'>
				{cart.numberOfItems > 0 && (
					<span data-tip={tooltip} className='btn-enabled-msg'>
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
									<div className='cart-item-title'>{cartItemInfo(item)}</div>
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
