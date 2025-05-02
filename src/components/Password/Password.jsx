export const Password = ({ passwordError, password, onChangePassword }) => {
	return (
		<>
			{password.length >= 4 && passwordError && <div>{passwordError}</div>}
			<input
				autoComplete="off"
				type="password"
				name="password"
				placeholder="Password"
				value={password}
				onChange={onChangePassword}
			/>
		</>
	);
};
