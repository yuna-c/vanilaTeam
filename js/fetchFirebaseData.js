import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { collection, addDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 리뷰 등록
export const saveReviewData = async (doc) => {
  await addDoc(collection(db, 'reviews'), doc);
};

// 리뷰 조회
export const getReviewData = async (movieId) => {
  const movieIdReviewQuery = query(collection(db, 'reviews'), where('movieId', '==', movieId));
  return await getDocs(movieIdReviewQuery);
};
