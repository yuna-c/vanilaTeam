import { getCreditsData } from '../fetchData.js';

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let movieId = params.get('id');
  return movieId;
};

const movieId = getMovieIdFromUrl();

const createActorImg = (credit) => {
  const imageCard = document.createElement('li');
  imageCard.className = 'actor-item';

  const img = document.createElement('img');
  img.className = 'movie-image';
  img.src = `https://image.tmdb.org/t/p/w500${credit.profile_path}`;

  const span = document.createElement('span');
  span.textContent = credit.name;

  imageCard.appendChild(img);
  imageCard.appendChild(span);

  return imageCard;
};

const createActorInfo = (data) => {
  const actorSection = document.createElement('section');
  actorSection.id = 'actor';

  const slideWrapper = document.createElement('div');
  slideWrapper.className = 'slide-wrapper';

  const actorList = document.createElement('ul');
  actorList.className = 'slides';

  data.cast.forEach((credit) => {
    const actorCard = createActorImg(credit);
    actorList.appendChild(actorCard);
  });

  const slideControl = document.createElement('div');
  slideControl.className = 'controls';

  const prev = document.createElement('span');
  prev.className = 'prev';
  prev.textContent = '이전';

  const next = document.createElement('span');
  next.className = 'next';
  next.textContent = '다음';

  slideControl.appendChild(prev);
  slideControl.appendChild(next);

  slideWrapper.appendChild(actorList);
  // slideWrapper.appendChild(slideControl);

  actorSection.appendChild(slideWrapper);
  actorSection.appendChild(slideControl);
  document.getElementById('app').appendChild(actorSection);
};

const setEvent = () => {
  let slides = document.querySelector('.slides');

  // li (얘는 개수를 알 수 있어야 ul 의 너비를 구할 수 있다)
  let slide = document.querySelectorAll('.actor-item');

  // 처음인지 끝인지 구분해야한다.
  let currentIdx = 0;
  let slideCount = slide.length;

  // 이전 다음 버튼
  let prevBtn = document.querySelector('.prev');
  let nextBtn = document.querySelector('.next');

  // 여러개씩 슬라이드가 되는 것들은
  // 항상 width 와 height 를 지정해야한다.
  // 이것이 계산되어야 가로 배열이 칼같이 되니까
  let slideWidth = 200;
  let slideMargin = 30;

  // ul 의 너비를 정해주어야한다.
  slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

  const moveSlide = (num) => {
    slides.style.left = -num * 230 + 'px';
    currentIdx = num;
  };

  nextBtn.addEventListener('click', () => {
    if (currentIdx < slideCount - 1) {
      moveSlide(currentIdx + 1);
    } else {
      moveSlide(0);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
      moveSlide(currentIdx - 1);
    }
    // else {
    //   moveSlide(slideCount - 1);
    // }
  });
};

export const createDetailCredits = async () => {
  const data = await getCreditsData(movieId);

  createActorInfo(data);

  setEvent();
};
