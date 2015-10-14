/*eslint no-unused-expressions: 0, block-scoped-var: 0, no-undef: 0*/
'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn,
    laggard = require('../');

var test = function(fixture, opts, done) {
  var input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8');
  expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8');

  postcss([ laggard(opts) ])
    .process(input)
    .then(function(result) {
      expect(result.css).to.eql(expected);
      expect(result.warnings()).to.be.empty;
    done();
  }).catch(function (error) {
    done(error);
  });

};


var cli = function(cmd, callback) {
  process.chdir(__dirname);

  var ps,
      out = '',
      err = '';

  ps = spawn(process.execPath, [
      path.resolve(__dirname, '../bin/cmd.js')
  ].concat(cmd));

  ps.stdout.on('data', function(buffer) {
     out += buffer;
  });

  ps.stderr.on('data', function(buffer) {
    err += buffer;
  });

  ps.on('exit', function(code) {
    callback.call(this, err, out, code);
  });
};

var cliTest = function(fixture, args, done) {
  var input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = path.join(__dirname, 'fixtures', input);
  expected = path.join(__dirname, 'fixtures', expected);

  cli([input, args], function(err, out, code) {
    expect(out).to.eql(fs.readFileSync(expected, 'utf8'));
    expect(err).to.be.empty;
    expect(code).to.eql(0);
    done();
  });
};

describe('Laggard', function () {

  it('creates rgba fallbacks', function(done) {
   test('rgba', {}, done);
  });

  it('creates opacity fallbacks', function(done) {
   test('opacity', {}, done);
  });

  it('converts pseudoelements', function(done) {
   test('pseudo', {}, done);
  });

  it('creates vmin fallbacks', function(done) {
   test('vmin', {}, done);
  });

  it('creates rem fallbacks', function(done) {
   test('pixrem', {}, done);
  });

  it('sets will-change hack', function(done) {
   test('willchange', {}, done);
  });

  // CLI tool
  it('processes css on the command line', function(done) {
    cliTest('rgba', '', done);
  });


});
