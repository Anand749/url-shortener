const mongoose = require('mongoose');
const { applyTimestamps } = require('../../Project 01 MVC/models/User');

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectUrl: { type: String, required: true },
  visitHistory: [{timestamp:{type:Number}}],
},
{timestamps: true});

const URL = mongoose.model('URL', urlSchema);

module.exports = mongoose.model('URL', urlSchema);