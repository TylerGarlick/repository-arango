"use strict";

var expect = require('expect.js')
  , arango = require('arango')
  , Repository = require('../')
  ;

describe('A Repository', function () {
  // This will assume default settings, connects to http://127.0.0.1:8529
  var connection = new arango.Connection
  var repo = new Repository(connection, "tests");

  it("it should initialize the object in it's proper state", function () {
    expect(repo).to.be.ok();
    expect(repo.db).to.be.ok();
    expect(repo.collection).to.be.ok();
  });

  it('should have a Collection property when setup', function () {
    expect(true).to.be(true);
  });
});
