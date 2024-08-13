import { getChangeData } from './fetchData.js';
import { createPagination, handlePagination } from './pager.js';
import { cardList } from './main.js';
import { createNav } from './nav.js';

// header
export const createHeader = () => {
  const app = document.getElementById('app');
  const header = document.createElement('header');
  const headerBind = document.createElement('div');
  const headerTitle = document.createElement('h1');
  const moHeader = document.createElement('div');
  const headerHref = document.createElement('a');
  const toggleButton = document.createElement('button');

  // nav
  const nav = document.createElement('nav');
  const searchForm = document.createElement('form');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  // menu
  const menu = document.createElement('div');
  const userInfo = document.createElement('ul');
  const loginButton = document.createElement('button');
  const logoutButton = document.createElement('button');

  userInfo.innerHTML += `
  <li><button class="login" onClick="location.href='/page/login.html'">로그인</button></li>
  <li><button class="logout">로그아웃</button></li>
  <li><button class="mypage" onclick="location.href='/page/mypage.html'" >마이페이지</button></li>
  `;

  menu.id = 'menu';
  moHeader.classList = 'gnb';
  userInfo.classList = 'sign-btn';
  loginButton.classList = 'login';
  logoutButton.classList = 'logout';

  header.id = 'header';
  searchForm.id = 'search';
  searchInput.id = 'search-input';
  searchButton.id = 'search-button';

  toggleButton.classList = 'toggle';
  nav.classList = 'nav';

  searchInput.classList = 'search-input';
  searchButton.classList = 'search-button';
  headerBind.classList = 'bind';
  headerTitle.classList = 'tit';

  headerHref.setAttribute('href', '/index.html');
  searchForm.setAttribute('onsubmit', 'return false');
  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.value;
  searchInput.autofocus = true;
  searchInput.placeholder = '영화를 검색하세요';
  searchInput.required = true;
  headerTitle.innerText = 'CineSpot.8';
  searchButton.innerText = '검색';
  toggleButton.innerHTML += `<i class="fa-solid fa-bars fa-2x"></i>`;

  app.appendChild(header);
  header.append(headerBind);
  headerBind.append(moHeader, nav);
  moHeader.append(headerHref, toggleButton);
  headerHref.append(headerTitle);
  nav.append(searchForm, menu);
  menu.append(userInfo);
  createNav();
  searchForm.append(searchInput, searchButton);

  searchForm.addEventListener('submit', () => {
    handleSearch();
  });
  searchButton.addEventListener('click', handleSearch);
  toggleButton.addEventListener('click', handleToggle);
};

// 네비게이션 토글 기능(mo)
const handleToggle = () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('on');
};

// search : 페이지를 가져와 검색 값이 있을 때와 없을 때로 분기 처리를 해준다. data에 검색한 이름과, active된 페이지의 값을 다 가져와 준다음, 전체페이지 갯수에서 입력 값을 가져와 처리한다.
const handleSearch = async () => {
  const mainSlider = document.querySelector('.content');
  const movieUl = document.querySelector('#movie-list');
  // const movieli = movieUl.querySelectorAll('.movie-item');
  // document.querySelectorAll로 가져오면 1개 이상의 dom 객체가 존재할 경우, 노드의 콜렉션으로 리턴
  // NodeList는 .map, .reduce, .filter 함수 사용이 불가능, 이 경우에는 NodeList를 Array 로 변환 후 작업
  const pagination = document.getElementById('pagination-list');
  let searchInput = document.querySelector('.search-input').value;
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
    historyBack.innerHTML += `
    <a href="/index.html">
      <i class="fa-solid fa-arrow-left fa-1x"></i>
      <span>뒤로가기</span>
    </a>

    <div class="non-list">
      검색하신 영화가 없습니다 :)<br> 메인 페이지로 이동해 주세요.
    </div>`;

    if (searchCard === '') {
      pagination.style = 'display:none;';
      movieUl.appendChild(historyBack);
    } else {
      pagination.style = 'display:flex;';
    }
  }
};
