import items from './data/gallery-items.js';

const galleryContainer = document.querySelector('ul.js-gallery');
const lightbox = document.querySelector('div.lightbox');
const lightboxOverlay = document.querySelector('div.lightbox__overlay');
const lightboxImage = document.querySelector('img.lightbox__image');
const lightboxCloseButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const galleryItemsMarkup = createGalleryItemsMarkup(items);
galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryContainer.addEventListener('click', onGalleryImageClick);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }, index) => {
      return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        data-index="${index}"
                        alt="${description}"
                    />
                </a>
            </li>`;
    })
    .join('');
}

function onGalleryImageClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  onLightboxOpen(evt);
}

function onLightboxOpen(evt) {
  lightboxCloseButton.addEventListener('click', onLightboxClose);
  lightboxOverlay.addEventListener('click', onLightboxClose);
  window.addEventListener('keydown', onEscBtnPress);
  window.addEventListener('keydown', onArrowBtnPress);
  lightbox.classList.add('is-open');
  lightboxImage.src = evt.target.dataset.source;

  const dataIndexOfCurrentGalleryImage = evt.target.dataset.index;
  console.log(dataIndexOfCurrentGalleryImage);
  lightboxImage.setAttribute('data-index', `${dataIndexOfCurrentGalleryImage}`);
  console.log(lightboxImage.dataset.index);

  onArrowBtnPress(evt);
}

function onLightboxClose() {
  lightboxCloseButton.removeEventListener('click', onLightboxClose);
  lightboxOverlay.removeEventListener('click', onLightboxClose);
  window.removeEventListener('keydown', onEscBtnPress);
  window.removeEventListener('keydown', onArrowBtnPress);
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}

function onEscBtnPress(evt) {
  if (evt.code === 'Escape') {
    onLightboxClose();
  }
}

function onArrowBtnPress(evt) {
  let indexOfCurrentLightboxImage;

  if (evt.code === 'ArrowRight') {
    indexOfCurrentLightboxImage = Number(lightboxImage.dataset.index) + 1;
  }

  if (evt.code === 'ArrowLeft') {
    indexOfCurrentLightboxImage = Number(lightboxImage.dataset.index) - 1;
  }
}
