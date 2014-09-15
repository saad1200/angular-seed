var argv = require('yargs').argv;
var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var protractor = require('gulp-protractor').protractor;
var spawn = require('child_process').spawn;
var http = require('http');
var static = require('node-static');
var gutil = require('gulp-util');
var http = require('http');

var testFiles = [
	  'src/bower_components/angular/angular.js',
	  'src/bower_components/angular/angular-mocks.js',
	  'src/lib/**/*.js',
	  'src/app/app.js',
	  'src/app/**/*.js',
	  'spec/**/*.js'
];

var sourceFiles = ['src/app/**/*.js'];

gulp.task('start.test', function() {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            reporters: ['progress'],
            autoWatch: true,
            action: 'start'
        }));
});

gulp.task('run.test', function () {
    return gulp.src(testFiles)
      .pipe(karma({
          configFile: 'karma.conf.js',
          singleRun: true,
      }));
});

gulp.task('acceptance', function () {
    
    return gulp.src('userJourneys/*.js')
        .pipe(protractor({
            configFile: 'protractor.config.js',
            showStack: true
        }));
});

gulp.task('webdriver-update', function(){
  spawn('./node_modules/protractor/bin/webdriver-manager', ['update'], {
    stdio: 'inherit'
  });
});

gulp.task('watch', function () {
  gulp.watch([sourceFiles,testFiles,acceptanceTestFiles], ['lint']);
});

gulp.task('check.server', function () {

    var http = require('http');
    var options = {
      host: 'localhost',
      port: '4000',
      path: '/#'
    };

    var req = http.get(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));

      // Buffer the body entirely for processing as a whole.
      var bodyChunks = [];
      res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        // ...and/or process the entire body here.
      })
    });

    req.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });
    
});

gulp.task('default', ['lint', 'test', 'watch']);

gulp.on('err', function(e){
    var msg = formatError(e);
    gutil.log('Build failed: ', gutil.colors.red(msg));
    process.exit(1);
});

function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}