// Что тут?
// Тут объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
// Тут обработчики событий (при открытии и закрытии попапов; 
// Обработчики событий при отправке форм; 
// Обработчик, открывающий попап при клике по изображению карточки);
// Тут вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.
// Вызов функции создания карточки должен находиться - здесь

import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, closeModalByClick } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const imageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const editProfileForm = popupEdit.querySelector('.popup__form');
const newCardForm = popupNewCard.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placeName = document.querySelector('.popup__input_type_card-name');
const placeLink = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');

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

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(popupEdit);
});

newCardButton.addEventListener('click', function (){
    openModal(popupNewCard);
});

function openImageFunc(evt) {
    const cardImage = evt.target.getAttribute('src');
    const cardCaption = evt.target.getAttribute('alt');
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

popupEdit.addEventListener('click', closeModalByClick);
popupNewCard.addEventListener('click', closeModalByClick);
imageModal.addEventListener('click', closeModalByClick);
editProfileForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleCardFormSubmit);