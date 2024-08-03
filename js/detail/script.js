import { createHeader } from '../Header.js';
import { createDetail } from './detail.js';
import { createFooter } from '../footer.js';

createHeader();
createDetail().then(() => createFooter());
// createFooter();
