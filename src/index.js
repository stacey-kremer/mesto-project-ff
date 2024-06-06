// Что тут?
// Тут объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
// Тут обработчики событий (при открытии и закрытии попапов; 
// Обработчики событий при отправке форм; 
// Обработчик, открывающий попап при клике по изображению карточки);
// Тут вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.
// Вызов функции создания карточки должен находиться - здесь

import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, closeModalByClick, closeModalOnEsc } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

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

function createCards() {
    initialCards.forEach(function(card) {
        const cardElement = createCard(card, deleteCard, likeCard, openImageFunc);
        placesList.append(cardElement);
    });
};

createCards();

function addCardToList(name, link) {
    const card = createCard({name, link}, deleteCard, likeCard, openImageFunc);
    placesList.prepend(card);
};

function handleOpenModal(evt) {
    document.addEventListener('keydown', closeModalOnEsc);
    switch(evt.target) {
        case profileEditButton:
            nameInput.value = profileName.textContent;
            descriptionInput.value = profileDescription.textContent;
            openModal(popupEdit);
            break;
        case newCardButton:
            openModal(popupNewCard);
            break;
    }
};

function openImageFunc(evt) {
    const imageModal = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const cardImage = evt.target.getAttribute('src');
    const cardCaption = evt.target.getAttribute('alt');
    document.addEventListener('keydown', closeModalOnEsc);
    openModal(imageModal);
    popupImage.setAttribute('src', cardImage);
    popupImage.setAttribute('alt', cardCaption);
    popupCaption.textContent = cardCaption;
};

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEdit);
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    addCardToList(placeName.value, placeLink.value);
    closeModal(popupNewCard);
    newCardForm.reset();
};

profileEditButton.addEventListener('click', handleOpenModal);
newCardButton.addEventListener('click', handleOpenModal);
popupEdit.addEventListener('click', closeModalByClick);
popupNewCard.addEventListener('click', closeModalByClick);
imageModal.addEventListener('click', closeModalByClick);
editProfileForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleCardFormSubmit);