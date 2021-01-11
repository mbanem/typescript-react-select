import { useEffect, useState } from 'react';

import { Subject } from 'rxjs';

const subject = new Subject<any>();
export const sendMessage = (message: any) => {
	subject.next(message);
};
export let gState: any;
export const useSubject = () => {
	// state is initialized as undefined (empty value)
	const [state, setState] = useState<any>({ showRegistrationForm: false });
	useEffect(() => {
		const subscription = subject.subscribe(setState);
		return () => subscription.unsubscribe();
	}, [subject]);
	gState = state;
	return state;
};
export const toggleRegistrationForm = () => {
	const srf = !gState.showRegistrationForm;
	console.log('showRegForm srf', srf);
	sendMessage({ showRegistrationForm: srf });
};
