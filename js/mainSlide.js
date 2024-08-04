import { getPopularData } from './fetchData.js';

export const creatSlideBox = async () => {
  const data = await getPopularData(1);

  const app = document.getElementById('app');
  const contentBox = document.createElement('section');
  const text = document.createElement('p');
  const slideWrap = document.createElement('div');
  const slideBox = document.createElement('div');
  const slideList = document.createElement('ul');
  const slideItem = creatSlideItem(data);

  contentBox.classList = 'content';
  slideWrap.classList = 'slide_wrap';
  slideBox.classList = 'slide_box';
  slideList.classList = 'slide_list';
  text.classList = 'txt';

  text.innerHTML = `영화 리뷰 페이지<br>리뷰, 줄거리, 평점까지 한번에 다<br>여기서 확인하세요`;

  console.log('mainbanner');
  console.log(slideItem);

  app.appendChild(contentBox).appendChild(text);
  contentBox.appendChild(slideWrap).appendChild(slideBox).appendChild(slideList);
  slideList.innerHTML += creatSlideItem(data);
  const arrSlideList = slideWrap.querySelectorAll('.slide_item');

  sliding(arrSlideList);
};

const creatSlideItem = (data) => {
  const dataResult = data.results.slice(0, 10);
  let slidItem = dataResult
    .map((item) => {
      return `
        <li class="slide_item">
            <img src="https://image.tmdb.org/t/p/w1280${item.backdrop_path}" alt="${item.title}">
        </li>
        `;
    })
    .join('');
  return slidItem;
};

const sliding = (arrSlideList) => {
  let currentIndex = 0; // 현재 보이는 이미지
  let sliderCount = arrSlideList.length; // 이미지 갯수
  let sliderInterval = 3000; // 이미지 변경 간격 시간

  setInterval(() => {
    let nextIndex = (currentIndex + 1) % sliderCount;
    arrSlideList[currentIndex].style.opacity = '0';
    arrSlideList[nextIndex].style.opacity = '1';
    currentIndex = nextIndex;
  }, sliderInterval);
};
