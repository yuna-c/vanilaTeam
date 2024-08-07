export const createNav = () => {
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

// 로그인 상태일 때
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

// 로그아웃 상태일 때
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

    // 스토리지의 값을 0으로 설정해서 로그아웃을 표시
    localStorage.setItem('isLogin', '0');
    window.location.reload();
  } else {
    alert('로그아웃을 취소하셨습니다.');
  }
};
