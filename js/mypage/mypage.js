import { createModal, closeModal, openModal } from '../modal.js';
// createModal();

// join
export const createJoin = () => {
  const app = document.getElementById('app');
  const section = document.createElement('section');
  const bind = document.createElement('div');
  const joinForm = document.createElement('form');
  const joinTitle = document.createElement('h2');
  const fieldsetId = document.createElement('fieldset');
  const fieldsetPsw = document.createElement('fieldset');
  const fieldsetStrong = document.createElement('fieldset');
  const joinId = document.createElement('input');
  const joinPassword = document.createElement('input');
  const joinPasswordStrong = document.createElement('input');
  const joinButton = document.createElement('button');
  const idError = document.createElement('p');
  const passwordError = document.createElement('p');
  const passwordStrongError = document.createElement('p');
  const historyBack = document.createElement('div');
  const search = document.querySelector('#search');

  historyBack.setAttribute('class', 'history');
  idError.setAttribute('class', 'error-id');
  passwordError.setAttribute('class', 'error-password');
  passwordStrongError.setAttribute('class', 'error-strong');
  search.style = 'display:none';
  search.autofocus = false;

  section.id = 'section';
  joinForm.id = 'join';

  bind.classList = 'bind';
  joinTitle.classList = 'tit';
  joinId.classList = 'join-id';
  joinPassword.classList = 'join-password';
  joinPasswordStrong.classList = 'join-strong';
  joinButton.classList = 'join-button';

  joinTitle.innerText = 'Join Us';
  joinId.type = 'text';
  joinId.placeholder = '아이디를 입력하세요.';
  joinPassword.type = 'password';
  joinPassword.placeholder = '비밀번호를 입력하세요.';
  joinPasswordStrong.type = 'password';
  joinPasswordStrong.placeholder = '비밀번호를 확인하세요.';

  idError.innerText = '* 영문+숫자 조합 5~20자로 입력해 주세요.';
  passwordError.innerText = '* 비밀번호는 영어/숫자/특수문자를 포함한 8자 이상 입력해 주세요.';
  passwordStrongError.innerText = '* 확인 비밀번호를 입력해 주세요.';
  joinButton.type = 'button';

  joinButton.innerText = '회원가입하기';
  historyBack.innerHTML = `
  <a href="/index.html">
    <i class="fa-solid fa-arrow-left fa-1x"></i>
    <span>뒤로가기</span>
  </a>`;

  // const bbb = document.createElement('button');
  // bbb.id = 'bbb';
  // bbb.innerText = '회원가입하기';

  app.appendChild(section);
  section.append(bind);
  bind.append(historyBack, joinForm);
  joinForm.append(joinTitle, fieldsetId, fieldsetPsw, fieldsetStrong, joinButton);
  fieldsetId.append(joinId, idError);
  fieldsetPsw.append(joinPassword, passwordError);
  fieldsetStrong.append(joinPasswordStrong, passwordStrongError);
  joinButton.addEventListener('click', handleJoin);
  // const modal = document.getElementById('modal');

  // bbb.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   openModal();
  // });
  // const target = document.querySelector('#bbb');
  // console.log(modal, target);
};

// Join
const handleJoin = () => {
  // const idKey = 'USER-ID';
  const joinId = document.querySelector('.join-id');
  const joinPassword = document.querySelector('.join-password');
  const joinPasswordStrong = document.querySelector('.join-strong');
  const idError = document.querySelector('.error-id');
  const passwordError = document.querySelector('.error-password');
  const passwordStrongError = document.querySelector('.error-strong');

  let joinIdValue = joinId.value;
  let joinPasswordValue = joinPassword.value;
  let joinPasswordStrongValue = joinPasswordStrong.value;

  // 1. 입력값 여부 확인
  if (checkNullInput(joinId) && checkNullInput(joinPassword) && checkNullInput(joinPasswordStrong)) {
    // 입력 했을 때 console.log(`${joinIdValue}, ${joinPasswordValue}, ${joinPasswordStrongValue} 입력은 함`);

    // 유효성 검사
    if (checkId(joinIdValue)) {
      console.log(`${joinIdValue} 아이디 유효성 정상`);
      idError.style = 'display:none';
    } else {
      console.log(`${joinIdValue} 아이디 유효성 비정상`);
      idError.style = 'display:block';
      return;
    }
    if (checkPwd(joinPasswordValue)) {
      console.log(`${joinPasswordValue} 비밀번호 유효성 정상`);
      passwordError.style = 'display:none';
    } else {
      console.log(`${joinPasswordValue} 비밀번호 유효성 비정상`);
      passwordError.style = 'display:block';
      return;
    }
    if (checkPwd(joinPasswordStrongValue)) {
      console.log(`${joinPasswordStrongValue} 비밀번호 확인 유효성 정상`);
      passwordStrongError.style = 'display:none';
    } else {
      console.log(`${joinPasswordStrongValue} 비밀번호 확인 유효성 비정상`);
      passwordStrongError.style = 'display:block';
      return;
    }

    if (isMatch(joinPasswordValue, joinPasswordStrongValue)) {
      console.log(`${joinPasswordValue} 비밀번호 두개 같을 때 `);

      if (checkPwd(joinPasswordStrongValue)) {
        console.log(`${joinPasswordStrongValue} 비밀번호 확인 유효성 정상`);
        passwordStrongError.style = 'display:none';
      } else {
        console.log(`${joinPasswordStrongValue} 비밀번호 확인 유효성 비정상`);
        passwordStrongError.style = 'display:block';
        return;
      }
    } else {
      console.log(`${joinPasswordValue} 비밀번호 두개 다름 `);
      passwordStrongError.textContent = '* 두 비밀번호가 다릅니다.';
      passwordStrongError.style = 'display:block';
      return;
    }
  } else {
    // 입력 안했을 때 비어있는 곳으로 포커스.
    if (checkNullInput(joinId) == false) {
      // 세개 모두 false인 경우(세개 모두 미입력된 경우), 또는 아이디가 false를 반환한 경우(아이디 미입력 경우)
      joinId.focus();
      idError.style = 'display:block';
      return false;
    } else if (checkNullInput(joinPassword) == false) {
      // 비밀번호 미입력한 경우
      joinPassword.focus();
      passwordError.style = 'display:block';
      return false;
    } else {
      // 비밀번호 확인을 안 한 경우
      joinPasswordStrong.focus();
      passwordStrongError.textContent = '* 확인 비밀번호를 정확하게 입력해 주세요.';
      passwordStrongError.style = 'display:block';
      return false;
    }
  }

  JoinInfo(joinIdValue, joinPasswordValue);
};

// 인풋 입력 여부 확인 함수
const checkNullInput = (input) => {
  if (input.value == '') {
    console.log('회원가입 정보 미입력');
    return false;
  } else {
    console.log('회원가입 정보 입력');
    return true;
  }
};

//아이디 정규식 체크 함수 : 영문자로 시작해야하는(숫자가 앞으로 올 수 없음) 영문+숫자 조합 5~20자로 입력
const checkId = (strId) => {
  const regId = /^[a-z]+[a-z0-9]{4,19}$/g;
  //정규식과 매치되면 true, 매치되지않으면 false 반환.
  return regId.test(strId);
};

//비밀번호 정규식 체크 함수 : 영어/숫자/특수문자를 포함한 8자 이상 입력
const checkPwd = (strPw) => {
  const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //정규식과 매치되면 true, 매치되지않으면 false 반환.
  return regPw.test(strPw);
};

// 비밀번호와 비밀번호 확인 일치
function isMatch(pwd1, pwd2) {
  return pwd1 === pwd2;
}

// 회원가입 저장(localstorage)
function JoinInfo(idValue, pswValue) {
  let getUsername = localStorage.getItem('username');
  console.log(getUsername);

  if (getUsername === idValue) {
    alert('이미 계정이 존재합니다.');
    return;
  }

  localStorage.setItem('username', idValue);
  localStorage.setItem('password', pswValue);
  alert(
    `회원가입을 완료 하였습니다.
귀하의 아이디는 ${idValue},
비밀번호는 ${pswValue} 입니다.
`
  );

  window.location.href = './login.html';
}
