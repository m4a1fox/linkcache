/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , nodemailer = require('nodemailer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/', function (req, res) {
    employeeProvider.findAll(function (error, user) {
        res.render('index');


        res.render('index', {
            title: 'User',
            users: user
        });
    });
});


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
        user: "sin666m4a1fox@gmail.com",
        pass: "oracleroterdam"
    }
});


app.get('/sendmail', function (req, res) {

    smtpTransport.sendMail({  //email options
        from: "Sender Name <sin666m4a1fox@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
        to: "Receiver Name <sin666m4a1fox@email.com>", // receiver
        subject: "Emailing with nodemailer", // subject
        text: "Email Example with nodemailer" // body
    }, function(error, response){  //callback
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
});


app.get('/user/create', function (req, res) {
    res.render('new_user', {
        title: 'New User'
    });
});

//save new user
