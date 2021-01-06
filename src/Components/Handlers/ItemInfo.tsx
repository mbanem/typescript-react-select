import {
	cartItemTotalQuantity,
	sizeQuantityList,
} from '../../Utils/CartItemHandlers';

import { ICartItem } from '../../Models/Interfaces';
import { formatCurrency } from '../../Utils/FormatCurrency';
import { productFromId } from '../../index';

export const itemInfo = (item: ICartItem): JSX.Element => {
	const product = productFromId(item.productId);
	const sqList = sizeQuantityList(item);
	const quantity = cartItemTotalQuantity(item);
	const total = quantity * product.price;
	return (
		<>
			<div
				style={{
					padding: 0,
					margin: 0,
					fontSize: '12px',
					lineHeight: '12px',
				}}
			>
				{product.title} {sqList}
			</div>
			<div style={{ padding: '3px', margin: 0 }}>
				Total <b>{formatCurrency(total)}</b>
			</div>
		</>
	);
};
