const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGeneratenewShortURL(req, res) {
  const { redirectUrl } = req.body;

  if (!redirectUrl) {
    return res.status(400).json({ error: 'Redirect URL is required' });
  }

  const shortId = nanoid(8);

  await URL.create({
    shortId,
    redirectUrl,
    visitHistory: []
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  return res.json({
    totalClicks: entry.visitHistory.length,
    visitHistory: entry.visitHistory,
  });
}

module.exports = {
  handleGeneratenewShortURL,
  handleGetAnalytics
};
