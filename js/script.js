import { createHeader } from './header.js';
import { createSection } from './main.js';
import { createClockAndWeather } from './clockAndWeather.js';
import { createFooter } from './footer.js';

createHeader();

// createSection().then(() => createFooter());
createSection().then(() => {
    createClockAndWeather();
    createFooter();
   
});