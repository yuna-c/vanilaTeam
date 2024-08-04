import { saveReviewData, getReviewData } from '../fetchFirebaseData.js';

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let movieId = params.get('id');
  console.log('Movie ID:', movieId);
  return movieId;
};

const movieId = getMovieIdFromUrl();

const createReviewSection = () => {
  const section = document.createElement('section');
  section.className = 'review-container';
  section.innerHTML = `
  <div class="w-60">
    <h3>감상평</h3>
    <form class="review-form">
      <input class="review-content" type="text" placeholder="감상평을 자유롭게 작성해주세요." required>
      <div class="form-info">
        <input class="m-l-10" type="text" placeholder="이름" required>
        <input class="m-l-10" type="password" placeholder="비밀번호" required>
        <button class="m-l-10">등록</button>
      </div>
    </form>
    </div>
  `;

  return section;
};

const renderReviewForm = () => {
  document.getElementById('app').appendChild(createReviewSection());
};

const saveReview = async (reviewData) => {
  let doc = {
    movieId: reviewData.movieId,
    content: reviewData.content,
    userName: reviewData.userName,
    password: reviewData.password
  };
  await saveReviewData(doc);
  window.location.reload();
};

const createReviewData = () => {
  const reviewForm = document.querySelector('.review-form');

  const reviewInputs = reviewForm.querySelectorAll('input[type="text"]');
  const reviewInput = reviewInputs[0];
  const nameInput = reviewInputs[1];
  const passwordInput = reviewForm.querySelector('input[type="password"]');

  return {
    movieId: movieId,
    content: reviewInput.value,
    userName: nameInput.value,
    password: passwordInput.value
  };
};

const setupEventListeners = () => {
  const reviewForm = document.querySelector('.review-form');

  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveReview(createReviewData());
    event.target.reset();
  });
};

const createReviewItem = (data) => {
  return `
    <li class="review-item" data-movieId=${data['movieId']}>
      <span id="user-name">${data['userName']}</span>
      <span id="review-content">${data['content']}</span>
    </li>
  `;
};

const renderReviews = async () => {
  let docs = await getReviewData(movieId);
  let reviewList = '<div class="w-60"> <ul class="review-list">';

  docs.forEach((doc) => {
    let data = doc.data();
    let reviewItem = createReviewItem(data);
    reviewList += reviewItem;
  });

  reviewList += '</ul></div>';
  document.querySelector('.review-container').innerHTML += reviewList;
};

export const createReview = async () => {
  // 리뷰 작성 폼
  renderReviewForm();

  // 리뷰 목록
  await renderReviews();

  // 이벤트
  setupEventListeners();
};
