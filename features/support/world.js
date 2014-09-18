module.exports = function() {

  this.World = function World(callback) {
    this.prop = "Hello from the World!"; // this property will be available in step definitions

    this.greetings = function(name, callback) {
      console.log("\n----Hello " + name);
      callback();
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
  };
    
}
//https://github.com/cucumber/cucumber-js
//http://custardbelly.com/blog/blog-posts/2014/01/29/cucumberjs-build/index.html?utm_source=tuicool