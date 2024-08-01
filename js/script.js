import { createHeader } from './header.js';
import { createSection } from './main.js';
import { createFooter } from './footer.js';

createHeader();
createSection().then(() => createFooter());
