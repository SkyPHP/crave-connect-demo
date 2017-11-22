/**
 * Created by cj on 11/6/17.
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const CraveConnect = require('crave-connect'); 

var app = express();

global.Promise = require('bluebird');
global.dateFormat = require('dateformat');
global.truncate = require('truncate');


global.client = new CraveConnect({token: 'r13ExLh7lBke1NlLnmeHy@yNg8ddd' , staging : true});




app.set('view engine', 'html');
app.set('layout',  'layout');

// app.enable('view cache'); 
app.engine('html', require('hogan-express'))

// global.utils = require('./lib/utils');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(function(req,res,next) {
    res.locals.utils = require('./lib/utils');
    next();
})

app.use(require('./routes'))

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
    // return res.send(req.url );
    if(req.site_config && req.site_config.redirects) {
        let redir = req.site_config.redirects.find(t=>t.uri == req.url);

        if(redir) {
            return res.status(redir.status || 302).redirect(redir.redirect);
        }
    }

    

    var err = new Error('Not Found');
    err.status = 404;
    return res.render('error', {
        message: err.message,
        error: {}
    });
    // next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        return res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;