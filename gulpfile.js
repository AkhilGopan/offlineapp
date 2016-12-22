/* eslint-env node */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var express = require('express');
var ghPages = require('gh-pages');
var packageJson = require('./package.json');
var path = require('path');
var runSequence = require('run-sequence');
var swPrecache = require('./lib/sw-precache.js');

var inject = require('gulp-inject');
var es = require('event-stream');
var concat = require('gulp-concat');
var series = require('stream-series');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require("gulp-rename");
var sass = require('gulp-sass');

//npm i gulp-sass gulp-rename gulp-ng-annotate gulp-uglify stream-series gulp-concat event-stream gulp-inject


var DEV_DIR = 'app';
//var DIST_DIR = 'public';
var DIST_DIR = 'dist';

function runExpress(port, rootDir) {
    var serveStatic = require('serve-static');
  /*  var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    
    var mongoose = require('mongoose');
    var passport = require('passport');
    var http = require('http');
    var debug = require('debug')('project:server');
    var session = require('express-session');
    var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var fs = require('fs');

    //var MongoDBStore = require('connect-mongodb-session')(session);
    const MongoStore = require('connect-mongo')(session);



      var app = express();
      var router = express.Router();

      var common = require('./server/helpers/common');

      var port = port
      var credential = common.db_access.dbconfig();
      var keys = common.constants.keys();

      app.set('port', port);
      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.use('/'+ 'public', serveStatic(__dirname + '/'+ "public")); // serve static files
      app.use('/', serveStatic(__dirname + '/')); // serve static files
      app.use('/vendors', serveStatic(__dirname + '/vendors')); // serve static files
      app.engine('html', require('ejs').renderFile);
      app.set('superSecret', keys.sessionkey); // secret variable
      router.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;    
              next();
            }
          });

        } else {

          // if there is no token
          // return an error
          return res.status(403).send({ 
              success: false, 
              message: 'No token provided.' 
          });
          
        }
      });

      var db = require('./server/config/database').dbconfig();

      mongoose.connect(db.connectionstring);


      var date = new Date();
      date.setTime(date.getTime()+(365 * 24 * 60 * 60 * 1000)); //won't have to log in for a year


      app.use(session({
          secret: keys.sessionkey,
          name: 'MyLANapp',
          saveUninitialized: false, // don't create session until something stored
          resave: true, //don't save session if unmodified
          cookie : {maxAge: date}, 
          rolling : true, //won't have to log in for a year from last touch Prevent Browser cookie deletion on exit
          store: new MongoStore({
              url: db.connectionstring,
              collection : db.collection.session_collection,
               //touchAfter: 24 * 3600, // time period in seconds // session be updated only one time in a period of 24 hours
              ttl: 24 * 60 * 60
          })
      }));

      // apply the routes to our application with the prefix /api
      app.use('/api/v1/', router);

      require('./server/routes/routes.js')(app); // Main Route File
      //http.createServer(app).listen(port); // create server

      console.log("App listening on port(OFFLINE) " + port);

      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      // error handler
      app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        console.log(err)
        res.status(err.status || 500);
        res.json('0');
      });
    var https = require('https');

    var options = {
       key  : fs.readFileSync('./sslconf/new/device.key'),
       cert : fs.readFileSync('./sslconf/new/device.crt')
    };


    var server = app.listen(port, function() {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Server running at http://%s:%s', host, port);
    });*/

    var app = express();


    app.use('/public', serveStatic(__dirname + '/'+ "public")); // serve static files
    app.use('/', serveStatic(__dirname + '/')); // serve static files
    app.use('/vendors', serveStatic(__dirname + '/vendors')); // serve static files


    app.get('*', function(req, res) {
     res.sendfile('./public/template/index.html'); 
    });

    var server = app.listen(port, function() {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Server running at http://%s:%s', host, port);
    });
  


   /* https.createServer(options, app).listen(port, function () {
       console.log('Started!');
    });*/
  // Epress Offline
}

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    logger: $.util.log,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: "http://localhost:30013/",
      handler: 'cacheFirst',
      navigateFallback: 'public/template/index.html',
      navigateFallbackWhitelist: [/^\/login/],
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      'public/assets/**/**.**',
      'public/template/**.css',
      'public/app/**/*.*'
    ],
    stripPrefix: '.',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join('service-worker.js'), config, callback);
}

gulp.task('default', ['serve-dist']);

gulp.task('build', function(callback) {
  runSequence('copy-dev-to-dist', 'generate-service-worker-dist', callback);
});

gulp.task('clean', function() {
  del.sync([DIST_DIR]);
});

gulp.task('serve-dev', ['generate-service-worker-dev'], function() {
  runExpress(3003, DEV_DIR);
});

gulp.task('serve-dist', ['build'], function() {
  runExpress(30013, DIST_DIR);
});

gulp.task('gh-pages', ['build'], function(callback) {
  ghPages.publish(path.join(__dirname, DIST_DIR), callback);
});

gulp.task('generate-service-worker-dev', function(callback) {
  writeServiceWorkerFile(DEV_DIR, false, callback);
});

gulp.task('generate-service-worker-dist', function(callback) {
  writeServiceWorkerFile(DIST_DIR, true, callback);
});

gulp.task('copy-dev-to-dist', function() {
  return gulp.src(DEV_DIR + '/**')
    .pipe(gulp.dest(DIST_DIR));
});


gulp.task('production', function() {
  gulp.start('uglyfy', 'addto','styles');
})


gulp.task('uglyfy', function () {
var vendorStream = gulp.src([
  './public/app/core/*.js',
  './public/app/constants/*.js',
  './public/app/directives/*.js',
  './public/app/routes/*.js',
  './public/app/controller/*.js',
  './public/app/factory/*.js',
  './public/app/modules/**/*.js'
  ])
  .pipe(concat('library.js'))
  .pipe(ngAnnotate())
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify({ mangle: true }).on('error', function(e){
            console.log(e);
    }))
  .pipe(gulp.dest('./public/app/libs/src/'));
 });


gulp.task('addto', function () {
 
var target = gulp.src('./public/template/index.html');
   
var lib = gulp.src(['./public/app/libs/*.js','./public/app/libs/src/*.js'], {read: false});
  return target.pipe(inject(series(lib)))
    .pipe(gulp.dest('./public/template/'));
});


gulp.task('styles', function() {
    gulp.src('./public/assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/css/'));
});