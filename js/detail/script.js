import { createHeader } from '../header.js';
import { createDetail } from './detail.js';
import { createReview } from './review.js';
import { createFooter } from '../footer.js';

createHeader();
createDetail()
  .then(() => createReview())
  .then(() => createFooter());
