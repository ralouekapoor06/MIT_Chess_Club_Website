const express = require("express");
const app = express();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('51e5a240dc9d4edb930cefab3548dc7c');
console.log(typeof express)
const session = require('express-session');
const cookieParser = require('cookie-parser');
const _ = require("lodash");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({secret: "whydowefallsecretsymbole"}));

const mysql = require("mysql");
const db_config = {
  host:"" ,
  user:"",
  password:"" ,
  database: ""
};

var db;
function handleDisconnect(){
  db = mysql.createConnection(db_config); 
  db.connect(function(err) {
    if(err) { 
      setTimeout(handleDisconnect, 2000);
    }
    else {
      console.log('MySQL Connected.');
    }                                 
  });                                     
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                        
    } else {                                     
      console.log( err );                                  
    }
  });
}
handleDisconnect();


app.get('/', function(req, res){
    res.render('home');
 });
 
app.get('/store', function(req, res){
  res.render('store');
});

app.post('/contact',function(req,res){
  console.log(here);
  res.render('home');
})

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`)
});
