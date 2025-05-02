export const NameAndSurname = ({
	nameError,
	name,
	surnameError,
	surname,
	onChangeNameAndSurname,
}) => {
	return (
		<>
			{nameError && name && <div>{nameError}</div>}
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={name}
				onChange={onChangeNameAndSurname}
			/>
			{surnameError && surname && <div>{surnameError}</div>}
			<input
				autoComplete="off"
				type="text"
				name="surname"
				placeholder="Surname"
				value={surname}
				onChange={onChangeNameAndSurname}
			/>
		</>
	);
};
