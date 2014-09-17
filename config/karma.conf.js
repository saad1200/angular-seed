module.exports = function(config) {
  config.set({

    basePath: '',
      
    files: testFiles = [
                          '../src/bower_components/angular/angular.js',
                          '../src/bower_components/angular-mocks/angular-mocks.js',
                          '../src/app/app.js',
                          '../src/app/**/*.js',
                          '../spec/**/*.js'
                        ],
      

    frameworks: ['jasmine'],
	
    port: 9876,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

  });
};
