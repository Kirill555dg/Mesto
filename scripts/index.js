import {initialCards} from './cards.js';

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


// Функция создания карточки
function createCard(src, title){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.setAttribute('src', src);
    cardImage.setAttribute('alt', title);

    cardTitle.textContent = title;

    cardLikeButton.addEventListener('click', event => 
        event.target.classList.toggle('card__like-button_is-active')
    );

    cardDeleteButton.addEventListener('click', event =>
        event.target.closest('.places__item').remove()
    );

    return cardElement;
}



// Вывести карточки на страницу

initialCards.forEach(cardInfo => placesList.append(createCard(cardInfo['link'], cardInfo['name'])));



// Находим форму в DOM
const profileFormElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Открытие и закрытие поп-апа

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    popup.querySelector('.popup__close').addEventListener('click', event => closeModal(popup));
} 

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}


profileEditButton.addEventListener('click', event => {

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    openModal(profilePopup);
});

addCardButton.addEventListener('click', event => openModal(cardPopup));


