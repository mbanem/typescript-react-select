// @flow

import { ISizeProps } from './Filter';
import React from 'react';
import Select from 'react-select';
import { customStyles } from '../Utils/CustomStyles';
// import makeAnimated from 'react-select/animated';
import { optionsSize } from '../Models/options';

// NOTE: commented out is toggle multi - single r multiple select component
export const SelectSize: React.FC<ISizeProps> = (props): JSX.Element => {
	// const [state, setState] = React.useState({ isMulti: false });
	// const [color, setColor] = React.useState<{
	// 	backGround: string;
	// 	foreGround: string;
	// }>({ backGround: 'yellow', foreGround: 'red' });
	// const toggleMulti = () => {
	// 	const multi = !state.isMulti;
	// 	setState({ isMulti: multi });
	// 	const clr =
	// 		color.backGround === 'yellow'
	// 			? ['white', 'lightgreen']
	// 			: ['red', 'cornsilk'];
	// 	setColor({ foreGround: clr[0], backGround: clr[1] });
	// };

	customStyles;
	return (
		<>
			<Select
				isClearable
				className='select-size-box'
				onChange={props.onSelectSize}
				// closeMenuOnSelect={true}
				// components={SelectSizeComponents}
				// defaultValue={[colourOptions[4], colourOptions[5]]}
				// isMulti={state.isMulti}
				options={optionsSize}
				styles={customStyles}
				placeholder='Select Dress Size'
			/>
			{/* <button onClick={toggleMulti}>toggle multi</button>
			<div>is multi: {state.isMulti.toString()}</div> */}
		</>
	);
};
