import '../Styles/App.scss';
import '../Styles/Products.scss';

import { IProduct, IProductProps } from '../Models/Interfaces/Interfaces';

import React from 'react';
import { formatCurrency } from '../Utils/FormatCurrency';

export const Products: React.FC<IProductProps> = ({
	props: { products, addToCart },
}): JSX.Element => {
	const arr: [string, IProduct][] = Object.entries(products);

	return (
		<div>
			<ul className='products'>
				{arr &&
					arr.map(([_, product]) => (
						<li key={product.id}>
							<div className='product'>
								<a href={`#${product.id}`}>
									{/* path is case sensitive /Images/dress1.jpg instead of /images/dress1.jpg */}
									<img
										src={product.image}
										className='product-img'
										alt={product.title}
									/>
									<p>{product.title}</p>
								</a>
								<div className='product-price'>
									<div>{formatCurrency(product.price)}</div>
									<button
										onClick={() => addToCart(product)}
										className='button-primary'
									>
										Add to Cart
									</button>
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};
