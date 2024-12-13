(()=>{"use strict";const e=document.querySelector("#card-template").content,t=(t,r,o,n)=>{const s=e.querySelector(".places__item").cloneNode(!0),a=s.querySelector(".card__image"),c=s.querySelector(".card__title"),l=s.querySelector(".card__like-count");return c.textContent=r,a.src=t,a.alt=r,l.textContent=o,s.id=n,s},r=(e,t,r)=>{t.validity.valid?((e,t,r,o)=>{const n=e.querySelector(`.${t.name}-error`);t.classList.remove(r),n.classList.remove(o),n.textContent=""})(e,t,r.inputErrorClass,r.errorClass):((e,t,r,o,n)=>{const s=e.querySelector(`.${t.name}-error`);t.classList.add(r),s.classList.add(n),s.textContent=o})(e,t,r.inputErrorClass,t.validationMessage,r.errorClass)},o=(e,t)=>{const o=Array.from(e.querySelectorAll(t.inputSelector)),s=e.querySelector(t.submitButtonSelector);n(o,s,t.inactiveButtonClass),o.forEach((o=>{r(e,o,t)}))},n=(e,t,r)=>{(e=>e.some((e=>!e.validity.valid)))(e)?t.classList.add(r):t.classList.remove(r)};function s(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))}let a=!1;function c(e){a=e.target===e.currentTarget}function l(e){e.target!==e.currentTarget&&(a=!1)}function u(e){e.target===e.currentTarget&&(e.target.style.cursor="pointer")}function i(e){e.target===e.currentTarget&&(e.target.style.cursor="default")}function d(e){function t(){p(e),e.querySelector(".popup__close").removeEventListener("click",t),e.removeEventListener("click",r),e.removeEventListener("mousedown",c),e.removeEventListener("mouseup",l),e.removeEventListener("mouseover",u),e.removeEventListener("mouseout",i),document.removeEventListener("keydown",s)}function r(e){a&&e.target===e.currentTarget&&t()}e.classList.add("popup_is-opened"),e.querySelector(".popup__close").addEventListener("click",t),e.addEventListener("click",r),e.addEventListener("mousedown",c),e.addEventListener("mouseup",l),e.addEventListener("mouseover",u),e.addEventListener("mouseout",i),document.addEventListener("keydown",s)}function p(e){e.classList.remove("popup_is-opened")}const _={baseUrl:"https://nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"2152fc9a-0b90-405e-b351-cbf15c43ae89","Content-Type":"application/json"}},m=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),y=document.querySelector(".profile__image"),h=document.querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),b=document.querySelector(".popup_type_avatar"),q=g.querySelector(".popup__image"),L=g.querySelector(".popup__caption"),k=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button"),C=f.querySelector(".popup__form"),x=C.querySelector(".popup__button"),$=C.querySelector(".popup__input_type_name"),j=C.querySelector(".popup__input_type_description");$.value=m.textContent,j.value=v.textContent;const T=S.querySelector(".popup__form"),P=T.querySelector(".popup__button"),U=T.querySelector(".popup__input_type_card-name"),A=T.querySelector(".popup__input_type_url"),w=b.querySelector(".popup__form"),B=w.querySelector(".popup__button"),D=w.querySelector(".popup__input_type_url");let N;h.addEventListener("click",(e=>{if(e.target.classList.contains("card__image"))q.src="",q.src=e.target.src,L.textContent=e.target.alt,d(g);else if(e.target.classList.contains("card__like-button")){e.target.disabled=!0;const t=e.target.closest(".places__item");let r;r=e.target.classList.contains("card__like-button_is-active")?"DELETE":"PUT",((e,t)=>fetch(`${_.baseUrl}/cards/likes/${e}`,{method:t,headers:_.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))))(t.id,r).then((r=>{const o=(n=t,s=r.likes.length,n.querySelector(".card__like-count").textContent=s,n);var n,s;t.replaceWith(o),e.target.classList.toggle("card__like-button_is-active")})).catch((e=>{console.log(e)})).finally((()=>{e.target.disabled=!1}))}else if(e.target.classList.contains("card__delete-button")){e.target.disabled=!0;const r=e.target.closest(".places__item");(t=r.id,fetch(`${_.baseUrl}/cards/${t}`,{method:"DELETE",headers:_.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>{r.remove()})).catch((e=>{console.log(e)}))}var t})),fetch(`${_.baseUrl}/users/me`,{headers:_.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))).then((e=>{m.textContent=e.name,v.textContent=e.about,y.style.backgroundImage=`url(${e.avatar})`,N=e._id})).catch((e=>{console.log(e)})),fetch(`${_.baseUrl}/cards`,{headers:_.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))).then((e=>{e.forEach((e=>{const r=e.link,o=e.name,n=e.likes.length,s=e._id,a=t(r,o,n,s);e.likes.some((e=>e._id===N))&&a.querySelector(".card__like-button").classList.add("card__like-button_is-active"),e.owner._id!==N&&a.querySelector(".card__delete-button").classList.add("card__delete-button_diactivate"),h.append(a)}))})).catch((e=>{console.log(e)})),y.addEventListener("click",(e=>{D.value=y.style.backgroundImage.slice(5,-2),o(w,O),d(b)})),b.addEventListener("submit",(function(e){e.preventDefault(),B.textContent="Сохранение...";var t;(t={avatar:D.value},fetch(`${_.baseUrl}/users/me/avatar`,{method:"PATCH",headers:_.headers,body:JSON.stringify(t)}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>{y.style.backgroundImage=`url(${e.avatar})`})).catch((e=>{console.log(e)})).finally((()=>{p(b),B.textContent="Сохранить"}))})),k.addEventListener("click",(e=>{$.value=m.textContent,j.value=v.textContent,o(C,O),d(f)})),C.addEventListener("submit",(function(e){e.preventDefault(),x.textContent="Сохранение...";var t;(t={name:$.value,about:j.value},fetch(`${_.baseUrl}/users/me`,{method:"PATCH",headers:_.headers,body:JSON.stringify(t)}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>{m.textContent=e.name,v.textContent=e.about})).catch((e=>{console.log(e)})).finally((()=>{p(f),x.textContent="Сохранить"}))})),E.addEventListener("click",(()=>{A.value="",U.value="",o(T,O),d(S)})),T.addEventListener("submit",(function(e){e.preventDefault(),P.textContent="Создание...";var r;(r={name:U.value,link:A.value},fetch(`${_.baseUrl}/cards`,{method:"POST",headers:_.headers,body:JSON.stringify(r)}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>{const r=e.link,o=e.name,n=e.likes.length,s=e._id,a=t(r,o,n,s);h.prepend(a)})).catch((e=>{console.log(e)})).finally((()=>{p(S),P.textContent="Создать"}))}));const O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{((e,t)=>{const o=Array.from(e.querySelectorAll(t.inputSelector)),s=e.querySelector(t.submitButtonSelector);o.forEach((a=>{a.addEventListener("input",(()=>{r(e,a,t),n(o,s,t.inactiveButtonClass)}))}))})(t,e)}))})(O)})();