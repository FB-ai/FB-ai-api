var connection = require('./connection');
var bookshelf = require('bookshelf')(connection);

var User = bookshelf.Model.extend({
  tableName: 'user'
});