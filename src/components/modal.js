export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeModalOnEsc);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc);
};

export function closeModalByClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.currentTarget);
  }
};

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
      const popupElement = document.querySelector('.popup_is-opened');
      closeModal(popupElement);
  }
};
