import { config } from './config.js';

// https://api.themoviedb.org/3/movie/popular? 신작 차트
// https://api.themoviedb.org/3/movie/top_rated? 최고 평점
// https://developer.themoviedb.org/reference/movie-credits 출연 배우

// 1. popular data
export const getPopularData = async (page) => {
  const API_KEY = config.TMDBKEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA1ZjVhNjM2ZTU4ZDUxMjk1ZDc3Y2UyZTc2MDZiNyIsIm5iZiI6MTcyMjQxMjg2Ni45NDgxMSwic3ViIjoiNjZhMDAzMGM5MWZkMzQ3MzU1OThmYzgxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1-skja1tInrXYrGOZ4Pg2NyKdRAyrb3vHH_MzVamAbE'
    }
  };

  try {
    const res = await fetch(BASE_URL, options);
    const data = await res.json();
    // console.log(res);
    // console.log(BASE_URL);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error + ` popular 데이터를 받아올 수 없습니다.`);
  }
};

// 2. search data
export const getChangeData = async (search, page) => {
  const API_KEY = config.TMDBKEY;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=${API_KEY}&query=${search}&page=${page}`;

  try {
    const res = await fetch(SEARCH_URL);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error + ` search 데이터를 받아올 수 없습니다.`);
  }
};

// 3. Creditsdata
export const getCreditsData = async (movieId) => {
  const API_KEY = config.TMDBKEY;
  const CREDITS_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR&api_key=${API_KEY}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA1ZjVhNjM2ZTU4ZDUxMjk1ZDc3Y2UyZTc2MDZiNyIsIm5iZiI6MTcyMjQxMjg2Ni45NDgxMSwic3ViIjoiNjZhMDAzMGM5MWZkMzQ3MzU1OThmYzgxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1-skja1tInrXYrGOZ4Pg2NyKdRAyrb3vHH_MzVamAbE'
    }
  };

  try {
    const res = await fetch(CREDITS_URL, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error + ` credits 데이터를 받아올 수 없습니다.`);
  }
};

// 4. imageData
export const getImages = async (movieId) => {
  const IMAGES_URL = `https://api.themoviedb.org/3/movie/${movieId}/images`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA1ZjVhNjM2ZTU4ZDUxMjk1ZDc3Y2UyZTc2MDZiNyIsIm5iZiI6MTcyMjQxMjg2Ni45NDgxMSwic3ViIjoiNjZhMDAzMGM5MWZkMzQ3MzU1OThmYzgxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1-skja1tInrXYrGOZ4Pg2NyKdRAyrb3vHH_MzVamAbE'
    }
  };

  try {
    const res = await fetch(IMAGES_URL, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error + ` credits 데이터를 받아올 수 없습니다.`);
  }
};
