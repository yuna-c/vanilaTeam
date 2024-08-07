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
  // 리뷰 ID에 해당하는 문서를 쿼리해서 조화
  const getReviewByReviewId = query(collection(db, 'reviews'), where('id', '==', reviewId));
  const reviewDocs = await getDocs(getReviewByReviewId);
  // 각 문서를 순회하며 업데이트
  for (const document of reviewDocs.docs) {
    const docRef = doc(db, 'reviews', document.id);
    await updateDoc(docRef, { content: updatedData });
  }
};
