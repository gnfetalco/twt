var express = require('express');
var path = require('path');
var app = express();

var mysql = require('mysql');
var connection = require('./dbConfig');

//ejs template
app.set('view engine', 'ejs');

//using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
//app.use("/route", express.static('foldername'));
app.use('/public', express.static('public'));

//this is for read POST data
app.use(express.json());

app.use(express.urlencoded({
	extended: true
}));

//All routing start here..

//index page
app.get('/', function (req, res) {
	res.render("index");
});
//About us web page
app.get('/aboutus', function (req, res ) {
	res.render("aboutus");
});
//Menu web page
app.get('/menu', function (req, res ) {
	res.render("menu");
});
//Contact us web page
app.get('/contact', function (req, res ) {
	res.render("contact");
});
//Reviews form web page
app.get('/revform', function (req, res ) {
	res.render("revform");
});
//Book A Table form web page
app.get('/bookatable', function (req, res ) {
	res.render("bookatable");
});
//Admin web page for managing the Databases and Main Page
app.get('/adminpage', function (req, res ) {
	res.render("adminpage");
});

//dbRead page displays the retrieved data in an HTML table
app.get('/dbRead', function (req, res) {
	connection.query("SELECT * FROM inquiries", function (err, result) {
		if (err) throw err;
		console.log(result);
		res.render('dbRead', {
			title: 'xyz',
			userData: result
		});
	});
});

app.get('/bookingRead', function (req, res) {
	connection.query("SELECT * FROM booking", function (err, result) {
		if (err) throw err;
		console.log(result);
		res.render('bookingRead', {
			title: 'Booking',
			userData: result
		});
	});
});

app.get('/reviews', function (req, res,) {
	connection.query("SELECT * FROM reviews", function (err, results) {
		if (err) throw err;
		let rev1 = results;
		connection.query("SELECT * FROM reviews ORDER BY RAND() DESC LIMIT 1", function (err, result) {
			if (err) throw err;
				let rev2 = result;
				console.log(result);
				res.render('reviews', {
					oneData: rev2,
					revData: rev1
			});
		});
	});
});


//when user insert data in the HTML form
//installed moment module with "npm install moment --save" to get the current date and time
app.post('/contact', function(req, res) {
	var moment = require('moment');
	var wxy = moment().format('DD-MM-YYYY hh:mm');
	var abcd = req.body.cname;
	var bcde = req.body.message;
	var xyz = req.body.cemail;
	
	console.log(req.body);
	var sql = `INSERT INTO inquiries (date, name, email, message) VALUES ("${wxy}", "${abcd}", "${xyz}", "${bcde}")`;
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Inquiry submitted!");
	})
	return res.render('contact', { errormessage: 'insert data successfully' });
});

app.post('/revform', function(req, res) {
	var name = req.body.rname;
	var msg = req.body.rmsg;
		
	console.log(req.body);
	var sql = `INSERT INTO reviews (name, message) VALUES ("${name}", "${msg}")`;
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Review submitted!");
	})
	// res.redirect('adminpage');
});

// For bookatable.ejs adding data to "booking" table
app.post('/', function(req, res) {
	var moment = require('moment');
	var bdate = moment().format('DD-MM-YYYY');
	var bname = req.body.name;
	var bmobi = req.body.mobile;
	var bpax = req.body.pax;
	var btime = req.body.time;
	var bookdate = req.body.date;
	let alert = require('alert');
		
	console.log(req.body);
	var sql = `INSERT INTO booking (date, name, mobile, pax, time, rsrv_date) VALUES ("${bdate}", "${bname}", "${bmobi}", "${bpax}", "${btime}", "${bookdate}")`;
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Booking submitted!");
	})
	return res.render('index', { errormessage: 'insert data successfully' });
});

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');