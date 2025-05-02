import { useState } from 'react';

export const INITIAL_STATE = {
	name: '',
	surname: '',
	email: '',
	password: '',
	repeatedPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(INITIAL_STATE);

	return {
		getState: () => state,
		updateState: (fieldName, fieldValue) => {
			setState({ ...state, [fieldName]: fieldValue });
		},
	};
};

export const sendFormData = (formData) => {
	console.log(formData);
};
