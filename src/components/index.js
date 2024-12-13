import '../pages/index.css';

import { createCard, updateCardLikes } from './card.js';
import { enableValidation, checkValidation } from './validate.js';
import { openModal, closeModal } from './modal.js';

import {
  getInitialCards,
  getUserInfo,
  changeUserInfo,
  postNewCard,
  deleteCard,
  toggleLikeCard
} from './api.js';

//// DOM-узлы ////

// Данные пользователя
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');


// Список карточек
const placesList = document.querySelector('.places__list');

// Поп-апы
const profileFormPopup = document.querySelector('.popup_type_edit');
const cardFormPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Элементы поп-апа картинки
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

// Добавление анимации поп-апам
profileFormPopup.classList.add('popup_is-animated');
cardFormPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

// Кнопки вызова поп-апов
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');


//// Функции ////

// Обработчик нажатия на карточку
placesList.addEventListener('click', event => {
  if (event.target.classList.contains('card__image')) {
    image.src = ""
    image.src = event.target.src
    caption.textContent = event.target.alt
    openModal(imagePopup)
  } else if (event.target.classList.contains('card__like-button')) {
    event.target.disabled = true;
    const cardItem = event.target.closest('.places__item');
    // Метод для постановки или снятия лайка карточки
    let _method;
    if (event.target.classList.contains('card__like-button_is-active')) {
      _method = "DELETE";
    } else {
      _method = "PUT";
    }
    toggleLikeCard(cardItem.id, _method)
      .then(cardInfo => {
        console.log(cardInfo)
        const newCardItem = updateCardLikes(cardItem, cardInfo.likes.length);
        cardItem.replaceWith(newCardItem);
        event.target.classList.toggle('card__like-button_is-active')
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        event.target.disabled = false;
      });
  } else if (event.target.classList.contains('card__delete-button')) {
    event.target.disabled = true;
    const cardItem = event.target.closest('.places__item');
    deleteCard(cardItem.id)
      .then(res => {
        cardItem.remove();
      })
      .catch(err => {
        console.log(err);
      })
  }
})

let userId;

getUserInfo()
  .then(userInfo => {
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;
  })
  .catch(err => {
    console.log(err);
  });


getInitialCards()
  .then(res => {
    res.forEach(cardInfo => {
      console.log(cardInfo);
      const link = cardInfo.link;
      const name = cardInfo.name;
      const likeCount = cardInfo.likes.length;
      const _id = cardInfo._id;
      const newCard = createCard(link, name, likeCount, _id);
      if (cardInfo.likes.some(user => user._id === userId)) {
        newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
      if (cardInfo.owner._id !== userId) {
        newCard.querySelector('.card__delete-button').classList.add('card__delete-button_diactivate');
      }
      placesList.append(newCard);
    });
  })
  .catch(err => {
    console.log(err);
  });

//// Обработка поп-апов ////

// Обработка поп-апа изменения профиля
const profileFormElement = profileFormPopup.querySelector('.popup__form')

const nameInput = profileFormElement.querySelector('.popup__input_type_name')
const aboutInput = profileFormElement.querySelector('.popup__input_type_description')
nameInput.value = profileName.textContent
aboutInput.value = profileAbout.textContent

profileEditButton.addEventListener('click', event => {

  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent

  checkValidation(profileFormElement, validationSettings)
  openModal(profileFormPopup)
})

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.

  const body = {
    name: nameInput.value,
    about: aboutInput.value
  };

  changeUserInfo(body)
    .then(userInfo => {
      profileName.textContent = userInfo.name;
      profileAbout.textContent = userInfo.about;
    })
    .catch(err => {
      console.log(err);
    })
    .finally();

  closeModal(profileFormPopup)
}

// Прикрепление обработчика к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit)


// Обработка поп-апа создания карточки
const cardFormElement = cardFormPopup.querySelector('.popup__form')

const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name')
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url')

addCardButton.addEventListener('click', () => {

  cardLinkInput.value = ''
  cardNameInput.value = ''

  checkValidation(cardFormElement, validationSettings)
  openModal(cardFormPopup)
})

// Обработчик «отправки» формы
function handleCardFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.

  const body = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  postNewCard(body)
    .then(cardInfo => {
      const link = cardInfo.link;
      const name = cardInfo.name;
      const likeCount = cardInfo.likes.length;
      const _id = cardInfo._id;
      const newCard = createCard(link, name, likeCount, _id);
      placesList.prepend(newCard);
    })
    .catch(err => {
      console.log(err);
    })
    .finally();


  closeModal(cardFormPopup)
}

// Прикрепление обработчика к форме
cardFormElement.addEventListener('submit', handleCardFormSubmit)


// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings)
