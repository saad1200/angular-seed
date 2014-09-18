module.exports = function() {

	this.Given(/^i am on the home page$/, function (callback) {
	  browser.visit('');
        this.world();
	  callback();
	});

	this.Given(/^this is the second sample$/, function (callback) {
	  this.greetings("everybody", callback);
	});

};