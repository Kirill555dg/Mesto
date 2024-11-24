function closeModalOnOverlay(evt) {
  closeModal(evt.target)
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector('.popup_is-opened')
    closeModal(openedModal)
  }
}

// Функция открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened')

  popup.addEventListener('mouseover', event => {
    if (event.target === event.currentTarget) {
      popup.addEventListener('click', closeModalOnOverlay)
      event.target.style.cursor = "pointer";
    }
  })

  popup.addEventListener('mouseout', event => {
    if (event.target === event.currentTarget) {
      popup.removeEventListener('click', closeModalOnOverlay)
      event.target.style.cursor = "default";
    }
  })

  document.addEventListener('keydown', closeModalByEsc)
  popup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popup)
  })
}

// Функция закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeModalByEsc)
}

export { closeModal, openModal }
