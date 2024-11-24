import { initialCards } from './cards.js'

//// DOM-узлы ////

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// Данные пользователя
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// Список карточек
const placesList = document.querySelector('.places__list')

// Поп-апы
const profileFormPopup = document.querySelector('.popup_type_edit')
const cardFormPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

// Добавление анимации поп-апам
profileFormPopup.classList.add('popup_is-animated')
cardFormPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

// Кнопки вызова поп-апов
const profileEditButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

//// Функции ////

// Функция создания карточки
function createCard(link, title) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)

  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardTitle.textContent = title

  cardImage.setAttribute('src', link)
  cardImage.setAttribute('alt', title)
  cardImage.addEventListener('click', event => {
    imagePopup.querySelector('.popup__image').src = ""
    imagePopup.querySelector('.popup__image').src = link
    imagePopup.querySelector('.popup__caption').textContent = title
    openModal(imagePopup)
  })

  cardLikeButton.addEventListener('click', event =>
    event.target.classList.toggle('card__like-button_is-active')
  )

  cardDeleteButton.addEventListener('click', event =>
    event.target.closest('.places__item').remove()
  )

  return cardElement
}

// Функция открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened')
  popup.querySelector('.popup__close').addEventListener('click', event => closeModal(popup))
}

// Функция закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened')
}


// Вывод заготовленных карточек на страницу
initialCards.forEach(cardInfo => placesList.append(createCard(cardInfo['link'], cardInfo['name'])))

//// Обработка поп-апов ////

// Обработка поп-апа изменения профиля
const profileFormElement = profileFormPopup.querySelector('.popup__form')

const nameInput = profileFormElement.querySelector('.popup__input_type_name')
const jobInput = profileFormElement.querySelector('.popup__input_type_description')
nameInput.value = profileTitle.textContent
jobInput.value = profileDescription.textContent

profileEditButton.addEventListener('click', event => {

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent

  checkValidation(profileFormElement, validationSettings)
  openModal(profileFormPopup)
})

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value

  closeModal(profileFormPopup)
}

// Прикрепление обработчика к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit)


// Обработка поп-апа создания карточки
const cardFormElement = cardFormPopup.querySelector('.popup__form')

const titleInput = cardFormElement.querySelector('.popup__input_type_card-name')
const linkInput = cardFormElement.querySelector('.popup__input_type_url')

addCardButton.addEventListener('click', event => {

  linkInput.value = ''
  titleInput.value = ''

  checkValidation(cardFormElement, validationSettings)
  openModal(cardFormPopup)
})

// Обработчик «отправки» формы
function handleCardFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.

  placesList.prepend(createCard(linkInput.value, titleInput.value))

  closeModal(cardFormPopup)
}

// Прикрепление обработчика к форме
cardFormElement.addEventListener('submit', handleCardFormSubmit)


const showInputError = (formElement, inputElement, inputErrorClass, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}


const checkInputValidity = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationSettings.inputErrorClass, inputElement.validationMessage, validationSettings.errorClass)
  } else {
    hideInputError(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass)
  }
}

const checkValidation = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass)
  inputList.forEach(inputElement => checkInputValidity(formElement, inputElement, validationSettings))
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings)
      toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass)
    })
  })
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings)
  })
}

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
