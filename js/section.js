import { config } from './config.js';
// import createFooter from './footer.js';

// get data
const API_KEY = config.TMDBKEY;
const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?';
const RESULT_URL = `${BASE_URL}language=ko-KR&api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=${API_KEY}&query="`;

// 섹션 초기 값
const section = document.createElement('section');
fetchData(RESULT_URL, 1);
let searchPage = ''; // 페이지 네이션 검색 초기값
let currentPage = 1; // 현재 페이지 넘버

// 데이터
async function fetchData(url, page) {
	try {
		// 예외 발생 가능성 있는 데이터(await로 대기시켰다가 실행 준비)
		const res = await fetch(url + `&page=${page}`);
		const data = await res.json();
		const movies = data.results;
		return createCard(movies);
	} catch (err) {
		// err시 실행 중지를 처리할 로직
		console.error(err, '중지');
		// throw Error('중지');
	}
}

// 섹션
const createCard = (movies) => {
	const app = document.getElementById('app');
	const movieUl = document.createElement('ul');

	section.id = 'section';
	movieUl.id = 'movie-list';

	app.insertAdjacentElement('beforeend', section);
	section.innerHTML = ''; // // 섹션 새로 고침(밑으로 한 section 더 생기는 것 방지)
	// console.log(Array.isArray(movies));

	// 카드 출력
	movies.forEach((movie) => {
		const { id, title, poster_path, vote_average, overview } = movie;

		const movieli = document.createElement('li');
		movieli.setAttribute('class', 'movie-item');
		movieli.id = `${id}`;

		movieli.innerHTML = `
			<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
			<div class="info">
				<h3 class="movie-title">${title}</h3>
				<p>⭐${vote_average}</p>
			</div>
			<div class="overview">
				<h3>overview</h3>
				<strong>${title}</strong>
				<p class="movie-content">
					<span>${overview}</span>
				</p>
			</div>
		`;

		movieli.addEventListener('click', () => {
			// window.alert(`id : ${id}`);
			window.location.href = `detail.html?id=${id}`;
		});

		movieUl.appendChild(movieli);
	});

	section.appendChild(movieUl);
	section.appendChild(createPagination());
};

const createPagination = () => {
	const pagination = document.createElement('div');
	pagination.className = 'pagination';
	pagination.innerHTML = '';

	for (let i = 1; i <= 10; i++) {
		let paginationBtn = document.createElement('span');
		paginationBtn.setAttribute('class', 'btn');
		let currentPage = i; // 번호 i 번째
		paginationBtn.innerText = i;

		paginationBtn.addEventListener('click', () => {
			paginationBtn.classList.add('on');
			fetchData(RESULT_URL, currentPage);
			window.scrollTo(0, 0); // 스크롤 위 고정

			if (searchPage !== '') {
				fetchData(SEARCH_URL + searchPage, currentPage);
			} else {
				fetchData(RESULT_URL, currentPage);
			}
		});
		pagination.appendChild(paginationBtn);
	}
	return pagination;
};

export { createCard, fetchData };
