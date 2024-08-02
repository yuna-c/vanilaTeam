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
		const SEARCH_DETAIL_URL = "https://api.themoviedb.org/3/movie/" + movieId + `?api_key=${API_KEY}&language=ko-KR`
		console.log(SEARCH_DETAIL_URL)
		const res = await fetch(SEARCH_DETAIL_URL, options);
		const data = await res.json();
		console.log(data)
		return createHeader(data);
	} catch (err) {
		// err시 실행 중지를 처리할 로직
		console.error(err, '중지');
		// throw Error('중지');
		alert(err)
	}
}




// 헤더
const createHeader = (data) => {

	const title = data.title
	const description = data.overview
	const app = document.getElementById('app');
	const header = document.createElement('header');
	const headerDiv = document.createElement('div');
	// const headerTitle = document.createElement('h1');
	const headerA = document.createElement('a');
	const searchForm = document.createElement('form');
	const searchInput = document.createElement('input');
	const searchButton = document.createElement('button');

    //디테일 페이지 추가
    const detailHeader = document.createElement('div')
    const detailImgHeader = document.createElement('div')


	// detail-info 요소 생성 및 콘텐츠 추가
	const detailInfo = document.createElement('div');
	detailInfo.id = 'detail-info';

	const detailTitle = document.createElement('h1');
	detailTitle.textContent = title;

	const detailDescription = document.createElement('p');
	detailDescription.textContent = description;

	detailInfo.appendChild(detailTitle);
	detailInfo.appendChild(detailDescription);


	header.id = 'header';
	searchForm.id = 'search';
	searchInput.id = 'search-input';
	searchButton.id = 'search-button';

    //디테일 페이지 추가
    detailHeader.id = 'detail-header';


    detailImgHeader.id = 'detail-image-block';
	// 스타일 설정을 통해 백그라운드 이미지 추가
	detailImgHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.poster_path}.jpg')`;

	// 추가적인 스타일 설정
	detailImgHeader.style.backgroundSize = 'cover';
	detailImgHeader.style.backgroundPosition = 'center';
	detailImgHeader.style.width = '240px'; // 예시 너비
	detailImgHeader.style.height = '350px'; // 예시 높이

	



	searchInput.classList = 'search-input';
	searchButton.classList = 'search-button';
	headerDiv.classList = 'bind';
	// headerTitle.classList = 'tit';

	headerA.setAttribute('href', 'index.html');
	// headerA.appendChild(headerTitle);


	searchInput.type = 'text';
	searchButton.type = 'button';
	searchInput.value;
	searchInput.autofocus = true;
	searchInput.placeholder = '영화를 검색해 보세요';
	searchInput.required = true;
	// headerTitle.innerText = data.title // 영화 제목 데이터를 바인딩 한 곳.


	searchButton.innerText = '검색';



	// app.appendChild(header);
	// header.appendChild(headerDiv);
	// headerA.appendChild(headerTitle);
	// headerDiv.appendChild(headerA);
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
	// detailHeader.appendChild(headerTitle)
    detailHeader.appendChild(detailImgHeader)
	detailHeader.appendChild(detailInfo)
    
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


//포스터 이미지
const poster_path = '/your-image-path.jpg'; // 예시 이미지 경로

function setBackgroundImage(poster_path) {
    document.documentElement.style.setProperty('--poster-path', `url('https://image.tmdb.org/t/p/w500${poster_path}')`);
}

setBackgroundImage(poster_path);