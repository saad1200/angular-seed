(function(){
    "use strict"

    var module = angular.module('app');

    module.component('home', {
        template: `<h1>{{vm.title}}</h1>`,
        controllerAs: 'vm',
        controller: function(){
            this.title = 'Hello';
        }
    });
}());