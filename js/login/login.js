import { goIndex } from '../goMain.js';

// login
export const createLogin = () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const bind = document.createElement('div');
  const loginForm = document.createElement('form');
  const loginTitle = document.createElement('h2');
  const loginId = document.createElement('input');
  const loginPassword = document.createElement('input');
  const submitButtons = document.createElement('div');
  const loginButton = document.createElement('button');
  const joinButton = document.createElement('a');
  const historyBack = document.createElement('div');
  const search = document.querySelector('#search');

  section.id = 'section';
  loginForm.id = 'login';

  bind.classList = 'bind';
  loginTitle.classList = 'tit';
  loginId.classList = 'login-id';
  loginPassword.classList = 'login-password';
  submitButtons.classList = 'submit-buttons';
  loginButton.classList = 'login-button';
  joinButton.classList = 'join-button';
  historyBack.setAttribute('class', 'history');
  search.style = 'display:none';
  search.autofocus = false;

  loginTitle.innerText = 'Login';
  loginId.placeholder = '아이디를 입력하세요';
  loginPassword.placeholder = '비밀번호를 입력하세요';
  loginId.type = 'text';
  loginPassword.type = 'password';
  loginButton.type = 'button';
  loginButton.innerText = '로그인 하기';
  joinButton.innerText = '회원가입';
  joinButton.setAttribute('href', './join.html');

  historyBack.innerHTML = `
  <a href="/index.html">
    <i class="fa-solid fa-arrow-left fa-1x"></i>
    <span>뒤로가기</span>
  </a>`;

  app.appendChild(section);
  section.append(bind);
  bind.append(historyBack, loginForm);
  loginForm.append(loginTitle, loginId, loginPassword, submitButtons);
  submitButtons.append(joinButton, loginButton);

  loginButton.addEventListener('click', handleLogin);
};

// localStorage
const handleLogin = () => {
  let username = document.querySelector('.login-id').value;
  let password = document.querySelector('.login-password').value;
  console.log(username, password);

  let getUsername = localStorage.getItem('username');
  let getPassword = localStorage.getItem('password');
  console.log(getUsername, getPassword);

  if (username === getUsername && password === getPassword) {
    alert('로그인 되었습니다');

    localStorage.setItem('isLogin', '1');
    const loginHeaderButton = document.querySelector('.login');
    loginHeaderButton.style.display = 'none';
    const logoutHeaderButton = document.querySelector('.logout');
    logoutHeaderButton.style.display = 'block';

    goIndex();
  } else {
    alert('아이디 또는 비밀번호가 바르지 않습니다.');
  }
};
