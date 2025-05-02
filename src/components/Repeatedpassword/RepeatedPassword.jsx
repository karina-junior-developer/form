export const RepeatedPassword = ({
	repeatedPassword,
	onChangeRepeatedPassword,
	repeatedPasswordError,
	onBlurRepeatedPassword,
}) => {
	return (
		<>
			{repeatedPasswordError && <div>{repeatedPasswordError}</div>}
			<input
				type="password"
				name="repeatedPassword"
				placeholder="Repeat password"
				value={repeatedPassword}
				onChange={onChangeRepeatedPassword}
				onBlur={onBlurRepeatedPassword}
			/>
		</>
	);
};
