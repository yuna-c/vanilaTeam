import { getChangeData } from './fetchData.js';
import { createPagination, handlePagination } from './pager.js';
import { cardList } from './main.js';
import { createNav } from './nav.js';

// header
export const createHeader = () => {
  const app = document.getElementById('app');
  const header = document.createElement('header');
  const headerDiv = document.createElement('div');
  const headerTitle = document.createElement('h1');
  const headerLogo = document.createElement('a');
  const formDiv = document.createElement('div');
  const searchForm = document.createElement('form');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  header.id = 'header';
  searchForm.id = 'search';
  searchInput.id = 'search-input';
  searchButton.id = 'search-button';

  searchInput.classList = 'search-input';
  searchButton.classList = 'search-button';
  formDiv.classList = 'form';
  headerDiv.classList = 'bind';
  headerTitle.classList = 'tit';

  headerLogo.setAttribute('href', '/index.html');
  searchForm.setAttribute('onsubmit', 'return false');
  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.value;
  searchInput.autofocus = true;
  searchInput.placeholder = '영화를 검색하세요';
  searchInput.required = true;
  headerTitle.innerText = 'CineSpot.8';
  searchButton.innerText = '검색';

  app.appendChild(header);
  header.appendChild(headerDiv);
  headerLogo.appendChild(headerTitle);
  headerDiv.append(headerLogo, formDiv);
  formDiv.append(searchForm);
  createNav();
  searchForm.append(searchInput, searchButton);
  searchForm.addEventListener('submit', () => {
    handleSearch();
  });
  searchButton.addEventListener('click', handleSearch);
};

// search
const handleSearch = async () => {
  // e.preventDefault;
  const mainSlider = document.querySelector('.content');
  const movieUl = document.querySelector('#movie-list');
  // document.querySelectorAll로 가져오면 1개 이상의 dom 객체가 존재할 경우, 노드의 콜렉션으로 리턴
  // NodeList는 .map, .reduce, .filter 함수 사용이 불가능, 이 경우에는 NodeList를 Array 로 변환 후 작업
  const movieli = movieUl.querySelectorAll('.movie-item');
  const pagination = document.getElementById('pagination-list');
  let searchInput = document.querySelector('.search-input').value; // Assignment(할당) to constant variable. let으로 값 재할당하기
  const searchPage = document.querySelector('.on').innerHTML;
  const historyBack = document.createElement('li');
  historyBack.setAttribute('class', 'nonData');
  historyBack.innerHTML = '';

  if (searchInput === '') {
    alert('검색어를 입력하세요.');
  } else {
    mainSlider.style = 'display:none';
    // 검색 API에서 값을 받아와야 하기 때문에 searchInput의 값을 가져온다.
    const data = await getChangeData(searchInput, searchPage, window.scrollTo(0, 0));
    const dataResult = data.total_page;
    const searchCard = cardList(data, searchInput);
    createPagination(dataResult, searchPage);
    handlePagination(dataResult);
    movieUl.innerHTML = searchCard;
    // location.href = '/';
    historyBack.innerHTML += `
    <a href="./">
      <i class="fa-solid fa-arrow-left fa-1x"></i>
      <span>뒤로가기</span>
    </a>

    <div class="non-list">
      검색하신 영화가 없습니다 :)<br> 메인 페이지로 이동해 주세요.
    </div>`;

    if (searchCard === '') {
      pagination.style = 'display:none;';
      // movieUl.removeEventListener('click', handleClick); // 이벤트 삭제
      movieUl.appendChild(historyBack);
    } else {
      pagination.style = 'display:flex;';
      // movieUl.addEventListener('click', handleClick); // 이벤트 재사용
    }
  }
};

// export default createHeader;
