var argv = require('yargs').argv;
var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var protractor = require('gulp-protractor').protractor;

var testFiles = [
	  'src/bower_components/angular/angular.js',
	  'src/bower_components/angular/angular-mocks.js',
	  'src/lib/**/*.js',
	  'src/app/app.js',
	  'src/app/**/*.js',
	  'spec/**/*.js'
];

var sourceFiles = ['src/app/**/*.js'];

var acceptanceTestFiles = ['protractor/**/*.js'];

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
      }))
      .on('error', function (err) {process.exit(1);});
});

gulp.task('acceptance', function () {
var filesPattern = argv.specs ? ('protractor/' + argv.specs)  : 'protractor/**/*.js';
    return gulp.src(filesPattern)
        .pipe(protractor({
            configFile: "protractor.config.js",
            args: ["--params.reporters.screenshot"]
        }));
});

gulp.task('lint', function() {
    gulp.src(sourceFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function () {
  gulp.watch([sourceFiles,testFiles,acceptanceTestFiles], ['lint']);
});

gulp.task('default', ['lint', 'test', 'watch']);

process.on('exit', function (status) {
    
    process.exit(status);
});