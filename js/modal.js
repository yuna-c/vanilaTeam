export const createModal = (display) => {
  const section = document.getElementById('section');
  const modal = document.createElement('div');
  modal.style.display = display;
  modal.id = 'modal';
  modal.classList = 'modal';
  modal.innerHTML = '';
  modal.innerHTML += modalCard();
  section.append(modal);
  const btn = document.querySelector('.btn-close');
  btn.addEventListener('click', () => {
    const newModal = btn.closest('.modal');
    newModal.remove(); // 엘리먼트 리무브 해야 사라진다
  });
  console.log(btn);
};

export function openModal() {
  createModal('block');
}

// 모달 닫기
export function closeModal() {
  createModal('none');
}

const modalCard = () => {
  let modalTemp = `
    <div class="modal-wraper">
      <div class="modal-header">
        <h3 class="tit">회원가입 완료</h3>
        <!--<button id='btnClose' class="btn btn-close"><i class="fa-solid fa-xmark fa-2x"></i></button>-->
      </div>
      <div class="modal-content">
        <p class="txt">
          id :  as1111<br>
          psw :  as121412! 
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-confirm">확인</button>
        <button class="btn btn-close" >닫기</button>
      </div>
    </div>
  `;
  // onclick="modal.style='display:none'" 첫시도
  return modalTemp;
};
