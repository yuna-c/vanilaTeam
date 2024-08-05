import { getPopularData } from './fetchData.js';

export const creatSlideBox = async () => {
  const data = await getPopularData(1);

  const app = document.getElementById('app');
  const contentBox = document.createElement('section');
  const slideWrap = document.createElement('div');
  const slideBox = document.createElement('div');
  const slideList = document.createElement('ul');
  const slidePage = document.createElement('ul');

  contentBox.classList = 'content';
  slideWrap.classList = 'slide_wrap';
  slideBox.classList = 'slide_box';
  slideList.classList = 'slide_list';
  slidePage.classList = 'slide_pagination';

  console.log('mainbanner');

  app.appendChild(contentBox);
  contentBox.appendChild(slideWrap).appendChild(slideBox).appendChild(slideList);
  slideList.innerHTML += creatSlideItem(data);
  slideList.appendChild(slidePage);

  sliding(data, slideWrap, slidePage);
};

const creatSlideItem = (data) => {
  const dataResult = data.results.slice(0, 10);
  let slidItem = dataResult
    .map((item) => {
      return `
        <li class="slide_item">
            <img src="https://image.tmdb.org/t/p/original${item.backdrop_path}" alt="${item.title}">
            <div class="txt_box"><p class="txt">"${item.original_title.toUpperCase()}"</p><span class="movie_open">${item.release_date}</span></div>
        </li>
        `;
    })
    .join('');
  return slidItem;
};

const sliding = (data, slideWrap, slidePage) => {
  const pageData = data.results.slice(0, 10); // 데이터 갯수 제한

  // pagination
  pageData.forEach((item) => {
    slidePage.innerHTML += `<li class="pagination_item"><span class="blind">${item.title}</span></li>`;
  });
  let arrSlideList = slideWrap.querySelectorAll('.slide_item');
  let pageItem = slideWrap.querySelectorAll('.pagination_item'); // Error DOM 생성 후 찾기
  let currentIndex = 0; // 현재 보이는 이미지
  let sliderCount = arrSlideList.length; // 이미지 갯수
  let sliderInterval = 4000; // 이미지 변경 간격 시간

  const activePagination = () => {
    pageItem.forEach((item) => item.classList.remove('active'));
    pageItem[currentIndex].classList.add('active');
  };

  const activeSllide = (nextIndex) => {
    arrSlideList.forEach((item) => (item.style.opacity = '0'));
    arrSlideList[nextIndex].style.opacity = '1';
  };

  const loop = () => {
    let nextIndex = (currentIndex + 1) % sliderCount;
    for (let i = 0; i < sliderCount; i++) {
      // 각 페이지네이션마다 클릭 이벤트 추가
      pageItem[i].addEventListener('click', () => {
        currentIndex = i;
        nextIndex = i;
        // 슬라이드 이동 시 현재 활성화된 pagination 슬라이드 변경
        pageItem.forEach((i) => i.classList.remove('active'));
        pageItem[currentIndex].classList.add('active');
        arrSlideList.forEach((i) => {
          i.style.opacity = '0';
        });
        arrSlideList[currentIndex].style.opacity = '1';
      });
    }
    activeSllide(currentIndex);
    activePagination();
    currentIndex = nextIndex;
  };
  loop(); // setInerval 최초 실행 위해 추가

  setInterval(loop, sliderInterval);
};
