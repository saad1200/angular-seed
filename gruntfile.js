module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        karma: {
            options: { 
                configFile: 'config/karma.conf.js', 
                browsers: ['PhantomJS'],
                thresholdReporter: {
                  statements: 90,
                  branches: 60,
                  functions: 85,
                  lines: 90
                },
            },
            unit: {
                coverageReporter: {type: 'html', dir:'../coverage/'}
            },
            continuous: { 
                singleRun: true,
                coverageReporter: {type: 'lcov', dir:'../coverage/'},
            }
        },
        
        protractor: {
            options: { configFile: "node_modules/protractor/referenceConf.js" },
            local: { options: {configFile: "config/protractor.config.js" } },
            ci: { options: { configFile: "config/protractor.config.ci.js" }}
        },

        jslint: {
            client : {
                src: ['src/app/**/*.js','userJourneys/**/*.js','spec/**/*.js'],
                directives: {
                  browser: true,
                  predef: ['jQuery', 'angular','describe','it','browser','expect','element','by']
                },
                options: {}
            }

        },
        
        shell: { 
            updateLocalWebdriver: { command: './node_modules/protractor/bin/webdriver-manager update' },
            updateCiWebdriver: { command: './node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update' },
            startJekyll: { command: 'jekyll serve --watch' },
        },
        
        coveralls: {
            options: {
                coverage_dir: 'coverage',
                dryRun: true,
                force: true,
                recursive: true
            }
        }
        
    });
        
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    
    grunt.registerTask('lint', ['jslint']);
    grunt.registerTask('start-server', ['shell:startJekyll']);
    grunt.registerTask('acceptance', ['shell:updateLocalWebdriver', 'protractor:local']);
    grunt.registerTask('acceptance-ci', ['protractor:ci']);
    grunt.registerTask('all-tests', ['jslint', 'karma:continuous', 'shell:updateCiWebdriver', 'protractor:ci', 'coveralls']);
    grunt.registerTask('unit', ['karma:unit']);
    grunt.registerTask('continuous', ['karma:continuous',]);
    grunt.registerTask('default', ['']);
    
};