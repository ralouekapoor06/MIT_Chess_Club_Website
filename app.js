const express = require("express"); // express refers to the express framework
const app = express();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('51e5a240dc9d4edb930cefab3548dc7c');

console.log(typeof express)

//const bcrypt = require("bcrypt");
//const saltRounds is 10;

const session = require('express-session');
const cookieParser = require('cookie-parser');
const _ = require("lodash"); // library helps delivering modularity, performance & extras.
const bodyParser = require("body-parser"); // to get req.body

// configure the port number and tell the server to listen on that port
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs"); // set templating engine to ejs
app.use(bodyParser.urlencoded({extended: true})); // use extended v of body parser
app.use(express.static("public")); // tell the express app to use the public folder as public
app.use(cookieParser());
app.use(session({secret: "whydowefallsecretsymbole"}));

// SQL Database connectivity;
const mysql = require("mysql");
const db_config = {
  host: "sql12.freemysqlhosting.net",
  user:"sql12329649",
  password: "MYqlqD4qIs",
  database: "sql12329649"
};
var db;
function handleDisconnect() {
  db = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  db.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      // console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
    else {
      console.log('MySQL Connected.');
    }                                 // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      console.log( err );                                  // server variable configures this)
    }
  });
}
handleDisconnect(); // call the handleDisconnect function once


app.get('/', function(req, res){
    res.render('home');
 });

app.get('/news', function(req, res){

  newsapi.v2.everything({
    q: 'chess',
    from: '2020-03-06',
    to: '2020-04-05',
    language: 'en',
    sortBy: 'relevancy',
    page: 3
  }).then(response => {
    console.log(response);
    response1 = response['articles']
    //console.log(response1[0]['source'])
    res.render('news',{data:response1});
  });

});
 
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`)
});
