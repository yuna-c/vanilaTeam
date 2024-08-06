import { getImages } from '../fetchData.js';

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let movieId = params.get('id');
  return movieId;
};

const movieId = getMovieIdFromUrl();

const createMovieImg = (image) => {
  const imageCard = document.createElement('li');
  imageCard.className = 'image-item';

  const img = document.createElement('img');
  img.className = 'movie-image';
  img.src = `https://image.tmdb.org/t/p/w500${image.file_path}`;

  imageCard.appendChild(img);

  return imageCard;
};

const createImageInfo = (data) => {
  const actorSection = document.createElement('section');
  actorSection.id = 'images';

  const titleArea = document.createElement('div');
  titleArea.className = 'title';

  const title = document.createElement('h3');
  title.textContent = '포토';

  titleArea.appendChild(title);

  const slideWrapper = document.createElement('div');
  slideWrapper.className = 'slide-image-wrapper ';

  const actorList = document.createElement('ul');
  actorList.className = 'image-slides';

  /**
   * 여기
   */
  data.backdrops.forEach((credit) => {
    const actorCard = createMovieImg(credit);
    actorList.appendChild(actorCard);
  });

  const slideControl = document.createElement('div');
  slideControl.className = 'image-controls';

  const prev = document.createElement('span');
  prev.className = 'image-prev';

  const next = document.createElement('span');
  next.className = 'image-next';

  const prevImg = document.createElement('img');
  prevImg.src = '../assets/img/prev.png';
  const nextImg = document.createElement('img');
  nextImg.src = '../assets/img/next.png';

  prev.appendChild(prevImg);
  next.appendChild(nextImg);

  slideControl.appendChild(prev);
  slideControl.appendChild(next);

  slideWrapper.appendChild(actorList);

  actorSection.appendChild(titleArea);
  actorSection.appendChild(slideWrapper);
  actorSection.appendChild(slideControl);
  document.getElementById('app').appendChild(actorSection);
};

const setEvent = () => {
  let slides = document.querySelector('.image-slides');

  let slide = document.querySelectorAll('.image-item');

  let currentImageIdx = 0;
  let slideCount = slide.length;

  let prevImageBtn = document.querySelector('.image-prev');
  let nextImageBtn = document.querySelector('.image-next');

  let slideWidth = 500;
  let slideMargin = 30;

  slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

  const moveImageSlide = (num) => {
    slides.style.left = -num * 530 + 'px';
    currentImageIdx = num;
  };

  nextImageBtn.addEventListener('click', () => {
    if (currentImageIdx < slideCount - 1) {
      moveImageSlide(currentImageIdx + 1);
    } else {
      moveImageSlide(0);
    }
  });

  prevImageBtn.addEventListener('click', () => {
    if (currentImageIdx > 0) {
      moveImageSlide(currentImageIdx - 1);
    }
  });
};

export const createDetailImages = async () => {
  const data = await getImages(movieId);

  createImageInfo(data);

  setEvent();
};
