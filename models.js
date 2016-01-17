var connection = require('./connection');
var bookshelf = require('bookshelf')(connection);

var User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function(){
    return this.hasMany(Post);
  }
});

var Post = bookshelf.Model.extend({
  tableName: 'posts',
  user: function(){
    return this.belongs(User);
  },
  contents: function(){
    return this.hasMany(Content);
  }
});

var Content = bookshelf.Model.extend({
  tableName: 'contents',
  post: function(){
    return this.belongsTo(Post);
  }
});

module.exports = {
  User: User,
  Post: Post,
  Content: Content
};
