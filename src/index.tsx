import './Styles/index.scss';

import * as React from 'react';

import { App } from './Components/App';
import { IProduct } from './Models/Interfaces';
import data from './Models/data.json';
import { render } from 'react-dom';

export const products = (): IProduct[] => {
	return data.products;
};
export const productFromId = (id: number): IProduct => {
	const product = products().find((p) => p.id === id);
	if (product === undefined) {
		throw new Error('Product not found');
	}
	return product;
};
render(<App {...data} />, document.getElementById('root'));
