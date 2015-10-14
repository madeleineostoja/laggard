#!/usr/bin/env node
/*eslint no-process-exit: 0 */
'use strict';

var fs = require('fs'),
    path = require('path'),
    read = require('read-file-stdin'),
    write = require('write-file-stdout'),
    laggard = require('../'),
    opts = require('minimist');

// Set shorthand aliases for options
opts = opts(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version'
  }
});

var file = opts._[0],
    out = opts._[1];

// Fetch verion from package.json
if (opts.version) {
  return console.log(require('../package.json').version);
}

// Pipe out help doc from help.txt
if (file === 'help' || opts.help) {
  return fs.createReadStream(path.join(__dirname, '/help.txt'))
    .pipe(process.stdout)
    .on('close', function() {
       process.exit(1);
    });
}

read(file, function(err, buf) {

  if (err) {
    throw err;
  }

  if (file) {
    opts.from = file;
  }

  if (out) {
    opts.to = out;
  }

  write(out, laggard.process(String(buf), opts));

});
