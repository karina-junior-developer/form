export const Email = ({ email, onChangeEmail }) => {
	return (
		<input
			autoComplete="off"
			type="email"
			name="email"
			placeholder="Email"
			value={email}
			onChange={onChangeEmail}
		/>
	);
};
