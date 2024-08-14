//아이디 정규식 체크 함수 : 영문자로 시작해야하는(숫자가 앞으로 올 수 없음) 영문+숫자 조합 5~20자로 입력
export const checkId = (strId) => {
  const regId = /^[a-z]+[a-z0-9]{4,19}$/g;
  //정규식과 매치되면 true, 매치되지않으면 false 반환.
  return regId.test(strId);
};

//비밀번호 정규식 체크 함수 : 영어/숫자/특수문자를 포함한 8자 이상 입력
export const checkPwd = (strPw) => {
  const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //정규식과 매치되면 true, 매치되지않으면 false 반환.
  return regPw.test(strPw);
};

// 비밀번호와 비밀번호 확인 일치 여부
export const isMatch = (pwd1, pwd2) => {
  return pwd1 === pwd2;
};
