// 푸터
const createFooter = () => {
	const app = document.getElementById('app');

	const footer = document.createElement('footer');
	const footerDiv = document.createElement('div');
	const footerTitle = document.createElement('h2');

	footer.id = 'footer';
	footerTitle.classList = 'tit';
	footerDiv.classList = 'bind';
	footerTitle.innerText = 'Footer';
	footerDiv.appendChild(footerTitle);
	footer.appendChild(footerDiv);
	// app.appendChild(footer);
	app.insertAdjacentElement('beforeend', footer);
};

export default createFooter;
