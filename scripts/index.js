import {initialCards} from './cards.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;





// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки



// @todo: Вывести карточки на страницу

initialCards.forEach(cardInfo => placesList.append(createCard(cardInfo['link'], cardInfo['name'])));

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    popup.querySelector('.popup__close').addEventListener('click', event => closeModal(popup));
} 

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}


profileEditButton.addEventListener('click', event => {

    profilePopup.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    profilePopup.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    openModal(profilePopup);
});

addCardButton.addEventListener('click', event => openModal(cardPopup));