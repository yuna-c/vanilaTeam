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

  const div = document.createElement('div');
  div.className = 'w-70';

  const h3 = document.createElement('h3');
  h3.textContent = '감상평';

  const form = document.createElement('form');
  form.className = 'review-form';

  const textarea = document.createElement('textarea');
  textarea.id = 'review-content';
  textarea.className = 'review-content border';
  textarea.placeholder = '감상평을 자유롭게 작성해주세요.';
  textarea.required = true;

  const formInfoDiv = document.createElement('div');
  formInfoDiv.className = 'form-info';

  const saveButton = document.createElement('button');
  saveButton.className = 'save-button m-l-10';
  saveButton.textContent = '등록';

  // 로그인 안 했으면 등록 버튼 안보이고
  // textarea 선택했을 때 로그인 페이지로
  if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') === '0') {
    saveButton.style.display = 'none';

    textarea.addEventListener('click', () => {
      alert('로그인 후 작성해주세요.');
      window.location.href = '../page/login.html';
    });
  }

  formInfoDiv.appendChild(saveButton);
  form.appendChild(textarea);
  form.appendChild(formInfoDiv);
  div.appendChild(h3);
  div.appendChild(form);
  section.appendChild(div);

  return section;
};

const renderReviewForm = () => {
  document.getElementById('app').appendChild(createReviewSection());
};

const saveReview = async (reviewData) => {
  await saveReviewData(reviewData);
  const newReviewItem = createReviewItem(reviewData);
  const reviewList = document.querySelector('.review-list');
  reviewList.prepend(newReviewItem);
};

/**
 * 등록 데이터 생성
 */
const createReviewData = () => {
  const reviewContent = document.getElementById('review-content').value;

  // 로컬 스토리지 정보 조회
  let userName = localStorage.getItem('username');
  let password = localStorage.getItem('password');

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
      <textarea id="review-content" class="update-content">${reviewContent}</textarea>
    `;

    let textarea = document.querySelector('.update-content');
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    const saveUpdateButton = reviewItem.querySelector('.save-update-button');
    const cancelUpdateButton = reviewItem.querySelector('.cancel-update-button');

    // 수정 이벤트
    saveUpdateButton.addEventListener('click', async () => {
      if (window.confirm('정말로 이 리뷰를 수정하시겠습니까?')) {
        const updatedContent = reviewItem.querySelector('#review-content').value;
        const reviewId = reviewItem.getAttribute('data-id');

        await updateReviewData(reviewId, updatedContent);
        // DOM을 직접 수정하여 변경 사항 반영
        reviewItem.innerHTML = `
        <div class="review-header">
          <span id="user-name">${userName}</span>
          <div>
            <button class="update-button">수정</button>
            <button class="delete-button">삭제</button>
          </div>
        </div>
        <span id="review-content">${updatedContent}</span>
    `;

        // 수정, 삭제 이벤트 리스너 다시 설정
        setupDeleteReviewEventListener(reviewItem);
        setupUpdateReviewButtonEventListener(reviewItem);
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

  const reviewHeader = document.createElement('div');
  reviewHeader.className = 'review-header';

  const userNameSpan = document.createElement('span');
  userNameSpan.id = 'user-name';
  userNameSpan.textContent = data.userName;

  const buttonContainer = document.createElement('div');

  const updateButton = document.createElement('button');
  updateButton.className = 'update-button';
  updateButton.textContent = '수정';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = '삭제';

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const isLogin = localStorage.getItem('isLogin');

  if (!(username === data.userName && password === data.password) || isLogin === '0') {
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';
  }

  buttonContainer.appendChild(updateButton);
  buttonContainer.appendChild(deleteButton);

  reviewHeader.appendChild(userNameSpan);
  reviewHeader.appendChild(buttonContainer);

  const reviewContent = document.createElement('span');
  reviewContent.id = 'review-content';
  reviewContent.textContent = data.content;

  reviewItem.appendChild(reviewHeader);
  reviewItem.appendChild(reviewContent);

  setupDeleteReviewEventListener(reviewItem);
  setupUpdateReviewButtonEventListener(reviewItem);

  return reviewItem;
};

/**
 * 리뷰 목록 조회
 */
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
  reviewContainer.className = 'w-70';
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
