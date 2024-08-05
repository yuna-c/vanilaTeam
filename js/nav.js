export const createNav = () => {
  const nav = document.querySelector('.pc-nav');
  // const menu = document.createElement('div');
  // const userInfo = document.createElement('ul');
  // const loginButton = document.createElement('button');
  // const logoutButton = document.createElement('button');

  // menu.id = 'menu';
  // userInfo.classList = 'sign-btn';
  // loginButton.classList = 'login';
  // logoutButton.classList = 'logout';

  // 순서 지키기
  // Cannot read properties of null (reading 'style') .style.background
  // loginHeaderButton.style.backgroundColor = 'red';

  // userInfo.innerHTML += `
  // <li><button class="login" onClick="location.href='/page/login.html'">로그인</button></li>
  // <li><button class="logout">로그아웃</button></li>
  // <li><a href="/page/mypage.html">마이페이지</a></li>
  // `;

  // nav.append(menu);
  // menu.append(userInfo);
  // toggleButton.append(userInfo);

  // const loginHeaderButton = document.querySelector('.login');
  // const logoutHeaderButton = document.querySelector('.logout');
  // loginHeaderButton.style.backgroundColor = 'red';
  // loginHeaderButton.style = 'display:block';

  isLoginValue();
};

// 로그인 처리(로컬 스토리지)
const isLoginValue = () => {
  let isLogin = localStorage.getItem('isLogin');

  if (isLogin === '1') {
    showLogoutButton();
  } else {
    showLoginButton();
  }
};

const showLogoutButton = () => {
  const loginHeaderButton = document.querySelector('.login');
  const logoutHeaderButton = document.querySelector('.logout');
  const myPageHeader = document.querySelector('.mypage');
  loginHeaderButton.style = 'display:none';
  logoutHeaderButton.style = 'display:block';
  myPageHeader.style = 'display:block';
  // createNav에 이벤트를 달면, showLogoutButton에 포함 되어있는 함수가 먼저 실행 되기 때문에 이곳에서 실행
  logoutHeaderButton.addEventListener('click', handleLogout);
};

const showLoginButton = () => {
  const loginHeaderButton = document.querySelector('.login');
  const logoutHeaderButton = document.querySelector('.logout');
  const myPageHeader = document.querySelector('.mypage');
  loginHeaderButton.style = 'display:block';
  logoutHeaderButton.style = 'display:none';
  myPageHeader.style = 'display:none';
};

// 로그아웃 처리
const handleLogout = () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    alert('로그아웃 하셨습니다.');

    const loginHeaderButton = document.querySelector('.login');
    const logoutHeaderButton = document.querySelector('.logout');
    const myPageHeader = document.querySelector('.mypage');
    loginHeaderButton.style = 'display:block';
    logoutHeaderButton.style = 'display:none';
    myPageHeader.style = 'display:block';

    localStorage.setItem('isLogin', '0');
    window.location.reload();
  } else {
    alert('로그아웃을 취소하셨습니다.');
  }
};
