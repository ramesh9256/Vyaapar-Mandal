const express = require('express');
const router = express.Router();
const noticeController = require('../controller/noticeController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

router.post('/', auth, isAdmin, noticeController.createNotice);      // POST /api/notices
router.get('/', noticeController.getNotices);                        // GET  /api/notices
router.delete('/:id', auth, isAdmin, noticeController.deleteNotice); // DELETE /api/notices/:id

module.exports = router;
