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
  historyBack.setAttribute('class', 'history');

  historyBack.innerHTML = `
  <a href="/" onClikc="location.href = '/'">
    <i class="fa-solid fa-arrow-left fa-1x"></i>
    <span>뒤로가기</span>
  </a>`;

  section.id = 'section';
  loginForm.id = 'login';

  bind.classList = 'bind';
  loginTitle.classList = 'tit';
  loginId.classList = 'login-id';
  loginPassword.classList = 'login-password';
  submitButtons.classList = 'submit-buttons';
  loginButton.classList = 'login-button';
  joinButton.classList = 'join-button';

  loginTitle.innerText = 'Login';
  loginId.placeholder = '아이디를 입력하세요';
  loginPassword.placeholder = '비밀번호를 입력하세요';
  loginId.type = 'text';
  loginPassword.type = 'password';
  loginButton.type = 'button';
  loginButton.innerText = '로그인 하기';
  joinButton.innerText = '회원가입';
  joinButton.setAttribute('href', '/page/join.html');

  app.appendChild(section);
  section.append(bind);
  bind.append(historyBack, loginForm);
  loginForm.append(loginTitle, loginId, loginPassword, submitButtons);
  submitButtons.append(joinButton, loginButton);
};

// localStorage
const handleLogin = () => {};
