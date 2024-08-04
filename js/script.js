import { createHeader } from './header.js';
import { createSection } from './main.js';
import { creatSlideBox } from './mainSlide.js';
import { createClockAndWeather } from './clockAndWeather.js';
import { createFooter } from './footer.js';

createHeader();
creatSlideBox();
createSection().then(() => {
  createClockAndWeather();
  createFooter();
});
