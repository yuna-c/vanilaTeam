import { getPopularData, getChangeData } from './fetchData.js';
import { createPagination, handlePagination } from './pager.js';

let pageStart = 1;

// section
export const createSection = async () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const movieUl = document.createElement('ul');
  // 페이지 개수랑 함께 가져와야 하기 때문에 초기 페이지 지정 ${page}
  // async 함수는 불러올 때도 await 시키고 호출을 해야 값을 받아 올 수 있다.
  const data = await getPopularData(pageStart);
  // ex) const pagination = await createPagination(); //await
  // ex) section.prepend(pagination); 이렇게 할당 하지 않을 시 undefined
  const pageTotal = data.total_pages;

  section.id = 'section';
  movieUl.id = 'movie-list';
  section.innerHTML = ''; // 섹션 초기화 (밑으로 한 section 더 생기는 것 방지)
  movieUl.innerHTML += cardList(data);

  app.appendChild(section);
  section.insertAdjacentElement('afterbegin', movieUl); // 자식노드 제일 첫번째
  section.insertAdjacentElement('beforeend', createPagination(pageTotal, pageStart)); // 자식노드 제일 마지막
  handlePagination(pageTotal, pageStart);
  activePagenation(pageStart);
};

// cardlist : data를 받아와서 위의 create 함수에서 처리하기 위해 매개변수 설정
export const cardList = (data) => {
  const dataResult = data.results;
  // console.log(dataResult);
  let cardTemp = dataResult
    .map((movie) => {
      // 구조분해 할당을 통해 이름 간소화 시킴
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
    .join('');
  // 리스트을 순회 할때마다 재할당 되어 join('') 으로 합침
  return cardTemp;
};

// pagination active : 페이지의 숫자를 다 가져와 각 페이지를 활성화 시키기 위해 forEach로 배열을 돌려 page: start에서 n 페이지 번째 페이지를 활성화 시켜주고 아니면 지워줌 (page : pageStart)
const activePagenation = (page) => {
  const pageGroupNum = document.querySelectorAll('.page-num');
  console.log(pageGroupNum);
  pageGroupNum.forEach((idx) => {
    idx.innerHTML === page ? idx.classList.add('on') : idx.classList.remove('on');
  });
};
// movie change : 페이지의 숫자를 누르면 화면이 변하는 함수 설정, 화면이 바뀌어야 하기 때문에 searchAPI의 값을 변경할 필요가 있기 때문에 무비리스트 전체를 가지고 오고, 누른 페이지 숫자 data가 search(page)의 값과 같으면, searchInput(누른 데이터 값의 page)를 가져와 페이지를 표시하여 카드data를 카드 리스트에 담아서 출력해 준다.
export const onChangePage = async (pageNumber) => {
  // search의 값을 받는 API를 사용하였기 때문에 변수 선언을 위해 input값을 받아온다
  const searchInput = document.getElementById('search-input').value;
  // console.log(searchInput);
  const movieList = document.getElementById('movie-list');
  const data = searchInput
    ? await getChangeData(searchInput, pageNumber)
    : await getPopularData(pageNumber, window.scrollTo(0, 0));
  const cardTemp = cardList(data);
  movieList.innerHTML = cardTemp;
};

// pagination click : pager에서 import된 함수로, 페이지네이션 버튼에 클릭 이벤트를 받아 주기 위해 설정
export const handlePagerClick = async (e) => {
  if (e.target.classList.contains('pager')) {
    // 옵셔널 체이닝 : 연산자 왼쪽을 평가한 뒤 값이 있으면 출력 없으면 undefined, null 후 종료
    document.querySelector('.pager.on')?.classList.remove('on');
    e.target.classList.add('on');
    onChangePage(e.target.innerHTML);
  }
};
