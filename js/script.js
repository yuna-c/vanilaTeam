import { createHeader } from './header.js';
// import { createNav } from './nav.js';
import { createSection } from './main.js';
import { creatSlideBox } from './mainSlide.js';
import { createFooter } from './footer.js';
import { createTeamIntroduction } from './teamIntroduction.js';

createHeader();
creatSlideBox().then(() => {
  createSection().then(() => {
    createFooter();
    createTeamIntroduction();
  });
});
