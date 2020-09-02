const editProfileModal = document.querySelector("#editProfileModal");
const addNewPlaceModal = document.querySelector("#addNewPlace");
const closeEditModalBtn = document.querySelectorAll(".edit-profile__close-btn");
const openModalWithEditBtn = document.querySelector(".edit-btn");
const openModalWithAddBtn = document.querySelector(".add-btn");
const likeBtn = document.querySelectorAll(".like-btn");
const deleteCardBtn = document.querySelectorAll('.delete-btn');
const cards = document.querySelectorAll('.card');
const createCardBtn = document.querySelector('#createCardBtn');
const editProfileBtn = document.querySelector('#editProfileBtn')
const gallery = document.querySelector('.gallery');
const photoModal = document.querySelector('#photoModal');
const modal = document.querySelectorAll('.modal')

//edit profile text
const editFullNameHead = document.querySelector('.fullname-head');
const editBioText = document.querySelector('.bio__text');


//forms
const editProfileForm = document.forms.editProfileForm;
const addNewPlaceForm = document.forms.addNewPlaceForm;

//edit profile inputs
const editProfileFormNameInput = editProfileForm.elements.editProfileName;
const editProfileFormRodInput = editProfileForm.elements.editProfileRod;

//add new place inputs

const addNewPlaceNameInput = addNewPlaceForm.elements.addNewPlaceName;
const addNewPlaceUrlInput = addNewPlaceForm.elements.addNewPlaceUrl;



//Открытие модального окна по кнопке "редактировать"
openModalWithEditBtn.addEventListener("click", function (e) {
  e.preventDefault();
  toggleModal(editProfileModal)
});

// //Открытие модального окна по кнопке "Добавить"

openModalWithAddBtn.addEventListener("click", function (e) {
  e.preventDefault();
  toggleModal(addNewPlaceModal)
});

//Удаление модальных окон по кнопке "Х"
closeEditModalBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
      e.preventDefault();
    editProfileModal.classList.remove("open");
    addNewPlaceModal.classList.remove("open");
    photoModal.classList.remove('open');
  });
});



gallery.addEventListener('click', function (e) {

  //кнопка like
    if(e.target.classList.contains('like-btn')) {
        let btn = e.target;
        btn.classList.toggle('activeLikebtn');
        return;
    }

    //удаление карточки
    const card = e.target.closest('.card')
    if(e.target.classList.contains('delete-btn')) {
        card.remove();
        return;
    }
    
    if (card !== null) {
      if(card.contains(e.target)) {
     
      
        openModalImg(card)
      }
    }
    

    
});


//Добавление карточки 

createCardBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let nameInput = addNewPlaceNameInput.value;
    let urlInput = addNewPlaceUrlInput.value;
    const card = document.createElement('div');
    card.classList.add('card');
    const photoContainter = document.createElement('div');
    const cardInfo = document.createElement('div');
    photoContainter.classList.add('card__photo-container');
    cardInfo.classList.add('card__info');
    gallery.append(card);
    const btn = document.createElement('button')
    btn.classList.add('delete-btn');
    card.append(photoContainter, cardInfo, btn);
    const img = document.createElement('img')
    img.classList.add('card__photo');
    photoContainter.append(img);
    const cardInfoName = document.createElement('p')
    cardInfoName.classList.add('card__info-name');
    const likebtn = document.createElement('button')
    likebtn.classList.add('like-btn');
    cardInfo.append(cardInfoName, likebtn);
    cardInfoName.textContent = nameInput;
    img.setAttribute('src', urlInput);
    addNewPlaceModal.classList.remove("open");
   

})

// Изменение профиля

editProfileBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let editProfileNameInput = editProfileFormNameInput.value;
    let editProfileRodInput = editProfileFormRodInput.value;
    editFullNameHead.textContent = editProfileNameInput;
    editBioText.textContent = editProfileRodInput;
    editProfileModal.classList.remove("open");

})


// functions
// open img modal

const openModalImg = (element) => {
  
  const img = element.querySelector('.card__photo').getAttribute('src');
  const name = element.querySelector('.card__info-name').textContent;
  const photo = document.querySelector('.modal-photo');
  const discription = document.querySelector('.modal-photo-info');

  photo.setAttribute('src', img);
  discription.textContent = name;

  toggleModal(photoModal)
 
}


//обработчики на модальные окна

modal.forEach(modalElement => {
  modalElement.addEventListener('mousedown', function (e) {
   
    closeOnOverlayClick(e, modalElement)
  })
})

//закрытие модального окна по клику мимо

function closeOnOverlayClick(event, modalElement) {
  
  if (event.target.classList.contains('modal')) {
    toggleModal(modalElement);
  }
} 

//переключатель модального окна

function toggleModal(modal) {
  modal.classList.toggle('open') 
  if (modal.classList.contains('open')) {   
    document.addEventListener('keydown', closeOnEsc);
  } else {
    document.removeEventListener('keydown', closeOnEsc);
  }
}

//закрытие модальных окон на Escape

function closeOnEsc() {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.open');
    if (modal) {
      toggleModal(modal);
    }
  }
}

