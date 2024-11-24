import { openModal } from './modal.js'

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// Функция создания карточки
export default function createCard(link, title) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)

  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardTitle.textContent = title

  cardImage.src = link
  cardImage.alt = title
  cardImage.addEventListener('click', event => {
    const imagePopup = document.querySelector('.popup_type_image')
    const image = imagePopup.querySelector('.popup__image')
    const caption = imagePopup.querySelector('.popup__caption')
    image.src = ""
    image.src = link
    caption.textContent = title
    openModal(imagePopup)
  })

  cardLikeButton.addEventListener('click', event => {
    event.target.classList.toggle('card__like-button_is-active')
  })

  cardDeleteButton.addEventListener('click', event => {
    event.target.closest('.places__item').remove()
  })

  return cardElement
}
