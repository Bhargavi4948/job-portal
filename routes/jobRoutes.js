const express = require('express');
const { postJob, addCandidate } = require('../controllers/jobController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', authenticate, postJob);
router.post('/add-candidate', authenticate, addCandidate);

module.exports = router;
