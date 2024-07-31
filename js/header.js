// 헤더
const createHeader = () => {
	const app = document.getElementById('app');
	const header = document.createElement('header');
	const headerDiv = document.createElement('div');
	const headerTitle = document.createElement('h1');
	const headerA = document.createElement('a');
	const searchForm = document.createElement('form');
	const searchInput = document.createElement('input');
	const searchButton = document.createElement('button');

	header.id = 'header';
	searchForm.id = 'search';
	searchInput.id = 'search-input';
	searchButton.id = 'search-button';

	searchInput.classList = 'search-input';
	searchButton.classList = 'search-button';
	headerDiv.classList = 'bind';
	headerTitle.classList = 'tit';

	headerA.setAttribute('href', '/vanilaMovie/index.html');
	searchInput.type = 'text';
	searchButton.type = 'button';
	searchInput.value;
	searchInput.autofocus = true;
	searchInput.placeholder = '영화를 검색해 보세요';
	searchInput.required = true;
	headerTitle.innerText = 'SEARCH MOVIES';
	searchButton.innerText = '검색';

	app.appendChild(header);
	header.appendChild(headerDiv);
	headerA.appendChild(headerTitle);
	headerDiv.appendChild(headerA);
	headerDiv.appendChild(searchForm);
	searchForm.appendChild(searchInput);
	searchForm.appendChild(searchButton);
	searchButton.addEventListener('click', handleSearch);
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSearch();
	});
};

// 검색
const handleSearch = () => {
	const list = document.querySelectorAll('.movie-item');
	// document.querySelectorAll로 가져오면 1개 이상의 dom 객체가 존재할 경우, 노드의 콜렉션으로 리턴
	// NodeList는 .map, .reduce, .filter 함수 사용이 불가능, 이 경우에는 NodeList를 Array 로 변환 후 작업
	let search = document.querySelector('.search-input').value; // Assignment(할당) to constant variable. let으로 값 재할당하기
	if (search !== '') {
		[...list].forEach((movie) => {
			console.log(list);
			const title = movie.querySelector('h3').textContent.toLowerCase();

			if (title.includes(search)) {
				movie.style.display = 'block';
			} else {
				movie.style.display = 'none';
			}
		});
	} else {
		alert('검색어를 입력해 주세요.');
		search = '';
	}
};

export default createHeader;
