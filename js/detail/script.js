import { createHeader } from '../header.js';
import { createDetail } from './detail.js';
import { createReview } from './review.js';
import { createFooter } from '../footer.js';
import { createDetailCredits } from './detailCredits.js';
import { createDetailImages } from './detailImages.js';

createHeader();
createDetail()
  .then(() => createDetailImages())
  .then(() => createDetailCredits())
  .then(() => createReview())
  .then(() => createFooter());
