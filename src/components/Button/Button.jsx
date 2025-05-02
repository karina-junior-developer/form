export const Button = ({ submitButtonRef, disableButton, getState }) => {
	return (
		<button type="submit" disabled={disableButton(getState())} ref={submitButtonRef}>
			Submit
		</button>
	);
};
