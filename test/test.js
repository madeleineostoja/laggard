/* eslint-disable */

'use strict';

const postcss = require('postcss');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const rucksack = require('../');

function test(fixture, opts, done) {
  let input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8');
  expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8');

  postcss([ rucksack(opts) ])
    .process(input)
    .then(result => {
      expect(result.css).to.eql(expected);
      expect(result.warnings()).to.be.empty;
      done();
    }).catch(error => {
      done(error);
    });
};

function cli(cmd, callback) {
  process.chdir(__dirname);

  let ps,
      out = '',
      err = '';

  ps = spawn(process.execPath, [
    path.resolve(__dirname, '../bin/cmd.js')
  ].concat(cmd));

  ps.stdout.on('data', buffer => out += buffer);
  ps.stderr.on('data', buffer => err += buffer);
  ps.on('exit', function(code) {
    callback.call(this, err, out, code);
  });
};

function cliTest(fixture, args, done) {
  let input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = path.join(__dirname, 'fixtures', input);
  expected = path.join(__dirname, 'fixtures', expected);

  cli([input, args], (err, out, code) => {
    expect(out).to.eql(fs.readFileSync(expected, 'utf8'));
    expect(err).to.be.empty;
    expect(code).to.eql(0);
    done();
  });
};

describe('Laggard', () => {
  it('creates rgba fallbacks', done => test('rgba', {}, done));
  it('creates opacity fallbacks', done => test('opacity', {}, done));
  it('converts pseudoelements', done => test('pseudo', {}, done));
  it('creates vmin fallbacks', done => test('vmin', {}, done));
  it('creates rem fallbacks', done => test('pixrem', {}, done));
  it('sets will-change hack', done => test('willchange', {}, done));

  describe('cli', () => {
    it('processes css on the command line', done => cliTest('rgba', '', done));
  });
});
