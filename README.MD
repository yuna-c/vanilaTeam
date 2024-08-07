## vanilaMovie

TMDB API를 통한 영화 검색 및 정보 탐색 사이트
<br>

## 사이트

https://cinespot8.vercel.app/
<br>

## 개요

MOViE API를 가공하여 사용자에게 MOVIE 정보를 줄 수 있는 페이지 제작<br>
API를 통한 비동기화를 연습해보는 사이트 제작<br>
SCSS를 통한 페이지 디자인<br>
JS로 페이지를 통으로 구현해 보는 연습
<br>

## 개발기간

2024.0731~ 2024.08.07
<br>

## 활용 기술

<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/TMDB API-F5C518?style=for-the-badge&logo=themoviedatabase&logoColor=white"> <img src="https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white">
<br>

## Code Convention

- .prettierrc 설정
- JS : Camel Case
- SCSS : kebab-case
  <br>

## 기능 및 특징

1. 회원가입 및 사용자 로그인 기능(유효성 검사)
2. 마이페이지 비밀번호 변경, 찜 기능
3. 사용자 리뷰 CRUD 기능
4. 검색 기능
5. 페이징 기능
6. 모바일 페이지 토글 및 반응형
7. 슬라이드 기능(메인/ 상세)
8. 최신순/ 인기순 데이터 가공 소팅기능
9. 하단 푸터의 날씨API를 사용한 지역,온도,날씨 출력
   <br>

## 개인별 담당

- **박규리** : 상세페이지 데이터 가공 및 페이지 UI<br>
  : 푸터 날씨, 온도, 지역 보이게 처리<br>
  : 푸터 멤버 소개 기능<br>

- **임기철** : 메인 상단 슬라이드 기능<br>
  : 메인 상단 최신순/ 인기순 데이터 소팅<br>

- **정민지** : 파이어 베이스를 통한 댓글 CRUD 기능<br>
  : 상세페이지 배우소개, 스틸컷 슬라이드 기능<br>

- **최유나** : TMDB API 세팅<br>
  : UIUX SCSS 세팅 및 모듈화<br>
  : search API를 통한 검색 기능<br>
  : search API를 통한 페이징 기능<br>
  : 마이페이지 찜기능/ 비밀번호 변경 기능<br>
  : 로그인 페이지 기능<br>
  : 회원가입 페이지 + 유효성 검사<br>
  : 반응형 처리 (메뉴 토글 기능)
  <br>

## 폴더구조

```bash
@vanilaMovie                                           //
└─vanilaMovie                                          //
   ├─ index.html                                       //
   ├─ public                                           //
   ├─ page                                             //
   │  ├─ Provider                                      //
   │  │  ├─ detail.html                                //
   │  │  ├─ join.html                                  //
   │  │  ├─ login.html                                 //
   │  │  └─ mypage.html                                //
   ├─ js                                               //
   │  ├─ detail                                        //
   │  │  ├─ detail.js                                  //
   │  │  ├─ detailCredits.js                           //
   │  │  ├─ detailImages.js                            //
   │  │  ├─ review.js                                  //
   │  │  └─ script.js                                  //
   │  ├─ join                                          //
   │  │  ├─ join.js                                    //
   │  │  └─ script.js                                  //
   │  ├─ login                                         //
   │  │  ├─ login.js                                   //
   │  │  └─ script.js                                  //
   │  ├─ mypage                                        //
   │  │  ├─ mypage.js                                  //
   │  │  └─ script.js                                  //
   │  ├─ sort                                          //
   │  │  └─ sort.js                                    //
   │  ├─ utils                                         //
   │  │  ├─ date.js                                    //
   │  │  └─ uuid.js                                    //
   │  ├─ config.js                                     //
   │  ├─ fetchData.js                                  //
   │  ├─ fetchFirebaseData.js                          //
   │  ├─ firebaseConfig.js                             //
   │  ├─ goMain.js                                     //
   │  ├─ header.js                                     //
   │  ├─ footer.js                                     //
   │  ├─ mainSlide.js                                  //
   │  ├─ modal.js                                      //
   │  ├─ nav.js                                        //
   │  ├─ pager.js                                      //
   │  └─ script.js                                     //
   ├─ scss                                             //
   │  ├─ _detailCredits.scss                           //
   │  ├─ _detailImages.scss                            //
   │  ├─ _footer.scss                                  //
   │  ├─ _header.scss                                  //
   │  ├─ _mainSlide.scss                               //
   │  ├─ _reset.scss                                   //
   │  ├─ _review.scss                                  //
   │  ├─ _sort.scss                                    //
   │  ├─ _variables.scss                               //
   │  ├─ detail.scss                                   //
   │  ├─ login.scss                                    //
   │  ├─ main.scss                                     //
   │  ├─ modal.scss                                    //
   │  ├─ mypage.scss                                   //
   │  ├─ _footer.scss                                  //
   │  └─ style.scss                                    //
   ├─  assets                                          //
   │  ├─ fontawesome.html                              //
   │  └─ img                                           //
         ├─ favicon.png                                //
         ├─ next.png                                   //
         └─ prev.png                                   //
   ├─ .prettierrc                                      //
   └─ .gitignore                                       //
```

  <br>
   
## 반응형 사이트
![스크린샷 2024-08-07 오후 5 41 27](https://github.com/user-attachments/assets/e19a6253-3b88-4ce0-b105-3861b87ecad4)

## 세부 페이지
![스크린샷 2024-08-07 오후 5 41 31](https://github.com/user-attachments/assets/afd8bcd1-ff8e-499a-9733-20d0887f22a1)

