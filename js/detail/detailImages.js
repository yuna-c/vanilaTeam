import { getImages } from '../fetchData.js';

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let movieId = params.get('id');
  return movieId;
};

const movieId = getMovieIdFromUrl();

const createMovieImage = (image) => {
  const imageCard = document.createElement('li');
  imageCard.className = 'image-item';

  const img = document.createElement('img');
  img.className = 'movie-image';
  img.src = `https://image.tmdb.org/t/p/w500${image.file_path}`;

  imageCard.appendChild(img);

  return imageCard;
};

const createImageInfo = (data) => {
  // 이미지 전체 영역
  const imageSection = document.createElement('section');
  imageSection.id = 'images';

  // '포토' 영역
  const titleArea = document.createElement('div'); // 타이틀 들어가는 영역
  titleArea.className = 'images-title';
  const title = document.createElement('h3'); // 타이틀 쓰여지는 영역
  title.textContent = '포토';
  titleArea.appendChild(title);

  // 슬라이드 영역
  const slideWrapper = document.createElement('div');
  slideWrapper.className = 'slide-image-wrapper ';

  const slideList = document.createElement('ul');
  slideList.className = 'image-slide';

  /**
   * 여기에서 슬라이드 영역에 이미지들 넣어줌
   */
  data.backdrops.forEach((credit) => {
    const imageCard = createMovieImage(credit);
    slideList.appendChild(imageCard);
  });

  // 왼쪽 오른쪽 버튼
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

  slideWrapper.appendChild(slideList);

  imageSection.appendChild(titleArea);
  imageSection.appendChild(slideWrapper);
  imageSection.appendChild(slideControl);
  document.getElementById('app').appendChild(imageSection);
};

const setEvent = () => {
  // ul 을 가져온다.
  let slides = document.querySelector('.image-slide');

  // li 를 가져온다.
  let slide = document.querySelectorAll('.image-item');

  // 현재 이미지의 위치 인덱스
  let currentImageIdx = 0;

  // 총 이미지 갯수
  let slideCount = slide.length;

  let prevImageBtn = document.querySelector('.image-prev');
  let nextImageBtn = document.querySelector('.image-next');

  // 이미지 넓이
  let slideWidth = 500;
  let slideMargin = 30;

  // 슬라이드 총 넓이
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
