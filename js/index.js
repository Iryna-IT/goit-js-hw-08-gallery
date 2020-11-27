// Создай галерею с возможностью клика по ее элементам
// и просмотра полноразмерного изображения в модальном окне.
// Превью результата посмотри по ссылке.

// Разбей задание на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.

// Стартовые файлы
// В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
// В файле gallery - items.js есть массив объектов содержащих информацию о изображениях:
// маленькое изображение, оригинальное и описание.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе img,
// и указываться в href ссылки(это необходимо для доступности).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>
// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".



import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('ul.js-gallery');
const lightboxRef = document.querySelector(".lightbox");
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeModalBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector(".lightbox__overlay");


// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
galleryList.insertAdjacentHTML('beforeEnd', galleryItems.map(({ original, preview, description }) =>
`<li class="gallery__item">
    <a class="gallery__link" href = "${original}">
    <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index=""
      alt="${description}"
    />
  </a>
</li>`).join(""));

// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryList.addEventListener('click', handlegalleryListClick);

function handlegalleryListClick(event) {
    event.preventDefault();
    const target = event.target;
    
    if (target.nodeName !== "IMG") {
        return
    };

    const url = target.dataset.source;

    changeUrl(url);
    
    openModal(target);
};

// 3. Открытие модального окна по клику на элементе галереи.
function openModal() {
    lightboxRef.classList.add ("is-open");
};

// 4. Подмена значения атрибута src элемента img.lightbox__image.
function changeUrl(url) {
    lightboxImageRef.src = url;
}

// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image.
closeModalBtnRef.addEventListener('click', closeModalBtn);

function closeModalBtn(event) {
    lightboxRef.classList.remove("is-open");
    changeUrl("");
    window.removeEventListener('keydown', handleKeydownWindow);
}

// Закрытие модального окна по клику на div.lightbox__overlay.
overlayRef.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
        closeModalBtn();
    }
});

// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
window.addEventListener('keydown', handleKeydownWindow);
function handleKeydownWindow(event) {
    if (event.code === "Escape") {
        closeModalBtn();
        window.removeEventListener('keydown', handleKeydownWindow);
    };
    if (lightboxRef.classList.contains("is-open")) {
        if (event.code === "ArrowRight") {
            // swipeRight(event);
            console.log("ArrowRight");
        };
        if (event.code === "ArrowLeft") {
            console.log("ArrowLeft");
        };
    };
}



// function swipeRight(event) {
//     let currentSrc = event.target.firstElementChild.dataset.source;
//     const arrImgRef = galleryList.querySelectorAll('.gallery__image');
//     console.log(currentSrc);
//     let index = 0;
//         for (let i = 0; i <= arrImgRef.length; i += 1) {
            
//             if (arrImgRef[i].dataset.source === currentSrc) {
//                 console.log(true);
//                 index = i+1;
//                 currentSrc = arrImgRef[i + 1].dataset.source;
//                 console.log(index);
//                 console.log(arrImgRef[i + 1].dataset.source);
            
//             };
//             changeUrl(arrImgRef[`${index}`].dataset.source);
//             window.removeEventListener('keydown', handleKeydownWindow);
//         };
//     }


