import { createModal, closeModal, openModal } from '../modal.js';
// createModal();

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
  <div class="user-bookMark">
    <p class='tit'>북마크한 영화</p>
    <div class="card-list"></div>
  </div>
  `;

  console.log(username, userPassword);
  app.appendChild(section);
  section.append(bind);
  bind.append(historyBack, myInfo);
  myInfo.append(myProfile, myBookMark);
  // joinButton.addEventListener('click', handleBookmark);
  handlechagePassword(password);
};

// Join
const handleBookmark = () => {};

// changePassword
const handlechagePassword = () => {
  // let password = localStorage.getItem('password');
  let userPassword = document.getElementById('userPassword');
  console.log(userPassword.length);

  if (userPassword) {
    let userPassword = document.getElementById('userPassword');
    userPassword.innerText = `비밀번호변경`; //password
  }
  userPassword.addEventListener('click', (password) => {
    let newPassword = prompt('새로운 비밀번호 입력하세요!');
    let currentPassword = localStorage.getItem('password');

    if (newPassword === currentPassword) {
      alert('현재 비밀번호와 동일합니다. 다른 비밀번호를를 입력해주세요.');
    } else if (String(newPassword.length) >= 8) {
      localStorage.setItem('password', newPassword);

      let userPassword = document.getElementById('userPassword');
      userPassword.innerText = `비밀번호변경`; //newPassword
      alert(`비밀번호가 ${newPassword}로 변경 완료되었습니다.`);
    } else {
      alert('비밀번호는 최소 8글자 이상이어야 합니다.');
    }
  });
};
