import { createHeader } from '../header.js';
import { createDetailHeader } from './detailHeader.js';
// import './detailHeader.js';
import { createReview } from './review.js';


createHeader();
createDetailHeader().then(() => createReview());

// createDetailHeader();
// createReview();
