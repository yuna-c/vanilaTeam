import { getPopularData } from '../fetchData.js';

export const creatSortBox = async () => {
  const data = await getPopularData(1);
  const section = document.getElementById('section');
  const selectBox = document.createElement('div');
  const btnBest = document.createElement('button');
  const btnRecent = document.createElement('button');

  selectBox.classList = 'select_wrap';
  btnBest.classList = 'btn_best';
  btnRecent.classList = 'btn_recent';
  btnRecent.setAttribute('type', 'button');
  btnBest.setAttribute('type', 'button');

  btnBest.innerHTML = '인기순';
  btnRecent.innerHTML = '최신순';
  btnBest.classList.add('active');

  section.prepend(selectBox);
  selectBox.append(btnBest, btnRecent);
  sorting(data);
};

const sorting = (data) => {
  const movieList = document.getElementById('movie-list');
  const selectBox = document.querySelector('.select_wrap');
  onChangeBest(data, movieList);
  onChangeRecent(data, movieList);
};

const onChangeBest = (data, list) => {
  const dataResult = data.results;
  const btnBest = document.querySelector('.btn_best');
  btnBest.addEventListener('click', () => {
    list.innerHTML = '';
    let bestData = dataResult.sort(function (a, b) {
      return b.popularity - a.popularity;
    }); // 인기 데이터 정렬
    btnBest.classList = 'active';
    btnBest.nextSibling.classList.remove('active');
    sortList(bestData, list);
  });
};

const onChangeRecent = (data, list) => {
  const dataResult = data.results;
  const btnRecent = document.querySelector('.btn_recent');
  btnRecent.addEventListener('click', () => {
    let recentData = dataResult.sort(function (a, b) {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    }); // 최신순 데이터 정렬
    list.innerHTML = '';
    btnRecent.classList = 'active';
    btnRecent.previousSibling.classList.remove('active');
    sortList(recentData, list);
  });
};

const sortList = (sortData, list) => {
  const movieList = sortData
    .map((item) => {
      return `
      <li class="movie-item">
      <a href="./page/detail.html?id=${item.id}">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
      </a>
      <div class="info">
        <h3 class="movie-title">${item.title}</h3>
        <p>⭐${item.vote_average}</p>
      </div>
      <div class="overview">
        <h3>overview</h3>
        <strong>${item.title}</strong>
        <p class="movie-content">
          <span>${item.overview}</span>
        </p>
      </div>
    </li>
      `;
    })
    .join('');
  list.innerHTML += movieList;
};
