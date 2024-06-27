import { addLikeCard, deleteLikeCard } from '../scripts/api';

export function createCard(name, link, likes, ownerId, cardId, userId, deleteCard, openImageFunc) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardLikeCounter.textContent = likes.length;

  deleteButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    deleteCard(cardElement, cardId);
  });

  likeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    likeCard(likeButton, cardId, cardLikeCounter);
  });

  cardImage.addEventListener('click', function () {
    openImageFunc({ name, link });
  });

  if (ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardId);
    });
  }

  if (likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

function likeCard(likeButton, cardId, cardLikeCounter) {
  const likeEvt = likeButton.classList.contains("card__like-button_is-active") ? deleteLikeCard : addLikeCard;
  likeEvt(cardId)
    .then((res) => {
      cardLikeCounter.textContent = res.likes.length; 
      likeButton.classList.toggle("card__like-button_is-active"); 
    })
    .catch((err) => {
      console.log(err);
    });
}