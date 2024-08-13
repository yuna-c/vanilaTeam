import { config } from './config.js';

const API_KEY = config.TMDBKEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 공통 fetch 함수
const fetchData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA1ZjVhNjM2ZTU4ZDUxMjk1ZDc3Y2UyZTc2MDZiNyIsIm5iZiI6MTcyMjQxMjg2Ni45NDgxMSwic3ViIjoiNjZhMDAzMGM5MWZkMzQ3MzU1OThmYzgxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1-skja1tInrXYrGOZ4Pg2NyKdRAyrb3vHH_MzVamAbE`
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error + ' 데이터를 받아올 수 없습니다.');
  }
};

// 1. popular data
export const getPopularData = async (page) => {
  const url = `${BASE_URL}/movie/popular?language=ko-KR&api_key=${API_KEY}&page=${page}`;
  return await fetchData(url);
};

// 2. search data
export const getChangeData = async (search, page) => {
  const url = `${BASE_URL}/search/movie?language=ko-KR&api_key=${API_KEY}&query=${search}&page=${page}`;
  return await fetchData(url);
};

// 3. Creditsdata
export const getCreditsData = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=ko-KR&api_key=${API_KEY}`;
  return await fetchData(url);
};

// 4. imageData
export const getImages = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
  return await fetchData(url);
};
