exports.graderPage = function(req,res){
	res.render('grader', { title: 'Express' });
};

//mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '####',
  user     : '####',
  password : '####',
  database : '####'
});

exports.getAll = function(req,res){
	var result;
	connection.connect(function(err) {
	  if (err) {
	    //console.error('Database connection failed: ' + err.stack);
	    return;
	  }});
    connection.query('Select * from uploads;', function(err, rows, fields) {
      if (!err)
      {
      	//result=rows;
      	console.log(rows.length);

  		res.send(rows);
      }
      else
        console.log('Error while update "uploads" table."'+err);
    });

}

exports.grade = function(req,res){
  var sjsuid=req.param('sjsuid');
  var newGrade=req.param('grade');
  connection.connect(function(err) {
  });
 connection.query('UPDATE uploads SET grade="'+newGrade+'", status="Graded" WHERE sjsuid='+ sjsuid+';', function(err, rows, fields) {
    if (!err)
    {
      //result=rows;
     res.end("success");
  
    }
    else
      console.log('Error while update "uploads" table."'+err);
  });
};

exports.comment = function(req,res){
  var sjsuid=req.param('sjsuid');
  var newComment=req.param('comment');
  connection.connect(function(err) {
  });
 connection.query('UPDATE uploads SET comment="'+newComment+'" WHERE sjsuid='+ sjsuid+';', function(err, rows, fields) {
    if (!err)
    {
      //result=rows;
     res.end("success");
  
    }
    else
      console.log('Error while update "uploads" table."'+err);
  });
};
