import { createHeader } from '../header.js';
import { createLogin } from './login.js';
import { createFooter } from '../footer.js';

createHeader();
createLogin(); // .then(() => createFooter());
createFooter();
