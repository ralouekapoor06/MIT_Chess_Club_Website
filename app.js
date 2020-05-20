const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const _ = require("lodash");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({secret: "whydowefallsecretsymbole",
resave: true,
saveUninitialized: true
}));

const mysql = require("mysql");
const db_config = {
  host:"eu-cdbr-west-03.cleardb.net" ,
  user:"b77ba75b6753d1",
  password:"f1c818a8" ,
  database: "heroku_f22ea8e3a0f6d12"
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
    } 
    else {                                     
      console.log(err);                                  
    }
  });
}
handleDisconnect();


app.get('/', function(req, res){
    res.render('home');
 });

 app.post('/',function(req,res){
  
  var post = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    message: req.body.message
  };
  var post1 = {
    full_name: req.body.full_name,
    reg_number: req.body.reg_no,
    whatsapp_number:req.body.whatsapp
  };

  if(post.fname == null)
    {
      var sql = "INSERT INTO join_club SET ?";
      db.query(sql, post1, function(err, results, fields) {
      if (err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
      });
    }
  else
    {
      var sql = "INSERT INTO contact SET ?";
      db.query(sql, post, function(err, results, fields) {
      if (err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
      });
    }
})
 
app.get('/store', function(req, res){
  res.render('store');
});

app.post('/store', function(req, res){
  var post = {
    full_name: req.body.full_name,
    whatsapp_number: req.body.whatsapp_num,
    email: req.body.email,
    quantity: req.body.quantity
  };
  var sql = "INSERT INTO store SET ?";
  db.query(sql, post, function(err, results, fields) {
  if (err){
    console.log(err);
  }
  else{
    res.render("store");
  }
  });

});

app.get('/members', function(req, res){
  res.render('members');
});

app.get('/4morechecks', function(req, res){
  res.render('4morechecks');
});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`)
});
