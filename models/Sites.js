var mongoose = require('mongoose');

var siteSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  url: String,
  keyword: String,
  keyword_exists: Boolean,
  exp_date: Date,
  cur_http_status: Number,
  http_history: {
      status: [],
      date: []
  }
});

mongoose.model('Site', siteSchema);
