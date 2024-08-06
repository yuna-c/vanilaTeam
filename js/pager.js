import { handlePagerClick } from './main.js';

// 페이지네이션 생성 : 전체 페이지 개수와, 첫번째 페이지 개수를 가져와 1-8까지 출력해 준 후 class를 붙여 활성화 여부를 표기해 준다.
const pagination = (pageTotal, pageStart) => {
  const pageGroup = 8;
  let pageTemp = '';
  const pageEnd = Math.min(pageStart + pageGroup - 1);
  for (let i = pageStart; i <= pageEnd; i++) {
    const active = i === pageStart ? 'on' : '';
    pageTemp += `<li class="pager ${active}" id="${i}">${i}</li>`;
  }
  return pageTemp;
};

// 페이지네이션 카드 생성하기 : 페이지네이션의 전체페이지, 첫번째 페이지를 인자로 받아 페이지 네이션 기능을 완성해주고 리턴
export const createPagination = (pageTotal, pageStart) => {
  const paginationList = document.createElement('ul');
  paginationList.id = 'pagination-list';
  paginationList.innerHTML = pagination(pageTotal, pageStart);
  return paginationList;
};

// 페이지네이션 버튼에 클릭 이벤트 달기 위한 이벤트 생성 : 전체 페이지에 활성화를 시키기 위해 모든 페이지li를 가져와서 각각의 index번째 li에 main에서 import시킨 이벤트를 가져와 달아준다.
export const handlePagination = () => {
  const pageGroupNum = document.querySelectorAll('.pager');
  pageGroupNum.forEach((idx) => {
    idx.addEventListener('click', handlePagerClick);
  });
};
