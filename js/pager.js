import { handlePagerClick } from './main.js';

// pagination
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

export const createPagination = (pageTotal, pageStart) => {
  const paginationList = document.createElement('ul');
  paginationList.id = 'pagination-list';
  paginationList.innerHTML = pagination(pageTotal, pageStart);
  return paginationList;
};

export const handlePagination = () => {
  const pageGroupNum = document.querySelectorAll('.pager');
  pageGroupNum.forEach((idx) => {
    idx.addEventListener('click', handlePagerClick);
  });
};
