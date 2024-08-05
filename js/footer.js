// footer
export const createFooter = () => {
  const app = document.getElementById('app');

  const footer = document.createElement('footer');
  const footerDiv = document.createElement('div');
  const footerTitle = document.createElement('h2');

  footer.id = 'footer';

  footerTitle.classList = 'tit';
  footerDiv.classList = 'bind';
  footerTitle.innerText = '팔풍당당';

  footerDiv.appendChild(footerTitle);
  footer.appendChild(footerDiv);
  app.insertAdjacentElement('beforeend', footer);
};
