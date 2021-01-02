// NOTE: width is defined directly in Components
// SelectSize and SelectOrder with classes
// select-size-box and select-order-box
export const customStyles = {
	menuList: (base: any) => ({
		...base,
		minHeight: 60,
		maxHeight: 240, // dropdown list height
	}),
	// un-open control w/o chevron
	control: (base: any) => ({
		...base,
		backgroundColor: 'aliceblue',
	}),
	// holds only placeholder message but not selected value
	placeholder: (base: any) => ({
		...base,
		fontSize: 17,
		// fontStyle: 'italic',
		width: 180,
		padding: '0 0.5rem',
		color: '#34348f',
	}),
};
