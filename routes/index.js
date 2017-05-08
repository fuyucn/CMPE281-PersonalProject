
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'JAVA CODE UML GRADER' });
};

//mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '####',
  user     : '####',
  password : '####',
  database : '####'
});

//login
exports.login = function(req,res){

	console.log(req.query);
	var sjsuid = req.query.sjsuid;
	
	console.log("logged in id:"+sjsuid)
	connection.connect(function(err) {
	  if (err) {
	    console.error('Database connection failed: ' + err.stack);
	    return;
	  }});
	connection.query('SELECT COUNT(*) as COUNT from users where sjsuid='+ sjsuid+';', function(err, rows, fields) {
	  if (!err)
	  {
	  	console.log('The solution is: ', rows[0].COUNT);
	  	if (rows[0].COUNT==1){
	  		//req.session.uid=sjsuid;
	  		res.redirect("/"+sjsuid+"/upload")
	  	}
	  	else{
	  		res.redirect("/");
	  	}
	  }
	  else
	    console.log('Error while performing Query.');
	});
	 
	//connection.end();
};

exports.logout = function(req,res){
	req.session.destroy();
	res.redirect("/");
}
