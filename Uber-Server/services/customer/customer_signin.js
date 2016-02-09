var mysql = require('mysql');
var pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'uber',
  port : 3306
});
function handle_request(msg, callback) {
  var res = {};
  console.log(msg);
  pool.getConnection(function(err, connection) {
	connection.query("SELECT * FROM customers WHERE email='" + msg.email + "'AND password ='" + msg.password + "'",
	    function(err, user) {
		  console.log(user);
		  if (err) {
		    throw err;
		  }
		  else {
		    if (user.length == 0) {
			  console.log("Server Login Failed");
			  res.code = "400";
			  res.value = "User not found";
		    }
		    else {
			  console.log("Server Login Success");
			  res.code = "200";
			  res.value = {
			    "customer_id" : user[0].customer_id,
			    "email" : user[0].email,
			    "firstname" : user[0].firstname,
			    "lastname" : user[0].lastname,
			  };
		    }
		    res = JSON.stringify(res);
		    callback(null, res);
		  }
	    });
  });
}
exports.handle_request = handle_request;