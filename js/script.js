import { createHeader } from './header.js';
import { createSection } from './main.js';
import { creatSlideBox } from './mainSlide.js';
import { creatSortBox } from './sort/sort.js';
import { createFooter } from './footer.js';

// 비동기화 작업을 하는 컴포넌트가 있기 때문에 동기화 작업이 된 원래의 컴포넌트들이 위로 올라가는 현상이 발생
createHeader();
creatSlideBox().then(() => {
  createSection().then(() => {
    creatSortBox();
    createFooter();
  });
});
