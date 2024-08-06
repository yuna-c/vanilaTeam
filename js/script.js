import { createHeader } from './header.js';
import { createSection } from './main.js';
import { creatSlideBox } from './mainSlide.js';
import { creatSortBox } from './sort/sort.js';
import { createClockAndWeather } from './clockAndWeather.js';
import { createFooter } from './footer.js';

createHeader();
creatSlideBox().then(() => {
  createSection().then(() => {
    creatSortBox();
    createClockAndWeather();
    createFooter();
  });
});
