const express = require('express');
const { registerCompany, loginCompany, logoutCompany } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/logout', logoutCompany);

module.exports = router;
