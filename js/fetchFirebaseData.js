import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * 리뷰 등록
 */
export const saveReviewData = async (doc) => {
  await addDoc(collection(db, 'reviews'), doc);
};

/**
 * 리뷰 조회
 * 특정 영화의 모든 리뷰 조회
 */
export const getReviewData = async (movieId) => {
  const getReviewsByMovieId = query(
    collection(db, 'reviews'),
    where('movieId', '==', movieId),
    orderBy('date', 'desc')
  );
  return await getDocs(getReviewsByMovieId);
};

/**
 * 리뷰 삭제
 */
export const deleteReviewData = async (reviewId) => {
  const getReviewByReviewId = query(collection(db, 'reviews'), where('id', '==', reviewId));
  const reviewDocs = await getDocs(getReviewByReviewId);

  reviewDocs.forEach(async (document) => {
    const docRef = doc(db, 'reviews', document.id);
    await deleteDoc(docRef);
  });
};

/**
 * 리뷰 수정
 */
export const updateReviewData = async (reviewId, updatedData) => {
  const reviewDocs = await getDocs(query(collection(db, 'reviews'), where('id', '==', reviewId)));

  /**
   * 조건에 맞는 문서가 하나만 있을 것으로 예상하는 경우에도
   * Firestore의 쿼리(query)는 기본적으로 조건에 맞는 모든 문서를 반환함
   * Firestore는 데이터베이스에서 특정 조건을 만족하는 모든 문서를 찾도록 설계되어 있기 때문에,
   * 쿼리 결과가 배열 형태로 반환됨,
   * 그래서 맞는 조건이 하나가 확실한 경우에 reviewDocs.docs[0]; 이렇게 써도됨
   */
  const document = reviewDocs.docs[0];
  const docRef = doc(db, 'reviews', document.id);
  await updateDoc(docRef, { content: updatedData });
};
