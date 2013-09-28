'use strict';
var dbc = require('dbc.js')
  , oops = require('node-oops')
  , arango = require('arango')
  ;

/**
 * Creates a new repository
 * @param {arango.Connection} connection ArangoDB connection
 * @param {string} collectionName
 * @constructor
 */
function Repository(connection, collectionName) {
  dbc([connection], "Db is required");
  dbc([typeof connection === 'object'], "Db must be an ArangoDb Connection object");

  dbc([collectionName, collectionName.length > 0, typeof collectionName === 'string'], 'collection name is required, and must be a string');

  this.collection = connection.use(collectionName).collection;
  this.db = connection;
}

Repository.executeAQL = function (query, callback) {
  var self = this;
  self.db.query.exec(query, callback);
}
/**
 *
 * ArangoDB expects @@ in front of collection names when using a bindvar. The bindvar attribute in this case needs to be prefixed with a single @. In all other cases the bindvar atttribute can be provided without any prefix and the variable in the query string is denoted with a single @ .
 *
 * Parameterized Query: "FOR u IN @@collection RETURN u"
 * Params:  {'@collection':"test"
 *
 * Notice in the params the lack of a secondary @@
 *
 * @param query
 * @param params
 * @param callback
 */
Repository.executeAQLWithParams = function (query, params, callback) {
  var self = this;
  self.db.query.string = query;
  self.db.query.exec(params, callback);
}

Repository.prototype.all = function (callback) {
  var self = this;
  self.collection.document.list(callback);
}

Repository.prototype.query = function (callback) {
  var self = this;
}

Repository.prototype.getById = function (id, callback) {
  var self = this;
}

Repository.prototype.create = function (entity, callback) {
  var self = this;
}

Repository.prototype.save = function (id, entity, callback) {
  var self = this;
}

Repository.prototype.remove = function remove(id) {
  var self = this;
}


module.exports = Repository;