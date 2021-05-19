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

  onLightboxOpen(evt);
}

function onLightboxOpen(evt) {
  const isGalleryImage = document.querySelector('img.gallery__image');
  if (!isGalleryImage) {
    return;
  }

  lightboxCloseButton.addEventListener('click', onLightboxClose);
  lightboxOverlay.addEventListener('click', onLightboxClose);
  window.addEventListener('keydown', onEscCodePress);
  //   window.addEventListener('keydown', onArrowBtnPress);
  lightbox.classList.add('is-open');
  lightboxImage.src = evt.target.dataset.source;
}

function onLightboxClose() {
  lightboxCloseButton.removeEventListener('click', onLightboxClose);
  lightboxOverlay.removeEventListener('click', onLightboxClose);
  window.removeEventListener('keydown', onEscCodePress);
  //   window.removeEventListener('keydown', onArrowBtnPress);
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}

function onEscCodePress(evt) {
  if (evt.code === 'Escape') {
    onLightboxClose();
  }
}

// function onArrowBtnPress(evt) {
//   const galleryImage = document.querySelector('img.gallery__image');

//   if (evt.code === 'ArrowRight') {
//     lightboxImage.index = galleryImage.dataset.index + 1;
//   } else if (evt.code === 'ArrowLeft') {
//     lightboxImage.index = galleryImage.dataset.index - 1;
//   } else {
//     return;
//   }
// }
