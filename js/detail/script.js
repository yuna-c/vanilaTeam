import { createHeader } from '../header.js';
import { createDetail } from './detail.js';
import { createReview } from './review.js';
import { createFooter } from '../footer.js';
import { createDetailCredits } from './detailCredits.js';

createHeader();
createDetail()
  .then(() => createDetailCredits())
  .then(() => createReview())
  .then(() => createFooter());
