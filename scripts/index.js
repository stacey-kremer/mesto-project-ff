const cardTemplate = document.querySelector('#card-template').content;

const cardItem = document.querySelector('.places__item card');
const cardList = document.querySelector('.places__list');

function addCard(name, link, deleteCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__title').textContent = name;
	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__image').alt = name;
	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(deleteButton));
  return cardElement;
}

function deleteCard(deleteButton) {
	const cardItemDelete = deleteButton.closest('.card');
	cardItemDelete.remove();
}

initialCards.forEach(function(item) {
	cardList.append(addCard(item.name, item.link, deleteCard));
});