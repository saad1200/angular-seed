(function(){
    "use strict"

    angular
        .module('app')
        .component('app', {
            template: '<ng-outlet></ng-outlet>',
            $routeConfig: [
                { path: '/', component: 'home', name: 'Home'},
            ]
        });
    
}());