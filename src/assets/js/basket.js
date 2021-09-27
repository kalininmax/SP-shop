const TAX_VALUE = 10;
const SHIPPING_PRICE = 150;

const countControlButtons = document.querySelectorAll('.basket-item__btn');
const deleteButtons = document.querySelectorAll('.basket-item__delete');
const cartCount = document.querySelector('.cart__count');
const subtotal = document.querySelector('.basket__subtotal-value');
const tax = document.querySelector('.basket__tax-value');
const shipping = document.querySelector('.basket__shipping-value');
const total = document.querySelector('.basket__total-value');

const getNumberValue = str => Number(str.replace(/[^0-9]/g, ''));
const numberWithSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const getSubtotalValue = arr => {
	return arr.reduce((a, b) => {
		return getNumberValue(a.textContent) + getNumberValue(b.textContent);
	});
};

const updateСalculations = () => {
	const itemsSumArray = Array.from(document.querySelectorAll('.basket-item__sum'));
	let subtotalValue = 0;

	if (itemsSumArray.length > 1) {
		subtotalValue = getSubtotalValue(itemsSumArray);
	}

	if (itemsSumArray.length === 1) {
		subtotalValue = getNumberValue(itemsSumArray[0].textContent);
	}

	const sumTaxValue = Math.floor(subtotalValue / 100) * TAX_VALUE;
	const shippingValue = itemsSumArray.length > 0 ? SHIPPING_PRICE : 0;

	if (itemsSumArray.length === 0) {
		cartCount.remove();
	}

	cartCount.textContent = itemsSumArray.length;
	subtotal.textContent = `$${numberWithSpaces(subtotalValue)}`;
	tax.textContent = `$${numberWithSpaces(sumTaxValue)}`;
	shipping.textContent = `$${numberWithSpaces(shippingValue)}`;
	total.textContent = `$${numberWithSpaces(subtotalValue + sumTaxValue + shippingValue)}`;
};

updateСalculations();

const onCountButtonClick = evt => {
	evt.preventDefault();

	const button = evt.target;
	const count = button.parentElement.querySelector('.basket-item__count');
	const sum = button.parentElement.querySelector('.basket-item__sum');
	let countValue = Number(count.textContent);
	const priceValue = getNumberValue(sum.textContent) / countValue;

	if (button.classList.contains('basket-item__btn--sub')) {
		countValue = countValue > 1 ? countValue - 1 : 1;
	}

	if (button.classList.contains('basket-item__btn--add')) {
		countValue++;
	}

	count.textContent = countValue;
	const sumValue = priceValue * countValue;
	sum.textContent = `$ ${numberWithSpaces(sumValue)}`;

	updateСalculations();
};

const onDeleteButtonClick = evt => {
	evt.preventDefault();

	evt.target.parentElement.remove();
	updateСalculations();
};

countControlButtons.forEach(button => {
	button.addEventListener('click', onCountButtonClick);
});

deleteButtons.forEach(button => {
	button.addEventListener('click', onDeleteButtonClick);
});
