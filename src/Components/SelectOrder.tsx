// import makeAnimated from 'react-select/animated';
import { getOptionOrderBy, optionsOrderBy } from '../Interface/options';

import { IOrderByProps } from './Filter';
import React from 'react';
import Select from 'react-select';
import { customStyles } from '../Utils/CustomStyles';

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
				defaultValue={getOptionOrderBy(props.orderBy)}
				styles={customStyles}
				placeholder='How to Sort'
			/>
		</div>
	);
};
