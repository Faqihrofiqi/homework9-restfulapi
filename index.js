var express =require('express');
var bodyParser =require('body-parser');
// var router=require('./movies')
var app=express();

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var movies =require('./movies.js');

app.use('/db',movies);
app.listen(3000);
