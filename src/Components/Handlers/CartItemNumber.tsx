import { IState } from '../../Models/Interfaces';
import { formatCurrency } from '../../Utils/FormatCurrency';
import { toggleRegistrationForm } from './UseSubject';
export const cartItemsNumber = (state: IState): JSX.Element => {
	let items = '';
	const buttonProceed = state.cart.numberOfItems ? (
		<div className='button-proceed' onClick={toggleRegistrationForm}>
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
					<div>
						Total <b>{formatCurrency(state.cart.total)}</b>
					</div>
				</div>
				<div style={{ width: '10.5rem' }}>{buttonProceed}</div>
			</div>
		</>
	);
};
