// Здесь будет экспорт функции openModal и closeModal, которые в качестве аргумента принимают DOM-элемент модального окна

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', popup);
};

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModal);
};

export function closeModalByClick(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.currentTarget);
    }
};

export function closeModalOnEsc(evt) {
    if (evt.key === 'Escape') {
        const popupElement = document.querySelector('.popup_is-opened');
        closeModal(popupElement);
    }
};