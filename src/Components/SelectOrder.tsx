import { IOrderByProps } from './Filter';
import React from 'react';
import Select from 'react-select';
import { customStyles } from '../Utils/CustomStyles';
// import makeAnimated from 'react-select/animated';
import { optionsOrderBy } from '../Models/options';
// const SelectSizeComponents = makeAnimated();

export const SelectOrder: React.FC<IOrderByProps> = (props): JSX.Element => {
	customStyles;

	return (
		<div style={{ display: 'inline-block', width: '18rem' }}>
			<Select
				isClearable
				className='select-order-box'
				onChange={props.onSelectOrderBy}
				options={optionsOrderBy}
				styles={customStyles}
				placeholder='How to Sort'
			/>
		</div>
	);
};
