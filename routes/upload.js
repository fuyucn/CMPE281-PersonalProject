
/*
 * upload page
 */
var cmd = require("child_process");
//mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'cmpe281pp.cwnhgkeil57z.us-west-2.rds.amazonaws.com',
  user     : 'root',
  password : 'rootroot',
  database : 'cmpe281pp'
});

exports.page = function(req, res){
  res.render('upload', { title: 'upload' });
};
exports.page2 = function(req, res){
  req.session.uid=req.param('sjsuid');
  if (!req.session.uid) {
    res.redirect("/")
  } else {
    res.render('upload-copy', { title: req.session.uid });
  }
};

var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');

//setup aws accress
var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAICO4ZVQ6M4AI6H4Q";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

exports.upload=function (req,res) {
  var sjsuid = req.param('sjsuid');
  // create an incoming form object
  var form = new formidable.IncomingForm();

  form.multiples = false;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/../uploads');
  
  // chekc upload folder
  try {
    fs.statSync(form.uploadDir);
  } catch(e) {
    fs.mkdirSync(form.uploadDir);
  }  

  // every time a file has been uploaded successfully,
  // rename it 
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, "testFile.zip"));
  });
  var obj = new Object();
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
     var obj = new Object();
     obj.error = err;
     obj.errorkeys  = [0];
  });
 
    
  
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {

     var key= sjsuid+"result.png";
    // generate png file

    //res.end('success');
  console.log("Starting unzip")
  cmd.execSync("rm -r -f uploads/testFile");
  var output = cmd.execSync("unzip -o uploads/testFile.zip -d uploads/testFile");
  console.log("Starting generate img")
  try {
    cmd.execSync("java -jar uploads/app.jar uploads/testFile uploads/"+key)
  } catch (err) {
      err.stdout;
      err.stderr;
      err.pid;
      err.signal;
      err.status;
      // etc
  }
 
    console.log("file name: " + key);
    var img = fs.readFileSync(path.join(__dirname, '/../uploads/'+key));
  
    // create connection to s3
    var s3=new AWS.S3();
    
    var params = {
      Bucket: 'cmpe281-personalproject',
      Key: key,
      Body: img
    };

    s3.putObject(params, function (perr, pres) {
      if (perr) {
        console.log("Error uploading data: ", perr);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
        var obj = new Object();
        obj.url="https://s3-us-west-2.amazonaws.com/cmpe281-personalproject/"+key;
        console.log(obj);

      connection.query('UPDATE uploads SET img="'+obj.url+'", status="submitted" WHERE sjsuid='+ sjsuid+';', function(err, rows, fields) {
        if (!err)
        {
            console.log("uploaded:" + obj.url);
            console.log("Enquery");
            
        }
        else
          console.log('Error while update "uploads" table."'+err);
      });
      res.end(JSON.stringify(obj));
      }
    });
  });
  
  // parse the incoming request containing the form data
  form.parse(req);
};

exports.grade = function(req, res){
  console.log(req.body.grade);
  console.log(req.body.comment);
  var grade = req.body.grade;
  var comment =req.body.comment;
  var sjsuid =req.param('sjsuid');

  connection.query('UPDATE uploads SET grade="'+grade+'", comment="'+comment+'" WHERE sjsuid='+ sjsuid+';', function(err, rows, fields) {
      if (!err)
      {
          console.log("Enquery grade");
      }
      else
        console.log('Error while update "uploads" table."'+err);
    });
  res.render('suc', { title: sjsuid });

};