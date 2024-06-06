// Тут будет функция createCard
// Ещё тут будут функции, обрабатывающие события лайка и удаления карточки, и их экспорт
// Само объявление функции создания карточки - здесь

export function createCard(card, deleteCard, likeCard, openImageFunc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDescription = cardElement.querySelector('.card__description');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardDescription.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    cardDescription.querySelector('.card__title').textContent = card.name;
    cardImage.addEventListener('click', openImageFunc);
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
};

export function deleteCard(evt) {
    evt.target.parentElement.remove();
};

export function likeCard(evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active');
};