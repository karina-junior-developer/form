import { useRef, useEffect } from 'react';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldScheme = yup.object().shape({
	name: yup
		.string()
		.matches(
			/^[A-Za-zÄÖÜäöü-]+$/,
			'Invalid name. Numbers are not allowed. "-" symbol can be used.',
		)
		.max(10, 'Invalid length. Maximum is 10 symbols.'),

	surname: yup
		.string()
		.matches(
			/^[A-Za-zÄÖÜäöü-]+$/,
			'Invalid surname. Numbers are not allowed. "-" symbol can be used.',
		)
		.max(10, 'Invalid length. Maximum is 10 symbols.'),

	email: yup.string().email('Invalid email format'),

	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
			'Invalid password. Rule: one capital letter, one small letter, numbers. Maximum length is 10 symbols.',
		)
		.min(4, 'Invalid length. Minimum is 4 symbols.')
		.max(10, 'Invalid length. Maximum is 10 symbols.'),

	repeatedPassword: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			'Repeated password must be the same as the original password.',
		),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			password: '',
			repeatedPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(fieldScheme),
	});

	const nameError = errors.name?.message;
	const surnameError = errors.surname?.message;
	const passwordError = errors.password?.message;
	const repeatedPasswordError = errors.repeatedPassword?.message;

	const values = watch();

	const disableButton = () => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.values(values).some((v) => v === '');
		return hasErrors || hasEmptyFields;
	};

	const submitButtonRef = useRef(null);

	useEffect(() => {
		const hasEmptyValue = Object.values(values).some((v) => v === '');

		if (!hasEmptyValue && isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	}, [values, isValid]);

	return (
		<div className={styles.mainBlock}>
			<h2>Registration Form</h2>
			<form className={styles.formBlock} onSubmit={handleSubmit(sendFormData)}>
				{nameError && <div>{nameError}</div>}
				<input type="text" placeholder="Name" {...register('name')} />
				{surnameError && <div>{surnameError}</div>}
				<input
					name="surname"
					type="text"
					placeholder="Surname"
					{...register('surname')}
				/>
				<input type="email" placeholder="Email" {...register('email')} />
				{passwordError && <div>{passwordError}</div>}
				<input type="password" placeholder="Password" {...register('password')} />
				{repeatedPasswordError && <div>{repeatedPasswordError}</div>}
				<input
					type="password"
					placeholder="Repeat password"
					{...register('repeatedPassword')}
				/>
				<button disabled={disableButton()} ref={submitButtonRef}>
					Submit form
				</button>
			</form>
		</div>
	);
};
