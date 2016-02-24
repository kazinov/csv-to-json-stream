#!/usr/bin/env node

var transform = require('./')
  , fs = require('fs')
  , nomnom = require('nomnom');

var opts = nomnom
  .script('csv-to-json-stream')
  .option('skipHeader', {
    abbr: 's',
    full: 'skip-header',
    help: 'Need to skip the first line?',
    default: false
  })
  .option('map', {
    abbr: 'm',
    help: 'Map pairs in the format field_name:column_index e.g.: product:1,price:4',
    default: {},
    transform: function (r) {
      var obj = {};

      for (var p = r.split(','), i = 0; i < p.length; i++) {
        var split = p[i].split(':')
          , before = split[0]
          , after = parseInt(split[1]);

        // Ignore invalid pairs
        if (!before || !after || isNaN(after)) continue;

        // Add pair to object
        obj[before] = after;
      }

      return obj;
    }
  })
  .parse();

if (opts[0]) {
  // If a file was specified, read it in
  fs.createReadStream(opts[0])
    .pipe(transform(opts))
    .pipe(process.stdout);
} else {
  // Otherwise, just read from stdin
  process.stdin
    .pipe(new FeedStream(opts))
    .pipe(process.stdout);
}
