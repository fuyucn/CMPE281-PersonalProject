
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , upload = require('./routes/upload')
  , grader = require('./routes/grader')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
  

var app = express();
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));


var fs = require('fs');
var formidable = require('formidable');


app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: 'secret',
    resave: true, 
    saveUninitialized: true
}));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', routes.index);
//app.get('/img', upload.getImg);
app.post('/:sjsuid/login', index.login);
app.get('/login', index.login);
app.get('/logout',index.logout);
//app.get('/upload', upload.page);
app.get('/:sjsuid/upload', upload.page2);
app.post('/:sjsuid/upload', upload.upload);
app.get('/grade/:sjsuid/:grade', grader.grade);
app.get('/grader',grader.graderPage);
app.get('/grade/comment/:sjsuid/:comment', grader.comment);
app.get('/getAll',grader.getAll);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
