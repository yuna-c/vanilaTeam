import { createHeader } from './header.js';
import { createSection } from './main.js';
import { creatSlideBox } from './mainSlide.js';
import { creatSortBox } from './sort/sort.js';
import { createFooter } from './footer.js';
import { createTeamIntroduction } from './teamIntroduction.js';

createHeader();
creatSlideBox().then(() => {
  createSection().then(() => {
    creatSortBox();
    createFooter();
    createTeamIntroduction();
  });
});
