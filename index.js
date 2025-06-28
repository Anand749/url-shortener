const express = require('express');
const urlRoute = require('./routes/url');
const connectToMongoDB = require('./connect');
const URL = require('./models/url'); // ✅ Needed to use URL.findOne...

const app = express();
const port = 3000;

// Connect MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => {
    console.log('✅ MongoDB connected');
  });

app.use(express.json()); // to parse JSON bodies
app.use('/url', urlRoute); // for POST route

// ✅ Redirection + tracking route
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (urlEntry) {
    return res.redirect(urlEntry.redirectUrl);
  }

  return res.status(404).json({ error: 'Short URL not found' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
