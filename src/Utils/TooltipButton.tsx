import '../Styles/Cart.scss';

import { ICartItem, IProduct } from '../Models/Interfaces';

import React from 'react';
import ReactTooltip from 'react-tooltip';

export interface ITooltipProps {
	tooltip: string;
	item: ICartItem;
	delta: number;
	onClickHandler: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		item: ICartItem,
		delta: number
	) => void;
	className: string;
}
// , onClickHandler, className
export const TooltipButton: React.FC<ITooltipProps> = ({
	tooltip,
	item,
	delta,
	className,
	onClickHandler,
	children,
}): JSX.Element => {
	if (tooltip !== '')
		return (
			<>
				<div data-tip={tooltip} className={className}>
					{children}
				</div>
				<ReactTooltip className='tooltip' />
			</>
		);
	return (
		<div
			onClick={(evt) => onClickHandler(evt, item, delta)}
			className={className}
		>
			{children}
		</div>
	);
};
