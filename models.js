var connection = require('./connection');
var bookshelf = require('bookshelf')(connection);

var User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function(){
    this.belongsToMany(Post);
  }
});

var Post = bookshelf.Model.extend({
  tableName: 'posts',
  user: function(){
    this.belongsToMany(User);
  },
  contents: function(){
    this.hasMany(Content);
  }
});

var Content = bookshelf.Model.extend({
  tableName: 'contents',
  post: function(){
    this.belongsTo(Post);
  }
});

module.exports = {
  User: User,
  Post: Post,
  Content: Content
};
