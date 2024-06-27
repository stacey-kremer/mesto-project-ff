// Импорт
import './pages/index.css';
import { openModal, closeModal, closeModalByClick } from './components/modal';
import { createCard } from './components/card';
import { enableValidation, clearValidation } from './scripts/validation';
import { getInitialCards, getUserData, editUserData, postNewCard, removeCard, updateAvatar } from './scripts/api';

// Объявление переменных
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const imageModal = document.querySelector('.popup_type_image');
const editProfileForm = popupEdit.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placeName = document.querySelector('.popup__input_type_card-name');
const placeLink = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');
const profileAvatar = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type-avatar');
const avatarForm = popupEditAvatar.querySelector('.popup__form');
const avatarInput = avatarForm.avatar;
const popupImage = document.querySelector('.popup__image');
const popupDeleteCard = document.querySelector('.popup_type_confirm_delete');
const deleteCardForm = popupDeleteCard.querySelector('.popup__form');

let userId = '';

// Промис
Promise.all([getUserData(), getInitialCards()])

  .then(([profileData, cardData]) => {
    const userId = profileData._id;
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style = `background-image: url('${profileData.avatar}')`;

    cardData.forEach(function (card) {
      const cardElement = createCard(card.name, card.link, card.likes, card.owner._id, card._id, userId, deleteForm, openImageFunc);
      placesList.append(cardElement);
    });
  })

  .catch((error) => {
    console.error('Ошибка:', error);
  });

// Рендер при загрузке данных
function renderLoading(isLoading, popupElement) {
  const popupButton = popupElement.querySelector('.popup__button');
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

function renderLoadingDelete(isLoading, popupElement) {
  const popupButton = popupElement.querySelector('.popup__button');
  if (isLoading) {
    popupButton.textContent = 'Удаление...';
  } else {
    popupButton.textContent = 'Да';
  }
}

//Добавление новой карточки
newCardButton.addEventListener("click", function () {
  openModal(popupNewCard);
  clearValidation(newCardForm, validationConfig);
});

newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const popupElement = document.querySelector('.popup_is-opened');
  renderLoading(true, popupElement);

  postNewCard({
    name: placeName.value,
    link: placeLink.value,
  })
    .then((newCard) => {
      placesList.prepend(createCard(newCard.name, newCard.link, newCard.likes, newCard.owner._id, newCard._id, userId, deleteForm, openImageFunc));
    })
    .then(() => {
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
  newCardForm.reset();
});

// Редактирование данных профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(editProfileForm, validationConfig);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector('.popup_is-opened');
  renderLoading(true, popupElement);

  editUserData({
    name: nameInput.value,
    about: descriptionInput.value,
  })
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
}

editProfileForm.addEventListener('submit', handleEditFormSubmit);

// Редактирование аватара
profileAvatar.addEventListener('click', function () {
  openModal(popupEditAvatar);
});

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const popupElement = document.querySelector('.popup_is-opened');
  renderLoading(true, popupElement);

  updateAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    });
    avatarForm.reset();
});

// Функция, открывающая карточку
export function openImageFunc(card) {
  openModal(imageModal);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

// Удаление карточки
function deleteCard(card, cardId) {
  const popupElement = document.querySelector('.popup_is-opened');
  renderLoadingDelete(true, popupElement);

  removeCard(cardId)
    .then(() => {
      card.remove();
      closeModal(popupDeleteCard);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      renderLoadingDelete(false, popupElement)
    })
}

let cardDelete;
let cardDeleteId;

deleteCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  deleteCard(cardDelete, cardDeleteId);
});


function deleteForm(card, cardId) {
  openModal(popupDeleteCard);
  cardDelete = card;
  cardDeleteId = cardId;
}

// Слушатели кликов
popupDeleteCard.addEventListener('click', closeModalByClick);
popupEditAvatar.addEventListener('click', closeModalByClick);
popupEdit.addEventListener('click', closeModalByClick);
popupNewCard.addEventListener('click', closeModalByClick);
imageModal.addEventListener('click', closeModalByClick);

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

window.addEventListener('load', function () {
  enableValidation(validationConfig);
});