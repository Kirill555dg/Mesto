import {initialCards} from './cards.js';

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const placesList = document.querySelector('.places__list');

const profileFormPopup = document.querySelector('.popup_type_edit');
const cardFormPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


// Функция создания карточки
function createCard(link, title){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', title);
    cardImage.addEventListener('click', event => {
        imagePopup.querySelector('.popup__image').src = link;
        imagePopup.querySelector('.popup__caption').textContent = title;
        openModal(imagePopup);
    });

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
const profileFormElement = profileFormPopup.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profileFormPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Находим форму в DOM
const cardFormElement = cardFormPopup.querySelector('.popup__form');
// Находим поля формы в DOM
const titleInput = cardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = cardFormElement.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    placesList.prepend(createCard(linkInput.value, titleInput.value));

    closeModal(cardFormPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardFormElement.addEventListener('submit', handleCardFormSubmit);


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

    openModal(profileFormPopup);
});

addCardButton.addEventListener('click', event => openModal(cardFormPopup));


