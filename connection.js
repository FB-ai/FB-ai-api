console.log('Initiating connection to db...');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME,
    charset  : 'utf8'
  },
  debug: true
});

// since knew uses pooling, making a simple query is best way to check if connection is established (automatically gets pooled to after connection is made)
knex.onConnect = knex.raw('select 1+1 as result');

module.exports = knex;