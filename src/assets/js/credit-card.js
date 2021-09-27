const cardNumberInputs = document.querySelectorAll('.credit-card-number input');

const onCardNumberPaste = evt => {
	const paste = evt.clipboardData.getData('text');
	const pasteArr = paste.split('');
	let i = 0;
	let index = 0;

	while (i <= 12) {
		cardNumberInputs[index].value = pasteArr.slice(i, i + 4).join('');
		cardNumberInputs[index].focus();
		i += 4;
		index++;
	}
};

cardNumberInputs.forEach((input, index) => {
	input.addEventListener('input', evt => {
		evt.preventDefault();
		if (evt.target.value.length > 3 && index < 3) {
			cardNumberInputs[index + 1].focus();
		}
	});
	input.addEventListener('keydown', evt => {
		if (evt.key === 'Backspace' && evt.target.value.length < 1 && index > 0) {
			cardNumberInputs[index - 1].focus();
		}
	});
});

cardNumberInputs[0].addEventListener('paste', onCardNumberPaste);
