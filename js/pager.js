import { handlePagerClick } from './main.js';

// pagination
const pagination = (pageTotal, pageStart) => {
  let pageTemp = '';
  const pageGroup = 8;
  const pageEnd = Math.min(pageStart + pageGroup - 1);
  for (let i = pageStart; i <= pageEnd; i++) {
    const active = i === pageStart ? 'on' : '';
    pageTemp += `<li class="pager ${active}" id="${i}">${i}</li>`;
  }
  return pageTemp;
};

export const createPagination = (pageTotal, pageStart) => {
  const paginationList = document.createElement('ul');
  paginationList.innerHTML = pagination(pageTotal, pageStart);
  paginationList.id = 'pagination-list';
  return paginationList;
};

export const handlePagination = () => {
  const pageGroupNum = document.querySelectorAll('.pager');
  pageGroupNum.forEach((idx) => {
    idx.addEventListener('click', handlePagerClick);
  });
};
