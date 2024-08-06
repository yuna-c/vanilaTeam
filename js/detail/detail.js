import { config } from '../config.js';

let movieId = 0;
const API_KEY = config.TMDBKEY;
const urlParams = new URLSearchParams(window.location.search); // 현재 URL에서 쿼리 스트링을 가져옴

// 'id' 쿼리 스트링 값 가져오기
movieId = urlParams.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDM0YmQ0YjdiMTY0MDI4MmIzYTMwNWQ2ZTk4ZjhkMyIsIm5iZiI6MTcyMjQ0MDIyNC41NzY2ODksInN1YiI6IjY2YTYzZWM3N2NlMWExNjM4YTYwMzUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdE1bG5kax-2Td5QIXuRxmhOYqOFiyh7ALtxec2tm5U'
  }
};

export const createDetail = () => {
  return fetchData();
};

// fetch data
async function fetchData() {
  try {
    const SEARCH_DETAIL_URL = 'https://api.themoviedb.org/3/movie/' + movieId + `?api_key=${API_KEY}&language=ko-KR`;
    console.log(SEARCH_DETAIL_URL);
    const res = await fetch(SEARCH_DETAIL_URL, options);
    const data = await res.json();
    return createDetailSetcion(data);
  } catch (err) {
    window.location.href = '/'; // index.html으로 가기
  }
}

// 유사한 영화 데이터 가져오기
async function fetchSimilarMovies() {
  try {
    const SIMILAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=ko-KR&page=1`;
    const res = await fetch(SIMILAR_MOVIES_URL, options);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error('Error fetching similar movies:', err);
    return [];
  }
}

// 유사한 영화 데이터를 카드 생성
const similarMovies = await fetchSimilarMovies();

// detail
const createDetailSetcion = (data) => {
  const title = data.title;
  const description = data.overview;
  const bookInfo = data.poster_path;
  const bookInfoUrl = `https://image.tmdb.org/t/p/w500/${bookInfo}`;

  const app = document.getElementById('app');
  const detail = document.createElement('section');
  const search = document.querySelector('#search');
  const detailImgHeader = document.createElement('div');
  const detailRecommendedPoster = document.createElement('div');

  // detail-info 요소 생성 및 콘텐츠 추가
  const detailInfo = document.createElement('div');
  const detailTitle = document.createElement('h1');
  const detailDescription = document.createElement('p');
  const recommededTitle = document.createElement('h5');
  detailInfo.id = 'detail-info';
  detailTitle.textContent = title;
  detailDescription.textContent = description;
  search.style = 'display:none';
  recommededTitle.id = 'recommended-title';
  detailRecommendedPoster.id = 'detail-Recommended-poster';

  // 북마크 버튼
  const bookmarkButton = document.createElement('button');
  bookmarkButton.id = 'bookmark';
  bookmarkButton.classList.add('bookmarkButton');
  bookmarkButton.style = 'margin:-5px 0px 0px 10px; line-height:1; font-size:2rem;';
  bookmarkButton.innerHTML = `<i class="fa-regular fa-heart" style="color: #d21e1e;"></i>`;

  // 북마크 로컬 스토리지 toggle 기능
  bookmarkButton.addEventListener('click', () => {
    const movieArr = { title: `${title}`, img: `${bookInfoUrl}` };
    const getBookmark = JSON.parse(localStorage.getItem(`bookmark-${title}`));

    if (getBookmark) {
      bookmarkButton.innerHTML = `<i class="fa-regular fa-heart" style="color: #d21e1e;"></i>`;
      bookmarkButton.classList.remove('pick');
      localStorage.removeItem(`bookmark-${title}`);
      alert('북마크가 해제 되었습니다.');
    } else {
      bookmarkButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #d21e1e;"></i>`;
      bookmarkButton.classList.add('pick');
      localStorage.setItem(`bookmark-${title}`, JSON.stringify(movieArr));
      alert('북마크 되었습니다.');
    }
  });

  // 페이지 로드시 북마크 상태 확인(X)
  // window.onload = () => {
  //   const bookmarkButton = document.getElementById('bookmark');
  //   console.log(`1 :`, bookmarkButton);
  //   const isBookmark = localStorage.getItem(`bookmark-${title}`, JSON.parse(movieArr));
  //   console.log(isBookmark);

  //   if (isBookmark === `bookmark-${title}`) {
  //     bookmarkButton.innerHTML = `<i class="fa-regular fa-heart" style="color: #d21e1e;"></i>`;
  //     bookmarkButton.classList.add('pick');
  //   }
  // };

  //디테일 페이지 추가
  detail.id = 'detail';
  detailImgHeader.id = 'detail-image-block';
  detailImgHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.poster_path}.jpg')`;
  detailImgHeader.style.backgroundSize = 'cover';
  detailImgHeader.style.backgroundPosition = 'center';
  detailImgHeader.style.width = '240px'; // 예시 너비
  detailImgHeader.style.height = '350px'; // 예시 높이
  recommededTitle.innerText = '비슷한 영화 추천 ▾';

  app.appendChild(detail);
  detailInfo.appendChild(detailTitle);
  detailInfo.appendChild(detailDescription);
  detailTitle.append(bookmarkButton);
  detail.appendChild(detailImgHeader);
  detail.appendChild(detailInfo);
  detailInfo.appendChild(recommededTitle);

  // 상세정보 관련 영화 박스 추가
  for (let i = 0; i < 4; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${similarMovies[i].poster_path}')`;
    detailRecommendedPoster.appendChild(box);
  }

  detailInfo.appendChild(detailRecommendedPoster);
};

// reload 방지
const nonload = (e) => {
  if ((e.ctrlKey && e.keyCode === 82) || event.keyCode === 116) {
    e.preventDefault();
    e.stopPropagation();
  }
};
document.addEventListener('keydown', nonload);

// 포스터, 이미지 예시 경로
const poster_path = 'data.poster_path.jpg';
function setBackgroundImage(poster_path) {
  document.documentElement.style.setProperty('--poster-path', `url('https://image.tmdb.org/t/p/w500${poster_path}')`);
}
setBackgroundImage(poster_path);
