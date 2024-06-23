import { addlikeCard, deleteLikeCard, removeCard } from '../scripts/api';

export function createCard(card, userId, {deleteCard, likeCard, openImageFunc}) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDescription = cardElement.querySelector('.card__description');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardDescription.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardDescription.querySelector('.card__title').textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;
  cardElement.id = card._id;
  
  cardImage.addEventListener('click', openImageFunc);
  likeButton.addEventListener('click', likeCard);

  cardElement.id = card["_id"];

  if (userId !== card.owner["_id"]) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(card);
    });
  }

  if (isLiked(card, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  return cardElement;
};

export function deleteCard(evt) {
  evt.target.parentElement.remove();
};

export function likeCard(evt) {
  evt.currentTarget.classList.toggle('card__like-button_is-active');
};

function isLiked(card, userId) {
  return card.likes.some((item) => item["_id"] === userId);
}