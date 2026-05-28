import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmarksController.js';

const router = Router();

// Apply auth guard globally to all bookmark routes
router.use(requireAuth);

router.get('/', getBookmarks);
router.post('/:eventId', addBookmark);
router.delete('/:eventId', removeBookmark);

export default router;
