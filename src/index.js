import './pages/index.css';
import { openModal, closeModal, closeModalByClick } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, validationConfig } from "./scripts/validation";
import { getInitialCards, getUserData, updateAvatar } from "./scripts/api.js";

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
const profileAvatar = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type-avatar');
const avatarForm = popupEditAvatar.querySelector('.popup__form');
const avatarInput = document.querySelector('.popup__input_type_url');
const popupAvatarButton = document.querySelector('.popup__close');

export let userId = "";
export let userAvatar = "";

Promise.all([getUserData(), getInitialCards()])

    .then(([profileData, cardData]) => {
        const userId = profileData._id;
        profileName.textContent = profileData.name;
        profileDescription.textContent = profileData.about;
        profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;

        cardData.forEach(function (card) {

            const cardElement = createCard(card, deleteCard, likeCard, openImageFunc, userId);
            placesList.append(cardElement);
        });

    })

    .catch((error) => console.log("Ошибка бибка", error));

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = button.dataset.buttonText;
    }
}

function addCardToList(name, link) {
    const card = createCard({ name, link }, deleteCard, likeCard, openImageFunc, userId);
    placesList.prepend(card);
};

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(popupEdit);
});

newCardButton.addEventListener('click', function () {
    openModal(popupNewCard);
});

profileAvatar.addEventListener('click', function () {
    openModal(popupEditAvatar);
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

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    renderLoading(true, popupAvatarButton);
  
    updateAvatar(avatarInput.value)
      .then((res) => {
        profileAvatar.style = `background-image: url('${res.avatar}')`;
  
        closePopup(popupEditAvatar);
        avatarForm.reset();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupAvatarButton);
      });
  }

  avatarForm.addEventListener('submit', handleFormSubmitAvatar);
  
  // Слушатель клика по кнопке сохранения формы добавления аватара
  

popupEditAvatar.addEventListener('click', closeModalByClick);
popupEdit.addEventListener('click', closeModalByClick);
popupNewCard.addEventListener('click', closeModalByClick);
imageModal.addEventListener('click', closeModalByClick);
editProfileForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleCardFormSubmit);


enableValidation(validationConfig);