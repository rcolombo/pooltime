'use strict';

module.exports = function(config) {
	config.set({
		basePath: '',

		frameworks: ['jasmine'],

		plugins: ['karma-jasmine',
		          'karma-phantomjs-launcher',
		          'karma-chrome-launcher',
		          'karma-spec-reporter'],

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-momentjs/angular-momentjs.js',
			'bower_components/angular-momentjs/angular-momentjs.js',
			'bower_components/ngstorage/ngStorage.js',
			'bower_components/moment/moment.js',
			'app/scripts/*.js',
			'app/scripts/**/*.js',
			'app/scripts/**/*.html',
			'test/spec/**/*.js',
		],

		port: 8180,

		logLevel: config.LOG_INFO,

		browsers: ['PhantomJS', 'Chrome'],

		reporters: ['spec'],

		specReporter: {
			suppressPassed: false,
			suppressFailed: false,
			suppressSkipped: true
		}
	});
};