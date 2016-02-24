var fs = require('fs');
var path = require('path');
var writable = fs.createWriteStream(path.resolve(__dirname, 'result.json'));
var readable = fs.createReadStream(path.resolve(__dirname, 'feed.csv'));
var transform = require('./index.js')({
  map: {
    'product_name': 1,
    'price': 2,
    'price_monthly': 3,
    'url': 5
  },
  skipHeader: true
});

readable.pipe(transform).pipe(writable);
