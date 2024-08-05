import { saveReviewData, getReviewData, deleteReviewData, updateReviewData } from '../fetchFirebaseData.js';
import { generateUUID } from '../utils/uuid.js';
import { getFormatDate } from '../utils/date.js';

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  let movieId = params.get('id');
  return movieId;
};

const movieId = getMovieIdFromUrl();

/**
 * 리뷰 작성 form 생성
 */
const createReviewSection = () => {
  const section = document.createElement('section');
  section.className = 'review';
  section.innerHTML = `
  <div class="w-60">
    <h3>감상평</h3>
    <form class="review-form">
      <textarea id="review-content" class="review-content border" type="text" placeholder="감상평을 자유롭게 작성해주세요." required></textarea>
      <div class="form-info">
        <input id="user-name" class="m-l-10 border" type="text" placeholder="이름" required>
        <input id="password" class="m-l-10 border" type="password" placeholder="비밀번호" required>
        <button class="save-button m-l-10">등록</button>
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
  await saveReviewData(reviewData);
  window.location.reload();
};

const createReviewData = () => {
  const reviewContent = document.getElementById('review-content').value;
  const userName = document.getElementById('user-name').value;
  const password = document.getElementById('password').value;

  return {
    id: generateUUID(),
    movieId: movieId,
    content: reviewContent,
    userName: userName,
    password: password,
    date: getFormatDate()
  };
};

/**
 * 등록
 */
const setupSaveReviewEventListener = () => {
  const reviewForm = document.querySelector('.review-form');

  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let reviewData = createReviewData();
    saveReview(reviewData);
    event.target.reset();
  });
};

/**
 * 삭제 이벤트 등록
 */
const setupDeleteReviewEventListener = (reviewItem) => {
  const deleteButton = reviewItem.querySelector('.delete-button');

  deleteButton.addEventListener('click', async () => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      const reviewId = reviewItem.getAttribute('data-id');
      await deleteReviewData(reviewId);
      reviewItem.remove();
      window.alert('삭제가 완료되었습니다.');
    }
  });
};

/**
 * 수정 버튼 클릭 이벤트
 */
const setupUpdateReviewButtonEventListener = (reviewItem) => {
  const updateButton = reviewItem.querySelector('.update-button');
  updateButton.addEventListener('click', async () => {
    // 리뷰 내용에 있던 내용을 들고옴
    const contentSpan = reviewItem.querySelector('#review-content');
    const reviewContent = contentSpan.textContent;

    const userNameSpan = reviewItem.querySelector('#user-name');
    const userName = userNameSpan.textContent;

    // 리뷰 내용을 변경 가능하도록
    reviewItem.innerHTML = `
      <div class="review-header">
        <span id="user-name">${userName}</span>
        <div>
          <button class="save-update-button">저장</button>
          <button class="cancel-update-button">취소</button>
        </div>
      </div>
      <textarea id="review-content" class="review-content">${reviewContent}</textarea>
    `;

    const saveUpdateButton = reviewItem.querySelector('.save-update-button');
    const cancelUpdateButton = reviewItem.querySelector('.cancel-update-button');

    // 수정 이벤트
    saveUpdateButton.addEventListener('click', async () => {
      if (window.confirm('정말로 이 리뷰를 수정하시겠습니까?')) {
        const updatedContent = reviewItem.querySelector('#review-content').value;
        const updatedUserName = reviewItem.querySelector('#user-name').value;
        const reviewId = reviewItem.getAttribute('data-id');

        await updateReviewData(reviewId, updatedContent);

        window.location.reload();
        window.alert('수정이 완료되었습니다.');
      }
    });

    // 취소 이벤트
    cancelUpdateButton.addEventListener('click', () => {
      // 수정 취소 시 원래 내용으로 복구
      reviewItem.innerHTML = `
        <div class="review-header">
          <span id="user-name">${userName}</span>
          <div>
            <button class="update-button">수정</button>
            <button class="delete-button">삭제</button>
          </div>
        </div>
        <span id="review-content">${reviewContent}</span>
      `;

      // 수정, 삭제 이벤트 리스너 다시 설정
      setupDeleteReviewEventListener(reviewItem);
      setupUpdateReviewButtonEventListener(reviewItem);
    });
  });
};

const createReviewItem = (data) => {
  const reviewItem = document.createElement('li');
  reviewItem.className = 'review-item';
  reviewItem.setAttribute('data-movieId', data.movieId);
  reviewItem.setAttribute('data-id', data.id);

  reviewItem.innerHTML = `
    <div class="review-header">
      <span id="user-name">${data.userName}</span>
      <div>
        <button class="update-button">수정</button>
        <button class="delete-button">삭제</button>
      </div>
    </div>
    <span id="review-content">${data.content}</span>
  `;

  setupDeleteReviewEventListener(reviewItem);

  setupUpdateReviewButtonEventListener(reviewItem);

  return reviewItem;
};

const renderReviews = async () => {
  let docs = await getReviewData(movieId);
  const reviewList = document.createElement('ul');
  reviewList.className = 'review-list';

  docs.forEach((doc) => {
    let data = doc.data();
    let reviewItem = createReviewItem(data);
    reviewList.appendChild(reviewItem);
  });

  const reviewContainer = document.createElement('div');
  reviewContainer.className = 'w-60';
  reviewContainer.appendChild(reviewList);

  document.querySelector('.review').appendChild(reviewContainer);
};

export const createReview = async () => {
  // 리뷰 작성 폼 생성
  renderReviewForm();

  // 리뷰 목록 생성
  await renderReviews();

  // 이벤트
  setupSaveReviewEventListener();
};
