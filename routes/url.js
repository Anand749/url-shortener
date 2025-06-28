const express = require('express');
const { handleGeneratenewShortURL, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post("/", handleGeneratenewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics); 

module.exports = router;
