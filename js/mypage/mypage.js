// import { createModal, closeModal, openModal } from '../modal.js';
import { checkPwd } from '../join/join.js';

// mypage
export const createMypage = () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const bind = document.createElement('div');
  const search = document.querySelector('#search');
  const historyBack = document.createElement('div');

  const tit = document.createElement('h2');
  const myInfo = document.createElement('article');
  const myProfile = document.createElement('div');
  const myBookMark = document.createElement('div');
  const userPassword = document.createElement('p');
  let username = localStorage.getItem('username');
  let password = localStorage.getItem('password');

  historyBack.setAttribute('class', 'history');

  search.style = 'display:none';
  search.autofocus = false;

  section.id = 'section';
  userPassword.id = 'userPassword';

  bind.classList.add('bind');
  tit.classList.add('tit');
  myInfo.classList.add('my-info');
  myProfile.classList.add('my-profile');
  myBookMark.classList.add('my-bookmark');

  historyBack.innerHTML = `
  <a href="/index.html" >
    <i class="fa-solid fa-arrow-left fa-1x"></i>
    <span>뒤로가기</span>
  </a>`;

  myProfile.innerHTML += `  
  <a href= '/' title="이미지 등록하고 싶어요. ( ܸ ⩌⩊⩌ ܸ )">
    <div class="ico-profile">
      <!--<img src="http://via.placeholder.com/200x200" alt="user" />-->
      <i class="fa-solid fa-user fa-4x"></i>
    </div>
  </a>
  <p class="our">&lt;팔풍당당&gt;</p>
  <p id="userId">ID : ${username}</p>
  <p id="${'userPassword'}">비밀번호 변경</p>
  `;

  myBookMark.innerHTML += `
  <div class="bookmark-list">
    <p class='tit'>북마크한 영화</p>
    <div class="card-list"></div>
  </div>
  `;

  app.appendChild(section);
  section.append(bind);
  bind.append(historyBack, myInfo);
  myInfo.append(myProfile, myBookMark);

  handlechagePassword(password);
  window.addEventListener('load', handleBookmark);
  document.addEventListener('click', handleDeleteBookmark);
};

// 북마크 영화 가져오기
const handleBookmark = () => {
  const myCardlist = document.querySelector('.card-list');
  myCardlist.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // bookmark라는 글자로 시작되면 로컬스토리지에서 영화 데이터 값을 가지고 온다
    if (key.startsWith('bookmark-')) {
      const movieData = JSON.parse(localStorage.getItem(key));
      const title = movieData.title;
      const imgUrl = movieData.img;
      // console.log(`로컬 스토리지 키값과 제목, 이미지URL 가져오기 :`, key, title, imgUrl);

      const card = document.createElement('div');
      const cardBind = document.createElement('div');
      const cardImg = document.createElement('img');
      const cardTitle = document.createElement('p');
      const cardDelete = document.createElement('button');

      card.classList.add('card-item');
      cardBind.classList.add('card-img');
      cardTitle.classList.add('card-tit');
      cardDelete.classList.add('card-delete');

      cardTitle.textContent = title;
      cardDelete.innerHTML = `<i class="fa-solid fa-trash" style="color: #000000;"></i>`;
      cardImg.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;

      card.append(cardBind, cardTitle);
      cardBind.append(cardImg, cardDelete);
      myCardlist.append(card);
    }
  }
};

// 북마크 영화 삭제하기
const handleDeleteBookmark = (e) => {
  const targetDelete = e.target.closest('.card-delete');
  if (targetDelete) {
    const card = e.target.closest('.card-list');
    const titleEle = card.querySelector('.card-tit');
    const cardTitle = titleEle.textContent;
    localStorage.removeItem(`bookmark-${cardTitle}`);

    handleBookmark();
  }
};

// 비밀번호 변경
const handlechagePassword = () => {
  let userPassword = document.getElementById('userPassword');

  if (userPassword) {
    let userPassword = document.getElementById('userPassword');
    userPassword.innerText = `비밀번호변경`;
  }
  userPassword.addEventListener('click', () => {
    let newPassword = prompt('새로운 비밀번호 입력하세요!');
    let currentPassword = localStorage.getItem('password');

    if (newPassword === currentPassword) {
      alert('현재 비밀번호와 동일합니다. 다른 비밀번호를를 입력해주세요.');
    } else if (String(newPassword.length) >= 8 && checkPwd(newPassword)) {
      localStorage.setItem('password', newPassword);

      let userPassword = document.getElementById('userPassword');
      userPassword.innerText = `비밀번호변경`;
      alert(`비밀번호가 ${newPassword}로 변경 완료되었습니다.`);
    } else {
      alert('비밀번호는 최소 8글자 이상이어야하며, 영문+숫자 조합 5~20자로 입력해 주세요.');
    }
  });
};
