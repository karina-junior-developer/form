import { useState, useRef } from 'react';
import { INITIAL_STATE, useStore, sendFormData } from '../constants';
import styles from './App.module.css';
import { NameAndSurname } from '../NameandSurname/NameandSurname';
import { Email } from '../Email/Email';
import { Password } from '../Password/PAssword';
import { RepeatedPassword } from '../Repeatedpassword/Repeatedpassword';
import { Button } from '../Button/Button';

export const App = () => {
	const { getState, updateState } = useStore();
	const { name, surname, email, password, repeatedPassword } = getState();

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const disableButton = (state) => {
		if (
			Object.values(state).includes('') ||
			state.password !== state.repeatedPassword
		) {
			return true;
		}
		return false;
	};

	const [nameError, setNameError] = useState(null);
	const [surnameError, setSurnameError] = useState(null);

	const onChangeNameAndSurname = ({ target }) => {
		updateState(target.name, target.value);

		let newError = null;

		if (!/^[A-Za-zÄÖÜäöü-]+$/.test(target.value)) {
			newError = `Invalid ${target.name}. Numbers are not allowed. "-" symbol can be used.`;
		} else if (target.value.length > 15) {
			newError = `Invalid ${target.name} length. Maximum length is 15 symbols.`;
		}

		if (target.name === 'name') {
			setNameError(newError);
		} else if (target.name === 'surname') {
			setSurnameError(newError);
		}
	};

	const onChangeEmail = ({ target }) => {
		updateState(target.name, target.value);
	};

	const [passwordError, setPasswordError] = useState(null);
	const onChangePassword = ({ target }) => {
		updateState(target.name, target.value);

		let newError = null;

		if (target.value.length === 0) {
			newError = null;
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/.test(target.value)) {
			newError =
				'Invalid password. Rule: one capital letter, one small letter, numbers. Maximum length is 10 symbols.';
		} else if (target.value.length > 10) {
			newError = `Invalid length. Maximum is 10 symbols.`;
		}
		setPasswordError(newError);
	};

	const [repeatedPasswordError, setRepeatedPasswordError] = useState(null);
	const onChangeRepeatedPassword = ({ target }) => {
		updateState(target.name, target.value);

		let newError = null;

		if (target.value.length <= 4) {
			newError = null;
		} else if (target.value != password) {
			newError = 'Repeated password must be the same as the original password';
		}
		setRepeatedPasswordError(newError);
	};

	const submitButtonRef = useRef(null);
	const onBlurRepeatedPassword = ({ target }) => {
		if (target.value.length < 4) {
			setRepeatedPasswordError(
				`Invalid Repeated Password length. Minimum length is 4 symbols.`,
			);
		} else if (
			name &&
			surname &&
			email &&
			password &&
			repeatedPassword &&
			!nameError &&
			!surnameError &&
			!passwordError &&
			!repeatedPasswordError
		) {
			submitButtonRef.current.focus();
		}
	};

	return (
		<div className={styles.mainBlock}>
			<h2>Registration Form</h2>
			<form className={styles.formBlock} onSubmit={onSubmit}>
				<NameAndSurname
					nameError={nameError}
					name={name}
					surnameError={surnameError}
					surname={surname}
					onChangeNameAndSurname={onChangeNameAndSurname}
				/>
				<Email email={email} onChangeEmail={onChangeEmail} />
				<Password
					passwordError={passwordError}
					password={password}
					onChangePassword={onChangePassword}
				/>
				<RepeatedPassword
					repeatedPasswordError={repeatedPasswordError}
					repeatedPassword={repeatedPassword}
					onChangeRepeatedPassword={onChangeRepeatedPassword}
					onBlurRepeatedPassword={onBlurRepeatedPassword}
				/>
				<Button
					nameError={nameError}
					passwordError={passwordError}
					repeatedPasswordError={repeatedPassword}
					submitButtonRef={submitButtonRef}
					disableButton={disableButton}
					getState={getState}
				/>
			</form>
		</div>
	);
};
