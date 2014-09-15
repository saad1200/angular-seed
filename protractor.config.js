exports.config = {

    chromeOnly: true,
    chromeDriver: './node_modules/protractor/selenium/chromedriver',

    capabilities: {
        'browserName': 'chrome'
    },
    
    specs: ['./userJourneys/*.js'],

    baseUrl: 'http://localhost:4000',

    onPrepare: function () {
			
        browser.visit = function (url) {
            browser.manage().window().maximize();
            return browser.get(url);
        };
        
////        var consoleReporter = new jasmineRequire.ConsoleReporter()({
////            showColors: true,
////            timer: new jasmine.Timer,
////            print: function() {
////              console.log.apply(console, arguments)
////            }
////        });
////
////        jasmine.getEnv().addReporter(consoleReporter);
//        
//        jasmine.getEnv().addReporter(
//          jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log))
//        );
//
    },
    
    jasmineNodeOpts: {
        onComplete: function () {
        },
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};