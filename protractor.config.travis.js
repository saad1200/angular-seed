
exports.config = {

    capabilities: {
        'browserName': 'phantomjs'
    },
    
    specs: ['./userJourneys/*.js'],
    
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};


