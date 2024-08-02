//push test

import { config } from '../config.js';
// import createFooter from './footer.js';

let movieId = 0;
// get data
const API_KEY = config.TMDBKEY;
const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?';
const RESULT_URL = `${BASE_URL}language=ko-KR&api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR"`;


// 현재 URL에서 쿼리 스트링을 가져옴
const urlParams = new URLSearchParams(window.location.search);
// 'id' 쿼리 스트링 값 가져오기
movieId = urlParams.get('id');
const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDM0YmQ0YjdiMTY0MDI4MmIzYTMwNWQ2ZTk4ZjhkMyIsIm5iZiI6MTcyMjQ0MDIyNC41NzY2ODksInN1YiI6IjY2YTYzZWM3N2NlMWExNjM4YTYwMzUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdE1bG5kax-2Td5QIXuRxmhOYqOFiyh7ALtxec2tm5U'
	}
  };

fetchData();

// 데이터
async function fetchData() {
	try {
		// 예외 발생 가능성 있는 데이터(await로 대기시켰다가 실행 준비)
		const SEARCH_DETAIL_URL = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=${API_KEY}&language=ko-KR"
		console.log(SEARCH_DETAIL_URL)
		const res = await fetch(SEARCH_DETAIL_URL, options);
		const data = await res.json();
		return createHeader(data);
	} catch (err) {
		// err시 실행 중지를 처리할 로직
		console.error(err, '중지');
		// throw Error('중지');
	}
}

// 헤더
const createHeader = (data) => {

	console.log(data)
	console.log(data.title)
	const app = document.getElementById('app');
	const header = document.createElement('header');
	const headerDiv = document.createElement('div');
	const headerTitle = document.createElement('h1');
	const headerA = document.createElement('a');
	const searchForm = document.createElement('form');
	const searchInput = document.createElement('input');
	const searchButton = document.createElement('button');

    //디테일 페이지 추가
    const detailHeader = document.createElement('div')
    const detailImgHeader = document.createElement('div')
	


	header.id = 'header';
	searchForm.id = 'search';
	searchInput.id = 'search-input';
	searchButton.id = 'search-button';

    //디테일 페이지 추가
    detailHeader.id = 'detail-header';
    detailImgHeader.id = 'detail-image-block';



	searchInput.classList = 'search-input';
	searchButton.classList = 'search-button';
	headerDiv.classList = 'bind';
	headerTitle.classList = 'tit';

	headerA.setAttribute('href', 'index.html');
	headerA.appendChild(headerTitle);


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
	// searchForm.appendChild(searchInput);
	// searchForm.appendChild(searchButton);
	searchButton.addEventListener('click', handleSearch);
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSearch();
	});

	//detail
    app.appendChild(detailHeader)
    detailHeader.appendChild(detailImgHeader)
    
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
