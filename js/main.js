import { getPopularData, getChangeData } from './fetchData.js';
import { createPagination, handlePagination } from './pager.js';

let pageStart = 1;

// section
export const createSection = async () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const movieUl = document.createElement('ul');
  const data = await getPopularData(pageStart);
  const pageTotal = data.total_pages;
  // console.log(data.results);
  // console.log(data.total_pages);

  section.id = 'section';
  movieUl.id = 'movie-list';
  section.innerHTML = ''; // 섹션 초기화 (밑으로 한 section 더 생기는 것 방지)
  movieUl.innerHTML += cardList(data);

  // async 함수는 불러올 때도 await 시키고 호출을 해야 값을 받아 올 수 있다.
  // const pagination = await createPagination(); //await
  // section.prepend(pagination);

  app.appendChild(section);
  section.insertAdjacentElement('afterbegin', movieUl); // 자식노드 제일 첫번째
  section.insertAdjacentElement('beforeend', createPagination(pageTotal, pageStart)); // 자식노드 제일 마지막
  handlePagination(pageTotal, pageStart);
  activePagenation(pageStart);

  // movieUl.addEventListener('click', handleClick);
};

// id event
// export const handleClick = (e) => {
//   e.preventDefault();
//   const target = e.target;
//   const list = document.getElementById('movie-list');

//   if (target === list) {
//     return false;
//   } else if (target !== list.childNodes) {
//     alert(`id : ${target.parentNode.id}`);
//   }
// };

// cardlist
export const cardList = (data) => {
  const dataResult = data.results;
  // console.log(dataResult);
  let cardTemp = dataResult
    .map((movie) => {
      const { title, poster_path, vote_average, overview, release_date, id } = movie;
      return `
        <li class="movie-item">
          <a href="./page/detail.html?id=${id}">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
          </a>
          <div class="info">
            <h3 class="movie-title">${title}</h3>
            <p>⭐${vote_average}</p>
          </div>
          <div class="overview">
            <h3>overview</h3>
            <strong>${title}</strong>
            <p class="movie-content">
              <span>${overview}</span>
            </p>
          </div>
        </li>
      `;
    })
    .join(''); // 리스트을 순회 할때마다 재할당 되어 join('') 으로 합침
  return cardTemp;
};

// pagination active
const activePagenation = (page) => {
  const pageGroupNum = document.querySelectorAll('.page-num');
  pageGroupNum.forEach((idx) => {
    idx.innerHTML === page ? idx.classList.add('on') : idx.classList.remove('on');
  });
};

// movie change
export const onChangePage = async (pageNumber) => {
  // search의 값을 받는 API를 사용하였기 때문에 변수 선언을 위해 input값을 받아온다
  const searchInput = document.getElementById('search-input').value;
  const movieList = document.getElementById('movie-list');
  const data = searchInput
    ? await getChangeData(searchInput, pageNumber)
    : await getPopularData(pageNumber, window.scrollTo(0, 0));
  const cardTemp = cardList(data);
  movieList.innerHTML = cardTemp;
};

// pagination click
export const handlePagerClick = async (e) => {
  if (e.target.classList.contains('pager')) {
    // 옵셔널 체이닝 : 연산자 왼쪽을 평가한 뒤 값이 있으면 출력 없으면 undefined, null 후 종료
    document.querySelector('.pager.on')?.classList.remove('on');
    e.target.classList.add('on');
    onChangePage(e.target.innerHTML);
  }
};
